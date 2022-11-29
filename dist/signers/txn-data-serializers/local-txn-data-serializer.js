"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalTxnDataSerializer = void 0;
const base64_1 = require("../../serialization/base64");
const types_1 = require("../../types");
const call_arg_serializer_1 = require("./call-arg-serializer");
const type_tag_serializer_1 = require("./type-tag-serializer");
const TYPE_TAG = Array.from('TransactionData::').map((e) => e.charCodeAt(0));
class LocalTxnDataSerializer {
    /**
     * Need a provider to fetch the latest object reference. Ideally the provider
     * should cache the object reference locally
     */
    constructor(provider) {
        this.provider = provider;
    }
    async newTransferObject(signerAddress, t) {
        try {
            const objectRef = await this.provider.getObjectRef(t.objectId);
            const tx = {
                TransferObject: {
                    recipient: t.recipient,
                    object_ref: objectRef,
                },
            };
            return await this.constructTransactionData(tx, { kind: 'transferObject', data: t }, t.gasPayment, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a TransferObject transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newTransferSui(signerAddress, t) {
        try {
            const tx = {
                TransferSui: {
                    recipient: t.recipient,
                    amount: t.amount == null ? { None: null } : { Some: t.amount },
                },
            };
            return await this.constructTransactionData(tx, { kind: 'transferSui', data: t }, t.suiObjectId, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a TransferSui transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newPay(signerAddress, t) {
        try {
            const inputCoinRefs = (await Promise.all(t.inputCoins.map((coin) => this.provider.getObjectRef(coin)))).map((ref) => ref);
            const tx = {
                Pay: {
                    coins: inputCoinRefs,
                    recipients: t.recipients,
                    amounts: t.amounts,
                },
            };
            return await this.constructTransactionData(tx, { kind: 'pay', data: t }, t.gasPayment, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a Pay transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newPaySui(signerAddress, t) {
        try {
            const inputCoinRefs = (await Promise.all(t.inputCoins.map((coin) => this.provider.getObjectRef(coin)))).map((ref) => ref);
            const tx = {
                PaySui: {
                    coins: inputCoinRefs,
                    recipients: t.recipients,
                    amounts: t.amounts,
                },
            };
            const gas_coin_obj = t.inputCoins[0];
            return await this.constructTransactionData(tx, { kind: 'paySui', data: t }, gas_coin_obj, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a PaySui transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newPayAllSui(signerAddress, t) {
        try {
            const inputCoinRefs = (await Promise.all(t.inputCoins.map((coin) => this.provider.getObjectRef(coin)))).map((ref) => ref);
            const tx = {
                PayAllSui: {
                    coins: inputCoinRefs,
                    recipient: t.recipient,
                },
            };
            const gas_coin_obj = t.inputCoins[0];
            return await this.constructTransactionData(tx, { kind: 'payAllSui', data: t }, gas_coin_obj, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a PayAllSui transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newMoveCall(signerAddress, t) {
        try {
            const pkg = await this.provider.getObjectRef(t.packageObjectId);
            const tx = {
                Call: {
                    package: pkg,
                    module: t.module,
                    function: t.function,
                    typeArguments: t.typeArguments.map((a) => typeof a === 'string'
                        ? new type_tag_serializer_1.TypeTagSerializer().parseFromStr(a)
                        : a),
                    arguments: await new call_arg_serializer_1.CallArgSerializer(this.provider).serializeMoveCallArguments(t),
                },
            };
            return await this.constructTransactionData(tx, { kind: 'moveCall', data: t }, t.gasPayment, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a move call: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newMergeCoin(signerAddress, t) {
        try {
            return await this.newMoveCall(signerAddress, {
                packageObjectId: types_1.SUI_FRAMEWORK_ADDRESS,
                module: types_1.PAY_MODULE_NAME,
                function: types_1.PAY_JOIN_COIN_FUNC_NAME,
                typeArguments: [await this.getCoinStructTag(t.coinToMerge)],
                arguments: [t.primaryCoin, t.coinToMerge],
                gasPayment: t.gasPayment,
                gasBudget: t.gasBudget,
            });
        }
        catch (err) {
            throw new Error(`Error constructing a MergeCoin Transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newSplitCoin(signerAddress, t) {
        try {
            return await this.newMoveCall(signerAddress, {
                packageObjectId: types_1.SUI_FRAMEWORK_ADDRESS,
                module: types_1.PAY_MODULE_NAME,
                function: types_1.PAY_SPLIT_COIN_VEC_FUNC_NAME,
                typeArguments: [await this.getCoinStructTag(t.coinObjectId)],
                arguments: [t.coinObjectId, t.splitAmounts],
                gasPayment: t.gasPayment,
                gasBudget: t.gasBudget,
            });
        }
        catch (err) {
            throw new Error(`Error constructing a SplitCoin Transaction: ${err} args ${JSON.stringify(t)}`);
        }
    }
    async newPublish(signerAddress, t) {
        try {
            const tx = {
                Publish: {
                    modules: t.compiledModules,
                },
            };
            return await this.constructTransactionData(tx, { kind: 'publish', data: t }, t.gasPayment, signerAddress);
        }
        catch (err) {
            throw new Error(`Error constructing a newPublish transaction: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    /**
     * Util function to select a coin for gas payment given an transaction, which will select
     * an arbitrary gas object owned by the address with balance greater than or equal to
     * `txn.data.gasBudget` that's not used in `txn` itself and the `exclude` list.
     *
     * @param txn the transaction for which the gas object is selected
     * @param signerAddress signer of the transaction
     * @param exclude additional object ids of the gas coins to exclude. Object ids that appear
     * in `txn` will be appended
     */
    async selectGasPaymentForTransaction(txn, signerAddress, exclude = []) {
        if (txn.kind === 'bytes') {
            return undefined;
        }
        const coins = await this.provider.selectCoinsWithBalanceGreaterThanOrEqual(signerAddress, BigInt(txn.data.gasBudget), types_1.SUI_TYPE_ARG, exclude.concat(await this.extractObjectIds(txn)));
        return coins.length > 0 ? types_1.Coin.getID(coins[0]) : undefined;
    }
    /**
     * Returns a list of object ids used in the transaction, including the gas payment object
     */
    async extractObjectIds(txn) {
        const ret = await this.extractInputObjectIds(txn);
        if ('gasPayment' in txn.data && txn.data['gasPayment']) {
            ret.push(txn.data['gasPayment']);
        }
        return ret;
    }
    async extractInputObjectIds(txn) {
        switch (txn.kind) {
            case 'moveCall':
                return await new call_arg_serializer_1.CallArgSerializer(this.provider).extractObjectIds(txn.data);
            case 'transferSui':
                return [txn.data.suiObjectId];
            case 'transferObject':
                return [txn.data.objectId];
            case 'mergeCoin':
                return [txn.data.primaryCoin, txn.data.coinToMerge];
            case 'splitCoin':
                return [txn.data.coinObjectId];
            case 'pay':
                return txn.data.inputCoins;
        }
        return [];
    }
    async getCoinStructTag(coinId) {
        const coin = await this.provider.getObject(coinId);
        const coinTypeArg = types_1.Coin.getCoinTypeArg(coin);
        if (coinTypeArg == null) {
            throw new Error(`Object ${coinId} is not a valid coin type`);
        }
        return { struct: types_1.Coin.getCoinStructTag(coinTypeArg) };
    }
    async constructTransactionData(tx, originalTx, gasObjectId, signerAddress) {
        if (gasObjectId === undefined) {
            gasObjectId = await this.selectGasPaymentForTransaction(originalTx, signerAddress);
            if (gasObjectId === undefined) {
                throw new Error(`Unable to select a gas object with balance greater than or equal to ${originalTx.data.gasBudget}`);
            }
        }
        const gasPayment = await this.provider.getObjectRef(gasObjectId);
        const txData = {
            kind: {
                // TODO: support batch txns
                Single: tx,
            },
            gasPayment: gasPayment,
            // Need to keep in sync with
            // https://github.com/MystenLabs/sui/blob/f32877f2e40d35a008710c232e49b57aab886462/crates/sui-types/src/messages.rs#L338
            gasPrice: 1,
            gasBudget: originalTx.data.gasBudget,
            sender: signerAddress,
        };
        return await this.serializeTransactionData(txData);
    }
    /**
     * Serialize `TransactionData` into BCS encoded bytes
     */
    async serializeTransactionData(tx, 
    // TODO: derive the buffer size automatically
    size = 8192) {
        const format = 'TransactionData';
        const dataBytes = types_1.bcs.ser(format, tx, size).toBytes();
        const serialized = new Uint8Array(TYPE_TAG.length + dataBytes.length);
        serialized.set(TYPE_TAG);
        serialized.set(dataBytes, TYPE_TAG.length);
        return new base64_1.Base64DataBuffer(serialized);
    }
    /**
     * Deserialize BCS encoded bytes into `SignableTransaction`
     */
    async deserializeTransactionBytesToSignableTransaction(bytes) {
        return this.transformTransactionDataToSignableTransaction(await this.deserializeTransactionBytesToTransactionData(bytes));
    }
    /**
     * Deserialize BCS encoded bytes into `TransactionData`
     */
    async deserializeTransactionBytesToTransactionData(bytes) {
        return types_1.bcs.de('TransactionData', bytes.getData().slice(TYPE_TAG.length));
    }
    /**
     * Deserialize `TransactionData` to `SignableTransaction`
     */
    async transformTransactionDataToSignableTransaction(tx) {
        if ('Single' in tx.kind) {
            return this.transformTransactionToSignableTransaction(tx.kind.Single, tx.gasBudget, tx.gasPayment);
        }
        return Promise.all(tx.kind.Batch.map((t) => this.transformTransactionToSignableTransaction(t, tx.gasBudget, tx.gasPayment)));
    }
    async transformTransactionToSignableTransaction(tx, gasBudget, gasPayment) {
        if ('Pay' in tx) {
            return {
                kind: 'pay',
                data: {
                    inputCoins: tx.Pay.coins.map((c) => c.objectId),
                    recipients: tx.Pay.recipients,
                    amounts: tx.Pay.amounts,
                    gasPayment: gasPayment?.objectId,
                    gasBudget,
                },
            };
        }
        else if ('Call' in tx) {
            return {
                kind: 'moveCall',
                data: {
                    packageObjectId: tx.Call.package.objectId,
                    module: tx.Call.module,
                    function: tx.Call.function,
                    typeArguments: tx.Call.typeArguments,
                    arguments: await new call_arg_serializer_1.CallArgSerializer(this.provider).deserializeCallArgs(tx),
                    gasPayment: gasPayment?.objectId,
                    gasBudget,
                },
            };
        }
        else if ('TransferObject' in tx) {
            return {
                kind: 'transferObject',
                data: {
                    objectId: tx.TransferObject.object_ref.objectId,
                    recipient: tx.TransferObject.recipient,
                    gasPayment: gasPayment?.objectId,
                    gasBudget,
                },
            };
        }
        else if ('TransferSui' in tx) {
            return {
                kind: 'transferSui',
                data: {
                    suiObjectId: gasPayment.objectId,
                    recipient: tx.TransferSui.recipient,
                    amount: 'Some' in tx.TransferSui.amount ? tx.TransferSui.amount.Some : null,
                    gasBudget,
                },
            };
        }
        else if ('Publish' in tx) {
            return {
                kind: 'publish',
                data: {
                    compiledModules: tx.Publish.modules,
                    gasPayment: gasPayment?.objectId,
                    gasBudget,
                },
            };
        }
        throw new Error(`Unsupported transaction type ${tx}`);
    }
}
exports.LocalTxnDataSerializer = LocalTxnDataSerializer;
//# sourceMappingURL=local-txn-data-serializer.js.map
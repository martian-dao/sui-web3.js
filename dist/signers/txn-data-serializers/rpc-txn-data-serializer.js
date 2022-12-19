"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcTxnDataSerializer = void 0;
const index_guard_1 = require("../../types/index.guard");
const client_1 = require("../../rpc/client");
const base64_1 = require("../../serialization/base64");
/**
 * This is a temporary implementation of the `TxnDataSerializer` class
 * that uses the Sui Fullnode RPC API to serialize a transaction into BCS bytes. We will
 * deprecate this implementation once `LocalTxnDataSerializer` stabilizes.
 *
 * Prefer to use `LocalTxnDataSerializer` instead for better performance and safety, otherwise
 * this needs to be used with a trusted fullnode and it is recommended to verify the returned
 * BCS bytes matches the input.
 */
class RpcTxnDataSerializer {
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param endpoint URL to the Sui RPC endpoint
     * @param skipDataValidation default to `false`. If set to `true`, the rpc
     * client will not check if the responses from the RPC server conform to the schema
     * defined in the TypeScript SDK. The mismatches often happen when the SDK
     * is in a different version than the RPC server. Skipping the validation
     * can maximize the version compatibility of the SDK, as not all the schema
     * changes in the RPC response will affect the caller, but the caller needs to
     * understand that the data may not match the TypeSrcript definitions.
     */
    constructor(endpoint, skipDataValidation = false) {
        this.skipDataValidation = skipDataValidation;
        this.client = new client_1.JsonRpcClient(endpoint);
    }
    async serializeToBytes(signerAddress, unserializedTxn) {
        let endpoint;
        let args;
        switch (unserializedTxn.kind) {
            case 'transferObject':
                const t = unserializedTxn.data;
                endpoint = 'sui_transferObject';
                args = [
                    signerAddress,
                    t.objectId,
                    t.gasPayment,
                    t.gasBudget,
                    t.recipient,
                ];
                break;
            case 'transferSui':
                const transferSui = unserializedTxn.data;
                endpoint = 'sui_transferSui';
                args = [
                    signerAddress,
                    transferSui.suiObjectId,
                    transferSui.gasBudget,
                    transferSui.recipient,
                    transferSui.amount,
                ];
                break;
            case 'pay':
                const pay = unserializedTxn.data;
                endpoint = 'sui_pay';
                args = [
                    signerAddress,
                    pay.inputCoins,
                    pay.recipients,
                    pay.amounts,
                    pay.gasPayment,
                    pay.gasBudget,
                ];
                break;
            case 'paySui':
                const paySui = unserializedTxn.data;
                endpoint = 'sui_paySui';
                args = [
                    signerAddress,
                    paySui.inputCoins,
                    paySui.recipients,
                    paySui.amounts,
                    paySui.gasBudget,
                ];
                break;
            case 'payAllSui':
                const payAllSui = unserializedTxn.data;
                endpoint = 'sui_payAllSui';
                args = [
                    signerAddress,
                    payAllSui.inputCoins,
                    payAllSui.recipient,
                    payAllSui.gasBudget,
                ];
                break;
            case 'moveCall':
                const moveCall = unserializedTxn.data;
                endpoint = 'sui_moveCall';
                args = [
                    signerAddress,
                    moveCall.packageObjectId,
                    moveCall.module,
                    moveCall.function,
                    moveCall.typeArguments,
                    moveCall.arguments,
                    moveCall.gasPayment,
                    moveCall.gasBudget,
                ];
                break;
            case 'mergeCoin':
                const mergeCoin = unserializedTxn.data;
                endpoint = 'sui_mergeCoins';
                args = [
                    signerAddress,
                    mergeCoin.primaryCoin,
                    mergeCoin.coinToMerge,
                    mergeCoin.gasPayment,
                    mergeCoin.gasBudget,
                ];
                break;
            case 'splitCoin':
                const splitCoin = unserializedTxn.data;
                endpoint = 'sui_splitCoin';
                args = [
                    signerAddress,
                    splitCoin.coinObjectId,
                    splitCoin.splitAmounts,
                    splitCoin.gasPayment,
                    splitCoin.gasBudget,
                ];
                break;
            case 'publish':
                const publish = unserializedTxn.data;
                endpoint = 'sui_publish';
                args = [
                    signerAddress,
                    publish.compiledModules,
                    publish.gasPayment,
                    publish.gasBudget,
                ];
                break;
        }
        try {
            const resp = await this.client.requestWithType(endpoint, args, index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (e) {
            throw new Error(`Encountered error when calling RpcTxnDataSerialize for a ${unserializedTxn.kind} transaction for ` +
                `address ${signerAddress} for transaction ${JSON.stringify(unserializedTxn, null, 2)}: ${e}`);
        }
    }
}
exports.RpcTxnDataSerializer = RpcTxnDataSerializer;
//# sourceMappingURL=rpc-txn-data-serializer.js.map
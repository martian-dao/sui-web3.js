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
    async newTransferObject(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_transferObject', [signerAddress, t.objectId, t.gasPayment, t.gasBudget, t.recipient], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error transferring object: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    async newTransferSui(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_transferSui', [signerAddress, t.suiObjectId, t.gasBudget, t.recipient, t.amount], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error transferring Sui coin: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    async newPay(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_pay', [
                signerAddress,
                t.inputCoins,
                t.recipients,
                t.amounts,
                t.gasPayment,
                t.gasBudget,
            ], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error executing Pay transaction: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    async newPaySui(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_paySui', [signerAddress, t.inputCoins, t.recipients, t.amounts, t.gasBudget], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error executing PaySui transaction: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    async newPayAllSui(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_payAllSui', [signerAddress, t.inputCoins, t.recipient, t.gasBudget], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error executing PayAllSui transaction: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    async newMoveCall(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_moveCall', [
                signerAddress,
                t.packageObjectId,
                t.module,
                t.function,
                t.typeArguments,
                t.arguments,
                t.gasPayment,
                t.gasBudget,
            ], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error executing a move call: ${err} with args ${JSON.stringify(t)}`);
        }
    }
    async newMergeCoin(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_mergeCoins', [
                signerAddress,
                t.primaryCoin,
                t.coinToMerge,
                t.gasPayment,
                t.gasBudget,
            ], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error merging coin: ${err}`);
        }
    }
    async newSplitCoin(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_splitCoin', [
                signerAddress,
                t.coinObjectId,
                t.splitAmounts,
                t.gasPayment,
                t.gasBudget,
            ], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error splitting coin: ${err}`);
        }
    }
    async newPublish(signerAddress, t) {
        try {
            const resp = await this.client.requestWithType('sui_publish', [signerAddress, t.compiledModules, t.gasPayment, t.gasBudget], index_guard_1.isTransactionBytes, this.skipDataValidation);
            return new base64_1.Base64DataBuffer(resp.txBytes);
        }
        catch (err) {
            throw new Error(`Error publishing package ${err}`);
        }
    }
}
exports.RpcTxnDataSerializer = RpcTxnDataSerializer;
//# sourceMappingURL=rpc-txn-data-serializer.js.map
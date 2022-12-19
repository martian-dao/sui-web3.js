"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignerWithProvider = void 0;
const json_rpc_provider_1 = require("../providers/json-rpc-provider");
const void_provider_1 = require("../providers/void-provider");
const base64_1 = require("../serialization/base64");
const types_1 = require("../types");
const rpc_txn_data_serializer_1 = require("./txn-data-serializers/rpc-txn-data-serializer");
// See: sui/crates/sui-types/src/intent.rs 
// This is currently hardcoded with [IntentScope::TransactionData = 0, Version::V0 = 0, AppId::Sui = 0]
const INTENT_BYTES = [0, 0, 0];
///////////////////////////////
// Exported Abstracts
class SignerWithProvider {
    constructor(provider, serializer) {
        this.provider = provider || new void_provider_1.VoidProvider();
        let endpoint = '';
        let skipDataValidation = false;
        if (this.provider instanceof json_rpc_provider_1.JsonRpcProvider) {
            endpoint = this.provider.endpoints.fullNode;
            skipDataValidation = this.provider.options.skipDataValidation;
        }
        this.serializer =
            serializer || new rpc_txn_data_serializer_1.RpcTxnDataSerializer(endpoint, skipDataValidation);
    }
    ///////////////////
    // Sub-classes MAY override these
    /**
     * Request gas tokens from a faucet server and send to the signer
     * address
     * @param httpHeaders optional request headers
     */
    async requestSuiFromFaucet(httpHeaders) {
        return this.provider.requestSuiFromFaucet(await this.getAddress(), httpHeaders);
    }
    /**
     * Sign a transaction and submit to the Fullnode for execution. Only exists
     * on Fullnode
     */
    async signAndExecuteTransaction(transaction, requestType = 'WaitForLocalExecution') {
        // Handle submitting raw transaction bytes:
        if (transaction instanceof base64_1.Base64DataBuffer ||
            transaction.kind === 'bytes') {
            const txBytes = transaction instanceof base64_1.Base64DataBuffer
                ? transaction
                : new base64_1.Base64DataBuffer(transaction.data);
            const version = await this.provider.getRpcApiVersion();
            let dataToSign;
            let txBytesToSubmit;
            if (version?.major == 0 && version?.minor < 19) {
                dataToSign = txBytes;
                txBytesToSubmit = txBytes;
            }
            else {
                const intentMessage = new Uint8Array(INTENT_BYTES.length + txBytes.getLength());
                intentMessage.set(INTENT_BYTES);
                intentMessage.set(txBytes.getData(), INTENT_BYTES.length);
                dataToSign = new base64_1.Base64DataBuffer(intentMessage);
                txBytesToSubmit = txBytes;
            }
            const sig = await this.signData(dataToSign);
            return await this.provider.executeTransaction(txBytesToSubmit, sig.signatureScheme, sig.signature, sig.pubKey, requestType);
        }
        return await this.signAndExecuteTransaction(await this.serializer.serializeToBytes(await this.getAddress(), transaction), requestType);
    }
    async getTransactionDigest(tx) {
        let txBytes;
        if (tx instanceof base64_1.Base64DataBuffer || tx.kind === 'bytes') {
            txBytes =
                tx instanceof base64_1.Base64DataBuffer ? tx : new base64_1.Base64DataBuffer(tx.data);
        }
        else {
            txBytes = await this.serializer.serializeToBytes(await this.getAddress(), tx);
        }
        const version = await this.provider.getRpcApiVersion();
        const useIntentSigning = version != null && version.major >= 0 && version.minor > 18;
        let dataToSign;
        if (useIntentSigning) {
            const intentMessage = new Uint8Array(INTENT_BYTES.length + txBytes.getLength());
            intentMessage.set(INTENT_BYTES);
            intentMessage.set(txBytes.getData(), INTENT_BYTES.length);
            dataToSign = new base64_1.Base64DataBuffer(intentMessage);
        }
        else {
            dataToSign = txBytes;
        }
        const sig = await this.signData(dataToSign);
        const data = (0, types_1.deserializeTransactionBytesToTransactionData)(useIntentSigning, txBytes);
        return (0, types_1.generateTransactionDigest)(data, sig.signatureScheme, sig.signature, sig.pubKey, (version?.major == 0 && version?.minor < 18) ? 'base64' : 'base58', (version?.major == 0 && version?.minor < 18) ? false : true);
    }
    /**
     * Dry run a transaction and return the result.
     * @param tx the transaction as SignableTransaction or string (in base64) that will dry run
     * @returns The transaction effects
     */
    async dryRunTransaction(tx) {
        const address = await this.getAddress();
        let dryRunTxBytes;
        if (typeof tx === 'string') {
            dryRunTxBytes = tx;
        }
        else if (tx instanceof base64_1.Base64DataBuffer) {
            dryRunTxBytes = tx.toString();
        }
        else {
            switch (tx.kind) {
                case 'bytes':
                    dryRunTxBytes = new base64_1.Base64DataBuffer(tx.data).toString();
                    break;
                default:
                    dryRunTxBytes = (await this.serializer.serializeToBytes(address, tx)).toString();
                    break;
            }
        }
        return this.provider.dryRunTransaction(dryRunTxBytes);
    }
    /**
     *
     * Serialize and sign a `TransferObject` transaction and submit to the Fullnode
     * for execution
     */
    async transferObject(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'transferObject', data: transaction }, requestType);
    }
    /**
     *
     * Serialize and sign a `TransferSui` transaction and submit to the Fullnode
     * for execution
     */
    async transferSui(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'transferSui', data: transaction }, requestType);
    }
    /**
     *
     * Serialize and Sign a `Pay` transaction and submit to the fullnode for execution
     */
    async pay(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'pay', data: transaction }, requestType);
    }
    /**
     * Serialize and Sign a `PaySui` transaction and submit to the fullnode for execution
     */
    async paySui(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'paySui', data: transaction }, requestType);
    }
    /**
     * Serialize and Sign a `PayAllSui` transaction and submit to the fullnode for execution
     */
    async payAllSui(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'payAllSui', data: transaction }, requestType);
    }
    /**
     *
     * Serialize and sign a `MergeCoin` transaction and submit to the Fullnode
     * for execution
     */
    async mergeCoin(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'mergeCoin', data: transaction }, requestType);
    }
    /**
     *
     * Serialize and sign a `SplitCoin` transaction and submit to the Fullnode
     * for execution
     */
    async splitCoin(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'splitCoin', data: transaction }, requestType);
    }
    /**
     * Serialize and sign a `MoveCall` transaction and submit to the Fullnode
     * for execution
     */
    async executeMoveCall(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'moveCall', data: transaction }, requestType);
    }
    /**
     *
     * Serialize and sign a `Publish` transaction and submit to the Fullnode
     * for execution
     */
    async publish(transaction, requestType = 'WaitForLocalExecution') {
        return this.signAndExecuteTransaction({ kind: 'publish', data: transaction }, requestType);
    }
    /**
     * Returns the estimated gas cost for the transaction
     * @param tx The transaction to estimate the gas cost. When string it is assumed it's a serialized tx in base64
     * @returns total gas cost estimation
     * @throws whens fails to estimate the gas cost
     */
    async getGasCostEstimation(...args) {
        const txEffects = await this.dryRunTransaction(...args);
        const gasEstimation = (0, types_1.getTotalGasUsed)(txEffects);
        if (typeof gasEstimation === 'undefined') {
            throw new Error('Failed to estimate the gas cost from transaction');
        }
        return gasEstimation;
    }
}
exports.SignerWithProvider = SignerWithProvider;
//# sourceMappingURL=signer-with-provider.js.map
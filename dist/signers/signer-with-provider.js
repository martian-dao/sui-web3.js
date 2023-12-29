"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignerWithProvider = void 0;
const bcs_1 = require("@mysten/bcs");
const TransactionBlock_1 = require("../builder/TransactionBlock");
const TransactionBlockData_1 = require("../builder/TransactionBlockData");
const index_1 = require("../types/index");
const intent_1 = require("../cryptography/intent");
const index_2 = require("../bcs/index");
///////////////////////////////
// Exported Abstracts
class SignerWithProvider {
    /**
     * @deprecated Use `client` instead.
     */
    get provider() {
        return this.client;
    }
    ///////////////////
    // Sub-classes MAY override these
    /**
     * Request gas tokens from a faucet server and send to the signer
     * address
     * @param httpHeaders optional request headers
     * @deprecated Use `@mysten/sui.js/faucet` instead.
     */
    async requestSuiFromFaucet(httpHeaders) {
        if (!('requestSuiFromFaucet' in this.provider)) {
            throw new Error('To request SUI from faucet, please use @mysten/sui.js/faucet instead');
        }
        return this.provider.requestSuiFromFaucet(await this.getAddress(), httpHeaders);
    }
    constructor(client) {
        this.client = client;
    }
    /**
     * Sign a message using the keypair, with the `PersonalMessage` intent.
     */
    async signMessage(input) {
        const signature = await this.signData((0, intent_1.messageWithIntent)(intent_1.IntentScope.PersonalMessage, index_2.bcs.ser(['vector', 'u8'], input.message).toBytes()));
        return {
            messageBytes: (0, bcs_1.toB64)(input.message),
            signature,
        };
    }
    async prepareTransactionBlock(transactionBlock) {
        if ((0, TransactionBlock_1.isTransactionBlock)(transactionBlock)) {
            // If the sender has not yet been set on the transaction, then set it.
            // NOTE: This allows for signing transactions with mis-matched senders, which is important for sponsored transactions.
            transactionBlock.setSenderIfNotSet(await this.getAddress());
            return await transactionBlock.build({
                client: this.client,
            });
        }
        if (transactionBlock instanceof Uint8Array) {
            return transactionBlock;
        }
        throw new Error('Unknown transaction format');
    }
    async getIntentMessage(input) {
        const transactionBlockBytes = await this.prepareTransactionBlock(input.transactionBlock);
        const intent = (0, intent_1.messageWithIntent)(intent_1.IntentScope.TransactionData, transactionBlockBytes);
        return [intent, transactionBlockBytes];
    }
    /**
     * Sign a transaction.
     */
    async signTransactionBlock(input) {
        const transactionBlockBytes = await this.prepareTransactionBlock(input.transactionBlock);
        const intentMessage = (0, intent_1.messageWithIntent)(intent_1.IntentScope.TransactionData, transactionBlockBytes);
        const signature = await this.signData(intentMessage);
        return {
            transactionBlockBytes: (0, bcs_1.toB64)(transactionBlockBytes),
            signature,
        };
    }
    /**
     * Sign a transaction block and submit to the Fullnode for execution.
     *
     * @param options specify which fields to return (e.g., transaction, effects, events, etc).
     * By default, only the transaction digest will be returned.
     * @param requestType WaitForEffectsCert or WaitForLocalExecution, see details in `ExecuteTransactionRequestType`.
     * Defaults to `WaitForLocalExecution` if options.show_effects or options.show_events is true
     */
    async signAndExecuteTransactionBlock(input) {
        const { transactionBlockBytes, signature } = await this.signTransactionBlock({
            transactionBlock: input.transactionBlock,
        });
        return await this.client.executeTransactionBlock({
            transactionBlock: transactionBlockBytes,
            signature,
            options: input.options,
            requestType: input.requestType,
        });
    }
    /**
     * Derive transaction digest from
     * @param tx BCS serialized transaction data or a `Transaction` object
     * @returns transaction digest
     */
    async getTransactionBlockDigest(tx) {
        if ((0, TransactionBlock_1.isTransactionBlock)(tx)) {
            tx.setSenderIfNotSet(await this.getAddress());
            return tx.getDigest({ client: this.client });
        }
        else if (tx instanceof Uint8Array) {
            return TransactionBlockData_1.TransactionBlockDataBuilder.getDigestFromBytes(tx);
        }
        else {
            throw new Error('Unknown transaction format.');
        }
    }
    /**
     * Runs the transaction in dev-inpsect mode. Which allows for nearly any
     * transaction (or Move call) with any arguments. Detailed results are
     * provided, including both the transaction effects and any return values.
     */
    async devInspectTransactionBlock(input) {
        const address = await this.getAddress();
        return this.client.devInspectTransactionBlock({
            sender: address,
            ...input,
        });
    }
    /**
     * Dry run a transaction and return the result.
     */
    async dryRunTransactionBlock(input) {
        let dryRunTxBytes;
        if ((0, TransactionBlock_1.isTransactionBlock)(input.transactionBlock)) {
            input.transactionBlock.setSenderIfNotSet(await this.getAddress());
            dryRunTxBytes = await input.transactionBlock.build({
                client: this.client,
            });
        }
        else if (typeof input.transactionBlock === 'string') {
            dryRunTxBytes = (0, bcs_1.fromB64)(input.transactionBlock);
        }
        else if (input.transactionBlock instanceof Uint8Array) {
            dryRunTxBytes = input.transactionBlock;
        }
        else {
            throw new Error('Unknown transaction format');
        }
        return this.client.dryRunTransactionBlock({
            transactionBlock: dryRunTxBytes,
        });
    }
    /**
     * Returns the estimated gas cost for the transaction
     * @param tx The transaction to estimate the gas cost. When string it is assumed it's a serialized tx in base64
     * @returns total gas cost estimation
     * @throws whens fails to estimate the gas cost
     */
    async getGasCostEstimation(...args) {
        const txEffects = await this.dryRunTransactionBlock(...args);
        // @ts-ignore
        const gasEstimation = (0, index_1.getTotalGasUsedUpperBound)(txEffects.effects);
        if (typeof gasEstimation === 'undefined') {
            throw new Error('Failed to estimate the gas cost from transaction');
        }
        return gasEstimation;
    }
}
exports.SignerWithProvider = SignerWithProvider;
//# sourceMappingURL=signer-with-provider.js.map
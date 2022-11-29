"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcProviderWithCache = void 0;
const index_guard_1 = require("../types/index.guard");
const types_1 = require("../types");
const json_rpc_provider_1 = require("./json-rpc-provider");
class JsonRpcProviderWithCache extends json_rpc_provider_1.JsonRpcProvider {
    constructor() {
        super(...arguments);
        /**
         * A list of object references which are being tracked.
         *
         * Whenever an object is fetched or updated within the transaction,
         * its record gets updated.
         */
        this.objectRefs = new Map();
    }
    // Objects
    async getObjectsOwnedByAddress(address) {
        const resp = await super.getObjectsOwnedByAddress(address);
        resp.forEach((r) => this.updateObjectRefCache(r));
        return resp;
    }
    async getObjectsOwnedByObject(objectId) {
        const resp = await super.getObjectsOwnedByObject(objectId);
        resp.forEach((r) => this.updateObjectRefCache(r));
        return resp;
    }
    async getObject(objectId) {
        const resp = await super.getObject(objectId);
        this.updateObjectRefCache(resp);
        return resp;
    }
    async getObjectRef(objectId, skipCache = false) {
        const normalizedId = (0, types_1.normalizeSuiObjectId)(objectId);
        if (!skipCache && this.objectRefs.has(normalizedId)) {
            return this.objectRefs.get(normalizedId);
        }
        const ref = await super.getObjectRef(objectId);
        this.updateObjectRefCache(ref);
        return ref;
    }
    async getObjectBatch(objectIds) {
        const resp = await super.getObjectBatch(objectIds);
        resp.forEach((r) => this.updateObjectRefCache(r));
        return resp;
    }
    // Transactions
    async executeTransaction(txnBytes, signatureScheme, signature, pubkey, requestType = 'WaitForEffectsCert') {
        if (requestType !== 'WaitForEffectsCert') {
            console.warn(`It's not recommended to use JsonRpcProviderWithCache with the request ` +
                `type other than 'WaitForEffectsCert' for executeTransaction. Using ` +
                `the '${requestType}' may result in stale cache and a failure in subsequent transactions.`);
        }
        const resp = await super.executeTransaction(txnBytes, signatureScheme, signature, pubkey, requestType);
        const effects = (0, types_1.getTransactionEffects)(resp);
        if (effects != null) {
            this.updateObjectRefCacheFromTransactionEffects(effects);
        }
        return resp;
    }
    updateObjectRefCache(newData) {
        if (newData == null) {
            return;
        }
        const ref = (0, index_guard_1.isSuiObjectRef)(newData) ? newData : (0, types_1.getObjectReference)(newData);
        if (ref != null) {
            this.objectRefs.set(ref.objectId, ref);
        }
    }
    updateObjectRefCacheFromTransactionEffects(effects) {
        effects.created?.forEach((r) => this.updateObjectRefCache(r.reference));
        effects.mutated?.forEach((r) => this.updateObjectRefCache(r.reference));
        effects.unwrapped?.forEach((r) => this.updateObjectRefCache(r.reference));
        effects.wrapped?.forEach((r) => this.updateObjectRefCache(r));
        effects.deleted?.forEach((r) => this.objectRefs.delete(r.objectId));
    }
}
exports.JsonRpcProviderWithCache = JsonRpcProviderWithCache;
//# sourceMappingURL=json-rpc-provider-with-cache.js.map
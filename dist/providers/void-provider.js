"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidProvider = void 0;
const provider_1 = require("./provider");
class VoidProvider extends provider_1.Provider {
    // API Version
    async getRpcApiVersion() {
        throw this.newError('getRpcApiVersion');
    }
    getCoinMetadata(_coinType) {
        throw new Error('getCoinMetadata');
    }
    // Faucet
    async requestSuiFromFaucet(_recipient, _httpHeaders) {
        throw this.newError('requestSuiFromFaucet');
    }
    // Objects
    async getObjectsOwnedByAddress(_address) {
        throw this.newError('getObjectsOwnedByAddress');
    }
    async getGasObjectsOwnedByAddress(_address) {
        throw this.newError('getGasObjectsOwnedByAddress');
    }
    async getCoinBalancesOwnedByAddress(_address, _typeArg) {
        throw this.newError('getCoinBalancesOwnedByAddress');
    }
    async selectCoinsWithBalanceGreaterThanOrEqual(_address, _amount, _typeArg, _exclude = []) {
        throw this.newError('selectCoinsWithBalanceGreaterThanOrEqual');
    }
    async selectCoinSetWithCombinedBalanceGreaterThanOrEqual(_address, _amount, _typeArg, _exclude) {
        throw this.newError('selectCoinSetWithCombinedBalanceGreaterThanOrEqual');
    }
    async getObject(_objectId) {
        throw this.newError('getObject');
    }
    async getObjectRef(_objectId) {
        throw this.newError('getObjectRef');
    }
    // Transactions
    async getTransaction(_digest) {
        throw this.newError('getTransaction');
    }
    async executeTransaction(_txnBytes, _signatureScheme, _signature, _pubkey, _requestType) {
        throw this.newError('executeTransaction with request Type');
    }
    dryRunTransaction(_txBytes) {
        throw this.newError('dryRunTransaction');
    }
    async getTotalTransactionNumber() {
        throw this.newError('getTotalTransactionNumber');
    }
    async getTransactionDigestsInRange(_start, _end) {
        throw this.newError('getTransactionDigestsInRange');
    }
    async getMoveFunctionArgTypes(_objectId, _moduleName, _functionName) {
        throw this.newError('getMoveFunctionArgTypes');
    }
    async getNormalizedMoveModulesByPackage(_objectId) {
        throw this.newError('getNormalizedMoveModulesByPackage');
    }
    async getNormalizedMoveModule(_objectId, _moduleName) {
        throw this.newError('getNormalizedMoveModule');
    }
    async getNormalizedMoveFunction(_objectId, _moduleName, _functionName) {
        throw this.newError('getNormalizedMoveFunction');
    }
    async getNormalizedMoveStruct(_objectId, _oduleName, _structName) {
        throw this.newError('getNormalizedMoveStruct');
    }
    async syncAccountState(_address) {
        throw this.newError('syncAccountState');
    }
    async subscribeEvent(_filter, _onMessage) {
        throw this.newError('subscribeEvent');
    }
    async unsubscribeEvent(_id) {
        throw this.newError('unsubscribeEvent');
    }
    newError(operation) {
        return new Error(`Please use a valid provider for ${operation}`);
    }
    async getTransactions(_query, _cursor, _limit, _order) {
        throw this.newError('getTransactions');
    }
    async getEvents(_query, _cursor, _limit, _order) {
        throw this.newError('getEvents');
    }
}
exports.VoidProvider = VoidProvider;
//# sourceMappingURL=void-provider.js.map
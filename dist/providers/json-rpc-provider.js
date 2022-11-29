"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcProvider = void 0;
const provider_1 = require("./provider");
const client_1 = require("../rpc/client");
const index_guard_1 = require("../types/index.guard");
const types_1 = require("../types");
const websocket_client_1 = require("../rpc/websocket-client");
const api_endpoints_1 = require("../utils/api-endpoints");
const faucet_client_1 = require("../rpc/faucet-client");
const isNumber = (val) => typeof val === 'number';
const isAny = (_val) => true;
const DEFAULT_OPTIONS = {
    skipDataValidation: true,
    socketOptions: websocket_client_1.DEFAULT_CLIENT_OPTIONS,
    versionCacheTimoutInSeconds: 600,
};
class JsonRpcProvider extends provider_1.Provider {
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param endpoint URL to the Sui RPC endpoint, or a `Network` enum
     * @param options configuration options for the provider
     */
    constructor(endpoint = api_endpoints_1.Network.DEVNET, options = DEFAULT_OPTIONS) {
        super();
        this.options = options;
        if (Object.values(api_endpoints_1.Network).includes(endpoint)) {
            this.endpoints = api_endpoints_1.NETWORK_TO_API[endpoint];
        }
        else {
            this.endpoints = {
                fullNode: endpoint,
                faucet: options.faucetURL,
            };
        }
        const opts = { ...DEFAULT_OPTIONS, ...options };
        this.client = new client_1.JsonRpcClient(this.endpoints.fullNode);
        this.wsClient = new websocket_client_1.WebsocketClient(this.endpoints.fullNode, opts.skipDataValidation, opts.socketOptions);
    }
    async getRpcApiVersion() {
        if (this.rpcApiVersion &&
            this.cacheExpiry &&
            this.cacheExpiry <= Date.now()) {
            return this.rpcApiVersion;
        }
        try {
            const resp = await this.client.requestWithType('rpc.discover', [], isAny, this.options.skipDataValidation);
            this.rpcApiVersion = (0, types_1.parseVersionFromString)(resp.info.version);
            this.cacheExpiry =
                Date.now() + (this.options.versionCacheTimoutInSeconds ?? 0);
            return this.rpcApiVersion;
        }
        catch (err) {
            console.warn('Error fetching version number of the RPC API', err);
        }
        return undefined;
    }
    async requestSuiFromFaucet(recipient, httpHeaders) {
        if (!this.endpoints.faucet) {
            throw new Error('Faucet URL is not specified');
        }
        return (0, faucet_client_1.requestSuiFromFaucet)(this.endpoints.faucet, recipient, httpHeaders);
    }
    // Move info
    async getMoveFunctionArgTypes(packageId, moduleName, functionName) {
        try {
            return await this.client.requestWithType('sui_getMoveFunctionArgTypes', [packageId, moduleName, functionName], index_guard_1.isSuiMoveFunctionArgTypes, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching Move function arg types with package object ID: ${packageId}, module name: ${moduleName}, function name: ${functionName}`);
        }
    }
    async getNormalizedMoveModulesByPackage(packageId) {
        // TODO: Add caching since package object does not change
        try {
            return await this.client.requestWithType('sui_getNormalizedMoveModulesByPackage', [packageId], index_guard_1.isSuiMoveNormalizedModules, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching package: ${err} for package ${packageId}`);
        }
    }
    async getNormalizedMoveModule(packageId, moduleName) {
        // TODO: Add caching since package object does not change
        try {
            return await this.client.requestWithType('sui_getNormalizedMoveModule', [packageId, moduleName], index_guard_1.isSuiMoveNormalizedModule, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching module: ${err} for package ${packageId}, module ${moduleName}}`);
        }
    }
    async getNormalizedMoveFunction(packageId, moduleName, functionName) {
        // TODO: Add caching since package object does not change
        try {
            return await this.client.requestWithType('sui_getNormalizedMoveFunction', [packageId, moduleName, functionName], index_guard_1.isSuiMoveNormalizedFunction, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching function: ${err} for package ${packageId}, module ${moduleName} and function ${functionName}}`);
        }
    }
    async getNormalizedMoveStruct(packageId, moduleName, structName) {
        try {
            return await this.client.requestWithType('sui_getNormalizedMoveStruct', [packageId, moduleName, structName], index_guard_1.isSuiMoveNormalizedStruct, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching struct: ${err} for package ${packageId}, module ${moduleName} and struct ${structName}}`);
        }
    }
    // Objects
    async getObjectsOwnedByAddress(address) {
        try {
            return await this.client.requestWithType('sui_getObjectsOwnedByAddress', [address], index_guard_1.isGetOwnedObjectsResponse, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching owned object: ${err} for address ${address}`);
        }
    }
    async getGasObjectsOwnedByAddress(address) {
        const objects = await this.getObjectsOwnedByAddress(address);
        return objects.filter((obj) => types_1.Coin.isSUI(obj));
    }
    getCoinDenominationInfo(coinType) {
        const [packageId, module, symbol] = coinType.split('::');
        if ((0, types_1.normalizeSuiAddress)(packageId) !== (0, types_1.normalizeSuiAddress)('0x2') ||
            module != 'sui' ||
            symbol !== 'SUI') {
            throw new Error('only SUI coin is supported in getCoinDenominationInfo for now.');
        }
        return {
            coinType: coinType,
            basicUnit: 'MIST',
            decimalNumber: 9,
        };
    }
    async getCoinBalancesOwnedByAddress(address, typeArg) {
        const objects = await this.getObjectsOwnedByAddress(address);
        const coinIds = objects
            .filter((obj) => types_1.Coin.isCoin(obj) &&
            (typeArg === undefined || typeArg === types_1.Coin.getCoinTypeArg(obj)))
            .map((c) => c.objectId);
        return await this.getObjectBatch(coinIds);
    }
    async selectCoinsWithBalanceGreaterThanOrEqual(address, amount, typeArg = types_1.SUI_TYPE_ARG, exclude = []) {
        const coins = await this.getCoinBalancesOwnedByAddress(address, typeArg);
        return (await types_1.Coin.selectCoinsWithBalanceGreaterThanOrEqual(coins, amount, exclude));
    }
    async selectCoinSetWithCombinedBalanceGreaterThanOrEqual(address, amount, typeArg = types_1.SUI_TYPE_ARG, exclude = []) {
        const coins = await this.getCoinBalancesOwnedByAddress(address, typeArg);
        return (await types_1.Coin.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(coins, amount, exclude));
    }
    async getObjectsOwnedByObject(objectId) {
        try {
            return await this.client.requestWithType('sui_getObjectsOwnedByObject', [objectId], index_guard_1.isGetOwnedObjectsResponse, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching owned object: ${err} for objectId ${objectId}`);
        }
    }
    async getObject(objectId) {
        try {
            return await this.client.requestWithType('sui_getObject', [objectId], index_guard_1.isGetObjectDataResponse, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching object info: ${err} for id ${objectId}`);
        }
    }
    async getObjectRef(objectId) {
        const resp = await this.getObject(objectId);
        return (0, types_1.getObjectReference)(resp);
    }
    async getObjectBatch(objectIds) {
        const requests = objectIds.map((id) => ({
            method: 'sui_getObject',
            args: [id],
        }));
        try {
            return await this.client.batchRequestWithType(requests, index_guard_1.isGetObjectDataResponse, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching object info: ${err} for id ${objectIds}`);
        }
    }
    // Transactions
    async getTransactions(query, cursor = null, limit = null, order = 'descending') {
        try {
            return await this.client.requestWithType('sui_getTransactions', [query, cursor, limit, order === 'descending'], index_guard_1.isPaginatedTransactionDigests, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error getting transactions for query: ${err} for query ${query}`);
        }
    }
    async getTransactionsForObject(objectID, descendingOrder = true) {
        const requests = [
            {
                method: 'sui_getTransactions',
                args: [{ InputObject: objectID }, null, null, descendingOrder],
            },
            {
                method: 'sui_getTransactions',
                args: [{ MutatedObject: objectID }, null, null, descendingOrder],
            },
        ];
        try {
            const results = await this.client.batchRequestWithType(requests, index_guard_1.isPaginatedTransactionDigests, this.options.skipDataValidation);
            return [...results[0].data, ...results[1].data];
        }
        catch (err) {
            throw new Error(`Error getting transactions for object: ${err} for id ${objectID}`);
        }
    }
    async getTransactionsForAddress(addressID, descendingOrder = true) {
        const requests = [
            {
                method: 'sui_getTransactions',
                args: [{ ToAddress: addressID }, null, null, descendingOrder],
            },
            {
                method: 'sui_getTransactions',
                args: [{ FromAddress: addressID }, null, null, descendingOrder],
            },
        ];
        try {
            const results = await this.client.batchRequestWithType(requests, index_guard_1.isPaginatedTransactionDigests, this.options.skipDataValidation);
            return [...results[0].data, ...results[1].data];
        }
        catch (err) {
            throw new Error(`Error getting transactions for address: ${err} for id ${addressID}`);
        }
    }
    async getTransactionWithEffects(digest) {
        try {
            const resp = await this.client.requestWithType('sui_getTransaction', [digest], index_guard_1.isSuiTransactionResponse, this.options.skipDataValidation);
            return resp;
        }
        catch (err) {
            throw new Error(`Error getting transaction with effects: ${err} for digest ${digest}`);
        }
    }
    async getTransactionWithEffectsBatch(digests) {
        const requests = digests.map((d) => ({
            method: 'sui_getTransaction',
            args: [d],
        }));
        try {
            return await this.client.batchRequestWithType(requests, index_guard_1.isSuiTransactionResponse, this.options.skipDataValidation);
        }
        catch (err) {
            const list = digests.join(', ').substring(0, -2);
            throw new Error(`Error getting transaction effects: ${err} for digests [${list}]`);
        }
    }
    async executeTransaction(txnBytes, signatureScheme, signature, pubkey, requestType = 'WaitForEffectsCert') {
        try {
            const resp = await this.client.requestWithType('sui_executeTransaction', [txnBytes, signatureScheme, signature, pubkey, requestType], index_guard_1.isSuiExecuteTransactionResponse, this.options.skipDataValidation);
            return resp;
        }
        catch (err) {
            throw new Error(`Error executing transaction with request type: ${err}}`);
        }
    }
    async getTotalTransactionNumber() {
        try {
            const resp = await this.client.requestWithType('sui_getTotalTransactionNumber', [], isNumber, this.options.skipDataValidation);
            return resp;
        }
        catch (err) {
            throw new Error(`Error fetching total transaction number: ${err}`);
        }
    }
    async getTransactionDigestsInRange(start, end) {
        try {
            return await this.client.requestWithType('sui_getTransactionsInRange', [start, end], index_guard_1.isGetTxnDigestsResponse, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error fetching transaction digests in range: ${err} for range ${start}-${end}`);
        }
    }
    // Events
    async getEvents(query, cursor, limit, order = 'descending') {
        try {
            return await this.client.requestWithType('sui_getEvents', [query, cursor, limit, order === 'descending'], index_guard_1.isPaginatedEvents, this.options.skipDataValidation);
        }
        catch (err) {
            throw new Error(`Error getting events for query: ${err} for query ${query}`);
        }
    }
    async subscribeEvent(filter, onMessage) {
        return this.wsClient.subscribeEvent(filter, onMessage);
    }
    async unsubscribeEvent(id) {
        return this.wsClient.unsubscribeEvent(id);
    }
    async dryRunTransaction(txBytes) {
        try {
            const resp = await this.client.requestWithType('sui_dryRunTransaction', [txBytes], index_guard_1.isTransactionEffects, this.options.skipDataValidation);
            return resp;
        }
        catch (err) {
            throw new Error(`Error dry running transaction with request type: ${err}}`);
        }
    }
}
exports.JsonRpcProvider = JsonRpcProvider;
//# sourceMappingURL=json-rpc-provider.js.map
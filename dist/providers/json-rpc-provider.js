"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcProvider = void 0;
const client_1 = require("../rpc/client");
const index_1 = require("../types/index");
const dynamic_fields_1 = require("../types/dynamic_fields");
const websocket_client_1 = require("../rpc/websocket-client");
const superstruct_1 = require("superstruct");
const bcs_1 = require("@mysten/bcs");
const connection_1 = require("../rpc/connection");
const index_2 = require("../builder/index");
const checkpoints_1 = require("../types/checkpoints");
const metrics_1 = require("../types/metrics");
const epochs_1 = require("../types/epochs");
const index_3 = require("../faucet/index");
const sui_types_1 = require("../utils/sui-types");
const framework_1 = require("../framework/framework");
const DEFAULT_OPTIONS = {
    socketOptions: websocket_client_1.DEFAULT_CLIENT_OPTIONS,
    versionCacheTimeoutInSeconds: 600,
};
class JsonRpcProvider {
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param connection The `Connection` object containing configuration for the network.
     * @param options configuration options for the provider
     */
    constructor(
    // TODO: Probably remove the default endpoint here:
    connection = connection_1.devnetConnection, options = DEFAULT_OPTIONS) {
        this.options = options;
        this.connection = connection;
        const opts = { ...DEFAULT_OPTIONS, ...options };
        this.options = opts;
        // TODO: add header for websocket request
        this.client = opts.rpcClient ?? new client_1.JsonRpcClient(this.connection.fullnode);
        this.wsClient =
            opts.websocketClient ??
                new websocket_client_1.WebsocketClient(this.connection.websocket, opts.socketOptions);
    }
    async getRpcApiVersion() {
        if (this.rpcApiVersion &&
            this.cacheExpiry &&
            this.cacheExpiry <= Date.now()) {
            return this.rpcApiVersion;
        }
        try {
            const resp = await this.client.requestWithType('rpc.discover', [], (0, superstruct_1.any)());
            this.rpcApiVersion = resp.info.version;
            this.cacheExpiry =
                // Date.now() is in milliseconds, but the timeout is in seconds
                Date.now() + (this.options.versionCacheTimeoutInSeconds ?? 0) * 1000;
            return this.rpcApiVersion;
        }
        catch (err) {
            console.warn('Error fetching version number of the RPC API', err);
        }
        return undefined;
    }
    /** @deprecated Use `@mysten/sui.js/faucet` instead. */
    async requestSuiFromFaucet(recipient, headers) {
        if (!this.connection.faucet) {
            throw new Error('Faucet URL is not specified');
        }
        return (0, index_3.requestSuiFromFaucetV0)({
            host: this.connection.faucet,
            recipient,
            headers,
        });
    }
    /**
     * Get all Coin<`coin_type`> objects owned by an address.
     */
    async getCoins(input) {
        if (!input.owner || !(0, sui_types_1.isValidSuiAddress)((0, sui_types_1.normalizeSuiAddress)(input.owner))) {
            throw new Error('Invalid Sui address');
        }
        return await this.client.requestWithType('suix_getCoins', [input.owner, input.coinType, input.cursor, input.limit], index_1.PaginatedCoins);
    }
    /**
     * Get all Coin objects owned by an address.
     */
    async getAllCoins(input) {
        if (!input.owner || !(0, sui_types_1.isValidSuiAddress)((0, sui_types_1.normalizeSuiAddress)(input.owner))) {
            throw new Error('Invalid Sui address');
        }
        return await this.client.requestWithType('suix_getAllCoins', [input.owner, input.cursor, input.limit], index_1.PaginatedCoins);
    }
    /**
     * Get the total coin balance for one coin type, owned by the address owner.
     */
    async getBalance(input) {
        if (!input.owner || !(0, sui_types_1.isValidSuiAddress)((0, sui_types_1.normalizeSuiAddress)(input.owner))) {
            throw new Error('Invalid Sui address');
        }
        return await this.client.requestWithType('suix_getBalance', [input.owner, input.coinType], index_1.CoinBalance);
    }
    /**
     * Get the total coin balance for all coin types, owned by the address owner.
     */
    async getAllBalances(input) {
        if (!input.owner || !(0, sui_types_1.isValidSuiAddress)((0, sui_types_1.normalizeSuiAddress)(input.owner))) {
            throw new Error('Invalid Sui address');
        }
        return await this.client.requestWithType('suix_getAllBalances', [input.owner], (0, superstruct_1.array)(index_1.CoinBalance));
    }
    /**
     * Fetch CoinMetadata for a given coin type
     */
    async getCoinMetadata(input) {
        return await this.client.requestWithType('suix_getCoinMetadata', [input.coinType], framework_1.CoinMetadataStruct);
    }
    /**
     *  Fetch total supply for a coin
     */
    async getTotalSupply(input) {
        return await this.client.requestWithType('suix_getTotalSupply', [input.coinType], index_1.CoinSupply);
    }
    /**
     * Invoke any RPC method
     * @param method the method to be invoked
     * @param args the arguments to be passed to the RPC request
     */
    async call(method, params) {
        return await this.client.request(method, params);
    }
    /**
     * Get Move function argument types like read, write and full access
     */
    async getMoveFunctionArgTypes(input) {
        return await this.client.requestWithType('sui_getMoveFunctionArgTypes', [input.package, input.module, input.function], index_1.SuiMoveFunctionArgTypes);
    }
    /**
     * Get a map from module name to
     * structured representations of Move modules
     */
    async getNormalizedMoveModulesByPackage(input) {
        return await this.client.requestWithType('sui_getNormalizedMoveModulesByPackage', [input.package], index_1.SuiMoveNormalizedModules);
    }
    /**
     * Get a structured representation of Move module
     */
    async getNormalizedMoveModule(input) {
        return await this.client.requestWithType('sui_getNormalizedMoveModule', [input.package, input.module], index_1.SuiMoveNormalizedModule);
    }
    /**
     * Get a structured representation of Move function
     */
    async getNormalizedMoveFunction(input) {
        return await this.client.requestWithType('sui_getNormalizedMoveFunction', [input.package, input.module, input.function], index_1.SuiMoveNormalizedFunction);
    }
    /**
     * Get a structured representation of Move struct
     */
    async getNormalizedMoveStruct(input) {
        return await this.client.requestWithType('sui_getNormalizedMoveStruct', [input.package, input.module, input.struct], index_1.SuiMoveNormalizedStruct);
    }
    /**
     * Get all objects owned by an address
     */
    async getOwnedObjects(input) {
        if (!input.owner || !(0, sui_types_1.isValidSuiAddress)((0, sui_types_1.normalizeSuiAddress)(input.owner))) {
            throw new Error('Invalid Sui address');
        }
        return await this.client.requestWithType('suix_getOwnedObjects', [
            input.owner,
            {
                filter: input.filter,
                options: input.options,
            },
            input.cursor,
            input.limit,
        ], index_1.PaginatedObjectsResponse);
    }
    /**
     * Get details about an object
     */
    async getObject(input) {
        if (!input.id || !(0, sui_types_1.isValidSuiObjectId)((0, sui_types_1.normalizeSuiObjectId)(input.id))) {
            throw new Error('Invalid Sui Object id');
        }
        return await this.client.requestWithType('sui_getObject', [input.id, input.options], index_1.SuiObjectResponse);
    }
    async tryGetPastObject(input) {
        return await this.client.requestWithType('sui_tryGetPastObject', [input.id, input.version, input.options], index_1.ObjectRead);
    }
    /**
     * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
     */
    async multiGetObjects(input) {
        input.ids.forEach((id) => {
            if (!id || !(0, sui_types_1.isValidSuiObjectId)((0, sui_types_1.normalizeSuiObjectId)(id))) {
                throw new Error(`Invalid Sui Object id ${id}`);
            }
        });
        const hasDuplicates = input.ids.length !== new Set(input.ids).size;
        if (hasDuplicates) {
            throw new Error(`Duplicate object ids in batch call ${input.ids}`);
        }
        return await this.client.requestWithType('sui_multiGetObjects', [input.ids, input.options], (0, superstruct_1.array)(index_1.SuiObjectResponse));
    }
    /**
     * Get transaction blocks for a given query criteria
     */
    async queryTransactionBlocks(input) {
        return await this.client.requestWithType('suix_queryTransactionBlocks', [
            {
                filter: input.filter,
                options: input.options,
            },
            input.cursor,
            input.limit,
            (input.order || 'descending') === 'descending',
        ], index_1.PaginatedTransactionResponse);
    }
    async getTransactionBlock(input) {
        if (!(0, sui_types_1.isValidTransactionDigest)(input.digest)) {
            throw new Error('Invalid Transaction digest');
        }
        return await this.client.requestWithType('sui_getTransactionBlock', [input.digest, input.options], index_1.SuiTransactionBlockResponse);
    }
    async multiGetTransactionBlocks(input) {
        input.digests.forEach((d) => {
            if (!(0, sui_types_1.isValidTransactionDigest)(d)) {
                throw new Error(`Invalid Transaction digest ${d}`);
            }
        });
        const hasDuplicates = input.digests.length !== new Set(input.digests).size;
        if (hasDuplicates) {
            throw new Error(`Duplicate digests in batch call ${input.digests}`);
        }
        return await this.client.requestWithType('sui_multiGetTransactionBlocks', [input.digests, input.options], (0, superstruct_1.array)(index_1.SuiTransactionBlockResponse));
    }
    async executeTransactionBlock(input) {
        return await this.client.requestWithType('sui_executeTransactionBlock', [
            typeof input.transactionBlock === 'string'
                ? input.transactionBlock
                : (0, bcs_1.toB64)(input.transactionBlock),
            Array.isArray(input.signature) ? input.signature : [input.signature],
            input.options,
            input.requestType,
        ], index_1.SuiTransactionBlockResponse);
    }
    /**
     * Get total number of transactions
     */
    async getTotalTransactionBlocks() {
        const resp = await this.client.requestWithType('sui_getTotalTransactionBlocks', [], (0, superstruct_1.string)());
        return BigInt(resp);
    }
    /**
     * Getting the reference gas price for the network
     */
    async getReferenceGasPrice() {
        const resp = await this.client.requestWithType('suix_getReferenceGasPrice', [], (0, superstruct_1.string)());
        return BigInt(resp);
    }
    /**
     * Return the delegated stakes for an address
     */
    async getStakes(input) {
        if (!input.owner || !(0, sui_types_1.isValidSuiAddress)((0, sui_types_1.normalizeSuiAddress)(input.owner))) {
            throw new Error('Invalid Sui address');
        }
        return await this.client.requestWithType('suix_getStakes', [input.owner], (0, superstruct_1.array)(index_1.DelegatedStake));
    }
    /**
     * Return the delegated stakes queried by id.
     */
    async getStakesByIds(input) {
        input.stakedSuiIds.forEach((id) => {
            if (!id || !(0, sui_types_1.isValidSuiObjectId)((0, sui_types_1.normalizeSuiObjectId)(id))) {
                throw new Error(`Invalid Sui Stake id ${id}`);
            }
        });
        return await this.client.requestWithType('suix_getStakesByIds', [input.stakedSuiIds], (0, superstruct_1.array)(index_1.DelegatedStake));
    }
    /**
     * Return the latest system state content.
     */
    async getLatestSuiSystemState() {
        return await this.client.requestWithType('suix_getLatestSuiSystemState', [], index_1.SuiSystemStateSummary);
    }
    /**
     * Get events for a given query criteria
     */
    async queryEvents(input) {
        return await this.client.requestWithType('suix_queryEvents', [
            input.query,
            input.cursor,
            input.limit,
            (input.order || 'descending') === 'descending',
        ], index_1.PaginatedEvents);
    }
    /**
     * Subscribe to get notifications whenever an event matching the filter occurs
     */
    async subscribeEvent(input) {
        return this.wsClient.request({
            method: 'suix_subscribeEvent',
            unsubscribe: 'suix_unsubscribeEvent',
            params: [input.filter],
            onMessage: input.onMessage,
        });
    }
    async subscribeTransaction(input) {
        return this.wsClient.request({
            method: 'suix_subscribeTransaction',
            unsubscribe: 'suix_unsubscribeTransaction',
            params: [input.filter],
            onMessage: input.onMessage,
        });
    }
    /**
     * Runs the transaction block in dev-inspect mode. Which allows for nearly any
     * transaction (or Move call) with any arguments. Detailed results are
     * provided, including both the transaction effects and any return values.
     */
    async devInspectTransactionBlock(input) {
        let devInspectTxBytes;
        if ((0, index_2.isTransactionBlock)(input.transactionBlock)) {
            input.transactionBlock.setSenderIfNotSet(input.sender);
            devInspectTxBytes = (0, bcs_1.toB64)(await input.transactionBlock.build({
                provider: this,
                onlyTransactionKind: true,
            }));
        }
        else if (typeof input.transactionBlock === 'string') {
            devInspectTxBytes = input.transactionBlock;
        }
        else if (input.transactionBlock instanceof Uint8Array) {
            devInspectTxBytes = (0, bcs_1.toB64)(input.transactionBlock);
        }
        else {
            throw new Error('Unknown transaction block format.');
        }
        return await this.client.requestWithType('sui_devInspectTransactionBlock', [input.sender, devInspectTxBytes, input.gasPrice, input.epoch], index_1.DevInspectResults);
    }
    /**
     * Dry run a transaction block and return the result.
     */
    async dryRunTransactionBlock(input) {
        return await this.client.requestWithType('sui_dryRunTransactionBlock', [
            typeof input.transactionBlock === 'string'
                ? input.transactionBlock
                : (0, bcs_1.toB64)(input.transactionBlock),
        ], index_1.DryRunTransactionBlockResponse);
    }
    /**
     * Return the list of dynamic field objects owned by an object
     */
    async getDynamicFields(input) {
        if (!input.parentId ||
            !(0, sui_types_1.isValidSuiObjectId)((0, sui_types_1.normalizeSuiObjectId)(input.parentId))) {
            throw new Error('Invalid Sui Object id');
        }
        return await this.client.requestWithType('suix_getDynamicFields', [input.parentId, input.cursor, input.limit], dynamic_fields_1.DynamicFieldPage);
    }
    /**
     * Return the dynamic field object information for a specified object
     */
    async getDynamicFieldObject(input) {
        return await this.client.requestWithType('suix_getDynamicFieldObject', [input.parentId, input.name], index_1.SuiObjectResponse);
    }
    /**
     * Get the sequence number of the latest checkpoint that has been executed
     */
    async getLatestCheckpointSequenceNumber() {
        const resp = await this.client.requestWithType('sui_getLatestCheckpointSequenceNumber', [], (0, superstruct_1.string)());
        return String(resp);
    }
    /**
     * Returns information about a given checkpoint
     */
    async getCheckpoint(input) {
        return await this.client.requestWithType('sui_getCheckpoint', [input.id], index_1.Checkpoint);
    }
    /**
     * Returns historical checkpoints paginated
     */
    async getCheckpoints(input) {
        const resp = await this.client.requestWithType('sui_getCheckpoints', [input.cursor, input?.limit, input.descendingOrder], checkpoints_1.CheckpointPage);
        return resp;
    }
    /**
     * Return the committee information for the asked epoch
     */
    async getCommitteeInfo(input) {
        return await this.client.requestWithType('suix_getCommitteeInfo', [input?.epoch], index_1.CommitteeInfo);
    }
    async getNetworkMetrics() {
        return await this.client.requestWithType('suix_getNetworkMetrics', [], metrics_1.NetworkMetrics);
    }
    async getAddressMetrics() {
        return await this.client.requestWithType('suix_getLatestAddressMetrics', [], metrics_1.AddressMetrics);
    }
    async getAllEpochAddressMetrics(input) {
        return await this.client.requestWithType('suix_getAllEpochAddressMetrics', [input?.descendingOrder], metrics_1.AllEpochsAddressMetrics);
    }
    /**
     * Return the committee information for the asked epoch
     */
    async getEpochs(input) {
        return await this.client.requestWithType('suix_getEpochs', [input?.cursor, input?.limit, input?.descendingOrder], epochs_1.EpochPage);
    }
    /**
     * Returns list of top move calls by usage
     */
    async getMoveCallMetrics() {
        return await this.client.requestWithType('suix_getMoveCallMetrics', [], index_1.MoveCallMetrics);
    }
    /**
     * Return the committee information for the asked epoch
     */
    async getCurrentEpoch() {
        return await this.client.requestWithType('suix_getCurrentEpoch', [], epochs_1.EpochInfo);
    }
    /**
     * Return the Validators APYs
     */
    async getValidatorsApy() {
        return await this.client.requestWithType('suix_getValidatorsApy', [], index_1.ValidatorsApy);
    }
    // TODO: Migrate this to `sui_getChainIdentifier` once it is widely available.
    async getChainIdentifier() {
        const checkpoint = await this.getCheckpoint({ id: '0' });
        const bytes = (0, bcs_1.fromB58)(checkpoint.digest);
        return (0, bcs_1.toHEX)(bytes.slice(0, 4));
    }
    async resolveNameServiceAddress(input) {
        return await this.client.requestWithType('suix_resolveNameServiceAddress', [input.name], (0, superstruct_1.nullable)((0, superstruct_1.string)()));
    }
    async resolveNameServiceNames(input) {
        return await this.client.requestWithType('suix_resolveNameServiceNames', [input.address], index_1.ResolvedNameServiceNames);
    }
    async getProtocolConfig(input) {
        return await this.client.requestWithType('sui_getProtocolConfig', [input?.version], index_1.ProtocolConfig);
    }
    /**
     * Wait for a transaction block result to be available over the API.
     * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
     * be available via the API.
     * This currently polls the `getTransactionBlock` API to check for the transaction.
     */
    async waitForTransactionBlock({ signal, timeout = 60 * 1000, pollInterval = 2 * 1000, ...input }) {
        // @ts-ignore
        const timeoutSignal = AbortSignal.timeout(timeout);
        const timeoutPromise = new Promise((_, reject) => {
            timeoutSignal.addEventListener('abort', () => reject(timeoutSignal.reason));
        });
        timeoutPromise.catch(() => {
            // Swallow unhandled rejections that might be thrown after early return
        });
        while (!timeoutSignal.aborted) {
            signal?.throwIfAborted();
            try {
                return await this.getTransactionBlock(input);
            }
            catch (e) {
                // Wait for either the next poll interval, or the timeout.
                await Promise.race([
                    new Promise((resolve) => setTimeout(resolve, pollInterval)),
                    timeoutPromise,
                ]);
            }
        }
        timeoutSignal.throwIfAborted();
        // This should never happen, because the above case should always throw, but just adding it in the event that something goes horribly wrong.
        throw new Error('Unexpected error while waiting for transaction block.');
    }
}
exports.JsonRpcProvider = JsonRpcProvider;
//# sourceMappingURL=json-rpc-provider.js.map
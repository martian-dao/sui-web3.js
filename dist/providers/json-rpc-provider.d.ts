import type { HttpHeaders } from '../rpc/client';
import { JsonRpcClient } from '../rpc/client';
import type { ExecuteTransactionRequestType, SuiEventFilter, SuiTransactionBlockResponseQuery, Order, CheckpointDigest, SuiObjectDataOptions, SuiTransactionBlockResponseOptions, SuiEvent, SuiObjectResponseQuery, TransactionFilter, TransactionEffects, Unsubscribe } from '../types/index';
import { PaginatedTransactionResponse, SuiMoveFunctionArgTypes, SuiMoveNormalizedFunction, SuiMoveNormalizedModule, SuiMoveNormalizedModules, SuiMoveNormalizedStruct, SuiTransactionBlockResponse, PaginatedEvents, DevInspectResults, PaginatedCoins, SuiObjectResponse, DelegatedStake, CoinBalance, CoinSupply, Checkpoint, CommitteeInfo, DryRunTransactionBlockResponse, SuiSystemStateSummary, PaginatedObjectsResponse, ValidatorsApy, MoveCallMetrics, ObjectRead, ResolvedNameServiceNames, ProtocolConfig } from '../types/index';
import type { DynamicFieldName } from '../types/dynamic_fields';
import { DynamicFieldPage } from '../types/dynamic_fields';
import type { WebsocketClientOptions } from '../rpc/websocket-client';
import { WebsocketClient } from '../rpc/websocket-client';
import type { SerializedSignature } from '../cryptography/signature';
import type { Connection } from '../rpc/connection';
import type { TransactionBlock } from '../builder/index';
import { CheckpointPage } from '../types/checkpoints';
import { EpochInfo, EpochPage } from '../types/epochs';
import type { CoinMetadata } from '../framework/framework';
export interface PaginationArguments<Cursor> {
    /** Optional paging cursor */
    cursor?: Cursor;
    /** Maximum item returned per page */
    limit?: number | null;
}
export interface OrderArguments {
    order?: Order | null;
}
/**
 * Configuration options for the JsonRpcProvider. If the value of a field is not provided,
 * value in `DEFAULT_OPTIONS` for that field will be used
 */
export type RpcProviderOptions = {
    /**
     * Configuration options for the websocket connection
     * TODO: Move to connection.
     */
    socketOptions?: WebsocketClientOptions;
    /**
     * Cache timeout in seconds for the RPC API Version
     */
    versionCacheTimeoutInSeconds?: number;
    /** Allow defining a custom RPC client to use */
    rpcClient?: JsonRpcClient;
    /** Allow defining a custom websocket client to use */
    websocketClient?: WebsocketClient;
};
export declare class JsonRpcProvider {
    options: RpcProviderOptions;
    connection: Connection;
    protected client: JsonRpcClient;
    protected wsClient: WebsocketClient;
    private rpcApiVersion;
    private cacheExpiry;
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param connection The `Connection` object containing configuration for the network.
     * @param options configuration options for the provider
     */
    constructor(connection?: Connection, options?: RpcProviderOptions);
    getRpcApiVersion(): Promise<string | undefined>;
    /** @deprecated Use `@mysten/sui.js/faucet` instead. */
    requestSuiFromFaucet(recipient: string, headers?: HttpHeaders): Promise<{
        transferredGasObjects: {
            amount: number;
            id: string;
            transferTxDigest: string;
        }[];
        error?: string;
    }>;
    /**
     * Get all Coin<`coin_type`> objects owned by an address.
     */
    getCoins(input: {
        owner: string;
        coinType?: string | null;
    } & PaginationArguments<PaginatedCoins['nextCursor']>): Promise<PaginatedCoins>;
    /**
     * Get all Coin objects owned by an address.
     */
    getAllCoins(input: {
        owner: string;
    } & PaginationArguments<PaginatedCoins['nextCursor']>): Promise<PaginatedCoins>;
    /**
     * Get the total coin balance for one coin type, owned by the address owner.
     */
    getBalance(input: {
        owner: string;
        /** optional fully qualified type names for the coin (e.g., 0x168da5bf1f48dafc111b0a488fa454aca95e0b5e::usdc::USDC), default to 0x2::sui::SUI if not specified. */
        coinType?: string | null;
    }): Promise<CoinBalance>;
    /**
     * Get the total coin balance for all coin types, owned by the address owner.
     */
    getAllBalances(input: {
        owner: string;
    }): Promise<CoinBalance[]>;
    /**
     * Fetch CoinMetadata for a given coin type
     */
    getCoinMetadata(input: {
        coinType: string;
    }): Promise<CoinMetadata | null>;
    /**
     *  Fetch total supply for a coin
     */
    getTotalSupply(input: {
        coinType: string;
    }): Promise<CoinSupply>;
    /**
     * Invoke any RPC method
     * @param method the method to be invoked
     * @param args the arguments to be passed to the RPC request
     */
    call(method: string, params: any[]): Promise<any>;
    /**
     * Get Move function argument types like read, write and full access
     */
    getMoveFunctionArgTypes(input: {
        package: string;
        module: string;
        function: string;
    }): Promise<SuiMoveFunctionArgTypes>;
    /**
     * Get a map from module name to
     * structured representations of Move modules
     */
    getNormalizedMoveModulesByPackage(input: {
        package: string;
    }): Promise<SuiMoveNormalizedModules>;
    /**
     * Get a structured representation of Move module
     */
    getNormalizedMoveModule(input: {
        package: string;
        module: string;
    }): Promise<SuiMoveNormalizedModule>;
    /**
     * Get a structured representation of Move function
     */
    getNormalizedMoveFunction(input: {
        package: string;
        module: string;
        function: string;
    }): Promise<SuiMoveNormalizedFunction>;
    /**
     * Get a structured representation of Move struct
     */
    getNormalizedMoveStruct(input: {
        package: string;
        module: string;
        struct: string;
    }): Promise<SuiMoveNormalizedStruct>;
    /**
     * Get all objects owned by an address
     */
    getOwnedObjects(input: {
        owner: string;
    } & PaginationArguments<PaginatedObjectsResponse['nextCursor']> & SuiObjectResponseQuery): Promise<PaginatedObjectsResponse>;
    /**
     * Get details about an object
     */
    getObject(input: {
        id: string;
        options?: SuiObjectDataOptions;
    }): Promise<SuiObjectResponse>;
    tryGetPastObject(input: {
        id: string;
        version: number;
        options?: SuiObjectDataOptions;
    }): Promise<ObjectRead>;
    /**
     * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
     */
    multiGetObjects(input: {
        ids: string[];
        options?: SuiObjectDataOptions;
    }): Promise<SuiObjectResponse[]>;
    /**
     * Get transaction blocks for a given query criteria
     */
    queryTransactionBlocks(input: SuiTransactionBlockResponseQuery & PaginationArguments<PaginatedTransactionResponse['nextCursor']> & OrderArguments): Promise<PaginatedTransactionResponse>;
    getTransactionBlock(input: {
        digest: string;
        options?: SuiTransactionBlockResponseOptions;
    }): Promise<SuiTransactionBlockResponse>;
    multiGetTransactionBlocks(input: {
        digests: string[];
        options?: SuiTransactionBlockResponseOptions;
    }): Promise<SuiTransactionBlockResponse[]>;
    executeTransactionBlock(input: {
        transactionBlock: Uint8Array | string;
        signature: SerializedSignature | SerializedSignature[];
        options?: SuiTransactionBlockResponseOptions;
        requestType?: ExecuteTransactionRequestType;
    }): Promise<SuiTransactionBlockResponse>;
    /**
     * Get total number of transactions
     */
    getTotalTransactionBlocks(): Promise<bigint>;
    /**
     * Getting the reference gas price for the network
     */
    getReferenceGasPrice(): Promise<bigint>;
    /**
     * Return the delegated stakes for an address
     */
    getStakes(input: {
        owner: string;
    }): Promise<DelegatedStake[]>;
    /**
     * Return the delegated stakes queried by id.
     */
    getStakesByIds(input: {
        stakedSuiIds: string[];
    }): Promise<DelegatedStake[]>;
    /**
     * Return the latest system state content.
     */
    getLatestSuiSystemState(): Promise<SuiSystemStateSummary>;
    /**
     * Get events for a given query criteria
     */
    queryEvents(input: {
        /** the event query criteria. */
        query: SuiEventFilter;
    } & PaginationArguments<PaginatedEvents['nextCursor']> & OrderArguments): Promise<PaginatedEvents>;
    /**
     * Subscribe to get notifications whenever an event matching the filter occurs
     */
    subscribeEvent(input: {
        /** filter describing the subset of events to follow */
        filter: SuiEventFilter;
        /** function to run when we receive a notification of a new event matching the filter */
        onMessage: (event: SuiEvent) => void;
    }): Promise<Unsubscribe>;
    subscribeTransaction(input: {
        /** filter describing the subset of events to follow */
        filter: TransactionFilter;
        /** function to run when we receive a notification of a new event matching the filter */
        onMessage: (event: TransactionEffects) => void;
    }): Promise<Unsubscribe>;
    /**
     * Runs the transaction block in dev-inspect mode. Which allows for nearly any
     * transaction (or Move call) with any arguments. Detailed results are
     * provided, including both the transaction effects and any return values.
     */
    devInspectTransactionBlock(input: {
        transactionBlock: TransactionBlock | string | Uint8Array;
        sender: string;
        /** Default to use the network reference gas price stored in the Sui System State object */
        gasPrice?: bigint | number | null;
        /** optional. Default to use the current epoch number stored in the Sui System State object */
        epoch?: string | null;
    }): Promise<DevInspectResults>;
    /**
     * Dry run a transaction block and return the result.
     */
    dryRunTransactionBlock(input: {
        transactionBlock: Uint8Array | string;
    }): Promise<DryRunTransactionBlockResponse>;
    /**
     * Return the list of dynamic field objects owned by an object
     */
    getDynamicFields(input: {
        /** The id of the parent object */
        parentId: string;
    } & PaginationArguments<DynamicFieldPage['nextCursor']>): Promise<DynamicFieldPage>;
    /**
     * Return the dynamic field object information for a specified object
     */
    getDynamicFieldObject(input: {
        /** The ID of the quered parent object */
        parentId: string;
        /** The name of the dynamic field */
        name: string | DynamicFieldName;
    }): Promise<SuiObjectResponse>;
    /**
     * Get the sequence number of the latest checkpoint that has been executed
     */
    getLatestCheckpointSequenceNumber(): Promise<string>;
    /**
     * Returns information about a given checkpoint
     */
    getCheckpoint(input: {
        /** The checkpoint digest or sequence number */
        id: CheckpointDigest | string;
    }): Promise<Checkpoint>;
    /**
     * Returns historical checkpoints paginated
     */
    getCheckpoints(input: {
        /** query result ordering, default to false (ascending order), oldest record first */
        descendingOrder: boolean;
    } & PaginationArguments<CheckpointPage['nextCursor']>): Promise<CheckpointPage>;
    /**
     * Return the committee information for the asked epoch
     */
    getCommitteeInfo(input?: {
        /** The epoch of interest. If null, default to the latest epoch */
        epoch?: string | null;
    }): Promise<CommitteeInfo>;
    getNetworkMetrics(): Promise<{
        currentTps: number;
        tps30Days: number;
        currentCheckpoint: string;
        currentEpoch: string;
        totalAddresses: string;
        totalObjects: string;
        totalPackages: string;
    }>;
    getAddressMetrics(): Promise<{
        timestampMs: number;
        epoch: number;
        checkpoint: number;
        cumulativeAddresses: number;
        cumulativeActiveAddresses: number;
        dailyActiveAddresses: number;
    }>;
    getAllEpochAddressMetrics(input?: {
        descendingOrder?: boolean;
    }): Promise<{
        timestampMs: number;
        epoch: number;
        checkpoint: number;
        cumulativeAddresses: number;
        cumulativeActiveAddresses: number;
        dailyActiveAddresses: number;
    }[]>;
    /**
     * Return the committee information for the asked epoch
     */
    getEpochs(input?: {
        descendingOrder?: boolean;
    } & PaginationArguments<EpochPage['nextCursor']>): Promise<EpochPage>;
    /**
     * Returns list of top move calls by usage
     */
    getMoveCallMetrics(): Promise<MoveCallMetrics>;
    /**
     * Return the committee information for the asked epoch
     */
    getCurrentEpoch(): Promise<EpochInfo>;
    /**
     * Return the Validators APYs
     */
    getValidatorsApy(): Promise<ValidatorsApy>;
    getChainIdentifier(): Promise<string>;
    resolveNameServiceAddress(input: {
        name: string;
    }): Promise<string | null>;
    resolveNameServiceNames(input: {
        address: string;
    } & PaginationArguments<ResolvedNameServiceNames['nextCursor']>): Promise<ResolvedNameServiceNames>;
    getProtocolConfig(input?: {
        version?: string;
    }): Promise<ProtocolConfig>;
    /**
     * Wait for a transaction block result to be available over the API.
     * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
     * be available via the API.
     * This currently polls the `getTransactionBlock` API to check for the transaction.
     */
    waitForTransactionBlock({ signal, timeout, pollInterval, ...input }: {
        /** An optional abort signal that can be used to cancel */
        signal?: AbortSignal;
        /** The amount of time to wait for a transaction block. Defaults to one minute. */
        timeout?: number;
        /** The amount of time to wait between checks for the transaction block. Defaults to 2 seconds. */
        pollInterval?: number;
    } & Parameters<JsonRpcProvider['getTransactionBlock']>[0]): Promise<SuiTransactionBlockResponse>;
}
//# sourceMappingURL=json-rpc-provider.d.ts.map
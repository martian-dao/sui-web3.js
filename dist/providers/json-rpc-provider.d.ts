import { Provider } from './provider';
import { HttpHeaders, JsonRpcClient } from '../rpc/client';
import { ExecuteTransactionRequestType, GatewayTxSeqNumber, GetObjectDataResponse, GetTxnDigestsResponse, ObjectId, PaginatedTransactionDigests, SubscriptionId, SuiAddress, SuiEventEnvelope, SuiEventFilter, SuiExecuteTransactionResponse, SuiMoveFunctionArgTypes, SuiMoveNormalizedFunction, SuiMoveNormalizedModule, SuiMoveNormalizedModules, SuiMoveNormalizedStruct, SuiObjectInfo, SuiObjectRef, SuiTransactionResponse, TransactionDigest, TransactionQuery, RpcApiVersion, EventQuery, EventId, PaginatedEvents, FaucetResponse, Order, TransactionEffects, CoinMetadata, SuiTransactionAuthSignersResponse } from '../types';
import { PublicKey, SignatureScheme } from '../cryptography/publickey';
import { WebsocketClient, WebsocketClientOptions } from '../rpc/websocket-client';
import { ApiEndpoints, Network } from '../utils/api-endpoints';
import { Base64DataBuffer } from '../serialization/base64';
/**
 * Configuration options for the JsonRpcProvider. If the value of a field is not provided,
 * value in `DEFAULT_OPTIONS` for that field will be used
 */
export declare type RpcProviderOptions = {
    /**
     * Default to `true`. If set to `false`, the rpc
     * client will throw an error if the responses from the RPC server do not
     * conform to the schema defined in the TypeScript SDK. If set to `true`, the
     * rpc client will log the mismatch as a warning message instead of throwing an
     * error. The mismatches often happen when the SDK is in a different version than
     * the RPC server. Skipping the validation can maximize
     * the version compatibility of the SDK, as not all the schema
     * changes in the RPC response will affect the caller, but the caller needs to
     * understand that the data may not match the TypeSrcript definitions.
     */
    skipDataValidation?: boolean;
    /**
     * Configuration options for the websocket connection
     */
    socketOptions?: WebsocketClientOptions;
    /**
     * Cache timeout in seconds for the RPC API Version
     */
    versionCacheTimoutInSeconds?: number;
    /**
     * URL to a faucet(optional). If you initialize `JsonRpcProvider`
     * with a known `Network` value, this will be populated with a default
     * value
     */
    faucetURL?: string;
};
export declare class JsonRpcProvider extends Provider {
    options: RpcProviderOptions;
    endpoints: ApiEndpoints;
    protected client: JsonRpcClient;
    protected wsClient: WebsocketClient;
    private rpcApiVersion;
    private cacheExpiry;
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param endpoint URL to the Sui RPC endpoint, or a `Network` enum
     * @param options configuration options for the provider
     */
    constructor(endpoint?: string | Network, options?: RpcProviderOptions);
    getRpcApiVersion(): Promise<RpcApiVersion | undefined>;
    getCoinMetadata(coinType: string): Promise<CoinMetadata>;
    requestSuiFromFaucet(recipient: SuiAddress, httpHeaders?: HttpHeaders): Promise<FaucetResponse>;
    getMoveFunctionArgTypes(packageId: string, moduleName: string, functionName: string): Promise<SuiMoveFunctionArgTypes>;
    getNormalizedMoveModulesByPackage(packageId: string): Promise<SuiMoveNormalizedModules>;
    getNormalizedMoveModule(packageId: string, moduleName: string): Promise<SuiMoveNormalizedModule>;
    getNormalizedMoveFunction(packageId: string, moduleName: string, functionName: string): Promise<SuiMoveNormalizedFunction>;
    getNormalizedMoveStruct(packageId: string, moduleName: string, structName: string): Promise<SuiMoveNormalizedStruct>;
    getObjectsOwnedByAddress(address: SuiAddress): Promise<SuiObjectInfo[]>;
    getGasObjectsOwnedByAddress(address: SuiAddress): Promise<SuiObjectInfo[]>;
    getCoinBalancesOwnedByAddress(address: SuiAddress, typeArg?: string): Promise<GetObjectDataResponse[]>;
    selectCoinsWithBalanceGreaterThanOrEqual(address: SuiAddress, amount: bigint, typeArg?: string, exclude?: ObjectId[]): Promise<GetObjectDataResponse[]>;
    selectCoinSetWithCombinedBalanceGreaterThanOrEqual(address: SuiAddress, amount: bigint, typeArg?: string, exclude?: ObjectId[]): Promise<GetObjectDataResponse[]>;
    getObjectsOwnedByObject(objectId: ObjectId): Promise<SuiObjectInfo[]>;
    getObject(objectId: ObjectId): Promise<GetObjectDataResponse>;
    getObjectRef(objectId: ObjectId): Promise<SuiObjectRef | undefined>;
    getObjectBatch(objectIds: ObjectId[]): Promise<GetObjectDataResponse[]>;
    getTransactions(query: TransactionQuery, cursor?: TransactionDigest | null, limit?: number | null, order?: Order): Promise<PaginatedTransactionDigests>;
    getTransactionsForObject(objectID: ObjectId, descendingOrder?: boolean): Promise<GetTxnDigestsResponse>;
    getTransactionsForAddress(addressID: SuiAddress, descendingOrder?: boolean): Promise<GetTxnDigestsResponse>;
    getTransactionWithEffects(digest: TransactionDigest): Promise<SuiTransactionResponse>;
    getTransactionWithEffectsBatch(digests: TransactionDigest[]): Promise<SuiTransactionResponse[]>;
    executeTransaction(txnBytes: Base64DataBuffer, signatureScheme: SignatureScheme, signature: Base64DataBuffer, pubkey: PublicKey, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    getTotalTransactionNumber(): Promise<number>;
    getTransactionDigestsInRange(start: GatewayTxSeqNumber, end: GatewayTxSeqNumber): Promise<GetTxnDigestsResponse>;
    getTransactionAuthSigners(digest: TransactionDigest): Promise<SuiTransactionAuthSignersResponse>;
    getEvents(query: EventQuery, cursor: EventId | null, limit: number | null, order?: Order): Promise<PaginatedEvents>;
    subscribeEvent(filter: SuiEventFilter, onMessage: (event: SuiEventEnvelope) => void): Promise<SubscriptionId>;
    unsubscribeEvent(id: SubscriptionId): Promise<boolean>;
    dryRunTransaction(txBytes: string): Promise<TransactionEffects>;
}
//# sourceMappingURL=json-rpc-provider.d.ts.map
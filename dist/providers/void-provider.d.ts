import { PublicKey, SignatureScheme } from '../cryptography/publickey';
import { HttpHeaders } from '../rpc/client';
import { Base64DataBuffer } from '../serialization/base64';
import { CertifiedTransaction, TransactionDigest, GetTxnDigestsResponse, GatewayTxSeqNumber, SuiObjectInfo, GetObjectDataResponse, SuiObjectRef, SuiMoveFunctionArgTypes, SuiMoveNormalizedFunction, SuiMoveNormalizedStruct, SuiMoveNormalizedModule, SuiMoveNormalizedModules, SuiEventFilter, SuiEventEnvelope, SubscriptionId, ExecuteTransactionRequestType, SuiExecuteTransactionResponse, SuiAddress, ObjectId, TransactionQuery, PaginatedTransactionDigests, EventQuery, PaginatedEvents, EventId, RpcApiVersion, FaucetResponse, Order, TransactionEffects, CoinMetadata } from '../types';
import { Provider } from './provider';
export declare class VoidProvider extends Provider {
    getRpcApiVersion(): Promise<RpcApiVersion | undefined>;
    getCoinMetadata(_coinType: string): Promise<CoinMetadata>;
    requestSuiFromFaucet(_recipient: SuiAddress, _httpHeaders?: HttpHeaders): Promise<FaucetResponse>;
    getObjectsOwnedByAddress(_address: string): Promise<SuiObjectInfo[]>;
    getGasObjectsOwnedByAddress(_address: string): Promise<SuiObjectInfo[]>;
    getCoinBalancesOwnedByAddress(_address: string, _typeArg?: string): Promise<GetObjectDataResponse[]>;
    selectCoinsWithBalanceGreaterThanOrEqual(_address: string, _amount: bigint, _typeArg: string, _exclude?: ObjectId[]): Promise<GetObjectDataResponse[]>;
    selectCoinSetWithCombinedBalanceGreaterThanOrEqual(_address: string, _amount: bigint, _typeArg: string, _exclude: ObjectId[]): Promise<GetObjectDataResponse[]>;
    getObject(_objectId: string): Promise<GetObjectDataResponse>;
    getObjectRef(_objectId: string): Promise<SuiObjectRef | undefined>;
    getTransaction(_digest: TransactionDigest): Promise<CertifiedTransaction>;
    executeTransaction(_txnBytes: Base64DataBuffer, _signatureScheme: SignatureScheme, _signature: Base64DataBuffer, _pubkey: PublicKey, _requestType: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    dryRunTransaction(_txBytes: string): Promise<TransactionEffects>;
    getTotalTransactionNumber(): Promise<number>;
    getTransactionDigestsInRange(_start: GatewayTxSeqNumber, _end: GatewayTxSeqNumber): Promise<GetTxnDigestsResponse>;
    getMoveFunctionArgTypes(_objectId: string, _moduleName: string, _functionName: string): Promise<SuiMoveFunctionArgTypes>;
    getNormalizedMoveModulesByPackage(_objectId: string): Promise<SuiMoveNormalizedModules>;
    getNormalizedMoveModule(_objectId: string, _moduleName: string): Promise<SuiMoveNormalizedModule>;
    getNormalizedMoveFunction(_objectId: string, _moduleName: string, _functionName: string): Promise<SuiMoveNormalizedFunction>;
    getNormalizedMoveStruct(_objectId: string, _oduleName: string, _structName: string): Promise<SuiMoveNormalizedStruct>;
    syncAccountState(_address: string): Promise<any>;
    subscribeEvent(_filter: SuiEventFilter, _onMessage: (event: SuiEventEnvelope) => void): Promise<SubscriptionId>;
    unsubscribeEvent(_id: SubscriptionId): Promise<boolean>;
    private newError;
    getTransactions(_query: TransactionQuery, _cursor: TransactionDigest | null, _limit: number | null, _order: Order): Promise<PaginatedTransactionDigests>;
    getEvents(_query: EventQuery, _cursor: EventId | null, _limit: number | null, _order: Order): Promise<PaginatedEvents>;
}
//# sourceMappingURL=void-provider.d.ts.map
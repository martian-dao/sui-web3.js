import { Provider } from '../providers/provider';
import { HttpHeaders } from '../rpc/client';
import { Base64DataBuffer } from '../serialization/base64';
import { ExecuteTransactionRequestType, FaucetResponse, SuiAddress, SuiExecuteTransactionResponse, TransactionEffects } from '../types';
import { SignaturePubkeyPair, Signer } from './signer';
import { MoveCallTransaction, MergeCoinTransaction, PayTransaction, PaySuiTransaction, PayAllSuiTransaction, SplitCoinTransaction, TransferObjectTransaction, TransferSuiTransaction, TxnDataSerializer, PublishTransaction, SignableTransaction } from './txn-data-serializers/txn-data-serializer';
export declare abstract class SignerWithProvider implements Signer {
    readonly provider: Provider;
    readonly serializer: TxnDataSerializer;
    abstract getAddress(): Promise<SuiAddress>;
    /**
     * Returns the signature for the data and the public key of the signer
     */
    abstract signData(data: Base64DataBuffer): Promise<SignaturePubkeyPair>;
    abstract connect(provider: Provider): SignerWithProvider;
    /**
     * Request gas tokens from a faucet server and send to the signer
     * address
     * @param httpHeaders optional request headers
     */
    requestSuiFromFaucet(httpHeaders?: HttpHeaders): Promise<FaucetResponse>;
    constructor(provider?: Provider, serializer?: TxnDataSerializer);
    /**
     * Sign a transaction and submit to the Fullnode for execution. Only exists
     * on Fullnode
     */
    signAndExecuteTransaction(transaction: Base64DataBuffer | SignableTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    getTransactionDigest(tx: Base64DataBuffer | SignableTransaction): Promise<string>;
    /**
     * Dry run a transaction and return the result.
     * @param tx the transaction as SignableTransaction or string (in base64) that will dry run
     * @returns The transaction effects
     */
    dryRunTransaction(tx: SignableTransaction | string | Base64DataBuffer): Promise<TransactionEffects>;
    /**
     *
     * Serialize and sign a `TransferObject` transaction and submit to the Fullnode
     * for execution
     */
    transferObject(transaction: TransferObjectTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     *
     * Serialize and sign a `TransferSui` transaction and submit to the Fullnode
     * for execution
     */
    transferSui(transaction: TransferSuiTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     *
     * Serialize and Sign a `Pay` transaction and submit to the fullnode for execution
     */
    pay(transaction: PayTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     * Serialize and Sign a `PaySui` transaction and submit to the fullnode for execution
     */
    paySui(transaction: PaySuiTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     * Serialize and Sign a `PayAllSui` transaction and submit to the fullnode for execution
     */
    payAllSui(transaction: PayAllSuiTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     *
     * Serialize and sign a `MergeCoin` transaction and submit to the Fullnode
     * for execution
     */
    mergeCoin(transaction: MergeCoinTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     *
     * Serialize and sign a `SplitCoin` transaction and submit to the Fullnode
     * for execution
     */
    splitCoin(transaction: SplitCoinTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     * Serialize and sign a `MoveCall` transaction and submit to the Fullnode
     * for execution
     */
    executeMoveCall(transaction: MoveCallTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     *
     * Serialize and sign a `Publish` transaction and submit to the Fullnode
     * for execution
     */
    publish(transaction: PublishTransaction, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    /**
     * Returns the estimated gas cost for the transaction
     * @param tx The transaction to estimate the gas cost. When string it is assumed it's a serialized tx in base64
     * @returns total gas cost estimation
     * @throws whens fails to estimate the gas cost
     */
    getGasCostEstimation(...args: Parameters<SignerWithProvider['dryRunTransaction']>): Promise<number>;
}
//# sourceMappingURL=signer-with-provider.d.ts.map
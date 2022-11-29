import { Base64DataBuffer } from '../../serialization/base64';
import { ObjectId, SuiAddress, Transaction, TransactionData, SuiObjectRef } from '../../types';
import { MoveCallTransaction, MergeCoinTransaction, SplitCoinTransaction, TransferObjectTransaction, TransferSuiTransaction, PublishTransaction, TxnDataSerializer, PayTransaction, PaySuiTransaction, PayAllSuiTransaction, SignableTransaction, UnserializedSignableTransaction } from './txn-data-serializer';
import { Provider } from '../../providers/provider';
export declare class LocalTxnDataSerializer implements TxnDataSerializer {
    private provider;
    /**
     * Need a provider to fetch the latest object reference. Ideally the provider
     * should cache the object reference locally
     */
    constructor(provider: Provider);
    newTransferObject(signerAddress: SuiAddress, t: TransferObjectTransaction): Promise<Base64DataBuffer>;
    newTransferSui(signerAddress: SuiAddress, t: TransferSuiTransaction): Promise<Base64DataBuffer>;
    newPay(signerAddress: SuiAddress, t: PayTransaction): Promise<Base64DataBuffer>;
    newPaySui(signerAddress: SuiAddress, t: PaySuiTransaction): Promise<Base64DataBuffer>;
    newPayAllSui(signerAddress: SuiAddress, t: PayAllSuiTransaction): Promise<Base64DataBuffer>;
    newMoveCall(signerAddress: SuiAddress, t: MoveCallTransaction): Promise<Base64DataBuffer>;
    newMergeCoin(signerAddress: SuiAddress, t: MergeCoinTransaction): Promise<Base64DataBuffer>;
    newSplitCoin(signerAddress: SuiAddress, t: SplitCoinTransaction): Promise<Base64DataBuffer>;
    newPublish(signerAddress: SuiAddress, t: PublishTransaction): Promise<Base64DataBuffer>;
    /**
     * Util function to select a coin for gas payment given an transaction, which will select
     * an arbitrary gas object owned by the address with balance greater than or equal to
     * `txn.data.gasBudget` that's not used in `txn` itself and the `exclude` list.
     *
     * @param txn the transaction for which the gas object is selected
     * @param signerAddress signer of the transaction
     * @param exclude additional object ids of the gas coins to exclude. Object ids that appear
     * in `txn` will be appended
     */
    selectGasPaymentForTransaction(txn: SignableTransaction, signerAddress: string, exclude?: ObjectId[]): Promise<ObjectId | undefined>;
    /**
     * Returns a list of object ids used in the transaction, including the gas payment object
     */
    extractObjectIds(txn: SignableTransaction): Promise<ObjectId[]>;
    private extractInputObjectIds;
    private getCoinStructTag;
    private constructTransactionData;
    /**
     * Serialize `TransactionData` into BCS encoded bytes
     */
    serializeTransactionData(tx: TransactionData, size?: number): Promise<Base64DataBuffer>;
    /**
     * Deserialize BCS encoded bytes into `SignableTransaction`
     */
    deserializeTransactionBytesToSignableTransaction(bytes: Base64DataBuffer): Promise<UnserializedSignableTransaction | UnserializedSignableTransaction[]>;
    /**
     * Deserialize BCS encoded bytes into `TransactionData`
     */
    deserializeTransactionBytesToTransactionData(bytes: Base64DataBuffer): Promise<TransactionData>;
    /**
     * Deserialize `TransactionData` to `SignableTransaction`
     */
    transformTransactionDataToSignableTransaction(tx: TransactionData): Promise<UnserializedSignableTransaction | UnserializedSignableTransaction[]>;
    transformTransactionToSignableTransaction(tx: Transaction, gasBudget: number, gasPayment?: SuiObjectRef): Promise<UnserializedSignableTransaction>;
}
//# sourceMappingURL=local-txn-data-serializer.d.ts.map
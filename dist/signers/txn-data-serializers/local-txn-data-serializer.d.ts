import { Base64DataBuffer } from '../../serialization/base64';
import { ObjectId, Transaction, TransactionData, SuiObjectRef } from '../../types';
import { TxnDataSerializer, SignableTransaction, UnserializedSignableTransaction } from './txn-data-serializer';
import { Provider } from '../../providers/provider';
export declare class LocalTxnDataSerializer implements TxnDataSerializer {
    private provider;
    /**
     * Need a provider to fetch the latest object reference. Ideally the provider
     * should cache the object reference locally
     */
    constructor(provider: Provider);
    serializeToBytes(signerAddress: string, txn: UnserializedSignableTransaction): Promise<Base64DataBuffer>;
    constructTransactionData(signerAddress: string, unserializedTxn: UnserializedSignableTransaction): Promise<TransactionData>;
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
    private constructTransactionDataHelper;
    /**
     * Serialize `TransactionData` into BCS encoded bytes
     */
    serializeTransactionData(useIntentSigning: boolean, tx: TransactionData, size?: number): Promise<Base64DataBuffer>;
    /**
     * Deserialize BCS encoded bytes into `SignableTransaction`
     */
    deserializeTransactionBytesToSignableTransaction(useIntentSigning: boolean, bytes: Base64DataBuffer): Promise<UnserializedSignableTransaction | UnserializedSignableTransaction[]>;
    /**
     * Deserialize `TransactionData` to `SignableTransaction`
     */
    transformTransactionDataToSignableTransaction(tx: TransactionData): Promise<UnserializedSignableTransaction | UnserializedSignableTransaction[]>;
    transformTransactionToSignableTransaction(tx: Transaction, gasBudget: number, gasPayment?: SuiObjectRef): Promise<UnserializedSignableTransaction>;
}
//# sourceMappingURL=local-txn-data-serializer.d.ts.map
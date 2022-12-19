import { Base64DataBuffer } from '../../serialization/base64';
import { TxnDataSerializer, UnserializedSignableTransaction } from './txn-data-serializer';
/**
 * This is a temporary implementation of the `TxnDataSerializer` class
 * that uses the Sui Fullnode RPC API to serialize a transaction into BCS bytes. We will
 * deprecate this implementation once `LocalTxnDataSerializer` stabilizes.
 *
 * Prefer to use `LocalTxnDataSerializer` instead for better performance and safety, otherwise
 * this needs to be used with a trusted fullnode and it is recommended to verify the returned
 * BCS bytes matches the input.
 */
export declare class RpcTxnDataSerializer implements TxnDataSerializer {
    private skipDataValidation;
    private client;
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param endpoint URL to the Sui RPC endpoint
     * @param skipDataValidation default to `false`. If set to `true`, the rpc
     * client will not check if the responses from the RPC server conform to the schema
     * defined in the TypeScript SDK. The mismatches often happen when the SDK
     * is in a different version than the RPC server. Skipping the validation
     * can maximize the version compatibility of the SDK, as not all the schema
     * changes in the RPC response will affect the caller, but the caller needs to
     * understand that the data may not match the TypeSrcript definitions.
     */
    constructor(endpoint: string, skipDataValidation?: boolean);
    serializeToBytes(signerAddress: string, unserializedTxn: UnserializedSignableTransaction): Promise<Base64DataBuffer>;
}
//# sourceMappingURL=rpc-txn-data-serializer.d.ts.map
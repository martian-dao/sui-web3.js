import { PublicKey, SignatureScheme } from '../cryptography/publickey';
import { GetObjectDataResponse, SuiObjectInfo, SuiObjectRef, ExecuteTransactionRequestType, SuiExecuteTransactionResponse } from '../types';
import { JsonRpcProvider } from './json-rpc-provider';
import { Base64DataBuffer } from '../serialization/base64';
export declare class JsonRpcProviderWithCache extends JsonRpcProvider {
    /**
     * A list of object references which are being tracked.
     *
     * Whenever an object is fetched or updated within the transaction,
     * its record gets updated.
     */
    private objectRefs;
    getObjectsOwnedByAddress(address: string): Promise<SuiObjectInfo[]>;
    getObjectsOwnedByObject(objectId: string): Promise<SuiObjectInfo[]>;
    getObject(objectId: string): Promise<GetObjectDataResponse>;
    getObjectRef(objectId: string, skipCache?: boolean): Promise<SuiObjectRef | undefined>;
    getObjectBatch(objectIds: string[]): Promise<GetObjectDataResponse[]>;
    executeTransaction(txnBytes: Base64DataBuffer, signatureScheme: SignatureScheme, signature: Base64DataBuffer, pubkey: PublicKey, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    private updateObjectRefCache;
    private updateObjectRefCacheFromTransactionEffects;
}
//# sourceMappingURL=json-rpc-provider-with-cache.d.ts.map
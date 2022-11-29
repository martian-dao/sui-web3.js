import { PublicKey, SignatureScheme } from '../cryptography/publickey';
import { Base64DataBuffer } from '../serialization/base64';
/**
 * Pair of signature and corresponding public key
 */
export declare type SignaturePubkeyPair = {
    signatureScheme: SignatureScheme;
    signature: Base64DataBuffer;
    pubKey: PublicKey;
};
/**
 * Serializes a transaction to a string that can be signed by a `Signer`.
 */
export interface Signer {
    getAddress(): Promise<string>;
    /**
     * Returns the signature for the data and the public key of the signer
     */
    signData(data: Base64DataBuffer): Promise<SignaturePubkeyPair>;
}
//# sourceMappingURL=signer.d.ts.map
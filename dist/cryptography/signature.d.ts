import type { PublicKey } from './publickey';
import type { MultiSigStruct } from '../multisig/publickey';
export type SignatureScheme = 'ED25519' | 'Secp256k1' | 'Secp256r1' | 'MultiSig';
/**
 * Pair of signature and corresponding public key
 */
export type SerializeSignatureInput = {
    signatureScheme: SignatureScheme;
    /** Base64-encoded signature */
    signature: Uint8Array;
    /** @deprecated use publicKey instead */
    pubKey?: PublicKey;
    /** Base64-encoded public key */
    publicKey?: PublicKey;
};
/**
 * (`flag || signature || pubkey` bytes, as base-64 encoded string).
 * Signature is committed to the intent message of the transaction data, as base-64 encoded string.
 */
export type SerializedSignature = string;
export declare const SIGNATURE_SCHEME_TO_FLAG: {
    ED25519: number;
    Secp256k1: number;
    Secp256r1: number;
    MultiSig: number;
};
export declare const SIGNATURE_SCHEME_TO_SIZE: {
    ED25519: number;
    Secp256k1: number;
    Secp256r1: number;
};
export declare const SIGNATURE_FLAG_TO_SCHEME: {
    readonly 0: "ED25519";
    readonly 1: "Secp256k1";
    readonly 2: "Secp256r1";
    readonly 3: "MultiSig";
};
export type SignatureFlag = keyof typeof SIGNATURE_FLAG_TO_SCHEME;
export declare function toSerializedSignature({ signature, signatureScheme, pubKey, publicKey, }: SerializeSignatureInput): SerializedSignature;
export declare function parseSerializedSignature(serializedSignature: SerializedSignature): {
    serializedSignature: string;
    signatureScheme: "MultiSig";
    multisig: MultiSigStruct;
    bytes: Uint8Array;
    signature?: undefined;
    publicKey?: undefined;
} | {
    serializedSignature: string;
    signatureScheme: "ED25519" | "Secp256k1" | "Secp256r1";
    signature: Uint8Array;
    publicKey: Uint8Array;
    bytes: Uint8Array;
    multisig?: undefined;
};
//# sourceMappingURL=signature.d.ts.map
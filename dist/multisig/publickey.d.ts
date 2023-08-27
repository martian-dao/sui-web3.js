import { PublicKey } from '../cryptography/publickey';
import type { SerializedSignature, SignatureScheme } from '../cryptography/signature';
type CompressedSignature = {
    ED25519: number[];
} | {
    Secp256k1: number[];
} | {
    Secp256r1: number[];
};
type PublicKeyEnum = {
    ED25519: number[];
} | {
    Secp256k1: number[];
} | {
    Secp256r1: number[];
};
type PubkeyEnumWeightPair = {
    pubKey: PublicKeyEnum;
    weight: number;
};
type MultiSigPublicKeyStruct = {
    pk_map: PubkeyEnumWeightPair[];
    threshold: number;
};
export type MultiSigStruct = {
    sigs: CompressedSignature[];
    bitmap: number;
    multisig_pk: MultiSigPublicKeyStruct;
};
type ParsedPartialMultiSigSignature = {
    signatureScheme: SignatureScheme;
    signature: Uint8Array;
    publicKey: PublicKey;
    weight: number;
};
export declare const MAX_SIGNER_IN_MULTISIG = 10;
/**
 * A MultiSig public key
 */
export declare class MultiSigPublicKey extends PublicKey {
    private rawBytes;
    private multisigPublicKey;
    private publicKeys;
    /**
     * Create a new MultiSigPublicKey object
     */
    constructor(
    /**
     *  MultiSig public key as buffer or base-64 encoded string
     */
    value: string | Uint8Array | MultiSigPublicKeyStruct);
    static fromPublicKeys({ threshold, publicKeys, }: {
        threshold: number;
        publicKeys: {
            publicKey: PublicKey;
            weight: number;
        }[];
    }): MultiSigPublicKey;
    /**
     * Checks if two MultiSig public keys are equal
     */
    equals(publicKey: MultiSigPublicKey): boolean;
    /**
     * Return the byte array representation of the MultiSig public key
     */
    toRawBytes(): Uint8Array;
    getPublicKeys(): {
        weight: number;
        publicKey: PublicKey;
    }[];
    /**
     * Return the Sui address associated with this MultiSig public key
     */
    toSuiAddress(): string;
    /**
     * Return the Sui address associated with this MultiSig public key
     */
    flag(): number;
    /**
     * Verifies that the signature is valid for for the provided message
     */
    verify(message: Uint8Array, multisigSignature: Uint8Array | SerializedSignature): Promise<boolean>;
    combinePartialSignatures(signatures: SerializedSignature[]): SerializedSignature;
}
export declare function parsePartialSignatures(multisig: MultiSigStruct): ParsedPartialMultiSigSignature[];
export {};
//# sourceMappingURL=publickey.d.ts.map
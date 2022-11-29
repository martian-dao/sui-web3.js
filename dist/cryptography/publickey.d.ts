/**
 * Value to be converted into public key.
 */
export declare type PublicKeyInitData = string | Uint8Array | Iterable<number>;
export declare function bytesEqual(a: Uint8Array, b: Uint8Array): boolean;
/**
 * A keypair used for signing transactions.
 */
export declare type SignatureScheme = 'ED25519' | 'Secp256k1';
export declare const SIGNATURE_SCHEME_TO_FLAG: {
    ED25519: number;
    Secp256k1: number;
};
/**
 * A public key
 */
export interface PublicKey {
    /**
     * Checks if two public keys are equal
     */
    equals(publicKey: PublicKey): boolean;
    /**
     * Return the base-64 representation of the public key
     */
    toBase64(): string;
    /**
     * Return the byte array representation of the public key
     */
    toBytes(): Uint8Array;
    /**
     * Return the base-64 representation of the public key
     */
    toString(): string;
    /**
     * Return the Sui address associated with this public key
     */
    toSuiAddress(): string;
}
//# sourceMappingURL=publickey.d.ts.map
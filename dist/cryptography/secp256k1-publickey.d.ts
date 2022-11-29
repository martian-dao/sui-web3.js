import { PublicKey, PublicKeyInitData } from './publickey';
/**
 * A Secp256k1 public key
 */
export declare class Secp256k1PublicKey implements PublicKey {
    private data;
    /**
     * Create a new Secp256k1PublicKey object
     * @param value secp256k1 public key as buffer or base-64 encoded string
     */
    constructor(value: PublicKeyInitData);
    /**
     * Checks if two Secp256k1 public keys are equal
     */
    equals(publicKey: Secp256k1PublicKey): boolean;
    /**
     * Return the base-64 representation of the Secp256k1 public key
     */
    toBase64(): string;
    /**
     * Return the byte array representation of the Secp256k1 public key
     */
    toBytes(): Uint8Array;
    /**
     * Return the base-64 representation of the Secp256k1 public key
     */
    toString(): string;
    /**
     * Return the Sui address associated with this Secp256k1 public key
     */
    toSuiAddress(): string;
}
//# sourceMappingURL=secp256k1-publickey.d.ts.map
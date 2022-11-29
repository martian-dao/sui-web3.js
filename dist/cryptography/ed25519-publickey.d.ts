import { PublicKeyInitData } from './publickey';
/**
 * An Ed25519 public key
 */
export declare class Ed25519PublicKey {
    private data;
    /**
     * Create a new Ed25519PublicKey object
     * @param value ed25519 public key as buffer or base-64 encoded string
     */
    constructor(value: PublicKeyInitData);
    /**
     * Checks if two Ed25519 public keys are equal
     */
    equals(publicKey: Ed25519PublicKey): boolean;
    /**
     * Return the base-64 representation of the Ed25519 public key
     */
    toBase64(): string;
    /**
     * Return the byte array representation of the Ed25519 public key
     */
    toBytes(): Uint8Array;
    /**
     * Return the base-64 representation of the Ed25519 public key
     */
    toString(): string;
    /**
     * Return the Sui address associated with this Ed25519 public key
     */
    toSuiAddress(): string;
}
//# sourceMappingURL=ed25519-publickey.d.ts.map
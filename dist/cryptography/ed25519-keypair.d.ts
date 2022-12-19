import { Base64DataBuffer } from '../serialization/base64';
import type { ExportedKeypair, Keypair } from './keypair';
import { Ed25519PublicKey } from './ed25519-publickey';
import { SignatureScheme } from './publickey';
export declare const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
 * Ed25519 Keypair data
 */
export interface Ed25519KeypairData {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
}
/**
 * An Ed25519 Keypair used for signing transactions.
 */
export declare class Ed25519Keypair implements Keypair {
    private keypair;
    /**
     * Create a new Ed25519 keypair instance.
     * Generate random keypair if no {@link Ed25519Keypair} is provided.
     *
     * @param keypair Ed25519 keypair
     */
    constructor(keypair?: Ed25519KeypairData);
    /**
     * Get the key scheme of the keypair ED25519
     */
    getKeyScheme(): SignatureScheme;
    /**
     * Generate a new random Ed25519 keypair
     */
    static generate(): Ed25519Keypair;
    /**
     * Create a Ed25519 keypair from a raw secret key byte array.
     *
     * This method should only be used to recreate a keypair from a previously
     * generated secret key.
     *
     * @throws error if the provided secret key is invalid and validation is not skipped.
     *
     * @param secretKey secret key byte array
     * @param options: skip secret key validation
     */
    static fromSecretKey(secretKey: Uint8Array, options?: {
        skipValidation?: boolean;
    }): Ed25519Keypair;
    /**
     * Generate an Ed25519 keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     */
    static fromSeed(seed: Uint8Array): Ed25519Keypair;
    /**
     * The public key for this Ed25519 keypair
     */
    getPublicKey(): Ed25519PublicKey;
    /**
     * The secret key for this Ed25519 keypair
     */
    getSecretKey(): string;
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signData(data: Base64DataBuffer): Base64DataBuffer;
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signBuffer(data: Uint8Array): Uint8Array;
    /**
     * Derives account address, public key and private key
     * @returns publicKey, address and privateKey
     */
    toPrivateKeyObject(): object;
    /**
     * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
     * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
     */
    static deriveKeypair(mnemonics: string, path?: string): Ed25519Keypair;
    export(): ExportedKeypair;
}
//# sourceMappingURL=ed25519-keypair.d.ts.map
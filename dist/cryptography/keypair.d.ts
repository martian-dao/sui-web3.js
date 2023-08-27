import type { PublicKey } from './publickey';
import type { SerializedSignature } from './signature';
import type { SignatureScheme } from './signature';
import { IntentScope } from './intent';
export declare const PRIVATE_KEY_SIZE = 32;
export declare const LEGACY_PRIVATE_KEY_SIZE = 64;
export type ExportedKeypair = {
    schema: SignatureScheme;
    privateKey: string;
};
export interface SignatureWithBytes {
    bytes: string;
    signature: SerializedSignature;
}
/**
 * TODO: Document
 */
export declare abstract class BaseSigner {
    abstract sign(bytes: Uint8Array): Promise<Uint8Array>;
    signWithIntent(bytes: Uint8Array, intent: IntentScope): Promise<SignatureWithBytes>;
    signTransactionBlock(bytes: Uint8Array): Promise<SignatureWithBytes>;
    signPersonalMessage(bytes: Uint8Array): Promise<SignatureWithBytes>;
    /**
     * @deprecated use `signPersonalMessage` instead
     */
    signMessage(bytes: Uint8Array): Promise<SignatureWithBytes>;
    toSuiAddress(): string;
    /**
     * Return the signature for the data.
     * Prefer the async version {@link sign}, as this method will be deprecated in a future release.
     */
    abstract signData(data: Uint8Array): Uint8Array;
    /**
     * Get the key scheme of the keypair: Secp256k1 or ED25519
     */
    abstract getKeyScheme(): SignatureScheme;
    /**
     * The public key for this keypair
     */
    abstract getPublicKey(): PublicKey;
}
/**
 * TODO: Document
 */
export declare abstract class Keypair extends BaseSigner {
    abstract export(): ExportedKeypair;
}
//# sourceMappingURL=keypair.d.ts.map
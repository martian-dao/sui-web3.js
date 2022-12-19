import { Base64DataBuffer } from '../serialization/base64';
import { PublicKey, SignatureScheme } from './publickey';
export declare type ExportedKeypair = {
    schema: SignatureScheme;
    privateKey: string;
};
/**
 * A keypair used for signing transactions.
 */
export interface Keypair {
    /**
     * The public key for this keypair
     */
    getPublicKey(): PublicKey;
    /**
     * Return the signature for the data
     */
    signData(data: Base64DataBuffer): Base64DataBuffer;
    /**
     * Get the key scheme of the keypair: Secp256k1 or ED25519
     */
    getKeyScheme(): SignatureScheme;
    export(): ExportedKeypair;
}
export declare function fromExportedKeypair(keypair: ExportedKeypair): Keypair;
//# sourceMappingURL=keypair.d.ts.map
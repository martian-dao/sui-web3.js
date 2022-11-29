import { Base64DataBuffer } from '../serialization/base64';
import { PublicKey, SignatureScheme } from './publickey';
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
}
//# sourceMappingURL=keypair.d.ts.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256r1Keypair = exports.DEFAULT_SECP256R1_DERIVATION_PATH = void 0;
const keypair_1 = require("../../cryptography/keypair");
const sha256_1 = require("@noble/hashes/sha256");
const publickey_1 = require("./publickey");
const p256_1 = require("@noble/curves/p256");
const mnemonics_1 = require("../../cryptography/mnemonics");
const bip32_1 = require("@scure/bip32");
const bcs_1 = require("@mysten/bcs");
const utils_1 = require("@noble/hashes/utils");
const blake2b_1 = require("@noble/hashes/blake2b");
exports.DEFAULT_SECP256R1_DERIVATION_PATH = "m/74'/784'/0'/0/0";
/**
 * An Secp256r1 Keypair used for signing transactions.
 */
class Secp256r1Keypair extends keypair_1.Keypair {
    /**
     * Create a new keypair instance.
     * Generate random keypair if no {@link Secp256r1Keypair} is provided.
     *
     * @param keypair Secp256r1 keypair
     */
    constructor(keypair) {
        super();
        if (keypair) {
            this.keypair = keypair;
        }
        else {
            const secretKey = p256_1.secp256r1.utils.randomPrivateKey();
            const publicKey = p256_1.secp256r1.getPublicKey(secretKey, true);
            this.keypair = { publicKey, secretKey };
        }
    }
    /**
     * Get the key scheme of the keypair Secp256r1
     */
    getKeyScheme() {
        return 'Secp256r1';
    }
    /**
     * Generate a new random keypair
     */
    static generate() {
        return new Secp256r1Keypair();
    }
    /**
     * Create a keypair from a raw secret key byte array.
     *
     * This method should only be used to recreate a keypair from a previously
     * generated secret key. Generating keypairs from a random seed should be done
     * with the {@link Keypair.fromSeed} method.
     *
     * @throws error if the provided secret key is invalid and validation is not skipped.
     *
     * @param secretKey secret key byte array
     * @param options: skip secret key validation
     */
    static fromSecretKey(secretKey, options) {
        const publicKey = p256_1.secp256r1.getPublicKey(secretKey, true);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode('sui validation');
            const msgHash = (0, utils_1.bytesToHex)((0, blake2b_1.blake2b)(signData, { dkLen: 32 }));
            const signature = p256_1.secp256r1.sign(msgHash, secretKey, { lowS: true });
            if (!p256_1.secp256r1.verify(signature, msgHash, publicKey, { lowS: true })) {
                throw new Error('Provided secretKey is invalid');
            }
        }
        return new Secp256r1Keypair({ publicKey, secretKey });
    }
    /**
     * Generate a keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     */
    static fromSeed(seed) {
        let publicKey = p256_1.secp256r1.getPublicKey(seed, true);
        return new Secp256r1Keypair({ publicKey, secretKey: seed });
    }
    /**
     * The public key for this keypair
     */
    getPublicKey() {
        return new publickey_1.Secp256r1PublicKey(this.keypair.publicKey);
    }
    async sign(data) {
        return this.signData(data);
    }
    /**
     * Return the signature for the provided data.
     */
    signData(data) {
        const msgHash = (0, sha256_1.sha256)(data);
        const sig = p256_1.secp256r1.sign(msgHash, this.keypair.secretKey, {
            lowS: true,
        });
        return sig.toCompactRawBytes();
    }
    /**
     * Derive Secp256r1 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/74'/784'/0'/0/0, otherwise the path must
     * be compliant to BIP-32 in form m/74'/784'/{account_index}'/{change_index}/{address_index}.
     */
    static deriveKeypair(mnemonics, path) {
        if (path == null) {
            path = exports.DEFAULT_SECP256R1_DERIVATION_PATH;
        }
        if (!(0, mnemonics_1.isValidBIP32Path)(path)) {
            throw new Error('Invalid derivation path');
        }
        // We use HDKey which is hardcoded to use Secp256k1 but since we only need the 32 bytes for the private key it's okay to use here as well.
        const privateKey = bip32_1.HDKey.fromMasterSeed((0, mnemonics_1.mnemonicToSeed)(mnemonics)).derive(path).privateKey;
        return Secp256r1Keypair.fromSecretKey(privateKey);
    }
    export() {
        return {
            schema: 'Secp256r1',
            privateKey: (0, bcs_1.toB64)(this.keypair.secretKey),
        };
    }
}
exports.Secp256r1Keypair = Secp256r1Keypair;
//# sourceMappingURL=keypair.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1Keypair = exports.DEFAULT_SECP256K1_DERIVATION_PATH = void 0;
const keypair_1 = require("../../cryptography/keypair");
const sha256_1 = require("@noble/hashes/sha256");
const publickey_1 = require("./publickey");
const secp256k1_1 = require("@noble/curves/secp256k1");
const mnemonics_1 = require("../../cryptography/mnemonics");
const bip32_1 = require("@scure/bip32");
const bcs_1 = require("@mysten/bcs");
const utils_1 = require("@noble/hashes/utils");
const blake2b_1 = require("@noble/hashes/blake2b");
exports.DEFAULT_SECP256K1_DERIVATION_PATH = "m/54'/784'/0'/0/0";
/**
 * An Secp256k1 Keypair used for signing transactions.
 */
class Secp256k1Keypair extends keypair_1.Keypair {
    /**
     * Create a new keypair instance.
     * Generate random keypair if no {@link Secp256k1Keypair} is provided.
     *
     * @param keypair secp256k1 keypair
     */
    constructor(keypair) {
        super();
        if (keypair) {
            this.keypair = keypair;
        }
        else {
            const secretKey = secp256k1_1.secp256k1.utils.randomPrivateKey();
            const publicKey = secp256k1_1.secp256k1.getPublicKey(secretKey, true);
            this.keypair = { publicKey, secretKey };
        }
    }
    /**
     * Get the key scheme of the keypair Secp256k1
     */
    getKeyScheme() {
        return 'Secp256k1';
    }
    /**
     * Generate a new random keypair
     */
    static generate() {
        return new Secp256k1Keypair();
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
        const publicKey = secp256k1_1.secp256k1.getPublicKey(secretKey, true);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode('sui validation');
            const msgHash = (0, utils_1.bytesToHex)((0, blake2b_1.blake2b)(signData, { dkLen: 32 }));
            const signature = secp256k1_1.secp256k1.sign(msgHash, secretKey);
            if (!secp256k1_1.secp256k1.verify(signature, msgHash, publicKey, { lowS: true })) {
                throw new Error('Provided secretKey is invalid');
            }
        }
        return new Secp256k1Keypair({ publicKey, secretKey });
    }
    /**
     * Generate a keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     */
    static fromSeed(seed) {
        let publicKey = secp256k1_1.secp256k1.getPublicKey(seed, true);
        return new Secp256k1Keypair({ publicKey, secretKey: seed });
    }
    /**
     * The public key for this keypair
     */
    getPublicKey() {
        return new publickey_1.Secp256k1PublicKey(this.keypair.publicKey);
    }
    async sign(data) {
        return this.signData(data);
    }
    /**
     * Return the signature for the provided data.
     */
    signData(data) {
        const msgHash = (0, sha256_1.sha256)(data);
        const sig = secp256k1_1.secp256k1.sign(msgHash, this.keypair.secretKey, {
            lowS: true,
        });
        return sig.toCompactRawBytes();
    }
    /**
     * Derive Secp256k1 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/54'/784'/0'/0/0, otherwise the path must
     * be compliant to BIP-32 in form m/54'/784'/{account_index}'/{change_index}/{address_index}.
     */
    static deriveKeypair(mnemonics, path) {
        if (path == null) {
            path = exports.DEFAULT_SECP256K1_DERIVATION_PATH;
        }
        if (!(0, mnemonics_1.isValidBIP32Path)(path)) {
            throw new Error('Invalid derivation path');
        }
        const key = bip32_1.HDKey.fromMasterSeed((0, mnemonics_1.mnemonicToSeed)(mnemonics)).derive(path);
        if (key.publicKey == null || key.privateKey == null) {
            throw new Error('Invalid key');
        }
        return new Secp256k1Keypair({
            publicKey: key.publicKey,
            secretKey: key.privateKey,
        });
    }
    export() {
        return {
            schema: 'Secp256k1',
            privateKey: (0, bcs_1.toB64)(this.keypair.secretKey),
        };
    }
}
exports.Secp256k1Keypair = Secp256k1Keypair;
//# sourceMappingURL=keypair.js.map
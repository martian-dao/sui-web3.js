"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Keypair = exports.DEFAULT_ED25519_DERIVATION_PATH = void 0;
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const base64_1 = require("../serialization/base64");
const ed25519_publickey_1 = require("./ed25519-publickey");
const mnemonics_1 = require("./mnemonics");
const ed25519_hd_key_1 = require("../utils/ed25519-hd-key");
const bcs_1 = require("@mysten/bcs");
exports.DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
 * An Ed25519 Keypair used for signing transactions.
 */
class Ed25519Keypair {
    /**
     * Create a new Ed25519 keypair instance.
     * Generate random keypair if no {@link Ed25519Keypair} is provided.
     *
     * @param keypair Ed25519 keypair
     */
    constructor(keypair) {
        if (keypair) {
            this.keypair = keypair;
        }
        else {
            this.keypair = tweetnacl_1.default.sign.keyPair();
        }
    }
    /**
     * Get the key scheme of the keypair ED25519
     */
    getKeyScheme() {
        return 'ED25519';
    }
    /**
     * Generate a new random Ed25519 keypair
     */
    static generate() {
        return new Ed25519Keypair(tweetnacl_1.default.sign.keyPair());
    }
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
    static fromSecretKey(secretKey, options) {
        const secretKeyLength = secretKey.length;
        if (secretKeyLength != 64) {
            // Many users actually wanted to invoke fromSeed(seed: Uint8Array), especially when reading from keystore.
            if (secretKeyLength == 32) {
                throw new Error('Wrong secretKey size. Expected 64 bytes, got 32. Similar function exists: fromSeed(seed: Uint8Array)');
            }
            throw new Error(`Wrong secretKey size. Expected 64 bytes, got ${secretKeyLength}.`);
        }
        const keypair = tweetnacl_1.default.sign.keyPair.fromSecretKey(secretKey);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode('sui validation');
            const signature = tweetnacl_1.default.sign.detached(signData, keypair.secretKey);
            if (!tweetnacl_1.default.sign.detached.verify(signData, signature, keypair.publicKey)) {
                throw new Error('provided secretKey is invalid');
            }
        }
        return new Ed25519Keypair(keypair);
    }
    /**
     * Generate an Ed25519 keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     */
    static fromSeed(seed) {
        const seedLength = seed.length;
        if (seedLength != 32) {
            throw new Error(`Wrong seed size. Expected 32 bytes, got ${seedLength}.`);
        }
        return new Ed25519Keypair(tweetnacl_1.default.sign.keyPair.fromSeed(seed));
    }
    /**
     * The public key for this Ed25519 keypair
     */
    getPublicKey() {
        return new ed25519_publickey_1.Ed25519PublicKey(this.keypair.publicKey);
    }
    /**
     * The secret key for this Ed25519 keypair
     */
    getSecretKey() {
        return (0, bcs_1.toB64)(this.keypair.secretKey);
    }
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signData(data) {
        return new base64_1.Base64DataBuffer(tweetnacl_1.default.sign.detached(data.getData(), this.keypair.secretKey));
    }
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signBuffer(data) {
        return tweetnacl_1.default.sign.detached(data, this.keypair.secretKey);
    }
    /**
     * Derives account address, public key and private key
     * @returns publicKey, address and privateKey
     */
    toPrivateKeyObject() {
        const publicKeyHex = Buffer.from(this.getPublicKey().toBytes()).toString('hex');
        const privateKeyHex = Buffer.from(this.keypair.secretKey.slice(0, 32)).toString('hex');
        const address = this.getPublicKey().toSuiAddress();
        return {
            address: address.startsWith('0x') ? address : '0x' + address,
            publicKeyHex: publicKeyHex.startsWith('0x')
                ? publicKeyHex
                : '0x' + publicKeyHex,
            privateKeyHex: privateKeyHex.startsWith('0x')
                ? privateKeyHex
                : '0x' + privateKeyHex,
        };
    }
    /**
     * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
     * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
     */
    static deriveKeypair(mnemonics, path) {
        if (path == null) {
            path = exports.DEFAULT_ED25519_DERIVATION_PATH;
        }
        if (!(0, mnemonics_1.isValidHardenedPath)(path)) {
            throw new Error('Invalid derivation path');
        }
        const { key } = (0, ed25519_hd_key_1.derivePath)(path, (0, mnemonics_1.mnemonicToSeedHex)(mnemonics));
        const pubkey = (0, ed25519_hd_key_1.getPublicKey)(key, false);
        // Ed25519 private key returned here has 32 bytes. NaCl expects 64 bytes where the last 32 bytes are the public key.
        let fullPrivateKey = new Uint8Array(64);
        fullPrivateKey.set(key);
        fullPrivateKey.set(pubkey, 32);
        return new Ed25519Keypair({ publicKey: pubkey, secretKey: fullPrivateKey });
    }
    export() {
        return {
            schema: 'ED25519',
            privateKey: (0, bcs_1.toB64)(this.keypair.secretKey),
        };
    }
}
exports.Ed25519Keypair = Ed25519Keypair;
//# sourceMappingURL=ed25519-keypair.js.map
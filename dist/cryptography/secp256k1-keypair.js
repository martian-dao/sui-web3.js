"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1Keypair = exports.DEFAULT_SECP256K1_DERIVATION_PATH = void 0;
const secp = __importStar(require("@noble/secp256k1"));
const base64_1 = require("../serialization/base64");
const hmac_1 = require("@noble/hashes/hmac");
const sha256_1 = require("@noble/hashes/sha256");
const secp256k1_publickey_1 = require("./secp256k1-publickey");
const secp256k1_1 = require("@noble/secp256k1");
const mnemonics_1 = require("./mnemonics");
const bip32_1 = require("@scure/bip32");
const bcs_1 = require("@mysten/bcs");
exports.DEFAULT_SECP256K1_DERIVATION_PATH = "m/54'/784'/0'/0/0";
secp.utils.hmacSha256Sync = (key, ...msgs) => {
    const h = hmac_1.hmac.create(sha256_1.sha256, key);
    msgs.forEach((msg) => h.update(msg));
    return h.digest();
};
/**
 * An Secp256k1 Keypair used for signing transactions.
 */
class Secp256k1Keypair {
    /**
     * Create a new keypair instance.
     * Generate random keypair if no {@link Secp256k1Keypair} is provided.
     *
     * @param keypair secp256k1 keypair
     */
    constructor(keypair) {
        if (keypair) {
            this.keypair = keypair;
        }
        else {
            const secretKey = secp.utils.randomPrivateKey();
            const publicKey = secp.getPublicKey(secretKey, true);
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
        const secretKey = secp.utils.randomPrivateKey();
        const publicKey = secp.getPublicKey(secretKey, true);
        return new Secp256k1Keypair({ publicKey, secretKey });
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
        const publicKey = secp.getPublicKey(secretKey, true);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode('sui validation');
            const msgHash = (0, sha256_1.sha256)(signData);
            const signature = secp.signSync(msgHash, secretKey);
            if (!secp.verify(signature, msgHash, publicKey, { strict: true })) {
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
        let publicKey = secp.getPublicKey(seed, true);
        return new Secp256k1Keypair({ publicKey, secretKey: seed });
    }
    /**
     * The public key for this keypair
     */
    getPublicKey() {
        return new secp256k1_publickey_1.Secp256k1PublicKey(this.keypair.publicKey);
    }
    /**
     * Return the signature for the provided data.
     */
    signData(data) {
        const msgHash = (0, sha256_1.sha256)(data.getData());
        const [sig, rec_id] = secp.signSync(msgHash, this.keypair.secretKey, {
            canonical: true,
            recovered: true,
        });
        var recoverable_sig = new Uint8Array(65);
        recoverable_sig.set(secp256k1_1.Signature.fromDER(sig).toCompactRawBytes());
        recoverable_sig.set([rec_id], 64);
        return new base64_1.Base64DataBuffer(recoverable_sig);
    }
    /**
     * Derive Secp256k1 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/54'/784'/0'/0/0, otherwise the path must
     * be compliant to BIP-32 in form m/54'/784'/{account_index}'/{change_index}/{address_index}.
     */
    static deriveKeypair(path, mnemonics) {
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
//# sourceMappingURL=secp256k1-keypair.js.map
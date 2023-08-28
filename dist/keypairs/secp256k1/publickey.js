"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1PublicKey = void 0;
const bcs_1 = require("@mysten/bcs");
const publickey_1 = require("../../cryptography/publickey");
const signature_1 = require("../../cryptography/signature");
const secp256k1_1 = require("@noble/curves/secp256k1");
const sha256_1 = require("@noble/hashes/sha256");
const SECP256K1_PUBLIC_KEY_SIZE = 33;
/**
 * A Secp256k1 public key
 */
class Secp256k1PublicKey extends publickey_1.PublicKey {
    /**
     * Create a new Secp256k1PublicKey object
     * @param value secp256k1 public key as buffer or base-64 encoded string
     */
    constructor(value) {
        super();
        if (typeof value === 'string') {
            this.data = (0, bcs_1.fromB64)(value);
        }
        else if (value instanceof Uint8Array) {
            this.data = value;
        }
        else {
            this.data = Uint8Array.from(value);
        }
        if (this.data.length !== SECP256K1_PUBLIC_KEY_SIZE) {
            throw new Error(`Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
        }
    }
    /**
     * Checks if two Secp256k1 public keys are equal
     */
    equals(publicKey) {
        return super.equals(publicKey);
    }
    /**
     * Return the byte array representation of the Secp256k1 public key
     */
    toRawBytes() {
        return this.data;
    }
    /**
     * Return the Sui address associated with this Secp256k1 public key
     */
    flag() {
        return signature_1.SIGNATURE_SCHEME_TO_FLAG['Secp256k1'];
    }
    /**
     * Verifies that the signature is valid for for the provided message
     */
    async verify(message, signature) {
        let bytes;
        if (typeof signature === 'string') {
            const parsed = (0, signature_1.parseSerializedSignature)(signature);
            if (parsed.signatureScheme !== 'Secp256k1') {
                throw new Error('Invalid signature scheme');
            }
            if (!(0, publickey_1.bytesEqual)(this.toRawBytes(), parsed.publicKey)) {
                throw new Error('Signature does not match public key');
            }
            bytes = parsed.signature;
        }
        else {
            bytes = signature;
        }
        return secp256k1_1.secp256k1.verify(secp256k1_1.secp256k1.Signature.fromCompact(bytes), (0, sha256_1.sha256)(message), this.toRawBytes());
    }
}
exports.Secp256k1PublicKey = Secp256k1PublicKey;
Secp256k1PublicKey.SIZE = SECP256K1_PUBLIC_KEY_SIZE;
//# sourceMappingURL=publickey.js.map
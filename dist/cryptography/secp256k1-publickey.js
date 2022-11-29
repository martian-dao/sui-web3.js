"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1PublicKey = void 0;
const bcs_1 = require("@mysten/bcs");
const js_sha3_1 = __importDefault(require("js-sha3"));
const publickey_1 = require("./publickey");
const SECP256K1_PUBLIC_KEY_SIZE = 33;
/**
 * A Secp256k1 public key
 */
class Secp256k1PublicKey {
    /**
     * Create a new Secp256k1PublicKey object
     * @param value secp256k1 public key as buffer or base-64 encoded string
     */
    constructor(value) {
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
        return (0, publickey_1.bytesEqual)(this.toBytes(), publicKey.toBytes());
    }
    /**
     * Return the base-64 representation of the Secp256k1 public key
     */
    toBase64() {
        return (0, bcs_1.toB64)(this.toBytes());
    }
    /**
     * Return the byte array representation of the Secp256k1 public key
     */
    toBytes() {
        return this.data;
    }
    /**
     * Return the base-64 representation of the Secp256k1 public key
     */
    toString() {
        return this.toBase64();
    }
    /**
     * Return the Sui address associated with this Secp256k1 public key
     */
    toSuiAddress() {
        let tmp = new Uint8Array(SECP256K1_PUBLIC_KEY_SIZE + 1);
        tmp.set([publickey_1.SIGNATURE_SCHEME_TO_FLAG['Secp256k1']]);
        tmp.set(this.toBytes(), 1);
        return js_sha3_1.default.sha3_256(tmp).slice(0, 40);
    }
}
exports.Secp256k1PublicKey = Secp256k1PublicKey;
//# sourceMappingURL=secp256k1-publickey.js.map
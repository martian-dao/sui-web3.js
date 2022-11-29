"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519PublicKey = void 0;
const js_sha3_1 = __importDefault(require("js-sha3"));
const bcs_1 = require("@mysten/bcs");
const publickey_1 = require("./publickey");
const PUBLIC_KEY_SIZE = 32;
/**
 * An Ed25519 public key
 */
class Ed25519PublicKey {
    /**
     * Create a new Ed25519PublicKey object
     * @param value ed25519 public key as buffer or base-64 encoded string
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
        if (this.data.length !== PUBLIC_KEY_SIZE) {
            throw new Error(`Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
        }
    }
    /**
     * Checks if two Ed25519 public keys are equal
     */
    equals(publicKey) {
        return (0, publickey_1.bytesEqual)(this.toBytes(), publicKey.toBytes());
    }
    /**
     * Return the base-64 representation of the Ed25519 public key
     */
    toBase64() {
        return (0, bcs_1.toB64)(this.toBytes());
    }
    /**
     * Return the byte array representation of the Ed25519 public key
     */
    toBytes() {
        return this.data;
    }
    /**
     * Return the base-64 representation of the Ed25519 public key
     */
    toString() {
        return this.toBase64();
    }
    /**
     * Return the Sui address associated with this Ed25519 public key
     */
    toSuiAddress() {
        let tmp = new Uint8Array(PUBLIC_KEY_SIZE + 1);
        tmp.set([publickey_1.SIGNATURE_SCHEME_TO_FLAG['ED25519']]);
        tmp.set(this.toBytes(), 1);
        return js_sha3_1.default.sha3_256(tmp).slice(0, 40);
    }
}
exports.Ed25519PublicKey = Ed25519PublicKey;
//# sourceMappingURL=ed25519-publickey.js.map
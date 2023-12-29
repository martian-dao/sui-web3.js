"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawSigner = void 0;
const blake2b_1 = require("@noble/hashes/blake2b");
const signature_1 = require("../cryptography/signature");
const signer_with_provider_1 = require("./signer-with-provider");
class RawSigner extends signer_with_provider_1.SignerWithProvider {
    constructor(keypair, client) {
        super(client);
        this.keypair = keypair;
    }
    async getAddress() {
        return this.keypair.getPublicKey().toSuiAddress();
    }
    static async getDigest(data) {
        return (0, blake2b_1.blake2b)(data, { dkLen: 32 });
    }
    async getSerializedSignature(signature) {
        const signatureScheme = this.keypair.getKeyScheme();
        const pubkey = this.keypair.getPublicKey();
        return (0, signature_1.toSerializedSignature)({
            signatureScheme,
            signature,
            pubKey: pubkey,
        });
    }
    async signData(data) {
        const pubkey = this.keypair.getPublicKey();
        const digest = (0, blake2b_1.blake2b)(data, { dkLen: 32 });
        const signature = this.keypair.signData(digest);
        const signatureScheme = this.keypair.getKeyScheme();
        return (0, signature_1.toSerializedSignature)({
            signatureScheme,
            signature,
            pubKey: pubkey,
        });
    }
    connect(client) {
        return new RawSigner(this.keypair, client);
    }
}
exports.RawSigner = RawSigner;
//# sourceMappingURL=raw-signer.js.map
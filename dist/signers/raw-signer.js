"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawSigner = void 0;
const signer_with_provider_1 = require("./signer-with-provider");
class RawSigner extends signer_with_provider_1.SignerWithProvider {
    constructor(keypair, provider, serializer) {
        super(provider, serializer);
        this.keypair = keypair;
    }
    async getAddress() {
        return this.keypair.getPublicKey().toSuiAddress();
    }
    async signData(data) {
        return {
            signatureScheme: this.keypair.getKeyScheme(),
            signature: this.keypair.signData(data),
            pubKey: this.keypair.getPublicKey(),
        };
    }
    connect(provider) {
        return new RawSigner(this.keypair, provider);
    }
}
exports.RawSigner = RawSigner;
//# sourceMappingURL=raw-signer.js.map
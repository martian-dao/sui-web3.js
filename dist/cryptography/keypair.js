"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromExportedKeypair = void 0;
const bcs_1 = require("@mysten/bcs");
const ed25519_keypair_1 = require("./ed25519-keypair");
const secp256k1_keypair_1 = require("./secp256k1-keypair");
function fromExportedKeypair(keypair) {
    const secretKey = (0, bcs_1.fromB64)(keypair.privateKey);
    switch (keypair.schema) {
        case 'ED25519':
            return ed25519_keypair_1.Ed25519Keypair.fromSecretKey(secretKey);
        case 'Secp256k1':
            return secp256k1_keypair_1.Secp256k1Keypair.fromSecretKey(secretKey);
        default:
            throw new Error(`Invalid keypair schema ${keypair.schema}`);
    }
}
exports.fromExportedKeypair = fromExportedKeypair;
//# sourceMappingURL=keypair.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSerializedSignature = exports.toSerializedSignature = exports.SIGNATURE_FLAG_TO_SCHEME = exports.SIGNATURE_SCHEME_TO_SIZE = exports.SIGNATURE_SCHEME_TO_FLAG = void 0;
const bcs_1 = require("@mysten/bcs");
const bcs_2 = require("../builder/bcs");
exports.SIGNATURE_SCHEME_TO_FLAG = {
    ED25519: 0x00,
    Secp256k1: 0x01,
    Secp256r1: 0x02,
    MultiSig: 0x03,
};
exports.SIGNATURE_SCHEME_TO_SIZE = {
    ED25519: 32,
    Secp256k1: 33,
    Secp256r1: 33,
};
exports.SIGNATURE_FLAG_TO_SCHEME = {
    0x00: 'ED25519',
    0x01: 'Secp256k1',
    0x02: 'Secp256r1',
    0x03: 'MultiSig',
};
function toSerializedSignature({ signature, signatureScheme, pubKey, publicKey = pubKey, }) {
    if (!publicKey) {
        throw new Error('`publicKey` is required');
    }
    const pubKeyBytes = publicKey.toBytes();
    const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
    serializedSignature.set([exports.SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
    serializedSignature.set(signature, 1);
    serializedSignature.set(pubKeyBytes, 1 + signature.length);
    return (0, bcs_1.toB64)(serializedSignature);
}
exports.toSerializedSignature = toSerializedSignature;
function parseSerializedSignature(serializedSignature) {
    const bytes = (0, bcs_1.fromB64)(serializedSignature);
    const signatureScheme = exports.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
    if (signatureScheme === 'MultiSig') {
        const multisig = bcs_2.builder.de('MultiSig', bytes.slice(1));
        return {
            serializedSignature,
            signatureScheme,
            multisig,
            bytes,
        };
    }
    if (!(signatureScheme in exports.SIGNATURE_SCHEME_TO_SIZE)) {
        throw new Error('Unsupported signature scheme');
    }
    const size = exports.SIGNATURE_SCHEME_TO_SIZE[signatureScheme];
    const signature = bytes.slice(1, bytes.length - size);
    const publicKey = bytes.slice(1 + signature.length);
    return {
        serializedSignature,
        signatureScheme,
        signature,
        publicKey,
        bytes,
    };
}
exports.parseSerializedSignature = parseSerializedSignature;
//# sourceMappingURL=signature.js.map
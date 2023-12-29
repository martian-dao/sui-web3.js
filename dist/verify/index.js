"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyFromRawBytes = exports.verifyTransactionBlock = exports.verifyPersonalMessage = exports.verifySignature = void 0;
const index_1 = require("../cryptography/index");
const publickey_1 = require("../keypairs/ed25519/publickey");
const publickey_2 = require("../keypairs/secp256k1/publickey");
const publickey_3 = require("../keypairs/secp256r1/publickey");
// eslint-disable-next-line import/no-cycle
const publickey_4 = require("../multisig/publickey");
async function verifySignature(bytes, signature) {
    const parsedSignature = parseSignature(signature);
    if (!(await parsedSignature.publicKey.verify(bytes, parsedSignature.serializedSignature))) {
        throw new Error(`Signature is not valid for the provided data`);
    }
    return parsedSignature.publicKey;
}
exports.verifySignature = verifySignature;
async function verifyPersonalMessage(message, signature) {
    const parsedSignature = parseSignature(signature);
    if (!(await parsedSignature.publicKey.verifyPersonalMessage(message, parsedSignature.serializedSignature))) {
        throw new Error(`Signature is not valid for the provided message`);
    }
    return parsedSignature.publicKey;
}
exports.verifyPersonalMessage = verifyPersonalMessage;
async function verifyTransactionBlock(transactionBlock, signature) {
    const parsedSignature = parseSignature(signature);
    if (!(await parsedSignature.publicKey.verifyTransactionBlock(transactionBlock, parsedSignature.serializedSignature))) {
        throw new Error(`Signature is not valid for the provided TransactionBlock`);
    }
    return parsedSignature.publicKey;
}
exports.verifyTransactionBlock = verifyTransactionBlock;
function parseSignature(signature) {
    const parsedSignature = (0, index_1.parseSerializedSignature)(signature);
    if (parsedSignature.signatureScheme === 'MultiSig') {
        return {
            ...parsedSignature,
            publicKey: new publickey_4.MultiSigPublicKey(parsedSignature.multisig.multisig_pk),
        };
    }
    const publicKey = publicKeyFromRawBytes(parsedSignature.signatureScheme, parsedSignature.publicKey);
    return {
        ...parsedSignature,
        publicKey,
    };
}
function publicKeyFromRawBytes(signatureScheme, bytes) {
    switch (signatureScheme) {
        case 'ED25519':
            return new publickey_1.Ed25519PublicKey(bytes);
        case 'Secp256k1':
            return new publickey_2.Secp256k1PublicKey(bytes);
        case 'Secp256r1':
            return new publickey_3.Secp256r1PublicKey(bytes);
        case 'MultiSig':
            return new publickey_4.MultiSigPublicKey(bytes);
        default:
            throw new Error(`Unsupported signature scheme ${signatureScheme}`);
    }
}
exports.publicKeyFromRawBytes = publicKeyFromRawBytes;
//# sourceMappingURL=index.js.map
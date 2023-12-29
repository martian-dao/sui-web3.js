"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable import/no-cycle */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromExportedKeypair = exports.publicKeyFromSerialized = exports.toSingleSignaturePubkeyPair = exports.toParsedSignaturePubkeyPair = void 0;
const bcs_1 = require("@mysten/bcs");
const signature_1 = require("./signature");
const publickey_1 = require("../keypairs/secp256r1/publickey");
const publickey_2 = require("../keypairs/secp256k1/publickey");
const publickey_3 = require("../keypairs/ed25519/publickey");
const multisig_1 = require("./multisig");
const keypair_1 = require("../keypairs/ed25519/keypair");
const keypair_2 = require("../keypairs/secp256k1/keypair");
const keypair_3 = require("./keypair");
/// Expects to parse a serialized signature by its signature scheme to a list of signature
/// and public key pairs. The list is of length 1 if it is not multisig.
function toParsedSignaturePubkeyPair(serializedSignature) {
    const bytes = (0, bcs_1.fromB64)(serializedSignature);
    const signatureScheme = signature_1.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
    if (signatureScheme === 'MultiSig') {
        try {
            return (0, multisig_1.decodeMultiSig)(serializedSignature);
        }
        catch (e) {
            // Legacy format multisig do not render.
            throw new Error('legacy multisig viewing unsupported');
        }
    }
    const SIGNATURE_SCHEME_TO_PUBLIC_KEY = {
        ED25519: publickey_3.Ed25519PublicKey,
        Secp256k1: publickey_2.Secp256k1PublicKey,
        Secp256r1: publickey_1.Secp256r1PublicKey,
    };
    const PublicKey = SIGNATURE_SCHEME_TO_PUBLIC_KEY[signatureScheme];
    const signature = bytes.slice(1, bytes.length - PublicKey.SIZE);
    const pubkeyBytes = bytes.slice(1 + signature.length);
    const pubKey = new PublicKey(pubkeyBytes);
    return [
        {
            signatureScheme,
            signature,
            pubKey,
        },
    ];
}
exports.toParsedSignaturePubkeyPair = toParsedSignaturePubkeyPair;
/// Expects to parse a single signature pubkey pair from the serialized
/// signature. Use this only if multisig is not expected.
function toSingleSignaturePubkeyPair(serializedSignature) {
    const res = toParsedSignaturePubkeyPair(serializedSignature);
    if (res.length !== 1) {
        throw Error('Expected a single signature');
    }
    return res[0];
}
exports.toSingleSignaturePubkeyPair = toSingleSignaturePubkeyPair;
function publicKeyFromSerialized(schema, pubKey) {
    if (schema === 'ED25519') {
        return new publickey_3.Ed25519PublicKey(pubKey);
    }
    if (schema === 'Secp256k1') {
        return new publickey_2.Secp256k1PublicKey(pubKey);
    }
    throw new Error('Unknown public key schema');
}
exports.publicKeyFromSerialized = publicKeyFromSerialized;
function fromExportedKeypair(keypair) {
    const secretKey = (0, bcs_1.fromB64)(keypair.privateKey);
    switch (keypair.schema) {
        case 'ED25519':
            let pureSecretKey = secretKey;
            if (secretKey.length === keypair_3.LEGACY_PRIVATE_KEY_SIZE) {
                // This is a legacy secret key, we need to strip the public key bytes and only read the first 32 bytes
                pureSecretKey = secretKey.slice(0, keypair_3.PRIVATE_KEY_SIZE);
            }
            return keypair_1.Ed25519Keypair.fromSecretKey(pureSecretKey);
        case 'Secp256k1':
            return keypair_2.Secp256k1Keypair.fromSecretKey(secretKey);
        default:
            throw new Error(`Invalid keypair schema ${keypair.schema}`);
    }
}
exports.fromExportedKeypair = fromExportedKeypair;
//# sourceMappingURL=utils.js.map
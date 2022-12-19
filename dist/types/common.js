"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionDigest = exports.normalizeSuiObjectId = exports.normalizeSuiAddress = exports.isValidSuiObjectId = exports.isValidSuiAddress = exports.SUI_ADDRESS_LENGTH = exports.isValidTransactionDigest = void 0;
const base58_1 = require("../serialization/base58");
const sui_bcs_1 = require("./sui-bcs");
const publickey_1 = require("../cryptography/publickey");
const hash_1 = require("../cryptography/hash");
const ed25519_publickey_1 = require("../cryptography/ed25519-publickey");
const secp256k1_publickey_1 = require("../cryptography/secp256k1-publickey");
const base64_1 = require("../serialization/base64");
// source of truth is
// https://github.com/MystenLabs/sui/blob/acb2b97ae21f47600e05b0d28127d88d0725561d/crates/sui-types/src/base_types.rs#L171
const TX_DIGEST_LENGTH = 32;
/** Returns whether the tx digest is valid based on the serialization format */
function isValidTransactionDigest(value, serializationFmt) {
    let buffer;
    try {
        if (serializationFmt === 'base58') {
            buffer = new base58_1.Base58DataBuffer(value);
        }
        else {
            buffer = new base64_1.Base64DataBuffer(value);
        }
        return buffer.getLength() === TX_DIGEST_LENGTH;
    }
    catch (e) {
        return false;
    }
}
exports.isValidTransactionDigest = isValidTransactionDigest;
// TODO - can we automatically sync this with rust length definition?
// Source of truth is
// https://github.com/MystenLabs/sui/blob/acb2b97ae21f47600e05b0d28127d88d0725561d/crates/sui-types/src/base_types.rs#L67
// which uses the Move account address length
// https://github.com/move-language/move/blob/67ec40dc50c66c34fd73512fcc412f3b68d67235/language/move-core/types/src/account_address.rs#L23 .
exports.SUI_ADDRESS_LENGTH = 20;
function isValidSuiAddress(value) {
    return isHex(value) && getHexByteLength(value) === exports.SUI_ADDRESS_LENGTH;
}
exports.isValidSuiAddress = isValidSuiAddress;
function isValidSuiObjectId(value) {
    return isValidSuiAddress(value);
}
exports.isValidSuiObjectId = isValidSuiObjectId;
/**
 * Perform the following operations:
 * 1. Make the address lower case
 * 2. Prepend `0x` if the string does not start with `0x`.
 * 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
 *
 * WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
 * is to treat the first `0x` not as part of the address. The default behavior can be overridden by
 * setting `forceAdd0x` to true
 *
 */
function normalizeSuiAddress(value, forceAdd0x = false) {
    let address = value.toLowerCase();
    if (!forceAdd0x && address.startsWith('0x')) {
        address = address.slice(2);
    }
    return `0x${address.padStart(exports.SUI_ADDRESS_LENGTH * 2, '0')}`;
}
exports.normalizeSuiAddress = normalizeSuiAddress;
function normalizeSuiObjectId(value, forceAdd0x = false) {
    return normalizeSuiAddress(value, forceAdd0x);
}
exports.normalizeSuiObjectId = normalizeSuiObjectId;
/**
 * Generate transaction digest.
 *
 * @param data transaction data
 * @param signatureScheme signature scheme
 * @param signature signature as a base64 string
 * @param publicKey public key
 */
function generateTransactionDigest(data, signatureScheme, signature, publicKey, serializationFmt, excludeSig = false) {
    const signatureBytes = (typeof signature === 'string' ? new base64_1.Base64DataBuffer(signature) : signature).getData();
    let pk;
    switch (signatureScheme) {
        case 'ED25519':
            pk =
                publicKey instanceof ed25519_publickey_1.Ed25519PublicKey
                    ? publicKey
                    : new ed25519_publickey_1.Ed25519PublicKey(publicKey);
            break;
        case 'Secp256k1':
            pk =
                publicKey instanceof secp256k1_publickey_1.Secp256k1PublicKey
                    ? publicKey
                    : new secp256k1_publickey_1.Secp256k1PublicKey(publicKey);
    }
    const publicKeyBytes = pk.toBytes();
    const schemeByte = new Uint8Array([
        publickey_1.SIGNATURE_SCHEME_TO_FLAG[signatureScheme],
    ]);
    const txSignature = new Uint8Array(1 + signatureBytes.length + publicKeyBytes.length);
    txSignature.set(schemeByte);
    txSignature.set(signatureBytes, 1);
    txSignature.set(publicKeyBytes, 1 + signatureBytes.length);
    const senderSignedData = {
        data,
        txSignature,
    };
    const senderSignedDataBytes = sui_bcs_1.bcs
        .ser('SenderSignedData', senderSignedData)
        .toBytes();
    let hash;
    if (excludeSig) {
        const txBytes = sui_bcs_1.bcs.ser('TransactionData', data).toBytes();
        hash = (0, hash_1.sha256Hash)('TransactionData', txBytes);
    }
    else {
        hash = (0, hash_1.sha256Hash)('SenderSignedData', senderSignedDataBytes);
    }
    return serializationFmt === 'base58' ? new base58_1.Base58DataBuffer(hash).toString() : new base64_1.Base64DataBuffer(hash).toString();
}
exports.generateTransactionDigest = generateTransactionDigest;
function isHex(value) {
    return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
    return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}
//# sourceMappingURL=common.js.map
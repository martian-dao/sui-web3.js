"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSuiObjectId = exports.normalizeSuiAddress = exports.isValidSuiObjectId = exports.isValidSuiAddress = exports.SUI_ADDRESS_LENGTH = exports.isValidTransactionDigest = void 0;
const base64_1 = require("../serialization/base64");
// source of truth is
// https://github.com/MystenLabs/sui/blob/acb2b97ae21f47600e05b0d28127d88d0725561d/crates/sui-types/src/base_types.rs#L171
const TX_DIGEST_LENGTH = 32;
// taken from https://rgxdb.com/r/1NUN74O6
const VALID_BASE64_REGEX = /^(?:[a-zA-Z0-9+\/]{4})*(?:|(?:[a-zA-Z0-9+\/]{3}=)|(?:[a-zA-Z0-9+\/]{2}==)|(?:[a-zA-Z0-9+\/]{1}===))$/;
function isValidTransactionDigest(value) {
    return (new base64_1.Base64DataBuffer(value).getLength() === TX_DIGEST_LENGTH &&
        VALID_BASE64_REGEX.test(value));
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
function isHex(value) {
    return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
    return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}
//# sourceMappingURL=common.js.map
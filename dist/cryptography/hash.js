"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256Hash = void 0;
const bcs_1 = require("@mysten/bcs");
const js_sha3_1 = __importDefault(require("js-sha3"));
/**
 * Generates a SHA 256 hash of typed data as a base64 string.
 *
 * @param typeTag type tag (e.g. TransactionData, SenderSignedData)
 * @param data data to hash
 */
function sha256Hash(typeTag, data) {
    const hash = js_sha3_1.default.sha3_256.create();
    const typeTagBytes = Array.from(`${typeTag}::`).map((e) => e.charCodeAt(0));
    const dataWithTag = new Uint8Array(typeTagBytes.length + data.length);
    dataWithTag.set(typeTagBytes);
    dataWithTag.set(data, typeTagBytes.length);
    hash.update(dataWithTag);
    return (0, bcs_1.fromHEX)(hash.hex());
}
exports.sha256Hash = sha256Hash;
//# sourceMappingURL=hash.js.map
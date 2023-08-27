"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyFromSuiBytes = void 0;
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
const bcs_1 = require("@mysten/bcs");
const index_1 = require("../verify/index");
const index_2 = require("../cryptography/index");
__exportStar(require("./publickey"), exports);
function publicKeyFromSuiBytes(publicKey) {
    const bytes = typeof publicKey === 'string' ? (0, bcs_1.fromB64)(publicKey) : publicKey;
    const signatureScheme = index_2.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
    return (0, index_1.publicKeyFromRawBytes)(signatureScheme, bytes.slice(1));
}
exports.publicKeyFromSuiBytes = publicKeyFromSuiBytes;
//# sourceMappingURL=index.js.map
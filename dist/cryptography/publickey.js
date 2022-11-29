"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGNATURE_SCHEME_TO_FLAG = exports.bytesEqual = void 0;
function bytesEqual(a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
exports.bytesEqual = bytesEqual;
exports.SIGNATURE_SCHEME_TO_FLAG = {
    ED25519: 0x00,
    Secp256k1: 0x01,
};
//# sourceMappingURL=publickey.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessage = void 0;
const bcs_1 = require("@mysten/bcs");
const intent_1 = require("../cryptography/intent");
const intent_2 = require("../cryptography/intent");
const blake2b_1 = require("@noble/hashes/blake2b");
const utils_1 = require("../cryptography/utils");
const index_1 = require("../bcs/index");
// TODO: This might actually make sense to eventually move to the `Keypair` instances themselves, as
// it could allow the Sui to be tree-shaken a little better, possibly allowing keypairs that are
// not used (and their deps) to be entirely removed from the bundle.
/** Verify data that is signed with the expected scope. */
async function verifyMessage(message, serializedSignature, scope) {
    const signature = (0, utils_1.toSingleSignaturePubkeyPair)(serializedSignature);
    if (scope === intent_1.IntentScope.PersonalMessage) {
        const messageBytes = (0, intent_2.messageWithIntent)(scope, index_1.bcs
            .ser(['vector', 'u8'], typeof message === 'string' ? (0, bcs_1.fromB64)(message) : message)
            .toBytes());
        if (await signature.pubKey.verify((0, blake2b_1.blake2b)(messageBytes, { dkLen: 32 }), signature.signature)) {
            return true;
        }
        // Fallback for backwards compatibility, old versions of the SDK
        // did not properly wrap PersonalMessages in a PersonalMessage bcs Struct
        const unwrappedMessageBytes = (0, intent_2.messageWithIntent)(scope, typeof message === 'string' ? (0, bcs_1.fromB64)(message) : message);
        return signature.pubKey.verify((0, blake2b_1.blake2b)(unwrappedMessageBytes, { dkLen: 32 }), signature.signature);
    }
    const messageBytes = (0, intent_2.messageWithIntent)(scope, typeof message === 'string' ? (0, bcs_1.fromB64)(message) : message);
    return signature.pubKey.verify((0, blake2b_1.blake2b)(messageBytes, { dkLen: 32 }), signature.signature);
}
exports.verifyMessage = verifyMessage;
//# sourceMappingURL=verify.js.map
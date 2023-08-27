"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keypair = exports.BaseSigner = exports.LEGACY_PRIVATE_KEY_SIZE = exports.PRIVATE_KEY_SIZE = void 0;
const signature_1 = require("./signature");
const intent_1 = require("./intent");
const blake2b_1 = require("@noble/hashes/blake2b");
const index_1 = require("../bcs/index");
const bcs_1 = require("@mysten/bcs");
exports.PRIVATE_KEY_SIZE = 32;
exports.LEGACY_PRIVATE_KEY_SIZE = 64;
/**
 * TODO: Document
 */
class BaseSigner {
    async signWithIntent(bytes, intent) {
        const intentMessage = (0, intent_1.messageWithIntent)(intent, bytes);
        const digest = (0, blake2b_1.blake2b)(intentMessage, { dkLen: 32 });
        const signature = (0, signature_1.toSerializedSignature)({
            signature: await this.sign(digest),
            signatureScheme: this.getKeyScheme(),
            pubKey: this.getPublicKey(),
        });
        return {
            signature,
            bytes: (0, bcs_1.toB64)(bytes),
        };
    }
    async signTransactionBlock(bytes) {
        return this.signWithIntent(bytes, intent_1.IntentScope.TransactionData);
    }
    async signPersonalMessage(bytes) {
        return this.signWithIntent(index_1.bcs.ser(['vector', 'u8'], bytes).toBytes(), intent_1.IntentScope.PersonalMessage);
    }
    /**
     * @deprecated use `signPersonalMessage` instead
     */
    async signMessage(bytes) {
        return this.signPersonalMessage(bytes);
    }
    toSuiAddress() {
        return this.getPublicKey().toSuiAddress();
    }
}
exports.BaseSigner = BaseSigner;
/**
 * TODO: Document
 */
class Keypair extends BaseSigner {
}
exports.Keypair = Keypair;
//# sourceMappingURL=keypair.js.map
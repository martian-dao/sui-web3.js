"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePartialSignatures = exports.MultiSigPublicKey = exports.MAX_SIGNER_IN_MULTISIG = void 0;
const bcs_1 = require("@mysten/bcs");
const blake2b_1 = require("@noble/hashes/blake2b");
const utils_1 = require("@noble/hashes/utils");
const publickey_1 = require("../cryptography/publickey");
const signature_1 = require("../cryptography/signature");
const sui_types_1 = require("../utils/sui-types");
const bcs_2 = require("../builder/bcs");
// eslint-disable-next-line import/no-cycle
const index_1 = require("../verify/index");
exports.MAX_SIGNER_IN_MULTISIG = 10;
/**
 * A MultiSig public key
 */
class MultiSigPublicKey extends publickey_1.PublicKey {
    /**
     * Create a new MultiSigPublicKey object
     */
    constructor(
    /**
     *  MultiSig public key as buffer or base-64 encoded string
     */
    value) {
        super();
        if (typeof value === 'string') {
            this.rawBytes = (0, bcs_1.fromB64)(value);
            this.multisigPublicKey = bcs_2.builder.de('MultiSigPublicKey', this.rawBytes);
        }
        else if (value instanceof Uint8Array) {
            this.rawBytes = value;
            this.multisigPublicKey = bcs_2.builder.de('MultiSigPublicKey', this.rawBytes);
        }
        else {
            this.multisigPublicKey = value;
            this.rawBytes = bcs_2.builder.ser('MultiSigPublicKey', value).toBytes();
        }
        this.publicKeys = this.multisigPublicKey.pk_map.map(({ pubKey, weight }) => {
            const [scheme, bytes] = Object.entries(pubKey)[0];
            return {
                publicKey: (0, index_1.publicKeyFromRawBytes)(scheme, Uint8Array.from(bytes)),
                weight,
            };
        });
        if (this.publicKeys.length > exports.MAX_SIGNER_IN_MULTISIG) {
            throw new Error(`Max number of signers in a multisig is ${exports.MAX_SIGNER_IN_MULTISIG}`);
        }
    }
    static fromPublicKeys({ threshold, publicKeys, }) {
        return new MultiSigPublicKey({
            pk_map: publicKeys.map(({ publicKey, weight }) => {
                const scheme = signature_1.SIGNATURE_FLAG_TO_SCHEME[publicKey.flag()];
                return {
                    pubKey: {
                        [scheme]: Array.from(publicKey.toRawBytes()),
                    },
                    weight,
                };
            }),
            threshold,
        });
    }
    /**
     * Checks if two MultiSig public keys are equal
     */
    equals(publicKey) {
        return super.equals(publicKey);
    }
    /**
     * Return the byte array representation of the MultiSig public key
     */
    toRawBytes() {
        return this.rawBytes;
    }
    getPublicKeys() {
        return this.publicKeys;
    }
    /**
     * Return the Sui address associated with this MultiSig public key
     */
    toSuiAddress() {
        // max length = 1 flag byte + (max pk size + max weight size (u8)) * max signer size + 2 threshold bytes (u16)
        const maxLength = 1 + (64 + 1) * exports.MAX_SIGNER_IN_MULTISIG + 2;
        const tmp = new Uint8Array(maxLength);
        tmp.set([signature_1.SIGNATURE_SCHEME_TO_FLAG['MultiSig']]);
        tmp.set(bcs_2.builder.ser('u16', this.multisigPublicKey.threshold).toBytes(), 1);
        let i = 3;
        for (const { publicKey, weight } of this.publicKeys) {
            const bytes = publicKey.toSuiBytes();
            tmp.set(bytes, i);
            i += bytes.length;
            tmp.set([weight], i++);
        }
        return (0, sui_types_1.normalizeSuiAddress)((0, utils_1.bytesToHex)((0, blake2b_1.blake2b)(tmp.slice(0, i), { dkLen: 32 })));
    }
    /**
     * Return the Sui address associated with this MultiSig public key
     */
    flag() {
        return signature_1.SIGNATURE_SCHEME_TO_FLAG['MultiSig'];
    }
    /**
     * Verifies that the signature is valid for for the provided message
     */
    async verify(message, multisigSignature) {
        if (typeof multisigSignature !== 'string') {
            throw new Error('Multisig verification only supports serialized signature');
        }
        const { signatureScheme, multisig } = (0, signature_1.parseSerializedSignature)(multisigSignature);
        if (signatureScheme !== 'MultiSig') {
            throw new Error('Invalid signature scheme');
        }
        let signatureWeight = 0;
        if (!(0, publickey_1.bytesEqual)(bcs_2.builder.ser('MultiSigPublicKey', this.multisigPublicKey).toBytes(), bcs_2.builder.ser('MultiSigPublicKey', multisig.multisig_pk).toBytes())) {
            return false;
        }
        for (const { publicKey, weight, signature } of parsePartialSignatures(multisig)) {
            if (!(await publicKey.verify(message, signature))) {
                return false;
            }
            signatureWeight += weight;
        }
        return signatureWeight >= this.multisigPublicKey.threshold;
    }
    combinePartialSignatures(signatures) {
        let bitmap = 0;
        const compressedSignatures = new Array(signatures.length);
        for (let i = 0; i < signatures.length; i++) {
            let parsed = (0, signature_1.parseSerializedSignature)(signatures[i]);
            if (parsed.signatureScheme === 'MultiSig') {
                throw new Error('MultiSig is not supported inside MultiSig');
            }
            let bytes = Array.from(parsed.signature.map((x) => Number(x)));
            if (parsed.signatureScheme === 'ED25519') {
                compressedSignatures[i] = { ED25519: bytes };
            }
            else if (parsed.signatureScheme === 'Secp256k1') {
                compressedSignatures[i] = { Secp256k1: bytes };
            }
            else if (parsed.signatureScheme === 'Secp256r1') {
                compressedSignatures[i] = { Secp256r1: bytes };
            }
            let publicKeyIndex;
            for (let j = 0; j < this.publicKeys.length; j++) {
                if ((0, publickey_1.bytesEqual)(parsed.publicKey, this.publicKeys[j].publicKey.toRawBytes())) {
                    if (bitmap & (1 << j)) {
                        throw new Error('Received multiple signatures from the same public key');
                    }
                    publicKeyIndex = j;
                    break;
                }
            }
            if (publicKeyIndex === undefined) {
                throw new Error('Received signature from unknown public key');
            }
            bitmap |= 1 << publicKeyIndex;
        }
        let multisig = {
            sigs: compressedSignatures,
            bitmap,
            multisig_pk: this.multisigPublicKey,
        };
        const bytes = bcs_2.builder.ser('MultiSig', multisig).toBytes();
        let tmp = new Uint8Array(bytes.length + 1);
        tmp.set([signature_1.SIGNATURE_SCHEME_TO_FLAG['MultiSig']]);
        tmp.set(bytes, 1);
        return (0, bcs_1.toB64)(tmp);
    }
}
exports.MultiSigPublicKey = MultiSigPublicKey;
function parsePartialSignatures(multisig) {
    let res = new Array(multisig.sigs.length);
    for (let i = 0; i < multisig.sigs.length; i++) {
        const [signatureScheme, signature] = Object.entries(multisig.sigs[i])[0];
        const pkIndex = asIndices(multisig.bitmap).at(i);
        const pair = multisig.multisig_pk.pk_map[pkIndex];
        const pkBytes = Uint8Array.from(Object.values(pair.pubKey)[0]);
        if (signatureScheme === 'MultiSig') {
            throw new Error('MultiSig is not supported inside MultiSig');
        }
        const publicKey = (0, index_1.publicKeyFromRawBytes)(signatureScheme, pkBytes);
        res[i] = {
            signatureScheme,
            signature: Uint8Array.from(signature),
            publicKey: publicKey,
            weight: pair.weight,
        };
    }
    return res;
}
exports.parsePartialSignatures = parsePartialSignatures;
function asIndices(bitmap) {
    if (bitmap < 0 || bitmap > 1024) {
        throw new Error('Invalid bitmap');
    }
    let res = [];
    for (let i = 0; i < 10; i++) {
        if ((bitmap & (1 << i)) !== 0) {
            res.push(i);
        }
    }
    return Uint8Array.from(res);
}
//# sourceMappingURL=publickey.js.map
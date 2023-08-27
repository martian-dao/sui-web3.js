"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeMultiSig = exports.combinePartialSigs = exports.toMultiSigAddress = exports.MAX_SIGNER_IN_MULTISIG = void 0;
const bcs_1 = require("@mysten/bcs");
const signature_1 = require("./signature");
// eslint-disable-next-line import/no-cycle
const utils_1 = require("./utils");
const blake2b_1 = require("@noble/hashes/blake2b");
const utils_2 = require("@noble/hashes/utils");
const publickey_1 = require("../keypairs/ed25519/publickey");
const publickey_2 = require("../keypairs/secp256k1/publickey");
const publickey_3 = require("../keypairs/secp256r1/publickey");
const bcs_2 = require("../builder/bcs");
const sui_types_1 = require("../utils/sui-types");
exports.MAX_SIGNER_IN_MULTISIG = 10;
/// Derives a multisig address from a list of pk and weights and threshold.
// It is the 32-byte Blake2b hash of the serializd bytes of `flag_MultiSig || threshold || flag_1 || pk_1 || weight_1
/// || ... || flag_n || pk_n || weight_n`
function toMultiSigAddress(pks, threshold) {
    if (pks.length > exports.MAX_SIGNER_IN_MULTISIG) {
        throw new Error(`Max number of signers in a multisig is ${exports.MAX_SIGNER_IN_MULTISIG}`);
    }
    // max length = 1 flag byte + (max pk size + max weight size (u8)) * max signer size + 2 threshold bytes (u16)
    let maxLength = 1 + (64 + 1) * exports.MAX_SIGNER_IN_MULTISIG + 2;
    let tmp = new Uint8Array(maxLength);
    tmp.set([signature_1.SIGNATURE_SCHEME_TO_FLAG['MultiSig']]);
    let arr = to_uint8array(threshold);
    tmp.set(arr, 1);
    let i = 3;
    for (const pk of pks) {
        tmp.set([pk.pubKey.flag()], i);
        tmp.set(pk.pubKey.toRawBytes(), i + 1);
        tmp.set([pk.weight], i + 1 + pk.pubKey.toRawBytes().length);
        i += pk.pubKey.toRawBytes().length + 2;
    }
    return (0, sui_types_1.normalizeSuiAddress)((0, utils_2.bytesToHex)((0, blake2b_1.blake2b)(tmp.slice(0, i), { dkLen: 32 })));
}
exports.toMultiSigAddress = toMultiSigAddress;
/// Combine a list of serialized sigs, a list of pk weight pairs
/// and threshold into a single multisig. `sigs` are required to
/// be in the same order as `pks`. e.g. for [pk1, pk2, pk3, pk4, pk5],
/// [sig1, sig2, sig5] is valid, but [sig2, sig1, sig5] is invalid.
function combinePartialSigs(sigs, pks, threshold) {
    let multisig_pk = {
        pk_map: pks.map((x) => toPkWeightPair(x)),
        threshold: threshold,
    };
    let bitmap = 0;
    let compressed_sigs = new Array(sigs.length);
    for (let i = 0; i < sigs.length; i++) {
        let parsed = (0, utils_1.toSingleSignaturePubkeyPair)(sigs[i]);
        let bytes = Array.from(parsed.signature.map((x) => Number(x)));
        if (parsed.signatureScheme === 'ED25519') {
            compressed_sigs[i] = { ED25519: bytes };
        }
        else if (parsed.signatureScheme === 'Secp256k1') {
            compressed_sigs[i] = { Secp256k1: bytes };
        }
        else if (parsed.signatureScheme === 'Secp256r1') {
            compressed_sigs[i] = { Secp256r1: bytes };
        }
        for (let j = 0; j < pks.length; j++) {
            if (parsed.pubKey.equals(pks[j].pubKey)) {
                bitmap |= 1 << j;
                break;
            }
        }
    }
    let multisig = {
        sigs: compressed_sigs,
        bitmap,
        multisig_pk,
    };
    const bytes = bcs_2.builder.ser('MultiSig', multisig).toBytes();
    let tmp = new Uint8Array(bytes.length + 1);
    tmp.set([signature_1.SIGNATURE_SCHEME_TO_FLAG['MultiSig']]);
    tmp.set(bytes, 1);
    return (0, bcs_1.toB64)(tmp);
}
exports.combinePartialSigs = combinePartialSigs;
/// Decode a multisig signature into a list of signatures, public keys and flags.
function decodeMultiSig(signature) {
    const parsed = (0, bcs_1.fromB64)(signature);
    if (parsed.length < 1 || parsed[0] !== signature_1.SIGNATURE_SCHEME_TO_FLAG['MultiSig']) {
        throw new Error('Invalid MultiSig flag');
    }
    const multisig = bcs_2.builder.de('MultiSig', parsed.slice(1));
    let res = new Array(multisig.sigs.length);
    for (let i = 0; i < multisig.sigs.length; i++) {
        let s = multisig.sigs[i];
        let pk_index = as_indices(multisig.bitmap).at(i);
        let pk_bytes = Object.values(multisig.multisig_pk.pk_map[pk_index].pubKey)[0];
        const scheme = Object.keys(s)[0];
        if (scheme === 'MultiSig') {
            throw new Error('MultiSig is not supported inside MultiSig');
        }
        const SIGNATURE_SCHEME_TO_PUBLIC_KEY = {
            ED25519: publickey_1.Ed25519PublicKey,
            Secp256k1: publickey_2.Secp256k1PublicKey,
            Secp256r1: publickey_3.Secp256r1PublicKey,
        };
        const PublicKey = SIGNATURE_SCHEME_TO_PUBLIC_KEY[scheme];
        res[i] = {
            signatureScheme: scheme,
            signature: Uint8Array.from(Object.values(s)[0]),
            pubKey: new PublicKey(pk_bytes),
            weight: multisig.multisig_pk.pk_map[pk_index].weight,
        };
    }
    return res;
}
exports.decodeMultiSig = decodeMultiSig;
function toPkWeightPair(pair) {
    let pk_bytes = Array.from(pair.pubKey.toBytes().map((x) => Number(x)));
    switch (pair.pubKey.flag()) {
        case signature_1.SIGNATURE_SCHEME_TO_FLAG['Secp256k1']:
            return {
                pubKey: {
                    Secp256k1: pk_bytes,
                },
                weight: pair.weight,
            };
        case signature_1.SIGNATURE_SCHEME_TO_FLAG['Secp256r1']:
            return {
                pubKey: {
                    Secp256r1: pk_bytes,
                },
                weight: pair.weight,
            };
        case signature_1.SIGNATURE_SCHEME_TO_FLAG['ED25519']:
            return {
                pubKey: {
                    ED25519: pk_bytes,
                },
                weight: pair.weight,
            };
        default:
            throw new Error('Unsupported signature scheme');
    }
}
/// Convert u16 to Uint8Array of length 2 in little endian.
function to_uint8array(threshold) {
    if (threshold < 0 || threshold > 65535) {
        throw new Error('Invalid threshold');
    }
    let arr = new Uint8Array(2);
    arr[0] = threshold & 0xff;
    arr[1] = threshold >> 8;
    return arr;
}
function as_indices(bitmap) {
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
//# sourceMappingURL=multisig.js.map
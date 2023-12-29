"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.builder = exports.PROGRAMMABLE_CALL = exports.ARGUMENT = exports.TRANSACTION = exports.ENUM_KIND = exports.MULTISIG = exports.MULTISIG_PK_MAP = exports.MULTISIG_PUBLIC_KEY = exports.PUBLIC_KEY = exports.COMPRESSED_SIGNATURE = exports.TRANSACTION_INNER = exports.PROGRAMMABLE_CALL_INNER = exports.PROGRAMMABLE_TX_BLOCK = exports.OBJECT_ARG = exports.TYPE_TAG = exports.CALL_ARG = exports.OPTION = exports.VECTOR = exports.ARGUMENT_INNER = void 0;
const bcs_1 = require("@mysten/bcs");
const index_1 = require("../bcs/index");
const type_tag_serializer_1 = require("./type-tag-serializer");
const sui_types_1 = require("../utils/sui-types");
exports.ARGUMENT_INNER = 'Argument';
exports.VECTOR = 'vector';
exports.OPTION = 'Option';
exports.CALL_ARG = 'CallArg';
exports.TYPE_TAG = 'TypeTag';
exports.OBJECT_ARG = 'ObjectArg';
exports.PROGRAMMABLE_TX_BLOCK = 'ProgrammableTransaction';
exports.PROGRAMMABLE_CALL_INNER = 'ProgrammableMoveCall';
exports.TRANSACTION_INNER = 'Transaction';
exports.COMPRESSED_SIGNATURE = 'CompressedSignature';
exports.PUBLIC_KEY = 'PublicKey';
exports.MULTISIG_PUBLIC_KEY = 'MultiSigPublicKey';
exports.MULTISIG_PK_MAP = 'MultiSigPkMap';
exports.MULTISIG = 'MultiSig';
exports.ENUM_KIND = 'EnumKind';
/** Wrapper around transaction Enum to support `kind` matching in TS */
exports.TRANSACTION = [exports.ENUM_KIND, exports.TRANSACTION_INNER];
/** Wrapper around Argument Enum to support `kind` matching in TS */
exports.ARGUMENT = [exports.ENUM_KIND, exports.ARGUMENT_INNER];
/** Custom serializer for decoding package, module, function easier */
exports.PROGRAMMABLE_CALL = 'SimpleProgrammableMoveCall';
exports.builder = new bcs_1.BCS(index_1.bcs);
registerFixedArray(exports.builder, 'FixedArray[64]', 64);
registerFixedArray(exports.builder, 'FixedArray[33]', 33);
registerFixedArray(exports.builder, 'FixedArray[32]', 32);
exports.builder
    .registerStructType(exports.PROGRAMMABLE_TX_BLOCK, {
    inputs: [exports.VECTOR, exports.CALL_ARG],
    transactions: [exports.VECTOR, exports.TRANSACTION],
})
    .registerEnumType(exports.ARGUMENT_INNER, {
    GasCoin: null,
    Input: { index: bcs_1.BCS.U16 },
    Result: { index: bcs_1.BCS.U16 },
    NestedResult: { index: bcs_1.BCS.U16, resultIndex: bcs_1.BCS.U16 },
})
    .registerStructType(exports.PROGRAMMABLE_CALL_INNER, {
    package: bcs_1.BCS.ADDRESS,
    module: bcs_1.BCS.STRING,
    function: bcs_1.BCS.STRING,
    type_arguments: [exports.VECTOR, exports.TYPE_TAG],
    arguments: [exports.VECTOR, exports.ARGUMENT],
})
    // Keep this in sync with crates/sui-types/src/messages.rs
    .registerEnumType(exports.TRANSACTION_INNER, {
    /**
     * A Move Call - any public Move function can be called via
     * this transaction. The results can be used that instant to pass
     * into the next transaction.
     */
    MoveCall: exports.PROGRAMMABLE_CALL,
    /**
     * Transfer vector of objects to a receiver.
     */
    TransferObjects: {
        objects: [exports.VECTOR, exports.ARGUMENT],
        address: exports.ARGUMENT,
    },
    /**
     * Split `amount` from a `coin`.
     */
    SplitCoins: { coin: exports.ARGUMENT, amounts: [exports.VECTOR, exports.ARGUMENT] },
    /**
     * Merge Vector of Coins (`sources`) into a `destination`.
     */
    MergeCoins: { destination: exports.ARGUMENT, sources: [exports.VECTOR, exports.ARGUMENT] },
    /**
     * Publish a Move module.
     */
    Publish: {
        modules: [exports.VECTOR, [exports.VECTOR, bcs_1.BCS.U8]],
        dependencies: [exports.VECTOR, bcs_1.BCS.ADDRESS],
    },
    /**
     * Build a vector of objects using the input arguments.
     * It is impossible to construct a `vector<T: key>` otherwise,
     * so this call serves a utility function.
     */
    MakeMoveVec: {
        type: [exports.OPTION, exports.TYPE_TAG],
        objects: [exports.VECTOR, exports.ARGUMENT],
    },
    /**  */
    Upgrade: {
        modules: [exports.VECTOR, [exports.VECTOR, bcs_1.BCS.U8]],
        dependencies: [exports.VECTOR, bcs_1.BCS.ADDRESS],
        packageId: bcs_1.BCS.ADDRESS,
        ticket: exports.ARGUMENT,
    },
})
    .registerEnumType(exports.COMPRESSED_SIGNATURE, {
    ED25519: ['FixedArray[64]', 'u8'],
    Secp256k1: ['FixedArray[64]', 'u8'],
    Secp256r1: ['FixedArray[64]', 'u8'],
})
    .registerEnumType(exports.PUBLIC_KEY, {
    ED25519: ['FixedArray[32]', 'u8'],
    Secp256k1: ['FixedArray[33]', 'u8'],
    Secp256r1: ['FixedArray[33]', 'u8'],
})
    .registerStructType(exports.MULTISIG_PK_MAP, {
    pubKey: exports.PUBLIC_KEY,
    weight: bcs_1.BCS.U8,
})
    .registerStructType(exports.MULTISIG_PUBLIC_KEY, {
    pk_map: [exports.VECTOR, exports.MULTISIG_PK_MAP],
    threshold: bcs_1.BCS.U16,
})
    .registerStructType(exports.MULTISIG, {
    sigs: [exports.VECTOR, exports.COMPRESSED_SIGNATURE],
    bitmap: bcs_1.BCS.U16,
    multisig_pk: exports.MULTISIG_PUBLIC_KEY,
});
/**
 * Wrapper around Enum, which transforms any `T` into an object with `kind` property:
 * @example
 * ```
 * let bcsEnum = { TransferObjects: { objects: [], address: ... } }
 * // becomes
 * let translatedEnum = { kind: 'TransferObjects', objects: [], address: ... };
 * ```
 */
exports.builder.registerType([exports.ENUM_KIND, 'T'], function encode(writer, data, typeParams, typeMap) {
    const kind = data.kind;
    const invariant = { [kind]: data };
    const [enumType] = typeParams;
    return this.getTypeInterface(enumType)._encodeRaw.call(this, writer, invariant, typeParams, typeMap);
}, function decode(reader, typeParams, typeMap) {
    const [enumType] = typeParams;
    const data = this.getTypeInterface(enumType)._decodeRaw.call(this, reader, typeParams, typeMap);
    // enum invariant can only have one `key` field
    const kind = Object.keys(data)[0];
    return { kind, ...data[kind] };
}, (data) => {
    if (typeof data !== 'object' && !('kind' in data)) {
        throw new Error(`EnumKind: Missing property "kind" in the input ${JSON.stringify(data)}`);
    }
    return true;
});
/**
 * Custom deserializer for the ProgrammableCall.
 *
 * Hides the inner structure and gives a simpler, more convenient
 * interface to encode and decode this struct as a part of `TransactionData`.
 *
 * - `(package)::(module)::(function)` are now `target` property.
 * - `TypeTag[]` array is now passed as strings, not as a struct.
 */
exports.builder.registerType(exports.PROGRAMMABLE_CALL, function encodeProgrammableTx(writer, data, typeParams, typeMap) {
    const [pkg, module, fun] = data.target.split('::');
    const type_arguments = data.typeArguments.map((tag) => type_tag_serializer_1.TypeTagSerializer.parseFromStr(tag, true));
    return this.getTypeInterface(exports.PROGRAMMABLE_CALL_INNER)._encodeRaw.call(this, writer, {
        package: (0, sui_types_1.normalizeSuiAddress)(pkg),
        module,
        function: fun,
        type_arguments,
        arguments: data.arguments,
    }, typeParams, typeMap);
}, function decodeProgrammableTx(reader, typeParams, typeMap) {
    let data = exports.builder
        .getTypeInterface(exports.PROGRAMMABLE_CALL_INNER)
        ._decodeRaw.call(this, reader, typeParams, typeMap);
    return {
        target: [data.package, data.module, data.function].join('::'),
        arguments: data.arguments,
        typeArguments: data.type_arguments.map(type_tag_serializer_1.TypeTagSerializer.tagToString),
    };
}, 
// Validation callback to error out if the data format is invalid.
// TODO: make sure TypeTag can be parsed.
(data) => {
    return data.target.split('::').length === 3;
});
function registerFixedArray(bcs, name, length) {
    bcs.registerType(name, function encode(writer, data, typeParams, typeMap) {
        if (data.length !== length) {
            throw new Error(`Expected fixed array of length ${length}, got ${data.length}`);
        }
        if (typeParams.length !== 1) {
            throw new Error(`Expected one type parameter in a fixed array, got ${typeParams.length}`);
        }
        let [type] = typeof typeParams[0] === 'string' ? [typeParams[0], []] : typeParams[0];
        for (let piece of data) {
            this.getTypeInterface(type)._encodeRaw.call(this, writer, piece, typeParams, typeMap);
        }
        return writer;
    }, function decode(reader, typeParams, typeMap) {
        if (typeParams.length !== 1) {
            throw new Error(`Expected one type parameter in a fixed array, got ${typeParams.length}`);
        }
        let result = [];
        let [type] = typeof typeParams[0] === 'string' ? [typeParams[0], []] : typeParams[0];
        for (let i = 0; i < length; i++) {
            result.push(this.getTypeInterface(type)._decodeRaw.call(this, reader, typeParams, typeMap));
        }
        return result;
    });
}
//# sourceMappingURL=bcs.js.map
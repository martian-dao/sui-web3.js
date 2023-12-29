"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcs = exports.isPureArg = void 0;
const bcs_1 = require("@mysten/bcs");
function isPureArg(arg) {
    return arg.Pure !== undefined;
}
exports.isPureArg = isPureArg;
// Move name of the Vector type.
const VECTOR = 'vector';
const TransactionDataV1 = {
    kind: 'TransactionKind',
    sender: bcs_1.BCS.ADDRESS,
    gasData: 'GasData',
    expiration: 'TransactionExpiration',
};
const BCS_SPEC = {
    enums: {
        'Option<T>': {
            None: null,
            Some: 'T',
        },
        ObjectArg: {
            ImmOrOwned: 'SuiObjectRef',
            Shared: 'SharedObjectRef',
        },
        CallArg: {
            Pure: [VECTOR, bcs_1.BCS.U8],
            Object: 'ObjectArg',
            ObjVec: [VECTOR, 'ObjectArg'],
        },
        TypeTag: {
            bool: null,
            u8: null,
            u64: null,
            u128: null,
            address: null,
            signer: null,
            vector: 'TypeTag',
            struct: 'StructTag',
            u16: null,
            u32: null,
            u256: null,
        },
        TransactionKind: {
            // can not be called from sui.js; dummy placement
            // to set the enum counter right for ProgrammableTransact
            ProgrammableTransaction: 'ProgrammableTransaction',
            ChangeEpoch: null,
            Genesis: null,
            ConsensusCommitPrologue: null,
        },
        TransactionExpiration: {
            None: null,
            Epoch: 'unsafe_u64',
        },
        TransactionData: {
            V1: 'TransactionDataV1',
        },
    },
    structs: {
        SuiObjectRef: {
            objectId: bcs_1.BCS.ADDRESS,
            version: bcs_1.BCS.U64,
            digest: 'ObjectDigest',
        },
        SharedObjectRef: {
            objectId: bcs_1.BCS.ADDRESS,
            initialSharedVersion: bcs_1.BCS.U64,
            mutable: bcs_1.BCS.BOOL,
        },
        StructTag: {
            address: bcs_1.BCS.ADDRESS,
            module: bcs_1.BCS.STRING,
            name: bcs_1.BCS.STRING,
            typeParams: [VECTOR, 'TypeTag'],
        },
        GasData: {
            payment: [VECTOR, 'SuiObjectRef'],
            owner: bcs_1.BCS.ADDRESS,
            price: bcs_1.BCS.U64,
            budget: bcs_1.BCS.U64,
        },
        // Signed transaction data needed to generate transaction digest.
        SenderSignedData: {
            data: 'TransactionData',
            txSignatures: [VECTOR, [VECTOR, bcs_1.BCS.U8]],
        },
        TransactionDataV1,
    },
    aliases: {
        ObjectDigest: bcs_1.BCS.BASE58,
    },
};
const bcs = new bcs_1.BCS({ ...(0, bcs_1.getSuiMoveConfig)(), types: BCS_SPEC });
exports.bcs = bcs;
bcs.registerType('utf8string', (writer, str) => {
    const bytes = Array.from(new TextEncoder().encode(str));
    return writer.writeVec(bytes, (writer, el) => writer.write8(el));
}, (reader) => {
    let bytes = reader.readVec((reader) => reader.read8());
    return new TextDecoder().decode(new Uint8Array(bytes));
});
bcs.registerType('unsafe_u64', (writer, data) => writer.write64(data), (reader) => Number.parseInt(reader.read64(), 10));
//# sourceMappingURL=index.js.map
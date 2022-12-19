"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcs = exports.deserializeTransactionBytesToTransactionData = exports.TRANSACTION_DATA_TYPE_TAG = void 0;
const bcs_1 = require("@mysten/bcs");
const bcs = new bcs_1.BCS((0, bcs_1.getSuiMoveConfig)());
exports.bcs = bcs;
bcs
    .registerType('utf8string', (writer, str) => {
    const bytes = Array.from(new TextEncoder().encode(str));
    return writer.writeVec(bytes, (writer, el) => writer.write8(el));
}, (reader) => {
    let bytes = reader.readVec((reader) => reader.read8());
    return new TextDecoder().decode(new Uint8Array(bytes));
})
    .registerType('ObjectDigest', (writer, str) => {
    let bytes = Array.from((0, bcs_1.decodeStr)(str, 'base64'));
    return writer.writeVec(bytes, (writer, el) => writer.write8(el));
}, (reader) => {
    let bytes = reader.readVec((reader) => reader.read8());
    return (0, bcs_1.encodeStr)(new Uint8Array(bytes), 'base64');
});
bcs.registerStructType('SuiObjectRef', {
    objectId: 'address',
    version: 'u64',
    digest: 'ObjectDigest',
});
bcs.registerStructType('TransferObjectTx', {
    recipient: 'address',
    object_ref: 'SuiObjectRef',
});
bcs.registerStructType('PayTx', {
    coins: 'vector<SuiObjectRef>',
    recipients: 'vector<address>',
    amounts: 'vector<u64>',
});
bcs.registerStructType('PaySuiTx', {
    coins: 'vector<SuiObjectRef>',
    recipients: 'vector<address>',
    amounts: 'vector<u64>',
});
bcs.registerStructType('PayAllSuiTx', {
    coins: 'vector<SuiObjectRef>',
    recipient: 'address',
});
bcs.registerEnumType('Option<T>', {
    None: null,
    Some: 'T',
});
bcs.registerStructType('TransferSuiTx', {
    recipient: 'address',
    amount: 'Option<u64>',
});
bcs.registerStructType('PublishTx', {
    modules: 'vector<vector<u8>>',
});
bcs
    .registerStructType('SharedObjectRef', {
    objectId: 'address',
    initialSharedVersion: 'u64',
})
    .registerEnumType('ObjectArg', {
    ImmOrOwned: 'SuiObjectRef',
    Shared: 'SharedObjectRef',
})
    .registerEnumType('CallArg', {
    Pure: 'vector<u8>',
    Object: 'ObjectArg',
    ObjVec: 'vector<ObjectArg>',
});
bcs
    .registerEnumType('TypeTag', {
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
})
    .registerStructType('StructTag', {
    address: 'address',
    module: 'string',
    name: 'string',
    typeParams: 'vector<TypeTag>',
});
bcs.registerStructType('MoveCallTx', {
    package: 'SuiObjectRef',
    module: 'string',
    function: 'string',
    typeArguments: 'vector<TypeTag>',
    arguments: 'vector<CallArg>',
});
bcs.registerEnumType('Transaction', {
    TransferObject: 'TransferObjectTx',
    Publish: 'PublishTx',
    Call: 'MoveCallTx',
    TransferSui: 'TransferSuiTx',
    Pay: 'PayTx',
    PaySui: 'PaySuiTx',
    PayAllSui: 'PayAllSuiTx',
});
bcs.registerEnumType('TransactionKind', {
    Single: 'Transaction',
    Batch: 'vector<Transaction>',
});
bcs.registerStructType('TransactionData', {
    kind: 'TransactionKind',
    sender: 'address',
    gasPayment: 'SuiObjectRef',
    gasPrice: 'u64',
    gasBudget: 'u64',
});
exports.TRANSACTION_DATA_TYPE_TAG = Array.from('TransactionData::').map((e) => e.charCodeAt(0));
function deserializeTransactionBytesToTransactionData(useIntentSigning, bytes) {
    if (useIntentSigning) {
        return bcs.de('TransactionData', bytes.getData());
    }
    else {
        return bcs.de('TransactionData', bytes.getData().slice(exports.TRANSACTION_DATA_TYPE_TAG.length));
    }
}
exports.deserializeTransactionBytesToTransactionData = deserializeTransactionBytesToTransactionData;
/**
 * Signed transaction data needed to generate transaction digest.
 */
bcs.registerStructType('SenderSignedData', {
    data: 'TransactionData',
    txSignature: 'vector<u8>',
});
//# sourceMappingURL=sui-bcs.js.map
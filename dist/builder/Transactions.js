"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = exports.getTransactionType = exports.TransactionType = exports.UpgradeTransaction = exports.UpgradePolicy = exports.PublishTransaction = exports.MakeMoveVecTransaction = exports.MergeCoinsTransaction = exports.SplitCoinsTransaction = exports.TransferObjectsTransaction = exports.MoveCallTransaction = exports.PureTransactionArgument = exports.ObjectTransactionArgument = exports.TransactionArgument = exports.TransactionBlockInput = void 0;
const bcs_1 = require("@mysten/bcs");
const superstruct_1 = require("superstruct");
const utils_1 = require("./utils");
const type_tag_serializer_1 = require("./type-tag-serializer");
const sui_types_1 = require("../utils/sui-types");
const option = (some) => (0, superstruct_1.union)([
    (0, superstruct_1.object)({ None: (0, superstruct_1.union)([(0, superstruct_1.literal)(true), (0, superstruct_1.literal)(null)]) }),
    (0, superstruct_1.object)({ Some: some }),
]);
exports.TransactionBlockInput = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('Input'),
    index: (0, superstruct_1.integer)(),
    value: (0, superstruct_1.optional)((0, superstruct_1.any)()),
    type: (0, superstruct_1.optional)((0, superstruct_1.union)([(0, superstruct_1.literal)('pure'), (0, superstruct_1.literal)('object')])),
});
const TransactionArgumentTypes = [
    exports.TransactionBlockInput,
    (0, superstruct_1.object)({ kind: (0, superstruct_1.literal)('GasCoin') }),
    (0, superstruct_1.object)({ kind: (0, superstruct_1.literal)('Result'), index: (0, superstruct_1.integer)() }),
    (0, superstruct_1.object)({
        kind: (0, superstruct_1.literal)('NestedResult'),
        index: (0, superstruct_1.integer)(),
        resultIndex: (0, superstruct_1.integer)(),
    }),
];
// Generic transaction argument
exports.TransactionArgument = (0, superstruct_1.union)([...TransactionArgumentTypes]);
// Transaction argument referring to an object:
exports.ObjectTransactionArgument = (0, superstruct_1.union)([...TransactionArgumentTypes]);
exports.ObjectTransactionArgument[utils_1.TRANSACTION_TYPE] = {
    kind: 'object',
};
const PureTransactionArgument = (type) => {
    const struct = (0, superstruct_1.union)([...TransactionArgumentTypes]);
    struct[utils_1.TRANSACTION_TYPE] = {
        kind: 'pure',
        type,
    };
    return struct;
};
exports.PureTransactionArgument = PureTransactionArgument;
exports.MoveCallTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('MoveCall'),
    target: (0, superstruct_1.define)('target', (0, superstruct_1.string)().validator),
    typeArguments: (0, superstruct_1.array)((0, superstruct_1.string)()),
    arguments: (0, superstruct_1.array)(exports.TransactionArgument),
});
exports.TransferObjectsTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('TransferObjects'),
    objects: (0, superstruct_1.array)(exports.ObjectTransactionArgument),
    address: (0, exports.PureTransactionArgument)(bcs_1.BCS.ADDRESS),
});
exports.SplitCoinsTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('SplitCoins'),
    coin: exports.ObjectTransactionArgument,
    amounts: (0, superstruct_1.array)((0, exports.PureTransactionArgument)('u64')),
});
exports.MergeCoinsTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('MergeCoins'),
    destination: exports.ObjectTransactionArgument,
    sources: (0, superstruct_1.array)(exports.ObjectTransactionArgument),
});
exports.MakeMoveVecTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('MakeMoveVec'),
    // TODO: ideally we should use `TypeTag` instead of `record()` here,
    // but TypeTag is recursively defined and it's tricky to define a
    // recursive struct in superstruct
    type: (0, superstruct_1.optional)(option((0, superstruct_1.record)((0, superstruct_1.string)(), (0, superstruct_1.unknown)()))),
    objects: (0, superstruct_1.array)(exports.ObjectTransactionArgument),
});
exports.PublishTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('Publish'),
    modules: (0, superstruct_1.array)((0, superstruct_1.array)((0, superstruct_1.integer)())),
    dependencies: (0, superstruct_1.array)((0, superstruct_1.string)()),
});
// Keep in sync with constants in
// crates/sui-framework/packages/sui-framework/sources/package.move
var UpgradePolicy;
(function (UpgradePolicy) {
    UpgradePolicy[UpgradePolicy["COMPATIBLE"] = 0] = "COMPATIBLE";
    UpgradePolicy[UpgradePolicy["ADDITIVE"] = 128] = "ADDITIVE";
    UpgradePolicy[UpgradePolicy["DEP_ONLY"] = 192] = "DEP_ONLY";
})(UpgradePolicy || (exports.UpgradePolicy = UpgradePolicy = {}));
exports.UpgradeTransaction = (0, superstruct_1.object)({
    kind: (0, superstruct_1.literal)('Upgrade'),
    modules: (0, superstruct_1.array)((0, superstruct_1.array)((0, superstruct_1.integer)())),
    dependencies: (0, superstruct_1.array)((0, superstruct_1.string)()),
    packageId: (0, superstruct_1.string)(),
    ticket: exports.ObjectTransactionArgument,
});
const TransactionTypes = [
    exports.MoveCallTransaction,
    exports.TransferObjectsTransaction,
    exports.SplitCoinsTransaction,
    exports.MergeCoinsTransaction,
    exports.PublishTransaction,
    exports.UpgradeTransaction,
    exports.MakeMoveVecTransaction,
];
exports.TransactionType = (0, superstruct_1.union)([...TransactionTypes]);
function getTransactionType(data) {
    (0, superstruct_1.assert)(data, exports.TransactionType);
    return TransactionTypes.find((schema) => (0, superstruct_1.is)(data, schema));
}
exports.getTransactionType = getTransactionType;
/**
 * Simple helpers used to construct transactions:
 */
exports.Transactions = {
    MoveCall(input) {
        return (0, utils_1.create)({
            kind: 'MoveCall',
            target: input.target,
            arguments: input.arguments ?? [],
            typeArguments: input.typeArguments ?? [],
        }, exports.MoveCallTransaction);
    },
    TransferObjects(objects, address) {
        return (0, utils_1.create)({ kind: 'TransferObjects', objects, address }, exports.TransferObjectsTransaction);
    },
    SplitCoins(coin, amounts) {
        return (0, utils_1.create)({ kind: 'SplitCoins', coin, amounts }, exports.SplitCoinsTransaction);
    },
    MergeCoins(destination, sources) {
        return (0, utils_1.create)({ kind: 'MergeCoins', destination, sources }, exports.MergeCoinsTransaction);
    },
    Publish({ modules, dependencies, }) {
        return (0, utils_1.create)({
            kind: 'Publish',
            modules: modules.map((module) => typeof module === 'string' ? Array.from((0, bcs_1.fromB64)(module)) : module),
            dependencies: dependencies.map((dep) => (0, sui_types_1.normalizeSuiObjectId)(dep)),
        }, exports.PublishTransaction);
    },
    Upgrade({ modules, dependencies, packageId, ticket, }) {
        return (0, utils_1.create)({
            kind: 'Upgrade',
            modules: modules.map((module) => typeof module === 'string' ? Array.from((0, bcs_1.fromB64)(module)) : module),
            dependencies: dependencies.map((dep) => (0, sui_types_1.normalizeSuiObjectId)(dep)),
            packageId,
            ticket,
        }, exports.UpgradeTransaction);
    },
    MakeMoveVec({ type, objects, }) {
        return (0, utils_1.create)({
            kind: 'MakeMoveVec',
            type: type
                ? { Some: type_tag_serializer_1.TypeTagSerializer.parseFromStr(type) }
                : { None: null },
            objects,
        }, exports.MakeMoveVecTransaction);
    },
};
//# sourceMappingURL=Transactions.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolConfig = exports.SuiJsonValue = exports.ObjectOwner = exports.SequenceNumber = exports.SuiAddress = exports.ObjectId = exports.TransactionEventDigest = exports.TransactionEffectsDigest = exports.TransactionDigest = void 0;
const superstruct_1 = require("superstruct");
/** @deprecated Use `string` instead. */
exports.TransactionDigest = (0, superstruct_1.string)();
/** @deprecated Use `string` instead. */
exports.TransactionEffectsDigest = (0, superstruct_1.string)();
/** @deprecated Use `string` instead. */
exports.TransactionEventDigest = (0, superstruct_1.string)();
/** @deprecated Use `string` instead. */
exports.ObjectId = (0, superstruct_1.string)();
/** @deprecated Use `string` instead. */
exports.SuiAddress = (0, superstruct_1.string)();
/** @deprecated Use `string` instead. */
exports.SequenceNumber = (0, superstruct_1.string)();
exports.ObjectOwner = (0, superstruct_1.union)([
    (0, superstruct_1.object)({
        AddressOwner: (0, superstruct_1.string)(),
    }),
    (0, superstruct_1.object)({
        ObjectOwner: (0, superstruct_1.string)(),
    }),
    (0, superstruct_1.object)({
        Shared: (0, superstruct_1.object)({
            initial_shared_version: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
        }),
    }),
    (0, superstruct_1.literal)('Immutable'),
]);
exports.SuiJsonValue = (0, superstruct_1.define)('SuiJsonValue', () => true);
const ProtocolConfigValue = (0, superstruct_1.union)([
    (0, superstruct_1.object)({ u32: (0, superstruct_1.string)() }),
    (0, superstruct_1.object)({ u64: (0, superstruct_1.string)() }),
    (0, superstruct_1.object)({ f64: (0, superstruct_1.string)() }),
]);
exports.ProtocolConfig = (0, superstruct_1.object)({
    attributes: (0, superstruct_1.record)((0, superstruct_1.string)(), (0, superstruct_1.nullable)(ProtocolConfigValue)),
    featureFlags: (0, superstruct_1.record)((0, superstruct_1.string)(), (0, superstruct_1.boolean)()),
    maxSupportedProtocolVersion: (0, superstruct_1.string)(),
    minSupportedProtocolVersion: (0, superstruct_1.string)(),
    protocolVersion: (0, superstruct_1.string)(),
});
//# sourceMappingURL=common.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckpointPage = exports.Checkpoint = exports.ExecutionDigests = exports.EndOfEpochData = exports.ValidatorSignature = exports.CheckpointCommitment = exports.ECMHLiveObjectSetDigest = exports.CheckpointDigest = exports.CheckPointContentsDigest = exports.GasCostSummary = void 0;
const superstruct_1 = require("superstruct");
exports.GasCostSummary = (0, superstruct_1.object)({
    computationCost: (0, superstruct_1.string)(),
    storageCost: (0, superstruct_1.string)(),
    storageRebate: (0, superstruct_1.string)(),
    nonRefundableStorageFee: (0, superstruct_1.string)(),
});
/** @deprecated Use `string` instead. */
exports.CheckPointContentsDigest = (0, superstruct_1.string)();
/** @deprecated Use `string` instead. */
exports.CheckpointDigest = (0, superstruct_1.string)();
exports.ECMHLiveObjectSetDigest = (0, superstruct_1.object)({
    digest: (0, superstruct_1.array)((0, superstruct_1.number)()),
});
exports.CheckpointCommitment = (0, superstruct_1.any)();
/** @deprecated Use `string` instead. */
exports.ValidatorSignature = (0, superstruct_1.string)();
exports.EndOfEpochData = (0, superstruct_1.object)({
    nextEpochCommittee: (0, superstruct_1.array)((0, superstruct_1.tuple)([(0, superstruct_1.string)(), (0, superstruct_1.string)()])),
    nextEpochProtocolVersion: (0, superstruct_1.string)(),
    epochCommitments: (0, superstruct_1.array)(exports.CheckpointCommitment),
});
exports.ExecutionDigests = (0, superstruct_1.object)({
    transaction: (0, superstruct_1.string)(),
    effects: (0, superstruct_1.string)(),
});
exports.Checkpoint = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    sequenceNumber: (0, superstruct_1.string)(),
    digest: (0, superstruct_1.string)(),
    networkTotalTransactions: (0, superstruct_1.string)(),
    previousDigest: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    epochRollingGasCostSummary: exports.GasCostSummary,
    timestampMs: (0, superstruct_1.string)(),
    endOfEpochData: (0, superstruct_1.optional)(exports.EndOfEpochData),
    validatorSignature: (0, superstruct_1.string)(),
    transactions: (0, superstruct_1.array)((0, superstruct_1.string)()),
    checkpointCommitments: (0, superstruct_1.array)(exports.CheckpointCommitment),
});
exports.CheckpointPage = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)(exports.Checkpoint),
    nextCursor: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    hasNextPage: (0, superstruct_1.boolean)(),
});
//# sourceMappingURL=checkpoints.js.map
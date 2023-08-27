"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpochPage = exports.EpochInfo = exports.EndOfEpochInfo = void 0;
const superstruct_1 = require("superstruct");
const validator_1 = require("./validator");
exports.EndOfEpochInfo = (0, superstruct_1.object)({
    lastCheckpointId: (0, superstruct_1.string)(),
    epochEndTimestamp: (0, superstruct_1.string)(),
    protocolVersion: (0, superstruct_1.string)(),
    referenceGasPrice: (0, superstruct_1.string)(),
    totalStake: (0, superstruct_1.string)(),
    storageFundReinvestment: (0, superstruct_1.string)(),
    storageCharge: (0, superstruct_1.string)(),
    storageRebate: (0, superstruct_1.string)(),
    storageFundBalance: (0, superstruct_1.string)(),
    stakeSubsidyAmount: (0, superstruct_1.string)(),
    totalGasFees: (0, superstruct_1.string)(),
    totalStakeRewardsDistributed: (0, superstruct_1.string)(),
    leftoverStorageFundInflow: (0, superstruct_1.string)(),
});
exports.EpochInfo = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    validators: (0, superstruct_1.array)(validator_1.SuiValidatorSummary),
    epochTotalTransactions: (0, superstruct_1.string)(),
    firstCheckpointId: (0, superstruct_1.string)(),
    epochStartTimestamp: (0, superstruct_1.string)(),
    endOfEpochInfo: (0, superstruct_1.nullable)(exports.EndOfEpochInfo),
    referenceGasPrice: (0, superstruct_1.nullable)((0, superstruct_1.number)()),
});
exports.EpochPage = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)(exports.EpochInfo),
    nextCursor: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    hasNextPage: (0, superstruct_1.boolean)(),
});
//# sourceMappingURL=epochs.js.map
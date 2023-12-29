"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiSystemStateSummary = exports.SuiValidatorSummary = exports.CommitteeInfo = exports.Validators = exports.DelegationStakingPool = exports.DelegationStakingPoolFields = exports.Contents = exports.ContentsFieldsWithdraw = exports.ContentsFields = exports.SuiSupplyFields = exports.StakeSubsidy = exports.StakeSubsidyFields = exports.DelegatedStake = exports.StakeObject = exports.Balance = exports.ValidatorsApy = exports.Apy = void 0;
const superstruct_1 = require("superstruct");
// APY Response
exports.Apy = (0, superstruct_1.object)({
    apy: (0, superstruct_1.number)(),
    address: (0, superstruct_1.string)(),
});
exports.ValidatorsApy = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    apys: (0, superstruct_1.array)(exports.Apy),
});
// Staking
exports.Balance = (0, superstruct_1.object)({
    value: (0, superstruct_1.number)(),
});
exports.StakeObject = (0, superstruct_1.object)({
    stakedSuiId: (0, superstruct_1.string)(),
    stakeRequestEpoch: (0, superstruct_1.string)(),
    stakeActiveEpoch: (0, superstruct_1.string)(),
    principal: (0, superstruct_1.string)(),
    status: (0, superstruct_1.union)([(0, superstruct_1.literal)('Active'), (0, superstruct_1.literal)('Pending'), (0, superstruct_1.literal)('Unstaked')]),
    estimatedReward: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.DelegatedStake = (0, superstruct_1.object)({
    validatorAddress: (0, superstruct_1.string)(),
    stakingPool: (0, superstruct_1.string)(),
    stakes: (0, superstruct_1.array)(exports.StakeObject),
});
exports.StakeSubsidyFields = (0, superstruct_1.object)({
    balance: (0, superstruct_1.object)({ value: (0, superstruct_1.number)() }),
    distribution_counter: (0, superstruct_1.number)(),
    current_distribution_amount: (0, superstruct_1.number)(),
    stake_subsidy_period_length: (0, superstruct_1.number)(),
    stake_subsidy_decrease_rate: (0, superstruct_1.number)(),
});
exports.StakeSubsidy = (0, superstruct_1.object)({
    type: (0, superstruct_1.string)(),
    fields: exports.StakeSubsidyFields,
});
exports.SuiSupplyFields = (0, superstruct_1.object)({
    value: (0, superstruct_1.number)(),
});
exports.ContentsFields = (0, superstruct_1.object)({
    id: (0, superstruct_1.string)(),
    size: (0, superstruct_1.number)(),
    head: (0, superstruct_1.object)({ vec: (0, superstruct_1.array)() }),
    tail: (0, superstruct_1.object)({ vec: (0, superstruct_1.array)() }),
});
exports.ContentsFieldsWithdraw = (0, superstruct_1.object)({
    id: (0, superstruct_1.string)(),
    size: (0, superstruct_1.number)(),
});
exports.Contents = (0, superstruct_1.object)({
    type: (0, superstruct_1.string)(),
    fields: exports.ContentsFields,
});
exports.DelegationStakingPoolFields = (0, superstruct_1.object)({
    exchangeRates: (0, superstruct_1.object)({
        id: (0, superstruct_1.string)(),
        size: (0, superstruct_1.number)(),
    }),
    id: (0, superstruct_1.string)(),
    pendingStake: (0, superstruct_1.number)(),
    pendingPoolTokenWithdraw: (0, superstruct_1.number)(),
    pendingTotalSuiWithdraw: (0, superstruct_1.number)(),
    poolTokenBalance: (0, superstruct_1.number)(),
    rewardsPool: (0, superstruct_1.object)({ value: (0, superstruct_1.number)() }),
    activationEpoch: (0, superstruct_1.object)({ vec: (0, superstruct_1.array)() }),
    deactivationEpoch: (0, superstruct_1.object)({ vec: (0, superstruct_1.array)() }),
    suiBalance: (0, superstruct_1.number)(),
});
exports.DelegationStakingPool = (0, superstruct_1.object)({
    type: (0, superstruct_1.string)(),
    fields: exports.DelegationStakingPoolFields,
});
exports.Validators = (0, superstruct_1.array)((0, superstruct_1.tuple)([(0, superstruct_1.string)(), (0, superstruct_1.string)()]));
exports.CommitteeInfo = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    /** Array of (validator public key, stake unit) tuple */
    validators: exports.Validators,
});
exports.SuiValidatorSummary = (0, superstruct_1.object)({
    suiAddress: (0, superstruct_1.string)(),
    protocolPubkeyBytes: (0, superstruct_1.string)(),
    networkPubkeyBytes: (0, superstruct_1.string)(),
    workerPubkeyBytes: (0, superstruct_1.string)(),
    proofOfPossessionBytes: (0, superstruct_1.string)(),
    operationCapId: (0, superstruct_1.string)(),
    name: (0, superstruct_1.string)(),
    description: (0, superstruct_1.string)(),
    imageUrl: (0, superstruct_1.string)(),
    projectUrl: (0, superstruct_1.string)(),
    p2pAddress: (0, superstruct_1.string)(),
    netAddress: (0, superstruct_1.string)(),
    primaryAddress: (0, superstruct_1.string)(),
    workerAddress: (0, superstruct_1.string)(),
    nextEpochProtocolPubkeyBytes: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochProofOfPossession: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochNetworkPubkeyBytes: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochWorkerPubkeyBytes: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochNetAddress: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochP2pAddress: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochPrimaryAddress: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    nextEpochWorkerAddress: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    votingPower: (0, superstruct_1.string)(),
    gasPrice: (0, superstruct_1.string)(),
    commissionRate: (0, superstruct_1.string)(),
    nextEpochStake: (0, superstruct_1.string)(),
    nextEpochGasPrice: (0, superstruct_1.string)(),
    nextEpochCommissionRate: (0, superstruct_1.string)(),
    stakingPoolId: (0, superstruct_1.string)(),
    stakingPoolActivationEpoch: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    stakingPoolDeactivationEpoch: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    stakingPoolSuiBalance: (0, superstruct_1.string)(),
    rewardsPool: (0, superstruct_1.string)(),
    poolTokenBalance: (0, superstruct_1.string)(),
    pendingStake: (0, superstruct_1.string)(),
    pendingPoolTokenWithdraw: (0, superstruct_1.string)(),
    pendingTotalSuiWithdraw: (0, superstruct_1.string)(),
    exchangeRatesId: (0, superstruct_1.string)(),
    exchangeRatesSize: (0, superstruct_1.string)(),
});
exports.SuiSystemStateSummary = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    protocolVersion: (0, superstruct_1.string)(),
    systemStateVersion: (0, superstruct_1.string)(),
    storageFundTotalObjectStorageRebates: (0, superstruct_1.string)(),
    storageFundNonRefundableBalance: (0, superstruct_1.string)(),
    referenceGasPrice: (0, superstruct_1.string)(),
    safeMode: (0, superstruct_1.boolean)(),
    safeModeStorageRewards: (0, superstruct_1.string)(),
    safeModeComputationRewards: (0, superstruct_1.string)(),
    safeModeStorageRebates: (0, superstruct_1.string)(),
    safeModeNonRefundableStorageFee: (0, superstruct_1.string)(),
    epochStartTimestampMs: (0, superstruct_1.string)(),
    epochDurationMs: (0, superstruct_1.string)(),
    stakeSubsidyStartEpoch: (0, superstruct_1.string)(),
    maxValidatorCount: (0, superstruct_1.string)(),
    minValidatorJoiningStake: (0, superstruct_1.string)(),
    validatorLowStakeThreshold: (0, superstruct_1.string)(),
    validatorVeryLowStakeThreshold: (0, superstruct_1.string)(),
    validatorLowStakeGracePeriod: (0, superstruct_1.string)(),
    stakeSubsidyBalance: (0, superstruct_1.string)(),
    stakeSubsidyDistributionCounter: (0, superstruct_1.string)(),
    stakeSubsidyCurrentDistributionAmount: (0, superstruct_1.string)(),
    stakeSubsidyPeriodLength: (0, superstruct_1.string)(),
    stakeSubsidyDecreaseRate: (0, superstruct_1.number)(),
    totalStake: (0, superstruct_1.string)(),
    activeValidators: (0, superstruct_1.array)(exports.SuiValidatorSummary),
    pendingActiveValidatorsId: (0, superstruct_1.string)(),
    pendingActiveValidatorsSize: (0, superstruct_1.string)(),
    pendingRemovals: (0, superstruct_1.array)((0, superstruct_1.string)()),
    stakingPoolMappingsId: (0, superstruct_1.string)(),
    stakingPoolMappingsSize: (0, superstruct_1.string)(),
    inactivePoolsId: (0, superstruct_1.string)(),
    inactivePoolsSize: (0, superstruct_1.string)(),
    validatorCandidatesId: (0, superstruct_1.string)(),
    validatorCandidatesSize: (0, superstruct_1.string)(),
    atRiskValidators: (0, superstruct_1.array)((0, superstruct_1.tuple)([(0, superstruct_1.string)(), (0, superstruct_1.string)()])),
    validatorReportRecords: (0, superstruct_1.array)((0, superstruct_1.tuple)([(0, superstruct_1.string)(), (0, superstruct_1.array)((0, superstruct_1.string)())])),
});
//# sourceMappingURL=validator.js.map
import type { Infer } from 'superstruct';
export type DelegatedStake = Infer<typeof DelegatedStake>;
export type CommitteeInfo = Infer<typeof CommitteeInfo>;
export type StakeObject = Infer<typeof StakeObject>;
export declare const Apy: import("superstruct").Struct<{
    address: string;
    apy: number;
}, {
    apy: import("superstruct").Struct<number, null>;
    address: import("superstruct").Struct<string, null>;
}>;
export declare const ValidatorsApy: import("superstruct").Struct<{
    epoch: string;
    apys: {
        address: string;
        apy: number;
    }[];
}, {
    epoch: import("superstruct").Struct<string, null>;
    apys: import("superstruct").Struct<{
        address: string;
        apy: number;
    }[], import("superstruct").Struct<{
        address: string;
        apy: number;
    }, {
        apy: import("superstruct").Struct<number, null>;
        address: import("superstruct").Struct<string, null>;
    }>>;
}>;
export type ValidatorsApy = Infer<typeof ValidatorsApy>;
export declare const Balance: import("superstruct").Struct<{
    value: number;
}, {
    value: import("superstruct").Struct<number, null>;
}>;
export declare const StakeObject: import("superstruct").Struct<{
    status: "Active" | "Pending" | "Unstaked";
    stakedSuiId: string;
    stakeRequestEpoch: string;
    stakeActiveEpoch: string;
    principal: string;
    estimatedReward: string;
}, {
    stakedSuiId: import("superstruct").Struct<string, null>;
    stakeRequestEpoch: import("superstruct").Struct<string, null>;
    stakeActiveEpoch: import("superstruct").Struct<string, null>;
    principal: import("superstruct").Struct<string, null>;
    status: import("superstruct").Struct<"Active" | "Pending" | "Unstaked", null>;
    estimatedReward: import("superstruct").Struct<string, null>;
}>;
export declare const DelegatedStake: import("superstruct").Struct<{
    validatorAddress: string;
    stakingPool: string;
    stakes: {
        status: "Active" | "Pending" | "Unstaked";
        stakedSuiId: string;
        stakeRequestEpoch: string;
        stakeActiveEpoch: string;
        principal: string;
        estimatedReward: string;
    }[];
}, {
    validatorAddress: import("superstruct").Struct<string, null>;
    stakingPool: import("superstruct").Struct<string, null>;
    stakes: import("superstruct").Struct<{
        status: "Active" | "Pending" | "Unstaked";
        stakedSuiId: string;
        stakeRequestEpoch: string;
        stakeActiveEpoch: string;
        principal: string;
        estimatedReward: string;
    }[], import("superstruct").Struct<{
        status: "Active" | "Pending" | "Unstaked";
        stakedSuiId: string;
        stakeRequestEpoch: string;
        stakeActiveEpoch: string;
        principal: string;
        estimatedReward: string;
    }, {
        stakedSuiId: import("superstruct").Struct<string, null>;
        stakeRequestEpoch: import("superstruct").Struct<string, null>;
        stakeActiveEpoch: import("superstruct").Struct<string, null>;
        principal: import("superstruct").Struct<string, null>;
        status: import("superstruct").Struct<"Active" | "Pending" | "Unstaked", null>;
        estimatedReward: import("superstruct").Struct<string, null>;
    }>>;
}>;
export declare const StakeSubsidyFields: import("superstruct").Struct<{
    balance: {
        value: number;
    };
    distribution_counter: number;
    current_distribution_amount: number;
    stake_subsidy_period_length: number;
    stake_subsidy_decrease_rate: number;
}, {
    balance: import("superstruct").Struct<{
        value: number;
    }, {
        value: import("superstruct").Struct<number, null>;
    }>;
    distribution_counter: import("superstruct").Struct<number, null>;
    current_distribution_amount: import("superstruct").Struct<number, null>;
    stake_subsidy_period_length: import("superstruct").Struct<number, null>;
    stake_subsidy_decrease_rate: import("superstruct").Struct<number, null>;
}>;
export declare const StakeSubsidy: import("superstruct").Struct<{
    type: string;
    fields: {
        balance: {
            value: number;
        };
        distribution_counter: number;
        current_distribution_amount: number;
        stake_subsidy_period_length: number;
        stake_subsidy_decrease_rate: number;
    };
}, {
    type: import("superstruct").Struct<string, null>;
    fields: import("superstruct").Struct<{
        balance: {
            value: number;
        };
        distribution_counter: number;
        current_distribution_amount: number;
        stake_subsidy_period_length: number;
        stake_subsidy_decrease_rate: number;
    }, {
        balance: import("superstruct").Struct<{
            value: number;
        }, {
            value: import("superstruct").Struct<number, null>;
        }>;
        distribution_counter: import("superstruct").Struct<number, null>;
        current_distribution_amount: import("superstruct").Struct<number, null>;
        stake_subsidy_period_length: import("superstruct").Struct<number, null>;
        stake_subsidy_decrease_rate: import("superstruct").Struct<number, null>;
    }>;
}>;
export declare const SuiSupplyFields: import("superstruct").Struct<{
    value: number;
}, {
    value: import("superstruct").Struct<number, null>;
}>;
export declare const ContentsFields: import("superstruct").Struct<{
    size: number;
    id: string;
    head: {
        vec: unknown[];
    };
    tail: {
        vec: unknown[];
    };
}, {
    id: import("superstruct").Struct<string, null>;
    size: import("superstruct").Struct<number, null>;
    head: import("superstruct").Struct<{
        vec: unknown[];
    }, {
        vec: import("superstruct").Struct<unknown[], undefined>;
    }>;
    tail: import("superstruct").Struct<{
        vec: unknown[];
    }, {
        vec: import("superstruct").Struct<unknown[], undefined>;
    }>;
}>;
export declare const ContentsFieldsWithdraw: import("superstruct").Struct<{
    size: number;
    id: string;
}, {
    id: import("superstruct").Struct<string, null>;
    size: import("superstruct").Struct<number, null>;
}>;
export declare const Contents: import("superstruct").Struct<{
    type: string;
    fields: {
        size: number;
        id: string;
        head: {
            vec: unknown[];
        };
        tail: {
            vec: unknown[];
        };
    };
}, {
    type: import("superstruct").Struct<string, null>;
    fields: import("superstruct").Struct<{
        size: number;
        id: string;
        head: {
            vec: unknown[];
        };
        tail: {
            vec: unknown[];
        };
    }, {
        id: import("superstruct").Struct<string, null>;
        size: import("superstruct").Struct<number, null>;
        head: import("superstruct").Struct<{
            vec: unknown[];
        }, {
            vec: import("superstruct").Struct<unknown[], undefined>;
        }>;
        tail: import("superstruct").Struct<{
            vec: unknown[];
        }, {
            vec: import("superstruct").Struct<unknown[], undefined>;
        }>;
    }>;
}>;
export declare const DelegationStakingPoolFields: import("superstruct").Struct<{
    id: string;
    exchangeRates: {
        size: number;
        id: string;
    };
    pendingStake: number;
    pendingPoolTokenWithdraw: number;
    pendingTotalSuiWithdraw: number;
    poolTokenBalance: number;
    rewardsPool: {
        value: number;
    };
    activationEpoch: {
        vec: unknown[];
    };
    deactivationEpoch: {
        vec: unknown[];
    };
    suiBalance: number;
}, {
    exchangeRates: import("superstruct").Struct<{
        size: number;
        id: string;
    }, {
        id: import("superstruct").Struct<string, null>;
        size: import("superstruct").Struct<number, null>;
    }>;
    id: import("superstruct").Struct<string, null>;
    pendingStake: import("superstruct").Struct<number, null>;
    pendingPoolTokenWithdraw: import("superstruct").Struct<number, null>;
    pendingTotalSuiWithdraw: import("superstruct").Struct<number, null>;
    poolTokenBalance: import("superstruct").Struct<number, null>;
    rewardsPool: import("superstruct").Struct<{
        value: number;
    }, {
        value: import("superstruct").Struct<number, null>;
    }>;
    activationEpoch: import("superstruct").Struct<{
        vec: unknown[];
    }, {
        vec: import("superstruct").Struct<unknown[], undefined>;
    }>;
    deactivationEpoch: import("superstruct").Struct<{
        vec: unknown[];
    }, {
        vec: import("superstruct").Struct<unknown[], undefined>;
    }>;
    suiBalance: import("superstruct").Struct<number, null>;
}>;
export declare const DelegationStakingPool: import("superstruct").Struct<{
    type: string;
    fields: {
        id: string;
        exchangeRates: {
            size: number;
            id: string;
        };
        pendingStake: number;
        pendingPoolTokenWithdraw: number;
        pendingTotalSuiWithdraw: number;
        poolTokenBalance: number;
        rewardsPool: {
            value: number;
        };
        activationEpoch: {
            vec: unknown[];
        };
        deactivationEpoch: {
            vec: unknown[];
        };
        suiBalance: number;
    };
}, {
    type: import("superstruct").Struct<string, null>;
    fields: import("superstruct").Struct<{
        id: string;
        exchangeRates: {
            size: number;
            id: string;
        };
        pendingStake: number;
        pendingPoolTokenWithdraw: number;
        pendingTotalSuiWithdraw: number;
        poolTokenBalance: number;
        rewardsPool: {
            value: number;
        };
        activationEpoch: {
            vec: unknown[];
        };
        deactivationEpoch: {
            vec: unknown[];
        };
        suiBalance: number;
    }, {
        exchangeRates: import("superstruct").Struct<{
            size: number;
            id: string;
        }, {
            id: import("superstruct").Struct<string, null>;
            size: import("superstruct").Struct<number, null>;
        }>;
        id: import("superstruct").Struct<string, null>;
        pendingStake: import("superstruct").Struct<number, null>;
        pendingPoolTokenWithdraw: import("superstruct").Struct<number, null>;
        pendingTotalSuiWithdraw: import("superstruct").Struct<number, null>;
        poolTokenBalance: import("superstruct").Struct<number, null>;
        rewardsPool: import("superstruct").Struct<{
            value: number;
        }, {
            value: import("superstruct").Struct<number, null>;
        }>;
        activationEpoch: import("superstruct").Struct<{
            vec: unknown[];
        }, {
            vec: import("superstruct").Struct<unknown[], undefined>;
        }>;
        deactivationEpoch: import("superstruct").Struct<{
            vec: unknown[];
        }, {
            vec: import("superstruct").Struct<unknown[], undefined>;
        }>;
        suiBalance: import("superstruct").Struct<number, null>;
    }>;
}>;
export declare const Validators: import("superstruct").Struct<[string, string][], import("superstruct").Struct<[string, string], null>>;
export declare const CommitteeInfo: import("superstruct").Struct<{
    epoch: string;
    validators: [string, string][];
}, {
    epoch: import("superstruct").Struct<string, null>;
    /** Array of (validator public key, stake unit) tuple */
    validators: import("superstruct").Struct<[string, string][], import("superstruct").Struct<[string, string], null>>;
}>;
export declare const SuiValidatorSummary: import("superstruct").Struct<{
    name: string;
    description: string;
    pendingStake: string;
    pendingPoolTokenWithdraw: string;
    pendingTotalSuiWithdraw: string;
    poolTokenBalance: string;
    rewardsPool: string;
    suiAddress: string;
    protocolPubkeyBytes: string;
    networkPubkeyBytes: string;
    workerPubkeyBytes: string;
    proofOfPossessionBytes: string;
    operationCapId: string;
    imageUrl: string;
    projectUrl: string;
    p2pAddress: string;
    netAddress: string;
    primaryAddress: string;
    workerAddress: string;
    nextEpochProtocolPubkeyBytes: string;
    nextEpochProofOfPossession: string;
    nextEpochNetworkPubkeyBytes: string;
    nextEpochWorkerPubkeyBytes: string;
    nextEpochNetAddress: string;
    nextEpochP2pAddress: string;
    nextEpochPrimaryAddress: string;
    nextEpochWorkerAddress: string;
    votingPower: string;
    gasPrice: string;
    commissionRate: string;
    nextEpochStake: string;
    nextEpochGasPrice: string;
    nextEpochCommissionRate: string;
    stakingPoolId: string;
    stakingPoolActivationEpoch: string;
    stakingPoolDeactivationEpoch: string;
    stakingPoolSuiBalance: string;
    exchangeRatesId: string;
    exchangeRatesSize: string;
}, {
    suiAddress: import("superstruct").Struct<string, null>;
    protocolPubkeyBytes: import("superstruct").Struct<string, null>;
    networkPubkeyBytes: import("superstruct").Struct<string, null>;
    workerPubkeyBytes: import("superstruct").Struct<string, null>;
    proofOfPossessionBytes: import("superstruct").Struct<string, null>;
    operationCapId: import("superstruct").Struct<string, null>;
    name: import("superstruct").Struct<string, null>;
    description: import("superstruct").Struct<string, null>;
    imageUrl: import("superstruct").Struct<string, null>;
    projectUrl: import("superstruct").Struct<string, null>;
    p2pAddress: import("superstruct").Struct<string, null>;
    netAddress: import("superstruct").Struct<string, null>;
    primaryAddress: import("superstruct").Struct<string, null>;
    workerAddress: import("superstruct").Struct<string, null>;
    nextEpochProtocolPubkeyBytes: import("superstruct").Struct<string, null>;
    nextEpochProofOfPossession: import("superstruct").Struct<string, null>;
    nextEpochNetworkPubkeyBytes: import("superstruct").Struct<string, null>;
    nextEpochWorkerPubkeyBytes: import("superstruct").Struct<string, null>;
    nextEpochNetAddress: import("superstruct").Struct<string, null>;
    nextEpochP2pAddress: import("superstruct").Struct<string, null>;
    nextEpochPrimaryAddress: import("superstruct").Struct<string, null>;
    nextEpochWorkerAddress: import("superstruct").Struct<string, null>;
    votingPower: import("superstruct").Struct<string, null>;
    gasPrice: import("superstruct").Struct<string, null>;
    commissionRate: import("superstruct").Struct<string, null>;
    nextEpochStake: import("superstruct").Struct<string, null>;
    nextEpochGasPrice: import("superstruct").Struct<string, null>;
    nextEpochCommissionRate: import("superstruct").Struct<string, null>;
    stakingPoolId: import("superstruct").Struct<string, null>;
    stakingPoolActivationEpoch: import("superstruct").Struct<string, null>;
    stakingPoolDeactivationEpoch: import("superstruct").Struct<string, null>;
    stakingPoolSuiBalance: import("superstruct").Struct<string, null>;
    rewardsPool: import("superstruct").Struct<string, null>;
    poolTokenBalance: import("superstruct").Struct<string, null>;
    pendingStake: import("superstruct").Struct<string, null>;
    pendingPoolTokenWithdraw: import("superstruct").Struct<string, null>;
    pendingTotalSuiWithdraw: import("superstruct").Struct<string, null>;
    exchangeRatesId: import("superstruct").Struct<string, null>;
    exchangeRatesSize: import("superstruct").Struct<string, null>;
}>;
export type SuiValidatorSummary = Infer<typeof SuiValidatorSummary>;
export declare const SuiSystemStateSummary: import("superstruct").Struct<{
    protocolVersion: string;
    epoch: string;
    systemStateVersion: string;
    storageFundTotalObjectStorageRebates: string;
    storageFundNonRefundableBalance: string;
    referenceGasPrice: string;
    safeMode: boolean;
    safeModeStorageRewards: string;
    safeModeComputationRewards: string;
    safeModeStorageRebates: string;
    safeModeNonRefundableStorageFee: string;
    epochStartTimestampMs: string;
    epochDurationMs: string;
    stakeSubsidyStartEpoch: string;
    maxValidatorCount: string;
    minValidatorJoiningStake: string;
    validatorLowStakeThreshold: string;
    validatorVeryLowStakeThreshold: string;
    validatorLowStakeGracePeriod: string;
    stakeSubsidyBalance: string;
    stakeSubsidyDistributionCounter: string;
    stakeSubsidyCurrentDistributionAmount: string;
    stakeSubsidyPeriodLength: string;
    stakeSubsidyDecreaseRate: number;
    totalStake: string;
    activeValidators: {
        name: string;
        description: string;
        pendingStake: string;
        pendingPoolTokenWithdraw: string;
        pendingTotalSuiWithdraw: string;
        poolTokenBalance: string;
        rewardsPool: string;
        suiAddress: string;
        protocolPubkeyBytes: string;
        networkPubkeyBytes: string;
        workerPubkeyBytes: string;
        proofOfPossessionBytes: string;
        operationCapId: string;
        imageUrl: string;
        projectUrl: string;
        p2pAddress: string;
        netAddress: string;
        primaryAddress: string;
        workerAddress: string;
        nextEpochProtocolPubkeyBytes: string;
        nextEpochProofOfPossession: string;
        nextEpochNetworkPubkeyBytes: string;
        nextEpochWorkerPubkeyBytes: string;
        nextEpochNetAddress: string;
        nextEpochP2pAddress: string;
        nextEpochPrimaryAddress: string;
        nextEpochWorkerAddress: string;
        votingPower: string;
        gasPrice: string;
        commissionRate: string;
        nextEpochStake: string;
        nextEpochGasPrice: string;
        nextEpochCommissionRate: string;
        stakingPoolId: string;
        stakingPoolActivationEpoch: string;
        stakingPoolDeactivationEpoch: string;
        stakingPoolSuiBalance: string;
        exchangeRatesId: string;
        exchangeRatesSize: string;
    }[];
    pendingActiveValidatorsId: string;
    pendingActiveValidatorsSize: string;
    pendingRemovals: string[];
    stakingPoolMappingsId: string;
    stakingPoolMappingsSize: string;
    inactivePoolsId: string;
    inactivePoolsSize: string;
    validatorCandidatesId: string;
    validatorCandidatesSize: string;
    atRiskValidators: [string, string][];
    validatorReportRecords: [string, string[]][];
}, {
    epoch: import("superstruct").Struct<string, null>;
    protocolVersion: import("superstruct").Struct<string, null>;
    systemStateVersion: import("superstruct").Struct<string, null>;
    storageFundTotalObjectStorageRebates: import("superstruct").Struct<string, null>;
    storageFundNonRefundableBalance: import("superstruct").Struct<string, null>;
    referenceGasPrice: import("superstruct").Struct<string, null>;
    safeMode: import("superstruct").Struct<boolean, null>;
    safeModeStorageRewards: import("superstruct").Struct<string, null>;
    safeModeComputationRewards: import("superstruct").Struct<string, null>;
    safeModeStorageRebates: import("superstruct").Struct<string, null>;
    safeModeNonRefundableStorageFee: import("superstruct").Struct<string, null>;
    epochStartTimestampMs: import("superstruct").Struct<string, null>;
    epochDurationMs: import("superstruct").Struct<string, null>;
    stakeSubsidyStartEpoch: import("superstruct").Struct<string, null>;
    maxValidatorCount: import("superstruct").Struct<string, null>;
    minValidatorJoiningStake: import("superstruct").Struct<string, null>;
    validatorLowStakeThreshold: import("superstruct").Struct<string, null>;
    validatorVeryLowStakeThreshold: import("superstruct").Struct<string, null>;
    validatorLowStakeGracePeriod: import("superstruct").Struct<string, null>;
    stakeSubsidyBalance: import("superstruct").Struct<string, null>;
    stakeSubsidyDistributionCounter: import("superstruct").Struct<string, null>;
    stakeSubsidyCurrentDistributionAmount: import("superstruct").Struct<string, null>;
    stakeSubsidyPeriodLength: import("superstruct").Struct<string, null>;
    stakeSubsidyDecreaseRate: import("superstruct").Struct<number, null>;
    totalStake: import("superstruct").Struct<string, null>;
    activeValidators: import("superstruct").Struct<{
        name: string;
        description: string;
        pendingStake: string;
        pendingPoolTokenWithdraw: string;
        pendingTotalSuiWithdraw: string;
        poolTokenBalance: string;
        rewardsPool: string;
        suiAddress: string;
        protocolPubkeyBytes: string;
        networkPubkeyBytes: string;
        workerPubkeyBytes: string;
        proofOfPossessionBytes: string;
        operationCapId: string;
        imageUrl: string;
        projectUrl: string;
        p2pAddress: string;
        netAddress: string;
        primaryAddress: string;
        workerAddress: string;
        nextEpochProtocolPubkeyBytes: string;
        nextEpochProofOfPossession: string;
        nextEpochNetworkPubkeyBytes: string;
        nextEpochWorkerPubkeyBytes: string;
        nextEpochNetAddress: string;
        nextEpochP2pAddress: string;
        nextEpochPrimaryAddress: string;
        nextEpochWorkerAddress: string;
        votingPower: string;
        gasPrice: string;
        commissionRate: string;
        nextEpochStake: string;
        nextEpochGasPrice: string;
        nextEpochCommissionRate: string;
        stakingPoolId: string;
        stakingPoolActivationEpoch: string;
        stakingPoolDeactivationEpoch: string;
        stakingPoolSuiBalance: string;
        exchangeRatesId: string;
        exchangeRatesSize: string;
    }[], import("superstruct").Struct<{
        name: string;
        description: string;
        pendingStake: string;
        pendingPoolTokenWithdraw: string;
        pendingTotalSuiWithdraw: string;
        poolTokenBalance: string;
        rewardsPool: string;
        suiAddress: string;
        protocolPubkeyBytes: string;
        networkPubkeyBytes: string;
        workerPubkeyBytes: string;
        proofOfPossessionBytes: string;
        operationCapId: string;
        imageUrl: string;
        projectUrl: string;
        p2pAddress: string;
        netAddress: string;
        primaryAddress: string;
        workerAddress: string;
        nextEpochProtocolPubkeyBytes: string;
        nextEpochProofOfPossession: string;
        nextEpochNetworkPubkeyBytes: string;
        nextEpochWorkerPubkeyBytes: string;
        nextEpochNetAddress: string;
        nextEpochP2pAddress: string;
        nextEpochPrimaryAddress: string;
        nextEpochWorkerAddress: string;
        votingPower: string;
        gasPrice: string;
        commissionRate: string;
        nextEpochStake: string;
        nextEpochGasPrice: string;
        nextEpochCommissionRate: string;
        stakingPoolId: string;
        stakingPoolActivationEpoch: string;
        stakingPoolDeactivationEpoch: string;
        stakingPoolSuiBalance: string;
        exchangeRatesId: string;
        exchangeRatesSize: string;
    }, {
        suiAddress: import("superstruct").Struct<string, null>;
        protocolPubkeyBytes: import("superstruct").Struct<string, null>;
        networkPubkeyBytes: import("superstruct").Struct<string, null>;
        workerPubkeyBytes: import("superstruct").Struct<string, null>;
        proofOfPossessionBytes: import("superstruct").Struct<string, null>;
        operationCapId: import("superstruct").Struct<string, null>;
        name: import("superstruct").Struct<string, null>;
        description: import("superstruct").Struct<string, null>;
        imageUrl: import("superstruct").Struct<string, null>;
        projectUrl: import("superstruct").Struct<string, null>;
        p2pAddress: import("superstruct").Struct<string, null>;
        netAddress: import("superstruct").Struct<string, null>;
        primaryAddress: import("superstruct").Struct<string, null>;
        workerAddress: import("superstruct").Struct<string, null>;
        nextEpochProtocolPubkeyBytes: import("superstruct").Struct<string, null>;
        nextEpochProofOfPossession: import("superstruct").Struct<string, null>;
        nextEpochNetworkPubkeyBytes: import("superstruct").Struct<string, null>;
        nextEpochWorkerPubkeyBytes: import("superstruct").Struct<string, null>;
        nextEpochNetAddress: import("superstruct").Struct<string, null>;
        nextEpochP2pAddress: import("superstruct").Struct<string, null>;
        nextEpochPrimaryAddress: import("superstruct").Struct<string, null>;
        nextEpochWorkerAddress: import("superstruct").Struct<string, null>;
        votingPower: import("superstruct").Struct<string, null>;
        gasPrice: import("superstruct").Struct<string, null>;
        commissionRate: import("superstruct").Struct<string, null>;
        nextEpochStake: import("superstruct").Struct<string, null>;
        nextEpochGasPrice: import("superstruct").Struct<string, null>;
        nextEpochCommissionRate: import("superstruct").Struct<string, null>;
        stakingPoolId: import("superstruct").Struct<string, null>;
        stakingPoolActivationEpoch: import("superstruct").Struct<string, null>;
        stakingPoolDeactivationEpoch: import("superstruct").Struct<string, null>;
        stakingPoolSuiBalance: import("superstruct").Struct<string, null>;
        rewardsPool: import("superstruct").Struct<string, null>;
        poolTokenBalance: import("superstruct").Struct<string, null>;
        pendingStake: import("superstruct").Struct<string, null>;
        pendingPoolTokenWithdraw: import("superstruct").Struct<string, null>;
        pendingTotalSuiWithdraw: import("superstruct").Struct<string, null>;
        exchangeRatesId: import("superstruct").Struct<string, null>;
        exchangeRatesSize: import("superstruct").Struct<string, null>;
    }>>;
    pendingActiveValidatorsId: import("superstruct").Struct<string, null>;
    pendingActiveValidatorsSize: import("superstruct").Struct<string, null>;
    pendingRemovals: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    stakingPoolMappingsId: import("superstruct").Struct<string, null>;
    stakingPoolMappingsSize: import("superstruct").Struct<string, null>;
    inactivePoolsId: import("superstruct").Struct<string, null>;
    inactivePoolsSize: import("superstruct").Struct<string, null>;
    validatorCandidatesId: import("superstruct").Struct<string, null>;
    validatorCandidatesSize: import("superstruct").Struct<string, null>;
    atRiskValidators: import("superstruct").Struct<[string, string][], import("superstruct").Struct<[string, string], null>>;
    validatorReportRecords: import("superstruct").Struct<[string, string[]][], import("superstruct").Struct<[string, string[]], null>>;
}>;
export type SuiSystemStateSummary = Infer<typeof SuiSystemStateSummary>;
//# sourceMappingURL=validator.d.ts.map
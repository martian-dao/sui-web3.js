import type { Infer } from 'superstruct';
export declare const GasCostSummary: import("superstruct").Struct<{
    computationCost: string;
    storageCost: string;
    storageRebate: string;
    nonRefundableStorageFee: string;
}, {
    computationCost: import("superstruct").Struct<string, null>;
    storageCost: import("superstruct").Struct<string, null>;
    storageRebate: import("superstruct").Struct<string, null>;
    nonRefundableStorageFee: import("superstruct").Struct<string, null>;
}>;
export type GasCostSummary = Infer<typeof GasCostSummary>;
/** @deprecated Use `string` instead. */
export declare const CheckPointContentsDigest: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type CheckPointContentsDigest = Infer<typeof CheckPointContentsDigest>;
/** @deprecated Use `string` instead. */
export declare const CheckpointDigest: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type CheckpointDigest = Infer<typeof CheckpointDigest>;
export declare const ECMHLiveObjectSetDigest: import("superstruct").Struct<{
    digest: number[];
}, {
    digest: import("superstruct").Struct<number[], import("superstruct").Struct<number, null>>;
}>;
export type ECMHLiveObjectSetDigest = Infer<typeof ECMHLiveObjectSetDigest>;
export declare const CheckpointCommitment: import("superstruct").Struct<any, null>;
export type CheckpointCommitment = Infer<typeof CheckpointCommitment>;
/** @deprecated Use `string` instead. */
export declare const ValidatorSignature: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type ValidatorSignature = Infer<typeof ValidatorSignature>;
export declare const EndOfEpochData: import("superstruct").Struct<{
    nextEpochCommittee: [string, string][];
    nextEpochProtocolVersion: string;
    epochCommitments: any[];
}, {
    nextEpochCommittee: import("superstruct").Struct<[string, string][], import("superstruct").Struct<[string, string], null>>;
    nextEpochProtocolVersion: import("superstruct").Struct<string, null>;
    epochCommitments: import("superstruct").Struct<any[], import("superstruct").Struct<any, null>>;
}>;
export type EndOfEpochData = Infer<typeof EndOfEpochData>;
export declare const ExecutionDigests: import("superstruct").Struct<{
    transaction: string;
    effects: string;
}, {
    transaction: import("superstruct").Struct<string, null>;
    effects: import("superstruct").Struct<string, null>;
}>;
export declare const Checkpoint: import("superstruct").Struct<{
    timestampMs: string;
    epoch: string;
    digest: string;
    transactions: string[];
    sequenceNumber: string;
    networkTotalTransactions: string;
    previousDigest: string;
    epochRollingGasCostSummary: {
        computationCost: string;
        storageCost: string;
        storageRebate: string;
        nonRefundableStorageFee: string;
    };
    endOfEpochData: {
        nextEpochCommittee: [string, string][];
        nextEpochProtocolVersion: string;
        epochCommitments: any[];
    };
    validatorSignature: string;
    checkpointCommitments: any[];
}, {
    epoch: import("superstruct").Struct<string, null>;
    sequenceNumber: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
    networkTotalTransactions: import("superstruct").Struct<string, null>;
    previousDigest: import("superstruct").Struct<string, null>;
    epochRollingGasCostSummary: import("superstruct").Struct<{
        computationCost: string;
        storageCost: string;
        storageRebate: string;
        nonRefundableStorageFee: string;
    }, {
        computationCost: import("superstruct").Struct<string, null>;
        storageCost: import("superstruct").Struct<string, null>;
        storageRebate: import("superstruct").Struct<string, null>;
        nonRefundableStorageFee: import("superstruct").Struct<string, null>;
    }>;
    timestampMs: import("superstruct").Struct<string, null>;
    endOfEpochData: import("superstruct").Struct<{
        nextEpochCommittee: [string, string][];
        nextEpochProtocolVersion: string;
        epochCommitments: any[];
    }, {
        nextEpochCommittee: import("superstruct").Struct<[string, string][], import("superstruct").Struct<[string, string], null>>;
        nextEpochProtocolVersion: import("superstruct").Struct<string, null>;
        epochCommitments: import("superstruct").Struct<any[], import("superstruct").Struct<any, null>>;
    }>;
    validatorSignature: import("superstruct").Struct<string, null>;
    transactions: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    checkpointCommitments: import("superstruct").Struct<any[], import("superstruct").Struct<any, null>>;
}>;
export type Checkpoint = Infer<typeof Checkpoint>;
export declare const CheckpointPage: import("superstruct").Struct<{
    data: {
        timestampMs: string;
        epoch: string;
        digest: string;
        transactions: string[];
        sequenceNumber: string;
        networkTotalTransactions: string;
        previousDigest: string;
        epochRollingGasCostSummary: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        endOfEpochData: {
            nextEpochCommittee: [string, string][];
            nextEpochProtocolVersion: string;
            epochCommitments: any[];
        };
        validatorSignature: string;
        checkpointCommitments: any[];
    }[];
    nextCursor: string;
    hasNextPage: boolean;
}, {
    data: import("superstruct").Struct<{
        timestampMs: string;
        epoch: string;
        digest: string;
        transactions: string[];
        sequenceNumber: string;
        networkTotalTransactions: string;
        previousDigest: string;
        epochRollingGasCostSummary: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        endOfEpochData: {
            nextEpochCommittee: [string, string][];
            nextEpochProtocolVersion: string;
            epochCommitments: any[];
        };
        validatorSignature: string;
        checkpointCommitments: any[];
    }[], import("superstruct").Struct<{
        timestampMs: string;
        epoch: string;
        digest: string;
        transactions: string[];
        sequenceNumber: string;
        networkTotalTransactions: string;
        previousDigest: string;
        epochRollingGasCostSummary: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        endOfEpochData: {
            nextEpochCommittee: [string, string][];
            nextEpochProtocolVersion: string;
            epochCommitments: any[];
        };
        validatorSignature: string;
        checkpointCommitments: any[];
    }, {
        epoch: import("superstruct").Struct<string, null>;
        sequenceNumber: import("superstruct").Struct<string, null>;
        digest: import("superstruct").Struct<string, null>;
        networkTotalTransactions: import("superstruct").Struct<string, null>;
        previousDigest: import("superstruct").Struct<string, null>;
        epochRollingGasCostSummary: import("superstruct").Struct<{
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        }, {
            computationCost: import("superstruct").Struct<string, null>;
            storageCost: import("superstruct").Struct<string, null>;
            storageRebate: import("superstruct").Struct<string, null>;
            nonRefundableStorageFee: import("superstruct").Struct<string, null>;
        }>;
        timestampMs: import("superstruct").Struct<string, null>;
        endOfEpochData: import("superstruct").Struct<{
            nextEpochCommittee: [string, string][];
            nextEpochProtocolVersion: string;
            epochCommitments: any[];
        }, {
            nextEpochCommittee: import("superstruct").Struct<[string, string][], import("superstruct").Struct<[string, string], null>>;
            nextEpochProtocolVersion: import("superstruct").Struct<string, null>;
            epochCommitments: import("superstruct").Struct<any[], import("superstruct").Struct<any, null>>;
        }>;
        validatorSignature: import("superstruct").Struct<string, null>;
        transactions: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
        checkpointCommitments: import("superstruct").Struct<any[], import("superstruct").Struct<any, null>>;
    }>>;
    nextCursor: import("superstruct").Struct<string, null>;
    hasNextPage: import("superstruct").Struct<boolean, null>;
}>;
export type CheckpointPage = Infer<typeof CheckpointPage>;
//# sourceMappingURL=checkpoints.d.ts.map
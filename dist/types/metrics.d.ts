export declare const NetworkMetrics: import("superstruct").Struct<{
    currentTps: number;
    tps30Days: number;
    currentCheckpoint: string;
    currentEpoch: string;
    totalAddresses: string;
    totalObjects: string;
    totalPackages: string;
}, {
    currentTps: import("superstruct").Struct<number, null>;
    tps30Days: import("superstruct").Struct<number, null>;
    currentCheckpoint: import("superstruct").Struct<string, null>;
    currentEpoch: import("superstruct").Struct<string, null>;
    totalAddresses: import("superstruct").Struct<string, null>;
    totalObjects: import("superstruct").Struct<string, null>;
    totalPackages: import("superstruct").Struct<string, null>;
}>;
export type NetworkMetrics = typeof NetworkMetrics.TYPE;
export declare const AddressMetrics: import("superstruct").Struct<{
    timestampMs: number;
    epoch: number;
    checkpoint: number;
    cumulativeAddresses: number;
    cumulativeActiveAddresses: number;
    dailyActiveAddresses: number;
}, {
    checkpoint: import("superstruct").Struct<number, null>;
    epoch: import("superstruct").Struct<number, null>;
    timestampMs: import("superstruct").Struct<number, null>;
    cumulativeAddresses: import("superstruct").Struct<number, null>;
    cumulativeActiveAddresses: import("superstruct").Struct<number, null>;
    dailyActiveAddresses: import("superstruct").Struct<number, null>;
}>;
export type AddressMetrics = typeof AddressMetrics.TYPE;
export declare const AllEpochsAddressMetrics: import("superstruct").Struct<{
    timestampMs: number;
    epoch: number;
    checkpoint: number;
    cumulativeAddresses: number;
    cumulativeActiveAddresses: number;
    dailyActiveAddresses: number;
}[], import("superstruct").Struct<{
    timestampMs: number;
    epoch: number;
    checkpoint: number;
    cumulativeAddresses: number;
    cumulativeActiveAddresses: number;
    dailyActiveAddresses: number;
}, {
    checkpoint: import("superstruct").Struct<number, null>;
    epoch: import("superstruct").Struct<number, null>;
    timestampMs: import("superstruct").Struct<number, null>;
    cumulativeAddresses: import("superstruct").Struct<number, null>;
    cumulativeActiveAddresses: import("superstruct").Struct<number, null>;
    dailyActiveAddresses: import("superstruct").Struct<number, null>;
}>>;
export type AllEpochsAddressMetrics = typeof AllEpochsAddressMetrics.TYPE;
//# sourceMappingURL=metrics.d.ts.map
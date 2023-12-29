"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEpochsAddressMetrics = exports.AddressMetrics = exports.NetworkMetrics = void 0;
const superstruct_1 = require("superstruct");
exports.NetworkMetrics = (0, superstruct_1.object)({
    currentTps: (0, superstruct_1.number)(),
    tps30Days: (0, superstruct_1.number)(),
    currentCheckpoint: (0, superstruct_1.string)(),
    currentEpoch: (0, superstruct_1.string)(),
    totalAddresses: (0, superstruct_1.string)(),
    totalObjects: (0, superstruct_1.string)(),
    totalPackages: (0, superstruct_1.string)(),
});
exports.AddressMetrics = (0, superstruct_1.object)({
    checkpoint: (0, superstruct_1.number)(),
    epoch: (0, superstruct_1.number)(),
    timestampMs: (0, superstruct_1.number)(),
    cumulativeAddresses: (0, superstruct_1.number)(),
    cumulativeActiveAddresses: (0, superstruct_1.number)(),
    dailyActiveAddresses: (0, superstruct_1.number)(),
});
exports.AllEpochsAddressMetrics = (0, superstruct_1.array)(exports.AddressMetrics);
//# sourceMappingURL=metrics.js.map
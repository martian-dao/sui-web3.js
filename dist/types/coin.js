"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSupply = exports.CoinBalance = exports.PaginatedCoins = exports.CoinStruct = void 0;
const superstruct_1 = require("superstruct");
exports.CoinStruct = (0, superstruct_1.object)({
    coinType: (0, superstruct_1.string)(),
    // TODO(chris): rename this to objectId
    coinObjectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
    digest: (0, superstruct_1.string)(),
    balance: (0, superstruct_1.string)(),
    previousTransaction: (0, superstruct_1.string)(),
});
exports.PaginatedCoins = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)(exports.CoinStruct),
    nextCursor: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    hasNextPage: (0, superstruct_1.boolean)(),
});
exports.CoinBalance = (0, superstruct_1.object)({
    coinType: (0, superstruct_1.string)(),
    coinObjectCount: (0, superstruct_1.number)(),
    totalBalance: (0, superstruct_1.string)(),
    lockedBalance: (0, superstruct_1.object)({
        epochId: (0, superstruct_1.optional)((0, superstruct_1.number)()),
        number: (0, superstruct_1.optional)((0, superstruct_1.number)()),
    }),
});
exports.CoinSupply = (0, superstruct_1.object)({
    value: (0, superstruct_1.string)(),
});
//# sourceMappingURL=coin.js.map
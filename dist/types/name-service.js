"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedNameServiceNames = void 0;
const superstruct_1 = require("superstruct");
exports.ResolvedNameServiceNames = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)((0, superstruct_1.string)()),
    hasNextPage: (0, superstruct_1.boolean)(),
    nextCursor: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
});
//# sourceMappingURL=name-service.js.map
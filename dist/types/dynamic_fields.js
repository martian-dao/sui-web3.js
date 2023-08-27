"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicFieldPage = exports.DynamicFieldInfo = exports.DynamicFieldName = exports.DynamicFieldType = void 0;
const superstruct_1 = require("superstruct");
exports.DynamicFieldType = (0, superstruct_1.union)([(0, superstruct_1.literal)('DynamicField'), (0, superstruct_1.literal)('DynamicObject')]);
exports.DynamicFieldName = (0, superstruct_1.object)({
    type: (0, superstruct_1.string)(),
    value: (0, superstruct_1.any)(),
});
exports.DynamicFieldInfo = (0, superstruct_1.object)({
    name: exports.DynamicFieldName,
    bcsName: (0, superstruct_1.string)(),
    type: exports.DynamicFieldType,
    objectType: (0, superstruct_1.string)(),
    objectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.number)(),
    digest: (0, superstruct_1.string)(),
});
exports.DynamicFieldPage = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)(exports.DynamicFieldInfo),
    nextCursor: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    hasNextPage: (0, superstruct_1.boolean)(),
});
//# sourceMappingURL=dynamic_fields.js.map
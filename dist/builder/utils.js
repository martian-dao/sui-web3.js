"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSACTION_TYPE = exports.create = void 0;
const superstruct_1 = require("superstruct");
function create(value, struct) {
    return (0, superstruct_1.create)(value, struct);
}
exports.create = create;
exports.TRANSACTION_TYPE = Symbol('transaction-argument-type');
//# sourceMappingURL=utils.js.map
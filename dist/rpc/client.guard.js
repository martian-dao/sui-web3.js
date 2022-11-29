"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorResponse = exports.isValidResponse = exports.isRpcParams = exports.isHttpHeaders = void 0;
function isHttpHeaders(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function"));
}
exports.isHttpHeaders = isHttpHeaders;
function isRpcParams(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        typeof obj.method === "string" &&
        Array.isArray(obj.args));
}
exports.isRpcParams = isRpcParams;
function isValidResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        obj.jsonrpc === "2.0" &&
        typeof obj.id === "string");
}
exports.isValidResponse = isValidResponse;
function isErrorResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        obj.jsonrpc === "2.0" &&
        typeof obj.id === "string" &&
        (obj.error !== null &&
            typeof obj.error === "object" ||
            typeof obj.error === "function") &&
        typeof obj.error.message === "string");
}
exports.isErrorResponse = isErrorResponse;
//# sourceMappingURL=client.guard.js.map
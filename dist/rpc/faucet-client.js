"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSuiFromFaucet = exports.FaucetRateLimitError = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class FaucetRateLimitError extends Error {
}
exports.FaucetRateLimitError = FaucetRateLimitError;
async function requestSuiFromFaucet(endpoint, recipient, httpHeaders) {
    const res = await (0, cross_fetch_1.default)(endpoint, {
        method: 'POST',
        body: JSON.stringify({
            FixedAmountRequest: {
                recipient,
            },
        }),
        headers: {
            'Content-Type': 'application/json',
            ...(httpHeaders || {}),
        },
    });
    if (res.status === 429) {
        throw new FaucetRateLimitError(`Too many requests from this client have been sent to the faucet. Please retry later`);
    }
    let parsed;
    try {
        parsed = await res.json();
    }
    catch (e) {
        throw new Error(`Ecountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`);
    }
    if (parsed.error) {
        throw new Error(`Faucet returns error: ${parsed.error}`);
    }
    return parsed;
}
exports.requestSuiFromFaucet = requestSuiFromFaucet;
//# sourceMappingURL=faucet-client.js.map
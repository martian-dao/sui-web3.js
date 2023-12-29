"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaucetHost = exports.getFaucetRequestStatus = exports.requestSuiFromFaucetV1 = exports.requestSuiFromFaucetV0 = exports.FaucetRateLimitError = void 0;
class FaucetRateLimitError extends Error {
}
exports.FaucetRateLimitError = FaucetRateLimitError;
async function faucetRequest(host, path, body, headers) {
    const endpoint = new URL(path, host).toString();
    const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {}),
        },
    });
    if (res.status === 429) {
        throw new FaucetRateLimitError(`Too many requests from this client have been sent to the faucet. Please retry later`);
    }
    try {
        const parsed = await res.json();
        if (parsed.error) {
            throw new Error(`Faucet returns error: ${parsed.error}`);
        }
        return parsed;
    }
    catch (e) {
        throw new Error(`Encountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`);
    }
}
async function requestSuiFromFaucetV0(input) {
    return faucetRequest(input.host, '/gas', {
        FixedAmountRequest: {
            recipient: input.recipient,
        },
    }, input.headers);
}
exports.requestSuiFromFaucetV0 = requestSuiFromFaucetV0;
async function requestSuiFromFaucetV1(input) {
    return faucetRequest(input.host, '/v1/gas', {
        FixedAmountRequest: {
            recipient: input.recipient,
        },
    }, input.headers);
}
exports.requestSuiFromFaucetV1 = requestSuiFromFaucetV1;
async function getFaucetRequestStatus(input) {
    return faucetRequest(input.host, '/v1/status', {
        task_id: {
            task_id: input.taskId,
        },
    }, input.headers);
}
exports.getFaucetRequestStatus = getFaucetRequestStatus;
function getFaucetHost(network) {
    switch (network) {
        case 'testnet':
            return 'https://faucet.testnet.sui.io';
        case 'devnet':
            return 'https://faucet.devnet.sui.io';
        case 'localnet':
            return 'http://127.0.0.1:9123';
        default:
            throw new Error(`Unknown network: ${network}`);
    }
}
exports.getFaucetHost = getFaucetHost;
//# sourceMappingURL=index.js.map
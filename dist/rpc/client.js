"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcClient = void 0;
const index_js_1 = __importDefault(require("jayson/lib/client/browser/index.js"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const client_guard_1 = require("./client.guard");
const LosslessJSON = __importStar(require("lossless-json"));
const TYPE_MISMATCH_ERROR = `The response returned from RPC server does not match ` +
    `the TypeScript definition. This is likely because the SDK version is not ` +
    `compatible with the RPC server. Please update your SDK version to the latest. `;
class JsonRpcClient {
    constructor(url, httpHeaders) {
        this.rpcClient = this.createRpcClient(url, httpHeaders);
    }
    createRpcClient(url, httpHeaders) {
        const client = new index_js_1.default(async (request, callback) => {
            const options = {
                method: 'POST',
                body: request,
                headers: Object.assign({
                    'Content-Type': 'application/json',
                }, httpHeaders || {}),
            };
            try {
                let res = await (0, isomorphic_fetch_1.default)(url, options);
                const text = await res.text();
                let result;
                // wrapping this with try/catch because LosslessJSON
                // returns error when parsing some struct.
                // TODO: remove the usage of LosslessJSON once
                // https://github.com/MystenLabs/sui/issues/2328 is done
                try {
                    result = JSON.stringify(LosslessJSON.parse(text, (key, value) => {
                        if (value == null) {
                            return value;
                        }
                        // TODO: This is a bad hack, we really shouldn't be doing this here:
                        if (key === 'balance' && typeof value === 'number') {
                            return value.toString();
                        }
                        try {
                            if (value.isLosslessNumber)
                                return value.valueOf();
                        }
                        catch {
                            return value.toString();
                        }
                        return value;
                    }));
                }
                catch (e) {
                    result = text;
                }
                if (res.ok) {
                    callback(null, result);
                }
                else {
                    callback(new Error(`${res.status} ${res.statusText}: ${text}`));
                }
            }
            catch (err) {
                if (err instanceof Error)
                    callback(err);
            }
        }, {});
        return client;
    }
    async requestWithType(method, args, isT, skipDataValidation = false) {
        const response = await this.request(method, args);
        if ((0, client_guard_1.isErrorResponse)(response)) {
            throw new Error(`RPC Error: ${response.error.message}`);
        }
        else if ((0, client_guard_1.isValidResponse)(response)) {
            const expectedSchema = isT(response.result);
            const errMsg = TYPE_MISMATCH_ERROR +
                `Result received was: ${JSON.stringify(response.result)}`;
            if (skipDataValidation && !expectedSchema) {
                console.warn(errMsg);
                return response.result;
            }
            else if (!expectedSchema) {
                throw new Error(`RPC Error: ${errMsg}`);
            }
            return response.result;
        }
        throw new Error(`Unexpected RPC Response: ${response}`);
    }
    async request(method, args) {
        return new Promise((resolve, reject) => {
            this.rpcClient.request(method, args, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(response);
            });
        });
    }
    async batchRequestWithType(requests, isT, skipDataValidation = false) {
        const responses = await this.batchRequest(requests);
        // TODO: supports other error modes such as throw or return
        const validResponses = responses.filter((response) => (0, client_guard_1.isValidResponse)(response) &&
            (skipDataValidation || isT(response.result)));
        if (responses.length > validResponses.length) {
            console.warn(`Batch request contains invalid responses. ${responses.length - validResponses.length} of the ${responses.length} requests has invalid schema.`);
            const exampleTypeMismatch = responses.find((r) => !isT(r.result));
            const exampleInvalidResponseIndex = responses.findIndex((r) => !(0, client_guard_1.isValidResponse)(r));
            if (exampleTypeMismatch) {
                console.warn(TYPE_MISMATCH_ERROR +
                    `One example mismatch is: ${JSON.stringify(exampleTypeMismatch.result)}`);
            }
            if (exampleInvalidResponseIndex !== -1) {
                console.warn(`The request ${JSON.stringify(requests[exampleInvalidResponseIndex])} within a batch request returns an invalid response ${JSON.stringify(responses[exampleInvalidResponseIndex])}`);
            }
        }
        return validResponses.map((response) => response.result);
    }
    async batchRequest(requests) {
        return new Promise((resolve, reject) => {
            // Do nothing if requests is empty
            if (requests.length === 0)
                resolve([]);
            const batch = requests.map((params) => {
                return this.rpcClient.request(params.method, params.args);
            });
            this.rpcClient.request(batch, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(response);
            });
        });
    }
}
exports.JsonRpcClient = JsonRpcClient;
//# sourceMappingURL=client.js.map
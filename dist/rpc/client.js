"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcClient = void 0;
const client_js_1 = require("@open-rpc/client-js");
const superstruct_1 = require("superstruct");
const version_1 = require("../version");
const errors_1 = require("./errors");
class JsonRpcClient {
    constructor(url, httpHeaders) {
        const transport = new client_js_1.HTTPTransport(url, {
            headers: {
                'Content-Type': 'application/json',
                'Client-Sdk-Type': 'typescript',
                'Client-Sdk-Version': version_1.PACKAGE_VERSION,
                'Client-Target-Api-Version': version_1.TARGETED_RPC_VERSION,
                ...httpHeaders,
            },
        });
        this.rpcClient = new client_js_1.Client(new client_js_1.RequestManager([transport]));
    }
    async requestWithType(method, args, struct) {
        const req = { method, args };
        const response = await this.request(method, args);
        if (process.env.NODE_ENV === 'test') {
            const [err] = (0, superstruct_1.validate)(response, struct);
            if (err) {
                throw new errors_1.RPCValidationError({
                    req,
                    result: response,
                    cause: err,
                });
            }
        }
        return response;
    }
    async request(method, params) {
        return await this.rpcClient.request({ method, params });
    }
}
exports.JsonRpcClient = JsonRpcClient;
//# sourceMappingURL=client.js.map
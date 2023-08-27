"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiHTTPTransport = void 0;
const client_js_1 = require("@open-rpc/client-js");
const version_1 = require("../version");
const websocket_client_1 = require("../rpc/websocket-client");
class SuiHTTPTransport {
    constructor({ url, websocket: { url: websocketUrl, ...websocketOptions } = {}, rpc, }) {
        const transport = new client_js_1.HTTPTransport(rpc?.url ?? url, {
            headers: {
                'Content-Type': 'application/json',
                'Client-Sdk-Type': 'typescript',
                'Client-Sdk-Version': version_1.PACKAGE_VERSION,
                'Client-Target-Api-Version': version_1.TARGETED_RPC_VERSION,
                ...rpc?.headers,
            },
        });
        this.rpcClient = new client_js_1.Client(new client_js_1.RequestManager([transport]));
        this.websocketClient = new websocket_client_1.WebsocketClient(websocketUrl ?? url, websocketOptions);
    }
    async request(input) {
        return await this.rpcClient.request(input);
    }
    async subscribe(input) {
        const unsubscribe = await this.websocketClient.request(input);
        return async () => !!(await unsubscribe());
    }
}
exports.SuiHTTPTransport = SuiHTTPTransport;
//# sourceMappingURL=http-transport.js.map
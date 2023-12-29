"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WebsocketClient_instances, _WebsocketClient_client, _WebsocketClient_subscriptions, _WebsocketClient_disconnects, _WebsocketClient_setupClient, _WebsocketClient_reconnect;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = exports.DEFAULT_CLIENT_OPTIONS = exports.getWebsocketUrl = void 0;
const client_js_1 = require("@open-rpc/client-js");
const getWebsocketUrl = (httpUrl, port) => {
    const url = new URL(httpUrl);
    url.protocol = url.protocol.replace('http', 'ws');
    if (port) {
        url.port = port.toString();
    }
    return url.toString();
};
exports.getWebsocketUrl = getWebsocketUrl;
exports.DEFAULT_CLIENT_OPTIONS = {
    callTimeout: 30000,
    reconnectTimeout: 3000,
    maxReconnects: 5,
};
class WebsocketClient {
    constructor(endpoint, options = exports.DEFAULT_CLIENT_OPTIONS) {
        _WebsocketClient_instances.add(this);
        this.endpoint = endpoint;
        this.options = options;
        _WebsocketClient_client.set(this, void 0);
        _WebsocketClient_subscriptions.set(this, void 0);
        _WebsocketClient_disconnects.set(this, void 0);
        if (this.endpoint.startsWith('http')) {
            this.endpoint = (0, exports.getWebsocketUrl)(this.endpoint);
        }
        __classPrivateFieldSet(this, _WebsocketClient_client, null, "f");
        __classPrivateFieldSet(this, _WebsocketClient_subscriptions, new Map(), "f");
        __classPrivateFieldSet(this, _WebsocketClient_disconnects, 0, "f");
    }
    async request(input) {
        const client = __classPrivateFieldGet(this, _WebsocketClient_instances, "m", _WebsocketClient_setupClient).call(this);
        const id = await client.request({ method: input.method, params: input.params }, this.options.callTimeout);
        const initialId = input.initialId || id;
        __classPrivateFieldGet(this, _WebsocketClient_subscriptions, "f").set(initialId, {
            ...input,
            // Always set the latest actual subscription ID:
            id,
            initialId,
        });
        return async () => {
            const client = __classPrivateFieldGet(this, _WebsocketClient_instances, "m", _WebsocketClient_setupClient).call(this);
            // NOTE: Due to reconnects, the inner subscription ID could have actually changed:
            const subscription = __classPrivateFieldGet(this, _WebsocketClient_subscriptions, "f").get(initialId);
            if (!subscription)
                return false;
            __classPrivateFieldGet(this, _WebsocketClient_subscriptions, "f").delete(initialId);
            return client.request({ method: input.unsubscribe, params: [subscription.id] }, this.options.callTimeout);
        };
    }
}
exports.WebsocketClient = WebsocketClient;
_WebsocketClient_client = new WeakMap(), _WebsocketClient_subscriptions = new WeakMap(), _WebsocketClient_disconnects = new WeakMap(), _WebsocketClient_instances = new WeakSet(), _WebsocketClient_setupClient = function _WebsocketClient_setupClient() {
    if (__classPrivateFieldGet(this, _WebsocketClient_client, "f")) {
        return __classPrivateFieldGet(this, _WebsocketClient_client, "f");
    }
    const transport = new client_js_1.WebSocketTransport(this.endpoint);
    const requestManager = new client_js_1.RequestManager([transport]);
    __classPrivateFieldSet(this, _WebsocketClient_client, new client_js_1.Client(requestManager), "f");
    transport.connection.addEventListener('open', () => {
        __classPrivateFieldSet(this, _WebsocketClient_disconnects, 0, "f");
    });
    transport.connection.addEventListener('close', () => {
        var _a;
        __classPrivateFieldSet(this, _WebsocketClient_disconnects, (_a = __classPrivateFieldGet(this, _WebsocketClient_disconnects, "f"), _a++, _a), "f");
        if (__classPrivateFieldGet(this, _WebsocketClient_disconnects, "f") <= this.options.maxReconnects) {
            setTimeout(() => {
                __classPrivateFieldGet(this, _WebsocketClient_instances, "m", _WebsocketClient_reconnect).call(this);
            }, this.options.reconnectTimeout);
        }
    });
    __classPrivateFieldGet(this, _WebsocketClient_client, "f").onNotification((data) => {
        const params = data.params;
        __classPrivateFieldGet(this, _WebsocketClient_subscriptions, "f").forEach((subscription) => {
            if (subscription.method === data.method &&
                params.subscription === subscription.id) {
                subscription.onMessage(params.result);
            }
        });
    });
    return __classPrivateFieldGet(this, _WebsocketClient_client, "f");
}, _WebsocketClient_reconnect = function _WebsocketClient_reconnect() {
    __classPrivateFieldGet(this, _WebsocketClient_client, "f")?.close();
    __classPrivateFieldSet(this, _WebsocketClient_client, null, "f");
    __classPrivateFieldGet(this, _WebsocketClient_subscriptions, "f").forEach((subscription) => this.request(subscription));
};
//# sourceMappingURL=websocket-client.js.map
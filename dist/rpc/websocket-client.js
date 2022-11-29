"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = exports.DEFAULT_CLIENT_OPTIONS = exports.getWebsocketUrl = void 0;
const index_guard_1 = require("../types/index.guard");
const rpc_websockets_1 = require("rpc-websockets");
const getWebsocketUrl = (httpUrl, port) => {
    const url = new URL(httpUrl);
    url.protocol = url.protocol.replace('http', 'ws');
    url.port = (port ?? 9001).toString();
    return url.toString();
};
exports.getWebsocketUrl = getWebsocketUrl;
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["NotConnected"] = 0] = "NotConnected";
    ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
})(ConnectionState || (ConnectionState = {}));
const isMinimumSubscriptionMessage = (msg) => msg &&
    'subscription' in msg &&
    typeof msg['subscription'] === 'number' &&
    'result' in msg &&
    typeof msg['result'] === 'object';
exports.DEFAULT_CLIENT_OPTIONS = {
    connectTimeout: 15000,
    callTimeout: 30000,
    reconnectInterval: 3000,
    maxReconnects: 5,
};
const SUBSCRIBE_EVENT_METHOD = 'sui_subscribeEvent';
const UNSUBSCRIBE_EVENT_METHOD = 'sui_unsubscribeEvent';
/**
 * Interface with a Sui node's websocket capabilities
 */
class WebsocketClient {
    /**
     * @param endpoint Sui node endpoint to connect to (accepts websocket & http)
     * @param skipValidation If `true`, the rpc client will not check if the responses
     * from the RPC server conform to the schema defined in the TypeScript SDK
     * @param options Configuration options, such as timeouts & connection behavior
     */
    constructor(endpoint, skipValidation, options = exports.DEFAULT_CLIENT_OPTIONS) {
        this.endpoint = endpoint;
        this.skipValidation = skipValidation;
        this.options = options;
        this.connectionState = ConnectionState.NotConnected;
        this.connectionTimeout = null;
        this.isSetup = false;
        this.connectionPromise = null;
        this.eventSubscriptions = new Map();
        if (this.endpoint.startsWith('http'))
            this.endpoint = (0, exports.getWebsocketUrl)(this.endpoint);
        this.rpcClient = new rpc_websockets_1.Client(this.endpoint, {
            reconnect_interval: this.options.reconnectInterval,
            max_reconnects: this.options.maxReconnects,
            autoconnect: false,
        });
    }
    setupSocket() {
        if (this.isSetup)
            return;
        this.rpcClient.on('open', () => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            this.connectionState = ConnectionState.Connected;
            // underlying websocket is private, but we need it
            // to access messages sent by the node
            this.rpcClient.socket.on('message', this.onSocketMessage.bind(this));
        });
        this.rpcClient.on('close', () => {
            this.connectionState = ConnectionState.NotConnected;
        });
        this.rpcClient.on('error', console.error);
        this.isSetup = true;
    }
    // called for every message received from the node over websocket
    onSocketMessage(rawMessage) {
        const msg = JSON.parse(rawMessage);
        const params = msg.params;
        if (msg.method === SUBSCRIBE_EVENT_METHOD) {
            // even with validation off, we must ensure a few properties at minimum in a message
            if (this.skipValidation && isMinimumSubscriptionMessage(params)) {
                const sub = this.eventSubscriptions.get(params.subscription);
                if (sub)
                    // cast to bypass type validation of 'result'
                    sub.onMessage(params.result);
            }
            else if ((0, index_guard_1.isSubscriptionEvent)(params)) {
                // call any registered handler for the message's subscription
                const sub = this.eventSubscriptions.get(params.subscription);
                if (sub)
                    sub.onMessage(params.result);
            }
        }
    }
    async connect() {
        // if the last attempt to connect hasn't finished, wait on it
        if (this.connectionPromise)
            return this.connectionPromise;
        if (this.connectionState === ConnectionState.Connected)
            return Promise.resolve();
        this.setupSocket();
        this.rpcClient.connect();
        this.connectionState = ConnectionState.Connecting;
        this.connectionPromise = new Promise((resolve, reject) => {
            this.connectionTimeout = setTimeout(() => reject(new Error('timeout')), this.options.connectTimeout);
            this.rpcClient.once('open', () => {
                this.refreshSubscriptions();
                this.connectionPromise = null;
                resolve();
            });
            this.rpcClient.once('error', (err) => {
                this.connectionPromise = null;
                reject(err);
            });
        });
        return this.connectionPromise;
    }
    /**
      call only upon reconnecting to a node over websocket.
      calling multiple times on the same connection will result
      in multiple message handlers firing each time
    */
    async refreshSubscriptions() {
        if (this.eventSubscriptions.size === 0)
            return;
        try {
            let newSubs = new Map();
            let newSubsArr = await Promise.all(Array.from(this.eventSubscriptions.values()).map(async (sub) => {
                const onMessage = sub.onMessage;
                const filter = sub.filter;
                if (!filter || !onMessage)
                    return Promise.resolve(null);
                /**
                  re-subscribe to the same filter & replace the subscription id.
                  we skip calling sui_unsubscribeEvent for the old sub id, because:
                    * we assume this is being called after a reconnection
                    * the node keys subscriptions with a combo of connection id & subscription id
                */
                const id = await this.subscribeEvent(filter, onMessage);
                return { id, onMessage, filter };
            }));
            newSubsArr.forEach((entry) => {
                if (entry === null)
                    return;
                const filter = entry.filter;
                const onMessage = entry.onMessage;
                newSubs.set(entry.id, { filter, onMessage });
            });
            this.eventSubscriptions = newSubs;
        }
        catch (err) {
            throw new Error(`error refreshing event subscriptions: ${err}`);
        }
    }
    async subscribeEvent(filter, onMessage) {
        try {
            // lazily connect to websocket to avoid spamming node with connections
            if (this.connectionState != ConnectionState.Connected)
                await this.connect();
            let subId = (await this.rpcClient.call(SUBSCRIBE_EVENT_METHOD, [filter], this.options.callTimeout));
            this.eventSubscriptions.set(subId, { filter, onMessage });
            return subId;
        }
        catch (err) {
            throw new Error(`Error subscribing to event: ${err}, filter: ${JSON.stringify(filter)}`);
        }
    }
    async unsubscribeEvent(id) {
        try {
            if (this.connectionState != ConnectionState.Connected)
                await this.connect();
            let removedOnNode = (await this.rpcClient.call(UNSUBSCRIBE_EVENT_METHOD, [id], this.options.callTimeout));
            /**
              if the connection closes before unsubscribe is called,
              the remote node will remove us from its subscribers list without notification,
              leading to removedOnNode being false. but if we still had a record of it locally,
              we should still report that it was deleted successfully
            */
            return this.eventSubscriptions.delete(id) || removedOnNode;
        }
        catch (err) {
            throw new Error(`Error unsubscribing from event: ${err}, subscription: ${id}}`);
        }
    }
}
exports.WebsocketClient = WebsocketClient;
//# sourceMappingURL=websocket-client.js.map
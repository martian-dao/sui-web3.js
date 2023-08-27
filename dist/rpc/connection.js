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
var _Connection_options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainnetConnection = exports.testnetConnection = exports.devnetConnection = exports.localnetConnection = exports.Connection = void 0;
class Connection {
    constructor(options) {
        _Connection_options.set(this, void 0);
        __classPrivateFieldSet(this, _Connection_options, options, "f");
    }
    get fullnode() {
        return __classPrivateFieldGet(this, _Connection_options, "f").fullnode;
    }
    // TODO: Decide if we should default the websocket URL like this:
    get websocket() {
        return __classPrivateFieldGet(this, _Connection_options, "f").websocket || __classPrivateFieldGet(this, _Connection_options, "f").fullnode;
    }
    /** @deprecated Use the new faucet APIs from `@mysten/sui.js/faucet` instead. */
    get faucet() {
        return __classPrivateFieldGet(this, _Connection_options, "f").faucet;
    }
}
exports.Connection = Connection;
_Connection_options = new WeakMap();
// TODO: Maybe don't have pre-built connections, and instead just have pre-built objects that folks
// can use with the connection?
exports.localnetConnection = new Connection({
    fullnode: 'http://127.0.0.1:9000',
    faucet: 'http://127.0.0.1:9123/gas',
});
exports.devnetConnection = new Connection({
    fullnode: 'https://fullnode.devnet.sui.io:443/',
    faucet: 'https://faucet.devnet.sui.io/gas',
});
exports.testnetConnection = new Connection({
    fullnode: 'https://fullnode.testnet.sui.io:443/',
    faucet: 'https://faucet.testnet.sui.io/gas',
});
exports.mainnetConnection = new Connection({
    fullnode: 'https://fullnode.mainnet.sui.io:443/',
});
//# sourceMappingURL=connection.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK_TO_API = exports.Network = void 0;
var Network;
(function (Network) {
    Network["LOCAL"] = "LOCAL";
    Network["DEVNET"] = "DEVNET";
})(Network = exports.Network || (exports.Network = {}));
exports.NETWORK_TO_API = {
    [Network.LOCAL]: {
        fullNode: 'http://127.0.0.1:9000',
        faucet: 'http://127.0.0.1:9123/gas',
    },
    [Network.DEVNET]: {
        fullNode: 'https://fullnode.devnet.sui.io/',
        faucet: 'https://faucet.devnet.sui.io/gas',
    },
};
//# sourceMappingURL=api-endpoints.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base58DataBuffer = void 0;
const bs58_1 = __importDefault(require("bs58"));
class Base58DataBuffer {
    constructor(data) {
        if (typeof data === 'string') {
            this.data = bs58_1.default.decode(data);
        }
        else {
            this.data = data;
        }
    }
    getData() {
        return this.data;
    }
    getLength() {
        return this.data.length;
    }
    toString() {
        return bs58_1.default.encode(this.data);
    }
}
exports.Base58DataBuffer = Base58DataBuffer;
//# sourceMappingURL=base58.js.map
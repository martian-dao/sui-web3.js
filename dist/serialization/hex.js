"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexDataBuffer = void 0;
const bcs_1 = require("@mysten/bcs");
class HexDataBuffer {
    constructor(data) {
        if (typeof data === 'string') {
            this._data = (0, bcs_1.fromHEX)(data);
        }
        else {
            this._data = data;
        }
    }
    getData() {
        return this._data;
    }
    getLength() {
        return this._data.length;
    }
    toString() {
        return (0, bcs_1.toHEX)(this._data);
    }
}
exports.HexDataBuffer = HexDataBuffer;
//# sourceMappingURL=hex.js.map
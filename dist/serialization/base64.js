"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64DataBuffer = void 0;
const bcs_1 = require("@mysten/bcs");
class Base64DataBuffer {
    constructor(data) {
        if (typeof data === 'string') {
            this.data = (0, bcs_1.fromB64)(data);
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
        return (0, bcs_1.toB64)(this.data);
    }
}
exports.Base64DataBuffer = Base64DataBuffer;
//# sourceMappingURL=base64.js.map
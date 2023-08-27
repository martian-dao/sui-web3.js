"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCValidationError = void 0;
class RPCValidationError extends Error {
    constructor(options) {
        super('RPC Validation Error: The response returned from RPC server does not match the TypeScript definition. This is likely because the SDK version is not compatible with the RPC server.', 
        // @ts-ignore
        { cause: options.cause });
        this.req = options.req;
        this.result = options.result;
        this.message = this.toString();
    }
    toString() {
        let str = super.toString();
        // @ts-ignore
        if (this.cause) {
            // @ts-ignore
            str += `\nCause: ${this.cause}`;
        }
        if (this.result) {
            str += `\nReponse Received: ${JSON.stringify(this.result, null, 2)}`;
        }
        return str;
    }
}
exports.RPCValidationError = RPCValidationError;
//# sourceMappingURL=errors.js.map
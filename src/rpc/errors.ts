// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

interface RPCErrorRequest {
	method: string;
	args: any[];
}

export class RPCValidationError extends Error {
	req: RPCErrorRequest;
	result?: unknown;

	constructor(options: { req: RPCErrorRequest; result?: unknown; cause?: Error }) {
		super(
			'RPC Validation Error: The response returned from RPC server does not match the TypeScript definition. This is likely because the SDK version is not compatible with the RPC server.',
			// @ts-ignore
			{ cause: options.cause },
		);

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

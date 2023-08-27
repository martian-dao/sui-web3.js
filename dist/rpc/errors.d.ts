interface RPCErrorRequest {
    method: string;
    args: any[];
}
export declare class RPCValidationError extends Error {
    req: RPCErrorRequest;
    result?: unknown;
    constructor(options: {
        req: RPCErrorRequest;
        result?: unknown;
        cause?: Error;
    });
    toString(): string;
}
export {};
//# sourceMappingURL=errors.d.ts.map
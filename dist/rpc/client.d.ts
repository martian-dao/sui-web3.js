/**
 * An object defining headers to be passed to the RPC server
 */
export declare type HttpHeaders = {
    [header: string]: string;
};
/**
 * @internal
 */
export declare type RpcParams = {
    method: string;
    args: Array<any>;
};
export declare class JsonRpcClient {
    private rpcClient;
    constructor(url: string, httpHeaders?: HttpHeaders);
    private createRpcClient;
    requestWithType<T>(method: string, args: Array<any>, isT: (val: any) => val is T, skipDataValidation?: boolean): Promise<T>;
    request(method: string, args: Array<any>): Promise<any>;
    batchRequestWithType<T>(requests: RpcParams[], isT: (val: any) => val is T, skipDataValidation?: boolean): Promise<T[]>;
    batchRequest(requests: RpcParams[]): Promise<any>;
}
export declare type ValidResponse = {
    jsonrpc: '2.0';
    id: string;
    result: any;
};
export declare type ErrorResponse = {
    jsonrpc: '2.0';
    id: string;
    error: {
        code: any;
        message: string;
        data?: any;
    };
};
//# sourceMappingURL=client.d.ts.map
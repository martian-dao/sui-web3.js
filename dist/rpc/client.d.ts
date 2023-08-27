import type { Struct } from 'superstruct';
/**
 * An object defining headers to be passed to the RPC server
 */
export type HttpHeaders = {
    [header: string]: string;
};
export declare class JsonRpcClient {
    private rpcClient;
    constructor(url: string, httpHeaders?: HttpHeaders);
    requestWithType<T>(method: string, args: any[], struct: Struct<T>): Promise<T>;
    request(method: string, params: any[]): Promise<any>;
}
//# sourceMappingURL=client.d.ts.map
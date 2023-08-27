import type { WebsocketClientOptions } from '../rpc/websocket-client';
/**
 * An object defining headers to be passed to the RPC server
 */
export type HttpHeaders = {
    [header: string]: string;
};
interface SuiHTTPTransportOptions {
    url: string;
    rpc?: {
        headers?: HttpHeaders;
        url?: string;
    };
    websocket?: WebsocketClientOptions & {
        url?: string;
    };
}
export interface SuiTransportRequestOptions {
    method: string;
    params: unknown[];
}
export interface SuiTransportSubscribeOptions<T> {
    method: string;
    unsubscribe: string;
    params: unknown[];
    onMessage: (event: T) => void;
}
export interface SuiTransport {
    request<T = unknown>(input: SuiTransportRequestOptions): Promise<T>;
    subscribe<T = unknown>(input: SuiTransportSubscribeOptions<T>): Promise<() => Promise<boolean>>;
}
export declare class SuiHTTPTransport implements SuiTransport {
    private rpcClient;
    private websocketClient;
    constructor({ url, websocket: { url: websocketUrl, ...websocketOptions }, rpc, }: SuiHTTPTransportOptions);
    request<T>(input: SuiTransportRequestOptions): Promise<T>;
    subscribe<T>(input: SuiTransportSubscribeOptions<T>): Promise<() => Promise<boolean>>;
}
export {};
//# sourceMappingURL=http-transport.d.ts.map
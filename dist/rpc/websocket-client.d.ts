export declare const getWebsocketUrl: (httpUrl: string, port?: number) => string;
type SubscriptionRequest<T = any> = {
    id?: number;
    initialId?: number;
    method: string;
    unsubscribe: string;
    params: any[];
    onMessage: (event: T) => void;
};
/**
 * Configuration options for the websocket connection
 */
export type WebsocketClientOptions = {
    /**
     * Milliseconds before timing out while calling an RPC method
     */
    callTimeout: number;
    /**
     * Milliseconds between attempts to connect
     */
    reconnectTimeout: number;
    /**
     * Maximum number of times to try connecting before giving up
     */
    maxReconnects: number;
};
export declare const DEFAULT_CLIENT_OPTIONS: WebsocketClientOptions;
export declare class WebsocketClient {
    #private;
    endpoint: string;
    options: WebsocketClientOptions;
    constructor(endpoint: string, options?: WebsocketClientOptions);
    request<T>(input: SubscriptionRequest<T>): Promise<() => Promise<any>>;
}
export {};
//# sourceMappingURL=websocket-client.d.ts.map
import { SuiEventFilter, SuiEventEnvelope, SubscriptionId } from '../types';
import { Client as WsRpcClient } from 'rpc-websockets';
export declare const getWebsocketUrl: (httpUrl: string, port?: number) => string;
declare enum ConnectionState {
    NotConnected = 0,
    Connecting = 1,
    Connected = 2
}
declare type SubscriptionData = {
    filter: SuiEventFilter;
    onMessage: (event: SuiEventEnvelope) => void;
};
/**
 * Configuration options for the websocket connection
 */
export declare type WebsocketClientOptions = {
    /**
     * Milliseconds before timing out while initially connecting
     */
    connectTimeout: number;
    /**
     * Milliseconds before timing out while calling an RPC method
     */
    callTimeout: number;
    /**
     * Milliseconds between attempts to connect
     */
    reconnectInterval: number;
    /**
     * Maximum number of times to try connecting before giving up
     */
    maxReconnects: number;
};
export declare const DEFAULT_CLIENT_OPTIONS: WebsocketClientOptions;
/**
 * Interface with a Sui node's websocket capabilities
 */
export declare class WebsocketClient {
    endpoint: string;
    skipValidation: boolean;
    options: WebsocketClientOptions;
    protected rpcClient: WsRpcClient;
    protected connectionState: ConnectionState;
    protected connectionTimeout: number | null;
    protected isSetup: boolean;
    private connectionPromise;
    protected eventSubscriptions: Map<SubscriptionId, SubscriptionData>;
    /**
     * @param endpoint Sui node endpoint to connect to (accepts websocket & http)
     * @param skipValidation If `true`, the rpc client will not check if the responses
     * from the RPC server conform to the schema defined in the TypeScript SDK
     * @param options Configuration options, such as timeouts & connection behavior
     */
    constructor(endpoint: string, skipValidation: boolean, options?: WebsocketClientOptions);
    private setupSocket;
    private onSocketMessage;
    private connect;
    /**
      call only upon reconnecting to a node over websocket.
      calling multiple times on the same connection will result
      in multiple message handlers firing each time
    */
    private refreshSubscriptions;
    subscribeEvent(filter: SuiEventFilter, onMessage: (event: SuiEventEnvelope) => void): Promise<SubscriptionId>;
    unsubscribeEvent(id: SubscriptionId): Promise<boolean>;
}
export {};
//# sourceMappingURL=websocket-client.d.ts.map
export declare enum Network {
    LOCAL = "LOCAL",
    DEVNET = "DEVNET"
}
export declare type ApiEndpoints = {
    fullNode: string;
    faucet?: string;
};
export declare const NETWORK_TO_API: Record<Network, ApiEndpoints>;
//# sourceMappingURL=api-endpoints.d.ts.map
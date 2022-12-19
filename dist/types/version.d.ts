export declare type RpcApiVersion = {
    major: number;
    minor: number;
    patch: number;
};
export declare function parseVersionFromString(version: string): RpcApiVersion | undefined;
export declare function versionToString(version: RpcApiVersion): string;
//# sourceMappingURL=version.d.ts.map
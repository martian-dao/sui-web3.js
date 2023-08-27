import { SuiObjectData } from '.';
import type { SuiObjectResponse, JsonRpcProvider } from '.';
export interface WithIds {
    objectIds: string[];
}
type FetchFnParser<RpcResponse, DataModel> = (typedData: RpcResponse, suiObject: SuiObjectData, rpcResponse: SuiObjectResponse) => DataModel | undefined;
type SuiObjectParser<RpcResponse, DataModel> = {
    parser: FetchFnParser<RpcResponse, DataModel>;
    regex: RegExp;
};
type ID = {
    id: string;
};
type Bag = {
    type: string;
    fields: {
        id: ID;
        size: number;
    };
};
type NftRpcResponse = {
    logical_owner: string;
    bag: Bag;
};
type NftRaw = {
    id: string;
    logicalOwner: string;
    bagId: string;
};
type NftDomains = {
    url: string;
    name: string;
    description: string;
};
export type Nft = {
    nft: NftRaw;
    fields?: Partial<NftDomains>;
};
export declare const NftParser: SuiObjectParser<NftRpcResponse, NftRaw>;
export declare const parseDomains: (domains: SuiObjectResponse[]) => Partial<NftDomains>;
export declare class NftClient {
    private provider;
    constructor(provider: JsonRpcProvider);
    parseObjects: (objects: SuiObjectResponse[]) => Promise<NftRaw[]>;
    fetchAndParseObjectsById: (ids: string[]) => Promise<NftRaw[]>;
    getBagContent: (bagId: string) => Promise<{
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }[]>;
    getNftsById: (params: WithIds) => Promise<Nft[]>;
}
export {};
//# sourceMappingURL=nft-client.d.ts.map
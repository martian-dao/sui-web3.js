import type { Infer } from 'superstruct';
export declare const CoinStruct: import("superstruct").Struct<{
    version: string;
    digest: string;
    coinType: string;
    previousTransaction: string;
    balance: string;
    coinObjectId: string;
}, {
    coinType: import("superstruct").Struct<string, null>;
    coinObjectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
    balance: import("superstruct").Struct<string, null>;
    previousTransaction: import("superstruct").Struct<string, null>;
}>;
export type CoinStruct = Infer<typeof CoinStruct>;
export declare const PaginatedCoins: import("superstruct").Struct<{
    data: {
        version: string;
        digest: string;
        coinType: string;
        previousTransaction: string;
        balance: string;
        coinObjectId: string;
    }[];
    nextCursor: string;
    hasNextPage: boolean;
}, {
    data: import("superstruct").Struct<{
        version: string;
        digest: string;
        coinType: string;
        previousTransaction: string;
        balance: string;
        coinObjectId: string;
    }[], import("superstruct").Struct<{
        version: string;
        digest: string;
        coinType: string;
        previousTransaction: string;
        balance: string;
        coinObjectId: string;
    }, {
        coinType: import("superstruct").Struct<string, null>;
        coinObjectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string, null>;
        digest: import("superstruct").Struct<string, null>;
        balance: import("superstruct").Struct<string, null>;
        previousTransaction: import("superstruct").Struct<string, null>;
    }>>;
    nextCursor: import("superstruct").Struct<string, null>;
    hasNextPage: import("superstruct").Struct<boolean, null>;
}>;
export type PaginatedCoins = Infer<typeof PaginatedCoins>;
export declare const CoinBalance: import("superstruct").Struct<{
    coinType: string;
    coinObjectCount: number;
    totalBalance: string;
    lockedBalance: {
        number: number;
        epochId: number;
    };
}, {
    coinType: import("superstruct").Struct<string, null>;
    coinObjectCount: import("superstruct").Struct<number, null>;
    totalBalance: import("superstruct").Struct<string, null>;
    lockedBalance: import("superstruct").Struct<{
        number: number;
        epochId: number;
    }, {
        epochId: import("superstruct").Struct<number, null>;
        number: import("superstruct").Struct<number, null>;
    }>;
}>;
export type CoinBalance = Infer<typeof CoinBalance>;
export declare const CoinSupply: import("superstruct").Struct<{
    value: string;
}, {
    value: import("superstruct").Struct<string, null>;
}>;
export type CoinSupply = Infer<typeof CoinSupply>;
//# sourceMappingURL=coin.d.ts.map
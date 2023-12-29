import type { SuiObjectResponse, SuiMoveObject, SuiObjectInfo, SuiObjectData } from '../types/objects';
import type { Option } from '../types/option';
import type { CoinStruct } from '../types/coin';
import type { StructTag } from '../bcs/index';
import type { Infer } from 'superstruct';
export declare const SUI_SYSTEM_ADDRESS = "0x3";
export declare const SUI_FRAMEWORK_ADDRESS = "0x2";
export declare const MOVE_STDLIB_ADDRESS = "0x1";
export declare const OBJECT_MODULE_NAME = "object";
export declare const UID_STRUCT_NAME = "UID";
export declare const ID_STRUCT_NAME = "ID";
export declare const SUI_TYPE_ARG: string;
export declare const VALIDATORS_EVENTS_QUERY = "0x3::validator_set::ValidatorEpochInfoEventV2";
export declare const SUI_CLOCK_OBJECT_ID: string;
export declare const PAY_MODULE_NAME = "pay";
export declare const PAY_SPLIT_COIN_VEC_FUNC_NAME = "split_vec";
export declare const PAY_JOIN_COIN_FUNC_NAME = "join";
export declare const COIN_TYPE_ARG_REGEX: RegExp;
type ObjectData = ObjectDataFull | SuiObjectInfo;
type ObjectDataFull = SuiObjectResponse | SuiMoveObject;
export declare function isObjectDataFull(resp: ObjectData | ObjectDataFull): resp is SuiObjectResponse;
export declare const CoinMetadataStruct: import("superstruct").Struct<{
    symbol: string;
    name: string;
    description: string;
    id: string;
    decimals: number;
    iconUrl: string;
}, {
    decimals: import("superstruct").Struct<number, null>;
    name: import("superstruct").Struct<string, null>;
    symbol: import("superstruct").Struct<string, null>;
    description: import("superstruct").Struct<string, null>;
    iconUrl: import("superstruct").Struct<string, null>;
    id: import("superstruct").Struct<string, null>;
}>;
export type CoinMetadata = Infer<typeof CoinMetadataStruct>;
/**
 * Utility class for 0x2::coin
 * as defined in https://github.com/MystenLabs/sui/blob/ca9046fd8b1a9e8634a4b74b0e7dabdc7ea54475/sui_programmability/framework/sources/Coin.move#L4
 */
export declare class Coin {
    static isCoin(data: ObjectData): boolean;
    static getCoinType(type: string): string;
    static getCoinTypeArg(obj: ObjectData): string;
    static isSUI(obj: ObjectData): boolean;
    static getCoinSymbol(coinTypeArg: string): string;
    static getCoinStructTag(coinTypeArg: string): StructTag;
    static getID(obj: ObjectData): string;
    static totalBalance(coins: CoinStruct[]): bigint;
    /**
     * Sort coin by balance in an ascending order
     */
    static sortByBalance(coins: CoinStruct[]): CoinStruct[];
    static getBalanceFromCoinStruct(coin: CoinStruct): bigint;
    static getBalance(data: ObjectDataFull): bigint | undefined;
    private static getType;
}
export type DelegationData = SuiMoveObject & {
    dataType: 'moveObject';
    type: '0x2::delegation::Delegation';
    fields: {
        active_delegation: Option<number>;
        delegate_amount: number;
        next_reward_unclaimed_epoch: number;
        validator_address: string;
        info: {
            id: string;
            version: number;
        };
        ending_epoch: Option<number>;
    };
};
export type DelegationSuiObject = Omit<SuiObjectData, 'data'> & {
    data: DelegationData;
};
export declare class Delegation {
    static readonly SUI_OBJECT_TYPE = "0x2::delegation::Delegation";
    private suiObject;
    static isDelegationSuiObject(obj: SuiObjectData): obj is DelegationSuiObject;
    constructor(obj: DelegationSuiObject);
    nextRewardUnclaimedEpoch(): number;
    activeDelegation(): bigint;
    delegateAmount(): number;
    endingEpoch(): number;
    validatorAddress(): string;
    isActive(): boolean;
    hasUnclaimedRewards(epoch: number): boolean;
}
export {};
//# sourceMappingURL=framework.d.ts.map
import { GetObjectDataResponse, SuiMoveObject, SuiObjectInfo, SuiObject, SuiData, ObjectId } from './objects';
import { SuiAddress } from './common';
import { Option } from './option';
import { StructTag } from './sui-bcs';
import { UnserializedSignableTransaction } from '../signers/txn-data-serializers/txn-data-serializer';
export declare const SUI_FRAMEWORK_ADDRESS = "0x2";
export declare const MOVE_STDLIB_ADDRESS = "0x1";
export declare const OBJECT_MODULE_NAME = "object";
export declare const UID_STRUCT_NAME = "UID";
export declare const ID_STRUCT_NAME = "ID";
export declare const SUI_TYPE_ARG: string;
export declare const PAY_MODULE_NAME = "pay";
export declare const PAY_SPLIT_COIN_VEC_FUNC_NAME = "split_vec";
export declare const PAY_JOIN_COIN_FUNC_NAME = "join";
export declare const COIN_TYPE_ARG_REGEX: RegExp;
declare type ObjectData = ObjectDataFull | SuiObjectInfo;
declare type ObjectDataFull = GetObjectDataResponse | SuiMoveObject;
export declare type CoinMetadata = {
    decimals: number;
    name: string;
    symbol: string;
    description: string;
    iconUrl: string | null;
    id: ObjectId | null;
};
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
    static getID(obj: ObjectData): ObjectId;
    /**
     * Convenience method for select coin objects that has a balance greater than or equal to `amount`
     *
     * @param amount coin balance
     * @param exclude object ids of the coins to exclude
     * @return a list of coin objects that has balance greater than `amount` in an ascending order
     */
    static selectCoinsWithBalanceGreaterThanOrEqual(coins: ObjectDataFull[], amount: bigint, exclude?: ObjectId[]): ObjectDataFull[];
    /**
     * Convenience method for select an arbitrary coin object that has a balance greater than or
     * equal to `amount`
     *
     * @param amount coin balance
     * @param exclude object ids of the coins to exclude
     * @return an arbitray coin with balance greater than or equal to `amount
     */
    static selectCoinWithBalanceGreaterThanOrEqual(coins: ObjectDataFull[], amount: bigint, exclude?: ObjectId[]): ObjectDataFull | undefined;
    /**
     * Convenience method for select a minimal set of coin objects that has a balance greater than
     * or equal to `amount`. The output can be used for `PayTransaction`
     *
     * @param amount coin balance
     * @param exclude object ids of the coins to exclude
     * @return a minimal list of coin objects that has a combined balance greater than or equal
     * to`amount` in an ascending order. If no such set exists, an empty list is returned
     */
    static selectCoinSetWithCombinedBalanceGreaterThanOrEqual(coins: ObjectDataFull[], amount: bigint, exclude?: ObjectId[]): ObjectDataFull[];
    static totalBalance(coins: ObjectDataFull[]): bigint;
    /**
     * Sort coin by balance in an ascending order
     */
    static sortByBalance(coins: ObjectDataFull[]): ObjectDataFull[];
    static getBalance(data: ObjectDataFull): bigint | undefined;
    static getZero(): bigint;
    private static getType;
    /**
     * Create a new transaction for sending coins ready to be signed and executed.
     * @param allCoins All the coins that are owned by the sender. Can be only the relevant type of coins for the transfer, Sui for gas and the coins with the same type as the type to send.
     * @param coinTypeArg The coin type argument (Coin<T> the T) of the coin to send
     * @param amountToSend Total amount to send to recipient
     * @param recipient Recipient's address
     * @param gasBudget Gas budget for the tx
     * @throws in case of insufficient funds
     */
    static newPayTransaction(allCoins: SuiMoveObject[], coinTypeArg: string, amountToSend: bigint, recipient: SuiAddress, gasBudget: number): Promise<UnserializedSignableTransaction>;
}
export declare type DelegationData = SuiMoveObject & Pick<SuiData, 'dataType'> & {
    type: '0x2::delegation::Delegation';
    fields: {
        active_delegation: Option<number>;
        delegate_amount: number;
        next_reward_unclaimed_epoch: number;
        validator_address: SuiAddress;
        info: {
            id: string;
            version: number;
        };
        coin_locked_until_epoch: Option<SuiMoveObject>;
        ending_epoch: Option<number>;
    };
};
export declare type DelegationSuiObject = Omit<SuiObject, 'data'> & {
    data: DelegationData;
};
export declare class Delegation {
    static readonly SUI_OBJECT_TYPE = "0x2::delegation::Delegation";
    private suiObject;
    static isDelegationSuiObject(obj: SuiObject): obj is DelegationSuiObject;
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
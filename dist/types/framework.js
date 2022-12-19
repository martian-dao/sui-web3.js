"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delegation = exports.Coin = exports.COIN_TYPE_ARG_REGEX = exports.PAY_JOIN_COIN_FUNC_NAME = exports.PAY_SPLIT_COIN_VEC_FUNC_NAME = exports.PAY_MODULE_NAME = exports.SUI_TYPE_ARG = exports.ID_STRUCT_NAME = exports.UID_STRUCT_NAME = exports.OBJECT_MODULE_NAME = exports.MOVE_STDLIB_ADDRESS = exports.SUI_FRAMEWORK_ADDRESS = void 0;
const objects_1 = require("./objects");
const common_1 = require("./common");
const option_1 = require("./option");
const index_guard_1 = require("./index.guard");
exports.SUI_FRAMEWORK_ADDRESS = '0x2';
exports.MOVE_STDLIB_ADDRESS = '0x1';
exports.OBJECT_MODULE_NAME = 'object';
exports.UID_STRUCT_NAME = 'UID';
exports.ID_STRUCT_NAME = 'ID';
exports.SUI_TYPE_ARG = `${exports.SUI_FRAMEWORK_ADDRESS}::sui::SUI`;
// `sui::pay` module is used for Coin management (split, join, join_and_transfer etc);
exports.PAY_MODULE_NAME = 'pay';
exports.PAY_SPLIT_COIN_VEC_FUNC_NAME = 'split_vec';
exports.PAY_JOIN_COIN_FUNC_NAME = 'join';
exports.COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
/**
 * Utility class for 0x2::coin
 * as defined in https://github.com/MystenLabs/sui/blob/ca9046fd8b1a9e8634a4b74b0e7dabdc7ea54475/sui_programmability/framework/sources/Coin.move#L4
 */
class Coin {
    static isCoin(data) {
        return Coin.getType(data)?.match(exports.COIN_TYPE_ARG_REGEX) != null;
    }
    static getCoinType(type) {
        const [, res] = type.match(exports.COIN_TYPE_ARG_REGEX) ?? [];
        return res || null;
    }
    static getCoinTypeArg(obj) {
        const type = Coin.getType(obj);
        return type ? Coin.getCoinType(type) : null;
    }
    static isSUI(obj) {
        const arg = Coin.getCoinTypeArg(obj);
        return arg ? Coin.getCoinSymbol(arg) === 'SUI' : false;
    }
    static getCoinSymbol(coinTypeArg) {
        return coinTypeArg.substring(coinTypeArg.lastIndexOf(':') + 1);
    }
    static getCoinStructTag(coinTypeArg) {
        return {
            address: (0, common_1.normalizeSuiObjectId)(coinTypeArg.split('::')[0]),
            module: coinTypeArg.split('::')[1],
            name: coinTypeArg.split('::')[2],
            typeParams: [],
        };
    }
    static getID(obj) {
        if ((0, index_guard_1.isSuiMoveObject)(obj)) {
            return obj.fields.id.id;
        }
        return (0, objects_1.getObjectId)(obj);
    }
    /**
     * Convenience method for select coin objects that has a balance greater than or equal to `amount`
     *
     * @param amount coin balance
     * @param exclude object ids of the coins to exclude
     * @return a list of coin objects that has balance greater than `amount` in an ascending order
     */
    static selectCoinsWithBalanceGreaterThanOrEqual(coins, amount, exclude = []) {
        return Coin.sortByBalance(coins.filter((c) => !exclude.includes(Coin.getID(c)) && Coin.getBalance(c) >= amount));
    }
    /**
     * Convenience method for select an arbitrary coin object that has a balance greater than or
     * equal to `amount`
     *
     * @param amount coin balance
     * @param exclude object ids of the coins to exclude
     * @return an arbitray coin with balance greater than or equal to `amount
     */
    static selectCoinWithBalanceGreaterThanOrEqual(coins, amount, exclude = []) {
        return coins.find((c) => !exclude.includes(Coin.getID(c)) && Coin.getBalance(c) >= amount);
    }
    /**
     * Convenience method for select a minimal set of coin objects that has a balance greater than
     * or equal to `amount`. The output can be used for `PayTransaction`
     *
     * @param amount coin balance
     * @param exclude object ids of the coins to exclude
     * @return a minimal list of coin objects that has a combined balance greater than or equal
     * to`amount` in an ascending order. If no such set exists, an empty list is returned
     */
    static selectCoinSetWithCombinedBalanceGreaterThanOrEqual(coins, amount, exclude = []) {
        const sortedCoins = Coin.sortByBalance(coins.filter((c) => !exclude.includes(Coin.getID(c))));
        const total = Coin.totalBalance(sortedCoins);
        // return empty set if the aggregate balance of all coins is smaller than amount
        if (total < amount) {
            return [];
        }
        else if (total === amount) {
            return sortedCoins;
        }
        let sum = BigInt(0);
        let ret = [];
        while (sum < total) {
            // prefer to add a coin with smallest sufficient balance
            const target = amount - sum;
            const coinWithSmallestSufficientBalance = sortedCoins.find((c) => Coin.getBalance(c) >= target);
            if (coinWithSmallestSufficientBalance) {
                ret.push(coinWithSmallestSufficientBalance);
                break;
            }
            const coinWithLargestBalance = sortedCoins.pop();
            ret.push(coinWithLargestBalance);
            sum += Coin.getBalance(coinWithLargestBalance);
        }
        return Coin.sortByBalance(ret);
    }
    static totalBalance(coins) {
        return coins.reduce((partialSum, c) => partialSum + Coin.getBalance(c), BigInt(0));
    }
    /**
     * Sort coin by balance in an ascending order
     */
    static sortByBalance(coins) {
        return coins.sort((a, b) => Coin.getBalance(a) < Coin.getBalance(b)
            ? -1
            : Coin.getBalance(a) > Coin.getBalance(b)
                ? 1
                : 0);
    }
    static getBalance(data) {
        if (!Coin.isCoin(data)) {
            return undefined;
        }
        const balance = (0, objects_1.getObjectFields)(data)?.balance;
        return BigInt(balance);
    }
    static getZero() {
        return BigInt(0);
    }
    static getType(data) {
        if ('status' in data) {
            return (0, objects_1.getMoveObjectType)(data);
        }
        return data.type;
    }
    /**
     * Create a new transaction for sending coins ready to be signed and executed.
     * @param allCoins All the coins that are owned by the sender. Can be only the relevant type of coins for the transfer, Sui for gas and the coins with the same type as the type to send.
     * @param coinTypeArg The coin type argument (Coin<T> the T) of the coin to send
     * @param amountToSend Total amount to send to recipient
     * @param recipient Recipient's address
     * @param gasBudget Gas budget for the tx
     * @throws in case of insufficient funds
     */
    static async newPayTransaction(allCoins, coinTypeArg, amountToSend, recipient, gasBudget) {
        const isSuiTransfer = coinTypeArg === exports.SUI_TYPE_ARG;
        const coinsOfTransferType = allCoins.filter((aCoin) => Coin.getCoinTypeArg(aCoin) === coinTypeArg);
        const coinsOfGas = isSuiTransfer
            ? coinsOfTransferType
            : allCoins.filter((aCoin) => Coin.isSUI(aCoin));
        const gasCoin = Coin.selectCoinWithBalanceGreaterThanOrEqual(coinsOfGas, BigInt(gasBudget));
        if (!gasCoin) {
            // TODO: denomination for gasBudget?
            throw new Error(`Unable to find a coin to cover the gas budget ${gasBudget}`);
        }
        const totalAmountIncludingGas = amountToSend +
            BigInt(isSuiTransfer
                ? // subtract from the total the balance of the gasCoin as it's going be the first element of the inputCoins
                    BigInt(gasBudget) - BigInt(Coin.getBalance(gasCoin) || 0)
                : 0);
        const inputCoinObjs = totalAmountIncludingGas > 0
            ? await Coin.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(coinsOfTransferType, totalAmountIncludingGas, isSuiTransfer ? [Coin.getID(gasCoin)] : [])
            : [];
        if (totalAmountIncludingGas > 0 && !inputCoinObjs.length) {
            const totalBalanceOfTransferType = Coin.totalBalance(coinsOfTransferType);
            const suggestedAmountToSend = totalBalanceOfTransferType - BigInt(isSuiTransfer ? gasBudget : 0);
            // TODO: denomination for values?
            throw new Error(`Coin balance ${totalBalanceOfTransferType} is not sufficient to cover the transfer amount ` +
                `${amountToSend}. Try reducing the transfer amount to ${suggestedAmountToSend}.`);
        }
        if (isSuiTransfer) {
            inputCoinObjs.unshift(gasCoin);
        }
        return {
            kind: isSuiTransfer ? 'paySui' : 'pay',
            data: {
                inputCoins: inputCoinObjs.map(Coin.getID),
                recipients: [recipient],
                // TODO: change this to string to avoid losing precision
                amounts: [Number(amountToSend)],
                gasBudget: Number(gasBudget),
            },
        };
    }
}
exports.Coin = Coin;
// Class for delegation.move
// see https://github.com/MystenLabs/fastnft/blob/161aa27fe7eb8ecf2866ec9eb192e768f25da768/crates/sui-framework/sources/governance/delegation.move
class Delegation {
    constructor(obj) {
        this.suiObject = obj;
    }
    static isDelegationSuiObject(obj) {
        return 'type' in obj.data && obj.data.type === Delegation.SUI_OBJECT_TYPE;
    }
    nextRewardUnclaimedEpoch() {
        return this.suiObject.data.fields.next_reward_unclaimed_epoch;
    }
    activeDelegation() {
        return BigInt((0, option_1.getOption)(this.suiObject.data.fields.active_delegation) || 0);
    }
    delegateAmount() {
        return this.suiObject.data.fields.delegate_amount;
    }
    endingEpoch() {
        return (0, option_1.getOption)(this.suiObject.data.fields.ending_epoch);
    }
    validatorAddress() {
        return this.suiObject.data.fields.validator_address;
    }
    isActive() {
        return this.activeDelegation() > 0 && !this.endingEpoch();
    }
    hasUnclaimedRewards(epoch) {
        return (this.nextRewardUnclaimedEpoch() <= epoch &&
            (this.isActive() || (this.endingEpoch() || 0) > epoch));
    }
}
exports.Delegation = Delegation;
Delegation.SUI_OBJECT_TYPE = '0x2::delegation::Delegation';
//# sourceMappingURL=framework.js.map
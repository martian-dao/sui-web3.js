"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delegation = exports.Coin = exports.CoinMetadataStruct = exports.isObjectDataFull = exports.COIN_TYPE_ARG_REGEX = exports.PAY_JOIN_COIN_FUNC_NAME = exports.PAY_SPLIT_COIN_VEC_FUNC_NAME = exports.PAY_MODULE_NAME = exports.SUI_CLOCK_OBJECT_ID = exports.VALIDATORS_EVENTS_QUERY = exports.SUI_TYPE_ARG = exports.ID_STRUCT_NAME = exports.UID_STRUCT_NAME = exports.OBJECT_MODULE_NAME = exports.MOVE_STDLIB_ADDRESS = exports.SUI_FRAMEWORK_ADDRESS = exports.SUI_SYSTEM_ADDRESS = void 0;
const objects_1 = require("../types/objects");
const option_1 = require("../types/option");
const superstruct_1 = require("superstruct");
const sui_types_1 = require("../utils/sui-types");
exports.SUI_SYSTEM_ADDRESS = '0x3';
exports.SUI_FRAMEWORK_ADDRESS = '0x2';
exports.MOVE_STDLIB_ADDRESS = '0x1';
exports.OBJECT_MODULE_NAME = 'object';
exports.UID_STRUCT_NAME = 'UID';
exports.ID_STRUCT_NAME = 'ID';
exports.SUI_TYPE_ARG = `${exports.SUI_FRAMEWORK_ADDRESS}::sui::SUI`;
exports.VALIDATORS_EVENTS_QUERY = '0x3::validator_set::ValidatorEpochInfoEventV2';
exports.SUI_CLOCK_OBJECT_ID = (0, sui_types_1.normalizeSuiObjectId)('0x6');
// `sui::pay` module is used for Coin management (split, join, join_and_transfer etc);
exports.PAY_MODULE_NAME = 'pay';
exports.PAY_SPLIT_COIN_VEC_FUNC_NAME = 'split_vec';
exports.PAY_JOIN_COIN_FUNC_NAME = 'join';
exports.COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
function isObjectDataFull(resp) {
    return !!resp.data || !!resp.type;
}
exports.isObjectDataFull = isObjectDataFull;
exports.CoinMetadataStruct = (0, superstruct_1.object)({
    decimals: (0, superstruct_1.number)(),
    name: (0, superstruct_1.string)(),
    symbol: (0, superstruct_1.string)(),
    description: (0, superstruct_1.string)(),
    iconUrl: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    id: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
});
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
            address: (0, sui_types_1.normalizeSuiObjectId)(coinTypeArg.split('::')[0]),
            module: coinTypeArg.split('::')[1],
            name: coinTypeArg.split('::')[2],
            typeParams: [],
        };
    }
    static getID(obj) {
        if ('fields' in obj) {
            return obj.fields.id.id;
        }
        return (0, objects_1.getObjectId)(obj);
    }
    static totalBalance(coins) {
        return coins.reduce((partialSum, c) => partialSum + Coin.getBalanceFromCoinStruct(c), BigInt(0));
    }
    /**
     * Sort coin by balance in an ascending order
     */
    static sortByBalance(coins) {
        return [...coins].sort((a, b) => Coin.getBalanceFromCoinStruct(a) < Coin.getBalanceFromCoinStruct(b)
            ? -1
            : Coin.getBalanceFromCoinStruct(a) > Coin.getBalanceFromCoinStruct(b)
                ? 1
                : 0);
    }
    static getBalanceFromCoinStruct(coin) {
        return BigInt(coin.balance);
    }
    static getBalance(data) {
        if (!Coin.isCoin(data)) {
            return undefined;
        }
        const balance = (0, objects_1.getObjectFields)(data)?.balance;
        return BigInt(balance);
    }
    static getType(data) {
        if (isObjectDataFull(data)) {
            return (0, objects_1.getObjectType)(data);
        }
        return data.type;
    }
}
exports.Coin = Coin;
// Class for delegation.move
// see https://github.com/MystenLabs/fastnft/blob/161aa27fe7eb8ecf2866ec9eb192e768f25da768/crates/sui-framework/sources/governance/delegation.move
class Delegation {
    static isDelegationSuiObject(obj) {
        return 'type' in obj && obj.type === Delegation.SUI_OBJECT_TYPE;
    }
    constructor(obj) {
        this.suiObject = obj;
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
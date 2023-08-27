"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiSystemStateUtil = exports.WITHDRAW_STAKE_FUN_NAME = exports.ADD_STAKE_LOCKED_COIN_FUN_NAME = exports.ADD_STAKE_FUN_NAME = exports.SUI_SYSTEM_MODULE_NAME = exports.SUI_SYSTEM_STATE_OBJECT_ID = void 0;
const sui_types_1 = require("../utils/sui-types");
const index_1 = require("../builder/index");
const index_2 = require("../types/index");
const framework_1 = require("./framework");
/**
 * Address of the Sui System object.
 * Always the same in every Sui network (local, devnet, testnet).
 */
exports.SUI_SYSTEM_STATE_OBJECT_ID = (0, sui_types_1.normalizeSuiObjectId)('0x5');
exports.SUI_SYSTEM_MODULE_NAME = 'sui_system';
exports.ADD_STAKE_FUN_NAME = 'request_add_stake';
exports.ADD_STAKE_LOCKED_COIN_FUN_NAME = 'request_add_stake_with_locked_coin';
exports.WITHDRAW_STAKE_FUN_NAME = 'request_withdraw_stake';
/**
 * Utility class for `0x5` object
 */
class SuiSystemStateUtil {
    /**
     * Create a new transaction for staking coins ready to be signed and executed with `signer-and-provider`.
     *
     * @param coins the coins to be staked
     * @param amount the amount to stake
     * @param gasBudget omittable only for DevInspect mode
     */
    static async newRequestAddStakeTxn(client, coins, amount, validatorAddress) {
        // TODO: validate coin types and handle locked coins
        const tx = new index_1.TransactionBlock();
        const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
        tx.moveCall({
            target: `${framework_1.SUI_SYSTEM_ADDRESS}::${exports.SUI_SYSTEM_MODULE_NAME}::${exports.ADD_STAKE_FUN_NAME}`,
            arguments: [
                tx.object(exports.SUI_SYSTEM_STATE_OBJECT_ID),
                coin,
                tx.pure(validatorAddress),
            ],
        });
        const coinObjects = await client.multiGetObjects({
            ids: coins,
            // @ts-ignore
            options: {
                showOwner: true,
            },
        });
        tx.setGasPayment(coinObjects.map((obj) => (0, index_2.getObjectReference)(obj)));
        return tx;
    }
    /**
     * Create a new transaction for withdrawing coins ready to be signed and
     * executed with `signer-and-provider`.
     *
     * @param stake the stake object created in the requestAddStake txn
     * @param stakedCoinId the coins to withdraw
     * @param gasBudget omittable only for DevInspect mode
     */
    static async newRequestWithdrawlStakeTxn(stake, stakedCoinId) {
        const tx = new index_1.TransactionBlock();
        tx.moveCall({
            target: `${framework_1.SUI_SYSTEM_ADDRESS}::${exports.SUI_SYSTEM_MODULE_NAME}::${exports.WITHDRAW_STAKE_FUN_NAME}`,
            arguments: [
                tx.object(exports.SUI_SYSTEM_STATE_OBJECT_ID),
                tx.object(stake),
                tx.object(stakedCoinId),
            ],
        });
        return tx;
    }
}
exports.SuiSystemStateUtil = SuiSystemStateUtil;
//# sourceMappingURL=sui-system-state.js.map
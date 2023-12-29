import { TransactionBlock } from '../builder/index';
import type { JsonRpcProvider } from '../providers/json-rpc-provider';
import type { SuiClient } from '../client/index';
/**
 * Address of the Sui System object.
 * Always the same in every Sui network (local, devnet, testnet).
 */
export declare const SUI_SYSTEM_STATE_OBJECT_ID: string;
export declare const SUI_SYSTEM_MODULE_NAME = "sui_system";
export declare const ADD_STAKE_FUN_NAME = "request_add_stake";
export declare const ADD_STAKE_LOCKED_COIN_FUN_NAME = "request_add_stake_with_locked_coin";
export declare const WITHDRAW_STAKE_FUN_NAME = "request_withdraw_stake";
/**
 * Utility class for `0x5` object
 */
export declare class SuiSystemStateUtil {
    /**
     * Create a new transaction for staking coins ready to be signed and executed with `signer-and-provider`.
     *
     * @param coins the coins to be staked
     * @param amount the amount to stake
     * @param gasBudget omittable only for DevInspect mode
     */
    static newRequestAddStakeTxn(client: JsonRpcProvider | SuiClient, coins: string[], amount: bigint, validatorAddress: string): Promise<TransactionBlock>;
    /**
     * Create a new transaction for withdrawing coins ready to be signed and
     * executed with `signer-and-provider`.
     *
     * @param stake the stake object created in the requestAddStake txn
     * @param stakedCoinId the coins to withdraw
     * @param gasBudget omittable only for DevInspect mode
     */
    static newRequestWithdrawlStakeTxn(stake: string, stakedCoinId: string): Promise<TransactionBlock>;
}
//# sourceMappingURL=sui-system-state.d.ts.map
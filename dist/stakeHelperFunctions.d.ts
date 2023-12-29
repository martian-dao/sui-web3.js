import { DelegatedStake } from './types';
export declare const calculateStakeShare: (validatorStake: bigint, totalStake: bigint, decimalPlaces?: number) => number;
export declare function calculateAPY(apy: number, roundDecimals?: number): number;
export declare const getAllStakeSui: (allDelegation: DelegatedStake[]) => bigint;
export declare const getDelegationDataByStakeId: (delegationsStake: DelegatedStake[], stakeSuiId: string) => any;
export declare const getStakeSuiBySuiId: (allDelegation: DelegatedStake[], stakeSuiId?: string | null) => bigint;
export declare const getTokenStakeSuiForValidator: (allDelegation: DelegatedStake[], validatorAddress?: string | null) => bigint;
//# sourceMappingURL=stakeHelperFunctions.d.ts.map
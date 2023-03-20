import { SuiValidatorSummary, DelegatedStake } from './types';

import BigNumber from 'bignumber.js';

export const calculateStakeShare = (
  validatorStake: bigint,
  totalStake: bigint,
  decimalPlaces = 3,
) => {
  const bn = new BigNumber(validatorStake.toString());
  const bd = new BigNumber(totalStake.toString());
  const percentage = bn
    .div(bd)
    .multipliedBy(100)
    .decimalPlaces(decimalPlaces)
    .toNumber();
  return percentage;
};

export function calculateAPY(
  validator: SuiValidatorSummary,
  epoch: number,
  roundDecimals = 4,
) {
  let apy: any;
  const {
    stakingPoolSuiBalance,
    stakingPoolActivationEpoch,
    poolTokenBalance,
  } = validator;

  // If the staking pool is active then we calculate its APY. Or if staking started in epoch 0
  if (stakingPoolActivationEpoch || stakingPoolActivationEpoch === 0) {
    const numEpochsParticipated = epoch - stakingPoolActivationEpoch;
    apy =
      Math.pow(
        1 + (+stakingPoolSuiBalance - +poolTokenBalance) / +poolTokenBalance,
        365 / numEpochsParticipated,
      ) - 1;
  } else {
    apy = 0;
  }

  //guard against NaN
  const apyReturn = apy ? parseFloat(apy.toFixed(roundDecimals)) : 0;

  // guard against very large numbers (e.g. 1e+100)
  return apyReturn > 100_000 ? 0 : apyReturn;
}

// Get staked Sui
export const getAllStakeSui = (allDelegation: DelegatedStake[]) => {
  return (
    allDelegation.reduce(
      (acc, curr) =>
        curr.stakes.reduce(
          (total, { principal }) => total + BigInt(principal),
          acc,
        ),
      0n,
    ) || 0n
  );
};

// Helper function to get the delegation by stakedSuiId
export const getDelegationDataByStakeId = (
  delegationsStake: DelegatedStake[],
  stakeSuiId: string,
) => {
  let stake = null;
  for (const { stakes } of delegationsStake) {
    stake =
      stakes.find(({ stakedSuiId }) => stakedSuiId === stakeSuiId) || null;
    if (stake) return stake;
  }

  return stake;
};

// Get Stake SUI by stakeSuiId
export const getStakeSuiBySuiId = (
  allDelegation: DelegatedStake[],
  stakeSuiId?: string | null,
) => {
  return (
    allDelegation.reduce((acc, curr) => {
      const total = BigInt(
        curr.stakes.find(({ stakedSuiId }) => stakedSuiId === stakeSuiId)
          ?.principal || 0,
      );
      return total + acc;
    }, 0n) || 0n
  );
};

// Get total Stake SUI for a specific validator address
export const getTokenStakeSuiForValidator = (
  allDelegation: DelegatedStake[],
  validatorAddress?: string | null,
) => {
  return (
    allDelegation.reduce((acc, curr) => {
      if (validatorAddress === curr.validatorAddress) {
        return curr.stakes.reduce(
          (total, { principal }) => total + BigInt(principal),
          acc,
        );
      }
      return acc;
    }, 0n) || 0n
  );
};

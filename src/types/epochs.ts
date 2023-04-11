// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { array, boolean, Infer, nullable, object, string } from 'superstruct';
import { SuiValidatorSummary } from './validator';

export const EndOfEpochInfo = object({
  lastCheckpointId: string(),
  epochEndTimestamp: string(),
  protocolVersion: string(),
  referenceGasPrice: string(),
  totalStake: string(),
  storageFundReinvestment: string(),
  storageCharge: string(),
  storageRebate: string(),
  storageFundBalance: string(),
  stakeSubsidyAmount: string(),
  totalGasFees: string(),
  totalStakeRewardsDistributed: string(),
  leftoverStorageFundInflow: string(),
});

export type EndOfEpochInfo = Infer<typeof EndOfEpochInfo>;

export const EpochInfo = object({
  epoch: string(),
  validators: array(SuiValidatorSummary),
  epochTotalTransactions: string(),
  firstCheckpointId: string(),
  epochStartTimestamp: string(),
  endOfEpochInfo: nullable(EndOfEpochInfo),
});

export type EpochInfo = Infer<typeof EpochInfo>;

export const EpochPage = object({
  data: array(EpochInfo),
  nextCursor: nullable(string()),
  hasNextPage: boolean(),
});

export type EpochPage = Infer<typeof EpochPage>;

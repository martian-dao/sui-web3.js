// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type {
  SignableTransaction,
  SuiTransactionResponse,
} from "@mysten/sui.js";

/** The latest API version of the signAndExecuteTransaction API. */
export type SuiSignAndExecuteTransactionVersion = "1.0.0";

/**
 * A Wallet Standard feature for signing a transaction, and submitting it to the
 * network. The wallet is expected to submit the transaction to the network via RPC,
 * and return the transaction response.
 */
export type SuiSignAndExecuteTransactionFeature = {
  /** Namespace for the feature. */
  "sui:signAndExecuteTransaction": {
    /** Version of the feature API. */
    version: SuiSignAndExecuteTransactionVersion;
    signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  };
};

export type SuiSignAndExecuteTransactionMethod = (
  input: SuiSignAndExecuteTransactionInput
) => Promise<SuiSignAndExecuteTransactionOutput>;

/** Input for signing and sending transactions. */
export interface SuiSignAndExecuteTransactionInput {
  transaction: SignableTransaction;
  options?: SuiSignAndExecuteTransactionOptions;
}

/** Output of signing and sending transactions. */
export interface SuiSignAndExecuteTransactionOutput
  extends SuiTransactionResponse {}

/** Options for signing and sending transactions. */
export interface SuiSignAndExecuteTransactionOptions {}

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import fetch from 'cross-fetch';

import { FaucetResponse, SuiAddress } from '../types';
import { HttpHeaders } from './client';

export class FaucetRateLimitError extends Error {}

export async function requestSuiFromFaucet(
  endpoint: string,
  recipient: SuiAddress,
  httpHeaders?: HttpHeaders
): Promise<FaucetResponse> {
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      ...(httpHeaders || {}),
    },
  });

  if (res.status === 429) {
    throw new FaucetRateLimitError(
      `Too many requests from this client have been sent to the faucet. Please retry later`
    );
  }
  let parsed;
  try {
    parsed = await res.json();
  } catch (e) {
    throw new Error(
      `Ecountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`
    );
  }
  if (parsed.error) {
    throw new Error(`Faucet returns error: ${parsed.error}`);
  }
  return parsed;
}

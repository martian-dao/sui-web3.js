// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeAll } from 'vitest';
import { setup, TestToolbox } from './utils/setup';

describe('Object id/Address/Transaction digest validation', () => {
  let toolbox: TestToolbox;

  beforeAll(async () => {
    toolbox = await setup();
  });

  //Test that with invalid object id/address/digest, functions will throw an error before making a request to the rpc server
  it('Test all functions with invalid Sui Address', async () => {
    //empty id
    expect(toolbox.provider.getObjectsOwnedByAddress('')).rejects.toThrowError(
      /Invalid Sui address/,
    );

    //wrong id
    expect(
      toolbox.provider.queryTransactionsForAddressDeprecated('Wrong'),
    ).rejects.toThrowError(/Invalid Sui address/);
  });

  it('Test all functions with invalid Object Id', async () => {
    //empty id
    expect(toolbox.provider.getObject('')).rejects.toThrowError(
      /Invalid Sui Object id/,
    );

    //more than 20bytes
    expect(
      toolbox.provider.getDynamicFields(
        '0x0000000000000000000000004ce52ee7b659b610d59a1ced129291b3d0d4216322',
      ),
    ).rejects.toThrowError(/Invalid Sui Object id/);
    expect(
      toolbox.provider.queryTransactionsForObjectDeprecated(
        '0000000000000000000000004ce52ee7b659b610d59a1ced129291b3d0d421632',
      ),
    ).rejects.toThrowError(/Invalid Sui Object id/);

    //wrong batch request
    let objectIds = ['0xBABE', '0xCAFE', '0xWRONG', '0xFACE'];
    expect(toolbox.provider.getObjectBatch(objectIds)).rejects.toThrowError(
      /Invalid Sui Object id 0xWRONG/,
    );
  });

  it('Test all functions with invalid Transaction Digest', async () => {
    //empty digest
    expect(toolbox.provider.getTransactionResponse('')).rejects.toThrowError(
      /Invalid Transaction digest/,
    );

    //wrong batch request
    let digests = ['AQ7FA8JTGs368CvMkXj2iFz2WUWwzP6AAWgsLpPLxUmr', 'wrong'];
    expect(
      toolbox.provider.getTransactionResponseBatch(digests),
    ).rejects.toThrowError(/Invalid Transaction digest wrong/);
  });
});

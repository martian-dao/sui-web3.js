// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeAll } from 'vitest';
import { RawSigner, SuiObjectData, TransactionBlock } from '../../src';
import { publishPackage, setup, TestToolbox } from './utils/setup';

describe('Test dev inspect', () => {
  let toolbox: TestToolbox;
  let packageId: string;

  beforeAll(async () => {
    toolbox = await setup();
    const packagePath = __dirname + '/./data/serializer';
    ({ packageId } = await publishPackage(packagePath));
  });

  it('Dev inspect split + transfer', async () => {
    const tx = new TransactionBlock();
    const coin = tx.splitCoins(tx.gas, [tx.pure(10)]);
    tx.transferObjects([coin], tx.pure(toolbox.address()));
    await validateDevInspectTransaction(toolbox.signer, tx, 'success');
  });

  it('Move Call that returns struct', async () => {
    const coins = await toolbox.getGasObjectsOwnedByAddress();

    const tx = new TransactionBlock();
    const coin_0 = coins[0].data as SuiObjectData;
    const obj = tx.moveCall({
      target: `${packageId}::serializer_tests::return_struct`,
      typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
      arguments: [tx.pure(coin_0.objectId)],
    });

    // TODO: Ideally dev inspect transactions wouldn't need this, but they do for now
    tx.transferObjects([obj], tx.pure(toolbox.address()));

    await validateDevInspectTransaction(toolbox.signer, tx, 'success');
  });

  it('Move Call that aborts', async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageId}::serializer_tests::test_abort`,
      typeArguments: [],
      arguments: [],
    });

    await validateDevInspectTransaction(toolbox.signer, tx, 'failure');
  });
});

async function validateDevInspectTransaction(
  signer: RawSigner,
  transactionBlock: TransactionBlock,
  status: 'success' | 'failure',
) {
  const result = await signer.devInspectTransactionBlock({ transactionBlock });
  expect(result.effects.status.status).toEqual(status);
}

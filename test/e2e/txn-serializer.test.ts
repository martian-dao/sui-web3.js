// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeAll } from 'vitest';
import {
  getCreatedObjects,
  getObjectId,
  getSharedObjectInitialVersion,
  isMutableSharedObjectInput,
  isSharedObjectInput,
  ObjectId,
  SuiTransactionResponse,
  SUI_SYSTEM_STATE_OBJECT_ID,
  Transaction,
} from '../../src';
import { TransactionDataBuilder } from '../../src/builder/TransactionData';
import {
  DEFAULT_GAS_BUDGET,
  publishPackage,
  setup,
  TestToolbox,
} from './utils/setup';

describe('Transaction Serialization and deserialization', () => {
  let toolbox: TestToolbox;
  let packageId: ObjectId;
  let publishTxn: SuiTransactionResponse;
  let sharedObjectId: ObjectId;

  beforeAll(async () => {
    toolbox = await setup();
    const packagePath = __dirname + '/./data/serializer';
    ({ packageId, publishTxn } = await publishPackage(packagePath));
    const sharedObject = getCreatedObjects(publishTxn)!.filter(
      (o) => getSharedObjectInitialVersion(o.owner) !== undefined,
    )[0];
    sharedObjectId = getObjectId(sharedObject);
  });

  async function serializeAndDeserialize(tx: Transaction, mutable: boolean[]) {
    tx.setSender(await toolbox.address());
    tx.setGasBudget(DEFAULT_GAS_BUDGET);
    const transactionBytes = await tx.build({ provider: toolbox.provider });
    const deserializedTxnBuilder =
      TransactionDataBuilder.fromBytes(transactionBytes);
    expect(
      deserializedTxnBuilder.inputs
        .filter((i) => isSharedObjectInput(i.value))
        .map((i) => isMutableSharedObjectInput(i.value)),
    ).toStrictEqual(mutable);
    const reserializedTxnBytes = await deserializedTxnBuilder.build();
    expect(reserializedTxnBytes).toEqual(transactionBytes);
  }

  it('Move Shared Object Call with mutable reference', async () => {
    const coins = await toolbox.getGasObjectsOwnedByAddress();

    const [{ suiAddress: validatorAddress }] =
      await toolbox.getActiveValidators();

    const tx = new Transaction();
    tx.moveCall({
      target: '0x2::sui_system::request_add_stake',
      arguments: [
        tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
        tx.object(coins[2].objectId),
        tx.pure(validatorAddress),
      ],
    });
    await serializeAndDeserialize(tx, [true]);
  });

  it('Move Shared Object Call with immutable reference', async () => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::serializer_tests::value`,
      arguments: [tx.object(sharedObjectId)],
    });
    await serializeAndDeserialize(tx, [false]);
  });

  it('Move Shared Object Call with mixed usage of mutable and immutable references', async () => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::serializer_tests::value`,
      arguments: [tx.object(sharedObjectId)],
    });
    tx.moveCall({
      target: `${packageId}::serializer_tests::set_value`,
      arguments: [tx.object(sharedObjectId)],
    });
    await serializeAndDeserialize(tx, [true]);
  });
});

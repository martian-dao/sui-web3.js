// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeEach } from 'vitest';
import {
  Coin,
  getCreatedObjects,
  getExecutionStatusType,
  ObjectId,
  SuiObjectData,
  SUI_FRAMEWORK_ADDRESS,
  TransactionBlock,
} from '../../src';
import { publishPackage, setup, TestToolbox } from './utils/setup';

describe('Test Move call with a vector of objects as input', () => {
  let toolbox: TestToolbox;
  let packageId: ObjectId;

  async function mintObject(val: number) {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageId}::entry_point_vector::mint`,
      arguments: [tx.pure(String(val))],
    });
    const result = await toolbox.signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: {
        showEffects: true,
      },
    });
    expect(getExecutionStatusType(result)).toEqual('success');
    return getCreatedObjects(result)![0].reference.objectId;
  }

  async function destroyObjects(objects: ObjectId[]) {
    const tx = new TransactionBlock();
    const vec = tx.makeMoveVec({ objects: objects.map((id) => tx.object(id)) });
    tx.moveCall({
      target: `${packageId}::entry_point_vector::two_obj_vec_destroy`,
      arguments: [vec],
    });
    const result = await toolbox.signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: {
        showEffects: true,
      },
    });
    expect(getExecutionStatusType(result)).toEqual('success');
  }

  beforeEach(async () => {
    toolbox = await setup();
    const packagePath =
      __dirname +
      '/../../../../crates/sui-core/src/unit_tests/data/entry_point_vector';
    ({ packageId } = await publishPackage(packagePath));
  });

  it('Test object vector', async () => {
    await destroyObjects([await mintObject(7), await mintObject(42)]);
  });

  it('Test regular arg mixed with object vector arg', async () => {
    const coins = await toolbox.getGasObjectsOwnedByAddress();
    const coin = coins[3].data as SuiObjectData;
    const coinIDs = coins.map((coin) => Coin.getID(coin));
    const tx = new TransactionBlock();
    const vec = tx.makeMoveVec({
      objects: [tx.object(coinIDs[1]), tx.object(coinIDs[2])],
    });
    tx.moveCall({
      target: `${SUI_FRAMEWORK_ADDRESS}::pay::join_vec`,
      typeArguments: ['0x2::sui::SUI'],
      arguments: [tx.object(coinIDs[0]), vec],
    });
    tx.setGasPayment([coin]);
    const result = await toolbox.signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: {
        showEffects: true,
      },
    });
    expect(getExecutionStatusType(result)).toEqual('success');
  });
});

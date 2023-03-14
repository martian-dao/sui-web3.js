// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { toB58 } from '@mysten/bcs';
import { it, expect } from 'vitest';
import {
  builder,
  PROGRAMMABLE_CALL,
  MoveCallCommand,
  COMMAND,
  TransferObjectsCommand,
} from '..';
import { normalizeSuiAddress } from '../../types';

// Oooh-weeee we nailed it!
it('can serialize simplified programmable call struct', () => {
  const moveCall: MoveCallCommand = {
    kind: 'MoveCall',
    target: '0x2::display::new',
    typeArguments: ['0x6::capy::Capy'],
    arguments: [
      { kind: 'GasCoin' },
      {
        kind: 'NestedResult',
        index: 0,
        resultIndex: 1,
      },
      // @ts-ignore
      { kind: 'Input', index: 3 },
      { kind: 'Result', index: 1 },
    ],
  };

  const bytes = builder.ser(PROGRAMMABLE_CALL, moveCall).toBytes();
  const result: MoveCallCommand = builder.de(PROGRAMMABLE_CALL, bytes);

  // since we normalize addresses when (de)serializing, the returned value differs
  // only check the module and the function; ignore address comparison (it's not an issue
  // with non-0x2 addresses).
  expect(result.arguments).toEqual(moveCall.arguments);
  expect(result.target.split('::').slice(1)).toEqual(
    moveCall.target.split('::').slice(1),
  );
  expect(result.typeArguments[0].split('::').slice(1)).toEqual(
    moveCall.typeArguments[0].split('::').slice(1),
  );
});

it('can serialize enum with "kind" property', () => {
  const command = {
    kind: 'TransferObjects',
    objects: [],
    address: { kind: 'Input', index: 0 },
  };

  const bytes = builder.ser(COMMAND, command).toBytes();
  const result: TransferObjectsCommand = builder.de(COMMAND, bytes);

  expect(result).toEqual(command);
});

function ref(): { objectId: string; version: bigint; digest: string } {
  return {
    objectId: (Math.random() * 100000).toFixed(0).padEnd(64, '0'),
    version: BigInt((Math.random() * 10000).toFixed(0)),
    digest: toB58(
      new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      ]),
    ),
  };
}

it('can serialize transaction data with a programmable transaction', () => {
  let sui = normalizeSuiAddress('0x2').replace('0x', '');
  let txData = {
    V1: {
      sender: normalizeSuiAddress('0xBAD').replace('0x', ''),
      expiration: { None: true },
      gasData: {
        payment: [ref()],
        owner: sui,
        price: 1n,
        budget: 1000000n,
      },
      kind: {
        ProgrammableTransaction: {
          inputs: [
            // first argument is the publisher object
            { Object: { ImmOrOwned: ref() } },
            // second argument is a vector of names
            {
              Pure: Array.from(
                builder
                  .ser('vector<string>', ['name', 'description', 'img_url'])
                  .toBytes(),
              ),
            },
            // third argument is a vector of values
            {
              Pure: Array.from(
                builder
                  .ser('vector<string>', [
                    'Capy {name}',
                    'A cute little creature',
                    'https://api.capy.art/{id}/svg',
                  ])
                  .toBytes(),
              ),
            },
            // 4th and last argument is the account address to send display to
            {
              Pure: Array.from(
                builder.ser('address', ref().objectId).toBytes(),
              ),
            },
          ],
          commands: [
            {
              kind: 'MoveCall',
              target: `${sui}::display::new`,
              typeArguments: [`${sui}::capy::Capy`],
              arguments: [
                // publisher object
                { kind: 'Input', index: 0 },
              ],
            },
            {
              kind: 'MoveCall',
              target: `${sui}::display::add_multiple`,
              typeArguments: [`${sui}::capy::Capy`],
              arguments: [
                // result of the first command
                { kind: 'Result', index: 0 },
                // second argument - vector of names
                { kind: 'Input', index: 1 },
                // third argument - vector of values
                { kind: 'Input', index: 2 },
              ],
            },
            {
              kind: 'MoveCall',
              target: `${sui}::display::update_version`,
              typeArguments: [`${sui}::capy::Capy`],
              arguments: [
                // result of the first command again
                { kind: 'Result', index: 0 },
              ],
            },
            {
              kind: 'TransferObjects',
              objects: [
                // the display object
                { kind: 'Result', index: 0 },
              ],
              // address is also an input
              address: { kind: 'Input', index: 3 },
            },
          ],
        },
      },
    },
  };

  const type = 'TransactionData';
  const bytes = builder.ser(type, txData).toBytes();
  const result = builder.de(type, bytes);
  expect(result).toEqual(txData);
});

"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const bcs_1 = require("@mysten/bcs");
const vitest_1 = require("vitest");
const index_1 = require("../index");
const Inputs_1 = require("../Inputs");
(0, vitest_1.it)('can construct and serialize an empty tranaction', () => {
    const tx = new index_1.TransactionBlock();
    (0, vitest_1.expect)(() => tx.serialize()).not.toThrow();
});
(0, vitest_1.it)('can be serialized and deserialized to the same values', () => {
    const tx = new index_1.TransactionBlock();
    tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(100)]));
    const serialized = tx.serialize();
    const tx2 = index_1.TransactionBlock.from(serialized);
    (0, vitest_1.expect)(serialized).toEqual(tx2.serialize());
});
(0, vitest_1.it)('allows transfer with the result of split transactions', () => {
    const tx = new index_1.TransactionBlock();
    const coin = tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(100)]));
    tx.add(index_1.Transactions.TransferObjects([coin], tx.object('0x2')));
});
(0, vitest_1.it)('supports nested results through either array index or destructuring', () => {
    const tx = new index_1.TransactionBlock();
    const registerResult = tx.add(index_1.Transactions.MoveCall({
        target: '0x2::game::register',
    }));
    const [nft, account] = registerResult;
    // NOTE: This might seem silly but destructuring works differently than property access.
    (0, vitest_1.expect)(nft).toBe(registerResult[0]);
    (0, vitest_1.expect)(account).toBe(registerResult[1]);
});
(0, vitest_1.describe)('offline build', () => {
    (0, vitest_1.it)('builds an empty transaction offline when provided sufficient data', async () => {
        const tx = setup();
        await tx.build();
    });
    (0, vitest_1.it)('supports epoch expiration', async () => {
        const tx = setup();
        tx.setExpiration({ Epoch: 1 });
        await tx.build();
    });
    (0, vitest_1.it)('builds a split transaction', async () => {
        const tx = setup();
        tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(Inputs_1.Inputs.Pure(100, 'u64'))]));
        await tx.build();
    });
    (0, vitest_1.it)('breaks reference equality', () => {
        const tx = setup();
        const tx2 = new index_1.TransactionBlock(tx);
        tx.setGasBudget(999);
        // Ensure that setting budget after a clone does not affect the original:
        (0, vitest_1.expect)(tx2.blockData).not.toEqual(tx.blockData);
        // Ensure `blockData` always breaks reference equality:
        (0, vitest_1.expect)(tx.blockData).not.toBe(tx.blockData);
        (0, vitest_1.expect)(tx.blockData.gasConfig).not.toBe(tx.blockData.gasConfig);
        (0, vitest_1.expect)(tx.blockData.transactions).not.toBe(tx.blockData.transactions);
        (0, vitest_1.expect)(tx.blockData.inputs).not.toBe(tx.blockData.inputs);
    });
    (0, vitest_1.it)('can determine the type of inputs for built-in transactions', async () => {
        const tx = setup();
        tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(100)]));
        await tx.build();
    });
    (0, vitest_1.it)('supports pre-serialized inputs as Uint8Array', async () => {
        const tx = setup();
        const inputBytes = index_1.builder.ser('u64', 100n).toBytes();
        // Use bytes directly in pure value:
        tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(inputBytes)]));
        // Use bytes in input helper:
        tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(Inputs_1.Inputs.Pure(inputBytes))]));
        await tx.build();
    });
    (0, vitest_1.it)('builds a more complex interaction', async () => {
        const tx = setup();
        const coin = tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(100)]));
        tx.add(index_1.Transactions.MergeCoins(tx.gas, [
            coin,
            tx.object(Inputs_1.Inputs.ObjectRef(ref())),
        ]));
        tx.add(index_1.Transactions.MoveCall({
            target: '0x2::devnet_nft::mint',
            typeArguments: [],
            arguments: [
                tx.pure(Inputs_1.Inputs.Pure('foo', 'string')),
                tx.pure(Inputs_1.Inputs.Pure('bar', 'string')),
                tx.pure(Inputs_1.Inputs.Pure('baz', 'string')),
            ],
        }));
        await tx.build();
    });
    (0, vitest_1.it)('builds a more complex interaction', async () => {
        const tx = setup();
        const coin = tx.add(index_1.Transactions.SplitCoins(tx.gas, [tx.pure(100)]));
        tx.add(index_1.Transactions.MergeCoins(tx.gas, [
            coin,
            tx.object(Inputs_1.Inputs.ObjectRef(ref())),
        ]));
        tx.add(index_1.Transactions.MoveCall({
            target: '0x2::devnet_nft::mint',
            typeArguments: [],
            arguments: [
                tx.pure(Inputs_1.Inputs.Pure('foo', 'string')),
                tx.pure(Inputs_1.Inputs.Pure('bar', 'string')),
                tx.pure(Inputs_1.Inputs.Pure('baz', 'string')),
            ],
        }));
        const bytes = await tx.build();
        const tx2 = index_1.TransactionBlock.from(bytes);
        const bytes2 = await tx2.build();
        (0, vitest_1.expect)(bytes).toEqual(bytes2);
    });
});
function ref() {
    return {
        objectId: (Math.random() * 100000).toFixed(0).padEnd(64, '0'),
        version: String((Math.random() * 10000).toFixed(0)),
        digest: (0, bcs_1.toB58)(new Uint8Array([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ])),
    };
}
function setup() {
    const tx = new index_1.TransactionBlock();
    tx.setSender('0x2');
    tx.setGasPrice(5);
    tx.setGasBudget(100);
    tx.setGasPayment([ref()]);
    return tx;
}
//# sourceMappingURL=Transaction.test.js.map
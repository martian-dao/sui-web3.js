// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import nacl from 'tweetnacl';
import { describe, it, expect } from 'vitest';
import {
  Base64DataBuffer,
  Ed25519Keypair,
  RawSigner,
  Secp256k1Keypair,
} from '../../../src';
import * as secp from '@noble/secp256k1';
import { Signature } from '@noble/secp256k1';

describe('RawSigner', () => {
  it('Ed25519 keypair signData', async () => {
    const keypair = new Ed25519Keypair();
    const signData = new Base64DataBuffer(
      new TextEncoder().encode('hello world')
    );
    const signer = new RawSigner(keypair);
    const { signature, pubKey } = await signer.signData(signData);
    const isValid = nacl.sign.detached.verify(
      signData.getData(),
      signature.getData(),
      pubKey.toBytes()
    );
    expect(isValid).toBeTruthy();
  });

  it('Secp256k1 keypair signData', async () => {
    const keypair = new Secp256k1Keypair();
    const signData = new Base64DataBuffer(
      new TextEncoder().encode('hello world')
    );
    const msgHash = await secp.utils.sha256(signData.getData());
    const signer = new RawSigner(keypair);
    const { signature, pubKey } = await signer.signData(signData);
    const recovered_pubkey = secp.recoverPublicKey(
      msgHash,
      Signature.fromCompact(signature.getData().slice(0, 64)),
      signature.getData()[64],
      true
    );
    const expected = keypair.getPublicKey().toBase64();
    expect(pubKey.toBase64()).toEqual(expected);
    expect(Buffer.from(recovered_pubkey).toString('base64')).toEqual(expected);
  });
});

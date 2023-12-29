// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { blake2b } from '@noble/hashes/blake2b';
import type { Keypair } from '../cryptography/keypair';
import { toSerializedSignature } from '../cryptography/signature';
import type { SerializedSignature } from '../cryptography/signature';
import type { JsonRpcProvider } from '../providers/json-rpc-provider';
import { SignerWithProvider } from './signer-with-provider';
import type { SuiClient } from '../client/index';

export class RawSigner extends SignerWithProvider {
  private readonly keypair: Keypair;

  constructor(keypair: Keypair, client: JsonRpcProvider | SuiClient) {
    super(client);
    this.keypair = keypair;
  }

  async getAddress(): Promise<string> {
    return this.keypair.getPublicKey().toSuiAddress();
  }

  static async getDigest(data: Uint8Array): Promise<Uint8Array> {
    return blake2b(data, { dkLen: 32 });
  }

  async getSerializedSignature(signature: Uint8Array): Promise<SerializedSignature> {
    const signatureScheme = this.keypair.getKeyScheme();
    const pubkey = this.keypair.getPublicKey();
    return toSerializedSignature({
      signatureScheme,
      signature,
      pubKey: pubkey,
    });
  }

  async signData(data: Uint8Array): Promise<SerializedSignature> {
    const pubkey = this.keypair.getPublicKey();
    const digest = blake2b(data, { dkLen: 32 });
    const signature = this.keypair.signData(digest);
    const signatureScheme = this.keypair.getKeyScheme();

    return toSerializedSignature({
      signatureScheme,
      signature,
      pubKey: pubkey,
    });
  }

  connect(client: SuiClient | JsonRpcProvider): SignerWithProvider {
    return new RawSigner(this.keypair, client);
  }
}

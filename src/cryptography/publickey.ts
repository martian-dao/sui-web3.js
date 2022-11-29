// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/**
 * Value to be converted into public key.
 */
export type PublicKeyInitData = string | Uint8Array | Iterable<number>;

export function bytesEqual(a: Uint8Array, b: Uint8Array) {
  if (a === b) return true;

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/**
 * A keypair used for signing transactions.
 */
export type SignatureScheme = 'ED25519' | 'Secp256k1';

export const SIGNATURE_SCHEME_TO_FLAG = {
  ED25519: 0x00,
  Secp256k1: 0x01,
};

/**
 * A public key
 */
export interface PublicKey {
  /**
   * Checks if two public keys are equal
   */
  equals(publicKey: PublicKey): boolean;

  /**
   * Return the base-64 representation of the public key
   */
  toBase64(): string;

  /**
   * Return the byte array representation of the public key
   */
  toBytes(): Uint8Array;

  /**
   * Return the base-64 representation of the public key
   */
  toString(): string;

  /**
   * Return the Sui address associated with this public key
   */
  toSuiAddress(): string;
}

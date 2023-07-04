// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64, toB64 } from '@mysten/bcs';
import { blake2b } from '@noble/hashes/blake2b';
import { bytesToHex } from '@noble/hashes/utils';
import { normalizeSuiAddress, SUI_ADDRESS_LENGTH } from '../../types/index';
import type { PublicKey, PublicKeyInitData } from '../../cryptography/publickey';
import { bytesEqual } from '../../cryptography/publickey';
import { SIGNATURE_SCHEME_TO_FLAG } from '../../cryptography/signature';

const SECP256K1_PUBLIC_KEY_SIZE = 33;

/**
 * A Secp256k1 public key
 */
export class Secp256k1PublicKey implements PublicKey {
	static SIZE = SECP256K1_PUBLIC_KEY_SIZE;
	private data: Uint8Array;

	/**
	 * Create a new Secp256k1PublicKey object
	 * @param value secp256k1 public key as buffer or base-64 encoded string
	 */
	constructor(value: PublicKeyInitData) {
		if (typeof value === 'string') {
			this.data = fromB64(value);
		} else if (value instanceof Uint8Array) {
			this.data = value;
		} else {
			this.data = Uint8Array.from(value);
		}

		if (this.data.length !== SECP256K1_PUBLIC_KEY_SIZE) {
			throw new Error(
				`Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`,
			);
		}
	}

	/**
	 * Checks if two Secp256k1 public keys are equal
	 */
	equals(publicKey: Secp256k1PublicKey): boolean {
		return bytesEqual(this.toBytes(), publicKey.toBytes());
	}

	/**
	 * Return the base-64 representation of the Secp256k1 public key
	 */
	toBase64(): string {
		return toB64(this.toBytes());
	}

	/**
	 * Return the byte array representation of the Secp256k1 public key
	 */
	toBytes(): Uint8Array {
		return this.data;
	}

	/**
	 * Return the base-64 representation of the Secp256k1 public key
	 */
	toString(): string {
		return this.toBase64();
	}

	/**
	 * Return the Sui address associated with this Secp256k1 public key
	 */
	toSuiAddress(): string {
		let tmp = new Uint8Array(SECP256K1_PUBLIC_KEY_SIZE + 1);
		tmp.set([SIGNATURE_SCHEME_TO_FLAG['Secp256k1']]);
		tmp.set(this.toBytes(), 1);
		// Each hex char represents half a byte, hence hex address doubles the length
		return normalizeSuiAddress(
			bytesToHex(blake2b(tmp, { dkLen: 32 })).slice(0, SUI_ADDRESS_LENGTH * 2),
		);
	}

	/**
	 * Return the Sui address associated with this Secp256k1 public key
	 */
	flag(): number {
		return SIGNATURE_SCHEME_TO_FLAG['Secp256k1'];
	}
}

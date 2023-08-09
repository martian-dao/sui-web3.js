// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64 } from '@mysten/bcs';
import { IntentScope } from '../cryptography/intent';
import { messageWithIntent } from '../cryptography/intent';
import type { SerializedSignature } from '../cryptography/signature';
import { blake2b } from '@noble/hashes/blake2b';
import { toSingleSignaturePubkeyPair } from '../cryptography/utils';
import { bcs } from '../bcs/index';

// TODO: This might actually make sense to eventually move to the `Keypair` instances themselves, as
// it could allow the Sui to be tree-shaken a little better, possibly allowing keypairs that are
// not used (and their deps) to be entirely removed from the bundle.

/** Verify data that is signed with the expected scope. */
export async function verifyMessage(
  message: Uint8Array | string,
  serializedSignature: SerializedSignature,
  scope: IntentScope,
) {
  const signature = toSingleSignaturePubkeyPair(serializedSignature);

  if (scope === IntentScope.PersonalMessage) {
    const messageBytes = messageWithIntent(
      scope,
      bcs
        .ser(
          ['vector', 'u8'],
          typeof message === 'string' ? fromB64(message) : message,
        )
        .toBytes(),
    );

    if (
      await signature.pubKey.verify(
        blake2b(messageBytes, { dkLen: 32 }),
        signature.signature,
      )
    ) {
      return true;
    }

    // Fallback for backwards compatibility, old versions of the SDK
    // did not properly wrap PersonalMessages in a PersonalMessage bcs Struct
    const unwrappedMessageBytes = messageWithIntent(
      scope,
      typeof message === 'string' ? fromB64(message) : message,
    );

    return signature.pubKey.verify(
      blake2b(unwrappedMessageBytes, { dkLen: 32 }),
      signature.signature,
    );
  }

  const messageBytes = messageWithIntent(
    scope,
    typeof message === 'string' ? fromB64(message) : message,
  );

  return signature.pubKey.verify(
    blake2b(messageBytes, { dkLen: 32 }),
    signature.signature,
  );
}

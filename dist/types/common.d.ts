import { ObjectId } from './objects';
import { TransactionData } from './sui-bcs';
import { PublicKey, PublicKeyInitData, SignatureScheme } from '../cryptography/publickey';
import { Base64DataBuffer } from '../serialization/base64';
export declare type TransactionDigest = string;
export declare type SuiAddress = string;
export declare type ObjectOwner = {
    AddressOwner: SuiAddress;
} | {
    ObjectOwner: SuiAddress;
} | {
    Shared: {
        initial_shared_version: number;
    };
} | 'Immutable';
/** Returns whether the tx digest is valid based on the serialization format */
export declare function isValidTransactionDigest(value: string, serializationFmt: 'base64' | 'base58'): value is TransactionDigest;
export declare const SUI_ADDRESS_LENGTH = 20;
export declare function isValidSuiAddress(value: string): value is SuiAddress;
export declare function isValidSuiObjectId(value: string): boolean;
/**
 * Perform the following operations:
 * 1. Make the address lower case
 * 2. Prepend `0x` if the string does not start with `0x`.
 * 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
 *
 * WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
 * is to treat the first `0x` not as part of the address. The default behavior can be overridden by
 * setting `forceAdd0x` to true
 *
 */
export declare function normalizeSuiAddress(value: string, forceAdd0x?: boolean): SuiAddress;
export declare function normalizeSuiObjectId(value: string, forceAdd0x?: boolean): ObjectId;
/**
 * Generate transaction digest.
 *
 * @param data transaction data
 * @param signatureScheme signature scheme
 * @param signature signature as a base64 string
 * @param publicKey public key
 */
export declare function generateTransactionDigest(data: TransactionData, signatureScheme: SignatureScheme, signature: string | Base64DataBuffer, publicKey: PublicKeyInitData | PublicKey, serializationFmt: 'base64' | 'base58', excludeSig?: boolean): string;
//# sourceMappingURL=common.d.ts.map
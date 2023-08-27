import type { Infer } from 'superstruct';
import type { CallArg } from '../bcs/index';
/** @deprecated Use `string` instead. */
export declare const TransactionDigest: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type TransactionDigest = Infer<typeof TransactionDigest>;
/** @deprecated Use `string` instead. */
export declare const TransactionEffectsDigest: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type TransactionEffectsDigest = Infer<typeof TransactionEffectsDigest>;
/** @deprecated Use `string` instead. */
export declare const TransactionEventDigest: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type TransactionEventDigest = Infer<typeof TransactionEventDigest>;
/** @deprecated Use `string` instead. */
export declare const ObjectId: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type ObjectId = Infer<typeof ObjectId>;
/** @deprecated Use `string` instead. */
export declare const SuiAddress: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type SuiAddress = Infer<typeof SuiAddress>;
/** @deprecated Use `string` instead. */
export declare const SequenceNumber: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type SequenceNumber = Infer<typeof SequenceNumber>;
export declare const ObjectOwner: import("superstruct").Struct<{
    AddressOwner: string;
} | {
    ObjectOwner: string;
} | {
    Shared: {
        initial_shared_version: string;
    };
} | "Immutable", null>;
export type ObjectOwner = Infer<typeof ObjectOwner>;
export type SuiJsonValue = boolean | number | string | CallArg | Array<SuiJsonValue>;
export declare const SuiJsonValue: import("superstruct").Struct<SuiJsonValue, null>;
export declare const ProtocolConfig: import("superstruct").Struct<{
    attributes: Record<string, {
        u32: string;
    } | {
        u64: string;
    } | {
        f64: string;
    }>;
    featureFlags: Record<string, boolean>;
    maxSupportedProtocolVersion: string;
    minSupportedProtocolVersion: string;
    protocolVersion: string;
}, {
    attributes: import("superstruct").Struct<Record<string, {
        u32: string;
    } | {
        u64: string;
    } | {
        f64: string;
    }>, null>;
    featureFlags: import("superstruct").Struct<Record<string, boolean>, null>;
    maxSupportedProtocolVersion: import("superstruct").Struct<string, null>;
    minSupportedProtocolVersion: import("superstruct").Struct<string, null>;
    protocolVersion: import("superstruct").Struct<string, null>;
}>;
export type ProtocolConfig = Infer<typeof ProtocolConfig>;
//# sourceMappingURL=common.d.ts.map
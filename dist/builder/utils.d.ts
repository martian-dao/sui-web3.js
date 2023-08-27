import type { Struct } from 'superstruct';
export declare function create<T, S>(value: T, struct: Struct<T, S>): T;
export type WellKnownEncoding = {
    kind: 'object';
} | {
    kind: 'pure';
    type: string;
};
export declare const TRANSACTION_TYPE: unique symbol;
//# sourceMappingURL=utils.d.ts.map
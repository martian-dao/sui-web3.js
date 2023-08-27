import type { SerializedSignature } from '../cryptography/signature';
export type SignedTransaction = {
    transactionBlockBytes: string;
    signature: SerializedSignature;
};
export type SignedMessage = {
    messageBytes: string;
    signature: SerializedSignature;
};
//# sourceMappingURL=types.d.ts.map
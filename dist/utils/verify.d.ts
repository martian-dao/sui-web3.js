import { IntentScope } from '../cryptography/intent';
import type { SerializedSignature } from '../cryptography/signature';
/** Verify data that is signed with the expected scope. */
export declare function verifyMessage(message: Uint8Array | string, serializedSignature: SerializedSignature, scope: IntentScope): Promise<boolean>;
//# sourceMappingURL=verify.d.ts.map
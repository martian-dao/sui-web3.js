export declare enum AppId {
    Sui = 0
}
export declare enum IntentVersion {
    V0 = 0
}
export declare enum IntentScope {
    TransactionData = 0,
    TransactionEffects = 1,
    CheckpointSummary = 2,
    PersonalMessage = 3
}
export type Intent = [IntentScope, IntentVersion, AppId];
export declare function messageWithIntent(scope: IntentScope, message: Uint8Array): Uint8Array;
//# sourceMappingURL=intent.d.ts.map
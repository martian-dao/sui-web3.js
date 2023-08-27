"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageWithIntent = exports.IntentScope = exports.IntentVersion = exports.AppId = void 0;
// See: sui/crates/sui-types/src/intent.rs
var AppId;
(function (AppId) {
    AppId[AppId["Sui"] = 0] = "Sui";
})(AppId || (exports.AppId = AppId = {}));
var IntentVersion;
(function (IntentVersion) {
    IntentVersion[IntentVersion["V0"] = 0] = "V0";
})(IntentVersion || (exports.IntentVersion = IntentVersion = {}));
var IntentScope;
(function (IntentScope) {
    IntentScope[IntentScope["TransactionData"] = 0] = "TransactionData";
    IntentScope[IntentScope["TransactionEffects"] = 1] = "TransactionEffects";
    IntentScope[IntentScope["CheckpointSummary"] = 2] = "CheckpointSummary";
    IntentScope[IntentScope["PersonalMessage"] = 3] = "PersonalMessage";
})(IntentScope || (exports.IntentScope = IntentScope = {}));
function intentWithScope(scope) {
    return [scope, IntentVersion.V0, AppId.Sui];
}
function messageWithIntent(scope, message) {
    const intent = intentWithScope(scope);
    const intentMessage = new Uint8Array(intent.length + message.length);
    intentMessage.set(intent);
    intentMessage.set(message, intent.length);
    return intentMessage;
}
exports.messageWithIntent = messageWithIntent;
//# sourceMappingURL=intent.js.map
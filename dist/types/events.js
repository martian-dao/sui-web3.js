"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventPackage = exports.getEventSender = exports.PaginatedEvents = exports.SuiEvent = exports.EventId = void 0;
const superstruct_1 = require("superstruct");
exports.EventId = (0, superstruct_1.object)({
    txDigest: (0, superstruct_1.string)(),
    eventSeq: (0, superstruct_1.string)(),
});
// event types mirror those in "sui-json-rpc-types/src/sui_event.rs"
exports.SuiEvent = (0, superstruct_1.object)({
    id: exports.EventId,
    // Move package where this event was emitted.
    packageId: (0, superstruct_1.string)(),
    // Move module where this event was emitted.
    transactionModule: (0, superstruct_1.string)(),
    // Sender's Sui address.
    sender: (0, superstruct_1.string)(),
    // Move event type.
    type: (0, superstruct_1.string)(),
    // Parsed json value of the event
    parsedJson: (0, superstruct_1.optional)((0, superstruct_1.record)((0, superstruct_1.string)(), (0, superstruct_1.any)())),
    // Base 58 encoded bcs bytes of the move event
    bcs: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    timestampMs: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.PaginatedEvents = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)(exports.SuiEvent),
    nextCursor: (0, superstruct_1.nullable)(exports.EventId),
    hasNextPage: (0, superstruct_1.boolean)(),
});
/* ------------------------------- EventData ------------------------------ */
function getEventSender(event) {
    return event.sender;
}
exports.getEventSender = getEventSender;
function getEventPackage(event) {
    return event.packageId;
}
exports.getEventPackage = getEventPackage;
//# sourceMappingURL=events.js.map
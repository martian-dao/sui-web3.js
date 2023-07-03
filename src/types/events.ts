// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Infer } from 'superstruct';
import {
  object,
  string,
  array,
  record,
  any,
  optional,
  boolean,
  nullable,
} from 'superstruct';
import type { SuiJsonValue } from './common';
import {
  ObjectId,
  SuiAddress,
  TransactionDigest,
  SequenceNumber,
} from './common';

export const EventId = object({
  txDigest: TransactionDigest,
  eventSeq: SequenceNumber,
});

// event types mirror those in "sui-json-rpc-types/src/sui_event.rs"

export const SuiEvent = object({
  id: EventId,
  // Move package where this event was emitted.
  packageId: ObjectId,
  // Move module where this event was emitted.
  transactionModule: string(),
  // Sender's Sui address.
  sender: SuiAddress,
  // Move event type.
  type: string(),
  // Parsed json value of the event
  parsedJson: optional(record(string(), any())),
  // Base 58 encoded bcs bytes of the move event
  bcs: optional(string()),
  timestampMs: optional(string()),
});

export type SuiEvent = Infer<typeof SuiEvent>;

export type MoveEventField = {
  path: string;
  value: SuiJsonValue;
};

/**
 * Sequential event ID, ie (transaction seq number, event seq number).
 * 1) Serves as a unique event ID for each fullnode
 * 2) Also serves to sequence events for the purposes of pagination and querying.
 *    A higher id is an event seen later by that fullnode.
 * This ID is the "cursor" for event querying.
 */
export type EventId = Infer<typeof EventId>;

// mirrors sui_json_rpc_types::SuiEventFilter
export type SuiEventFilter =
  | { Package: ObjectId }
  | { MoveModule: { package: ObjectId; module: string } }
  | { MoveEventType: string }
  | { MoveEventField: MoveEventField }
  | { Transaction: TransactionDigest }
  | {
      TimeRange: {
        // left endpoint of time interval, milliseconds since epoch, inclusive
        startTime: string;
        // right endpoint of time interval, milliseconds since epoch, exclusive
        endTime: string;
      };
    }
  | { Sender: SuiAddress }
  | { All: SuiEventFilter[] }
  | { Any: SuiEventFilter[] }
  | { And: [SuiEventFilter, SuiEventFilter] }
  | { Or: [SuiEventFilter, SuiEventFilter] };

export const PaginatedEvents = object({
  data: array(SuiEvent),
  nextCursor: nullable(EventId),
  hasNextPage: boolean(),
});
export type PaginatedEvents = Infer<typeof PaginatedEvents>;

/* ------------------------------- EventData ------------------------------ */

export function getEventSender(event: SuiEvent): SuiAddress {
  return event.sender;
}

export function getEventPackage(event: SuiEvent): ObjectId {
  return event.packageId;
}

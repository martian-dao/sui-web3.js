// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
  object,
  number,
  string,
  bigint,
  union,
  literal,
  Infer,
  array,
  record,
  any,
  optional,
  boolean,
} from 'superstruct';
import {
  ObjectId,
  ObjectOwner,
  SuiAddress,
  TransactionDigest,
  SuiJsonValue,
  SequenceNumber,
} from './common';

export const BalanceChangeType = union([
  literal('Gas'),
  literal('Pay'),
  literal('Receive'),
]);

export type BalanceChangeType = Infer<typeof BalanceChangeType>;

// event types mirror those in "sui-json-rpc-types/lib.rs"
export const MoveEvent = object({
  packageId: ObjectId,
  transactionModule: string(),
  sender: SuiAddress,
  type: string(),
  fields: record(string(), any()),
  bcs: string(),
});

export type MoveEvent = Infer<typeof MoveEvent>;

export const PublishEvent = object({
  sender: SuiAddress,
  packageId: ObjectId,
  version: optional(number()),
  digest: optional(string()),
});

export type PublishEvent = Infer<typeof PublishEvent>;

export const CoinBalanceChangeEvent = object({
  packageId: ObjectId,
  transactionModule: string(),
  sender: SuiAddress,
  owner: ObjectOwner,
  changeType: BalanceChangeType,
  coinType: string(),
  coinObjectId: ObjectId,
  version: SequenceNumber,
  amount: number(),
});

export type CoinBalanceChangeEvent = Infer<typeof CoinBalanceChangeEvent>;

export const TransferObjectEvent = object({
  packageId: ObjectId,
  transactionModule: string(),
  sender: SuiAddress,
  recipient: ObjectOwner,
  objectType: string(),
  objectId: ObjectId,
  version: SequenceNumber,
});

export type TransferObjectEvent = Infer<typeof TransferObjectEvent>;

export const MutateObjectEvent = object({
  packageId: ObjectId,
  transactionModule: string(),
  sender: SuiAddress,
  objectType: string(),
  objectId: ObjectId,
  version: SequenceNumber,
});

export type MutateObjectEvent = Infer<typeof MutateObjectEvent>;

export const DeleteObjectEvent = object({
  packageId: ObjectId,
  transactionModule: string(),
  sender: SuiAddress,
  objectId: ObjectId,
  version: SequenceNumber,
});

export type DeleteObjectEvent = Infer<typeof DeleteObjectEvent>;

export const NewObjectEvent = object({
  packageId: ObjectId,
  transactionModule: string(),
  sender: SuiAddress,
  recipient: ObjectOwner,
  objectType: string(),
  objectId: ObjectId,
  version: SequenceNumber,
});

export type NewObjectEvent = Infer<typeof NewObjectEvent>;

// TODO: Figure out if these actually can be bigint:
export const EpochChangeEvent = union([bigint(), number()]);
export type EpochChangeEvent = Infer<typeof EpochChangeEvent>;

export const CheckpointEvent = union([bigint(), number()]);
export type CheckpointEvent = Infer<typeof EpochChangeEvent>;

export const SuiEvent = union([
  object({ type: literal('moveEvent'), content: MoveEvent }),
  object({ type: literal('publish'), content: PublishEvent }),
  object({
    type: literal('coinBalanceChange'),
    content: CoinBalanceChangeEvent,
  }),
  object({ type: literal('transferObject'), content: TransferObjectEvent }),
  object({ type: literal('mutateObject'), content: MutateObjectEvent }),
  object({ type: literal('deleteObject'), content: DeleteObjectEvent }),
  object({ type: literal('newObject'), content: NewObjectEvent }),
  object({ type: literal('epochChange'), content: EpochChangeEvent }),
  object({ type: literal('checkpoint'), content: CheckpointEvent }),
]);
export type SuiEvent = Infer<typeof SuiEvent>;

export type MoveEventField = {
  path: string;
  value: SuiJsonValue;
};

export type EventQuery =
  | 'All'
  | { Transaction: TransactionDigest }
  | { MoveModule: { package: ObjectId; module: string } }
  | { MoveEvent: string }
  | { EventType: EventType }
  | { Sender: SuiAddress }
  | { Recipient: ObjectOwner }
  | { Object: ObjectId }
  | { TimeRange: { start_time: number; end_time: number } };

export const EventId = object({
  txDigest: TransactionDigest,
  eventSeq: number(),
});

export type EventId = Infer<typeof EventId>;

export type EventType =
  | 'MoveEvent'
  | 'Publish'
  | 'TransferObject'
  | 'MutateObject'
  | 'CoinBalanceChange'
  | 'DeleteObject'
  | 'NewObject'
  | 'EpochChange'
  | 'Checkpoint';

// mirrors sui_json_rpc_types::SuiEventFilter
export type SuiEventFilter =
  | { Package: ObjectId }
  | { Module: string }
  | { MoveEventType: string }
  | { MoveEventField: MoveEventField }
  | { SenderAddress: SuiAddress }
  | { EventType: EventType }
  | { All: SuiEventFilter[] }
  | { Any: SuiEventFilter[] }
  | { And: [SuiEventFilter, SuiEventFilter] }
  | { Or: [SuiEventFilter, SuiEventFilter] };

export const SuiEventEnvelope = object({
  timestamp: number(),
  txDigest: TransactionDigest,
  id: EventId, // tx_digest:event_seq
  event: SuiEvent,
});

export type SuiEventEnvelope = Infer<typeof SuiEventEnvelope>;

export type SuiEvents = SuiEventEnvelope[];

export const PaginatedEvents = object({
  data: array(SuiEventEnvelope),
  nextCursor: union([EventId, literal(null)]),
  hasNextPage: boolean(),
});
export type PaginatedEvents = Infer<typeof PaginatedEvents>;

export const SubscriptionId = number();

export type SubscriptionId = Infer<typeof SubscriptionId>;

export const SubscriptionEvent = object({
  subscription: SubscriptionId,
  result: SuiEventEnvelope,
});

export type SubscriptionEvent = Infer<typeof SubscriptionEvent>;

/* ------------------------------- EventData ------------------------------ */

export function getMoveEvent(event: SuiEvent): MoveEvent | undefined {
  return event.type === 'moveEvent' ? event.content : undefined;
}

export function getPublishEvent(event: SuiEvent): PublishEvent | undefined {
  return event.type === 'publish' ? event.content : undefined;
}

export function getCoinBalanceChangeEvent(
  event: SuiEvent,
): CoinBalanceChangeEvent | undefined {
  return event.type === 'coinBalanceChange' ? event.content : undefined;
}

export function getTransferObjectEvent(
  event: SuiEvent,
): TransferObjectEvent | undefined {
  return event.type === 'transferObject' ? event.content : undefined;
}

export function getMutateObjectEvent(
  event: SuiEvent,
): MutateObjectEvent | undefined {
  return event.type === 'mutateObject' ? event.content : undefined;
}

export function getDeletObjectEvent(
  event: SuiEvent,
): DeleteObjectEvent | undefined {
  return event.type === 'deleteObject' ? event.content : undefined;
}

export function getNewObjectEvent(event: SuiEvent): NewObjectEvent | undefined {
  return event.type === 'newObject' ? event.content : undefined;
}

export function getEpochChangeEvent(
  event: SuiEvent,
): EpochChangeEvent | undefined {
  return event.type === 'epochChange' ? event.content : undefined;
}

export function getCheckpointEvent(
  event: SuiEvent,
): CheckpointEvent | undefined {
  return event.type === 'checkpoint' ? event.content : undefined;
}

export function getEventSender(event: SuiEvent): SuiAddress | undefined {
  return event.type !== 'epochChange' && event.type !== 'checkpoint'
    ? event.content.sender
    : undefined;
}

export function getEventPackage(event: SuiEvent): ObjectId | undefined {
  return event.type !== 'epochChange' && event.type !== 'checkpoint'
    ? event.content.packageId
    : undefined;
}

export function isEventType(
  e: SuiEvent,
  type:
    | 'moveEvent'
    | 'publish'
    | 'transferObject'
    | 'mutateObject'
    | 'coinBalanceChange'
    | 'deleteObject'
    | 'newObject'
    | 'epochChange'
    | 'checkpoint',
): boolean {
  return e.type === type;
}

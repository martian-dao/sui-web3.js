"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutionStatusType = exports.getProgrammableTransaction = exports.getTransactionKindName = exports.getTransactionKind = exports.getConsensusCommitPrologueTransaction = exports.getChangeEpochTransaction = exports.getTransactionGasBudget = exports.getTransactionGasPrice = exports.getTransactionGasObject = exports.getGasData = exports.getTransactionSender = exports.getTransactionSignature = exports.getTransactionDigest = exports.getTransaction = exports.DryRunTransactionBlockResponse = exports.PaginatedTransactionResponse = exports.SuiTransactionBlockResponseOptions = exports.SuiTransactionBlockResponse = exports.BalanceChange = exports.SuiObjectChange = exports.SuiObjectChangeCreated = exports.SuiObjectChangeWrapped = exports.SuiObjectChangeDeleted = exports.SuiObjectChangeMutated = exports.SuiObjectChangeTransferred = exports.SuiObjectChangePublished = exports.SuiTransactionBlock = exports.AuthorityName = exports.DevInspectResults = exports.TransactionEvents = exports.TransactionEffects = exports.TransactionEffectsModifiedAtVersions = exports.OwnedObjectRef = exports.ExecutionStatus = exports.ExecutionStatusType = exports.GasCostSummary = exports.AuthorityQuorumSignInfo = exports.GenericAuthoritySignature = exports.AuthoritySignature = exports.SuiTransactionBlockData = exports.SuiTransactionBlockKind = exports.ProgrammableTransaction = exports.SuiCallArg = exports.SuiTransaction = exports.MoveCallSuiTransaction = exports.SuiArgument = exports.Genesis = exports.SuiConsensusCommitPrologue = exports.SuiChangeEpoch = exports.EpochId = void 0;
exports.getPublishedObjectChanges = exports.getObjectChanges = exports.getNewlyCreatedCoinRefsAfterSplit = exports.getTimestampFromTransactionResponse = exports.getCreatedObjects = exports.getEvents = exports.getTransactionEffects = exports.getTotalGasUsedUpperBound = exports.getTotalGasUsed = exports.getExecutionStatusGasSummary = exports.getExecutionStatusError = exports.getExecutionStatus = void 0;
const superstruct_1 = require("superstruct");
const common_1 = require("./common");
const events_1 = require("./events");
const objects_1 = require("./objects");
/** @deprecated Use `string` instead. */
exports.EpochId = (0, superstruct_1.string)();
exports.SuiChangeEpoch = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    storage_charge: (0, superstruct_1.string)(),
    computation_charge: (0, superstruct_1.string)(),
    storage_rebate: (0, superstruct_1.string)(),
    epoch_start_timestamp_ms: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.SuiConsensusCommitPrologue = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    round: (0, superstruct_1.string)(),
    commit_timestamp_ms: (0, superstruct_1.string)(),
});
exports.Genesis = (0, superstruct_1.object)({
    objects: (0, superstruct_1.array)((0, superstruct_1.string)()),
});
exports.SuiArgument = (0, superstruct_1.union)([
    (0, superstruct_1.literal)('GasCoin'),
    (0, superstruct_1.object)({ Input: (0, superstruct_1.number)() }),
    (0, superstruct_1.object)({ Result: (0, superstruct_1.number)() }),
    (0, superstruct_1.object)({ NestedResult: (0, superstruct_1.tuple)([(0, superstruct_1.number)(), (0, superstruct_1.number)()]) }),
]);
exports.MoveCallSuiTransaction = (0, superstruct_1.object)({
    arguments: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.SuiArgument)),
    type_arguments: (0, superstruct_1.optional)((0, superstruct_1.array)((0, superstruct_1.string)())),
    package: (0, superstruct_1.string)(),
    module: (0, superstruct_1.string)(),
    function: (0, superstruct_1.string)(),
});
exports.SuiTransaction = (0, superstruct_1.union)([
    (0, superstruct_1.object)({ MoveCall: exports.MoveCallSuiTransaction }),
    (0, superstruct_1.object)({ TransferObjects: (0, superstruct_1.tuple)([(0, superstruct_1.array)(exports.SuiArgument), exports.SuiArgument]) }),
    (0, superstruct_1.object)({ SplitCoins: (0, superstruct_1.tuple)([exports.SuiArgument, (0, superstruct_1.array)(exports.SuiArgument)]) }),
    (0, superstruct_1.object)({ MergeCoins: (0, superstruct_1.tuple)([exports.SuiArgument, (0, superstruct_1.array)(exports.SuiArgument)]) }),
    (0, superstruct_1.object)({
        Publish: (0, superstruct_1.union)([
            // TODO: Remove this after 0.34 is released:
            (0, superstruct_1.tuple)([objects_1.SuiMovePackage, (0, superstruct_1.array)((0, superstruct_1.string)())]),
            (0, superstruct_1.array)((0, superstruct_1.string)()),
        ]),
    }),
    (0, superstruct_1.object)({
        Upgrade: (0, superstruct_1.union)([
            // TODO: Remove this after 0.34 is released:
            (0, superstruct_1.tuple)([objects_1.SuiMovePackage, (0, superstruct_1.array)((0, superstruct_1.string)()), (0, superstruct_1.string)(), exports.SuiArgument]),
            (0, superstruct_1.tuple)([(0, superstruct_1.array)((0, superstruct_1.string)()), (0, superstruct_1.string)(), exports.SuiArgument]),
        ]),
    }),
    (0, superstruct_1.object)({ MakeMoveVec: (0, superstruct_1.tuple)([(0, superstruct_1.nullable)((0, superstruct_1.string)()), (0, superstruct_1.array)(exports.SuiArgument)]) }),
]);
exports.SuiCallArg = (0, superstruct_1.union)([
    (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)('pure'),
        valueType: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
        value: common_1.SuiJsonValue,
    }),
    (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)('object'),
        objectType: (0, superstruct_1.literal)('immOrOwnedObject'),
        objectId: (0, superstruct_1.string)(),
        version: (0, superstruct_1.string)(),
        digest: (0, superstruct_1.string)(),
    }),
    (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)('object'),
        objectType: (0, superstruct_1.literal)('sharedObject'),
        objectId: (0, superstruct_1.string)(),
        initialSharedVersion: (0, superstruct_1.string)(),
        mutable: (0, superstruct_1.boolean)(),
    }),
]);
exports.ProgrammableTransaction = (0, superstruct_1.object)({
    transactions: (0, superstruct_1.array)(exports.SuiTransaction),
    inputs: (0, superstruct_1.array)(exports.SuiCallArg),
});
exports.SuiTransactionBlockKind = (0, superstruct_1.union)([
    (0, superstruct_1.assign)(exports.SuiChangeEpoch, (0, superstruct_1.object)({ kind: (0, superstruct_1.literal)('ChangeEpoch') })),
    (0, superstruct_1.assign)(exports.SuiConsensusCommitPrologue, (0, superstruct_1.object)({
        kind: (0, superstruct_1.literal)('ConsensusCommitPrologue'),
    })),
    (0, superstruct_1.assign)(exports.Genesis, (0, superstruct_1.object)({ kind: (0, superstruct_1.literal)('Genesis') })),
    (0, superstruct_1.assign)(exports.ProgrammableTransaction, (0, superstruct_1.object)({ kind: (0, superstruct_1.literal)('ProgrammableTransaction') })),
]);
exports.SuiTransactionBlockData = (0, superstruct_1.object)({
    // Eventually this will become union(literal('v1'), literal('v2'), ...)
    messageVersion: (0, superstruct_1.literal)('v1'),
    transaction: exports.SuiTransactionBlockKind,
    sender: (0, superstruct_1.string)(),
    gasData: objects_1.SuiGasData,
});
/** @deprecated Use `string` instead. */
exports.AuthoritySignature = (0, superstruct_1.string)();
exports.GenericAuthoritySignature = (0, superstruct_1.union)([(0, superstruct_1.string)(), (0, superstruct_1.array)((0, superstruct_1.string)())]);
exports.AuthorityQuorumSignInfo = (0, superstruct_1.object)({
    epoch: (0, superstruct_1.string)(),
    signature: exports.GenericAuthoritySignature,
    signers_map: (0, superstruct_1.array)((0, superstruct_1.number)()),
});
exports.GasCostSummary = (0, superstruct_1.object)({
    computationCost: (0, superstruct_1.string)(),
    storageCost: (0, superstruct_1.string)(),
    storageRebate: (0, superstruct_1.string)(),
    nonRefundableStorageFee: (0, superstruct_1.string)(),
});
exports.ExecutionStatusType = (0, superstruct_1.union)([
    (0, superstruct_1.literal)('success'),
    (0, superstruct_1.literal)('failure'),
]);
exports.ExecutionStatus = (0, superstruct_1.object)({
    status: exports.ExecutionStatusType,
    error: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.OwnedObjectRef = (0, superstruct_1.object)({
    owner: common_1.ObjectOwner,
    reference: objects_1.SuiObjectRef,
});
exports.TransactionEffectsModifiedAtVersions = (0, superstruct_1.object)({
    objectId: (0, superstruct_1.string)(),
    sequenceNumber: (0, superstruct_1.string)(),
});
exports.TransactionEffects = (0, superstruct_1.object)({
    // Eventually this will become union(literal('v1'), literal('v2'), ...)
    messageVersion: (0, superstruct_1.literal)('v1'),
    /** The status of the execution */
    status: exports.ExecutionStatus,
    /** The epoch when this transaction was executed */
    executedEpoch: (0, superstruct_1.string)(),
    /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
    modifiedAtVersions: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.TransactionEffectsModifiedAtVersions)),
    gasUsed: exports.GasCostSummary,
    /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
    sharedObjects: (0, superstruct_1.optional)((0, superstruct_1.array)(objects_1.SuiObjectRef)),
    /** The transaction digest */
    transactionDigest: (0, superstruct_1.string)(),
    /** ObjectRef and owner of new objects created */
    created: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.OwnedObjectRef)),
    /** ObjectRef and owner of mutated objects, including gas object */
    mutated: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.OwnedObjectRef)),
    /**
     * ObjectRef and owner of objects that are unwrapped in this transaction.
     * Unwrapped objects are objects that were wrapped into other objects in the past,
     * and just got extracted out.
     */
    unwrapped: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.OwnedObjectRef)),
    /** Object Refs of objects now deleted (the old refs) */
    deleted: (0, superstruct_1.optional)((0, superstruct_1.array)(objects_1.SuiObjectRef)),
    /** Object Refs of objects now deleted (the old refs) */
    unwrappedThenDeleted: (0, superstruct_1.optional)((0, superstruct_1.array)(objects_1.SuiObjectRef)),
    /** Object refs of objects now wrapped in other objects */
    wrapped: (0, superstruct_1.optional)((0, superstruct_1.array)(objects_1.SuiObjectRef)),
    /**
     * The updated gas object reference. Have a dedicated field for convenient access.
     * It's also included in mutated.
     */
    gasObject: exports.OwnedObjectRef,
    /** The events emitted during execution. Note that only successful transactions emit events */
    eventsDigest: (0, superstruct_1.nullable)((0, superstruct_1.optional)((0, superstruct_1.string)())),
    /** The set of transaction digests this transaction depends on */
    dependencies: (0, superstruct_1.optional)((0, superstruct_1.array)((0, superstruct_1.string)())),
});
exports.TransactionEvents = (0, superstruct_1.array)(events_1.SuiEvent);
const ReturnValueType = (0, superstruct_1.tuple)([(0, superstruct_1.array)((0, superstruct_1.number)()), (0, superstruct_1.string)()]);
const MutableReferenceOutputType = (0, superstruct_1.tuple)([
    exports.SuiArgument,
    (0, superstruct_1.array)((0, superstruct_1.number)()),
    (0, superstruct_1.string)(),
]);
const ExecutionResultType = (0, superstruct_1.object)({
    mutableReferenceOutputs: (0, superstruct_1.optional)((0, superstruct_1.array)(MutableReferenceOutputType)),
    returnValues: (0, superstruct_1.optional)((0, superstruct_1.array)(ReturnValueType)),
});
exports.DevInspectResults = (0, superstruct_1.object)({
    effects: exports.TransactionEffects,
    events: exports.TransactionEvents,
    results: (0, superstruct_1.optional)((0, superstruct_1.array)(ExecutionResultType)),
    error: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
/** @deprecated Use `string` instead. */
exports.AuthorityName = (0, superstruct_1.string)();
exports.SuiTransactionBlock = (0, superstruct_1.object)({
    data: exports.SuiTransactionBlockData,
    txSignatures: (0, superstruct_1.array)((0, superstruct_1.string)()),
});
exports.SuiObjectChangePublished = (0, superstruct_1.object)({
    type: (0, superstruct_1.literal)('published'),
    packageId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
    digest: (0, superstruct_1.string)(),
    modules: (0, superstruct_1.array)((0, superstruct_1.string)()),
});
exports.SuiObjectChangeTransferred = (0, superstruct_1.object)({
    type: (0, superstruct_1.literal)('transferred'),
    sender: (0, superstruct_1.string)(),
    recipient: common_1.ObjectOwner,
    objectType: (0, superstruct_1.string)(),
    objectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
    digest: (0, superstruct_1.string)(),
});
exports.SuiObjectChangeMutated = (0, superstruct_1.object)({
    type: (0, superstruct_1.literal)('mutated'),
    sender: (0, superstruct_1.string)(),
    owner: common_1.ObjectOwner,
    objectType: (0, superstruct_1.string)(),
    objectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
    previousVersion: (0, superstruct_1.string)(),
    digest: (0, superstruct_1.string)(),
});
exports.SuiObjectChangeDeleted = (0, superstruct_1.object)({
    type: (0, superstruct_1.literal)('deleted'),
    sender: (0, superstruct_1.string)(),
    objectType: (0, superstruct_1.string)(),
    objectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
});
exports.SuiObjectChangeWrapped = (0, superstruct_1.object)({
    type: (0, superstruct_1.literal)('wrapped'),
    sender: (0, superstruct_1.string)(),
    objectType: (0, superstruct_1.string)(),
    objectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
});
exports.SuiObjectChangeCreated = (0, superstruct_1.object)({
    type: (0, superstruct_1.literal)('created'),
    sender: (0, superstruct_1.string)(),
    owner: common_1.ObjectOwner,
    objectType: (0, superstruct_1.string)(),
    objectId: (0, superstruct_1.string)(),
    version: (0, superstruct_1.string)(),
    digest: (0, superstruct_1.string)(),
});
exports.SuiObjectChange = (0, superstruct_1.union)([
    exports.SuiObjectChangePublished,
    exports.SuiObjectChangeTransferred,
    exports.SuiObjectChangeMutated,
    exports.SuiObjectChangeDeleted,
    exports.SuiObjectChangeWrapped,
    exports.SuiObjectChangeCreated,
]);
exports.BalanceChange = (0, superstruct_1.object)({
    owner: common_1.ObjectOwner,
    coinType: (0, superstruct_1.string)(),
    /* Coin balance change(positive means receive, negative means send) */
    amount: (0, superstruct_1.string)(),
});
exports.SuiTransactionBlockResponse = (0, superstruct_1.object)({
    digest: (0, superstruct_1.string)(),
    transaction: (0, superstruct_1.optional)(exports.SuiTransactionBlock),
    effects: (0, superstruct_1.optional)(exports.TransactionEffects),
    events: (0, superstruct_1.optional)(exports.TransactionEvents),
    timestampMs: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    checkpoint: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    confirmedLocalExecution: (0, superstruct_1.optional)((0, superstruct_1.boolean)()),
    objectChanges: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.SuiObjectChange)),
    balanceChanges: (0, superstruct_1.optional)((0, superstruct_1.array)(exports.BalanceChange)),
    /* Errors that occurred in fetching/serializing the transaction. */
    errors: (0, superstruct_1.optional)((0, superstruct_1.array)((0, superstruct_1.string)())),
});
exports.SuiTransactionBlockResponseOptions = (0, superstruct_1.object)({
    /* Whether to show transaction input data. Default to be false. */
    showInput: (0, superstruct_1.optional)((0, superstruct_1.boolean)()),
    /* Whether to show transaction effects. Default to be false. */
    showEffects: (0, superstruct_1.optional)((0, superstruct_1.boolean)()),
    /* Whether to show transaction events. Default to be false. */
    showEvents: (0, superstruct_1.optional)((0, superstruct_1.boolean)()),
    /* Whether to show object changes. Default to be false. */
    showObjectChanges: (0, superstruct_1.optional)((0, superstruct_1.boolean)()),
    /* Whether to show coin balance changes. Default to be false. */
    showBalanceChanges: (0, superstruct_1.optional)((0, superstruct_1.boolean)()),
});
exports.PaginatedTransactionResponse = (0, superstruct_1.object)({
    data: (0, superstruct_1.array)(exports.SuiTransactionBlockResponse),
    nextCursor: (0, superstruct_1.nullable)((0, superstruct_1.string)()),
    hasNextPage: (0, superstruct_1.boolean)(),
});
exports.DryRunTransactionBlockResponse = (0, superstruct_1.object)({
    effects: exports.TransactionEffects,
    events: exports.TransactionEvents,
    objectChanges: (0, superstruct_1.array)(exports.SuiObjectChange),
    balanceChanges: (0, superstruct_1.array)(exports.BalanceChange),
    // TODO: Remove optional when this is rolled out to all networks:
    input: (0, superstruct_1.optional)(exports.SuiTransactionBlockData),
});
/* -------------------------------------------------------------------------- */
/*                              Helper functions                              */
/* -------------------------------------------------------------------------- */
function getTransaction(tx) {
    return tx.transaction;
}
exports.getTransaction = getTransaction;
function getTransactionDigest(tx) {
    return tx.digest;
}
exports.getTransactionDigest = getTransactionDigest;
function getTransactionSignature(tx) {
    return tx.transaction?.txSignatures;
}
exports.getTransactionSignature = getTransactionSignature;
/* ----------------------------- TransactionData ---------------------------- */
function getTransactionSender(tx) {
    return tx.transaction?.data.sender;
}
exports.getTransactionSender = getTransactionSender;
function getGasData(tx) {
    return tx.transaction?.data.gasData;
}
exports.getGasData = getGasData;
function getTransactionGasObject(tx) {
    return getGasData(tx)?.payment;
}
exports.getTransactionGasObject = getTransactionGasObject;
function getTransactionGasPrice(tx) {
    return getGasData(tx)?.price;
}
exports.getTransactionGasPrice = getTransactionGasPrice;
function getTransactionGasBudget(tx) {
    return getGasData(tx)?.budget;
}
exports.getTransactionGasBudget = getTransactionGasBudget;
function getChangeEpochTransaction(data) {
    return data.kind === 'ChangeEpoch' ? data : undefined;
}
exports.getChangeEpochTransaction = getChangeEpochTransaction;
function getConsensusCommitPrologueTransaction(data) {
    return data.kind === 'ConsensusCommitPrologue' ? data : undefined;
}
exports.getConsensusCommitPrologueTransaction = getConsensusCommitPrologueTransaction;
function getTransactionKind(data) {
    return data.transaction?.data.transaction;
}
exports.getTransactionKind = getTransactionKind;
function getTransactionKindName(data) {
    return data.kind;
}
exports.getTransactionKindName = getTransactionKindName;
function getProgrammableTransaction(data) {
    return data.kind === 'ProgrammableTransaction' ? data : undefined;
}
exports.getProgrammableTransaction = getProgrammableTransaction;
/* ----------------------------- ExecutionStatus ---------------------------- */
function getExecutionStatusType(data) {
    return getExecutionStatus(data)?.status;
}
exports.getExecutionStatusType = getExecutionStatusType;
function getExecutionStatus(data) {
    return getTransactionEffects(data)?.status;
}
exports.getExecutionStatus = getExecutionStatus;
function getExecutionStatusError(data) {
    return getExecutionStatus(data)?.error;
}
exports.getExecutionStatusError = getExecutionStatusError;
function getExecutionStatusGasSummary(data) {
    if ((0, superstruct_1.is)(data, exports.TransactionEffects)) {
        return data.gasUsed;
    }
    return getTransactionEffects(data)?.gasUsed;
}
exports.getExecutionStatusGasSummary = getExecutionStatusGasSummary;
function getTotalGasUsed(data) {
    const gasSummary = getExecutionStatusGasSummary(data);
    return gasSummary
        ? BigInt(gasSummary.computationCost) +
            BigInt(gasSummary.storageCost) -
            BigInt(gasSummary.storageRebate)
        : undefined;
}
exports.getTotalGasUsed = getTotalGasUsed;
function getTotalGasUsedUpperBound(data) {
    const gasSummary = getExecutionStatusGasSummary(data);
    return gasSummary
        ? BigInt(gasSummary.computationCost) + BigInt(gasSummary.storageCost)
        : undefined;
}
exports.getTotalGasUsedUpperBound = getTotalGasUsedUpperBound;
function getTransactionEffects(data) {
    return data.effects;
}
exports.getTransactionEffects = getTransactionEffects;
/* ---------------------------- Transaction Effects --------------------------- */
function getEvents(data) {
    return data.events;
}
exports.getEvents = getEvents;
function getCreatedObjects(data) {
    return getTransactionEffects(data)?.created;
}
exports.getCreatedObjects = getCreatedObjects;
/* --------------------------- TransactionResponse -------------------------- */
function getTimestampFromTransactionResponse(data) {
    return data.timestampMs ?? undefined;
}
exports.getTimestampFromTransactionResponse = getTimestampFromTransactionResponse;
/**
 * Get the newly created coin refs after a split.
 */
function getNewlyCreatedCoinRefsAfterSplit(data) {
    return getTransactionEffects(data)?.created?.map((c) => c.reference);
}
exports.getNewlyCreatedCoinRefsAfterSplit = getNewlyCreatedCoinRefsAfterSplit;
function getObjectChanges(data) {
    return data.objectChanges;
}
exports.getObjectChanges = getObjectChanges;
function getPublishedObjectChanges(data) {
    return (data.objectChanges?.filter((a) => (0, superstruct_1.is)(a, exports.SuiObjectChangePublished)) ?? []);
}
exports.getPublishedObjectChanges = getPublishedObjectChanges;
//# sourceMappingURL=transactions.js.map
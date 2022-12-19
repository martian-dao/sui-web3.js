"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuiEventFilter = exports.isBalanceChangeType = exports.isEventType = exports.isPaginatedEvents = exports.isEventId = exports.isEventQuery = exports.isMoveEventField = exports.isSuiEvent = exports.isNewObjectEvent = exports.isDeleteObjectEvent = exports.isMutateObjectEvent = exports.isTransferObjectEvent = exports.isCoinBalanceChangeEvent = exports.isPublishEvent = exports.isMoveEvent = exports.isOrder = exports.isSequenceNumber = exports.isObjectId = exports.isObjectDigest = exports.isGetObjectDataResponse = exports.isGetOwnedObjectsResponse = exports.isObjectType = exports.isObjectStatus = exports.isSuiObject = exports.isSuiMoveNormalizedStructType = exports.isSuiMoveNormalizedTypeParameterType = exports.isSuiMoveNormalizedType = exports.isSuiMoveAbilitySet = exports.isSuiMoveTypeParameterIndex = exports.isSuiMoveVisibility = exports.isSuiMoveNormalizedFunction = exports.isSuiMoveNormalizedField = exports.isSuiMoveStructTypeParameter = exports.isSuiMoveNormalizedStruct = exports.isSuiMoveModuleId = exports.isSuiMoveNormalizedModule = exports.isSuiMoveNormalizedModules = exports.isSuiMoveFunctionArgTypes = exports.isSuiMoveFunctionArgType = exports.isSuiMoveFunctionArgTypesResponse = exports.isSuiMovePackage = exports.isSuiMoveObject = exports.isSuiData = exports.isMovePackageContent = exports.isObjectContentFields = exports.isSuiObjectInfo = exports.isSuiObjectRef = exports.isObjectOwner = exports.isSuiAddress = exports.isTransactionDigest = void 0;
exports.isPayAllSuiTx = exports.isPaySuiTx = exports.isPayTx = exports.isTransferSuiTx = exports.isTransferObjectTx = exports.isDelegationSuiObject = exports.isDelegationData = exports.isCoinMetadata = exports.isSuiParsedTransactionResponse = exports.isSuiPackage = exports.isSuiParsedPublishResponse = exports.isSuiParsedSplitCoinResponse = exports.isSuiParsedMergeCoinResponse = exports.isTransactionBytes = exports.isAuthoritySignature = exports.isAuthorityName = exports.isEmptySignInfo = exports.isSuiJsonValue = exports.isMoveCall = exports.isTransactionQuery = exports.isPaginatedTransactionDigests = exports.isGetTxnDigestsResponse = exports.isGatewayTxSeqNumber = exports.isSuiExecuteTransactionResponse = exports.isSuiCertifiedTransactionEffects = exports.isSuiTransactionAuthSignersResponse = exports.isSuiTransactionResponse = exports.isTransactionEffects = exports.isOwnedObjectRef = exports.isExecutionStatus = exports.isExecutionStatusType = exports.isGasCostSummary = exports.isCertifiedTransaction = exports.isAuthorityQuorumSignInfo = exports.isGenericAuthoritySignature = exports.isEpochId = exports.isSuiTransactionData = exports.isSuiTransactionKind = exports.isTransactionKindName = exports.isExecuteTransactionRequestType = exports.isPayAllSui = exports.isPaySui = exports.isPay = exports.isSuiChangeEpoch = exports.isSuiTransferSui = exports.isTransferObject = exports.isSubscriptionEvent = exports.isSubscriptionId = exports.isSuiEvents = exports.isSuiEventEnvelope = void 0;
exports.isFaucetResponse = exports.isFaucetCoinInfo = exports.isRpcApiVersion = exports.isTransactionData = exports.isTransactionKind = exports.isTransaction = exports.isMoveCallTx = exports.isTypeTag = exports.isStructTag = exports.isCallArg = exports.isObjectArg = exports.isSharedObjectRef = exports.isPublishTx = void 0;
function isTransactionDigest(obj, _argumentName) {
    return (typeof obj === "string");
}
exports.isTransactionDigest = isTransactionDigest;
function isSuiAddress(obj, _argumentName) {
    return (typeof obj === "string");
}
exports.isSuiAddress = isSuiAddress;
function isObjectOwner(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.AddressOwner) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.ObjectOwner) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.Shared !== null &&
                typeof obj.Shared === "object" ||
                typeof obj.Shared === "function") &&
            isSuiMoveTypeParameterIndex(obj.Shared.initial_shared_version) ||
        obj === "Immutable"));
}
exports.isObjectOwner = isObjectOwner;
function isSuiObjectRef(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.digest) &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.version));
}
exports.isSuiObjectRef = isSuiObjectRef;
function isSuiObjectInfo(obj, _argumentName) {
    return (isSuiObjectRef(obj) &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        isTransactionDigest(obj.type) &&
        isObjectOwner(obj.owner) &&
        isTransactionDigest(obj.previousTransaction));
}
exports.isSuiObjectInfo = isSuiObjectInfo;
function isObjectContentFields(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Object.entries(obj)
            .every(([key, _value]) => isTransactionDigest(key)));
}
exports.isObjectContentFields = isObjectContentFields;
function isMovePackageContent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Object.entries(obj)
            .every(([key, value]) => (isTransactionDigest(value) &&
            isTransactionDigest(key))));
}
exports.isMovePackageContent = isMovePackageContent;
function isSuiData(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isObjectType(obj.dataType) &&
        isSuiMoveObject(obj) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isObjectType(obj.dataType) &&
            isSuiMovePackage(obj)));
}
exports.isSuiData = isSuiData;
function isSuiMoveObject(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.type) &&
        isObjectContentFields(obj.fields) &&
        typeof obj.has_public_transfer === "boolean");
}
exports.isSuiMoveObject = isSuiMoveObject;
function isSuiMovePackage(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isMovePackageContent(obj.disassembled));
}
exports.isSuiMovePackage = isSuiMovePackage;
function isSuiMoveFunctionArgTypesResponse(obj, _argumentName) {
    return (Array.isArray(obj) &&
        obj.every((e) => isSuiMoveFunctionArgType(e)));
}
exports.isSuiMoveFunctionArgTypesResponse = isSuiMoveFunctionArgTypesResponse;
function isSuiMoveFunctionArgType(obj, _argumentName) {
    return ((isTransactionDigest(obj) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.Object)));
}
exports.isSuiMoveFunctionArgType = isSuiMoveFunctionArgType;
function isSuiMoveFunctionArgTypes(obj, _argumentName) {
    return (Array.isArray(obj) &&
        obj.every((e) => isSuiMoveFunctionArgType(e)));
}
exports.isSuiMoveFunctionArgTypes = isSuiMoveFunctionArgTypes;
function isSuiMoveNormalizedModules(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Object.entries(obj)
            .every(([key, value]) => (isSuiMoveNormalizedModule(value) &&
            isTransactionDigest(key))));
}
exports.isSuiMoveNormalizedModules = isSuiMoveNormalizedModules;
function isSuiMoveNormalizedModule(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.file_format_version) &&
        isTransactionDigest(obj.address) &&
        isTransactionDigest(obj.name) &&
        Array.isArray(obj.friends) &&
        obj.friends.every((e) => isSuiMoveModuleId(e)) &&
        (obj.structs !== null &&
            typeof obj.structs === "object" ||
            typeof obj.structs === "function") &&
        Object.entries(obj.structs)
            .every(([key, value]) => (isSuiMoveNormalizedStruct(value) &&
            isTransactionDigest(key))) &&
        (obj.exposed_functions !== null &&
            typeof obj.exposed_functions === "object" ||
            typeof obj.exposed_functions === "function") &&
        Object.entries(obj.exposed_functions)
            .every(([key, value]) => (isSuiMoveNormalizedFunction(value) &&
            isTransactionDigest(key))));
}
exports.isSuiMoveNormalizedModule = isSuiMoveNormalizedModule;
function isSuiMoveModuleId(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.address) &&
        isTransactionDigest(obj.name));
}
exports.isSuiMoveModuleId = isSuiMoveModuleId;
function isSuiMoveNormalizedStruct(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveAbilitySet(obj.abilities) &&
        Array.isArray(obj.type_parameters) &&
        obj.type_parameters.every((e) => isSuiMoveStructTypeParameter(e)) &&
        Array.isArray(obj.fields) &&
        obj.fields.every((e) => isSuiMoveNormalizedField(e)));
}
exports.isSuiMoveNormalizedStruct = isSuiMoveNormalizedStruct;
function isSuiMoveStructTypeParameter(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveAbilitySet(obj.constraints) &&
        typeof obj.is_phantom === "boolean");
}
exports.isSuiMoveStructTypeParameter = isSuiMoveStructTypeParameter;
function isSuiMoveNormalizedField(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.name) &&
        isSuiMoveNormalizedType(obj.type_));
}
exports.isSuiMoveNormalizedField = isSuiMoveNormalizedField;
function isSuiMoveNormalizedFunction(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveVisibility(obj.visibility) &&
        typeof obj.is_entry === "boolean" &&
        Array.isArray(obj.type_parameters) &&
        obj.type_parameters.every((e) => isSuiMoveAbilitySet(e)) &&
        Array.isArray(obj.parameters) &&
        obj.parameters.every((e) => isSuiMoveNormalizedType(e)) &&
        Array.isArray(obj.return_) &&
        obj.return_.every((e) => isSuiMoveNormalizedType(e)));
}
exports.isSuiMoveNormalizedFunction = isSuiMoveNormalizedFunction;
function isSuiMoveVisibility(obj, _argumentName) {
    return ((obj === "Private" ||
        obj === "Public" ||
        obj === "Friend"));
}
exports.isSuiMoveVisibility = isSuiMoveVisibility;
function isSuiMoveTypeParameterIndex(obj, _argumentName) {
    return (typeof obj === "number");
}
exports.isSuiMoveTypeParameterIndex = isSuiMoveTypeParameterIndex;
function isSuiMoveAbilitySet(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.abilities) &&
        obj.abilities.every((e) => isTransactionDigest(e)));
}
exports.isSuiMoveAbilitySet = isSuiMoveAbilitySet;
function isSuiMoveNormalizedType(obj, _argumentName) {
    return ((isTransactionDigest(obj) ||
        isSuiMoveNormalizedTypeParameterType(obj) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiMoveNormalizedType(obj.Reference) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiMoveNormalizedType(obj.MutableReference) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiMoveNormalizedType(obj.Vector) ||
        isSuiMoveNormalizedStructType(obj)));
}
exports.isSuiMoveNormalizedType = isSuiMoveNormalizedType;
function isSuiMoveNormalizedTypeParameterType(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.TypeParameter));
}
exports.isSuiMoveNormalizedTypeParameterType = isSuiMoveNormalizedTypeParameterType;
function isSuiMoveNormalizedStructType(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.Struct !== null &&
            typeof obj.Struct === "object" ||
            typeof obj.Struct === "function") &&
        isTransactionDigest(obj.Struct.address) &&
        isTransactionDigest(obj.Struct.module) &&
        isTransactionDigest(obj.Struct.name) &&
        Array.isArray(obj.Struct.type_arguments) &&
        obj.Struct.type_arguments.every((e) => isSuiMoveNormalizedType(e)));
}
exports.isSuiMoveNormalizedStructType = isSuiMoveNormalizedStructType;
function isSuiObject(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiData(obj.data) &&
        isObjectOwner(obj.owner) &&
        isTransactionDigest(obj.previousTransaction) &&
        isSuiMoveTypeParameterIndex(obj.storageRebate) &&
        isSuiObjectRef(obj.reference));
}
exports.isSuiObject = isSuiObject;
function isObjectStatus(obj, _argumentName) {
    return ((obj === "Exists" ||
        obj === "NotExists" ||
        obj === "Deleted"));
}
exports.isObjectStatus = isObjectStatus;
function isObjectType(obj, _argumentName) {
    return ((obj === "moveObject" ||
        obj === "package"));
}
exports.isObjectType = isObjectType;
function isGetOwnedObjectsResponse(obj, _argumentName) {
    return (Array.isArray(obj) &&
        obj.every((e) => isSuiObjectInfo(e)));
}
exports.isGetOwnedObjectsResponse = isGetOwnedObjectsResponse;
function isGetObjectDataResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isObjectStatus(obj.status) &&
        (isTransactionDigest(obj.details) ||
            isSuiObjectRef(obj.details) ||
            isSuiObject(obj.details)));
}
exports.isGetObjectDataResponse = isGetObjectDataResponse;
function isObjectDigest(obj, _argumentName) {
    return (typeof obj === "string");
}
exports.isObjectDigest = isObjectDigest;
function isObjectId(obj, _argumentName) {
    return (typeof obj === "string");
}
exports.isObjectId = isObjectId;
function isSequenceNumber(obj, _argumentName) {
    return (typeof obj === "number");
}
exports.isSequenceNumber = isSequenceNumber;
function isOrder(obj, _argumentName) {
    return ((obj === "ascending" ||
        obj === "descending"));
}
exports.isOrder = isOrder;
function isMoveEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.packageId) &&
        isTransactionDigest(obj.transactionModule) &&
        isTransactionDigest(obj.sender) &&
        isTransactionDigest(obj.type) &&
        (obj.fields !== null &&
            typeof obj.fields === "object" ||
            typeof obj.fields === "function") &&
        isTransactionDigest(obj.bcs));
}
exports.isMoveEvent = isMoveEvent;
function isPublishEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.sender) &&
        isTransactionDigest(obj.packageId));
}
exports.isPublishEvent = isPublishEvent;
function isCoinBalanceChangeEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.packageId) &&
        isTransactionDigest(obj.transactionModule) &&
        isTransactionDigest(obj.sender) &&
        isObjectOwner(obj.owner) &&
        isBalanceChangeType(obj.changeType) &&
        isTransactionDigest(obj.coinType) &&
        isTransactionDigest(obj.coinObjectId) &&
        isSuiMoveTypeParameterIndex(obj.version) &&
        isSuiMoveTypeParameterIndex(obj.amount));
}
exports.isCoinBalanceChangeEvent = isCoinBalanceChangeEvent;
function isTransferObjectEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.packageId) &&
        isTransactionDigest(obj.transactionModule) &&
        isTransactionDigest(obj.sender) &&
        isObjectOwner(obj.recipient) &&
        isTransactionDigest(obj.objectType) &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.version));
}
exports.isTransferObjectEvent = isTransferObjectEvent;
function isMutateObjectEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.packageId) &&
        isTransactionDigest(obj.transactionModule) &&
        isTransactionDigest(obj.sender) &&
        isTransactionDigest(obj.objectType) &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.version));
}
exports.isMutateObjectEvent = isMutateObjectEvent;
function isDeleteObjectEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.packageId) &&
        isTransactionDigest(obj.transactionModule) &&
        isTransactionDigest(obj.sender) &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.version));
}
exports.isDeleteObjectEvent = isDeleteObjectEvent;
function isNewObjectEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.packageId) &&
        isTransactionDigest(obj.transactionModule) &&
        isTransactionDigest(obj.sender) &&
        isObjectOwner(obj.recipient) &&
        isTransactionDigest(obj.objectType) &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.version));
}
exports.isNewObjectEvent = isNewObjectEvent;
function isSuiEvent(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isMoveEvent(obj.moveEvent) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isPublishEvent(obj.publish) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isCoinBalanceChangeEvent(obj.coinBalanceChange) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransferObjectEvent(obj.transferObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isMutateObjectEvent(obj.mutateObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isDeleteObjectEvent(obj.deleteObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isNewObjectEvent(obj.newObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            typeof obj.epochChange === "bigint" ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            typeof obj.checkpoint === "bigint"));
}
exports.isSuiEvent = isSuiEvent;
function isMoveEventField(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.path) &&
        isSuiJsonValue(obj.value));
}
exports.isMoveEventField = isMoveEventField;
function isEventQuery(obj, _argumentName) {
    return ((obj === "All" ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.Transaction) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.MoveModule !== null &&
                typeof obj.MoveModule === "object" ||
                typeof obj.MoveModule === "function") &&
            isTransactionDigest(obj.MoveModule.package) &&
            isTransactionDigest(obj.MoveModule.module) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.MoveEvent) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isEventType(obj.EventType) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.Sender) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isObjectOwner(obj.Recipient) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.Object) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.TimeRange !== null &&
                typeof obj.TimeRange === "object" ||
                typeof obj.TimeRange === "function") &&
            isSuiMoveTypeParameterIndex(obj.TimeRange.start_time) &&
            isSuiMoveTypeParameterIndex(obj.TimeRange.end_time)));
}
exports.isEventQuery = isEventQuery;
function isEventId(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.txSeq) &&
        isSuiMoveTypeParameterIndex(obj.eventSeq));
}
exports.isEventId = isEventId;
function isPaginatedEvents(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiEvents(obj.data) &&
        isEventId(obj.nextCursor));
}
exports.isPaginatedEvents = isPaginatedEvents;
function isEventType(obj, _argumentName) {
    return ((obj === "MoveEvent" ||
        obj === "Publish" ||
        obj === "TransferObject" ||
        obj === "MutateObject" ||
        obj === "CoinBalanceChange" ||
        obj === "DeleteObject" ||
        obj === "NewObject" ||
        obj === "EpochChange" ||
        obj === "Checkpoint"));
}
exports.isEventType = isEventType;
function isBalanceChangeType(obj, _argumentName) {
    return ((obj === "Gas" ||
        obj === "Pay" ||
        obj === "Receive"));
}
exports.isBalanceChangeType = isBalanceChangeType;
function isSuiEventFilter(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.Package) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.Module) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.MoveEventType) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isMoveEventField(obj.MoveEventField) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.SenderAddress) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isEventType(obj.EventType) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            Array.isArray(obj.All) &&
            obj.All.every((e) => isSuiEventFilter(e)) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            Array.isArray(obj.Any) &&
            obj.Any.every((e) => isSuiEventFilter(e)) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            Array.isArray(obj.And) &&
            isSuiEventFilter(obj.And[0]) &&
            isSuiEventFilter(obj.And[1]) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            Array.isArray(obj.Or) &&
            isSuiEventFilter(obj.Or[0]) &&
            isSuiEventFilter(obj.Or[1])));
}
exports.isSuiEventFilter = isSuiEventFilter;
function isSuiEventEnvelope(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.timestamp) &&
        isTransactionDigest(obj.txDigest) &&
        isEventId(obj.id) &&
        isSuiEvent(obj.event));
}
exports.isSuiEventEnvelope = isSuiEventEnvelope;
function isSuiEvents(obj, _argumentName) {
    return (Array.isArray(obj) &&
        obj.every((e) => isSuiEventEnvelope(e)));
}
exports.isSuiEvents = isSuiEvents;
function isSubscriptionId(obj, _argumentName) {
    return (typeof obj === "number");
}
exports.isSubscriptionId = isSubscriptionId;
function isSubscriptionEvent(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.subscription) &&
        isSuiEventEnvelope(obj.result));
}
exports.isSubscriptionEvent = isSubscriptionEvent;
function isTransferObject(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.recipient) &&
        isSuiObjectRef(obj.objectRef));
}
exports.isTransferObject = isTransferObject;
function isSuiTransferSui(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.recipient) &&
        isSuiMoveTypeParameterIndex(obj.amount));
}
exports.isSuiTransferSui = isSuiTransferSui;
function isSuiChangeEpoch(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.epoch) &&
        isSuiMoveTypeParameterIndex(obj.storage_charge) &&
        isSuiMoveTypeParameterIndex(obj.computation_charge));
}
exports.isSuiChangeEpoch = isSuiChangeEpoch;
function isPay(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.coins) &&
        obj.coins.every((e) => isSuiObjectRef(e)) &&
        Array.isArray(obj.recipients) &&
        obj.recipients.every((e) => isTransactionDigest(e)) &&
        Array.isArray(obj.amounts) &&
        obj.amounts.every((e) => isSuiMoveTypeParameterIndex(e)));
}
exports.isPay = isPay;
function isPaySui(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.coins) &&
        obj.coins.every((e) => isSuiObjectRef(e)) &&
        Array.isArray(obj.recipients) &&
        obj.recipients.every((e) => isTransactionDigest(e)) &&
        Array.isArray(obj.amounts) &&
        obj.amounts.every((e) => isSuiMoveTypeParameterIndex(e)));
}
exports.isPaySui = isPaySui;
function isPayAllSui(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.coins) &&
        obj.coins.every((e) => isSuiObjectRef(e)) &&
        isTransactionDigest(obj.recipient));
}
exports.isPayAllSui = isPayAllSui;
function isExecuteTransactionRequestType(obj, _argumentName) {
    return ((obj === "ImmediateReturn" ||
        obj === "WaitForTxCert" ||
        obj === "WaitForEffectsCert" ||
        obj === "WaitForLocalExecution"));
}
exports.isExecuteTransactionRequestType = isExecuteTransactionRequestType;
function isTransactionKindName(obj, _argumentName) {
    return ((obj === "Publish" ||
        obj === "TransferObject" ||
        obj === "Pay" ||
        obj === "Call" ||
        obj === "TransferSui" ||
        obj === "ChangeEpoch" ||
        obj === "PaySui" ||
        obj === "PayAllSui"));
}
exports.isTransactionKindName = isTransactionKindName;
function isSuiTransactionKind(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransferObject(obj.TransferObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiMovePackage(obj.Publish) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isMoveCall(obj.Call) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiTransferSui(obj.TransferSui) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiChangeEpoch(obj.ChangeEpoch) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isPay(obj.Pay) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isPaySui(obj.PaySui) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isPayAllSui(obj.PayAllSui)));
}
exports.isSuiTransactionKind = isSuiTransactionKind;
function isSuiTransactionData(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.transactions) &&
        obj.transactions.every((e) => isSuiTransactionKind(e)) &&
        isTransactionDigest(obj.sender) &&
        isSuiObjectRef(obj.gasPayment) &&
        isSuiMoveTypeParameterIndex(obj.gasBudget));
}
exports.isSuiTransactionData = isSuiTransactionData;
function isEpochId(obj, _argumentName) {
    return (typeof obj === "number");
}
exports.isEpochId = isEpochId;
function isGenericAuthoritySignature(obj, _argumentName) {
    return ((isTransactionDigest(obj) ||
        Array.isArray(obj) &&
            obj.every((e) => isTransactionDigest(e))));
}
exports.isGenericAuthoritySignature = isGenericAuthoritySignature;
function isAuthorityQuorumSignInfo(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.epoch) &&
        isGenericAuthoritySignature(obj.signature));
}
exports.isAuthorityQuorumSignInfo = isAuthorityQuorumSignInfo;
function isCertifiedTransaction(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.transactionDigest) &&
        isSuiTransactionData(obj.data) &&
        isTransactionDigest(obj.txSignature) &&
        isAuthorityQuorumSignInfo(obj.authSignInfo));
}
exports.isCertifiedTransaction = isCertifiedTransaction;
function isGasCostSummary(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.computationCost) &&
        isSuiMoveTypeParameterIndex(obj.storageCost) &&
        isSuiMoveTypeParameterIndex(obj.storageRebate));
}
exports.isGasCostSummary = isGasCostSummary;
function isExecutionStatusType(obj, _argumentName) {
    return ((obj === "success" ||
        obj === "failure"));
}
exports.isExecutionStatusType = isExecutionStatusType;
function isExecutionStatus(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isExecutionStatusType(obj.status) &&
        isTransactionDigest(obj.error));
}
exports.isExecutionStatus = isExecutionStatus;
function isOwnedObjectRef(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isObjectOwner(obj.owner) &&
        isSuiObjectRef(obj.reference));
}
exports.isOwnedObjectRef = isOwnedObjectRef;
function isTransactionEffects(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isExecutionStatus(obj.status) &&
        isGasCostSummary(obj.gasUsed) &&
        Array.isArray(obj.sharedObjects) &&
        obj.sharedObjects.every((e) => isSuiObjectRef(e)) &&
        isTransactionDigest(obj.transactionDigest) &&
        Array.isArray(obj.created) &&
        obj.created.every((e) => isOwnedObjectRef(e)) &&
        Array.isArray(obj.mutated) &&
        obj.mutated.every((e) => isOwnedObjectRef(e)) &&
        Array.isArray(obj.unwrapped) &&
        obj.unwrapped.every((e) => isOwnedObjectRef(e)) &&
        Array.isArray(obj.deleted) &&
        obj.deleted.every((e) => isSuiObjectRef(e)) &&
        Array.isArray(obj.wrapped) &&
        obj.wrapped.every((e) => isSuiObjectRef(e)) &&
        isOwnedObjectRef(obj.gasObject) &&
        Array.isArray(obj.events) &&
        obj.events.every((e) => isSuiEvent(e)) &&
        Array.isArray(obj.dependencies) &&
        obj.dependencies.every((e) => isTransactionDigest(e)));
}
exports.isTransactionEffects = isTransactionEffects;
function isSuiTransactionResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isCertifiedTransaction(obj.certificate) &&
        isTransactionEffects(obj.effects) &&
        isSuiMoveTypeParameterIndex(obj.timestamp_ms) &&
        isSuiParsedTransactionResponse(obj.parsed_data));
}
exports.isSuiTransactionResponse = isSuiTransactionResponse;
function isSuiTransactionAuthSignersResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.signers) &&
        obj.signers.every((e) => isTransactionDigest(e)));
}
exports.isSuiTransactionAuthSignersResponse = isSuiTransactionAuthSignersResponse;
function isSuiCertifiedTransactionEffects(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionEffects(obj.effects));
}
exports.isSuiCertifiedTransactionEffects = isSuiCertifiedTransactionEffects;
function isSuiExecuteTransactionResponse(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.ImmediateReturn !== null &&
            typeof obj.ImmediateReturn === "object" ||
            typeof obj.ImmediateReturn === "function") &&
        isTransactionDigest(obj.ImmediateReturn.tx_digest) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.TxCert !== null &&
                typeof obj.TxCert === "object" ||
                typeof obj.TxCert === "function") &&
            isCertifiedTransaction(obj.TxCert.certificate) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.EffectsCert !== null &&
                typeof obj.EffectsCert === "object" ||
                typeof obj.EffectsCert === "function") &&
            isCertifiedTransaction(obj.EffectsCert.certificate) &&
            isSuiCertifiedTransactionEffects(obj.EffectsCert.effects)));
}
exports.isSuiExecuteTransactionResponse = isSuiExecuteTransactionResponse;
function isGatewayTxSeqNumber(obj, _argumentName) {
    return (typeof obj === "number");
}
exports.isGatewayTxSeqNumber = isGatewayTxSeqNumber;
function isGetTxnDigestsResponse(obj, _argumentName) {
    return (Array.isArray(obj) &&
        obj.every((e) => isTransactionDigest(e)));
}
exports.isGetTxnDigestsResponse = isGetTxnDigestsResponse;
function isPaginatedTransactionDigests(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.data) &&
        obj.data.every((e) => isTransactionDigest(e)) &&
        isTransactionDigest(obj.nextCursor));
}
exports.isPaginatedTransactionDigests = isPaginatedTransactionDigests;
function isTransactionQuery(obj, _argumentName) {
    return ((obj === "All" ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.MoveFunction !== null &&
                typeof obj.MoveFunction === "object" ||
                typeof obj.MoveFunction === "function") &&
            isTransactionDigest(obj.MoveFunction.package) &&
            isTransactionDigest(obj.MoveFunction.module) &&
            isTransactionDigest(obj.MoveFunction.function) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.InputObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.MutatedObject) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.FromAddress) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTransactionDigest(obj.ToAddress)));
}
exports.isTransactionQuery = isTransactionQuery;
function isMoveCall(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiObjectRef(obj.package) &&
        isTransactionDigest(obj.module) &&
        isTransactionDigest(obj.function) &&
        Array.isArray(obj.typeArguments) &&
        obj.typeArguments.every((e) => isTransactionDigest(e)) &&
        Array.isArray(obj.arguments) &&
        obj.arguments.every((e) => isSuiJsonValue(e)));
}
exports.isMoveCall = isMoveCall;
function isSuiJsonValue(obj, _argumentName) {
    return ((isTransactionDigest(obj) ||
        isSuiMoveTypeParameterIndex(obj) ||
        obj === false ||
        obj === true ||
        Array.isArray(obj) &&
            obj.every((e) => isSuiJsonValue(e))));
}
exports.isSuiJsonValue = isSuiJsonValue;
function isEmptySignInfo(obj, _argumentName) {
    return (typeof obj === "object");
}
exports.isEmptySignInfo = isEmptySignInfo;
function isAuthorityName(obj, _argumentName) {
    return (typeof obj === "string");
}
exports.isAuthorityName = isAuthorityName;
function isAuthoritySignature(obj, _argumentName) {
    return (typeof obj === "string");
}
exports.isAuthoritySignature = isAuthoritySignature;
function isTransactionBytes(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.txBytes) &&
        isSuiObjectRef(obj.gas));
}
exports.isTransactionBytes = isTransactionBytes;
function isSuiParsedMergeCoinResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiObject(obj.updatedCoin) &&
        isSuiObject(obj.updatedGas));
}
exports.isSuiParsedMergeCoinResponse = isSuiParsedMergeCoinResponse;
function isSuiParsedSplitCoinResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiObject(obj.updatedCoin) &&
        Array.isArray(obj.newCoins) &&
        obj.newCoins.every((e) => isSuiObject(e)) &&
        isSuiObject(obj.updatedGas));
}
exports.isSuiParsedSplitCoinResponse = isSuiParsedSplitCoinResponse;
function isSuiParsedPublishResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        Array.isArray(obj.createdObjects) &&
        obj.createdObjects.every((e) => isSuiObject(e)) &&
        isSuiPackage(obj.package) &&
        isSuiObject(obj.updatedGas));
}
exports.isSuiParsedPublishResponse = isSuiParsedPublishResponse;
function isSuiPackage(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.digest) &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.version));
}
exports.isSuiPackage = isSuiPackage;
function isSuiParsedTransactionResponse(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiParsedSplitCoinResponse(obj.SplitCoin) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiParsedMergeCoinResponse(obj.MergeCoin) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSuiParsedPublishResponse(obj.Publish)));
}
exports.isSuiParsedTransactionResponse = isSuiParsedTransactionResponse;
function isCoinMetadata(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.decimals) &&
        isTransactionDigest(obj.name) &&
        isTransactionDigest(obj.symbol) &&
        isTransactionDigest(obj.description) &&
        isTransactionDigest(obj.iconUrl) &&
        isTransactionDigest(obj.id));
}
exports.isCoinMetadata = isCoinMetadata;
function isDelegationData(obj, _argumentName) {
    return (isSuiMoveObject(obj) &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        isObjectType(obj.dataType) &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.type === "0x2::delegation::Delegation" &&
        (obj.fields !== null &&
            typeof obj.fields === "object" ||
            typeof obj.fields === "function") &&
        (isSuiMoveTypeParameterIndex(obj.fields.active_delegation) ||
            (obj.fields.active_delegation !== null &&
                typeof obj.fields.active_delegation === "object" ||
                typeof obj.fields.active_delegation === "function") &&
                (obj.fields.active_delegation.fields !== null &&
                    typeof obj.fields.active_delegation.fields === "object" ||
                    typeof obj.fields.active_delegation.fields === "function") &&
                obj.fields.active_delegation.fields.vec === "" &&
                isTransactionDigest(obj.fields.active_delegation.type)) &&
        isSuiMoveTypeParameterIndex(obj.fields.delegate_amount) &&
        isSuiMoveTypeParameterIndex(obj.fields.next_reward_unclaimed_epoch) &&
        isTransactionDigest(obj.fields.validator_address) &&
        (obj.fields.info !== null &&
            typeof obj.fields.info === "object" ||
            typeof obj.fields.info === "function") &&
        isTransactionDigest(obj.fields.info.id) &&
        isSuiMoveTypeParameterIndex(obj.fields.info.version) &&
        (isSuiMoveObject(obj.fields.coin_locked_until_epoch) ||
            (obj.fields.coin_locked_until_epoch !== null &&
                typeof obj.fields.coin_locked_until_epoch === "object" ||
                typeof obj.fields.coin_locked_until_epoch === "function") &&
                (obj.fields.coin_locked_until_epoch.fields !== null &&
                    typeof obj.fields.coin_locked_until_epoch.fields === "object" ||
                    typeof obj.fields.coin_locked_until_epoch.fields === "function") &&
                obj.fields.coin_locked_until_epoch.fields.vec === "" &&
                isTransactionDigest(obj.fields.coin_locked_until_epoch.type)) &&
        (isSuiMoveTypeParameterIndex(obj.fields.ending_epoch) ||
            (obj.fields.ending_epoch !== null &&
                typeof obj.fields.ending_epoch === "object" ||
                typeof obj.fields.ending_epoch === "function") &&
                (obj.fields.ending_epoch.fields !== null &&
                    typeof obj.fields.ending_epoch.fields === "object" ||
                    typeof obj.fields.ending_epoch.fields === "function") &&
                obj.fields.ending_epoch.fields.vec === "" &&
                isTransactionDigest(obj.fields.ending_epoch.type)));
}
exports.isDelegationData = isDelegationData;
function isDelegationSuiObject(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isObjectOwner(obj.owner) &&
        isTransactionDigest(obj.previousTransaction) &&
        isSuiMoveTypeParameterIndex(obj.storageRebate) &&
        isSuiObjectRef(obj.reference) &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        isDelegationData(obj.data));
}
exports.isDelegationSuiObject = isDelegationSuiObject;
function isTransferObjectTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.TransferObject !== null &&
            typeof obj.TransferObject === "object" ||
            typeof obj.TransferObject === "function") &&
        isTransactionDigest(obj.TransferObject.recipient) &&
        isSuiObjectRef(obj.TransferObject.object_ref));
}
exports.isTransferObjectTx = isTransferObjectTx;
function isTransferSuiTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.TransferSui !== null &&
            typeof obj.TransferSui === "object" ||
            typeof obj.TransferSui === "function") &&
        isTransactionDigest(obj.TransferSui.recipient) &&
        ((obj.TransferSui.amount !== null &&
            typeof obj.TransferSui.amount === "object" ||
            typeof obj.TransferSui.amount === "function") &&
            isSuiMoveTypeParameterIndex(obj.TransferSui.amount.Some) ||
            (obj.TransferSui.amount !== null &&
                typeof obj.TransferSui.amount === "object" ||
                typeof obj.TransferSui.amount === "function") &&
                obj.TransferSui.amount.None === null));
}
exports.isTransferSuiTx = isTransferSuiTx;
function isPayTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.Pay !== null &&
            typeof obj.Pay === "object" ||
            typeof obj.Pay === "function") &&
        Array.isArray(obj.Pay.coins) &&
        obj.Pay.coins.every((e) => isSuiObjectRef(e)) &&
        Array.isArray(obj.Pay.recipients) &&
        obj.Pay.recipients.every((e) => isTransactionDigest(e)) &&
        Array.isArray(obj.Pay.amounts) &&
        obj.Pay.amounts.every((e) => isSuiMoveTypeParameterIndex(e)));
}
exports.isPayTx = isPayTx;
function isPaySuiTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.PaySui !== null &&
            typeof obj.PaySui === "object" ||
            typeof obj.PaySui === "function") &&
        Array.isArray(obj.PaySui.coins) &&
        obj.PaySui.coins.every((e) => isSuiObjectRef(e)) &&
        Array.isArray(obj.PaySui.recipients) &&
        obj.PaySui.recipients.every((e) => isTransactionDigest(e)) &&
        Array.isArray(obj.PaySui.amounts) &&
        obj.PaySui.amounts.every((e) => isSuiMoveTypeParameterIndex(e)));
}
exports.isPaySuiTx = isPaySuiTx;
function isPayAllSuiTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.PayAllSui !== null &&
            typeof obj.PayAllSui === "object" ||
            typeof obj.PayAllSui === "function") &&
        Array.isArray(obj.PayAllSui.coins) &&
        obj.PayAllSui.coins.every((e) => isSuiObjectRef(e)) &&
        isTransactionDigest(obj.PayAllSui.recipient));
}
exports.isPayAllSuiTx = isPayAllSuiTx;
function isPublishTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.Publish !== null &&
            typeof obj.Publish === "object" ||
            typeof obj.Publish === "function") &&
        (obj.Publish.modules !== null &&
            typeof obj.Publish.modules === "object" ||
            typeof obj.Publish.modules === "function") &&
        isSuiMoveTypeParameterIndex(obj.Publish.modules.length));
}
exports.isPublishTx = isPublishTx;
function isSharedObjectRef(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.objectId) &&
        isSuiMoveTypeParameterIndex(obj.initialSharedVersion));
}
exports.isSharedObjectRef = isSharedObjectRef;
function isObjectArg(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiObjectRef(obj.ImmOrOwned) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isSharedObjectRef(obj.Shared)));
}
exports.isObjectArg = isObjectArg;
function isCallArg(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.Pure !== null &&
            typeof obj.Pure === "object" ||
            typeof obj.Pure === "function") &&
        isSuiMoveTypeParameterIndex(obj.Pure.length) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isObjectArg(obj.Object) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (obj.ObjVec !== null &&
                typeof obj.ObjVec === "object" ||
                typeof obj.ObjVec === "function") &&
            isSuiMoveTypeParameterIndex(obj.ObjVec.length)));
}
exports.isCallArg = isCallArg;
function isStructTag(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.address) &&
        isTransactionDigest(obj.module) &&
        isTransactionDigest(obj.name) &&
        Array.isArray(obj.typeParams) &&
        obj.typeParams.every((e) => isTypeTag(e)));
}
exports.isStructTag = isStructTag;
function isTypeTag(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        obj.bool === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.u8 === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.u64 === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.u128 === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.address === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.signer === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isTypeTag(obj.vector) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isStructTag(obj.struct) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.u16 === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.u32 === null ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            obj.u256 === null));
}
exports.isTypeTag = isTypeTag;
function isMoveCallTx(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        (obj.Call !== null &&
            typeof obj.Call === "object" ||
            typeof obj.Call === "function") &&
        isSuiObjectRef(obj.Call.package) &&
        isTransactionDigest(obj.Call.module) &&
        isTransactionDigest(obj.Call.function) &&
        Array.isArray(obj.Call.typeArguments) &&
        obj.Call.typeArguments.every((e) => isTypeTag(e)) &&
        Array.isArray(obj.Call.arguments) &&
        obj.Call.arguments.every((e) => isCallArg(e)));
}
exports.isMoveCallTx = isMoveCallTx;
function isTransaction(obj, _argumentName) {
    return ((isTransferObjectTx(obj) ||
        isTransferSuiTx(obj) ||
        isPayTx(obj) ||
        isPaySuiTx(obj) ||
        isPayAllSuiTx(obj) ||
        isPublishTx(obj) ||
        isMoveCallTx(obj)));
}
exports.isTransaction = isTransaction;
function isTransactionKind(obj, _argumentName) {
    return (((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransaction(obj.Single) ||
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            Array.isArray(obj.Batch) &&
            obj.Batch.every((e) => isTransaction(e))));
}
exports.isTransactionKind = isTransactionKind;
function isTransactionData(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isTransactionDigest(obj.sender) &&
        isSuiMoveTypeParameterIndex(obj.gasBudget) &&
        isSuiMoveTypeParameterIndex(obj.gasPrice) &&
        isTransactionKind(obj.kind) &&
        isSuiObjectRef(obj.gasPayment));
}
exports.isTransactionData = isTransactionData;
function isRpcApiVersion(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.major) &&
        isSuiMoveTypeParameterIndex(obj.minor) &&
        isSuiMoveTypeParameterIndex(obj.patch));
}
exports.isRpcApiVersion = isRpcApiVersion;
function isFaucetCoinInfo(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isSuiMoveTypeParameterIndex(obj.amount) &&
        isTransactionDigest(obj.id) &&
        isTransactionDigest(obj.transfer_tx_digest));
}
exports.isFaucetCoinInfo = isFaucetCoinInfo;
function isFaucetResponse(obj, _argumentName) {
    return ((obj !== null &&
        typeof obj === "object" ||
        typeof obj === "function") &&
        isFaucetCoinInfo(obj.transferred_gas_objects) &&
        isTransactionDigest(obj.error));
}
exports.isFaucetResponse = isFaucetResponse;
//# sourceMappingURL=index.guard.js.map
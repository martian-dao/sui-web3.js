"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImmutableObject = exports.hasPublicTransfer = exports.getSuiObjectData = exports.getSharedObjectInitialVersion = exports.getObjectVersion = exports.getObjectType = exports.getObjectReference = exports.getObjectPreviousTransactionDigest = exports.getObjectOwner = exports.getObjectNotExistsResponse = exports.getObjectId = exports.getObjectFields = exports.getObjectDisplay = exports.getObjectDeletedResponse = exports.getMovePackageContent = exports.getMoveObjectType = exports.getMoveObject = exports.SuiRawMovePackage = exports.SuiRawMoveObject = exports.SuiRawData = exports.SuiParsedData = exports.SuiObjectResponseError = exports.SuiObjectResponse = exports.SuiObjectRef = exports.SuiObjectInfo = exports.SuiObjectDataOptions = exports.SuiObjectData = exports.SuiMovePackage = exports.SuiMoveObject = exports.SuiGasData = exports.PaginatedObjectsResponse = exports.ObjectType = exports.ObjectStatus = exports.ObjectRead = exports.ObjectDigest = exports.ObjectContentFields = exports.MovePackageContent = exports.GetOwnedObjectsResponse = exports.DisplayFieldsResponse = exports.DisplayFieldsBackwardCompatibleResponse = exports.CheckpointedObjectId = exports.ObjectId = exports.TransactionEventDigest = exports.TransactionEffectsDigest = exports.TransactionDigest = exports.SequenceNumber = exports.SuiAddress = exports.SuiJsonValue = exports.ProtocolConfig = exports.ObjectOwner = void 0;
exports.getObjectChanges = exports.getNewlyCreatedCoinRefsAfterSplit = exports.getGasData = exports.getExecutionStatusType = exports.getExecutionStatusGasSummary = exports.getExecutionStatusError = exports.getExecutionStatus = exports.getEvents = exports.getCreatedObjects = exports.getConsensusCommitPrologueTransaction = exports.getChangeEpochTransaction = exports.TransactionEvents = exports.TransactionEffectsModifiedAtVersions = exports.TransactionEffects = exports.SuiTransactionBlockResponseOptions = exports.SuiTransactionBlockResponse = exports.SuiTransactionBlockData = exports.SuiTransactionBlock = exports.SuiTransaction = exports.SuiObjectChangeWrapped = exports.SuiObjectChangeTransferred = exports.SuiObjectChangePublished = exports.SuiObjectChangeMutated = exports.SuiObjectChangeDeleted = exports.SuiObjectChangeCreated = exports.SuiObjectChange = exports.SuiConsensusCommitPrologue = exports.SuiChangeEpoch = exports.SuiCallArg = exports.SuiArgument = exports.ProgrammableTransaction = exports.PaginatedTransactionResponse = exports.OwnedObjectRef = exports.MoveCallSuiTransaction = exports.Genesis = exports.ExecutionStatusType = exports.ExecutionStatus = exports.EpochId = exports.DryRunTransactionBlockResponse = exports.DevInspectResults = exports.BalanceChange = exports.AuthoritySignature = exports.AuthorityName = exports.getEventSender = exports.getEventPackage = exports.SuiEvent = exports.PaginatedEvents = exports.EventId = exports.isSuiObjectResponse = exports.isSharedObject = void 0;
exports.EpochPage = exports.EpochInfo = exports.EndOfEpochInfo = exports.PaginatedCoins = exports.CoinSupply = exports.CoinStruct = exports.CoinBalance = exports.ValidatorsApy = exports.Validators = exports.SuiValidatorSummary = exports.SuiSystemStateSummary = exports.StakeObject = exports.DelegatedStake = exports.CommitteeInfo = exports.Balance = exports.Apy = exports.extractStructTag = exports.extractReference = exports.extractMutableReference = exports.SuiMoveVisibility = exports.SuiMoveStructTypeParameter = exports.SuiMoveNormalizedTypeParameterType = exports.SuiMoveNormalizedType = exports.SuiMoveNormalizedStructType = exports.SuiMoveNormalizedStruct = exports.SuiMoveNormalizedModules = exports.SuiMoveNormalizedModule = exports.SuiMoveNormalizedFunction = exports.SuiMoveNormalizedField = exports.SuiMoveModuleId = exports.SuiMoveFunctionArgTypes = exports.SuiMoveFunctionArgType = exports.SuiMoveAbilitySet = exports.MoveCallMetrics = exports.MoveCallMetric = exports.getTransactionSignature = exports.getTransactionSender = exports.getTransactionKindName = exports.getTransactionKind = exports.getTransactionGasPrice = exports.getTransactionGasObject = exports.getTransactionGasBudget = exports.getTransactionEffects = exports.getTransactionDigest = exports.getTransaction = exports.getTotalGasUsedUpperBound = exports.getTotalGasUsed = exports.getTimestampFromTransactionResponse = exports.getPublishedObjectChanges = exports.getProgrammableTransaction = void 0;
exports.SuiSupplyFields = exports.StakeSubsidyFields = exports.StakeSubsidy = exports.DelegationStakingPoolFields = exports.DelegationStakingPool = exports.ContentsFieldsWithdraw = exports.ContentsFields = exports.Contents = exports.NetworkMetrics = exports.AllEpochsAddressMetrics = exports.AddressMetrics = exports.GasCostSummary = exports.EndOfEpochData = exports.CheckpointPage = exports.CheckpointDigest = exports.CheckpointCommitment = exports.Checkpoint = exports.CheckPointContentsDigest = exports.ValidatorSignature = exports.DynamicFieldType = exports.DynamicFieldPage = exports.DynamicFieldName = exports.DynamicFieldInfo = exports.ResolvedNameServiceNames = void 0;
var common_1 = require("./common");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ObjectOwner", { enumerable: true, get: function () { return common_1.ObjectOwner; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ProtocolConfig", { enumerable: true, get: function () { return common_1.ProtocolConfig; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiJsonValue", { enumerable: true, get: function () { return common_1.SuiJsonValue; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "SuiAddress", { enumerable: true, get: function () { return common_1.SuiAddress; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "SequenceNumber", { enumerable: true, get: function () { return common_1.SequenceNumber; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "TransactionDigest", { enumerable: true, get: function () { return common_1.TransactionDigest; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "TransactionEffectsDigest", { enumerable: true, get: function () { return common_1.TransactionEffectsDigest; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "TransactionEventDigest", { enumerable: true, get: function () { return common_1.TransactionEventDigest; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "ObjectId", { enumerable: true, get: function () { return common_1.ObjectId; } });
var objects_1 = require("./objects");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "CheckpointedObjectId", { enumerable: true, get: function () { return objects_1.CheckpointedObjectId; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DisplayFieldsBackwardCompatibleResponse", { enumerable: true, get: function () { return objects_1.DisplayFieldsBackwardCompatibleResponse; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DisplayFieldsResponse", { enumerable: true, get: function () { return objects_1.DisplayFieldsResponse; } });
/** @deprecated This type will be removed in a future version */
Object.defineProperty(exports, "GetOwnedObjectsResponse", { enumerable: true, get: function () { return objects_1.GetOwnedObjectsResponse; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "MovePackageContent", { enumerable: true, get: function () { return objects_1.MovePackageContent; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ObjectContentFields", { enumerable: true, get: function () { return objects_1.ObjectContentFields; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "ObjectDigest", { enumerable: true, get: function () { return objects_1.ObjectDigest; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ObjectRead", { enumerable: true, get: function () { return objects_1.ObjectRead; } });
/** @deprecated This type will be removed in a future version */
Object.defineProperty(exports, "ObjectStatus", { enumerable: true, get: function () { return objects_1.ObjectStatus; } });
/** @deprecated This type will be removed in a future version */
Object.defineProperty(exports, "ObjectType", { enumerable: true, get: function () { return objects_1.ObjectType; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "PaginatedObjectsResponse", { enumerable: true, get: function () { return objects_1.PaginatedObjectsResponse; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiGasData", { enumerable: true, get: function () { return objects_1.SuiGasData; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveObject", { enumerable: true, get: function () { return objects_1.SuiMoveObject; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMovePackage", { enumerable: true, get: function () { return objects_1.SuiMovePackage; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectData", { enumerable: true, get: function () { return objects_1.SuiObjectData; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectDataOptions", { enumerable: true, get: function () { return objects_1.SuiObjectDataOptions; } });
/** @deprecated This type will be removed in a future version */
Object.defineProperty(exports, "SuiObjectInfo", { enumerable: true, get: function () { return objects_1.SuiObjectInfo; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectRef", { enumerable: true, get: function () { return objects_1.SuiObjectRef; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectResponse", { enumerable: true, get: function () { return objects_1.SuiObjectResponse; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectResponseError", { enumerable: true, get: function () { return objects_1.SuiObjectResponseError; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiParsedData", { enumerable: true, get: function () { return objects_1.SuiParsedData; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiRawData", { enumerable: true, get: function () { return objects_1.SuiRawData; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiRawMoveObject", { enumerable: true, get: function () { return objects_1.SuiRawMoveObject; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiRawMovePackage", { enumerable: true, get: function () { return objects_1.SuiRawMovePackage; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getMoveObject", { enumerable: true, get: function () { return objects_1.getMoveObject; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getMoveObjectType", { enumerable: true, get: function () { return objects_1.getMoveObjectType; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getMovePackageContent", { enumerable: true, get: function () { return objects_1.getMovePackageContent; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectDeletedResponse", { enumerable: true, get: function () { return objects_1.getObjectDeletedResponse; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectDisplay", { enumerable: true, get: function () { return objects_1.getObjectDisplay; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectFields", { enumerable: true, get: function () { return objects_1.getObjectFields; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectId", { enumerable: true, get: function () { return objects_1.getObjectId; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectNotExistsResponse", { enumerable: true, get: function () { return objects_1.getObjectNotExistsResponse; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectOwner", { enumerable: true, get: function () { return objects_1.getObjectOwner; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectPreviousTransactionDigest", { enumerable: true, get: function () { return objects_1.getObjectPreviousTransactionDigest; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectReference", { enumerable: true, get: function () { return objects_1.getObjectReference; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectType", { enumerable: true, get: function () { return objects_1.getObjectType; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectVersion", { enumerable: true, get: function () { return objects_1.getObjectVersion; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getSharedObjectInitialVersion", { enumerable: true, get: function () { return objects_1.getSharedObjectInitialVersion; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getSuiObjectData", { enumerable: true, get: function () { return objects_1.getSuiObjectData; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "hasPublicTransfer", { enumerable: true, get: function () { return objects_1.hasPublicTransfer; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "isImmutableObject", { enumerable: true, get: function () { return objects_1.isImmutableObject; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "isSharedObject", { enumerable: true, get: function () { return objects_1.isSharedObject; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "isSuiObjectResponse", { enumerable: true, get: function () { return objects_1.isSuiObjectResponse; } });
var events_1 = require("./events");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "EventId", { enumerable: true, get: function () { return events_1.EventId; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "PaginatedEvents", { enumerable: true, get: function () { return events_1.PaginatedEvents; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiEvent", { enumerable: true, get: function () { return events_1.SuiEvent; } });
Object.defineProperty(exports, "getEventPackage", { enumerable: true, get: function () { return events_1.getEventPackage; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getEventSender", { enumerable: true, get: function () { return events_1.getEventSender; } });
var transactions_1 = require("./transactions");
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "AuthorityName", { enumerable: true, get: function () { return transactions_1.AuthorityName; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "AuthoritySignature", { enumerable: true, get: function () { return transactions_1.AuthoritySignature; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "BalanceChange", { enumerable: true, get: function () { return transactions_1.BalanceChange; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DevInspectResults", { enumerable: true, get: function () { return transactions_1.DevInspectResults; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DryRunTransactionBlockResponse", { enumerable: true, get: function () { return transactions_1.DryRunTransactionBlockResponse; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "EpochId", { enumerable: true, get: function () { return transactions_1.EpochId; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ExecutionStatus", { enumerable: true, get: function () { return transactions_1.ExecutionStatus; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ExecutionStatusType", { enumerable: true, get: function () { return transactions_1.ExecutionStatusType; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "Genesis", { enumerable: true, get: function () { return transactions_1.Genesis; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "MoveCallSuiTransaction", { enumerable: true, get: function () { return transactions_1.MoveCallSuiTransaction; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "OwnedObjectRef", { enumerable: true, get: function () { return transactions_1.OwnedObjectRef; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "PaginatedTransactionResponse", { enumerable: true, get: function () { return transactions_1.PaginatedTransactionResponse; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ProgrammableTransaction", { enumerable: true, get: function () { return transactions_1.ProgrammableTransaction; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiArgument", { enumerable: true, get: function () { return transactions_1.SuiArgument; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiCallArg", { enumerable: true, get: function () { return transactions_1.SuiCallArg; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiChangeEpoch", { enumerable: true, get: function () { return transactions_1.SuiChangeEpoch; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiConsensusCommitPrologue", { enumerable: true, get: function () { return transactions_1.SuiConsensusCommitPrologue; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChange", { enumerable: true, get: function () { return transactions_1.SuiObjectChange; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChangeCreated", { enumerable: true, get: function () { return transactions_1.SuiObjectChangeCreated; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChangeDeleted", { enumerable: true, get: function () { return transactions_1.SuiObjectChangeDeleted; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChangeMutated", { enumerable: true, get: function () { return transactions_1.SuiObjectChangeMutated; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChangePublished", { enumerable: true, get: function () { return transactions_1.SuiObjectChangePublished; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChangeTransferred", { enumerable: true, get: function () { return transactions_1.SuiObjectChangeTransferred; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiObjectChangeWrapped", { enumerable: true, get: function () { return transactions_1.SuiObjectChangeWrapped; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiTransaction", { enumerable: true, get: function () { return transactions_1.SuiTransaction; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiTransactionBlock", { enumerable: true, get: function () { return transactions_1.SuiTransactionBlock; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiTransactionBlockData", { enumerable: true, get: function () { return transactions_1.SuiTransactionBlockData; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiTransactionBlockResponse", { enumerable: true, get: function () { return transactions_1.SuiTransactionBlockResponse; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiTransactionBlockResponseOptions", { enumerable: true, get: function () { return transactions_1.SuiTransactionBlockResponseOptions; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "TransactionEffects", { enumerable: true, get: function () { return transactions_1.TransactionEffects; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "TransactionEffectsModifiedAtVersions", { enumerable: true, get: function () { return transactions_1.TransactionEffectsModifiedAtVersions; } });
/** @deprecated Use SuiEvent[] from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "TransactionEvents", { enumerable: true, get: function () { return transactions_1.TransactionEvents; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getChangeEpochTransaction", { enumerable: true, get: function () { return transactions_1.getChangeEpochTransaction; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getConsensusCommitPrologueTransaction", { enumerable: true, get: function () { return transactions_1.getConsensusCommitPrologueTransaction; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getCreatedObjects", { enumerable: true, get: function () { return transactions_1.getCreatedObjects; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getEvents", { enumerable: true, get: function () { return transactions_1.getEvents; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getExecutionStatus", { enumerable: true, get: function () { return transactions_1.getExecutionStatus; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getExecutionStatusError", { enumerable: true, get: function () { return transactions_1.getExecutionStatusError; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getExecutionStatusGasSummary", { enumerable: true, get: function () { return transactions_1.getExecutionStatusGasSummary; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getExecutionStatusType", { enumerable: true, get: function () { return transactions_1.getExecutionStatusType; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getGasData", { enumerable: true, get: function () { return transactions_1.getGasData; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getNewlyCreatedCoinRefsAfterSplit", { enumerable: true, get: function () { return transactions_1.getNewlyCreatedCoinRefsAfterSplit; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getObjectChanges", { enumerable: true, get: function () { return transactions_1.getObjectChanges; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getProgrammableTransaction", { enumerable: true, get: function () { return transactions_1.getProgrammableTransaction; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getPublishedObjectChanges", { enumerable: true, get: function () { return transactions_1.getPublishedObjectChanges; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTimestampFromTransactionResponse", { enumerable: true, get: function () { return transactions_1.getTimestampFromTransactionResponse; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTotalGasUsed", { enumerable: true, get: function () { return transactions_1.getTotalGasUsed; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTotalGasUsedUpperBound", { enumerable: true, get: function () { return transactions_1.getTotalGasUsedUpperBound; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransaction", { enumerable: true, get: function () { return transactions_1.getTransaction; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionDigest", { enumerable: true, get: function () { return transactions_1.getTransactionDigest; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionEffects", { enumerable: true, get: function () { return transactions_1.getTransactionEffects; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionGasBudget", { enumerable: true, get: function () { return transactions_1.getTransactionGasBudget; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionGasObject", { enumerable: true, get: function () { return transactions_1.getTransactionGasObject; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionGasPrice", { enumerable: true, get: function () { return transactions_1.getTransactionGasPrice; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionKind", { enumerable: true, get: function () { return transactions_1.getTransactionKind; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionKindName", { enumerable: true, get: function () { return transactions_1.getTransactionKindName; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionSender", { enumerable: true, get: function () { return transactions_1.getTransactionSender; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "getTransactionSignature", { enumerable: true, get: function () { return transactions_1.getTransactionSignature; } });
var normalized_1 = require("./normalized");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "MoveCallMetric", { enumerable: true, get: function () { return normalized_1.MoveCallMetric; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "MoveCallMetrics", { enumerable: true, get: function () { return normalized_1.MoveCallMetrics; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveAbilitySet", { enumerable: true, get: function () { return normalized_1.SuiMoveAbilitySet; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveFunctionArgType", { enumerable: true, get: function () { return normalized_1.SuiMoveFunctionArgType; } });
/* @deprecated Use SuiMoveFunctionArgType[] from `@mysten/sui-js/client` instead */
Object.defineProperty(exports, "SuiMoveFunctionArgTypes", { enumerable: true, get: function () { return normalized_1.SuiMoveFunctionArgTypes; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveModuleId", { enumerable: true, get: function () { return normalized_1.SuiMoveModuleId; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedField", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedField; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedFunction", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedFunction; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedModule", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedModule; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedModules", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedModules; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedStruct", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedStruct; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedStructType", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedStructType; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedType", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedType; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveNormalizedTypeParameterType", { enumerable: true, get: function () { return normalized_1.SuiMoveNormalizedTypeParameterType; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveStructTypeParameter", { enumerable: true, get: function () { return normalized_1.SuiMoveStructTypeParameter; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiMoveVisibility", { enumerable: true, get: function () { return normalized_1.SuiMoveVisibility; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "extractMutableReference", { enumerable: true, get: function () { return normalized_1.extractMutableReference; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "extractReference", { enumerable: true, get: function () { return normalized_1.extractReference; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "extractStructTag", { enumerable: true, get: function () { return normalized_1.extractStructTag; } });
var validator_1 = require("./validator");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "Apy", { enumerable: true, get: function () { return validator_1.Apy; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "Balance", { enumerable: true, get: function () { return validator_1.Balance; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "CommitteeInfo", { enumerable: true, get: function () { return validator_1.CommitteeInfo; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DelegatedStake", { enumerable: true, get: function () { return validator_1.DelegatedStake; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "StakeObject", { enumerable: true, get: function () { return validator_1.StakeObject; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiSystemStateSummary", { enumerable: true, get: function () { return validator_1.SuiSystemStateSummary; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "SuiValidatorSummary", { enumerable: true, get: function () { return validator_1.SuiValidatorSummary; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "Validators", { enumerable: true, get: function () { return validator_1.Validators; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ValidatorsApy", { enumerable: true, get: function () { return validator_1.ValidatorsApy; } });
var coin_1 = require("./coin");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "CoinBalance", { enumerable: true, get: function () { return coin_1.CoinBalance; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "CoinStruct", { enumerable: true, get: function () { return coin_1.CoinStruct; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "CoinSupply", { enumerable: true, get: function () { return coin_1.CoinSupply; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "PaginatedCoins", { enumerable: true, get: function () { return coin_1.PaginatedCoins; } });
var epochs_1 = require("./epochs");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "EndOfEpochInfo", { enumerable: true, get: function () { return epochs_1.EndOfEpochInfo; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "EpochInfo", { enumerable: true, get: function () { return epochs_1.EpochInfo; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "EpochPage", { enumerable: true, get: function () { return epochs_1.EpochPage; } });
var name_service_1 = require("./name-service");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "ResolvedNameServiceNames", { enumerable: true, get: function () { return name_service_1.ResolvedNameServiceNames; } });
var dynamic_fields_1 = require("./dynamic_fields");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DynamicFieldInfo", { enumerable: true, get: function () { return dynamic_fields_1.DynamicFieldInfo; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DynamicFieldName", { enumerable: true, get: function () { return dynamic_fields_1.DynamicFieldName; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DynamicFieldPage", { enumerable: true, get: function () { return dynamic_fields_1.DynamicFieldPage; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "DynamicFieldType", { enumerable: true, get: function () { return dynamic_fields_1.DynamicFieldType; } });
var checkpoints_1 = require("./checkpoints");
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "ValidatorSignature", { enumerable: true, get: function () { return checkpoints_1.ValidatorSignature; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "CheckPointContentsDigest", { enumerable: true, get: function () { return checkpoints_1.CheckPointContentsDigest; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "Checkpoint", { enumerable: true, get: function () { return checkpoints_1.Checkpoint; } });
/** @deprecated Current type is an alias for `any`, use `unknown` instead */
Object.defineProperty(exports, "CheckpointCommitment", { enumerable: true, get: function () { return checkpoints_1.CheckpointCommitment; } });
/** @deprecated Use `string` instead. */
Object.defineProperty(exports, "CheckpointDigest", { enumerable: true, get: function () { return checkpoints_1.CheckpointDigest; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "CheckpointPage", { enumerable: true, get: function () { return checkpoints_1.CheckpointPage; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "EndOfEpochData", { enumerable: true, get: function () { return checkpoints_1.EndOfEpochData; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "GasCostSummary", { enumerable: true, get: function () { return checkpoints_1.GasCostSummary; } });
var metrics_1 = require("./metrics");
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "AddressMetrics", { enumerable: true, get: function () { return metrics_1.AddressMetrics; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "AllEpochsAddressMetrics", { enumerable: true, get: function () { return metrics_1.AllEpochsAddressMetrics; } });
/** @deprecated Import type from `@mysten/sui.js/client` instead */
Object.defineProperty(exports, "NetworkMetrics", { enumerable: true, get: function () { return metrics_1.NetworkMetrics; } });
var validator_2 = require("./validator");
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "Contents", { enumerable: true, get: function () { return validator_2.Contents; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "ContentsFields", { enumerable: true, get: function () { return validator_2.ContentsFields; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "ContentsFieldsWithdraw", { enumerable: true, get: function () { return validator_2.ContentsFieldsWithdraw; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "DelegationStakingPool", { enumerable: true, get: function () { return validator_2.DelegationStakingPool; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "DelegationStakingPoolFields", { enumerable: true, get: function () { return validator_2.DelegationStakingPoolFields; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "StakeSubsidy", { enumerable: true, get: function () { return validator_2.StakeSubsidy; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "StakeSubsidyFields", { enumerable: true, get: function () { return validator_2.StakeSubsidyFields; } });
/** @deprecated This method will be removed in a future version of the SDK */
Object.defineProperty(exports, "SuiSupplyFields", { enumerable: true, get: function () { return validator_2.SuiSupplyFields; } });
//# sourceMappingURL=index.js.map
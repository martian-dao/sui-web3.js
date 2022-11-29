"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewlyCreatedCoinRefsAfterSplit = exports.getNewlyCreatedCoinsAfterSplit = exports.getCoinAfterSplit = exports.getCoinAfterMerge = exports.getParsedPublishResponse = exports.getParsedMergeCoinResponse = exports.getParsedSplitCoinResponse = exports.getTimestampFromTransactionResponse = exports.getCreatedObjects = exports.getEvents = exports.getTransactionEffects = exports.getTotalGasUsed = exports.getExecutionStatusGasSummary = exports.getExecutionStatusError = exports.getExecutionStatus = exports.getExecutionStatusType = exports.getTransactionKindName = exports.getTransferSuiAmount = exports.getTransactions = exports.getChangeEpochTransaction = exports.getPayAllSuiTransaction = exports.getPaySuiTransaction = exports.getPayTransaction = exports.getTransferSuiTransaction = exports.getMoveCallTransaction = exports.getPublishTransaction = exports.getTransferObjectTransaction = exports.getTransactionGasBudget = exports.getTransactionGasObject = exports.getTransactionSender = exports.getTransactionData = exports.getTransactionAuthorityQuorumSignInfo = exports.getTransactionSignature = exports.getTransactionDigest = exports.getCertifiedTransaction = void 0;
const index_guard_1 = require("./index.guard");
/* -------------------------------------------------------------------------- */
/*                              Helper functions                              */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- CertifiedTransaction --------------------------------- */
function getCertifiedTransaction(tx) {
    if ('certificate' in tx) {
        return tx.certificate;
    }
    else if ('TxCert' in tx) {
        return tx.TxCert.certificate;
    }
    else if ('EffectsCert' in tx) {
        return tx.EffectsCert.certificate;
    }
    return undefined;
}
exports.getCertifiedTransaction = getCertifiedTransaction;
function getTransactionDigest(tx) {
    if ('ImmediateReturn' in tx) {
        return tx.ImmediateReturn.tx_digest;
    }
    if ('transactionDigest' in tx) {
        return tx.transactionDigest;
    }
    const ctxn = getCertifiedTransaction(tx);
    return ctxn.transactionDigest;
}
exports.getTransactionDigest = getTransactionDigest;
function getTransactionSignature(tx) {
    return tx.txSignature;
}
exports.getTransactionSignature = getTransactionSignature;
function getTransactionAuthorityQuorumSignInfo(tx) {
    return tx.authSignInfo;
}
exports.getTransactionAuthorityQuorumSignInfo = getTransactionAuthorityQuorumSignInfo;
function getTransactionData(tx) {
    return tx.data;
}
exports.getTransactionData = getTransactionData;
/* ----------------------------- TransactionData ---------------------------- */
function getTransactionSender(tx) {
    return tx.data.sender;
}
exports.getTransactionSender = getTransactionSender;
function getTransactionGasObject(tx) {
    return tx.data.gasPayment;
}
exports.getTransactionGasObject = getTransactionGasObject;
function getTransactionGasBudget(tx) {
    return tx.data.gasBudget;
}
exports.getTransactionGasBudget = getTransactionGasBudget;
function getTransferObjectTransaction(data) {
    return 'TransferObject' in data ? data.TransferObject : undefined;
}
exports.getTransferObjectTransaction = getTransferObjectTransaction;
function getPublishTransaction(data) {
    return 'Publish' in data ? data.Publish : undefined;
}
exports.getPublishTransaction = getPublishTransaction;
function getMoveCallTransaction(data) {
    return 'Call' in data ? data.Call : undefined;
}
exports.getMoveCallTransaction = getMoveCallTransaction;
function getTransferSuiTransaction(data) {
    return 'TransferSui' in data ? data.TransferSui : undefined;
}
exports.getTransferSuiTransaction = getTransferSuiTransaction;
function getPayTransaction(data) {
    return 'Pay' in data ? data.Pay : undefined;
}
exports.getPayTransaction = getPayTransaction;
function getPaySuiTransaction(data) {
    return 'PaySui' in data ? data.PaySui : undefined;
}
exports.getPaySuiTransaction = getPaySuiTransaction;
function getPayAllSuiTransaction(data) {
    return 'PayAllSui' in data ? data.PayAllSui : undefined;
}
exports.getPayAllSuiTransaction = getPayAllSuiTransaction;
function getChangeEpochTransaction(data) {
    return 'ChangeEpoch' in data ? data.ChangeEpoch : undefined;
}
exports.getChangeEpochTransaction = getChangeEpochTransaction;
function getTransactions(data) {
    return data.data.transactions;
}
exports.getTransactions = getTransactions;
function getTransferSuiAmount(data) {
    return 'TransferSui' in data && data.TransferSui.amount
        ? BigInt(data.TransferSui.amount)
        : null;
}
exports.getTransferSuiAmount = getTransferSuiAmount;
function getTransactionKindName(data) {
    return Object.keys(data)[0];
}
exports.getTransactionKindName = getTransactionKindName;
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
    if ((0, index_guard_1.isTransactionEffects)(data)) {
        return data.gasUsed;
    }
    return getTransactionEffects(data)?.gasUsed;
}
exports.getExecutionStatusGasSummary = getExecutionStatusGasSummary;
function getTotalGasUsed(data) {
    const gasSummary = getExecutionStatusGasSummary(data);
    return gasSummary
        ? gasSummary.computationCost +
            gasSummary.storageCost -
            gasSummary.storageRebate
        : undefined;
}
exports.getTotalGasUsed = getTotalGasUsed;
function getTransactionEffects(data) {
    if ('effects' in data) {
        return data.effects;
    }
    return 'EffectsCert' in data ? data.EffectsCert.effects.effects : undefined;
}
exports.getTransactionEffects = getTransactionEffects;
/* ---------------------------- Transaction Effects --------------------------- */
function getEvents(data) {
    return getTransactionEffects(data)?.events;
}
exports.getEvents = getEvents;
function getCreatedObjects(data) {
    return getTransactionEffects(data)?.created;
}
exports.getCreatedObjects = getCreatedObjects;
/* --------------------------- TransactionResponse -------------------------- */
function getTimestampFromTransactionResponse(data) {
    return 'timestamp_ms' in data ? data.timestamp_ms ?? undefined : undefined;
}
exports.getTimestampFromTransactionResponse = getTimestampFromTransactionResponse;
function getParsedSplitCoinResponse(data) {
    const parsed = data.parsed_data;
    return parsed && 'SplitCoin' in parsed ? parsed.SplitCoin : undefined;
}
exports.getParsedSplitCoinResponse = getParsedSplitCoinResponse;
function getParsedMergeCoinResponse(data) {
    const parsed = data.parsed_data;
    return parsed && 'MergeCoin' in parsed ? parsed.MergeCoin : undefined;
}
exports.getParsedMergeCoinResponse = getParsedMergeCoinResponse;
function getParsedPublishResponse(data) {
    const parsed = data.parsed_data;
    return parsed && 'Publish' in parsed ? parsed.Publish : undefined;
}
exports.getParsedPublishResponse = getParsedPublishResponse;
/**
 * Get the updated coin after a merge.
 * @param data the response for executing a merge coin transaction
 * @returns the updated state of the primary coin after the merge
 */
function getCoinAfterMerge(data) {
    return getParsedMergeCoinResponse(data)?.updatedCoin;
}
exports.getCoinAfterMerge = getCoinAfterMerge;
/**
 * Get the updated coin after a split.
 * @param data the response for executing a Split coin transaction
 * @returns the updated state of the original coin object used for the split
 */
function getCoinAfterSplit(data) {
    return getParsedSplitCoinResponse(data)?.updatedCoin;
}
exports.getCoinAfterSplit = getCoinAfterSplit;
/**
 * Get the newly created coin after a split.
 * @param data the response for executing a Split coin transaction
 * @returns the updated state of the original coin object used for the split
 */
function getNewlyCreatedCoinsAfterSplit(data) {
    return getParsedSplitCoinResponse(data)?.newCoins;
}
exports.getNewlyCreatedCoinsAfterSplit = getNewlyCreatedCoinsAfterSplit;
/**
 * Get the newly created coin refs after a split.
 */
function getNewlyCreatedCoinRefsAfterSplit(data) {
    if ('EffectsCert' in data) {
        const effects = data.EffectsCert.effects.effects;
        return effects.created?.map((c) => c.reference);
    }
    return undefined;
}
exports.getNewlyCreatedCoinRefsAfterSplit = getNewlyCreatedCoinRefsAfterSplit;
//# sourceMappingURL=transactions.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStructTag = exports.extractReference = exports.extractMutableReference = exports.getMovePackageContent = exports.hasPublicTransfer = exports.getMoveObject = exports.getObjectFields = exports.getMoveObjectType = exports.isImmutableObject = exports.isSharedObject = exports.getSharedObjectInitialVersion = exports.getObjectOwner = exports.getObjectPreviousTransactionDigest = exports.getObjectType = exports.getObjectVersion = exports.getObjectId = exports.getObjectReference = exports.getObjectNotExistsResponse = exports.getObjectDeletedResponse = exports.getObjectExistsResponse = exports.MIST_PER_SUI = void 0;
exports.MIST_PER_SUI = BigInt(1000000000);
/* -------------------------------------------------------------------------- */
/*                              Helper functions                              */
/* -------------------------------------------------------------------------- */
/* -------------------------- GetObjectDataResponse ------------------------- */
function getObjectExistsResponse(resp) {
    return resp.status !== 'Exists' ? undefined : resp.details;
}
exports.getObjectExistsResponse = getObjectExistsResponse;
function getObjectDeletedResponse(resp) {
    return resp.status !== 'Deleted' ? undefined : resp.details;
}
exports.getObjectDeletedResponse = getObjectDeletedResponse;
function getObjectNotExistsResponse(resp) {
    return resp.status !== 'NotExists' ? undefined : resp.details;
}
exports.getObjectNotExistsResponse = getObjectNotExistsResponse;
function getObjectReference(resp) {
    return (getObjectExistsResponse(resp)?.reference || getObjectDeletedResponse(resp));
}
exports.getObjectReference = getObjectReference;
/* ------------------------------ SuiObjectRef ------------------------------ */
function getObjectId(data) {
    if ('objectId' in data) {
        return data.objectId;
    }
    return (getObjectReference(data)?.objectId ?? getObjectNotExistsResponse(data));
}
exports.getObjectId = getObjectId;
function getObjectVersion(data) {
    if ('version' in data) {
        return data.version;
    }
    return getObjectReference(data)?.version;
}
exports.getObjectVersion = getObjectVersion;
/* -------------------------------- SuiObject ------------------------------- */
function getObjectType(resp) {
    return getObjectExistsResponse(resp)?.data.dataType;
}
exports.getObjectType = getObjectType;
function getObjectPreviousTransactionDigest(resp) {
    return getObjectExistsResponse(resp)?.previousTransaction;
}
exports.getObjectPreviousTransactionDigest = getObjectPreviousTransactionDigest;
function getObjectOwner(resp) {
    return getObjectExistsResponse(resp)?.owner;
}
exports.getObjectOwner = getObjectOwner;
function getSharedObjectInitialVersion(resp) {
    const owner = getObjectOwner(resp);
    if (typeof owner === 'object' && 'Shared' in owner) {
        return owner.Shared.initial_shared_version;
    }
    else {
        return undefined;
    }
}
exports.getSharedObjectInitialVersion = getSharedObjectInitialVersion;
function isSharedObject(resp) {
    const owner = getObjectOwner(resp);
    return typeof owner === 'object' && 'Shared' in owner;
}
exports.isSharedObject = isSharedObject;
function isImmutableObject(resp) {
    const owner = getObjectOwner(resp);
    return owner === 'Immutable';
}
exports.isImmutableObject = isImmutableObject;
function getMoveObjectType(resp) {
    return getMoveObject(resp)?.type;
}
exports.getMoveObjectType = getMoveObjectType;
function getObjectFields(resp) {
    if ('fields' in resp) {
        return resp.fields;
    }
    return getMoveObject(resp)?.fields;
}
exports.getObjectFields = getObjectFields;
function getMoveObject(data) {
    const suiObject = 'data' in data ? data : getObjectExistsResponse(data);
    if (suiObject?.data.dataType !== 'moveObject') {
        return undefined;
    }
    return suiObject.data;
}
exports.getMoveObject = getMoveObject;
function hasPublicTransfer(data) {
    return getMoveObject(data)?.has_public_transfer ?? false;
}
exports.hasPublicTransfer = hasPublicTransfer;
function getMovePackageContent(data) {
    if ('disassembled' in data) {
        return data.disassembled;
    }
    const suiObject = getObjectExistsResponse(data);
    if (suiObject?.data.dataType !== 'package') {
        return undefined;
    }
    return suiObject.data.disassembled;
}
exports.getMovePackageContent = getMovePackageContent;
function extractMutableReference(normalizedType) {
    return typeof normalizedType === 'object' &&
        'MutableReference' in normalizedType
        ? normalizedType.MutableReference
        : undefined;
}
exports.extractMutableReference = extractMutableReference;
function extractReference(normalizedType) {
    return typeof normalizedType === 'object' && 'Reference' in normalizedType
        ? normalizedType.Reference
        : undefined;
}
exports.extractReference = extractReference;
function extractStructTag(normalizedType) {
    if (typeof normalizedType === 'object' && 'Struct' in normalizedType) {
        return normalizedType;
    }
    const ref = extractReference(normalizedType);
    const mutRef = extractMutableReference(normalizedType);
    if (typeof ref === 'object' && 'Struct' in ref) {
        return ref;
    }
    if (typeof mutRef === 'object' && 'Struct' in mutRef) {
        return mutRef;
    }
    return undefined;
}
exports.extractStructTag = extractStructTag;
//# sourceMappingURL=objects.js.map
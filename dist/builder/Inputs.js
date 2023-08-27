"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMutableSharedObjectInput = exports.isSharedObjectInput = exports.getSharedObjectInput = exports.getIdFromCallArg = exports.Inputs = exports.BuilderCallArg = exports.ObjectCallArg = exports.PureCallArg = void 0;
const superstruct_1 = require("superstruct");
const index_1 = require("../types/index");
const bcs_1 = require("./bcs");
const sui_types_1 = require("../utils/sui-types");
const ObjectArg = (0, superstruct_1.union)([
    (0, superstruct_1.object)({ ImmOrOwned: index_1.SuiObjectRef }),
    (0, superstruct_1.object)({
        Shared: (0, superstruct_1.object)({
            objectId: (0, superstruct_1.string)(),
            initialSharedVersion: (0, superstruct_1.union)([(0, superstruct_1.integer)(), (0, superstruct_1.string)()]),
            mutable: (0, superstruct_1.boolean)(),
        }),
    }),
]);
exports.PureCallArg = (0, superstruct_1.object)({ Pure: (0, superstruct_1.array)((0, superstruct_1.integer)()) });
exports.ObjectCallArg = (0, superstruct_1.object)({ Object: ObjectArg });
exports.BuilderCallArg = (0, superstruct_1.union)([exports.PureCallArg, exports.ObjectCallArg]);
exports.Inputs = {
    Pure(data, type) {
        return {
            Pure: Array.from(data instanceof Uint8Array
                ? data
                : // NOTE: We explicitly set this to be growable to infinity, because we have maxSize validation at the builder-level:
                    bcs_1.builder.ser(type, data, { maxSize: Infinity }).toBytes()),
        };
    },
    ObjectRef({ objectId, digest, version }) {
        return {
            Object: {
                ImmOrOwned: {
                    digest,
                    version,
                    objectId: (0, sui_types_1.normalizeSuiAddress)(objectId),
                },
            },
        };
    },
    SharedObjectRef({ objectId, mutable, initialSharedVersion, }) {
        return {
            Object: {
                Shared: {
                    mutable,
                    initialSharedVersion,
                    objectId: (0, sui_types_1.normalizeSuiAddress)(objectId),
                },
            },
        };
    },
};
function getIdFromCallArg(arg) {
    if (typeof arg === 'string') {
        return (0, sui_types_1.normalizeSuiAddress)(arg);
    }
    if ('ImmOrOwned' in arg.Object) {
        return (0, sui_types_1.normalizeSuiAddress)(arg.Object.ImmOrOwned.objectId);
    }
    return (0, sui_types_1.normalizeSuiAddress)(arg.Object.Shared.objectId);
}
exports.getIdFromCallArg = getIdFromCallArg;
function getSharedObjectInput(arg) {
    return typeof arg === 'object' && 'Object' in arg && 'Shared' in arg.Object
        ? arg.Object.Shared
        : undefined;
}
exports.getSharedObjectInput = getSharedObjectInput;
function isSharedObjectInput(arg) {
    return !!getSharedObjectInput(arg);
}
exports.isSharedObjectInput = isSharedObjectInput;
function isMutableSharedObjectInput(arg) {
    return getSharedObjectInput(arg)?.mutable ?? false;
}
exports.isMutableSharedObjectInput = isMutableSharedObjectInput;
//# sourceMappingURL=Inputs.js.map
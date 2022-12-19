"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeTagSerializer = void 0;
const types_1 = require("../../types");
const VECTOR_REGEX = /^vector<(.+)>$/;
const STRUCT_REGEX = /^([^:]+)::([^:]+)::(.+)/;
const STRUCT_TYPE_TAG_REGEX = /^[^<]+<(.+)>$/;
class TypeTagSerializer {
    parseFromStr(str) {
        if (str === 'address') {
            return { address: null };
        }
        else if (str === 'bool') {
            return { bool: null };
        }
        else if (str === 'u8') {
            return { u8: null };
        }
        else if (str === 'u16') {
            return { u16: null };
        }
        else if (str === 'u32') {
            return { u32: null };
        }
        else if (str === 'u64') {
            return { u64: null };
        }
        else if (str === 'u128') {
            return { u128: null };
        }
        else if (str === 'u256') {
            return { u256: null };
        }
        else if (str === 'signer') {
            return { signer: null };
        }
        const vectorMatch = str.match(VECTOR_REGEX);
        if (vectorMatch) {
            return { vector: this.parseFromStr(vectorMatch[1]) };
        }
        const structMatch = str.match(STRUCT_REGEX);
        if (structMatch) {
            try {
                return {
                    struct: {
                        address: (0, types_1.normalizeSuiAddress)(structMatch[1]),
                        module: structMatch[2],
                        name: structMatch[3].match(/^([^<]+)/)[1],
                        typeParams: this.parseStructTypeTag(structMatch[3]),
                    },
                };
            }
            catch (e) {
                throw new Error(`Encounter error parsing type args for ${str}`);
            }
        }
        throw new Error(`Encounter unexpected token when parsing type args for ${str}`);
    }
    parseStructTypeTag(str) {
        const typeTagsMatch = str.match(STRUCT_TYPE_TAG_REGEX);
        if (!typeTagsMatch) {
            return [];
        }
        // TODO: This will fail if the struct has nested type args with commas. Need
        // to implement proper parsing for this case
        const typeTags = typeTagsMatch[1].split(',');
        return typeTags.map((tag) => this.parseFromStr(tag));
    }
}
exports.TypeTagSerializer = TypeTagSerializer;
//# sourceMappingURL=type-tag-serializer.js.map
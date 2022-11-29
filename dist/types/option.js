"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOption = void 0;
function getOption(option) {
    if (typeof option === 'object' &&
        option !== null &&
        'type' in option &&
        option.type.startsWith('0x1::option::Option<')) {
        return undefined;
    }
    return option;
}
exports.getOption = getOption;
//# sourceMappingURL=option.js.map
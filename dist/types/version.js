"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVersionFromString = void 0;
function parseVersionFromString(version) {
    const versions = version.split('.');
    return {
        major: parseInt(versions[0], 10),
        minor: parseInt(versions[1], 10),
        patch: parseInt(versions[2], 10),
    };
}
exports.parseVersionFromString = parseVersionFromString;
//# sourceMappingURL=version.js.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionToString = exports.parseVersionFromString = void 0;
const femver_1 = require("@suchipi/femver");
function parseVersionFromString(version) {
    return (0, femver_1.parse)(version);
}
exports.parseVersionFromString = parseVersionFromString;
function versionToString(version) {
    const { major, minor, patch } = version;
    return `${major}.${minor}.${patch}`;
}
exports.versionToString = versionToString;
//# sourceMappingURL=version.js.map
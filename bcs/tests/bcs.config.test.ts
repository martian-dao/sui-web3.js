// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import { BCS, getRustConfig, getSuiMoveConfig } from "../src/index";

describe('serde', () => {
    it('should work with Rust config', () => {
        const bcs = new BCS(getRustConfig());
        let value = [ 'beep', 'boop', 'beep' ];
        expect(serde(bcs, 'Vec<string>', value)).toEqual(value);
    });

    it('should work with Sui Move config', () => {
        const bcs = new BCS(getSuiMoveConfig());
        let value = [ 'beep', 'boop', 'beep' ];
        expect(serde(bcs, 'vector<string>', value)).toEqual(value);
    });

    it('should fork config', () => {
        let bcs_v1 = new BCS(getSuiMoveConfig());
        bcs_v1.registerStructType('User', { name: 'string' });

        let bcs_v2 = new BCS(bcs_v1);
        bcs_v2.registerStructType('Worker', { user: 'User', experience: 'u64' });

        expect(bcs_v1.hasType('Worker')).toBeFalsy();
        expect(bcs_v2.hasType('Worker')).toBeTruthy();
    });

    it('should work with custom config', () => {
        const bcs = new BCS({
            genericSeparators: ['[', ']'],
            addressLength: 1,
            addressEncoding: 'hex',
            vectorType: 'array',
            types: {
                structs: {
                    SiteConfig: { tags: 'array[string]' }
                },
                enums: {
                    'Option[T]': { none: null, some: 'T' }
                }
            }
        });

        let value_1 = { tags: [ 'beep', 'boop', 'beep' ] };
        expect(serde(bcs, 'SiteConfig', value_1)).toEqual(value_1);

        let value_2 = { some: [ 'what', 'do', 'we', 'test' ]};
        expect(serde(bcs, 'Option[array[string]]', value_2)).toEqual(value_2);
    });
});

function serde(bcs, type, data) {
    let ser = bcs.ser(type, data).toString('hex');
    let de = bcs.de(type, ser, 'hex');
    return de;
}

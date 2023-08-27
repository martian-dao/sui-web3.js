"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const sui_types_1 = require("../../utils/sui-types");
(0, vitest_1.describe)('parseStructTag', () => {
    (0, vitest_1.it)('parses struct tags correctly', () => {
        (0, vitest_1.expect)((0, sui_types_1.parseStructTag)('0x2::foo::bar')).toMatchInlineSnapshot(`
      {
        "address": "0x0000000000000000000000000000000000000000000000000000000000000002",
        "module": "foo",
        "name": "bar",
        "typeParams": [],
      }
    `);
        (0, vitest_1.expect)((0, sui_types_1.parseStructTag)('0x2::foo::bar<0x3::baz::qux<0x4::nested::result, 0x4::nested::other>, bool>')).toMatchInlineSnapshot(`
      {
        "address": "0x0000000000000000000000000000000000000000000000000000000000000002",
        "module": "foo",
        "name": "bar",
        "typeParams": [
          {
            "address": "0x0000000000000000000000000000000000000000000000000000000000000003",
            "module": "baz",
            "name": "qux",
            "typeParams": [
              {
                "address": "0x0000000000000000000000000000000000000000000000000000000000000004",
                "module": "nested",
                "name": "result",
                "typeParams": [],
              },
              {
                "address": "0x0000000000000000000000000000000000000000000000000000000000000004",
                "module": "nested",
                "name": "other",
                "typeParams": [],
              },
            ],
          },
          "bool",
        ],
      }
    `);
    });
});
(0, vitest_1.describe)('normalizeStructTag', () => {
    (0, vitest_1.it)('normalizes package addresses', () => {
        (0, vitest_1.expect)((0, sui_types_1.normalizeStructTag)('0x2::kiosk::Item')).toEqual('0x0000000000000000000000000000000000000000000000000000000000000002::kiosk::Item');
        (0, vitest_1.expect)((0, sui_types_1.normalizeStructTag)('0x2::foo::bar<0x3::another::package>')).toEqual('0x0000000000000000000000000000000000000000000000000000000000000002::foo::bar<0x0000000000000000000000000000000000000000000000000000000000000003::another::package>');
    });
});
//# sourceMappingURL=common.test.js.map
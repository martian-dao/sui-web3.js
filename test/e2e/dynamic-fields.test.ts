// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeAll } from 'vitest';
import { publishPackage, setup, TestToolbox } from './utils/setup';
import { SuiObjectData } from '../../src';

describe('Dynamic Fields Reading API', () => {
  let toolbox: TestToolbox;
  let packageId: string;
  let parentObjectId: string;

  beforeAll(async () => {
    toolbox = await setup();
    const packagePath = __dirname + '/./data/dynamic_fields';
    ({ packageId } = await publishPackage(packagePath, toolbox));

    await toolbox.provider
      .getOwnedObjects({
        owner: toolbox.address(),
        options: { showType: true },
        filter: { StructType: `${packageId}::dynamic_fields_test::Test` },
      })
      .then(function (objects) {
        const data = objects.data[0].data as SuiObjectData;
        parentObjectId = data.objectId;
      });
  });

  it('get all dynamic fields', async () => {
    const dynamicFields = await toolbox.provider.getDynamicFields({
      parentId: parentObjectId,
    });
    expect(dynamicFields.data.length).toEqual(2);
  });
  it('limit response in page', async () => {
    const dynamicFields = await toolbox.provider.getDynamicFields({
      parentId: parentObjectId,
      limit: 1,
    });
    expect(dynamicFields.data.length).toEqual(1);
    expect(dynamicFields.nextCursor).not.toEqual(null);
  });
  it('go to next cursor', async () => {
    return await toolbox.provider
      .getDynamicFields({ parentId: parentObjectId, limit: 1 })
      .then(async function (dynamicFields) {
        expect(dynamicFields.nextCursor).not.toEqual(null);

        const dynamicFieldsCursor = await toolbox.provider.getDynamicFields({
          parentId: parentObjectId,
          cursor: dynamicFields.nextCursor,
        });
        expect(dynamicFieldsCursor.data.length).greaterThanOrEqual(0);
      });
  });
  it('get dynamic object field', async () => {
    const dynamicFields = await toolbox.provider.getDynamicFields({
      parentId: parentObjectId,
    });
    const objDofName = dynamicFields.data[1].name;

    const dynamicObjectField = await toolbox.provider.getDynamicFieldObject({
      parentId: parentObjectId,
      name: objDofName,
    });

    expect(dynamicObjectField).not.toEqual({});
  });
});

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { JsonRpcClient } from '../../../src/rpc/client';
import {
  mockRpcResponse,
  mockServer,
  MOCK_ENDPOINT,
  MOCK_PORT,
} from '../mocks/rpc-http';
import { GetOwnedObjectsResponse, SuiObjectInfo } from '../../../src';

const EXAMPLE_OBJECT: SuiObjectInfo = {
  objectId: '8dc6a6f70564e29a01c7293a9c03818fda2d049f',
  version: 0,
  digest: 'CI8Sf+t3Xrt5h9ENlmyR8bbMVfg6df3vSDc08Gbk9/g=',
  owner: {
    AddressOwner: '0x215592226abfec8d03fbbeb8b30eb0d2129c94b0',
  },
  type: 'moveObject',
  previousTransaction: '4RJfkN9SgLYdb0LqxBHh6lfRPicQ8FLJgzi9w2COcTo=',
};

const OBJECT_WITH_WRONG_SCHEMA = {
  objectId: '8dc6a6f70564e29a01c7293a9c03818fda2d049f',
  version: 0,
  digest: 'CI8Sf+t3Xrt5h9ENlmyR8bbMVfg6df3vSDc08Gbk9/g=',
  owner: {
    AddressOwner1: '0x215592226abfec8d03fbbeb8b30eb0d2129c94b0',
  },
  type: 'moveObject',
  previousTransaction: '4RJfkN9SgLYdb0LqxBHh6lfRPicQ8FLJgzi9w2COcTo=',
};

describe('JSON-RPC Client', () => {
  const server = mockServer;
  let client: JsonRpcClient;

  beforeAll(() => {
    server.start(MOCK_PORT);
    client = new JsonRpcClient(MOCK_ENDPOINT);
  });

  afterAll(() => {
    server.stop();
  });

  it('requestWithType', async () => {
    await requestAndValidate(EXAMPLE_OBJECT, false);
  });

  it('requestWithType should throw on type mismatch', async () => {
    await setMockValue(OBJECT_WITH_WRONG_SCHEMA);
    expect(fetchOwnedObject(false)).rejects.toThrowError();
  });

  it('requestWithType should succeed if skipDataValidation if true', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await requestAndValidate(OBJECT_WITH_WRONG_SCHEMA, true);
    expect(warn).toHaveBeenCalled();
    warn.mockReset();
  });

  async function requestAndValidate(mockValue: any, skipValidation: boolean) {
    await setMockValue(mockValue);
    const resp = await fetchOwnedObject(skipValidation);
    expect(resp.length).toEqual(1);
    expect(resp[0]).toEqual(mockValue);
  }

  async function setMockValue(value: any) {
    await mockRpcResponse({
      method: 'sui_getOwnedObjectsByAddress',
      params: [],
      value: [value],
    });
  }

  async function fetchOwnedObject(skipValidation: boolean): Promise<any> {
    return await client.requestWithType(
      'sui_getOwnedObjectsByAddress',
      [],
      GetOwnedObjectsResponse,
      skipValidation,
    );
  }
});

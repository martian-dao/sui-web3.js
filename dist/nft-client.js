"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftClient = exports.parseDomains = exports.NftParser = void 0;
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
const _1 = require(".");
const NftRegex = /(0x[a-f0-9]{39,40})::nft::Nft<0x[a-f0-9]{39,40}::([a-zA-Z]{1,})::([a-zA-Z]{1,})>/;
const UrlDomainRegex = /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
const DisplayDomainRegex = /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;
exports.NftParser = {
    parser: (data, suiData, rpcResponse) => {
        if (typeof rpcResponse.data === 'object' &&
            'owner' in rpcResponse.data) {
            const { owner } = rpcResponse.data;
            const matches = suiData.content.type.match(NftRegex);
            if (!matches) {
                return undefined;
            }
            const packageObjectId = matches[1];
            const packageModule = matches[2];
            const packageModuleClassName = matches[3];
            return {
                owner,
                type: suiData.content?.dataType,
                id: rpcResponse.data.objectId,
                packageObjectId,
                packageModule,
                packageModuleClassName,
                rawResponse: rpcResponse,
                logicalOwner: data.logical_owner,
                bagId: data.bag.fields.id.id,
            };
        }
        return undefined;
    },
    regex: NftRegex,
};
const isTypeMatchRegex = (d, regex) => {
    const { data } = d;
    if ((0, _1.is)(data, _1.SuiObjectData)) {
        const { content } = data;
        if (content && 'type' in content) {
            return content.type.match(regex);
        }
    }
    return false;
};
const parseDomains = (domains) => {
    const response = {};
    const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
    const displayDomain = domains.find((d) => isTypeMatchRegex(d, DisplayDomainRegex));
    if (urlDomain && (0, _1.getObjectFields)(urlDomain)) {
        response.url = (0, _1.getObjectFields)(urlDomain).value.fields.url;
    }
    if (displayDomain && (0, _1.getObjectFields)(displayDomain)) {
        response.description = (0, _1.getObjectFields)(displayDomain).value.fields.description;
        response.name = (0, _1.getObjectFields)(displayDomain).value.fields.name;
    }
    return response;
};
exports.parseDomains = parseDomains;
class NftClient {
    constructor(provider) {
        this.parseObjects = async (objects) => {
            const parsedObjects = objects
                .map((object) => {
                if ((0, _1.getObjectType)(object)?.match(exports.NftParser.regex)) {
                    return exports.NftParser.parser((0, _1.getObjectFields)(object), (0, _1.getSuiObjectData)(object), object);
                }
                return undefined;
            })
                .filter((object) => !!object);
            return parsedObjects;
        };
        this.fetchAndParseObjectsById = async (ids) => {
            if (ids.length === 0) {
                return new Array();
            }
            const objects = await this.provider.multiGetObjects({
                ids,
                // @ts-ignore
                options: {
                    showType: true,
                    showContent: true,
                    showOwner: true,
                },
            });
            return this.parseObjects(objects);
        };
        this.getBagContent = async (bagId) => {
            const bagObjects = await this.provider.getDynamicFields({
                parentId: bagId,
            });
            const objectIds = bagObjects.data.map((bagObject) => bagObject.objectId);
            return this.provider.multiGetObjects({
                ids: objectIds,
                // @ts-ignore
                options: {
                    showType: true,
                    showContent: true,
                    showOwner: true,
                },
            });
        };
        this.getNftsById = async (params) => {
            const nfts = await this.fetchAndParseObjectsById(params.objectIds);
            const bags = await Promise.all(nfts.map(async (nft) => {
                const content = await this.getBagContent(nft.bagId);
                return {
                    nftId: nft.id,
                    content: (0, exports.parseDomains)(content),
                };
            }));
            const bagsByNftId = new Map(bags.map((b) => [b.nftId, b]));
            return nfts.map((nft) => {
                const fields = bagsByNftId.get(nft.id);
                return {
                    nft,
                    fields: fields?.content,
                };
            });
        };
        this.provider = provider;
    }
}
exports.NftClient = NftClient;
//# sourceMappingURL=nft-client.js.map
import { RawSigner } from './signers/raw-signer';
import { SuiExecuteTransactionResponse } from './types';
import { SuiObject, is } from './index';

import type {
  GetObjectDataResponse,
  JsonRpcProvider,
  SuiMoveObject,
} from './index';

export interface WithIds {
  objectIds?: string[];
  objects?: any[];
}

type FetchFnParser<RpcResponse, DataModel> = (
  typedData: RpcResponse,
  suiObject: SuiObject,
  rpcResponse: GetObjectDataResponse
) => DataModel | undefined;

type SuiObjectParser<RpcResponse, DataModel> = {
  parser: FetchFnParser<RpcResponse, DataModel>;
  regex: RegExp;
};

type ID = {
  id: string;
};

type Bag = {
  type: string;
  fields: {
    id: ID;
    size: number;
  };
};

type NftRpcResponse = {
  logical_owner: string;
  bag: Bag;
};

type NftRaw = {
  id: string;
  logicalOwner: string;
  bagId: string;
};

type DomainRpcBase<T> = {
  id: ID;
  name: {
    type: string;
    fields: {
      dummy_field: boolean;
    };
  };
  value: {
    type: string;
    fields: T;
  };
};

type UrlDomainRpcResponse = DomainRpcBase<{
  url: string;
}>;

type DisplayDomainRpcResponse = DomainRpcBase<{
  description: string;
  name: string;
}>;

type NftDomains = {
  url: string;
  name: string;
  description: string;
};

const DEFAULT_NFT_IMAGE =
  'ipfs://QmZPWWy5Si54R3d26toaqRiqvCH7HkGdXkxwUgCm2oKKM2?filename=img-sq-01.png';

export type Nft = {
  nft: NftRaw;
  fields?: Partial<NftDomains>;
};

const NftRegex =
  /(0x[a-f0-9]{39,40})::nft::Nft<0x[a-f0-9]{39,40}::([a-zA-Z]{1,})::([a-zA-Z]{1,})>/;
const UrlDomainRegex =
  /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
const DisplayDomainRegex =
  /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;

export const NftParser: SuiObjectParser<NftRpcResponse, NftRaw> = {
  parser: (data, suiData, rpcResponse) => {
    if (
      typeof rpcResponse.details === 'object' &&
      'data' in rpcResponse.details
    ) {
      const { owner } = rpcResponse.details;

      const matches = (suiData.data as SuiMoveObject).type.match(NftRegex);
      if (!matches) {
        return undefined;
      }
      const packageObjectId = matches[1];
      const packageModule = matches[2];
      const packageModuleClassName = matches[3];

      return {
        owner,
        type: suiData.data.dataType,
        id: rpcResponse.details.reference.objectId,
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

const isObjectExists = (o: GetObjectDataResponse) => o.status === 'Exists';

const isTypeMatchRegex = (d: GetObjectDataResponse, regex: RegExp) => {
  const { details } = d;
  if (is(details, SuiObject)) {
    const { data } = details;
    if ('type' in data) {
      return data.type.match(regex);
    }
  }
  return false;
};

export const parseDomains = (domains: GetObjectDataResponse[]) => {
  const response: Partial<NftDomains> = {};
  const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
  const displayDomain = domains.find((d) =>
    isTypeMatchRegex(d, DisplayDomainRegex)
  );

  if (
    urlDomain &&
    is(urlDomain.details, SuiObject) &&
    'fields' in urlDomain.details.data
  ) {
    const { data } = urlDomain.details;
    response.url = (data.fields as UrlDomainRpcResponse).value.fields.url;
  }
  if (
    displayDomain &&
    is(displayDomain.details, SuiObject) &&
    'fields' in displayDomain.details.data
  ) {
    const { data } = displayDomain.details;
    response.description = (
      data.fields as DisplayDomainRpcResponse
    ).value.fields.description;
    response.name = (data.fields as DisplayDomainRpcResponse).value.fields.name;
  }

  return response;
};

export class NftClient {
  private provider: JsonRpcProvider;

  constructor(provider: JsonRpcProvider) {
    this.provider = provider;
  }

  parseObjects = async (
    objects: GetObjectDataResponse[]
  ): Promise<NftRaw[]> => {
    const parsedObjects = objects
      .filter(isObjectExists)
      .map((object) => {
        if (
          is(object.details, SuiObject) &&
          'type' in object.details.data &&
          object.details.data.type.match(NftParser.regex)
        ) {
          return NftParser.parser(
            object.details.data.fields as NftRpcResponse,
            object.details,
            object
          );
        }
        return undefined;
      })
      .filter((object): object is NftRaw => !!object);

    return parsedObjects;
  };

  fetchAndParseObjectsById = async (ids: string[]): Promise<NftRaw[]> => {
    if (ids.length === 0) {
      return new Array<NftRaw>();
    }
    const objects = await this.provider.getObjectBatch(ids);
    return this.parseObjects(objects);
  };

  getBagContent = async (bagId: string) => {
    const bagObjects = await this.provider.getObjectsOwnedByObject(bagId);
    const objectIds = bagObjects.map((bagObject) => bagObject.objectId);
    return this.provider.getObjectBatch(objectIds);
  };

  getNftsById = async (params: WithIds): Promise<Nft[]> => {
    let nfts = [];
    if (params.objectIds) {
      nfts = await this.fetchAndParseObjectsById(params.objectIds);
    } else if (params.objects) {
      nfts = await this.parseObjects(params.objects);
    }
    const bags = await Promise.all(
      nfts.map(async (nft) => {
        const content = await this.getBagContent(nft.bagId);
        return {
          nftId: nft.id,
          content: parseDomains(content),
        };
      })
    );
    const bagsByNftId = new Map(bags.map((b) => [b.nftId, b]));

    return nfts.map((nft) => {
      const fields = bagsByNftId.get(nft.id);
      return {
        nft,
        fields: fields?.content,
      };
    });
  };

  /**
   * Mint a Example NFT. The wallet address must own enough gas tokens to pay for the transaction.
   *
   * @param signer A signer with connection to the fullnode
   */
  public static async mintExampleNFT(
    signer: RawSigner,
    name?: string,
    description?: string,
    imageUrl?: string
  ): Promise<SuiExecuteTransactionResponse> {
    return await signer.executeMoveCall({
      packageObjectId: '0x2',
      module: 'devnet_nft',
      function: 'mint',
      typeArguments: [],
      arguments: [
        name || 'Example NFT',
        description || 'An NFT created by Sui Wallet',
        imageUrl || DEFAULT_NFT_IMAGE,
      ],
      gasBudget: 10000,
    });
  }

  public static async TransferNFT(
    signer: RawSigner,
    nftId: string,
    recipientID: string,
    transferCost?: number
  ): Promise<SuiExecuteTransactionResponse> {
    return await signer.transferObject({
      objectId: nftId,
      gasBudget: transferCost || 10000,
      recipient: recipientID,
    });
  }
}

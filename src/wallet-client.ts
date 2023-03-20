import * as bip39 from '@scure/bip39';
import * as english from '@scure/bip39/wordlists/english';
import { Transaction } from './builder';
import { Ed25519Keypair } from './cryptography/ed25519-keypair';
// import { NftClient } from './nft_client';
import { JsonRpcProvider } from '.';
import { Connection } from './rpc/connection';
import { DEFAULT_CLIENT_OPTIONS } from './rpc/websocket-client';
import { RawSigner } from './signers/raw-signer';
import {
  Coin,
  DryRunTransactionResponse,
  ObjectId,
  SuiAddress,
  SUI_TYPE_ARG,
} from './types';
import {
  normalizeSuiAddress,
  SuiObjectData,
  getObjectFields,
  SuiValidatorSummary,
} from './types';
import { is } from './index';
import { NftClient } from './nft-client';
import { formatAddress } from './utils/format';
import { calculateAPY, calculateStakeShare } from './stakeHelperFunctions';


const COIN_TYPE = 784;
const MAX_ACCOUNTS = 20;
const DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER = 1000;

const dedupe = (arr: string[]) => Array.from(new Set(arr));

export interface AccountMetaData {
  derivationPath: string; //"44'/784'/1'/0'/0'"
  address: string;
  publicKey?: string;
}

export interface Wallet {
  code: string; // mnemonic
  accounts: AccountMetaData[];
}

export class WalletClient {
  provider: JsonRpcProvider;
  // nftClient: NftClient;

  constructor(nodeUrl: string, faucetUrl: string) {
    this.provider = new JsonRpcProvider(
      new Connection({
        fullnode: nodeUrl,
        faucet: faucetUrl,
      }),
      {
        skipDataValidation: false,
        socketOptions: DEFAULT_CLIENT_OPTIONS,
      },
    );
    // this.nftClient = new NftClient(this.provider);
  }

  /**
   * Creates new account with bip44 path and mnemonics,
   * @param path. (e.g. m/44'/784'/0'/0'/0')
   * Detailed description: {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
   * @param mnemonics.
   * @returns Ed25519Keypair
   */
  //Use deriveKeypair() in ed25519-keypair.ts
  //Giving error for different derivation path other than standard 0
  static fromDerivePath(
    mnemonics: string,
    derivationPath?: string,
  ): Ed25519Keypair {
    // const normalizeMnemonics = mnemonics
    //     .trim()
    //     .split(/\s+/)
    //     .map((part) => part.toLowerCase())
    //     .join(" ");

    // const { key } = derivePath(path, Buffer.from(bip39.mnemonicToSeedSync(normalizeMnemonics)).toString("hex"));

    // return Ed25519Keypair.fromSeed(new Uint8Array(key));
    return Ed25519Keypair.deriveKeypair(mnemonics, derivationPath);
  }

  /**
   * returns an Ed25519Keypair object given a private key and
   * address of the account
   *
   * @param privateKey Private key of an account as a Buffer
   * @returns Ed25519Keypair object
   */
  static getAccountFromPrivateKey(privateKey: Buffer): Ed25519Keypair {
    return Ed25519Keypair.fromSeed(privateKey.slice(0, 32));
  }

  /**
   * Each mnemonic phrase corresponds to a single wallet
   * Wallet can contain multiple accounts
   * An account corresponds to a key pair + address
   *
   * Get all the accounts of a user from their mnemonic phrase
   *
   * @param code The mnemonic phrase (12 word)
   * @returns Wallet object containing all accounts of a user
   */

  async importWallet(code: string): Promise<Wallet> {
    const accountMetaData: AccountMetaData[] = [];
    for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
      /* eslint-disable no-await-in-loop */
      const derivationPath = `m/44'/${COIN_TYPE}'/${i}'/0'/0'`;
      const keypair = WalletClient.fromDerivePath(code, derivationPath);
      const address = keypair.getPublicKey().toSuiAddress();
      const publicKey = Buffer.from(keypair.getPublicKey().toBytes()).toString(
        'hex',
      );
      // check if this account exists on Sui or not
      const response = await this.provider.getAllBalances({
        owner: address,
      });
      if (Object.keys(response).length !== 0 || i === 0) {
        accountMetaData.push({
          derivationPath,
          address: address.startsWith('0x') ? address : '0x' + address,
          publicKey: publicKey.startsWith('0x') ? publicKey : '0x' + publicKey,
        });
        // NOTE: breaking because multiple address support is not available currently
      } else {
        break;
      }
      /* eslint-enable no-await-in-loop */
    }
    return { code, accounts: accountMetaData };
  }

  /**
   * Creates a new wallet which contains a single account,
   * which is registered on Sui
   *
   * @returns A wallet object
   */
  async createWallet(code?: string): Promise<Wallet> {
    if (!code) {
      // mnemonic
      code = bip39.generateMnemonic(english.wordlist);
    }
    const accountMetadata = await this.createNewAccount(code, 0);
    return { code, accounts: [accountMetadata] };
  }

  /**
   * Creates a new account in the provided wallet
   *
   * @param code mnemonic phrase of the wallet
   * @returns
   */
  async createNewAccount(
    code: string,
    index: number,
  ): Promise<AccountMetaData> {
    if (index >= MAX_ACCOUNTS) {
      throw new Error('Max no. of accounts reached');
    }
    const derivationPath = `m/44'/${COIN_TYPE}'/${index}'/0'/0'`;
    const keypair = WalletClient.fromDerivePath(code, derivationPath);
    const address = keypair.getPublicKey().toSuiAddress();
    const pubKey = Buffer.from(keypair.getPublicKey().toBytes()).toString(
      'hex',
    );
    return {
      derivationPath,
      address: address.startsWith('0x') ? address : '0x' + address,
      publicKey: pubKey.startsWith('0x') ? pubKey : '0x' + pubKey,
    };
  }

  async transferSuiMnemonic(
    amount: number,
    suiAccount: Ed25519Keypair,
    receiverAddress: SuiAddress,
  ) {
    const keypair = suiAccount;
    const tx = new Transaction();
    const coin = tx.splitCoin(tx.gas, tx.pure(amount));
    tx.transferObjects([coin], tx.pure(receiverAddress));
    const signer = new RawSigner(keypair, this.provider);
    return await signer.signAndExecuteTransaction({ transaction: tx });
  }

  async getBalance(address: string, typeArg: string = SUI_TYPE_ARG) {
    const objects = await this.provider.getBalance({
      owner: address,
      coinType: typeArg,
    });
    return objects.totalBalance;
  }

  async getAllBalances(address: string) {
    const objects = await this.provider.getAllBalances({
      owner: address,
    });
    return objects;
  }

  async airdrop(address: string) {
    return await this.provider.requestSuiFromFaucet(address);
  }

  async getCoinsWithRequiredBalance(
    address: string,
    amount: number,
    cursor?: string,
    limit?: number,
  ) {
    const input: any = {
      owner: address,
    };

    if (cursor) input.cursor = cursor;
    if (limit) input.limit = limit;

    const coinsNeeded = await this.provider.getCoins(input);
    const coins: ObjectId[] = coinsNeeded.data
      .map((coin) => (coin.balance >= amount ? coin.coinObjectId : undefined))
      .filter((d) => d);
    return coins;
  }

  async getCoins(address: string, cursor?: string, limit?: number) {
    const input: any = {
      owner: address,
    };

    if (cursor) input.cursor = cursor;
    if (limit) input.limit = limit;
    const data = await this.provider.getCoins(input);
    return data;
  }

  async getStake(address: string) {
    return await this.provider.getStakes({
      owner: address,
    });
  }

  async getGasObjectsOwnedByAddress(address: string) {
    const objects = await this.provider.getObjectsOwnedByAddress({
      owner: address,
      // @ts-ignore
      options: { showType: true, showContent: true, showOwner: true },
    });
    return objects.filter((obj) => Coin.isSUI(obj));
  }

  async getGasObject(address: string) {
    const gasObj = await this.getGasObjectsOwnedByAddress(address);
    if (gasObj.length === 0) {
      throw new Error('Not Enough Gas');
    }
    const gasObjId: ObjectId = gasObj[0].objectId;
    return gasObjId;
  }

  async getCustomCoins(address: string) {
    const objects = await this.provider.getAllCoins({
      owner: address,
    });
    const coinIds = objects.data.map((c) => ({
      Id: c.coinObjectId,
      symbol: Coin.getCoinSymbol(c.coinType),
      name: Coin.getCoinSymbol(c.coinType),
      balance: Number(c.balance),
      decimals: 9,
      coinTypeArg: c.coinType,
    }));
    return coinIds;
  }

  async getActiveValidators() {
    return (await this.provider.getLatestSuiSystemState()).activeValidators;
  }

  /**
   * Dry run a transaction and return the result.
   * @param tx the transaction bytes in Uint8Array
   * @returns The transaction effects
   */
  async dryRunTransaction(tx: Uint8Array): Promise<DryRunTransactionResponse> {
    return this.provider.dryRunTransaction({ transaction: tx });
  }

  async simulateTransaction(
    tx: Uint8Array,
  ): Promise<DryRunTransactionResponse> {
    return await this.dryRunTransaction(tx);
  }

  async getTransactions(address: SuiAddress) {
    // combine from and to transactions
    const [txnIds, fromTxnIds] = await Promise.all([
      this.provider.queryTransactions({
        filter: {
          ToAddress: address!,
        },
      }),
      this.provider.queryTransactions({
        filter: {
          FromAddress: address!,
        },
      }),
    ]);

    const transactionsData = await Promise.all(
      [...txnIds.data, ...fromTxnIds.data].map(async (x) => {
        const txnData = await this.provider.getTransaction({
          digest: x.digest,
        });
        return txnData;
      }),
    );

    return transactionsData.sort(
      // timestamp could be null, so we need to handle
      (a, b) => (a.timestampMs || 0) - (b.timestampMs || 0),
    );
  }

  // Function to get the object metadata of a given objectId
  async getObject(objectId: string, options?: any) {
    const normalizedObjId = normalizeSuiAddress(objectId);
    const objData = await this.provider.getObject({
      id: normalizedObjId,
      options,
    });

    return objData;
  }

  // Function to get the metadata of a an nft with the given object id
  async getNftMetadata(objectID: string) {
    const data = await this.getObject(objectID);

    const nftMeta = () => {
      if (!data) return null;

      const { details } = data || {};
      if (!is(details, SuiObjectData) || !data) return null;
      const fields = getObjectFields(data);
      if (!fields?.url) return null;
      return {
        description:
          typeof fields.description === 'string' ? fields.description : null,
        name: typeof fields.name === 'string' ? fields.name : null,
        url: fields.url,
      };
    };

    return {
      ...data,
      data: nftMeta(),
    };
  }

  // Function to parge the ipfs url of nft metadata (same as we do with aptos nfts ipfs urls)
  parseIpfsUrl(ipfsUrl: string) {
    return ipfsUrl.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/');
  }

  // Function to the get originbyte nft metadata for a given nft object id
  async getOriginbyteNft(nftId: string) {
    const client = new NftClient(this.provider);
    const nfts = await client.getNftsById({ objectIds: [nftId!] });
    const nft = nfts[0];
    if (nft) {
      return {
        ...nft,
        fields: {
          ...nft.fields,
          url: this.parseIpfsUrl(nft.fields?.url ?? ''),
        },
      };
    }
    return null;
  }

  // Function to get an array of all the nfts (with required metadata) owned by an address
  async getNfts(address: SuiAddress) {
    let objects = await this.provider.getObjectsOwnedByAddress({
      owner: address,
    });

    const nfts = objects?.filter((obj) => !Coin.isCoin(obj));
    const nftsWithMetadataArray = [];

    await Promise.all(
      nfts.map(async ({ objectId }) => {
        const nftMeta = await this.getNftMetadata(objectId);
        const originByteNft = await this.getOriginbyteNft(objectId);

        const nftName =
          typeof nftMeta?.data?.name === 'string'
            ? nftMeta?.data?.name
            : formatAddress(objectId);
        const displayTitle = originByteNft?.fields.name || nftName;
        const nftUrl = nftMeta?.data?.url;

        nftsWithMetadataArray.push({
          name: originByteNft?.fields.name || nftName!,
          src: originByteNft?.fields.url || nftUrl,
          title:
            originByteNft?.fields.description ||
            nftMeta?.data?.description ||
            '',
          displayTitle,
          objectId,
        });
      }),
    );

    return nftsWithMetadataArray;
  }

  // get the current system state (required to get total staked sui value and validators data)
  async getSystemState() {
    const state = await this.provider.getLatestSuiSystemState();
    return state;
  }

  // get total staked sui value
  async getTotalStake() {
    const data = await this.getSystemState();
    if (!data) return 0;

    return data.activeValidators.reduce(
      (acc: any, curr: any) => (acc += BigInt(curr.stakingPoolSuiBalance)),
      0n,
    );
  }

  async getValidatorsList(
    sortKey: string = 'stakeShare',
    sortAscending?: boolean,
  ) {
    const data = await this.getSystemState();
    if (!data) return [];

    const totalStake = await this.getTotalStake();
    const sortedAsc = data.activeValidators
      .map((validator: any) => ({
        name: validator.name,
        address: validator.suiAddress,
        apy: calculateAPY(validator, +data.epoch),
        stakeShare: calculateStakeShare(
          BigInt(validator.stakingPoolSuiBalance),
          BigInt(totalStake),
        ),
      }))
      .sort((a, b) => {
        if (sortKey === 'name') {
          return a[sortKey].localeCompare(b[sortKey], 'en', {
            sensitivity: 'base',
            numeric: true,
          });
        }
        return a[sortKey] - b[sortKey];
      });
    return sortAscending ? sortedAsc : sortedAsc.reverse();
  }

  async getDelegatedStake(address: string) {
    const stakedAmount = await this.provider.getStakes({ owner: address });
    return stakedAmount;
  }

  // Get time between current epoch and specified epoch
  // Get the period between the current epoch and next epoch
  async getTimeBeforeEpochNumber(epoch: number) {
    const data = await this.getSystemState();
    // Current epoch
    const currentEpoch = data?.epoch || 0;
    const currentEpochStartTime = data?.epochStartTimestampMs || 0;
    const epochPeriod = data?.epochDurationMs || 0;
    const timeBeforeSpecifiedEpoch =
      epoch > currentEpoch && epoch > 0 && epochPeriod > 0
        ? currentEpochStartTime + (epoch - currentEpoch) * epochPeriod
        : 0;

    return {
      ...data,
      data: timeBeforeSpecifiedEpoch,
    };
  }

  static getAccountFromMetaData(mnemonic: string, metadata: AccountMetaData) {
    const keypair: any = Ed25519Keypair.deriveKeypair(
      mnemonic,
      metadata.derivationPath,
    );
    return keypair;
  }
}

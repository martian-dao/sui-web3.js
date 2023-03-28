import * as bip39 from '@scure/bip39';
import * as english from '@scure/bip39/wordlists/english';
import { TransactionBlock, Transactions } from './builder';
import { Ed25519Keypair } from './cryptography/ed25519-keypair';
// import { NftClient } from './nft_client';
import { JsonRpcProvider } from '.';
import { Connection } from './rpc/connection';
import { DEFAULT_CLIENT_OPTIONS } from './rpc/websocket-client';
import { RawSigner } from './signers/raw-signer';
import {
  Coin,
  CoinStruct,
  DryRunTransactionBlockResponse,
  ObjectId,
  PaginatedCoins,
  SuiAddress,
  SUI_TYPE_ARG,
} from './types';
import {
  normalizeSuiAddress,
  SuiObjectData,
} from './types';
import { is } from './index';
import { NftClient } from './nft-client';
import { formatAddress } from './utils/format';
import { calculateAPY, calculateStakeShare } from './stakeHelperFunctions';

const COIN_TYPE = 784;
const MAX_ACCOUNTS = 20;
const MAX_COINS_PER_REQUEST = 100;
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
  nftClient: NftClient;

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
    this.nftClient = new NftClient(this.provider);
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
    const tx = new TransactionBlock()
    const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
    tx.transferObjects([coin], tx.pure(receiverAddress));
    const signer = new RawSigner(keypair, this.provider);
    return await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  }

  async getBalance(address: string, typeArg: string = SUI_TYPE_ARG) {
    const objects = await this.provider.getBalance({
      owner: address,
      coinType: typeArg,
    });
    return objects.totalBalance;
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

  async getStake(address: string) {
    return await this.provider.getStakes({
      owner: address,
    });
  }

  async getGasObjectsOwnedByAddress(address: string) {
    const objects = await this.provider.getOwnedObjects({
      owner: address,
      // @ts-ignore
      options: { showType: true, showContent: true, showOwner: true },
    });
    return objects.data.filter((obj) => Coin.isCoin(obj));
  }

  async getGasObject(address: string) {
    const gasObj = await this.getGasObjectsOwnedByAddress(address);
    if (gasObj.length === 0) {
      throw new Error('Not Enough Gas');
    }
    const details = gasObj[0].data as SuiObjectData;
    const gasObjId: ObjectId = details.objectId;
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

  /**
   *
   * @param coinType coin type path
   * @param address address to get the coins for
   * @returns coins array
   */
  // Fetch all coins for an address, this will keep calling the API until all coins are fetched
  async getCoins(coinType: string, address?: SuiAddress | null) {
    let cursor: string | null = null;
    const allData: CoinStruct[] = [];
    // keep fetching until cursor is null or undefined
    do {
      const { data, nextCursor }: PaginatedCoins = await this.provider.getCoins(
        {
          owner: address!,
          coinType,
          cursor,
          limit: MAX_COINS_PER_REQUEST,
        },
      );
      if (!data || !data.length) {
        break;
      }

      allData.push(...data);
      cursor = nextCursor;
    } while (cursor);

    return allData;
  }

  async getCoinBalance(coinType: string, address?: SuiAddress | null) {
    return await this.provider.getBalance({ owner: address!, coinType });
  }

  async getAllBalances(address?: SuiAddress | null) {
    return await this.provider.getAllBalances({ owner: address! });
  }

  async getActiveValidators() {
    return (await this.provider.getLatestSuiSystemState()).activeValidators;
  }

  async getCoinMetadata(coinType: string) {
    return await this.provider.getCoinMetadata({ coinType });
  }

  /**
   * Dry run a transaction and return the result.
   * @param tx the transaction bytes in Uint8Array
   * @returns The transaction effects
   */
  async dryRunTransaction(tx: Uint8Array): Promise<DryRunTransactionBlockResponse> {
    return this.provider.dryRunTransactionBlock({ transactionBlock: tx });
  }

  async simulateTransaction(
    tx: Uint8Array,
  ): Promise<DryRunTransactionBlockResponse> {
    return await this.dryRunTransaction(tx);
  }

  async getTransactions(address: SuiAddress) {
    // combine from and to transactions
    const [txnIds, fromTxnIds] = await Promise.all([
      this.provider.queryTransactionBlocks({
        filter: {
          ToAddress: address!,
        },
      }),
      this.provider.queryTransactionBlocks({
        filter: {
          FromAddress: address!,
        },
      }),
    ]);

    const transactionsData = await Promise.all(
      [...txnIds.data, ...fromTxnIds.data].map(async (x) => {
        const txnData = await this.provider.getTransactionBlock({
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
  async getObject(objectId: string) {
    const normalizedObjId = objectId && normalizeSuiAddress(objectId);
    const objData = await this.provider.getObject({
      id: normalizedObjId!,
      options: {
        showType: true,
        showContent: true,
        showOwner: true,
        showDisplay: true,
        showPreviousTransaction: false,
        showStorageRebate: false,
        showBcs: false,
      },
    });

    return objData;
  }

  // Function to get the metadata of a an nft with the given object id
  async getNftMetadata(objectID: string) {
    const data = await this.getObject(objectID);

    if (!data) return null;

    if (!is(data, SuiObjectData) || !data.display) return null;
    const { name, description, creator, img_url, link, project_url } =
      data.display;

    return {
      name: name || null,
      description: description || null,
      imageUrl: img_url || null,
      link: link || null,
      projectUrl: project_url || null,
      creator: creator || null,
    };
  }

  // Function to parge the ipfs url of nft metadata (same as we do with aptos nfts ipfs urls)
  parseIpfsUrl(ipfsUrl: string) {
    return ipfsUrl.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/');
  }

  // Function to get an array of all the nfts (with required metadata) owned by an address
  async getNfts(address: SuiAddress) {
    let objects = await this.provider.getOwnedObjects({
      owner: address,
      options: {
        showType: true,
        showDisplay: true,
        showContent: false,
        showBcs: false,
        showOwner: false,
        showPreviousTransaction: false,
        showStorageRebate: false,
      },
    });

    const nfts = objects?.data
      .filter(
        ({ data }) =>
          typeof data === 'object' && 'display' in data && data.display,
      )
      .map(({ data }) => data as SuiObjectData);

    const nftsWithMetadataArray = [];

    await Promise.all(
      nfts.map(async (nft) => {
        const nftMeta = await this.getNftMetadata(nft.objectId);

        nftsWithMetadataArray.push({
          nftMeta,
          objectId: nft.objectId,
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
      .map((validator) => ({
        name: validator.name,
        address: validator.suiAddress,
        apy: calculateAPY(validator, +data.epoch),
        stakeShare: calculateStakeShare(
          BigInt(validator.stakingPoolSuiBalance),
          BigInt(totalStake),
        ),
        totalStaked: validator.stakingPoolSuiBalance,
        epoch: data.epoch,
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

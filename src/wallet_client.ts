import * as bip39 from '@scure/bip39';
import * as english from '@scure/bip39/wordlists/english';
import { Transaction } from './builder';
import { Ed25519Keypair } from './cryptography/ed25519-keypair';
// import { NftClient } from './nft_client';
import { JsonRpcProvider } from './providers/json-rpc-provider';
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
      const response = await this.provider.getObjectsOwnedByAddress({
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
    typeArg: string = SUI_TYPE_ARG,
  ) {
    const coinsNeeded =
      await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
        address,
        BigInt(amount),
        typeArg,
      );
    const coins: ObjectId[] = coinsNeeded.map((coin) => coin.coinObjectId);
    return coins;
  }

  async getStake(address: string) {
    return await this.provider.getStakes({
      owner: address,
    });
  }

  async getGasObject(address: string, exclude: ObjectId[]) {
    const gasObj = await this.provider.selectCoinsWithBalanceGreaterThanOrEqual(
      address,
      BigInt(DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER),
      SUI_TYPE_ARG,
      exclude,
    );
    if (gasObj.length === 0) {
      throw new Error('Not Enough Gas');
    }
    const gasObjId: ObjectId = gasObj[0].coinObjectId;
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
    // It seems to be expensive to fetch all transaction data at once though
    const resp = await this.provider.multiGetTransactions({
      digests: dedupe(
        [...txnIds.data, ...fromTxnIds.data].map((x) => x.digest),
      ),
      options: {
        showInput: true,
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
      },
    });

    return resp.sort(
      // timestamp could be null, so we need to handle
      (a, b) => (a.timestampMs || 0) - (b.timestampMs || 0),
    );
  }

  async getNfts(address: SuiAddress) {
    let objects = await this.provider.getObjectsOwnedByAddress({
      owner: address,
    });
    var nfts: any = [];
    const originByteNftData: any = [];
    await Promise.all(
      objects.map(async (obj) => {
        let objData = await this.provider.getObject({
          id: obj.objectId,
          options: {
            showBcs: true,
            showContent: true,
            showDisplay: true,
            showOwner: true,
            showPreviousTransaction: true,
            showStorageRebate: true,
            showType: true,
          },
        });

        if (!objData) return;

        const objectDetails: any = objData.details;

        if (
          typeof objectDetails !== 'string' &&
          'data' in objectDetails &&
          'fields' in objectDetails.data
        ) {
          if (objectDetails.data.fields.bag) {
            // originbyte nft standard
            originByteNftData.push(objData);
            return;
          }
        }

        if (!Coin.isCoin(objData) && objectDetails!.fields.url) {
          nfts.push(objData);
        } else if (objectDetails!.fields.metadata) {
          nfts.push(objData);
        }
      }),
    );

    // // fetch originbyte nfts
    // const originByteNfts = await this.nftClient.getNftsById({
    //   objects: originByteNftData,
    // });

    // originByteNfts.map((data) => {
    //   try {
    //     let obj: any = originByteNftData.filter(
    //       (val: any) => val.details.reference.objectId === data.nft.id,
    //     );

    //     if (obj.length === 0) return;

    //     obj = obj[0];

    //     obj.details.data.fields = {
    //       ...obj.details.data.fields,
    //       ...data.fields,
    //     };
    //     nfts.push(obj);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });

    return nfts;
  }

  // async mintNfts(
  //   suiAccount: Ed25519Keypair,
  //   name?: string,
  //   description?: string,
  //   imageUrl?: string,
  // ) {
  //   const keypair = suiAccount;
  //   const accountSigner = new RawSigner(keypair, this.provider);
  //   const mintedNft = NftClient.mintExampleNFT(
  //     accountSigner,
  //     name,
  //     description,
  //     imageUrl,
  //   );
  //   return mintedNft;
  // }

  // async transferNft(
  //   suiAccount: Ed25519Keypair,
  //   nftId: string,
  //   recipientID: string,
  // ) {
  //   const keypair = suiAccount;
  //   const accountSigner = new RawSigner(keypair, this.provider);
  //   const mintedNft = NftClient.TransferNFT(accountSigner, nftId, recipientID);
  //   return mintedNft;
  // }

  static getAccountFromMetaData(mnemonic: string, metadata: AccountMetaData) {
    const keypair: any = Ed25519Keypair.deriveKeypair(
      mnemonic,
      metadata.derivationPath,
    );
    return keypair;
  }
}

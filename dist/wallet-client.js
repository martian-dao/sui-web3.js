"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClient = void 0;
const bip39 = __importStar(require("@scure/bip39"));
const english = __importStar(require("@scure/bip39/wordlists/english"));
const builder_1 = require("./builder");
// import { Ed25519Keypair } from './cryptography/ed25519-keypair';
const _1 = require(".");
// import { NftClient } from './nft_client';
const _2 = require(".");
const connection_1 = require("./rpc/connection");
const raw_signer_1 = require("./signers/raw-signer");
const _3 = require(".");
const _4 = require(".");
const nft_client_1 = require("./nft-client");
const stakeHelperFunctions_1 = require("./stakeHelperFunctions");
const kiosk_1 = require("@mysten/kiosk");
const COIN_TYPE = 784;
const MAX_ACCOUNTS = 20;
const MAX_COINS_PER_REQUEST = 100;
const dedupe = (arr) => Array.from(new Set(arr));
class WalletClient {
    constructor(nodeUrl, faucetUrl) {
        this.provider = new _2.JsonRpcProvider(new connection_1.Connection({
            fullnode: nodeUrl,
            faucet: faucetUrl,
        }));
        this.nftClient = new nft_client_1.NftClient(this.provider);
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
    static fromDerivePath(mnemonics, derivationPath) {
        // const normalizeMnemonics = mnemonics
        //     .trim()
        //     .split(/\s+/)
        //     .map((part) => part.toLowerCase())
        //     .join(" ");
        // const { key } = derivePath(path, Buffer.from(bip39.mnemonicToSeedSync(normalizeMnemonics)).toString("hex"));
        // return Ed25519Keypair.fromSeed(new Uint8Array(key));
        return _1.Ed25519Keypair.deriveKeypair(mnemonics, derivationPath);
    }
    /**
     * returns an Ed25519Keypair object given a private key and
     * address of the account
     *
     * @param privateKey Private key of an account as a Buffer
     * @returns Ed25519Keypair object
     */
    static getAccountFromPrivateKey(privateKey) {
        return _1.Ed25519Keypair.fromSeed(privateKey.slice(0, 32));
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
    async importWallet(code) {
        const accountMetaData = [];
        for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
            /* eslint-disable no-await-in-loop */
            const derivationPath = `m/44'/${COIN_TYPE}'/${i}'/0'/0'`;
            const keypair = WalletClient.fromDerivePath(code, derivationPath);
            const address = keypair.getPublicKey().toSuiAddress();
            const publicKey = Buffer.from(keypair.getPublicKey().toBytes()).toString('hex');
            // check if this account exists on Sui or not
            let response;
            try {
                response = await this.provider.getAllBalances({
                    owner: address,
                });
            }
            catch (err) {
                response = undefined;
            }
            if (!response) {
                accountMetaData.push({
                    derivationPath,
                    address: address.startsWith('0x') ? address : '0x' + address,
                    publicKey: publicKey.startsWith('0x') ? publicKey : '0x' + publicKey,
                });
                break;
            }
            if (Object.keys(response).length !== 0 || i === 0) {
                accountMetaData.push({
                    derivationPath,
                    address: address.startsWith('0x') ? address : '0x' + address,
                    publicKey: publicKey.startsWith('0x') ? publicKey : '0x' + publicKey,
                });
                // NOTE: breaking because multiple address support is not available currently
            }
            else {
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
    async createWallet(code) {
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
    async createNewAccount(code, index) {
        if (index >= MAX_ACCOUNTS) {
            throw new Error('Max no. of accounts reached');
        }
        const derivationPath = `m/44'/${COIN_TYPE}'/${index}'/0'/0'`;
        const keypair = WalletClient.fromDerivePath(code, derivationPath);
        const address = keypair.getPublicKey().toSuiAddress();
        const pubKey = Buffer.from(keypair.getPublicKey().toBytes()).toString('hex');
        return {
            derivationPath,
            address: address.startsWith('0x') ? address : '0x' + address,
            publicKey: pubKey.startsWith('0x') ? pubKey : '0x' + pubKey,
        };
    }
    async transferSui(amount, suiAccount, receiverAddress) {
        const keypair = suiAccount;
        const tx = new builder_1.TransactionBlock();
        const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
        tx.transferObjects([coin], tx.pure(receiverAddress));
        const signer = new raw_signer_1.RawSigner(keypair, this.provider);
        return await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });
    }
    async getBalance(address, typeArg = _3.SUI_TYPE_ARG) {
        const objects = await this.provider.getBalance({
            owner: address,
            coinType: typeArg,
        });
        return objects.totalBalance;
    }
    async airdrop(address) {
        return await this.provider.requestSuiFromFaucet(address);
    }
    async getCoinsWithRequiredBalance(address, amount, cursor, limit) {
        const input = {
            owner: address,
        };
        if (cursor)
            input.cursor = cursor;
        if (limit)
            input.limit = limit;
        const coinsNeeded = await this.provider.getCoins(input);
        const coins = coinsNeeded.data
            .map((coin) => coin.balance && parseInt(coin.balance) >= amount
            ? coin.coinObjectId
            : undefined)
            .filter((d) => d);
        return coins;
    }
    async getStake(address) {
        return await this.provider.getStakes({
            owner: address,
        });
    }
    async getGasObjectsOwnedByAddress(address) {
        const objects = await this.provider.getOwnedObjects({
            owner: address,
            // @ts-ignore
            options: { showType: true, showContent: true, showOwner: true },
        });
        return objects.data.filter((obj) => _3.Coin.isCoin(obj));
    }
    async getGasObject(address) {
        const gasObj = await this.getGasObjectsOwnedByAddress(address);
        if (gasObj.length === 0) {
            throw new Error('Not Enough Gas');
        }
        const details = gasObj[0].data;
        const gasObjId = details.objectId;
        return gasObjId;
    }
    async getCustomCoins(address) {
        const objects = await this.provider.getAllCoins({
            owner: address,
        });
        let coinIds = await Promise.all(objects.data.map(async (c) => {
            let coinData;
            try {
                coinData = await this.provider.getCoinMetadata({
                    coinType: c.coinType,
                });
            }
            catch (getCoinErr) {
                console.warn('[SDK]', getCoinErr);
            }
            if (!coinData && c.coinType !== _3.SUI_TYPE_ARG)
                return;
            if (c.coinType === _3.SUI_TYPE_ARG) {
                return {
                    Id: c.coinObjectId,
                    symbol: _3.Coin.getCoinSymbol(c.coinType),
                    name: _3.Coin.getCoinSymbol(c.coinType),
                    balance: Number(c.balance),
                    decimals: 9,
                    iconUrl: null,
                    coinTypeArg: c.coinType,
                };
            }
            return {
                Id: c.coinObjectId,
                symbol: coinData.symbol,
                name: coinData.name,
                balance: Number(c.balance),
                decimals: coinData.decimals,
                iconUrl: coinData.iconUrl,
                coinTypeArg: c.coinType,
            };
        }));
        // removing any undefined/null values
        coinIds = coinIds.filter((d) => d);
        return coinIds;
    }
    /**
     *
     * @param coinType coin type path
     * @param address address to get the coins for
     * @returns coins array
     */
    // Fetch all coins for an address, this will keep calling the API until all coins are fetched
    async getCoins(coinType, address) {
        let cursor = null;
        const allData = [];
        // keep fetching until cursor is null or undefined
        do {
            const { data, nextCursor } = await this.provider.getCoins({
                owner: address,
                coinType,
                cursor,
                limit: MAX_COINS_PER_REQUEST,
            });
            if (!data || !data.length) {
                break;
            }
            allData.push(...data);
            cursor = nextCursor;
        } while (cursor);
        return allData;
    }
    async getCoinBalance(coinType, address) {
        return await this.provider.getBalance({ owner: address, coinType });
    }
    async getAllBalances(address) {
        return await this.provider.getAllBalances({ owner: address });
    }
    async getActiveValidators() {
        return (await this.provider.getLatestSuiSystemState()).activeValidators;
    }
    async getCoinMetadata(coinType) {
        return await this.provider.getCoinMetadata({ coinType });
    }
    /**
     * Dry run a transaction and return the result.
     * @param tx the transaction bytes in Uint8Array
     * @returns The transaction effects
     */
    async dryRunTransaction(tx) {
        return this.provider.dryRunTransactionBlock({ transactionBlock: tx });
    }
    async simulateTransaction(tx) {
        return await this.dryRunTransaction(tx);
    }
    async getTransactions(address, limit = 50, cursor = undefined) {
        // combine from and to transactions
        const [txnIds, fromTxnIds] = await Promise.all([
            this.provider.queryTransactionBlocks({
                filter: {
                    ToAddress: address,
                },
                // @ts-ignore
                options: {
                    showInput: true,
                    showEffects: true,
                    showEvents: true,
                },
                cursor,
                limit,
            }),
            this.provider.queryTransactionBlocks({
                filter: {
                    FromAddress: address,
                },
                // @ts-ignore
                options: {
                    showInput: true,
                    showEffects: true,
                    showEvents: true,
                },
                cursor,
                limit,
            }),
        ]);
        const inserted = new Map();
        const uniqueList = [];
        [...txnIds.data, ...fromTxnIds.data]
            .sort((a, b) => Number(b.timestampMs ?? 0) - Number(a.timestampMs ?? 0))
            .forEach((txb) => {
            if (inserted.get(txb.digest))
                return;
            uniqueList.push(txb);
            inserted.set(txb.digest, true);
        });
        return uniqueList;
    }
    // Function to get the object metadata of a given objectId
    async getObject(objectId) {
        const normalizedObjId = objectId && (0, _4.normalizeSuiAddress)(objectId);
        const objData = await this.provider.getObject({
            id: normalizedObjId,
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
    async getNftMetadata(objectID) {
        const resp = await this.getObject(objectID);
        if (!resp)
            return null;
        if (!resp.data)
            return null;
        const display = (0, _3.getObjectDisplay)(resp);
        if (!display.data) {
            return null;
        }
        const { name, description, creator, image_url, link, project_url, collection_name, collection_image, } = display.data;
        // return display object doesn't have image url
        if (!image_url)
            return null;
        return {
            name: name || null,
            collection: collection_name || null,
            collection_image: collection_image || null,
            description: description || null,
            imageUrl: image_url || null,
            link: link || null,
            projectUrl: project_url || null,
            creator: creator || null,
            data: resp.data,
        };
    }
    // Function to parge the ipfs url of nft metadata (same as we do with aptos nfts ipfs urls)
    parseIpfsUrl(ipfsUrl) {
        return ipfsUrl.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/');
    }
    async getKioskNfts(kioskId) {
        const kiosk = await this.provider.getDynamicFields({ parentId: kioskId });
        return kiosk.data
            .filter((item) => item.name.type === '0x2::kiosk::Item')
            .map((item) => ({ kioskId, nft: item.name.value.id }));
    }
    /**
     * This function retrieves the contents of kiosks owned by a given address on the OriginByte
     * contract.
     * @param {SuiAddress} address - The `address` parameter is a `SuiAddress` type
     * @returns The function `getOriginByteKioskContents` returns the contents of the objects within the
     * kiosks owned by the provided address. The contents are fetched by first finding the kiosk IDs
     * owned by the address, then finding the object IDs within each kiosk, and finally fetching the
     * contents of the objects within each kiosk. The function returns the fetched kiosk content.
     */
    async getOriginByteKioskContents(address) {
        // OriginByte contract address for mainnet (we only support mainnet)
        const ORIGINBYTE_KIOSK_MODULE = '0x95a441d389b07437d00dd07e0b6f05f513d7659b13fd7c5d3923c7d9d847199b::ob_kiosk';
        const ORIGINBYTE_KIOSK_OWNER_TOKEN = `${ORIGINBYTE_KIOSK_MODULE}::OwnerToken`;
        const objects = await this.provider.getOwnedObjects({
            owner: address,
            filter: {
                StructType: ORIGINBYTE_KIOSK_OWNER_TOKEN,
            },
            options: {
                showType: true,
                showDisplay: true,
                showContent: true,
                showBcs: true,
                showOwner: true,
                showPreviousTransaction: true,
                showStorageRebate: true,
            },
        });
        const kioskInfo = objects?.data[0]?.data?.content;
        // find list of kiosk IDs owned by address
        const obKioskIds = objects?.data.map((obj) => obj.data?.content &&
            'fields' in obj.data.content &&
            obj.data.content.fields.kiosk) ?? [];
        if (!obKioskIds.length)
            return [];
        // fetch the user's kiosks
        const ownedKiosks = await this.provider.multiGetObjects({
            ids: obKioskIds,
            options: {
                showType: true,
                showDisplay: true,
                showContent: true,
                showBcs: true,
                showOwner: true,
                showPreviousTransaction: true,
                showStorageRebate: true,
            },
        });
        // find object IDs within a kiosk
        const kioskObjectIds = await Promise.all(ownedKiosks.map(async (kiosk) => {
            if (!kiosk.data?.objectId)
                return [];
            const objects = await this.provider.getDynamicFields({
                parentId: kiosk.data.objectId,
            });
            return objects.data.map((obj) => obj.objectId);
        }));
        // fetch the contents of the objects within a kiosk
        const kioskContent = await this.provider.multiGetObjects({
            ids: kioskObjectIds.flat(),
            options: {
                showType: true,
                showDisplay: true,
                showContent: true,
                showBcs: true,
                showOwner: true,
                showPreviousTransaction: true,
                showStorageRebate: true,
            },
        });
        return { kioskContent, kioskInfo };
    }
    async getSuiKioskContents(address) {
        // @ts-ignore adding this because type issue with JsonRpcProvider
        const ownedKiosks = await (0, kiosk_1.getOwnedKiosks)(this.provider, address);
        const kioskContents = await Promise.all(ownedKiosks.kioskOwnerCaps.map(async ({ objectId, kioskId }) => {
            const data = await (0, kiosk_1.fetchKiosk)(
            // @ts-ignore adding this because type issue with JsonRpcProvider
            this.provider, kioskId, { limit: 1000 }, {});
            return {
                data,
                kioskId,
                kioskOwnerCapId: objectId,
            };
        }));
        const items = kioskContents.flatMap((k) => k.data.data.items);
        const ids = items.map((item) => item.objectId);
        // fetch the contents of the objects within a kiosk
        const kioskContent = await this.provider.multiGetObjects({
            ids,
            // @ts-ignore
            options: {
                showContent: true,
                showDisplay: true,
                showType: true,
            },
        });
        kioskContent.forEach((data) => {
            kioskContents.forEach((k) => {
                if (!k.data.data.itemIds.includes(data.data.objectId))
                    return;
                data.kioskInfo = {
                    kioskId: k.kioskId,
                    kioskOwnerCapId: k.kioskOwnerCapId,
                };
            });
        });
        return kioskContent;
    }
    /**
     * This function retrieves NFTs owned by a given address and their metadata, as well as kiosk NFTs
     * and their metadata if specified.
     * @param {SuiAddress} address - The address of the owner whose NFTs are being fetched.
     * @param {boolean} [shouldFetchKioskContents] - `shouldFetchKioskContents` is an optional boolean
     * @param {string} after - last fetched key
     * @param {number} limit - limit total count
     * parameter that determines whether or not to fetch kiosk contents for the given `address`. If
     * `shouldFetchKioskContents` is `true`, the function will call
     * `this.getOriginByteKioskContents(address)` to fetch kiosk contents
     * shouldFetchKioskContents will be true only for mainnet
     * @returns The function `getNfts` returns an array of objects containing metadata for NFTs owned by
     * a given address, as well as metadata for NFTs stored in a kiosk.
     * Each object in the array contains the following properties: `nftMeta` (an object
     * containing metadata for the NFT), `objectId` and `type`
     */
    async getNfts(address, shouldFetchKioskContents = true, after = undefined, limit = undefined) {
        const args = {
            owner: address,
            filter: {
                MatchNone: [{ StructType: '0x2::coin::Coin' }],
            },
            options: {
                showType: true,
                showDisplay: true,
                showContent: true,
                showBcs: false,
                showOwner: false,
                showPreviousTransaction: false,
                showStorageRebate: false,
            },
        };
        if (after) {
            args.cursor = after;
        }
        if (limit) {
            args.limit = limit;
        }
        let objects = await this.provider.getOwnedObjects(args);
        let obKioskContents;
        if (shouldFetchKioskContents) {
            obKioskContents = await this.getOriginByteKioskContents(address);
        }
        const filteredKioskContents = obKioskContents.kioskContent
            ?.filter(({ data }) => typeof data === 'object' && 'display' in data && data.display.data)
            .map(({ data }) => data) || [];
        const nfts = objects?.data
            .filter(({ data }) => typeof data === 'object' && 'display' in data && data.display.data)
            .map(({ data }) => data);
        const nftsWithMetadataArray = [];
        await Promise.all(nfts.map(async (nft) => {
            const nftMeta = await this.getNftMetadata(nft.objectId);
            if (nftMeta) {
                nftsWithMetadataArray.push({
                    nftMeta,
                    objectId: nft.objectId,
                    type: 'nft',
                });
            }
            else {
                const nftDisplayData = nft.display.data;
                nftsWithMetadataArray.push({
                    nftMeta: {
                        ...nftDisplayData,
                        imageUrl: nftDisplayData?.image_url,
                    },
                    objectId: nft.objectId,
                    type: 'nft',
                });
            }
        }));
        filteredKioskContents.forEach((nft) => {
            const nftDisplayData = nft.display?.data;
            if (nftDisplayData) {
                nftsWithMetadataArray.push({
                    ...nft,
                    nftMeta: {
                        ...nftDisplayData,
                        imageUrl: nftDisplayData?.image_url,
                    },
                    objectId: nft.objectId,
                    type: 'kiosk-nft',
                    kioskInfo: obKioskContents.kioskInfo,
                    nftType: nft.type,
                });
            }
        });
        // fetch sui kiosk nfts
        const suiKioskContents = await this.getSuiKioskContents(address);
        suiKioskContents.forEach(({ data, kioskInfo }) => {
            if (!data)
                return;
            // store nft data
            const nftDisplayData = data.display?.data;
            // if nft data is not available, skip
            if (!nftDisplayData)
                return;
            // push nft data to array
            nftsWithMetadataArray.push({
                ...data,
                nftMeta: {
                    ...nftDisplayData,
                    imageUrl: nftDisplayData?.image_url,
                },
                objectId: data.objectId,
                type: 'kiosk-nft',
                kioskInfo,
                nftType: data.type,
            });
        });
        return {
            nftsWithMetadataArray,
            cursor: objects.nextCursor,
            hasNextPage: objects.hasNextPage,
        };
    }
    // get the current system state (required to get total staked sui value and validators data)
    async getSystemState() {
        const state = await this.provider.getLatestSuiSystemState();
        return state;
    }
    // get total staked sui value
    async getTotalStake() {
        const data = await this.getSystemState();
        if (!data)
            return 0;
        return data.activeValidators.reduce((acc, curr) => (acc += BigInt(curr.stakingPoolSuiBalance)), 0n);
    }
    async getValidatorsList(sortKey = 'stakeShare', sortAscending) {
        const data = await this.getSystemState();
        if (!data)
            return [];
        const totalStake = await this.getTotalStake();
        const { apys } = await this.provider.getValidatorsApy();
        const sortedAsc = data.activeValidators
            .map((validator) => ({
            name: validator.name,
            address: validator.suiAddress,
            imageUrl: validator.imageUrl,
            apy: (0, stakeHelperFunctions_1.calculateAPY)(apys.filter((d) => d.address === validator.suiAddress)[0]?.apy || 0),
            stakeShare: (0, stakeHelperFunctions_1.calculateStakeShare)(BigInt(validator.stakingPoolSuiBalance), BigInt(totalStake)),
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
    async getDelegatedStake(address) {
        const stakedAmount = await this.provider.getStakes({ owner: address });
        return stakedAmount;
    }
    // Get time between current epoch and specified epoch
    // Get the period between the current epoch and next epoch
    async getTimeBeforeEpochNumber(epoch) {
        const data = await this.getSystemState();
        // Current epoch
        let currentEpoch = data?.epoch || '0';
        let currentEpochStartTime = data?.epochStartTimestampMs || '0';
        let epochPeriod = data?.epochDurationMs || '0';
        currentEpoch = parseInt(currentEpoch);
        currentEpochStartTime = parseInt(currentEpochStartTime);
        epochPeriod = parseInt(epochPeriod);
        const timeBeforeSpecifiedEpoch = epoch > currentEpoch && epoch > 0 && epochPeriod > 0
            ? currentEpochStartTime + (epoch - currentEpoch) * epochPeriod
            : 0;
        return {
            ...data,
            data: timeBeforeSpecifiedEpoch,
        };
    }
    static getAccountFromMetaData(mnemonic, metadata) {
        const keypair = _1.Ed25519Keypair.deriveKeypair(mnemonic, metadata.derivationPath);
        return keypair;
    }
    /**
     * returns an Ed25519Keypair at position m/44'/784'/0'/0'/0'
     *
     * @param mnemonic mnemonic phrase of the wallet
     * @returns Ed25519Keypair
     */
    static getAccountFromMnemonic(mnemonic) {
        const keypair = _1.Ed25519Keypair.deriveKeypair(mnemonic);
        return keypair;
    }
}
exports.WalletClient = WalletClient;
//# sourceMappingURL=wallet-client.js.map
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
const ed25519_keypair_1 = require("./cryptography/ed25519-keypair");
const json_rpc_provider_1 = require("./providers/json-rpc-provider");
const framework_1 = require("./types/framework");
const rpc_txn_data_serializer_1 = require("./signers/txn-data-serializers/rpc-txn-data-serializer");
const objects_1 = require("./types/objects");
const raw_signer_1 = require("./signers/raw-signer");
const nft_client_1 = require("./nft_client");
const api_endpoints_1 = require("./utils/api-endpoints");
const websocket_client_1 = require("./rpc/websocket-client");
const base64_1 = require("./serialization/base64");
const COIN_TYPE = 784;
const MAX_ACCOUNTS = 20;
const DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER = 1000;
const endpoints = api_endpoints_1.NETWORK_TO_API[api_endpoints_1.Network.DEVNET];
const AIRDROP_SENDER = '0xc4173a804406a365e69dfb297d4eaaf002546ebd';
class WalletClient {
    constructor(nodeUrl = endpoints.fullNode, faucetUrl = endpoints.faucet) {
        this.provider = new json_rpc_provider_1.JsonRpcProvider(nodeUrl, {
            skipDataValidation: true,
            socketOptions: websocket_client_1.DEFAULT_CLIENT_OPTIONS,
            versionCacheTimoutInSeconds: 600,
            faucetURL: faucetUrl,
        });
        this.serializer = new rpc_txn_data_serializer_1.RpcTxnDataSerializer(nodeUrl);
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
        return ed25519_keypair_1.Ed25519Keypair.deriveKeypair(mnemonics, derivationPath);
    }
    /**
     * returns an Ed25519Keypair object given a private key and
     * address of the account
     *
     * @param privateKey Private key of an account as a Buffer
     * @returns Ed25519Keypair object
     */
    static getAccountFromPrivateKey(privateKey) {
        return ed25519_keypair_1.Ed25519Keypair.fromSeed(privateKey.slice(0, 32));
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
            const response = await this.provider.getObjectsOwnedByAddress(address);
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
    async transferSuiMnemonic(amount, suiAccount, receiverAddress, typeArg = framework_1.SUI_TYPE_ARG) {
        const keypair = suiAccount;
        const senderAddress = keypair.getPublicKey().toSuiAddress();
        if (typeArg === framework_1.SUI_TYPE_ARG) {
            const coinsNeeded = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(senderAddress, BigInt(amount + DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER), typeArg);
            const inputCoins = coinsNeeded.map((coin) => (0, objects_1.getObjectId)(coin));
            const recipients = [receiverAddress];
            const amounts = [amount];
            const payTxn = {
                inputCoins: inputCoins,
                recipients: recipients,
                amounts: amounts,
                gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER,
            };
            const signer = new raw_signer_1.RawSigner(keypair, this.provider, this.serializer);
            return await signer.pay(payTxn);
        }
        else {
            const coinsNeeded = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(senderAddress, BigInt(amount), typeArg);
            const inputCoins = coinsNeeded.map((coin) => (0, objects_1.getObjectId)(coin));
            const gasObjId = await this.getGasObject(senderAddress, inputCoins);
            const recipients = [receiverAddress];
            const amounts = [amount];
            const payTxn = {
                inputCoins: inputCoins,
                recipients: recipients,
                amounts: amounts,
                gasPayment: gasObjId,
                gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER,
            };
            const signer = new raw_signer_1.RawSigner(keypair, this.provider, this.serializer);
            return await signer.pay(payTxn);
        }
    }
    async getBalance(address, typeArg = framework_1.SUI_TYPE_ARG) {
        let objects = await this.provider.getCoinBalancesOwnedByAddress(address, typeArg);
        return framework_1.Coin.totalBalance(objects);
    }
    async airdrop(address) {
        return await this.provider.requestSuiFromFaucet(address);
    }
    async getCoinsWithRequiredBalance(address, amount, typeArg = framework_1.SUI_TYPE_ARG) {
        const coinsNeeded = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(address, BigInt(amount), typeArg);
        const coins = coinsNeeded.map((coin) => (0, objects_1.getObjectId)(coin));
        return coins;
    }
    async getGasObject(address, exclude) {
        const gasObj = await this.provider.selectCoinsWithBalanceGreaterThanOrEqual(address, BigInt(DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER), framework_1.SUI_TYPE_ARG, exclude);
        if (gasObj.length === 0) {
            throw new Error('Not Enough Gas');
        }
        const gasObjId = (0, objects_1.getObjectId)(gasObj[0]);
        return gasObjId;
    }
    async getCustomCoins(address) {
        const objects = await this.provider.getCoinBalancesOwnedByAddress(address);
        const coinIds = objects.map((c) => ({
            Id: framework_1.Coin.getID(c),
            symbol: framework_1.Coin.getCoinSymbol(framework_1.Coin.getCoinTypeArg(c)),
            name: framework_1.Coin.getCoinSymbol(framework_1.Coin.getCoinTypeArg(c)),
            balance: Number(framework_1.Coin.getBalance(c)),
            decimals: 9,
            coinTypeArg: framework_1.Coin.getCoinTypeArg(c),
        }));
        return coinIds;
    }
    async generateTransaction(address, tx) {
        let dryRunTxBytes;
        if (typeof tx === 'string') {
            dryRunTxBytes = tx;
        }
        else if (tx instanceof base64_1.Base64DataBuffer) {
            dryRunTxBytes = tx.toString();
        }
        else {
            switch (tx.kind) {
                case 'bytes':
                    dryRunTxBytes = new base64_1.Base64DataBuffer(tx.data).toString();
                    break;
                case 'mergeCoin':
                    dryRunTxBytes = (await this.serializer.newMergeCoin(address, tx.data)).toString();
                    break;
                case 'moveCall':
                    dryRunTxBytes = (await this.serializer.newMoveCall(address, tx.data)).toString();
                    break;
                case 'pay':
                    dryRunTxBytes = (await this.serializer.newPay(address, tx.data)).toString();
                    break;
                case 'payAllSui':
                    dryRunTxBytes = (await this.serializer.newPayAllSui(address, tx.data)).toString();
                    break;
                case 'paySui':
                    dryRunTxBytes = (await this.serializer.newPaySui(address, tx.data)).toString();
                    break;
                case 'publish':
                    dryRunTxBytes = (await this.serializer.newPublish(address, tx.data)).toString();
                    break;
                case 'splitCoin':
                    dryRunTxBytes = (await this.serializer.newSplitCoin(address, tx.data)).toString();
                    break;
                case 'transferObject':
                    dryRunTxBytes = (await this.serializer.newTransferObject(address, tx.data)).toString();
                    break;
                case 'transferSui':
                    dryRunTxBytes = (await this.serializer.newTransferSui(address, tx.data)).toString();
                    break;
                default:
                    throw new Error(`Error, unknown transaction kind ${tx.kind}. Can't dry run transaction.`);
            }
        }
        if (typeof dryRunTxBytes === 'string') {
            return new base64_1.Base64DataBuffer(dryRunTxBytes);
        }
        return dryRunTxBytes;
    }
    /**
     * Dry run a transaction and return the result.
     * @param address address of the account
     * @param tx the transaction as SignableTransaction or string (in base64) that will dry run
     * @returns The transaction effects
     */
    async dryRunTransaction(address, tx) {
        let dryRunTxBytes;
        if (typeof tx === 'string') {
            dryRunTxBytes = tx;
        }
        else if (tx instanceof base64_1.Base64DataBuffer) {
            dryRunTxBytes = tx.toString();
        }
        else {
            switch (tx.kind) {
                case 'bytes':
                    dryRunTxBytes = new base64_1.Base64DataBuffer(tx.data).toString();
                    break;
                case 'mergeCoin':
                    dryRunTxBytes = (await this.serializer.newMergeCoin(address, tx.data)).toString();
                    break;
                case 'moveCall':
                    dryRunTxBytes = (await this.serializer.newMoveCall(address, tx.data)).toString();
                    break;
                case 'pay':
                    dryRunTxBytes = (await this.serializer.newPay(address, tx.data)).toString();
                    break;
                case 'payAllSui':
                    dryRunTxBytes = (await this.serializer.newPayAllSui(address, tx.data)).toString();
                    break;
                case 'paySui':
                    dryRunTxBytes = (await this.serializer.newPaySui(address, tx.data)).toString();
                    break;
                case 'publish':
                    dryRunTxBytes = (await this.serializer.newPublish(address, tx.data)).toString();
                    break;
                case 'splitCoin':
                    dryRunTxBytes = (await this.serializer.newSplitCoin(address, tx.data)).toString();
                    break;
                case 'transferObject':
                    dryRunTxBytes = (await this.serializer.newTransferObject(address, tx.data)).toString();
                    break;
                case 'transferSui':
                    dryRunTxBytes = (await this.serializer.newTransferSui(address, tx.data)).toString();
                    break;
                default:
                    throw new Error(`Error, unknown transaction kind ${tx.kind}. Can't dry run transaction.`);
            }
        }
        return this.provider.dryRunTransaction(dryRunTxBytes);
    }
    async simulateTransaction(address, tx) {
        return await this.dryRunTransaction(address, tx);
    }
    async getTransactions(address) {
        const transactions = await this.provider.getTransactionsForAddress(address);
        const uniqueTransactions = [...new Set(transactions)];
        const finalTransacationsData = [];
        await Promise.all(uniqueTransactions.map(async (digest) => {
            const transactionData = await this.provider.getTransactionWithEffects(digest);
            if (transactionData.effects.status.status === 'success') {
                const events = transactionData.effects.events;
                const coinBalanceReceiveEvents = events?.filter((event) => event.coinBalanceChange &&
                    event.coinBalanceChange.owner?.AddressOwner === address &&
                    event.coinBalanceChange.changeType !== 'Gas' &&
                    event.coinBalanceChange.amount >= 0);
                const coinBalanceSendEvents = events?.filter((event) => event.coinBalanceChange &&
                    event.coinBalanceChange.sender === address &&
                    event.coinBalanceChange.changeType !== 'Gas' &&
                    event.coinBalanceChange.changeType !== 'Pay');
                const transferEvents = events?.filter((event) => event.transferObject);
                const moveEvents = events?.filter((event) => event.moveEvent);
                let totalCoinBalanceChange = 0;
                let changeType = {
                    type: '',
                    from: '',
                    to: '',
                    resourceType: '',
                    changeTextSuffix: '',
                };
                coinBalanceReceiveEvents?.forEach((event) => {
                    totalCoinBalanceChange += event.coinBalanceChange.amount;
                    if (!changeType.type) {
                        if (event.coinBalanceChange.sender === AIRDROP_SENDER) {
                            changeType = {
                                type: 'Receive',
                                text: 'Airdrop',
                                from: event.coinBalanceChange.sender,
                                to: event.coinBalanceChange.owner?.AddressOwner,
                                resourceType: event.coinBalanceChange.coinType,
                                changeTextSuffix: ' ' + event.coinBalanceChange.coinType?.split('::')[2],
                            };
                        }
                        else {
                            changeType = {
                                type: 'Receive',
                                text: 'Received',
                                from: event.coinBalanceChange.sender,
                                to: event.coinBalanceChange.owner?.AddressOwner,
                                resourceType: event.coinBalanceChange.coinType,
                                changeTextSuffix: ' ' + event.coinBalanceChange.coinType?.split('::')[2],
                            };
                        }
                    }
                });
                coinBalanceSendEvents?.forEach((event) => {
                    totalCoinBalanceChange += event.coinBalanceChange.amount;
                    if (!changeType.type) {
                        changeType = {
                            type: 'Send',
                            text: 'Sent',
                            from: event.coinBalanceChange.sender,
                            to: event.coinBalanceChange.owner?.AddressOwner,
                            resourceType: event.coinBalanceChange.coinType,
                            changeTextSuffix: ' ' + event.coinBalanceChange.coinType?.split('::')[2],
                        };
                    }
                });
                await Promise.all(transferEvents?.map(async (event) => {
                    if (event.transferObject.objectType === '0x2::devnet_nft::DevNetNFT') {
                        const nftData = await this.provider.getObject(event.transferObject.objectId);
                        const nftDetails = nftData.details;
                        changeType = {
                            nftData: nftDetails,
                            type: event.transferObject.recipient?.AddressOwner === address
                                ? 'Receive'
                                : 'Send',
                            text: event.transferObject.recipient?.AddressOwner === address
                                ? 'NFT Received'
                                : 'NFT Sent',
                            from: event.transferObject.sender,
                            to: event.transferObject.recipient?.AddressOwner,
                            resourceType: event.transferObject.objectType,
                            changeTextSuffix: ` ${nftDetails?.data?.fields?.name}`,
                        };
                        totalCoinBalanceChange =
                            event.transferObject.recipient?.AddressOwner === address
                                ? 1
                                : -1;
                    }
                }));
                await Promise.all(moveEvents?.map(async (event) => {
                    if (event.moveEvent.type === '0x2::devnet_nft::MintNFTEvent') {
                        const nftData = await this.provider.getObject(event.moveEvent.fields.object_id);
                        const nftDetails = nftData.details;
                        changeType = {
                            nftData: nftDetails,
                            type: 'Receive',
                            text: 'NFT Minted',
                            resourceType: event.moveEvent.type,
                            changeTextSuffix: ` ${nftDetails?.data?.fields?.name}`,
                        };
                        totalCoinBalanceChange = 1;
                    }
                }));
                const timestamp = transactionData.timestamp_ms;
                finalTransacationsData.push({
                    ...transactionData,
                    totalCoinBalanceChange,
                    changeType,
                    date: new Date(timestamp).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                });
            }
        }));
        finalTransacationsData.sort((a, b) => b.timestamp_ms - a.timestamp_ms);
        return finalTransacationsData;
    }
    async getNfts(address) {
        let objects = await this.provider.getObjectsOwnedByAddress(address);
        var nfts = [];
        await Promise.all(objects.map(async (obj) => {
            let objData = await this.provider.getObject(obj.objectId);
            let moveObj = (0, objects_1.getMoveObject)(objData);
            if (!framework_1.Coin.isCoin(objData) &&
                moveObj.fields.url) {
                nfts.push(objData);
            }
            else if (moveObj.fields.metadata) {
                nfts.push(objData);
            }
        }));
        return nfts;
    }
    async mintNfts(suiAccount, name, description, imageUrl) {
        const keypair = suiAccount;
        const accountSigner = new raw_signer_1.RawSigner(keypair, this.provider, this.serializer);
        const mintedNft = nft_client_1.ExampleNFT.mintExampleNFT(accountSigner, name, description, imageUrl);
        return mintedNft;
    }
    async transferNft(suiAccount, nftId, recipientID) {
        const keypair = suiAccount;
        const accountSigner = new raw_signer_1.RawSigner(keypair, this.provider, this.serializer);
        const mintedNft = nft_client_1.ExampleNFT.TransferNFT(accountSigner, nftId, recipientID);
        return mintedNft;
    }
    static getAccountFromMetaData(mnemonic, _metadata) {
        const keypair = ed25519_keypair_1.Ed25519Keypair.deriveKeypair(mnemonic);
        return keypair;
    }
}
exports.WalletClient = WalletClient;
//# sourceMappingURL=wallet_client.js.map
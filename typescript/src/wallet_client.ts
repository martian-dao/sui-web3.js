import * as bip39 from "@scure/bip39";
import * as english from "@scure/bip39/wordlists/english";
// import { derivePath } from "ed25519-hd-key";
// import { Buffer } from "buffer/";
import { Ed25519Keypair } from "./cryptography/ed25519-keypair";
// import { getCoinAfterMerge, getCoinAfterSplit } from "./types/transactions";
// import { DEFAULT_END_TIME, DEFAULT_START_TIME, EVENT_QUERY_MAX_LIMIT, GetObjectDataResponse, ObjectOwner, SuiAddress} from "./types";
// import { TransferSuiTransaction } from "./signers/txn-data-serializers/txn-data-serializer";
import { JsonRpcProvider } from "./providers/json-rpc-provider";
import { Coin } from "./types/framework";
import { RpcTxnDataSerializer } from "./signers/txn-data-serializers/rpc-txn-data-serializer";
// import { getMoveObject, getObjectId, SuiMoveObject } from "./types/objects";
// import { RawSigner } from "./signers/raw-signer";
// import { ExampleNFT } from "./nft_client";
import { Network } from "./utils/api-endpoints";

const COIN_TYPE = 784;
const MAX_ACCOUNTS = 5;
// const DEV_NET_URL = 'https://fullnode.devnet.sui.io:443';
const EVENT_NET_URL = 'https://fullnode.devnet.sui.io';
// const DEFAULT_GAS_BUDGET_FOR_MERGE = 1000;
// const DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER = 1000;
// const DEFAULT_GAS_BUDGET_FOR_SPLIT = 1000;

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
    providerEvent: JsonRpcProvider;
    serializer: RpcTxnDataSerializer;
    
    constructor() {
        this.provider = new JsonRpcProvider();
        this.providerEvent = new JsonRpcProvider(EVENT_NET_URL);
        this.serializer = new RpcTxnDataSerializer(Network.DEVNET);
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
    static fromDerivePath(mnemonics: string): Ed25519Keypair {

        // const normalizeMnemonics = mnemonics
        //     .trim()
        //     .split(/\s+/)
        //     .map((part) => part.toLowerCase())
        //     .join(" ");

        // const { key } = derivePath(path, Buffer.from(bip39.mnemonicToSeedSync(normalizeMnemonics)).toString("hex"));

        // return Ed25519Keypair.fromSeed(new Uint8Array(key));
        return Ed25519Keypair.deriveKeypair(mnemonics);
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
        let address = "";
        let publicKey = "";
        let derivationPath = "";

        const accountMetaData: AccountMetaData[] = [];
        for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
            /* eslint-disable no-await-in-loop */
            derivationPath = `m/44'/${COIN_TYPE}'/${i}'/0'/0'`;
            const keypair = WalletClient.fromDerivePath(code);
            address = keypair.getPublicKey().toSuiAddress();
            // console.log(address);
            publicKey = keypair.getPublicKey().toString();
            // check if this account exists on Sui or not
            // const response = await this.provider.getObjectsOwnedByAddress(address);
            // if (Object.keys(response).length !== 0) {
                accountMetaData.push({
                    derivationPath,
                    address,
                    publicKey,
                });
            // } else {
                // break;
            // }
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
    async createWallet(): Promise<Wallet> {
        const code = bip39.generateMnemonic(english.wordlist); // mnemonic
        const accountMetadata = await this.createNewAccount(code, 0);
        return { code, accounts: [accountMetadata] };
    }

    /**
     * Creates a new account in the provided wallet
     *
     * @param code mnemonic phrase of the wallet
     * @returns
     */
    async createNewAccount(code: string, index: number): Promise<AccountMetaData> {
        if (index >= MAX_ACCOUNTS) {
            throw new Error("Max no. of accounts reached");
        }
        const derivationPath = `m/44'/${COIN_TYPE}'/${index}'/0'/0'`;
        const keypair = WalletClient.fromDerivePath(code);
        const address = keypair.getPublicKey().toSuiAddress()
        return {
            derivationPath,
            address,
            publicKey: keypair.getPublicKey().toString()
        };
    }

    // async transferSui(amount: number, keypair: Ed25519Keypair, receiverAddress: SuiAddress) {
    //     const senderAddress = keypair.getPublicKey().toSuiAddress();
    //     const mergedCoinId = await this.mergeCoinsForBalance(amount + DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER, keypair);
    //     console.log(mergedCoinId);
    //     // return(mergedCoinId)
    //     var data:TransferSuiTransaction = {
    //         suiObjectId: mergedCoinId,
    //         // suiObjectId: "0x2d459e0193f50e064052201895e40c8281129569",
    //         gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER,
    //         recipient: receiverAddress,
    //         amount: amount
    //     };
    //     const unsignedTx = this.serializer.newTransferSui(senderAddress, data);
    //     const signedTx = keypair.signData(await unsignedTx);
    //     // console.log(signedTx);
    //     const response = await this.provider.executeTransactionWithRequestType((await unsignedTx).toString(),
    //         "ED25519",
    //         signedTx.toString(),
    //         keypair.getPublicKey().toString());
    //     return response;
    // }

    // async transferSuiMnemonic(amount: number, mnemonic: string, receiverAddress: SuiAddress) {
    //     const keypair = WalletClient.fromDerivePath(mnemonic);
    //     const senderAddress = keypair.getPublicKey().toSuiAddress();
    //     console.log(senderAddress);
    //     const mergedCoinId = await this.mergeCoinsForBalance(amount + DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER, keypair);
    //     console.log(mergedCoinId);
    //     // return(mergedCoinId)
    //     var data:TransferSuiTransaction = {
    //         suiObjectId: mergedCoinId,
    //         // suiObjectId: "0x2d459e0193f50e064052201895e40c8281129569",
    //         gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER,
    //         recipient: receiverAddress,
    //         amount: amount
    //     };
    //     const unsignedTx = this.serializer.newTransferSui(senderAddress, data);
    //     const signedTx = keypair.signData(await unsignedTx);
    //     const response = await this.provider.executeTransactionWithRequestType((await unsignedTx).toString(),
    //         "ED25519",
    //         signedTx.toString(),
    //         keypair.getPublicKey().toString());
    //     return response;
    // }

    async getBalance(address: string) {
        let objects = await this.provider.getCoinBalancesOwnedByAddress(address);
        let sum = BigInt(0);
        for(let obj of objects){
            sum += Coin.getBalance(obj)!;
        }
        return sum;
    }

    // async mergeCoinsForBalance(
    //     amount: number,
    //     keypair: Ed25519Keypair
    // ){
    //     const coins = await this.getSuiCoins(keypair.getPublicKey().toSuiAddress());
    //     coins.sort((a, b) => (Number(Coin.getBalance(a)!) - Number(Coin.getBalance(b)!)> 0 ? 1 : -1));
    //     for(let obj of coins){
    //         console.log(Number(Coin.getBalance(obj)!));
    //     }
    //     const coinWithSufficientBalance = coins.find(
    //         (coin) => Number(Coin.getBalance(coin)!) >= amount
    //     );
    //     if (coinWithSufficientBalance) {
    //         return getObjectId(coinWithSufficientBalance);
    //     }
    //     //merge if no coin exist
    //     console.log("Merging Coins:");
    //     const primaryCoin = coins[coins.length - 1];
    //     console.log(getObjectId(primaryCoin));
        
    //     let expectedBalance = Number(Coin.getBalance(primaryCoin)!);
    //     const coinsToMerge:string[] = [];
    //     for (let i = coins.length - 2; i > 0; i--) {
    //         console.log(getObjectId(coins[i]));
    //         expectedBalance += Number(Coin.getBalance(coins[i])!);
    //         coinsToMerge.push(getObjectId(coins[i]));
    //         if (expectedBalance >= amount) {
    //             break;
    //         }
    //     }
    //     if (expectedBalance < amount) {
    //         throw new Error('Insufficient balance');
    //     }
    //     console.log("here");
        
    //     const senderAddress = keypair.getPublicKey().toSuiAddress();
    //     let currObjectId = getObjectId(primaryCoin);
    //     let currBalance:number = Number(Coin.getBalance(primaryCoin)!);
    //     for (let coin of coinsToMerge) {
    //         const gasCoin = coins.find(
    //             (coin) => Number(Coin.getBalance(coin)!) >= DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER
    //         );
    //         if(coin == getObjectId(gasCoin!)){
    //             //split gas coin
    //             console.log("spliting");
    //             const unsignedTxSplit = await this.serializer.newSplitCoin(senderAddress, {
    //                 coinObjectId: coin,
    //                 splitAmounts: [Number(DEFAULT_GAS_BUDGET_FOR_MERGE)],
    //               //   gasPayment: coin,
    //                 gasBudget: DEFAULT_GAS_BUDGET_FOR_SPLIT,
    //             });
    //             const signedTxSplit = keypair.signData(unsignedTxSplit);
    //             const responseSplit = await this.provider.executeTransactionWithRequestType((unsignedTxSplit).toString(),
    //                 "ED25519",
    //                 signedTxSplit.toString(),
    //                 keypair.getPublicKey().toString());
    //             coin = getCoinAfterSplit(responseSplit)!.reference.objectId;
    //         }
    //         const unsignedTx = await this.serializer.newMergeCoin(senderAddress, {
    //           primaryCoin: currObjectId,
    //           coinToMerge: coin,
    //         //   gasPayment: coin,
    //           gasBudget: DEFAULT_GAS_BUDGET_FOR_MERGE,
    //         });
    //         const signedTx = keypair.signData(unsignedTx);
    //         const response = await this.provider.executeTransactionWithRequestType((unsignedTx).toString(),
    //         "ED25519",
    //         signedTx.toString(),
    //         keypair.getPublicKey().toString());
    //         const obj = getCoinAfterMerge(response);
    //         currObjectId = obj!.reference.objectId;
    //         currBalance = currBalance + Number(Coin.getBalance(getMoveObject(obj!) as SuiMoveObject)!);
    //     }
    //     // if(currBalance != expectedBalance){
    //     //     throw new Error('Merge coins failed caused by transactions conflicted');
    //     // }
    //     return currObjectId;
    // }

    // async getEventsSender(
    //     sender: SuiAddress,
    //     count: number = EVENT_QUERY_MAX_LIMIT,
    //     startTime: number = DEFAULT_START_TIME,
    //     endTime: number = DEFAULT_END_TIME
    // ){
    //     const resp = await this.providerEvent.getEventsBySender(sender, count, startTime, endTime);
    //     return resp;
    // }

    // async getEventsRecipient(
    //     recipient: ObjectOwner,
    //     count: number = EVENT_QUERY_MAX_LIMIT,
    //     startTime: number = DEFAULT_START_TIME,
    //     endTime: number = DEFAULT_END_TIME
    // ){
    //     const resp = await this.providerEvent.getEventsByRecipient(recipient, count, startTime, endTime);
    //     return resp;
    // }

    // async getNfts(address: SuiAddress){
    //     let objects = await this.provider.getObjectsOwnedByAddress(address);
    //     var nfts : GetObjectDataResponse[] = [];
    //     for ( let obj of objects ){
    //         let objData = await this.provider.getObject(obj.objectId);
    //         let moveObj = getMoveObject(objData);
    //         if(moveObj!.fields.name && moveObj!.fields.description && moveObj!.fields.url){
    //             nfts.push(objData);
    //         }else if (moveObj!.fields.metadata) {
    //             nfts.push(objData);
    //         }
    //     }
    //     console.log("NFTS");
    //     return nfts;
    // }

    // async mintNfts(mnemonic: string,
    //     name?: string,
    //     description?: string,
    //     imageUrl?: string
    // ){
    //     console.log("MINTING NFTS");
    //     const keypair = WalletClient.fromDerivePath(mnemonic);
    //     const accountSigner = new RawSigner(keypair, this.provider, this.serializer);
    //     const mintedNft = ExampleNFT.mintExampleNFT(accountSigner, name, description, imageUrl);
    //     return mintedNft;
    // }
}
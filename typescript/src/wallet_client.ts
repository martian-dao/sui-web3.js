import * as bip39 from "@scure/bip39";
import * as english from "@scure/bip39/wordlists/english";
import { Ed25519Keypair } from "./cryptography/ed25519-keypair";
import { getCreatedObjects, GetObjectDataResponse, ObjectOwner, SuiAddress} from "./types";
import { JsonRpcProvider } from "./providers/json-rpc-provider";
import { Coin } from "./types/framework";
import { RpcTxnDataSerializer } from "./signers/txn-data-serializers/rpc-txn-data-serializer";
import { getMoveObject, getObjectId} from "./types/objects";
import { RawSigner } from "./signers/raw-signer";
import { ExampleNFT } from "./nft_client";
// import { Network } from "./utils/api-endpoints";
import { MergeCoinTransaction, TransferSuiTransaction } from "./signers/txn-data-serializers/txn-data-serializer";

const COIN_TYPE = 784;
const MAX_ACCOUNTS = 5;
const DEV_NET_URL = 'https://fullnode.devnet.sui.io/';
const DEFAULT_GAS_BUDGET_FOR_MERGE = 1000;
const DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER = 1000;
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
    serializer: RpcTxnDataSerializer;
    
    constructor() {
        this.provider = new JsonRpcProvider(DEV_NET_URL, );
        this.serializer = new RpcTxnDataSerializer(DEV_NET_URL);
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

    async transferSuiMnemonic(amount: number, mnemonic: string, receiverAddress: SuiAddress) {
        const keypair = WalletClient.fromDerivePath(mnemonic);
        const senderAddress = keypair.getPublicKey().toSuiAddress();
        const mergedCoinId = await this.mergeCoinsForBalance(amount + DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER, keypair);
        console.log(mergedCoinId);
        var data:TransferSuiTransaction = {
            suiObjectId: mergedCoinId,
            gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER,
            recipient: receiverAddress,
            amount: amount
        };
        const unsignedTx = this.serializer.newTransferSui(senderAddress, data);
        const signedTx = keypair.signData(await unsignedTx);
        const response = await this.provider.executeTransactionWithRequestType((await unsignedTx).toString(),
            "ED25519",
            signedTx.toString(),
            keypair.getPublicKey().toString());
        return response;
    }

    async getBalance(address: string) {
        let objects = await this.provider.getCoinBalancesOwnedByAddress(address);
        let sum = BigInt(0);
        for(let obj of objects){
            sum += Coin.getBalance(obj)!;
        }
        return sum;
    }

    async airdrop(address: string) {
        return await this.provider.requestSuiFromFaucet(address);
    }

    async mergeCoinsForBalance(
        amount: number,
        keypair: Ed25519Keypair
    ){
        const address = keypair.getPublicKey().toSuiAddress();
        //coins sorted in ascending order
        const coinsToMerge = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(address, BigInt(amount));
        if(coinsToMerge.length == 1){
            console.log("Single Coin Found");
            return getObjectId(coinsToMerge[0]);
        }
        console.log("Merging Coins:");
        const signer = new RawSigner(keypair, this.provider, this.serializer);

        let primaryCoinRef = coinsToMerge[coinsToMerge.length - 1];
        let primaryId = getObjectId(primaryCoinRef);

        coinsToMerge.pop();
        for (let coin of coinsToMerge){
            const coinId = getObjectId(coin);
            const mergeTransact:MergeCoinTransaction = {
                primaryCoin: primaryId,
                coinToMerge: coinId,
                gasBudget: DEFAULT_GAS_BUDGET_FOR_MERGE,
            };
            const response = await signer.mergeCoinWithRequestType(mergeTransact);
            // const response = await this.serializer.newMergeCoin(address, mergeTransact);
            console.log((getCreatedObjects(response)![0]).reference);
            primaryId = await getObjectId((getCreatedObjects(response)![0]).reference);
        }
        return primaryId;
    }

    async getEventsSender(
        sender: SuiAddress,
        count?: number,
        startTime?: number,
        endTime?: number
    ){
        const resp = await this.provider.getEventsBySender(sender, count, startTime, endTime);
        return resp;
    }

    async getEventsRecipient(
        recipient: ObjectOwner,
        count?: number,
        startTime?: number,
        endTime?: number
    ){
        const resp = await this.provider.getEventsByRecipient(recipient, count, startTime, endTime);
        return resp;
    }

    async getNfts(address: SuiAddress){
        let objects = await this.provider.getObjectsOwnedByAddress(address);
        var nfts : GetObjectDataResponse[] = [];
        for ( let obj of objects ){
            let objData = await this.provider.getObject(obj.objectId);
            let moveObj = getMoveObject(objData);
            if(moveObj!.fields.name && moveObj!.fields.description && moveObj!.fields.url){
                nfts.push(objData);
            }else if (moveObj!.fields.metadata) {
                nfts.push(objData);
            }
        }
        console.log("NFTS");
        return nfts;
    }

    async mintNfts(mnemonic: string,
        name?: string,
        description?: string,
        imageUrl?: string
    ){
        console.log("MINTING NFTS");
        const keypair = WalletClient.fromDerivePath(mnemonic);
        const accountSigner = new RawSigner(keypair, this.provider, this.serializer);
        const mintedNft = ExampleNFT.mintExampleNFT(accountSigner, name, description, imageUrl);
        return mintedNft;
    }
}
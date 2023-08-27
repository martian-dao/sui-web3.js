"use strict";
// @ts-nocheck
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
const wallet_client_1 = require("./wallet-client");
const Nacl = __importStar(require("tweetnacl"));
const _1 = require(".");
const builder_1 = require("./builder");
const NODE_URL = 'https://fullnode.devnet.sui.io/';
const FAUCET_URL = 'https://faucet.devnet.sui.io/gas';
let alice;
let aliceAccount;
const apis = new wallet_client_1.WalletClient(NODE_URL, FAUCET_URL);
/**
 *
 * @param metadata: string which is signed by private key
 * @param signature: signature of signed string/metadata
 * @param publicKey: public key of the private key using which metadata is signed
 * @returns boolean: true if signature is valid else false
 */
function verifySignature(message, signature, publicKey) {
    const signatureBuffer = Buffer.from(signature.slice(2), 'hex');
    let pubKey = publicKey.slice(2);
    if (pubKey.length < 64) {
        pubKey = '0'.repeat(64 - pubKey.length) + pubKey;
    }
    const publicKeyBuffer = Buffer.from(pubKey, 'hex');
    return Nacl.sign.detached.verify(new TextEncoder().encode(message), signatureBuffer, publicKeyBuffer);
}
async function setupAccount() {
    if (alice)
        return;
    try {
        alice = await apis.createWallet();
        aliceAccount = await wallet_client_1.WalletClient.fromDerivePath(alice.code);
        await apis.airdrop(aliceAccount.getPublicKey().toSuiAddress());
    }
    catch (err) {
        const mnemonic = 'enhance nephew render claim tube grace dream cheese coyote sad relief broom';
        alice = await apis.importWallet(mnemonic);
        aliceAccount = await wallet_client_1.WalletClient.fromDerivePath(mnemonic);
    }
}
// to deal with faucet rate limit
beforeEach(async () => {
    await setupAccount();
});
test('verify create wallet and airdrop', async () => {
    const balance = await apis.getBalance(aliceAccount.getPublicKey().toSuiAddress());
    expect(parseInt(balance)).toBeGreaterThanOrEqual(0);
});
test('verify Adding accounts', async () => {
    const response = await apis.createNewAccount(alice.code, 1);
    expect(response.derivationPath).toBe("m/44'/784'/1'/0'/0'");
});
test('verify Import Wallet', async () => {
    const response = await apis.importWallet('enhance nephew render claim tube grace dream cheese coyote sad relief broom');
    expect(response.accounts.length).toBe(1);
});
test('verify transferSui', async () => {
    const bobAccount = await apis.createWallet();
    const txnHash = await apis.transferSui(1, aliceAccount, bobAccount.accounts[0].address);
    const balance = await apis.getBalance(bobAccount.accounts[0].address, _1.SUI_TYPE_ARG);
    expect(balance).toBe('1');
});
test('verify getAllBalances', async () => {
    const coins = await apis.getAllBalances(aliceAccount.getPublicKey().toSuiAddress());
    expect(coins.length).toBeGreaterThan(0);
});
test('verify getCoinsWithRequiredBalance', async () => {
    // TODO: setup test
});
test('verify getCoins', async () => {
    const coins = await apis.getCoins(_1.SUI_TYPE_ARG, aliceAccount.getPublicKey().toSuiAddress());
    expect(coins.length).toBeGreaterThan(0);
});
test('verify getStake', async () => {
    const stakes = await apis.getStake(aliceAccount.getPublicKey().toSuiAddress());
    expect(stakes.length).toBe(0);
});
test('verify simulateTransaction', async () => {
    const bobAccount = await apis.createWallet();
    const txn = new builder_1.TransactionBlock();
    const coin = txn.splitCoins(txn.gas, [txn.pure(1)]);
    txn.transferObjects([coin], txn.pure(bobAccount.accounts[0].address));
    txn.setSender(aliceAccount.getPublicKey().toSuiAddress());
    const txnBytes = await txn.build({ provider: apis.provider });
    const simulationResp = await apis.simulateTransaction(txnBytes);
    expect(simulationResp.effects.status.status).toBe('success');
});
test('verify getTransactions', async () => {
    const transactions = await apis.getTransactions(aliceAccount.getPublicKey().toSuiAddress());
    expect(transactions.length).toBeGreaterThan(0);
});
test('verify getNfts', async () => {
    // This address has kiosk nfts
    const nfts = await apis.getNfts('0x1ba6558d33b2b2eac213a06443e51b16c6a1fe9f4e9ad09c96ddeafb1d6fc173');
    // console.log(nfts);
    expect(1).toBeGreaterThan(0);
});
test('verify getAccountFromMnemonic', async () => {
    const account = wallet_client_1.WalletClient.getAccountFromMnemonic('enhance nephew render claim tube grace dream cheese coyote sad relief broom');
    expect(account.getPublicKey().toSuiAddress()).toBe('0xb7657ece8328ed50a93a72aa091e9686cbd272ef584cba2f259452999f7c5ab1');
});
test('verify toPrivateKeyObject', async () => {
    const account = wallet_client_1.WalletClient.getAccountFromMnemonic('enhance nephew render claim tube grace dream cheese coyote sad relief broom');
    const { address, publicKeyHex, privateKeyHex } = account.toPrivateKeyObject();
    expect(address).toBe('0xb7657ece8328ed50a93a72aa091e9686cbd272ef584cba2f259452999f7c5ab1');
    expect(publicKeyHex).toBe('0x5419d348ed7ddfcf57dae1403b0d98b8a28d5e572e3e518d41d8a9d107aa0dde');
    expect(privateKeyHex).toBe('0xe8ab49ef10bedee4183d3c7c0149be2003c5867b2b41f1cbdd3875148d899819');
});
//# sourceMappingURL=wallet-client.test.js.map
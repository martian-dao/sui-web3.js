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
const wallet_client_1 = require("./wallet_client");
const Nacl = __importStar(require("tweetnacl"));
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
    const signatureBuffer = Buffer.from(signature.slice(2), "hex");
    let pubKey = publicKey.slice(2);
    if (pubKey.length < 64) {
        pubKey = "0".repeat(64 - pubKey.length) + pubKey;
    }
    const publicKeyBuffer = Buffer.from(pubKey, "hex");
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
        const mnemonic = "arena nothing skate then sport huge fence era cheese client powder tackle";
        alice = await apis.importWallet(mnemonic);
        aliceAccount = await wallet_client_1.WalletClient.fromDerivePath(mnemonic);
    }
}
// to deal with faucet rate limit
beforeEach(async () => {
    await setupAccount();
});
test("verify create wallet and airdrop", async () => {
    const balance = await apis.getBalance(aliceAccount.getPublicKey().toSuiAddress());
    // expect(balance).toBe(
    //   50000000n || 10000000n
    // );
    expect(balance).toBeGreaterThan(0);
});
test("verify simulation wallet", async () => {
    const txn = { "kind": "moveCall", "data": { "packageObjectId": "0x2", "module": "devnet_nft", "function": "mint", "typeArguments": [], "arguments": ["Example NFT Dapps", "An NFT created by Sui Wallet", "https://aptos.dev/img/nyan.jpeg"], "gasBudget": 10000 } };
    const response = await apis.simulateTransaction(aliceAccount.getPublicKey().toSuiAddress(), txn);
    expect(response.status.status).toBe('success');
});
test("verify Adding accounts", async () => {
    const response = await apis.createNewAccount(alice.code, 1);
    expect(response.derivationPath).toBe("m/44'/784'/1'/0'/0'");
});
test("verify Import Wallet", async () => {
    const response = await apis.importWallet("arena nothing skate then sport huge fence era cheese client powder tackle");
    expect(response.accounts.length).toBe(3);
});
//# sourceMappingURL=wallet_client.test.js.map
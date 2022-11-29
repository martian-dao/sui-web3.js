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
test("verify create wallet", async () => {
    const alice = await apis.createWallet();
    const aliceAccount = await wallet_client_1.WalletClient.getAccountFromMetaData(alice.code);
    console.log(aliceAccount.toPrivateKeyObject());
});
//# sourceMappingURL=wallet_client.test.js.map
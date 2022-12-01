import { WalletClient } from "./wallet_client";
import * as Nacl from "tweetnacl";
import { SignableTransaction } from "./signers/txn-data-serializers/txn-data-serializer";

const NODE_URL = 'https://fullnode.devnet.sui.io/';
const FAUCET_URL = 'https://faucet.devnet.sui.io/gas';

let alice;
let aliceAccount;

const apis = new WalletClient(NODE_URL, FAUCET_URL);

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
  return Nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    signatureBuffer,
    publicKeyBuffer
  );
}

async function setupAccount() {
  if(alice) return;
  try{
    alice = await apis.createWallet();
    aliceAccount = await WalletClient.getAccountFromMetaData(
      alice.code,
    );
    await apis.airdrop(aliceAccount.getPublicKey().toSuiAddress());
  }catch(err){
    const mnemonic = "arena nothing skate then sport huge fence era cheese client powder tackle"
    aliceAccount = await WalletClient.getAccountFromMetaData(mnemonic)
  }
}

// to deal with faucet rate limit
beforeEach(async () => {
  await setupAccount();
});

test("verify create wallet and airdrop", async () => {
  const balance = await apis.getBalance(aliceAccount.getPublicKey().toSuiAddress())
  expect(balance).toBe(
    10000000n || 50000000n
  );
});

test("verify simulation wallet", async () => {
  const txn: SignableTransaction = { "kind": "moveCall", "data": { "packageObjectId": "0x2", "module": "devnet_nft", "function": "mint", "typeArguments": [], "arguments": ["Example NFT Dapps", "An NFT created by Sui Wallet", "https://aptos.dev/img/nyan.jpeg"], "gasBudget": 10000 } }
  const response = await apis.simulateTransaction(aliceAccount.getPublicKey().toSuiAddress(), txn);
  expect(response.status.status).toBe('success')
});

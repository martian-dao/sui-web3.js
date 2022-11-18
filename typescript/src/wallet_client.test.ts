import { WalletClient } from "./wallet_client";
// import * as Nacl from "tweetnacl";

const NODE_URL = 'https://fullnode.devnet.sui.io/';
const FAUCET_URL = 'https://faucet.devnet.sui.io/gas';

const apis = new WalletClient(NODE_URL, FAUCET_URL);

/**
 *
 * @param metadata: string which is signed by private key
 * @param signature: signature of signed string/metadata
 * @param publicKey: public key of the private key using which metadata is signed
 * @returns boolean: true if signature is valid else false
 */
// function verifySignature(message, signature, publicKey) {
//   const signatureBuffer = Buffer.from(signature.slice(2), "hex");
//   let pubKey = publicKey.slice(2);
//   if (pubKey.length < 64) {
//     pubKey = "0".repeat(64 - pubKey.length) + pubKey;
//   }
//   const publicKeyBuffer = Buffer.from(pubKey, "hex");
//   return Nacl.sign.detached.verify(
//     new TextEncoder().encode(message),
//     signatureBuffer,
//     publicKeyBuffer
//   );
// }

test("verify create wallet", async () => {
  const alice = await apis.createWallet();
  const aliceAccount = await WalletClient.getAccountFromMetadata(
    alice.code,
  );
  console.log(aliceAccount.toPrivateKeyObject())
});

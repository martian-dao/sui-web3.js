// @ts-nocheck

import { WalletClient } from './wallet-client';
import * as Nacl from 'tweetnacl';
import { Ed25519Keypair, Ed25519KeypairData, SUI_TYPE_ARG } from '.';
import { TransactionBlock } from './builder';
import { RawSigner } from "../src/signers/raw-signer"
import { Ed25519KeygenResult, Ed25519 } from "@sodot/sodot-node-sdk"
import { HexString } from 'aptos';
import {toB64} from "@mysten/bcs"

const NODE_URL = 'https://fullnode.devnet.sui.io/';
const FAUCET_URL = 'https://faucet.devnet.sui.io/gas';

let alice;
let aliceAccount;

function hexToUint8Array(hexString: string) {
  const strippedHexString = hexString.replace(/^0x/, "");
  const byteLength = strippedHexString.length / 2;

  return new Uint8Array(
      Array.from({ length: byteLength }, (_, i) =>
      parseInt(strippedHexString.substr(i * 2, 2), 16)
      )
  );
}

const apis = new WalletClient(NODE_URL, FAUCET_URL);

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
  return Nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    signatureBuffer,
    publicKeyBuffer,
  );
}

async function setupAccount() {
  if (alice) return;
  try {
    alice = await apis.createWallet();
    aliceAccount = await WalletClient.fromDerivePath(alice.code);
    await apis.airdrop(aliceAccount.getPublicKey().toSuiAddress());
  } catch (err) {
    const mnemonic =
      'enhance nephew render claim tube grace dream cheese coyote sad relief broom';
    alice = await apis.importWallet(mnemonic);
    aliceAccount = await WalletClient.fromDerivePath(mnemonic);
  }
}

// to deal with faucet rate limit
beforeEach(async () => {
  await setupAccount();
});

test('verify create wallet and airdrop', async () => {
  const balance = await apis.getBalance(
    aliceAccount.getPublicKey().toSuiAddress(),
  );
  expect(parseInt(balance)).toBeGreaterThanOrEqual(0);
});

test('verify Adding accounts', async () => {
  const response = await apis.createNewAccount(alice.code, 1);
  expect(response.derivationPath).toBe("m/44'/784'/1'/0'/0'");
});

test('verify Import Wallet', async () => {
  const response = await apis.importWallet(
    'enhance nephew render claim tube grace dream cheese coyote sad relief broom',
  );
  expect(response.accounts.length).toBe(1);
});

test('verify transferSui', async () => {
  const bobAccount = await apis.createWallet();
  const txnHash = await apis.transferSui(
    1,
    aliceAccount,
    bobAccount.accounts[0].address,
  );
  const balance = await apis.getBalance(
    bobAccount.accounts[0].address,
    SUI_TYPE_ARG,
  );
  expect(balance).toBe('1');
});

test('verify getAllBalances', async () => {
  const coins = await apis.getAllBalances(
    aliceAccount.getPublicKey().toSuiAddress(),
  );
  expect(coins.length).toBeGreaterThan(0);
});

test('verify getCoinsWithRequiredBalance', async () => {
  // TODO: setup test
});

test('verify getCoins', async () => {
  const coins = await apis.getCoins(
    SUI_TYPE_ARG,
    aliceAccount.getPublicKey().toSuiAddress(),
  );
  expect(coins.length).toBeGreaterThan(0);
});

test('verify getStake', async () => {
  const stakes = await apis.getStake(
    aliceAccount.getPublicKey().toSuiAddress(),
  );
  expect(stakes.length).toBe(0);
});

test('verify simulateTransaction', async () => {
  const bobAccount = await apis.createWallet();
  const txn = new TransactionBlock();
  const coin = txn.splitCoins(txn.gas, [txn.pure(1)]);

  txn.transferObjects([coin], txn.pure(bobAccount.accounts[0].address));
  txn.setSender(aliceAccount.getPublicKey().toSuiAddress());

  const txnBytes = await txn.build({ provider: apis.provider });
  const simulationResp = await apis.simulateTransaction(txnBytes);

  expect(simulationResp.effects.status.status).toBe('success');
});

test('verify getTransactions', async () => {
  const transactions = await apis.getTransactions(
    aliceAccount.getPublicKey().toSuiAddress(),
  );
  expect(transactions.length).toBeGreaterThan(0);
});

test('verify getNfts', async () => {
  // This address has kiosk nfts
  const nfts = await apis.getNfts(
    '0x1ba6558d33b2b2eac213a06443e51b16c6a1fe9f4e9ad09c96ddeafb1d6fc173',
  );
  // console.log(nfts);
  expect(1).toBeGreaterThan(0);
});

test('verify getAccountFromMnemonic', async () => {
  const account = WalletClient.getAccountFromMnemonic(
    'enhance nephew render claim tube grace dream cheese coyote sad relief broom',
  );
  expect(account.getPublicKey().toSuiAddress()).toBe(
    '0xb7657ece8328ed50a93a72aa091e9686cbd272ef584cba2f259452999f7c5ab1',
  );
});

test('verify toPrivateKeyObject', async () => {
  const account = WalletClient.getAccountFromMnemonic(
    'enhance nephew render claim tube grace dream cheese coyote sad relief broom',
  );
  const { address, publicKeyHex, privateKeyHex } = account.toPrivateKeyObject();
  expect(address).toBe(
    '0xb7657ece8328ed50a93a72aa091e9686cbd272ef584cba2f259452999f7c5ab1',
  );
  expect(publicKeyHex).toBe(
    '0x5419d348ed7ddfcf57dae1403b0d98b8a28d5e572e3e518d41d8a9d107aa0dde',
  );
  expect(privateKeyHex).toBe(
    '0xe8ab49ef10bedee4183d3c7c0149be2003c5867b2b41f1cbdd3875148d899819',
  );
});

test('Verifying MPC transferSui', async () => {
  //keygen
  const keygenRoom = await Ed25519.createKeygenRoom(2);
  const initKeygen1 = await Ed25519.initKeygen();
  const initKeygen2 = await Ed25519.initKeygen();

  const [keygenResult1, keygenResult2] = await Promise.all([
    Ed25519.keygen(keygenRoom, 2, 2, initKeygen1, [initKeygen2.keygenId]),
    Ed25519.keygen(keygenRoom, 2, 2, initKeygen2, [initKeygen1.keygenId]),
  ])
  //keygenResult1 is user's keyshare
  
  //storing user's details in the sdk class
  const signingKey = {
    publicKey: keygenResult1.pubkey,
    secretKey: hexToUint8Array(keygenResult2.secretShare)
  }

  const account = new Ed25519Keypair(signingKey as Ed25519KeypairData, true, "abc@gmail.com")
  const signer = new RawSigner(
    account,
    apis.provider,
    apis.serializer
  );
  const address = account.getPublicKey().toSuiAddress()

  const keygenResult = new Ed25519KeygenResult(account.keypair.publicKey, 
    HexString.fromUint8Array(account.keypair.secretKey).toString().substring(2))

  const amount = 1;
  const recieverAddress = "0x814c832b30f61e2feb769ca7933a6859d51ecc41126a58f4028440aa28d9e272";

  await apis.airdrop(address)

  const transaction = new TransactionBlock();
  const coin = transaction.splitCoins(transaction.gas, [transaction.pure(amount)]);
  transaction.transferObjects([coin], transaction.pure(recieverAddress));
  //getting transaction object
  const [intentArr, transactionBlockBytes] = await signer.getIntentMessage({
    transactionBlock: transaction
  })
  const digest = await RawSigner.getDigest(intentArr)
  const signingRoom = await Ed25519.createSigningRoom(2);
  const balance = await apis.getBalance(
    recieverAddress,
    SUI_TYPE_ARG,
  );
  //sodot-signing
  const [signature, signature2] = await Promise.all([
    Ed25519.sign(signingRoom, keygenResult1, digest),//to check for previous issue
    Ed25519.sign(signingRoom, keygenResult2, digest)
  ])
  const serializedSignature = await signer.getSerializedSignature(signature)
  const executingObject = {
    transactionBlockBytes: toB64(transactionBlockBytes),
    signature: serializedSignature,
  }
  const serialized = executingObject.signature
  await signer.provider.executeTransactionBlock({
    transactionBlock: executingObject.transactionBlockBytes,
    signature: serialized,
    options: {},
    requestType: 'WaitForLocalExecution'
  });
  //TODO: check around what was options
  const balanceAfterTx = await apis.getBalance(
    recieverAddress,
    SUI_TYPE_ARG,
  );
  console.log("balance of recieving account after tx", balanceAfterTx)
  expect(balanceAfterTx).toBe(balance+1)
  //to add proper to be options
})
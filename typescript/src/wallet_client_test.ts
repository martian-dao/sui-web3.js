import { WalletClient } from './wallet_client';

const samplePhrase =
  'beach empower element bicycle wise pink aspect spirit clay always flush fold';
// const samplePhrase = 'fade isolate ensure attack ramp scheme demise minute gospel kid already foam';
const apis = new WalletClient();

// const newWallet = apis.createWallet();
// newWallet.then(resp => console.log(resp));

const wallet = apis.importWallet(samplePhrase);
wallet.then((wallet: any) => console.log(wallet));

const keypair = WalletClient.fromDerivePath(samplePhrase);

console.log(keypair.getPublicKey().toSuiAddress());
console.log(keypair.getPublicKey().toString());
console.log(keypair.getSecretKey());
// console.log(keypair.secretKey);

const address = keypair.getPublicKey().toSuiAddress();
// apis.airdrop(address);
const response = apis.getBalance(address);
response.then((balance: any) => console.log(Number(balance)));

// const signedMessage = apis.signMessage(samplePhrase, "Ishan");
// signedMessage.then((resp) => console.log(resp));

// console.log(keypair.getPublicKey());
// const txResponse = apis.transferSuiMnemonic(20000000, keypair, "0x6cb344f0ef388af4e1cf2321fb2a3a9db80c9113");
// txResponse.then(tx => console.log(tx));

// const mintNft = apis.mintNfts(keypair, 'monkey-nft',
// 'testing purposes', 'https://uploads-ssl.webflow.com/5f9a1900790900e2b7f25ba1/62545162b2e07568b0110187_FEATURED_IMAGE-nfts-myths-misconceptions.png');
// mintNft.then(nft => {
//     console.log(nft);
// });

// const nftresp = apis.getNfts('6cb344f0ef388af4e1cf2321fb2a3a9db80c9113');
// nftresp.then(nft => {
//     console.log(nft);
// });

// console.log("EVENTS-SENDER");
// const eventsSender = apis.getEventsSender("6cb344f0ef388af4e1cf2321fb2a3a9db80c9113");
// eventsSender.then(events => {
//     for(let event of events){
//         console.log(event);
//         console.log(event.event);
//     }
// });

// console.log("EVENTS-RECIEVER");
// const eventsRecipient = apis.getEventsRecipient({ AddressOwner: "6cb344f0ef388af4e1cf2321fb2a3a9db80c9113" });
// eventsRecipient.then(events => {
//     for(let event of events){
//         console.log(event);
//         console.log(event.event);
//     }
// });

// console.log("TRANSACTIONS");
// const transactions = apis.getTransactions("cc2adf1e1de035c439f301860e582628a59744b7");
// transactions.then(events => {
//     for(let event of events){
//         console.log(event);
//         console.log(event.event);
//     }
// });

// test("verify create wallet", async () => {
//   const alice = await apis.createWallet();
//   const aliceAccount = await WalletClient.getAccountFromMetadata(
//     alice.code,
//   );
//   console.log(aliceAccount.toPrivateKeyObject())
// });
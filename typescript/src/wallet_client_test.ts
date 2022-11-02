import { WalletClient } from './wallet_client';

const samplePhrase = 'beach empower element bicycle wise pink aspect spirit clay always flush fold';
// const samplePhrase = 'fade isolate ensure attack ramp scheme demise minute gospel kid already foam';
const apis = new WalletClient();

const wallet = apis.importWallet(samplePhrase);
wallet.then((wallet: any) => console.log(wallet));

const keypair = WalletClient.fromDerivePath(samplePhrase);
console.log(keypair.getPublicKey().toSuiAddress());
console.log(keypair);


const address = keypair.getPublicKey().toSuiAddress();
// apis.airdrop(address);
const response = apis.getBalance(address);
response.then((balance: any) => console.log(Number(balance)));


// console.log(keypair.getPublicKey());
const txResponse = apis.transferSuiMnemonic(100000, samplePhrase, "6cb344f0ef388af4e1cf2321fb2a3a9db80c9113");
txResponse.then(tx => console.log(tx));

// const mintNft = apis.mintNfts(samplePhrase, 'first-nft',
// 'testing purposes', 'https://ipfs.io/ipfs/bafkreibngqhl3gaa7daob4i2vccziay2jjlp435cf66vhono7nrvww53ty');
// // 'testing purposes', 'https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE');
// mintNft.then(nft => {
//     console.log(nft);
// });

// const nftresp = apis.getNfts('6cb344f0ef388af4e1cf2321fb2a3a9db80c9113');
// nftresp.then(nft => {
//     console.log(nft);
// });

// console.log("EVENTS");
// const eventsSender = apis.getEventsSender("6cb344f0ef388af4e1cf2321fb2a3a9db80c9113");
// eventsSender.then(events => {
//     for(let event of events){
//         console.log(event);
//         console.log(event.event);
//     }
// });

// const eventsRecipient = apis.getEventsRecipient({ AddressOwner: "6cb344f0ef388af4e1cf2321fb2a3a9db80c9113" });
// eventsRecipient.then(events => {
//     for(let event of events){
//         console.log(event);
//         console.log(event.event);
//     }
// });

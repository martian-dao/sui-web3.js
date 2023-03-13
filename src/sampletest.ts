import { WalletClient } from "./wallet_client";

const NODE_URL = 'https://fullnode.devnet.sui.io/';
const FAUCET_URL = 'https://faucet.devnet.sui.io/gas';

const apis = new WalletClient(NODE_URL, FAUCET_URL);

const phrase = 'fade isolate ensure attack ramp scheme demise minute gospel kid already foam';

const balance = apis.getBalance('0x6cb344f0ef388af4e1cf2321fb2a3a9db80c9113');
balance.then((x) => console.log(x));

// const keypair = WalletClient.fromDerivePath(phrase);
// const resp = apis.transferSuiMnemonic(1000000, keypair, '0xc022b72f068b9d0f96530baf1e3f0c2add60ee91');
// resp.then((x) => console.log(x));

const resp_tokens = apis.getCustomCoins('0x7b49c7b1e7418f3ec1fc7289c90ca6ce7ca935da');
resp_tokens.then((x) => console.log(x));
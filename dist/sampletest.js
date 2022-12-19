"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_client_1 = require("./wallet_client");
const NODE_URL = 'https://fullnode.devnet.sui.io/';
const FAUCET_URL = 'https://faucet.devnet.sui.io/gas';
const apis = new wallet_client_1.WalletClient(NODE_URL, FAUCET_URL);
const phrase = 'fade isolate ensure attack ramp scheme demise minute gospel kid already foam';
const balance = apis.getBalance('0x6cb344f0ef388af4e1cf2321fb2a3a9db80c9113');
balance.then((x) => console.log(x));
const keypair = wallet_client_1.WalletClient.fromDerivePath(phrase);
const resp = apis.transferSuiMnemonic(1000000, keypair, '0xc022b72f068b9d0f96530baf1e3f0c2add60ee91');
resp.then((x) => console.log(x));
//# sourceMappingURL=sampletest.js.map
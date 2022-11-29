# Martian sui-web3.js Docs

# Introduction

web3.js library for Sui

@martianwallet/sui-web3.js is an npm module which allows developers to communicate with the Sui. This module is built on top of [Typescript SDK of Sui](https://github.com/MystenLabs/sui/tree/main/sdk/typescript).

# Import

```
npm i @martianwallet/sui-web3.js
```

# Usage Example Wallet

```
const suiWeb3 = require('@martianwallet/sui-web3.js');
const NODE_URL = "https://fullnode.devnet.sui.io/";
const FAUCET_URL = "https://faucet.devnet.sui.io/gas";
const walletClient = new suiWeb3.WalletClient(NODE_URL, FAUCET_URL);
async function main() {

    // create new wallet
    console.log("\n=== Wallet Creation ===");
    const wallet = await walletClient.createWallet();
    const walletAccount = await WalletClient.getAccountFromMetaData(
        alice.code,
        alice.accounts[0]
    );
    const address = walletAccount.getPublicKey().toSuiAddress();

    console.log('Address:', address);

    // airdrop test tokens
    console.log("\n=== Airdrop ===");
    await walletClient.airdrop(address);
    console.log('Balance:', await walletClient.getBalance(address));

    // transfer tokens
    console.log("\n=== Transfer ===");
    const receiver_address = "0x123"; //replace this with a receiver's address
    await walletClient.transferSuiMnemonic(1000, walletAccount, receiver_address);
    console.log('Balance:', await walletClient.getBalance(address));
    console.log('Balance:', await walletClient.getBalance(receiver_address));
}

main()

```

# To Build
```
npm install
npm run build
```

# Tests

Jest tests allow to test whether each function is working as it supposed to.

```
npm run test
```

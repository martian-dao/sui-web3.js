"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleNFT = void 0;
const DEFAULT_NFT_IMAGE = 'ipfs://QmZPWWy5Si54R3d26toaqRiqvCH7HkGdXkxwUgCm2oKKM2?filename=img-sq-01.png';
// TODO: Remove this after internal dogfooding
class ExampleNFT {
    /**
     * Mint a Example NFT. The wallet address must own enough gas tokens to pay for the transaction.
     *
     * @param signer A signer with connection to the fullnode
     */
    static async mintExampleNFT(signer, name, description, imageUrl) {
        return await signer.executeMoveCall({
            packageObjectId: '0x2',
            module: 'devnet_nft',
            function: 'mint',
            typeArguments: [],
            arguments: [
                name || 'Example NFT',
                description || 'An NFT created by Sui Wallet',
                imageUrl || DEFAULT_NFT_IMAGE,
            ],
            gasBudget: 10000,
        });
    }
    static async TransferNFT(signer, nftId, recipientID, transferCost) {
        return await signer.transferObject({
            objectId: nftId,
            gasBudget: transferCost || 10000,
            recipient: recipientID,
        });
    }
}
exports.ExampleNFT = ExampleNFT;
//# sourceMappingURL=nft_client.js.map
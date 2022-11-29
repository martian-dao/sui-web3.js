import { RawSigner } from './signers/raw-signer';
import { SuiExecuteTransactionResponse } from './types';
export declare class ExampleNFT {
    /**
     * Mint a Example NFT. The wallet address must own enough gas tokens to pay for the transaction.
     *
     * @param signer A signer with connection to the fullnode
     */
    static mintExampleNFT(signer: RawSigner, name?: string, description?: string, imageUrl?: string): Promise<SuiExecuteTransactionResponse>;
    static TransferNFT(signer: RawSigner, nftId: string, recipientID: string, transferCost?: number): Promise<SuiExecuteTransactionResponse>;
}
//# sourceMappingURL=nft_client.d.ts.map
import { TransactionDigest } from './common';
import { ObjectId } from './objects';
export declare type FaucetCoinInfo = {
    amount: number;
    id: ObjectId;
    transfer_tx_digest: TransactionDigest;
};
export declare type FaucetResponse = {
    transferred_gas_objects: FaucetCoinInfo;
    error: string | null;
};
//# sourceMappingURL=faucet.d.ts.map
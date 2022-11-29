import { Keypair } from '../cryptography/keypair';
import { Provider } from '../providers/provider';
import { Base64DataBuffer } from '../serialization/base64';
import { SuiAddress } from '../types';
import { SignaturePubkeyPair } from './signer';
import { SignerWithProvider } from './signer-with-provider';
import { TxnDataSerializer } from './txn-data-serializers/txn-data-serializer';
export declare class RawSigner extends SignerWithProvider {
    private readonly keypair;
    constructor(keypair: Keypair, provider?: Provider, serializer?: TxnDataSerializer);
    getAddress(): Promise<SuiAddress>;
    signData(data: Base64DataBuffer): Promise<SignaturePubkeyPair>;
    connect(provider: Provider): SignerWithProvider;
}
//# sourceMappingURL=raw-signer.d.ts.map
import type { Keypair } from '../cryptography/keypair';
import type { SerializedSignature } from '../cryptography/signature';
import type { JsonRpcProvider } from '../providers/json-rpc-provider';
import { SignerWithProvider } from './signer-with-provider';
import type { SuiClient } from '../client/index';
export declare class RawSigner extends SignerWithProvider {
    private readonly keypair;
    constructor(keypair: Keypair, client: JsonRpcProvider | SuiClient);
    getAddress(): Promise<string>;
    static getDigest(data: Uint8Array): Promise<Uint8Array>;
    getSerializedSignature(signature: Uint8Array): Promise<SerializedSignature>;
    signData(data: Uint8Array): Promise<SerializedSignature>;
    connect(client: SuiClient | JsonRpcProvider): SignerWithProvider;
}
//# sourceMappingURL=raw-signer.d.ts.map
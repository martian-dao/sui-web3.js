import type { SerializedSignature } from './signature';
import type { SignaturePubkeyPair } from './utils';
import type { PublicKey } from './publickey';
export type PubkeyWeightPair = {
    pubKey: PublicKey;
    weight: number;
};
export type CompressedSignature = {
    ED25519: number[];
} | {
    Secp256k1: number[];
} | {
    Secp256r1: number[];
};
export type PublicKeyEnum = {
    ED25519: number[];
} | {
    Secp256k1: number[];
} | {
    Secp256r1: number[];
};
export type PubkeyEnumWeightPair = {
    pubKey: PublicKeyEnum;
    weight: number;
};
export type MultiSigPublicKey = {
    pk_map: PubkeyEnumWeightPair[];
    threshold: number;
};
export type MultiSig = {
    sigs: CompressedSignature[];
    bitmap: number;
    multisig_pk: MultiSigPublicKey;
};
export declare const MAX_SIGNER_IN_MULTISIG = 10;
export declare function toMultiSigAddress(pks: PubkeyWeightPair[], threshold: number): string;
export declare function combinePartialSigs(sigs: SerializedSignature[], pks: PubkeyWeightPair[], threshold: number): SerializedSignature;
export declare function decodeMultiSig(signature: string): SignaturePubkeyPair[];
//# sourceMappingURL=multisig.d.ts.map
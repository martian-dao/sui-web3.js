import { ObjectOwner, SuiAddress, TransactionDigest } from './common';
import { SuiEvent } from './events';
import { ObjectId, SuiMovePackage, SuiObject, SuiObjectRef } from './objects';
export declare type TransferObject = {
    recipient: SuiAddress;
    objectRef: SuiObjectRef;
};
export declare type SuiTransferSui = {
    recipient: SuiAddress;
    amount: number | null;
};
export declare type SuiChangeEpoch = {
    epoch: EpochId;
    storage_charge: number;
    computation_charge: number;
};
export declare type Pay = {
    coins: SuiObjectRef[];
    recipients: SuiAddress[];
    amounts: number[];
};
export declare type PaySui = {
    coins: SuiObjectRef[];
    recipients: SuiAddress[];
    amounts: number[];
};
export declare type PayAllSui = {
    coins: SuiObjectRef[];
    recipient: SuiAddress;
};
export declare type ExecuteTransactionRequestType = 'ImmediateReturn' | 'WaitForTxCert' | 'WaitForEffectsCert' | 'WaitForLocalExecution';
export declare type TransactionKindName = 'TransferObject' | 'Publish' | 'Call' | 'TransferSui' | 'ChangeEpoch' | 'Pay' | 'PaySui' | 'PayAllSui';
export declare type SuiTransactionKind = {
    TransferObject: TransferObject;
} | {
    Publish: SuiMovePackage;
} | {
    Call: MoveCall;
} | {
    TransferSui: SuiTransferSui;
} | {
    ChangeEpoch: SuiChangeEpoch;
} | {
    Pay: Pay;
} | {
    PaySui: PaySui;
} | {
    PayAllSui: PayAllSui;
};
export declare type SuiTransactionData = {
    transactions: SuiTransactionKind[];
    sender: SuiAddress;
    gasPayment: SuiObjectRef;
    gasBudget: number;
};
export declare type EpochId = number;
export declare type GenericAuthoritySignature = AuthoritySignature[] | AuthoritySignature;
export declare type AuthorityQuorumSignInfo = {
    epoch: EpochId;
    signature: GenericAuthoritySignature;
};
export declare type CertifiedTransaction = {
    transactionDigest: TransactionDigest;
    data: SuiTransactionData;
    txSignature: string;
    authSignInfo: AuthorityQuorumSignInfo;
};
export declare type GasCostSummary = {
    computationCost: number;
    storageCost: number;
    storageRebate: number;
};
export declare type ExecutionStatusType = 'success' | 'failure';
export declare type ExecutionStatus = {
    status: ExecutionStatusType;
    error?: string;
};
export declare type OwnedObjectRef = {
    owner: ObjectOwner;
    reference: SuiObjectRef;
};
export declare type TransactionEffects = {
    /** The status of the execution */
    status: ExecutionStatus;
    gasUsed: GasCostSummary;
    /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
    sharedObjects?: SuiObjectRef[];
    /** The transaction digest */
    transactionDigest: TransactionDigest;
    /** ObjectRef and owner of new objects created */
    created?: OwnedObjectRef[];
    /** ObjectRef and owner of mutated objects, including gas object */
    mutated?: OwnedObjectRef[];
    /**
     * ObjectRef and owner of objects that are unwrapped in this transaction.
     * Unwrapped objects are objects that were wrapped into other objects in the past,
     * and just got extracted out.
     */
    unwrapped?: OwnedObjectRef[];
    /** Object Refs of objects now deleted (the old refs) */
    deleted?: SuiObjectRef[];
    /** Object refs of objects now wrapped in other objects */
    wrapped?: SuiObjectRef[];
    /**
     * The updated gas object reference. Have a dedicated field for convenient access.
     * It's also included in mutated.
     */
    gasObject: OwnedObjectRef;
    /** The events emitted during execution. Note that only successful transactions emit events */
    events?: SuiEvent[];
    /** The set of transaction digests this transaction depends on */
    dependencies?: TransactionDigest[];
};
export declare type SuiTransactionResponse = {
    certificate: CertifiedTransaction;
    effects: TransactionEffects;
    timestamp_ms: number | null;
    parsed_data: SuiParsedTransactionResponse | null;
};
export declare type SuiTransactionAuthSignersResponse = {
    signers: AuthorityName[];
};
export declare type SuiCertifiedTransactionEffects = {
    effects: TransactionEffects;
};
export declare type SuiExecuteTransactionResponse = {
    ImmediateReturn: {
        tx_digest: string;
    };
} | {
    TxCert: {
        certificate: CertifiedTransaction;
    };
} | {
    EffectsCert: {
        certificate: CertifiedTransaction;
        effects: SuiCertifiedTransactionEffects;
    };
};
export declare type GatewayTxSeqNumber = number;
export declare type GetTxnDigestsResponse = TransactionDigest[];
export declare type PaginatedTransactionDigests = {
    data: TransactionDigest[];
    nextCursor: TransactionDigest | null;
};
export declare type TransactionQuery = 'All' | {
    MoveFunction: {
        package: ObjectId;
        module: string | null;
        function: string | null;
    };
} | {
    InputObject: ObjectId;
} | {
    MutatedObject: ObjectId;
} | {
    FromAddress: SuiAddress;
} | {
    ToAddress: SuiAddress;
};
export declare type MoveCall = {
    package: SuiObjectRef;
    module: string;
    function: string;
    typeArguments?: string[];
    arguments?: SuiJsonValue[];
};
export declare type SuiJsonValue = boolean | number | string | Array<SuiJsonValue>;
export declare type EmptySignInfo = object;
export declare type AuthorityName = string;
export declare type AuthoritySignature = string;
export declare type TransactionBytes = {
    txBytes: string;
    gas: SuiObjectRef;
};
export declare type SuiParsedMergeCoinResponse = {
    updatedCoin: SuiObject;
    updatedGas: SuiObject;
};
export declare type SuiParsedSplitCoinResponse = {
    updatedCoin: SuiObject;
    newCoins: SuiObject[];
    updatedGas: SuiObject;
};
export declare type SuiParsedPublishResponse = {
    createdObjects: SuiObject[];
    package: SuiPackage;
    updatedGas: SuiObject;
};
export declare type SuiPackage = {
    digest: string;
    objectId: string;
    version: number;
};
export declare type SuiParsedTransactionResponse = {
    SplitCoin: SuiParsedSplitCoinResponse;
} | {
    MergeCoin: SuiParsedMergeCoinResponse;
} | {
    Publish: SuiParsedPublishResponse;
};
export declare function getCertifiedTransaction(tx: SuiTransactionResponse | SuiExecuteTransactionResponse): CertifiedTransaction | undefined;
export declare function getTransactionDigest(tx: CertifiedTransaction | SuiTransactionResponse | SuiExecuteTransactionResponse): TransactionDigest;
export declare function getTransactionSignature(tx: CertifiedTransaction): string;
export declare function getTransactionAuthorityQuorumSignInfo(tx: CertifiedTransaction): AuthorityQuorumSignInfo;
export declare function getTransactionData(tx: CertifiedTransaction): SuiTransactionData;
export declare function getTransactionSender(tx: CertifiedTransaction): SuiAddress;
export declare function getTransactionGasObject(tx: CertifiedTransaction): SuiObjectRef;
export declare function getTransactionGasBudget(tx: CertifiedTransaction): number;
export declare function getTransferObjectTransaction(data: SuiTransactionKind): TransferObject | undefined;
export declare function getPublishTransaction(data: SuiTransactionKind): SuiMovePackage | undefined;
export declare function getMoveCallTransaction(data: SuiTransactionKind): MoveCall | undefined;
export declare function getTransferSuiTransaction(data: SuiTransactionKind): SuiTransferSui | undefined;
export declare function getPayTransaction(data: SuiTransactionKind): Pay | undefined;
export declare function getPaySuiTransaction(data: SuiTransactionKind): PaySui | undefined;
export declare function getPayAllSuiTransaction(data: SuiTransactionKind): PayAllSui | undefined;
export declare function getChangeEpochTransaction(data: SuiTransactionKind): SuiChangeEpoch | undefined;
export declare function getTransactions(data: CertifiedTransaction): SuiTransactionKind[];
export declare function getTransferSuiAmount(data: SuiTransactionKind): bigint | null;
export declare function getTransactionKindName(data: SuiTransactionKind): TransactionKindName;
export declare function getExecutionStatusType(data: SuiTransactionResponse | SuiExecuteTransactionResponse): ExecutionStatusType | undefined;
export declare function getExecutionStatus(data: SuiTransactionResponse | SuiExecuteTransactionResponse): ExecutionStatus | undefined;
export declare function getExecutionStatusError(data: SuiTransactionResponse | SuiExecuteTransactionResponse): string | undefined;
export declare function getExecutionStatusGasSummary(data: SuiTransactionResponse | SuiExecuteTransactionResponse | TransactionEffects): GasCostSummary | undefined;
export declare function getTotalGasUsed(data: SuiTransactionResponse | SuiExecuteTransactionResponse | TransactionEffects): number | undefined;
export declare function getTransactionEffects(data: SuiExecuteTransactionResponse | SuiTransactionResponse): TransactionEffects | undefined;
export declare function getEvents(data: SuiExecuteTransactionResponse | SuiTransactionResponse): SuiEvent[] | undefined;
export declare function getCreatedObjects(data: SuiExecuteTransactionResponse | SuiTransactionResponse): OwnedObjectRef[] | undefined;
export declare function getTimestampFromTransactionResponse(data: SuiExecuteTransactionResponse | SuiTransactionResponse): number | undefined;
export declare function getParsedSplitCoinResponse(data: SuiTransactionResponse): SuiParsedSplitCoinResponse | undefined;
export declare function getParsedMergeCoinResponse(data: SuiTransactionResponse): SuiParsedMergeCoinResponse | undefined;
export declare function getParsedPublishResponse(data: SuiTransactionResponse): SuiParsedPublishResponse | undefined;
/**
 * Get the updated coin after a merge.
 * @param data the response for executing a merge coin transaction
 * @returns the updated state of the primary coin after the merge
 */
export declare function getCoinAfterMerge(data: SuiTransactionResponse): SuiObject | undefined;
/**
 * Get the updated coin after a split.
 * @param data the response for executing a Split coin transaction
 * @returns the updated state of the original coin object used for the split
 */
export declare function getCoinAfterSplit(data: SuiTransactionResponse): SuiObject | undefined;
/**
 * Get the newly created coin after a split.
 * @param data the response for executing a Split coin transaction
 * @returns the updated state of the original coin object used for the split
 */
export declare function getNewlyCreatedCoinsAfterSplit(data: SuiTransactionResponse): SuiObject[] | undefined;
/**
 * Get the newly created coin refs after a split.
 */
export declare function getNewlyCreatedCoinRefsAfterSplit(data: SuiTransactionResponse | SuiExecuteTransactionResponse): SuiObjectRef[] | undefined;
//# sourceMappingURL=transactions.d.ts.map
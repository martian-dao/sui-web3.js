import type { Infer } from 'superstruct';
import { SuiJsonValue } from './common';
import { SuiEvent } from './events';
import { SuiGasData, SuiObjectRef } from './objects';
/** @deprecated Use `string` instead. */
export declare const EpochId: import("superstruct").Struct<string, null>;
export declare const SuiChangeEpoch: import("superstruct").Struct<{
    epoch: string;
    storage_charge: string;
    computation_charge: string;
    storage_rebate: string;
    epoch_start_timestamp_ms: string;
}, {
    epoch: import("superstruct").Struct<string, null>;
    storage_charge: import("superstruct").Struct<string, null>;
    computation_charge: import("superstruct").Struct<string, null>;
    storage_rebate: import("superstruct").Struct<string, null>;
    epoch_start_timestamp_ms: import("superstruct").Struct<string, null>;
}>;
export type SuiChangeEpoch = Infer<typeof SuiChangeEpoch>;
export declare const SuiConsensusCommitPrologue: import("superstruct").Struct<{
    epoch: string;
    round: string;
    commit_timestamp_ms: string;
}, {
    epoch: import("superstruct").Struct<string, null>;
    round: import("superstruct").Struct<string, null>;
    commit_timestamp_ms: import("superstruct").Struct<string, null>;
}>;
export type SuiConsensusCommitPrologue = Infer<typeof SuiConsensusCommitPrologue>;
export declare const Genesis: import("superstruct").Struct<{
    objects: string[];
}, {
    objects: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type Genesis = Infer<typeof Genesis>;
export declare const SuiArgument: import("superstruct").Struct<"GasCoin" | {
    Input: number;
} | {
    Result: number;
} | {
    NestedResult: [number, number];
}, null>;
export type SuiArgument = Infer<typeof SuiArgument>;
export declare const MoveCallSuiTransaction: import("superstruct").Struct<{
    function: string;
    arguments: ("GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    })[];
    type_arguments: string[];
    package: string;
    module: string;
}, {
    arguments: import("superstruct").Struct<("GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    })[], import("superstruct").Struct<"GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }, null>>;
    type_arguments: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    package: import("superstruct").Struct<string, null>;
    module: import("superstruct").Struct<string, null>;
    function: import("superstruct").Struct<string, null>;
}>;
export type MoveCallSuiTransaction = Infer<typeof MoveCallSuiTransaction>;
export declare const SuiTransaction: import("superstruct").Struct<{
    MoveCall: {
        function: string;
        arguments: ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[];
        type_arguments: string[];
        package: string;
        module: string;
    };
} | {
    TransferObjects: [("GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    })[], "GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }];
} | {
    SplitCoins: ["GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }, ("GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    })[]];
} | {
    MergeCoins: ["GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }, ("GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    })[]];
} | {
    Publish: string[] | [{
        disassembled: Record<string, unknown>;
    }, string[]];
} | {
    Upgrade: [string[], string, "GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }] | [{
        disassembled: Record<string, unknown>;
    }, string[], string, "GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }];
} | {
    MakeMoveVec: [string, ("GasCoin" | {
        Input: number;
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    })[]];
}, null>;
export declare const SuiCallArg: import("superstruct").Struct<{
    value: SuiJsonValue;
    type: "pure";
    valueType: string;
} | {
    type: "object";
    objectType: "immOrOwnedObject";
    objectId: string;
    version: string;
    digest: string;
} | {
    type: "object";
    objectType: "sharedObject";
    objectId: string;
    initialSharedVersion: string;
    mutable: boolean;
}, null>;
export type SuiCallArg = Infer<typeof SuiCallArg>;
export declare const ProgrammableTransaction: import("superstruct").Struct<{
    transactions: ({
        MoveCall: {
            function: string;
            arguments: ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[];
            type_arguments: string[];
            package: string;
            module: string;
        };
    } | {
        TransferObjects: [("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[], "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        SplitCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        MergeCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        Publish: string[] | [{
            disassembled: Record<string, unknown>;
        }, string[]];
    } | {
        Upgrade: [string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }] | [{
            disassembled: Record<string, unknown>;
        }, string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        MakeMoveVec: [string, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    })[];
    inputs: ({
        value: SuiJsonValue;
        type: "pure";
        valueType: string;
    } | {
        type: "object";
        objectType: "immOrOwnedObject";
        objectId: string;
        version: string;
        digest: string;
    } | {
        type: "object";
        objectType: "sharedObject";
        objectId: string;
        initialSharedVersion: string;
        mutable: boolean;
    })[];
}, {
    transactions: import("superstruct").Struct<({
        MoveCall: {
            function: string;
            arguments: ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[];
            type_arguments: string[];
            package: string;
            module: string;
        };
    } | {
        TransferObjects: [("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[], "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        SplitCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        MergeCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        Publish: string[] | [{
            disassembled: Record<string, unknown>;
        }, string[]];
    } | {
        Upgrade: [string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }] | [{
            disassembled: Record<string, unknown>;
        }, string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        MakeMoveVec: [string, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    })[], import("superstruct").Struct<{
        MoveCall: {
            function: string;
            arguments: ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[];
            type_arguments: string[];
            package: string;
            module: string;
        };
    } | {
        TransferObjects: [("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[], "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        SplitCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        MergeCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        Publish: string[] | [{
            disassembled: Record<string, unknown>;
        }, string[]];
    } | {
        Upgrade: [string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }] | [{
            disassembled: Record<string, unknown>;
        }, string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        MakeMoveVec: [string, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    }, null>>;
    inputs: import("superstruct").Struct<({
        value: SuiJsonValue;
        type: "pure";
        valueType: string;
    } | {
        type: "object";
        objectType: "immOrOwnedObject";
        objectId: string;
        version: string;
        digest: string;
    } | {
        type: "object";
        objectType: "sharedObject";
        objectId: string;
        initialSharedVersion: string;
        mutable: boolean;
    })[], import("superstruct").Struct<{
        value: SuiJsonValue;
        type: "pure";
        valueType: string;
    } | {
        type: "object";
        objectType: "immOrOwnedObject";
        objectId: string;
        version: string;
        digest: string;
    } | {
        type: "object";
        objectType: "sharedObject";
        objectId: string;
        initialSharedVersion: string;
        mutable: boolean;
    }, null>>;
}>;
export type ProgrammableTransaction = Infer<typeof ProgrammableTransaction>;
export type SuiTransaction = Infer<typeof SuiTransaction>;
/**
 * 1. WaitForEffectsCert: waits for TransactionEffectsCert and then returns to the client.
 *    This mode is a proxy for transaction finality.
 * 2. WaitForLocalExecution: waits for TransactionEffectsCert and makes sure the node
 *    executed the transaction locally before returning to the client. The local execution
 *    makes sure this node is aware of this transaction when the client fires subsequent queries.
 *    However, if the node fails to execute the transaction locally in a timely manner,
 *    a bool type in the response is set to false to indicate the case.
 */
export type ExecuteTransactionRequestType = 'WaitForEffectsCert' | 'WaitForLocalExecution';
export type TransactionKindName = 'ChangeEpoch' | 'ConsensusCommitPrologue' | 'Genesis' | 'ProgrammableTransaction';
export declare const SuiTransactionBlockKind: import("superstruct").Struct<{
    epoch: string;
    storage_charge: string;
    computation_charge: string;
    storage_rebate: string;
    epoch_start_timestamp_ms: string;
    kind: "ChangeEpoch";
} | {
    epoch: string;
    round: string;
    commit_timestamp_ms: string;
    kind: "ConsensusCommitPrologue";
} | {
    objects: string[];
    kind: "Genesis";
} | {
    transactions: ({
        MoveCall: {
            function: string;
            arguments: ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[];
            type_arguments: string[];
            package: string;
            module: string;
        };
    } | {
        TransferObjects: [("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[], "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        SplitCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        MergeCoins: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    } | {
        Publish: string[] | [{
            disassembled: Record<string, unknown>;
        }, string[]];
    } | {
        Upgrade: [string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }] | [{
            disassembled: Record<string, unknown>;
        }, string[], string, "GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }];
    } | {
        MakeMoveVec: [string, ("GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        })[]];
    })[];
    inputs: ({
        value: SuiJsonValue;
        type: "pure";
        valueType: string;
    } | {
        type: "object";
        objectType: "immOrOwnedObject";
        objectId: string;
        version: string;
        digest: string;
    } | {
        type: "object";
        objectType: "sharedObject";
        objectId: string;
        initialSharedVersion: string;
        mutable: boolean;
    })[];
    kind: "ProgrammableTransaction";
}, null>;
export type SuiTransactionBlockKind = Infer<typeof SuiTransactionBlockKind>;
export declare const SuiTransactionBlockData: import("superstruct").Struct<{
    sender: string;
    messageVersion: "v1";
    transaction: {
        epoch: string;
        storage_charge: string;
        computation_charge: string;
        storage_rebate: string;
        epoch_start_timestamp_ms: string;
        kind: "ChangeEpoch";
    } | {
        epoch: string;
        round: string;
        commit_timestamp_ms: string;
        kind: "ConsensusCommitPrologue";
    } | {
        objects: string[];
        kind: "Genesis";
    } | {
        transactions: ({
            MoveCall: {
                function: string;
                arguments: ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[];
                type_arguments: string[];
                package: string;
                module: string;
            };
        } | {
            TransferObjects: [("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[], "GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }];
        } | {
            SplitCoins: ["GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[]];
        } | {
            MergeCoins: ["GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[]];
        } | {
            Publish: string[] | [{
                disassembled: Record<string, unknown>;
            }, string[]];
        } | {
            Upgrade: [string[], string, "GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }] | [{
                disassembled: Record<string, unknown>;
            }, string[], string, "GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }];
        } | {
            MakeMoveVec: [string, ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[]];
        })[];
        inputs: ({
            value: SuiJsonValue;
            type: "pure";
            valueType: string;
        } | {
            type: "object";
            objectType: "immOrOwnedObject";
            objectId: string;
            version: string;
            digest: string;
        } | {
            type: "object";
            objectType: "sharedObject";
            objectId: string;
            initialSharedVersion: string;
            mutable: boolean;
        })[];
        kind: "ProgrammableTransaction";
    };
    gasData: {
        payment: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        owner: string;
        price: string;
        budget: string;
    };
}, {
    messageVersion: import("superstruct").Struct<"v1", "v1">;
    transaction: import("superstruct").Struct<{
        epoch: string;
        storage_charge: string;
        computation_charge: string;
        storage_rebate: string;
        epoch_start_timestamp_ms: string;
        kind: "ChangeEpoch";
    } | {
        epoch: string;
        round: string;
        commit_timestamp_ms: string;
        kind: "ConsensusCommitPrologue";
    } | {
        objects: string[];
        kind: "Genesis";
    } | {
        transactions: ({
            MoveCall: {
                function: string;
                arguments: ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[];
                type_arguments: string[];
                package: string;
                module: string;
            };
        } | {
            TransferObjects: [("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[], "GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }];
        } | {
            SplitCoins: ["GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[]];
        } | {
            MergeCoins: ["GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[]];
        } | {
            Publish: string[] | [{
                disassembled: Record<string, unknown>;
            }, string[]];
        } | {
            Upgrade: [string[], string, "GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }] | [{
                disassembled: Record<string, unknown>;
            }, string[], string, "GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }];
        } | {
            MakeMoveVec: [string, ("GasCoin" | {
                Input: number;
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            })[]];
        })[];
        inputs: ({
            value: SuiJsonValue;
            type: "pure";
            valueType: string;
        } | {
            type: "object";
            objectType: "immOrOwnedObject";
            objectId: string;
            version: string;
            digest: string;
        } | {
            type: "object";
            objectType: "sharedObject";
            objectId: string;
            initialSharedVersion: string;
            mutable: boolean;
        })[];
        kind: "ProgrammableTransaction";
    }, null>;
    sender: import("superstruct").Struct<string, null>;
    gasData: import("superstruct").Struct<{
        payment: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        owner: string;
        price: string;
        budget: string;
    }, {
        payment: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        owner: import("superstruct").Struct<string, null>;
        price: import("superstruct").Struct<string, null>;
        budget: import("superstruct").Struct<string, null>;
    }>;
}>;
export type SuiTransactionBlockData = Infer<typeof SuiTransactionBlockData>;
/** @deprecated Use `string` instead. */
export declare const AuthoritySignature: import("superstruct").Struct<string, null>;
export declare const GenericAuthoritySignature: import("superstruct").Struct<string | string[], null>;
export declare const AuthorityQuorumSignInfo: import("superstruct").Struct<{
    epoch: string;
    signature: string | string[];
    signers_map: number[];
}, {
    epoch: import("superstruct").Struct<string, null>;
    signature: import("superstruct").Struct<string | string[], null>;
    signers_map: import("superstruct").Struct<number[], import("superstruct").Struct<number, null>>;
}>;
export type AuthorityQuorumSignInfo = Infer<typeof AuthorityQuorumSignInfo>;
export declare const GasCostSummary: import("superstruct").Struct<{
    computationCost: string;
    storageCost: string;
    storageRebate: string;
    nonRefundableStorageFee: string;
}, {
    computationCost: import("superstruct").Struct<string, null>;
    storageCost: import("superstruct").Struct<string, null>;
    storageRebate: import("superstruct").Struct<string, null>;
    nonRefundableStorageFee: import("superstruct").Struct<string, null>;
}>;
export type GasCostSummary = Infer<typeof GasCostSummary>;
export declare const ExecutionStatusType: import("superstruct").Struct<"success" | "failure", null>;
export type ExecutionStatusType = Infer<typeof ExecutionStatusType>;
export declare const ExecutionStatus: import("superstruct").Struct<{
    status: "success" | "failure";
    error: string;
}, {
    status: import("superstruct").Struct<"success" | "failure", null>;
    error: import("superstruct").Struct<string, null>;
}>;
export type ExecutionStatus = Infer<typeof ExecutionStatus>;
export declare const OwnedObjectRef: import("superstruct").Struct<{
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
    reference: {
        objectId: string;
        version: string | number;
        digest: string;
    };
}, {
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    reference: import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }, {
        digest: import("superstruct").Struct<string, null>;
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string | number, null>;
    }>;
}>;
export type OwnedObjectRef = Infer<typeof OwnedObjectRef>;
export declare const TransactionEffectsModifiedAtVersions: import("superstruct").Struct<{
    objectId: string;
    sequenceNumber: string;
}, {
    objectId: import("superstruct").Struct<string, null>;
    sequenceNumber: import("superstruct").Struct<string, null>;
}>;
export declare const TransactionEffects: import("superstruct").Struct<{
    messageVersion: "v1";
    status: {
        status: "success" | "failure";
        error: string;
    };
    executedEpoch: string;
    modifiedAtVersions: {
        objectId: string;
        sequenceNumber: string;
    }[];
    gasUsed: {
        computationCost: string;
        storageCost: string;
        storageRebate: string;
        nonRefundableStorageFee: string;
    };
    sharedObjects: {
        objectId: string;
        version: string | number;
        digest: string;
    }[];
    transactionDigest: string;
    created: {
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }[];
    mutated: {
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }[];
    unwrapped: {
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }[];
    deleted: {
        objectId: string;
        version: string | number;
        digest: string;
    }[];
    unwrappedThenDeleted: {
        objectId: string;
        version: string | number;
        digest: string;
    }[];
    wrapped: {
        objectId: string;
        version: string | number;
        digest: string;
    }[];
    gasObject: {
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    };
    eventsDigest: string;
    dependencies: string[];
}, {
    messageVersion: import("superstruct").Struct<"v1", "v1">;
    /** The status of the execution */
    status: import("superstruct").Struct<{
        status: "success" | "failure";
        error: string;
    }, {
        status: import("superstruct").Struct<"success" | "failure", null>;
        error: import("superstruct").Struct<string, null>;
    }>;
    /** The epoch when this transaction was executed */
    executedEpoch: import("superstruct").Struct<string, null>;
    /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
    modifiedAtVersions: import("superstruct").Struct<{
        objectId: string;
        sequenceNumber: string;
    }[], import("superstruct").Struct<{
        objectId: string;
        sequenceNumber: string;
    }, {
        objectId: import("superstruct").Struct<string, null>;
        sequenceNumber: import("superstruct").Struct<string, null>;
    }>>;
    gasUsed: import("superstruct").Struct<{
        computationCost: string;
        storageCost: string;
        storageRebate: string;
        nonRefundableStorageFee: string;
    }, {
        computationCost: import("superstruct").Struct<string, null>;
        storageCost: import("superstruct").Struct<string, null>;
        storageRebate: import("superstruct").Struct<string, null>;
        nonRefundableStorageFee: import("superstruct").Struct<string, null>;
    }>;
    /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
    sharedObjects: import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }[], import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }, {
        digest: import("superstruct").Struct<string, null>;
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string | number, null>;
    }>>;
    /** The transaction digest */
    transactionDigest: import("superstruct").Struct<string, null>;
    /** ObjectRef and owner of new objects created */
    created: import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }[], import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }, {
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        reference: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>;
    }>>;
    /** ObjectRef and owner of mutated objects, including gas object */
    mutated: import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }[], import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }, {
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        reference: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>;
    }>>;
    /**
     * ObjectRef and owner of objects that are unwrapped in this transaction.
     * Unwrapped objects are objects that were wrapped into other objects in the past,
     * and just got extracted out.
     */
    unwrapped: import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }[], import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }, {
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        reference: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>;
    }>>;
    /** Object Refs of objects now deleted (the old refs) */
    deleted: import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }[], import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }, {
        digest: import("superstruct").Struct<string, null>;
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string | number, null>;
    }>>;
    /** Object Refs of objects now deleted (the old refs) */
    unwrappedThenDeleted: import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }[], import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }, {
        digest: import("superstruct").Struct<string, null>;
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string | number, null>;
    }>>;
    /** Object refs of objects now wrapped in other objects */
    wrapped: import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }[], import("superstruct").Struct<{
        objectId: string;
        version: string | number;
        digest: string;
    }, {
        digest: import("superstruct").Struct<string, null>;
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string | number, null>;
    }>>;
    /**
     * The updated gas object reference. Have a dedicated field for convenient access.
     * It's also included in mutated.
     */
    gasObject: import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        reference: {
            objectId: string;
            version: string | number;
            digest: string;
        };
    }, {
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        reference: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>;
    }>;
    /** The events emitted during execution. Note that only successful transactions emit events */
    eventsDigest: import("superstruct").Struct<string, null>;
    /** The set of transaction digests this transaction depends on */
    dependencies: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type TransactionEffects = Infer<typeof TransactionEffects>;
export declare const TransactionEvents: import("superstruct").Struct<{
    type: string;
    id: {
        txDigest: string;
        eventSeq: string;
    };
    packageId: string;
    transactionModule: string;
    sender: string;
    parsedJson: Record<string, any>;
    bcs: string;
    timestampMs: string;
}[], import("superstruct").Struct<{
    type: string;
    id: {
        txDigest: string;
        eventSeq: string;
    };
    packageId: string;
    transactionModule: string;
    sender: string;
    parsedJson: Record<string, any>;
    bcs: string;
    timestampMs: string;
}, {
    id: import("superstruct").Struct<{
        txDigest: string;
        eventSeq: string;
    }, {
        txDigest: import("superstruct").Struct<string, null>;
        eventSeq: import("superstruct").Struct<string, null>;
    }>;
    packageId: import("superstruct").Struct<string, null>;
    transactionModule: import("superstruct").Struct<string, null>;
    sender: import("superstruct").Struct<string, null>;
    type: import("superstruct").Struct<string, null>;
    parsedJson: import("superstruct").Struct<Record<string, any>, null>;
    bcs: import("superstruct").Struct<string, null>;
    timestampMs: import("superstruct").Struct<string, null>;
}>>;
export type TransactionEvents = Infer<typeof TransactionEvents>;
export declare const DevInspectResults: import("superstruct").Struct<{
    error: string;
    effects: {
        messageVersion: "v1";
        status: {
            status: "success" | "failure";
            error: string;
        };
        executedEpoch: string;
        modifiedAtVersions: {
            objectId: string;
            sequenceNumber: string;
        }[];
        gasUsed: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        sharedObjects: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        transactionDigest: string;
        created: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        mutated: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        unwrapped: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        deleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        unwrappedThenDeleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        wrapped: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        gasObject: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        };
        eventsDigest: string;
        dependencies: string[];
    };
    events: {
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }[];
    results: {
        mutableReferenceOutputs: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, number[], string][];
        returnValues: [number[], string][];
    }[];
}, {
    effects: import("superstruct").Struct<{
        messageVersion: "v1";
        status: {
            status: "success" | "failure";
            error: string;
        };
        executedEpoch: string;
        modifiedAtVersions: {
            objectId: string;
            sequenceNumber: string;
        }[];
        gasUsed: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        sharedObjects: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        transactionDigest: string;
        created: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        mutated: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        unwrapped: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        deleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        unwrappedThenDeleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        wrapped: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        gasObject: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        };
        eventsDigest: string;
        dependencies: string[];
    }, {
        messageVersion: import("superstruct").Struct<"v1", "v1">;
        /** The status of the execution */
        status: import("superstruct").Struct<{
            status: "success" | "failure";
            error: string;
        }, {
            status: import("superstruct").Struct<"success" | "failure", null>;
            error: import("superstruct").Struct<string, null>;
        }>;
        /** The epoch when this transaction was executed */
        executedEpoch: import("superstruct").Struct<string, null>;
        /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
        modifiedAtVersions: import("superstruct").Struct<{
            objectId: string;
            sequenceNumber: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            sequenceNumber: string;
        }, {
            objectId: import("superstruct").Struct<string, null>;
            sequenceNumber: import("superstruct").Struct<string, null>;
        }>>;
        gasUsed: import("superstruct").Struct<{
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        }, {
            computationCost: import("superstruct").Struct<string, null>;
            storageCost: import("superstruct").Struct<string, null>;
            storageRebate: import("superstruct").Struct<string, null>;
            nonRefundableStorageFee: import("superstruct").Struct<string, null>;
        }>;
        /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
        sharedObjects: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** The transaction digest */
        transactionDigest: import("superstruct").Struct<string, null>;
        /** ObjectRef and owner of new objects created */
        created: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /** ObjectRef and owner of mutated objects, including gas object */
        mutated: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /**
         * ObjectRef and owner of objects that are unwrapped in this transaction.
         * Unwrapped objects are objects that were wrapped into other objects in the past,
         * and just got extracted out.
         */
        unwrapped: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /** Object Refs of objects now deleted (the old refs) */
        deleted: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** Object Refs of objects now deleted (the old refs) */
        unwrappedThenDeleted: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** Object refs of objects now wrapped in other objects */
        wrapped: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /**
         * The updated gas object reference. Have a dedicated field for convenient access.
         * It's also included in mutated.
         */
        gasObject: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>;
        /** The events emitted during execution. Note that only successful transactions emit events */
        eventsDigest: import("superstruct").Struct<string, null>;
        /** The set of transaction digests this transaction depends on */
        dependencies: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    events: import("superstruct").Struct<{
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }[], import("superstruct").Struct<{
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }, {
        id: import("superstruct").Struct<{
            txDigest: string;
            eventSeq: string;
        }, {
            txDigest: import("superstruct").Struct<string, null>;
            eventSeq: import("superstruct").Struct<string, null>;
        }>;
        packageId: import("superstruct").Struct<string, null>;
        transactionModule: import("superstruct").Struct<string, null>;
        sender: import("superstruct").Struct<string, null>;
        type: import("superstruct").Struct<string, null>;
        parsedJson: import("superstruct").Struct<Record<string, any>, null>;
        bcs: import("superstruct").Struct<string, null>;
        timestampMs: import("superstruct").Struct<string, null>;
    }>>;
    results: import("superstruct").Struct<{
        mutableReferenceOutputs: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, number[], string][];
        returnValues: [number[], string][];
    }[], import("superstruct").Struct<{
        mutableReferenceOutputs: ["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, number[], string][];
        returnValues: [number[], string][];
    }, {
        mutableReferenceOutputs: import("superstruct").Struct<["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, number[], string][], import("superstruct").Struct<["GasCoin" | {
            Input: number;
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, number[], string], null>>;
        returnValues: import("superstruct").Struct<[number[], string][], import("superstruct").Struct<[number[], string], null>>;
    }>>;
    error: import("superstruct").Struct<string, null>;
}>;
export type DevInspectResults = Infer<typeof DevInspectResults>;
export type SuiTransactionBlockResponseQuery = {
    filter?: TransactionFilter;
    options?: SuiTransactionBlockResponseOptions;
};
export type TransactionFilter = {
    FromOrToAddress: {
        addr: string;
    };
} | {
    Checkpoint: string;
} | {
    FromAndToAddress: {
        from: string;
        to: string;
    };
} | {
    TransactionKind: string;
} | {
    MoveFunction: {
        package: string;
        module: string | null;
        function: string | null;
    };
} | {
    InputObject: string;
} | {
    ChangedObject: string;
} | {
    FromAddress: string;
} | {
    ToAddress: string;
};
export type EmptySignInfo = object;
/** @deprecated Use `string` instead. */
export declare const AuthorityName: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type AuthorityName = Infer<typeof AuthorityName>;
export declare const SuiTransactionBlock: import("superstruct").Struct<{
    data: {
        sender: string;
        messageVersion: "v1";
        transaction: {
            epoch: string;
            storage_charge: string;
            computation_charge: string;
            storage_rebate: string;
            epoch_start_timestamp_ms: string;
            kind: "ChangeEpoch";
        } | {
            epoch: string;
            round: string;
            commit_timestamp_ms: string;
            kind: "ConsensusCommitPrologue";
        } | {
            objects: string[];
            kind: "Genesis";
        } | {
            transactions: ({
                MoveCall: {
                    function: string;
                    arguments: ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[];
                    type_arguments: string[];
                    package: string;
                    module: string;
                };
            } | {
                TransferObjects: [("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[], "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                SplitCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                MergeCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                Publish: string[] | [{
                    disassembled: Record<string, unknown>;
                }, string[]];
            } | {
                Upgrade: [string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }] | [{
                    disassembled: Record<string, unknown>;
                }, string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                MakeMoveVec: [string, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            })[];
            inputs: ({
                value: SuiJsonValue;
                type: "pure";
                valueType: string;
            } | {
                type: "object";
                objectType: "immOrOwnedObject";
                objectId: string;
                version: string;
                digest: string;
            } | {
                type: "object";
                objectType: "sharedObject";
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
            })[];
            kind: "ProgrammableTransaction";
        };
        gasData: {
            payment: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
        };
    };
    txSignatures: string[];
}, {
    data: import("superstruct").Struct<{
        sender: string;
        messageVersion: "v1";
        transaction: {
            epoch: string;
            storage_charge: string;
            computation_charge: string;
            storage_rebate: string;
            epoch_start_timestamp_ms: string;
            kind: "ChangeEpoch";
        } | {
            epoch: string;
            round: string;
            commit_timestamp_ms: string;
            kind: "ConsensusCommitPrologue";
        } | {
            objects: string[];
            kind: "Genesis";
        } | {
            transactions: ({
                MoveCall: {
                    function: string;
                    arguments: ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[];
                    type_arguments: string[];
                    package: string;
                    module: string;
                };
            } | {
                TransferObjects: [("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[], "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                SplitCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                MergeCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                Publish: string[] | [{
                    disassembled: Record<string, unknown>;
                }, string[]];
            } | {
                Upgrade: [string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }] | [{
                    disassembled: Record<string, unknown>;
                }, string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                MakeMoveVec: [string, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            })[];
            inputs: ({
                value: SuiJsonValue;
                type: "pure";
                valueType: string;
            } | {
                type: "object";
                objectType: "immOrOwnedObject";
                objectId: string;
                version: string;
                digest: string;
            } | {
                type: "object";
                objectType: "sharedObject";
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
            })[];
            kind: "ProgrammableTransaction";
        };
        gasData: {
            payment: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
        };
    }, {
        messageVersion: import("superstruct").Struct<"v1", "v1">;
        transaction: import("superstruct").Struct<{
            epoch: string;
            storage_charge: string;
            computation_charge: string;
            storage_rebate: string;
            epoch_start_timestamp_ms: string;
            kind: "ChangeEpoch";
        } | {
            epoch: string;
            round: string;
            commit_timestamp_ms: string;
            kind: "ConsensusCommitPrologue";
        } | {
            objects: string[];
            kind: "Genesis";
        } | {
            transactions: ({
                MoveCall: {
                    function: string;
                    arguments: ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[];
                    type_arguments: string[];
                    package: string;
                    module: string;
                };
            } | {
                TransferObjects: [("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[], "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                SplitCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                MergeCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                Publish: string[] | [{
                    disassembled: Record<string, unknown>;
                }, string[]];
            } | {
                Upgrade: [string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }] | [{
                    disassembled: Record<string, unknown>;
                }, string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                MakeMoveVec: [string, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            })[];
            inputs: ({
                value: SuiJsonValue;
                type: "pure";
                valueType: string;
            } | {
                type: "object";
                objectType: "immOrOwnedObject";
                objectId: string;
                version: string;
                digest: string;
            } | {
                type: "object";
                objectType: "sharedObject";
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
            })[];
            kind: "ProgrammableTransaction";
        }, null>;
        sender: import("superstruct").Struct<string, null>;
        gasData: import("superstruct").Struct<{
            payment: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
        }, {
            payment: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>>;
            owner: import("superstruct").Struct<string, null>;
            price: import("superstruct").Struct<string, null>;
            budget: import("superstruct").Struct<string, null>;
        }>;
    }>;
    txSignatures: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type SuiTransactionBlock = Infer<typeof SuiTransactionBlock>;
export declare const SuiObjectChangePublished: import("superstruct").Struct<{
    type: "published";
    packageId: string;
    version: string;
    digest: string;
    modules: string[];
}, {
    type: import("superstruct").Struct<"published", "published">;
    packageId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
    modules: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type SuiObjectChangePublished = Infer<typeof SuiObjectChangePublished>;
export declare const SuiObjectChangeTransferred: import("superstruct").Struct<{
    type: "transferred";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
    digest: string;
    recipient: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
}, {
    type: import("superstruct").Struct<"transferred", "transferred">;
    sender: import("superstruct").Struct<string, null>;
    recipient: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    objectType: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectChangeTransferred = Infer<typeof SuiObjectChangeTransferred>;
export declare const SuiObjectChangeMutated: import("superstruct").Struct<{
    type: "mutated";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
    digest: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
    previousVersion: string;
}, {
    type: import("superstruct").Struct<"mutated", "mutated">;
    sender: import("superstruct").Struct<string, null>;
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    objectType: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    previousVersion: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectChangeMutated = Infer<typeof SuiObjectChangeMutated>;
export declare const SuiObjectChangeDeleted: import("superstruct").Struct<{
    type: "deleted";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
}, {
    type: import("superstruct").Struct<"deleted", "deleted">;
    sender: import("superstruct").Struct<string, null>;
    objectType: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectChangeDeleted = Infer<typeof SuiObjectChangeDeleted>;
export declare const SuiObjectChangeWrapped: import("superstruct").Struct<{
    type: "wrapped";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
}, {
    type: import("superstruct").Struct<"wrapped", "wrapped">;
    sender: import("superstruct").Struct<string, null>;
    objectType: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectChangeWrapped = Infer<typeof SuiObjectChangeWrapped>;
export declare const SuiObjectChangeCreated: import("superstruct").Struct<{
    type: "created";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
    digest: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
}, {
    type: import("superstruct").Struct<"created", "created">;
    sender: import("superstruct").Struct<string, null>;
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    objectType: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectChangeCreated = Infer<typeof SuiObjectChangeCreated>;
export declare const SuiObjectChange: import("superstruct").Struct<{
    type: "published";
    packageId: string;
    version: string;
    digest: string;
    modules: string[];
} | {
    type: "transferred";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
    digest: string;
    recipient: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
} | {
    type: "mutated";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
    digest: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
    previousVersion: string;
} | {
    type: "deleted";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
} | {
    type: "wrapped";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
} | {
    type: "created";
    sender: string;
    objectType: string;
    objectId: string;
    version: string;
    digest: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
}, null>;
export type SuiObjectChange = Infer<typeof SuiObjectChange>;
export declare const BalanceChange: import("superstruct").Struct<{
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable";
    coinType: string;
    amount: string;
}, {
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    coinType: import("superstruct").Struct<string, null>;
    amount: import("superstruct").Struct<string, null>;
}>;
export declare const SuiTransactionBlockResponse: import("superstruct").Struct<{
    timestampMs: string;
    digest: string;
    transaction: {
        data: {
            sender: string;
            messageVersion: "v1";
            transaction: {
                epoch: string;
                storage_charge: string;
                computation_charge: string;
                storage_rebate: string;
                epoch_start_timestamp_ms: string;
                kind: "ChangeEpoch";
            } | {
                epoch: string;
                round: string;
                commit_timestamp_ms: string;
                kind: "ConsensusCommitPrologue";
            } | {
                objects: string[];
                kind: "Genesis";
            } | {
                transactions: ({
                    MoveCall: {
                        function: string;
                        arguments: ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[];
                        type_arguments: string[];
                        package: string;
                        module: string;
                    };
                } | {
                    TransferObjects: [("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[], "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    SplitCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    MergeCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    Publish: string[] | [{
                        disassembled: Record<string, unknown>;
                    }, string[]];
                } | {
                    Upgrade: [string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }] | [{
                        disassembled: Record<string, unknown>;
                    }, string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    MakeMoveVec: [string, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                })[];
                inputs: ({
                    value: SuiJsonValue;
                    type: "pure";
                    valueType: string;
                } | {
                    type: "object";
                    objectType: "immOrOwnedObject";
                    objectId: string;
                    version: string;
                    digest: string;
                } | {
                    type: "object";
                    objectType: "sharedObject";
                    objectId: string;
                    initialSharedVersion: string;
                    mutable: boolean;
                })[];
                kind: "ProgrammableTransaction";
            };
            gasData: {
                payment: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                }[];
                owner: string;
                price: string;
                budget: string;
            };
        };
        txSignatures: string[];
    };
    effects: {
        messageVersion: "v1";
        status: {
            status: "success" | "failure";
            error: string;
        };
        executedEpoch: string;
        modifiedAtVersions: {
            objectId: string;
            sequenceNumber: string;
        }[];
        gasUsed: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        sharedObjects: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        transactionDigest: string;
        created: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        mutated: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        unwrapped: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        deleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        unwrappedThenDeleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        wrapped: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        gasObject: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        };
        eventsDigest: string;
        dependencies: string[];
    };
    events: {
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }[];
    checkpoint: string;
    confirmedLocalExecution: boolean;
    objectChanges: ({
        type: "published";
        packageId: string;
        version: string;
        digest: string;
        modules: string[];
    } | {
        type: "transferred";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        recipient: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    } | {
        type: "mutated";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        previousVersion: string;
    } | {
        type: "deleted";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "wrapped";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "created";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    })[];
    balanceChanges: {
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        coinType: string;
        amount: string;
    }[];
    errors: string[];
}, {
    digest: import("superstruct").Struct<string, null>;
    transaction: import("superstruct").Struct<{
        data: {
            sender: string;
            messageVersion: "v1";
            transaction: {
                epoch: string;
                storage_charge: string;
                computation_charge: string;
                storage_rebate: string;
                epoch_start_timestamp_ms: string;
                kind: "ChangeEpoch";
            } | {
                epoch: string;
                round: string;
                commit_timestamp_ms: string;
                kind: "ConsensusCommitPrologue";
            } | {
                objects: string[];
                kind: "Genesis";
            } | {
                transactions: ({
                    MoveCall: {
                        function: string;
                        arguments: ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[];
                        type_arguments: string[];
                        package: string;
                        module: string;
                    };
                } | {
                    TransferObjects: [("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[], "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    SplitCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    MergeCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    Publish: string[] | [{
                        disassembled: Record<string, unknown>;
                    }, string[]];
                } | {
                    Upgrade: [string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }] | [{
                        disassembled: Record<string, unknown>;
                    }, string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    MakeMoveVec: [string, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                })[];
                inputs: ({
                    value: SuiJsonValue;
                    type: "pure";
                    valueType: string;
                } | {
                    type: "object";
                    objectType: "immOrOwnedObject";
                    objectId: string;
                    version: string;
                    digest: string;
                } | {
                    type: "object";
                    objectType: "sharedObject";
                    objectId: string;
                    initialSharedVersion: string;
                    mutable: boolean;
                })[];
                kind: "ProgrammableTransaction";
            };
            gasData: {
                payment: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                }[];
                owner: string;
                price: string;
                budget: string;
            };
        };
        txSignatures: string[];
    }, {
        data: import("superstruct").Struct<{
            sender: string;
            messageVersion: "v1";
            transaction: {
                epoch: string;
                storage_charge: string;
                computation_charge: string;
                storage_rebate: string;
                epoch_start_timestamp_ms: string;
                kind: "ChangeEpoch";
            } | {
                epoch: string;
                round: string;
                commit_timestamp_ms: string;
                kind: "ConsensusCommitPrologue";
            } | {
                objects: string[];
                kind: "Genesis";
            } | {
                transactions: ({
                    MoveCall: {
                        function: string;
                        arguments: ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[];
                        type_arguments: string[];
                        package: string;
                        module: string;
                    };
                } | {
                    TransferObjects: [("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[], "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    SplitCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    MergeCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    Publish: string[] | [{
                        disassembled: Record<string, unknown>;
                    }, string[]];
                } | {
                    Upgrade: [string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }] | [{
                        disassembled: Record<string, unknown>;
                    }, string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    MakeMoveVec: [string, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                })[];
                inputs: ({
                    value: SuiJsonValue;
                    type: "pure";
                    valueType: string;
                } | {
                    type: "object";
                    objectType: "immOrOwnedObject";
                    objectId: string;
                    version: string;
                    digest: string;
                } | {
                    type: "object";
                    objectType: "sharedObject";
                    objectId: string;
                    initialSharedVersion: string;
                    mutable: boolean;
                })[];
                kind: "ProgrammableTransaction";
            };
            gasData: {
                payment: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                }[];
                owner: string;
                price: string;
                budget: string;
            };
        }, {
            messageVersion: import("superstruct").Struct<"v1", "v1">;
            transaction: import("superstruct").Struct<{
                epoch: string;
                storage_charge: string;
                computation_charge: string;
                storage_rebate: string;
                epoch_start_timestamp_ms: string;
                kind: "ChangeEpoch";
            } | {
                epoch: string;
                round: string;
                commit_timestamp_ms: string;
                kind: "ConsensusCommitPrologue";
            } | {
                objects: string[];
                kind: "Genesis";
            } | {
                transactions: ({
                    MoveCall: {
                        function: string;
                        arguments: ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[];
                        type_arguments: string[];
                        package: string;
                        module: string;
                    };
                } | {
                    TransferObjects: [("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[], "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    SplitCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    MergeCoins: ["GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                } | {
                    Publish: string[] | [{
                        disassembled: Record<string, unknown>;
                    }, string[]];
                } | {
                    Upgrade: [string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }] | [{
                        disassembled: Record<string, unknown>;
                    }, string[], string, "GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    }];
                } | {
                    MakeMoveVec: [string, ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[]];
                })[];
                inputs: ({
                    value: SuiJsonValue;
                    type: "pure";
                    valueType: string;
                } | {
                    type: "object";
                    objectType: "immOrOwnedObject";
                    objectId: string;
                    version: string;
                    digest: string;
                } | {
                    type: "object";
                    objectType: "sharedObject";
                    objectId: string;
                    initialSharedVersion: string;
                    mutable: boolean;
                })[];
                kind: "ProgrammableTransaction";
            }, null>;
            sender: import("superstruct").Struct<string, null>;
            gasData: import("superstruct").Struct<{
                payment: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                }[];
                owner: string;
                price: string;
                budget: string;
            }, {
                payment: import("superstruct").Struct<{
                    objectId: string;
                    version: string | number;
                    digest: string;
                }[], import("superstruct").Struct<{
                    objectId: string;
                    version: string | number;
                    digest: string;
                }, {
                    digest: import("superstruct").Struct<string, null>;
                    objectId: import("superstruct").Struct<string, null>;
                    version: import("superstruct").Struct<string | number, null>;
                }>>;
                owner: import("superstruct").Struct<string, null>;
                price: import("superstruct").Struct<string, null>;
                budget: import("superstruct").Struct<string, null>;
            }>;
        }>;
        txSignatures: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    effects: import("superstruct").Struct<{
        messageVersion: "v1";
        status: {
            status: "success" | "failure";
            error: string;
        };
        executedEpoch: string;
        modifiedAtVersions: {
            objectId: string;
            sequenceNumber: string;
        }[];
        gasUsed: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        sharedObjects: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        transactionDigest: string;
        created: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        mutated: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        unwrapped: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        deleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        unwrappedThenDeleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        wrapped: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        gasObject: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        };
        eventsDigest: string;
        dependencies: string[];
    }, {
        messageVersion: import("superstruct").Struct<"v1", "v1">;
        /** The status of the execution */
        status: import("superstruct").Struct<{
            status: "success" | "failure";
            error: string;
        }, {
            status: import("superstruct").Struct<"success" | "failure", null>;
            error: import("superstruct").Struct<string, null>;
        }>;
        /** The epoch when this transaction was executed */
        executedEpoch: import("superstruct").Struct<string, null>;
        /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
        modifiedAtVersions: import("superstruct").Struct<{
            objectId: string;
            sequenceNumber: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            sequenceNumber: string;
        }, {
            objectId: import("superstruct").Struct<string, null>;
            sequenceNumber: import("superstruct").Struct<string, null>;
        }>>;
        gasUsed: import("superstruct").Struct<{
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        }, {
            computationCost: import("superstruct").Struct<string, null>;
            storageCost: import("superstruct").Struct<string, null>;
            storageRebate: import("superstruct").Struct<string, null>;
            nonRefundableStorageFee: import("superstruct").Struct<string, null>;
        }>;
        /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
        sharedObjects: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** The transaction digest */
        transactionDigest: import("superstruct").Struct<string, null>;
        /** ObjectRef and owner of new objects created */
        created: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /** ObjectRef and owner of mutated objects, including gas object */
        mutated: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /**
         * ObjectRef and owner of objects that are unwrapped in this transaction.
         * Unwrapped objects are objects that were wrapped into other objects in the past,
         * and just got extracted out.
         */
        unwrapped: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /** Object Refs of objects now deleted (the old refs) */
        deleted: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** Object Refs of objects now deleted (the old refs) */
        unwrappedThenDeleted: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** Object refs of objects now wrapped in other objects */
        wrapped: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /**
         * The updated gas object reference. Have a dedicated field for convenient access.
         * It's also included in mutated.
         */
        gasObject: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>;
        /** The events emitted during execution. Note that only successful transactions emit events */
        eventsDigest: import("superstruct").Struct<string, null>;
        /** The set of transaction digests this transaction depends on */
        dependencies: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    events: import("superstruct").Struct<{
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }[], import("superstruct").Struct<{
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }, {
        id: import("superstruct").Struct<{
            txDigest: string;
            eventSeq: string;
        }, {
            txDigest: import("superstruct").Struct<string, null>;
            eventSeq: import("superstruct").Struct<string, null>;
        }>;
        packageId: import("superstruct").Struct<string, null>;
        transactionModule: import("superstruct").Struct<string, null>;
        sender: import("superstruct").Struct<string, null>;
        type: import("superstruct").Struct<string, null>;
        parsedJson: import("superstruct").Struct<Record<string, any>, null>;
        bcs: import("superstruct").Struct<string, null>;
        timestampMs: import("superstruct").Struct<string, null>;
    }>>;
    timestampMs: import("superstruct").Struct<string, null>;
    checkpoint: import("superstruct").Struct<string, null>;
    confirmedLocalExecution: import("superstruct").Struct<boolean, null>;
    objectChanges: import("superstruct").Struct<({
        type: "published";
        packageId: string;
        version: string;
        digest: string;
        modules: string[];
    } | {
        type: "transferred";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        recipient: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    } | {
        type: "mutated";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        previousVersion: string;
    } | {
        type: "deleted";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "wrapped";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "created";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    })[], import("superstruct").Struct<{
        type: "published";
        packageId: string;
        version: string;
        digest: string;
        modules: string[];
    } | {
        type: "transferred";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        recipient: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    } | {
        type: "mutated";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        previousVersion: string;
    } | {
        type: "deleted";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "wrapped";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "created";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    }, null>>;
    balanceChanges: import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        coinType: string;
        amount: string;
    }[], import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        coinType: string;
        amount: string;
    }, {
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        coinType: import("superstruct").Struct<string, null>;
        amount: import("superstruct").Struct<string, null>;
    }>>;
    errors: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type SuiTransactionBlockResponse = Infer<typeof SuiTransactionBlockResponse>;
export declare const SuiTransactionBlockResponseOptions: import("superstruct").Struct<{
    showInput: boolean;
    showEffects: boolean;
    showEvents: boolean;
    showObjectChanges: boolean;
    showBalanceChanges: boolean;
}, {
    showInput: import("superstruct").Struct<boolean, null>;
    showEffects: import("superstruct").Struct<boolean, null>;
    showEvents: import("superstruct").Struct<boolean, null>;
    showObjectChanges: import("superstruct").Struct<boolean, null>;
    showBalanceChanges: import("superstruct").Struct<boolean, null>;
}>;
export type SuiTransactionBlockResponseOptions = Infer<typeof SuiTransactionBlockResponseOptions>;
export declare const PaginatedTransactionResponse: import("superstruct").Struct<{
    data: {
        timestampMs: string;
        digest: string;
        transaction: {
            data: {
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            };
            txSignatures: string[];
        };
        effects: {
            messageVersion: "v1";
            status: {
                status: "success" | "failure";
                error: string;
            };
            executedEpoch: string;
            modifiedAtVersions: {
                objectId: string;
                sequenceNumber: string;
            }[];
            gasUsed: {
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            };
            sharedObjects: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            transactionDigest: string;
            created: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            mutated: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            unwrapped: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            deleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            unwrappedThenDeleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            wrapped: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            gasObject: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            };
            eventsDigest: string;
            dependencies: string[];
        };
        events: {
            type: string;
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            parsedJson: Record<string, any>;
            bcs: string;
            timestampMs: string;
        }[];
        checkpoint: string;
        confirmedLocalExecution: boolean;
        objectChanges: ({
            type: "published";
            packageId: string;
            version: string;
            digest: string;
            modules: string[];
        } | {
            type: "transferred";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        } | {
            type: "mutated";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            previousVersion: string;
        } | {
            type: "deleted";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "wrapped";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "created";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        })[];
        balanceChanges: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            coinType: string;
            amount: string;
        }[];
        errors: string[];
    }[];
    nextCursor: string;
    hasNextPage: boolean;
}, {
    data: import("superstruct").Struct<{
        timestampMs: string;
        digest: string;
        transaction: {
            data: {
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            };
            txSignatures: string[];
        };
        effects: {
            messageVersion: "v1";
            status: {
                status: "success" | "failure";
                error: string;
            };
            executedEpoch: string;
            modifiedAtVersions: {
                objectId: string;
                sequenceNumber: string;
            }[];
            gasUsed: {
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            };
            sharedObjects: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            transactionDigest: string;
            created: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            mutated: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            unwrapped: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            deleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            unwrappedThenDeleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            wrapped: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            gasObject: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            };
            eventsDigest: string;
            dependencies: string[];
        };
        events: {
            type: string;
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            parsedJson: Record<string, any>;
            bcs: string;
            timestampMs: string;
        }[];
        checkpoint: string;
        confirmedLocalExecution: boolean;
        objectChanges: ({
            type: "published";
            packageId: string;
            version: string;
            digest: string;
            modules: string[];
        } | {
            type: "transferred";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        } | {
            type: "mutated";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            previousVersion: string;
        } | {
            type: "deleted";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "wrapped";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "created";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        })[];
        balanceChanges: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            coinType: string;
            amount: string;
        }[];
        errors: string[];
    }[], import("superstruct").Struct<{
        timestampMs: string;
        digest: string;
        transaction: {
            data: {
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            };
            txSignatures: string[];
        };
        effects: {
            messageVersion: "v1";
            status: {
                status: "success" | "failure";
                error: string;
            };
            executedEpoch: string;
            modifiedAtVersions: {
                objectId: string;
                sequenceNumber: string;
            }[];
            gasUsed: {
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            };
            sharedObjects: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            transactionDigest: string;
            created: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            mutated: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            unwrapped: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            deleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            unwrappedThenDeleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            wrapped: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            gasObject: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            };
            eventsDigest: string;
            dependencies: string[];
        };
        events: {
            type: string;
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            parsedJson: Record<string, any>;
            bcs: string;
            timestampMs: string;
        }[];
        checkpoint: string;
        confirmedLocalExecution: boolean;
        objectChanges: ({
            type: "published";
            packageId: string;
            version: string;
            digest: string;
            modules: string[];
        } | {
            type: "transferred";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        } | {
            type: "mutated";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            previousVersion: string;
        } | {
            type: "deleted";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "wrapped";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "created";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        })[];
        balanceChanges: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            coinType: string;
            amount: string;
        }[];
        errors: string[];
    }, {
        digest: import("superstruct").Struct<string, null>;
        transaction: import("superstruct").Struct<{
            data: {
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            };
            txSignatures: string[];
        }, {
            data: import("superstruct").Struct<{
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            }, {
                messageVersion: import("superstruct").Struct<"v1", "v1">;
                transaction: import("superstruct").Struct<{
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                }, null>;
                sender: import("superstruct").Struct<string, null>;
                gasData: import("superstruct").Struct<{
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                }, {
                    payment: import("superstruct").Struct<{
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[], import("superstruct").Struct<{
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }, {
                        digest: import("superstruct").Struct<string, null>;
                        objectId: import("superstruct").Struct<string, null>;
                        version: import("superstruct").Struct<string | number, null>;
                    }>>;
                    owner: import("superstruct").Struct<string, null>;
                    price: import("superstruct").Struct<string, null>;
                    budget: import("superstruct").Struct<string, null>;
                }>;
            }>;
            txSignatures: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
        }>;
        effects: import("superstruct").Struct<{
            messageVersion: "v1";
            status: {
                status: "success" | "failure";
                error: string;
            };
            executedEpoch: string;
            modifiedAtVersions: {
                objectId: string;
                sequenceNumber: string;
            }[];
            gasUsed: {
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            };
            sharedObjects: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            transactionDigest: string;
            created: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            mutated: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            unwrapped: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            deleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            unwrappedThenDeleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            wrapped: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            gasObject: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            };
            eventsDigest: string;
            dependencies: string[];
        }, {
            messageVersion: import("superstruct").Struct<"v1", "v1">;
            /** The status of the execution */
            status: import("superstruct").Struct<{
                status: "success" | "failure";
                error: string;
            }, {
                status: import("superstruct").Struct<"success" | "failure", null>;
                error: import("superstruct").Struct<string, null>;
            }>;
            /** The epoch when this transaction was executed */
            executedEpoch: import("superstruct").Struct<string, null>;
            /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
            modifiedAtVersions: import("superstruct").Struct<{
                objectId: string;
                sequenceNumber: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                sequenceNumber: string;
            }, {
                objectId: import("superstruct").Struct<string, null>;
                sequenceNumber: import("superstruct").Struct<string, null>;
            }>>;
            gasUsed: import("superstruct").Struct<{
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            }, {
                computationCost: import("superstruct").Struct<string, null>;
                storageCost: import("superstruct").Struct<string, null>;
                storageRebate: import("superstruct").Struct<string, null>;
                nonRefundableStorageFee: import("superstruct").Struct<string, null>;
            }>;
            /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
            sharedObjects: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>>;
            /** The transaction digest */
            transactionDigest: import("superstruct").Struct<string, null>;
            /** ObjectRef and owner of new objects created */
            created: import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[], import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }, {
                owner: import("superstruct").Struct<{
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable", null>;
                reference: import("superstruct").Struct<{
                    objectId: string;
                    version: string | number;
                    digest: string;
                }, {
                    digest: import("superstruct").Struct<string, null>;
                    objectId: import("superstruct").Struct<string, null>;
                    version: import("superstruct").Struct<string | number, null>;
                }>;
            }>>;
            /** ObjectRef and owner of mutated objects, including gas object */
            mutated: import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[], import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }, {
                owner: import("superstruct").Struct<{
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable", null>;
                reference: import("superstruct").Struct<{
                    objectId: string;
                    version: string | number;
                    digest: string;
                }, {
                    digest: import("superstruct").Struct<string, null>;
                    objectId: import("superstruct").Struct<string, null>;
                    version: import("superstruct").Struct<string | number, null>;
                }>;
            }>>;
            /**
             * ObjectRef and owner of objects that are unwrapped in this transaction.
             * Unwrapped objects are objects that were wrapped into other objects in the past,
             * and just got extracted out.
             */
            unwrapped: import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[], import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }, {
                owner: import("superstruct").Struct<{
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable", null>;
                reference: import("superstruct").Struct<{
                    objectId: string;
                    version: string | number;
                    digest: string;
                }, {
                    digest: import("superstruct").Struct<string, null>;
                    objectId: import("superstruct").Struct<string, null>;
                    version: import("superstruct").Struct<string | number, null>;
                }>;
            }>>;
            /** Object Refs of objects now deleted (the old refs) */
            deleted: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>>;
            /** Object Refs of objects now deleted (the old refs) */
            unwrappedThenDeleted: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>>;
            /** Object refs of objects now wrapped in other objects */
            wrapped: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>>;
            /**
             * The updated gas object reference. Have a dedicated field for convenient access.
             * It's also included in mutated.
             */
            gasObject: import("superstruct").Struct<{
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }, {
                owner: import("superstruct").Struct<{
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable", null>;
                reference: import("superstruct").Struct<{
                    objectId: string;
                    version: string | number;
                    digest: string;
                }, {
                    digest: import("superstruct").Struct<string, null>;
                    objectId: import("superstruct").Struct<string, null>;
                    version: import("superstruct").Struct<string | number, null>;
                }>;
            }>;
            /** The events emitted during execution. Note that only successful transactions emit events */
            eventsDigest: import("superstruct").Struct<string, null>;
            /** The set of transaction digests this transaction depends on */
            dependencies: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
        }>;
        events: import("superstruct").Struct<{
            type: string;
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            parsedJson: Record<string, any>;
            bcs: string;
            timestampMs: string;
        }[], import("superstruct").Struct<{
            type: string;
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            parsedJson: Record<string, any>;
            bcs: string;
            timestampMs: string;
        }, {
            id: import("superstruct").Struct<{
                txDigest: string;
                eventSeq: string;
            }, {
                txDigest: import("superstruct").Struct<string, null>;
                eventSeq: import("superstruct").Struct<string, null>;
            }>;
            packageId: import("superstruct").Struct<string, null>;
            transactionModule: import("superstruct").Struct<string, null>;
            sender: import("superstruct").Struct<string, null>;
            type: import("superstruct").Struct<string, null>;
            parsedJson: import("superstruct").Struct<Record<string, any>, null>;
            bcs: import("superstruct").Struct<string, null>;
            timestampMs: import("superstruct").Struct<string, null>;
        }>>;
        timestampMs: import("superstruct").Struct<string, null>;
        checkpoint: import("superstruct").Struct<string, null>;
        confirmedLocalExecution: import("superstruct").Struct<boolean, null>;
        objectChanges: import("superstruct").Struct<({
            type: "published";
            packageId: string;
            version: string;
            digest: string;
            modules: string[];
        } | {
            type: "transferred";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        } | {
            type: "mutated";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            previousVersion: string;
        } | {
            type: "deleted";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "wrapped";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "created";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        })[], import("superstruct").Struct<{
            type: "published";
            packageId: string;
            version: string;
            digest: string;
            modules: string[];
        } | {
            type: "transferred";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        } | {
            type: "mutated";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            previousVersion: string;
        } | {
            type: "deleted";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "wrapped";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "created";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        }, null>>;
        balanceChanges: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            coinType: string;
            amount: string;
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            coinType: string;
            amount: string;
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            coinType: import("superstruct").Struct<string, null>;
            amount: import("superstruct").Struct<string, null>;
        }>>;
        errors: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>>;
    nextCursor: import("superstruct").Struct<string, null>;
    hasNextPage: import("superstruct").Struct<boolean, null>;
}>;
export type PaginatedTransactionResponse = Infer<typeof PaginatedTransactionResponse>;
export declare const DryRunTransactionBlockResponse: import("superstruct").Struct<{
    effects: {
        messageVersion: "v1";
        status: {
            status: "success" | "failure";
            error: string;
        };
        executedEpoch: string;
        modifiedAtVersions: {
            objectId: string;
            sequenceNumber: string;
        }[];
        gasUsed: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        sharedObjects: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        transactionDigest: string;
        created: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        mutated: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        unwrapped: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        deleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        unwrappedThenDeleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        wrapped: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        gasObject: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        };
        eventsDigest: string;
        dependencies: string[];
    };
    events: {
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }[];
    objectChanges: ({
        type: "published";
        packageId: string;
        version: string;
        digest: string;
        modules: string[];
    } | {
        type: "transferred";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        recipient: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    } | {
        type: "mutated";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        previousVersion: string;
    } | {
        type: "deleted";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "wrapped";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "created";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    })[];
    balanceChanges: {
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        coinType: string;
        amount: string;
    }[];
    input: {
        sender: string;
        messageVersion: "v1";
        transaction: {
            epoch: string;
            storage_charge: string;
            computation_charge: string;
            storage_rebate: string;
            epoch_start_timestamp_ms: string;
            kind: "ChangeEpoch";
        } | {
            epoch: string;
            round: string;
            commit_timestamp_ms: string;
            kind: "ConsensusCommitPrologue";
        } | {
            objects: string[];
            kind: "Genesis";
        } | {
            transactions: ({
                MoveCall: {
                    function: string;
                    arguments: ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[];
                    type_arguments: string[];
                    package: string;
                    module: string;
                };
            } | {
                TransferObjects: [("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[], "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                SplitCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                MergeCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                Publish: string[] | [{
                    disassembled: Record<string, unknown>;
                }, string[]];
            } | {
                Upgrade: [string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }] | [{
                    disassembled: Record<string, unknown>;
                }, string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                MakeMoveVec: [string, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            })[];
            inputs: ({
                value: SuiJsonValue;
                type: "pure";
                valueType: string;
            } | {
                type: "object";
                objectType: "immOrOwnedObject";
                objectId: string;
                version: string;
                digest: string;
            } | {
                type: "object";
                objectType: "sharedObject";
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
            })[];
            kind: "ProgrammableTransaction";
        };
        gasData: {
            payment: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
        };
    };
}, {
    effects: import("superstruct").Struct<{
        messageVersion: "v1";
        status: {
            status: "success" | "failure";
            error: string;
        };
        executedEpoch: string;
        modifiedAtVersions: {
            objectId: string;
            sequenceNumber: string;
        }[];
        gasUsed: {
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        };
        sharedObjects: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        transactionDigest: string;
        created: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        mutated: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        unwrapped: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[];
        deleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        unwrappedThenDeleted: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        wrapped: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        gasObject: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        };
        eventsDigest: string;
        dependencies: string[];
    }, {
        messageVersion: import("superstruct").Struct<"v1", "v1">;
        /** The status of the execution */
        status: import("superstruct").Struct<{
            status: "success" | "failure";
            error: string;
        }, {
            status: import("superstruct").Struct<"success" | "failure", null>;
            error: import("superstruct").Struct<string, null>;
        }>;
        /** The epoch when this transaction was executed */
        executedEpoch: import("superstruct").Struct<string, null>;
        /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
        modifiedAtVersions: import("superstruct").Struct<{
            objectId: string;
            sequenceNumber: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            sequenceNumber: string;
        }, {
            objectId: import("superstruct").Struct<string, null>;
            sequenceNumber: import("superstruct").Struct<string, null>;
        }>>;
        gasUsed: import("superstruct").Struct<{
            computationCost: string;
            storageCost: string;
            storageRebate: string;
            nonRefundableStorageFee: string;
        }, {
            computationCost: import("superstruct").Struct<string, null>;
            storageCost: import("superstruct").Struct<string, null>;
            storageRebate: import("superstruct").Struct<string, null>;
            nonRefundableStorageFee: import("superstruct").Struct<string, null>;
        }>;
        /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
        sharedObjects: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** The transaction digest */
        transactionDigest: import("superstruct").Struct<string, null>;
        /** ObjectRef and owner of new objects created */
        created: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /** ObjectRef and owner of mutated objects, including gas object */
        mutated: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /**
         * ObjectRef and owner of objects that are unwrapped in this transaction.
         * Unwrapped objects are objects that were wrapped into other objects in the past,
         * and just got extracted out.
         */
        unwrapped: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }[], import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>>;
        /** Object Refs of objects now deleted (the old refs) */
        deleted: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** Object Refs of objects now deleted (the old refs) */
        unwrappedThenDeleted: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /** Object refs of objects now wrapped in other objects */
        wrapped: import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }[], import("superstruct").Struct<{
            objectId: string;
            version: string | number;
            digest: string;
        }, {
            digest: import("superstruct").Struct<string, null>;
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string | number, null>;
        }>>;
        /**
         * The updated gas object reference. Have a dedicated field for convenient access.
         * It's also included in mutated.
         */
        gasObject: import("superstruct").Struct<{
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            reference: {
                objectId: string;
                version: string | number;
                digest: string;
            };
        }, {
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            reference: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>;
        }>;
        /** The events emitted during execution. Note that only successful transactions emit events */
        eventsDigest: import("superstruct").Struct<string, null>;
        /** The set of transaction digests this transaction depends on */
        dependencies: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    events: import("superstruct").Struct<{
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }[], import("superstruct").Struct<{
        type: string;
        id: {
            txDigest: string;
            eventSeq: string;
        };
        packageId: string;
        transactionModule: string;
        sender: string;
        parsedJson: Record<string, any>;
        bcs: string;
        timestampMs: string;
    }, {
        id: import("superstruct").Struct<{
            txDigest: string;
            eventSeq: string;
        }, {
            txDigest: import("superstruct").Struct<string, null>;
            eventSeq: import("superstruct").Struct<string, null>;
        }>;
        packageId: import("superstruct").Struct<string, null>;
        transactionModule: import("superstruct").Struct<string, null>;
        sender: import("superstruct").Struct<string, null>;
        type: import("superstruct").Struct<string, null>;
        parsedJson: import("superstruct").Struct<Record<string, any>, null>;
        bcs: import("superstruct").Struct<string, null>;
        timestampMs: import("superstruct").Struct<string, null>;
    }>>;
    objectChanges: import("superstruct").Struct<({
        type: "published";
        packageId: string;
        version: string;
        digest: string;
        modules: string[];
    } | {
        type: "transferred";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        recipient: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    } | {
        type: "mutated";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        previousVersion: string;
    } | {
        type: "deleted";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "wrapped";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "created";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    })[], import("superstruct").Struct<{
        type: "published";
        packageId: string;
        version: string;
        digest: string;
        modules: string[];
    } | {
        type: "transferred";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        recipient: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    } | {
        type: "mutated";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        previousVersion: string;
    } | {
        type: "deleted";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "wrapped";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
    } | {
        type: "created";
        sender: string;
        objectType: string;
        objectId: string;
        version: string;
        digest: string;
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
    }, null>>;
    balanceChanges: import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        coinType: string;
        amount: string;
    }[], import("superstruct").Struct<{
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable";
        coinType: string;
        amount: string;
    }, {
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        coinType: import("superstruct").Struct<string, null>;
        amount: import("superstruct").Struct<string, null>;
    }>>;
    input: import("superstruct").Struct<{
        sender: string;
        messageVersion: "v1";
        transaction: {
            epoch: string;
            storage_charge: string;
            computation_charge: string;
            storage_rebate: string;
            epoch_start_timestamp_ms: string;
            kind: "ChangeEpoch";
        } | {
            epoch: string;
            round: string;
            commit_timestamp_ms: string;
            kind: "ConsensusCommitPrologue";
        } | {
            objects: string[];
            kind: "Genesis";
        } | {
            transactions: ({
                MoveCall: {
                    function: string;
                    arguments: ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[];
                    type_arguments: string[];
                    package: string;
                    module: string;
                };
            } | {
                TransferObjects: [("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[], "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                SplitCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                MergeCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                Publish: string[] | [{
                    disassembled: Record<string, unknown>;
                }, string[]];
            } | {
                Upgrade: [string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }] | [{
                    disassembled: Record<string, unknown>;
                }, string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                MakeMoveVec: [string, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            })[];
            inputs: ({
                value: SuiJsonValue;
                type: "pure";
                valueType: string;
            } | {
                type: "object";
                objectType: "immOrOwnedObject";
                objectId: string;
                version: string;
                digest: string;
            } | {
                type: "object";
                objectType: "sharedObject";
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
            })[];
            kind: "ProgrammableTransaction";
        };
        gasData: {
            payment: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
        };
    }, {
        messageVersion: import("superstruct").Struct<"v1", "v1">;
        transaction: import("superstruct").Struct<{
            epoch: string;
            storage_charge: string;
            computation_charge: string;
            storage_rebate: string;
            epoch_start_timestamp_ms: string;
            kind: "ChangeEpoch";
        } | {
            epoch: string;
            round: string;
            commit_timestamp_ms: string;
            kind: "ConsensusCommitPrologue";
        } | {
            objects: string[];
            kind: "Genesis";
        } | {
            transactions: ({
                MoveCall: {
                    function: string;
                    arguments: ("GasCoin" | {
                        Input: number;
                    } | {
                        Result: number;
                    } | {
                        NestedResult: [number, number];
                    })[];
                    type_arguments: string[];
                    package: string;
                    module: string;
                };
            } | {
                TransferObjects: [("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[], "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                SplitCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                MergeCoins: ["GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            } | {
                Publish: string[] | [{
                    disassembled: Record<string, unknown>;
                }, string[]];
            } | {
                Upgrade: [string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }] | [{
                    disassembled: Record<string, unknown>;
                }, string[], string, "GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                }];
            } | {
                MakeMoveVec: [string, ("GasCoin" | {
                    Input: number;
                } | {
                    Result: number;
                } | {
                    NestedResult: [number, number];
                })[]];
            })[];
            inputs: ({
                value: SuiJsonValue;
                type: "pure";
                valueType: string;
            } | {
                type: "object";
                objectType: "immOrOwnedObject";
                objectId: string;
                version: string;
                digest: string;
            } | {
                type: "object";
                objectType: "sharedObject";
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
            })[];
            kind: "ProgrammableTransaction";
        }, null>;
        sender: import("superstruct").Struct<string, null>;
        gasData: import("superstruct").Struct<{
            payment: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
        }, {
            payment: import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }[], import("superstruct").Struct<{
                objectId: string;
                version: string | number;
                digest: string;
            }, {
                digest: import("superstruct").Struct<string, null>;
                objectId: import("superstruct").Struct<string, null>;
                version: import("superstruct").Struct<string | number, null>;
            }>>;
            owner: import("superstruct").Struct<string, null>;
            price: import("superstruct").Struct<string, null>;
            budget: import("superstruct").Struct<string, null>;
        }>;
    }>;
}>;
export type DryRunTransactionBlockResponse = Infer<typeof DryRunTransactionBlockResponse>;
export declare function getTransaction(tx: SuiTransactionBlockResponse): SuiTransactionBlock | undefined;
export declare function getTransactionDigest(tx: SuiTransactionBlockResponse): string;
export declare function getTransactionSignature(tx: SuiTransactionBlockResponse): string[] | undefined;
export declare function getTransactionSender(tx: SuiTransactionBlockResponse): string | undefined;
export declare function getGasData(tx: SuiTransactionBlockResponse): SuiGasData | undefined;
export declare function getTransactionGasObject(tx: SuiTransactionBlockResponse): SuiObjectRef[] | undefined;
export declare function getTransactionGasPrice(tx: SuiTransactionBlockResponse): string;
export declare function getTransactionGasBudget(tx: SuiTransactionBlockResponse): string;
export declare function getChangeEpochTransaction(data: SuiTransactionBlockKind): SuiChangeEpoch | undefined;
export declare function getConsensusCommitPrologueTransaction(data: SuiTransactionBlockKind): SuiConsensusCommitPrologue | undefined;
export declare function getTransactionKind(data: SuiTransactionBlockResponse): SuiTransactionBlockKind | undefined;
export declare function getTransactionKindName(data: SuiTransactionBlockKind): TransactionKindName;
export declare function getProgrammableTransaction(data: SuiTransactionBlockKind): ProgrammableTransaction | undefined;
export declare function getExecutionStatusType(data: SuiTransactionBlockResponse): ExecutionStatusType | undefined;
export declare function getExecutionStatus(data: SuiTransactionBlockResponse): ExecutionStatus | undefined;
export declare function getExecutionStatusError(data: SuiTransactionBlockResponse): string | undefined;
export declare function getExecutionStatusGasSummary(data: SuiTransactionBlockResponse | TransactionEffects): GasCostSummary | undefined;
export declare function getTotalGasUsed(data: SuiTransactionBlockResponse | TransactionEffects): bigint | undefined;
export declare function getTotalGasUsedUpperBound(data: SuiTransactionBlockResponse | TransactionEffects): bigint | undefined;
export declare function getTransactionEffects(data: SuiTransactionBlockResponse): TransactionEffects | undefined;
export declare function getEvents(data: SuiTransactionBlockResponse): SuiEvent[] | undefined;
export declare function getCreatedObjects(data: SuiTransactionBlockResponse): OwnedObjectRef[] | undefined;
export declare function getTimestampFromTransactionResponse(data: SuiTransactionBlockResponse): string | undefined;
/**
 * Get the newly created coin refs after a split.
 */
export declare function getNewlyCreatedCoinRefsAfterSplit(data: SuiTransactionBlockResponse): SuiObjectRef[] | undefined;
export declare function getObjectChanges(data: SuiTransactionBlockResponse): SuiObjectChange[] | undefined;
export declare function getPublishedObjectChanges(data: SuiTransactionBlockResponse): SuiObjectChangePublished[];
//# sourceMappingURL=transactions.d.ts.map
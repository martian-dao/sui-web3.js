import type { Infer } from 'superstruct';
import { TransactionType, TransactionBlockInput } from './Transactions';
export declare const TransactionExpiration: import("superstruct").Struct<{
    Epoch: number;
} | {
    None?: any;
}, null>;
export type TransactionExpiration = Infer<typeof TransactionExpiration>;
declare const GasConfig: import("superstruct").Struct<{
    payment: {
        objectId: string;
        version: string | number;
        digest: string;
    }[];
    owner: string;
    price: string;
    budget: string;
}, {
    budget: import("superstruct").Struct<string, null>;
    price: import("superstruct").Struct<string, null>;
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
}>;
type GasConfig = Infer<typeof GasConfig>;
export declare const SerializedTransactionDataBuilder: import("superstruct").Struct<{
    sender: string;
    version: 1;
    transactions: ({
        arguments: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "MoveCall";
        target: `${string}::${string}::${string}`;
        typeArguments: string[];
    } | {
        objects: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "TransferObjects";
        address: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
    } | {
        kind: "SplitCoins";
        coin: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
        amounts: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
    } | {
        kind: "MergeCoins";
        destination: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
        sources: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
    } | {
        type: {
            None?: any;
        } | {
            Some: Record<string, unknown>;
        };
        objects: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "MakeMoveVec";
    } | {
        kind: "Publish";
        dependencies: string[];
        modules: number[][];
    } | {
        packageId: string;
        kind: "Upgrade";
        dependencies: string[];
        modules: number[][];
        ticket: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
    })[];
    inputs: {
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    }[];
    expiration: {
        Epoch: number;
    } | {
        None?: any;
    };
    gasConfig: {
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
    version: import("superstruct").Struct<1, 1>;
    sender: import("superstruct").Struct<string, null>;
    expiration: import("superstruct").Struct<{
        Epoch: number;
    } | {
        None?: any;
    }, null>;
    gasConfig: import("superstruct").Struct<{
        payment: {
            objectId: string;
            version: string | number;
            digest: string;
        }[];
        owner: string;
        price: string;
        budget: string;
    }, {
        budget: import("superstruct").Struct<string, null>;
        price: import("superstruct").Struct<string, null>;
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
    }>;
    inputs: import("superstruct").Struct<{
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    }[], import("superstruct").Struct<{
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    }, {
        kind: import("superstruct").Struct<"Input", "Input">;
        index: import("superstruct").Struct<number, null>;
        value: import("superstruct").Struct<any, null>;
        type: import("superstruct").Struct<"object" | "pure", null>;
    }>>;
    transactions: import("superstruct").Struct<({
        arguments: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "MoveCall";
        target: `${string}::${string}::${string}`;
        typeArguments: string[];
    } | {
        objects: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "TransferObjects";
        address: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
    } | {
        kind: "SplitCoins";
        coin: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
        amounts: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
    } | {
        kind: "MergeCoins";
        destination: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
        sources: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
    } | {
        type: {
            None?: any;
        } | {
            Some: Record<string, unknown>;
        };
        objects: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "MakeMoveVec";
    } | {
        kind: "Publish";
        dependencies: string[];
        modules: number[][];
    } | {
        packageId: string;
        kind: "Upgrade";
        dependencies: string[];
        modules: number[][];
        ticket: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
    })[], import("superstruct").Struct<{
        arguments: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "MoveCall";
        target: `${string}::${string}::${string}`;
        typeArguments: string[];
    } | {
        objects: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "TransferObjects";
        address: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
    } | {
        kind: "SplitCoins";
        coin: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
        amounts: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
    } | {
        kind: "MergeCoins";
        destination: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
        sources: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
    } | {
        type: {
            None?: any;
        } | {
            Some: Record<string, unknown>;
        };
        objects: ({
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        })[];
        kind: "MakeMoveVec";
    } | {
        kind: "Publish";
        dependencies: string[];
        modules: number[][];
    } | {
        packageId: string;
        kind: "Upgrade";
        dependencies: string[];
        modules: number[][];
        ticket: {
            type: "object" | "pure";
            kind: "Input";
            index: number;
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            kind: "Result";
            index: number;
        } | {
            kind: "NestedResult";
            index: number;
            resultIndex: number;
        };
    }, null>>;
}>;
export type SerializedTransactionDataBuilder = Infer<typeof SerializedTransactionDataBuilder>;
export declare class TransactionBlockDataBuilder {
    static fromKindBytes(bytes: Uint8Array): TransactionBlockDataBuilder;
    static fromBytes(bytes: Uint8Array): TransactionBlockDataBuilder;
    static restore(data: SerializedTransactionDataBuilder): TransactionBlockDataBuilder;
    /**
     * Generate transaction digest.
     *
     * @param bytes BCS serialized transaction data
     * @returns transaction digest.
     */
    static getDigestFromBytes(bytes: Uint8Array): string;
    version: 1;
    sender?: string;
    expiration?: TransactionExpiration;
    gasConfig: GasConfig;
    inputs: TransactionBlockInput[];
    transactions: TransactionType[];
    constructor(clone?: SerializedTransactionDataBuilder);
    build({ maxSizeBytes, overrides, onlyTransactionKind, }?: {
        maxSizeBytes?: number;
        overrides?: Pick<Partial<TransactionBlockDataBuilder>, 'sender' | 'gasConfig' | 'expiration'>;
        onlyTransactionKind?: boolean;
    }): Uint8Array;
    getDigest(): string;
    snapshot(): SerializedTransactionDataBuilder;
}
export {};
//# sourceMappingURL=TransactionBlockData.d.ts.map
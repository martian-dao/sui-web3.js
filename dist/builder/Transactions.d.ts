import type { Infer, Struct } from 'superstruct';
export declare const TransactionBlockInput: Struct<{
    type: "object" | "pure";
    kind: "Input";
    index: number;
    value?: any;
}, {
    kind: Struct<"Input", "Input">;
    index: Struct<number, null>;
    value: Struct<any, null>;
    type: Struct<"object" | "pure", null>;
}>;
export type TransactionBlockInput = Infer<typeof TransactionBlockInput>;
export declare const TransactionArgument: Struct<{
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
}, null>;
export type TransactionArgument = Infer<typeof TransactionArgument>;
export declare const ObjectTransactionArgument: Struct<{
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
}, null>;
export declare const PureTransactionArgument: (type: string) => Struct<{
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
}, null>;
export declare const MoveCallTransaction: Struct<{
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
}, {
    kind: Struct<"MoveCall", "MoveCall">;
    target: Struct<`${string}::${string}::${string}`, null>;
    typeArguments: Struct<string[], Struct<string, null>>;
    arguments: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}>;
export type MoveCallTransaction = Infer<typeof MoveCallTransaction>;
export declare const TransferObjectsTransaction: Struct<{
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
}, {
    kind: Struct<"TransferObjects", "TransferObjects">;
    objects: Struct<({
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
    })[], Struct<{
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
    }, null>>;
    address: Struct<{
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
    }, null>;
}>;
export type TransferObjectsTransaction = Infer<typeof TransferObjectsTransaction>;
export declare const SplitCoinsTransaction: Struct<{
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
}, {
    kind: Struct<"SplitCoins", "SplitCoins">;
    coin: Struct<{
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
    }, null>;
    amounts: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}>;
export type SplitCoinsTransaction = Infer<typeof SplitCoinsTransaction>;
export declare const MergeCoinsTransaction: Struct<{
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
}, {
    kind: Struct<"MergeCoins", "MergeCoins">;
    destination: Struct<{
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
    }, null>;
    sources: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}>;
export type MergeCoinsTransaction = Infer<typeof MergeCoinsTransaction>;
export declare const MakeMoveVecTransaction: Struct<{
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
}, {
    kind: Struct<"MakeMoveVec", "MakeMoveVec">;
    type: Struct<{
        None?: any;
    } | {
        Some: Record<string, unknown>;
    }, null>;
    objects: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}>;
export type MakeMoveVecTransaction = Infer<typeof MakeMoveVecTransaction>;
export declare const PublishTransaction: Struct<{
    kind: "Publish";
    dependencies: string[];
    modules: number[][];
}, {
    kind: Struct<"Publish", "Publish">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
}>;
export type PublishTransaction = Infer<typeof PublishTransaction>;
export declare enum UpgradePolicy {
    COMPATIBLE = 0,
    ADDITIVE = 128,
    DEP_ONLY = 192
}
export declare const UpgradeTransaction: Struct<{
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
}, {
    kind: Struct<"Upgrade", "Upgrade">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
    packageId: Struct<string, null>;
    ticket: Struct<{
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
    }, null>;
}>;
export type UpgradeTransaction = Infer<typeof UpgradeTransaction>;
export declare const TransactionType: Struct<{
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
}, null>;
export type TransactionType = Infer<typeof TransactionType>;
export declare function getTransactionType(data: unknown): Struct<{
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
}, {
    kind: Struct<"MoveCall", "MoveCall">;
    target: Struct<`${string}::${string}::${string}`, null>;
    typeArguments: Struct<string[], Struct<string, null>>;
    arguments: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}> | Struct<{
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
}, {
    kind: Struct<"TransferObjects", "TransferObjects">;
    objects: Struct<({
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
    })[], Struct<{
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
    }, null>>;
    address: Struct<{
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
    }, null>;
}> | Struct<{
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
}, {
    kind: Struct<"SplitCoins", "SplitCoins">;
    coin: Struct<{
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
    }, null>;
    amounts: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}> | Struct<{
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
}, {
    kind: Struct<"MergeCoins", "MergeCoins">;
    destination: Struct<{
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
    }, null>;
    sources: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}> | Struct<{
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
}, {
    kind: Struct<"MakeMoveVec", "MakeMoveVec">;
    type: Struct<{
        None?: any;
    } | {
        Some: Record<string, unknown>;
    }, null>;
    objects: Struct<({
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
    })[], Struct<{
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
    }, null>>;
}> | Struct<{
    kind: "Publish";
    dependencies: string[];
    modules: number[][];
}, {
    kind: Struct<"Publish", "Publish">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
}> | Struct<{
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
}, {
    kind: Struct<"Upgrade", "Upgrade">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
    packageId: Struct<string, null>;
    ticket: Struct<{
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
    }, null>;
}>;
/**
 * Simple helpers used to construct transactions:
 */
export declare const Transactions: {
    MoveCall(input: Omit<{
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
    }, "arguments" | "kind" | "typeArguments"> & {
        arguments?: TransactionArgument[];
        typeArguments?: string[];
    }): MoveCallTransaction;
    TransferObjects(objects: TransactionArgument[], address: TransactionArgument): TransferObjectsTransaction;
    SplitCoins(coin: TransactionArgument, amounts: TransactionArgument[]): SplitCoinsTransaction;
    MergeCoins(destination: TransactionArgument, sources: TransactionArgument[]): MergeCoinsTransaction;
    Publish({ modules, dependencies, }: {
        modules: number[][] | string[];
        dependencies: string[];
    }): PublishTransaction;
    Upgrade({ modules, dependencies, packageId, ticket, }: {
        modules: number[][] | string[];
        dependencies: string[];
        packageId: string;
        ticket: TransactionArgument;
    }): UpgradeTransaction;
    MakeMoveVec({ type, objects, }: Omit<{
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
    }, "type" | "kind"> & {
        type?: string;
    }): MakeMoveVecTransaction;
};
//# sourceMappingURL=Transactions.d.ts.map
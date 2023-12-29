import type { JsonRpcProvider } from '../providers/json-rpc-provider';
import { SuiObjectRef } from '../types/index';
import type { TransactionArgument, TransactionType } from './Transactions';
import { Transactions } from './Transactions';
import type { ObjectCallArg } from './Inputs';
import { Inputs } from './Inputs';
import type { TransactionExpiration } from './TransactionBlockData';
import type { ProtocolConfig, SuiClient } from '../client/index';
import type { Keypair, SignatureWithBytes } from '../cryptography/index';
type TransactionResult = TransactionArgument & TransactionArgument[];
declare const TRANSACTION_BRAND: unique symbol;
declare const LIMITS: {
    readonly maxTxGas: "max_tx_gas";
    readonly maxGasObjects: "max_gas_payment_objects";
    readonly maxTxSizeBytes: "max_tx_size_bytes";
    readonly maxPureArgumentSize: "max_pure_argument_size";
};
type Limits = Partial<Record<keyof typeof LIMITS, number>>;
interface BuildOptions {
    /**
     * @deprecated Use `client` instead.
     */
    provider?: JsonRpcProvider | SuiClient;
    client?: SuiClient | JsonRpcProvider;
    onlyTransactionKind?: boolean;
    /** Define a protocol config to build against, instead of having it fetched from the provider at build time. */
    protocolConfig?: ProtocolConfig;
    /** Define limits that are used when building the transaction. In general, we recommend using the protocol configuration instead of defining limits. */
    limits?: Limits;
}
interface SignOptions extends BuildOptions {
    signer: Keypair;
}
export declare function isTransactionBlock(obj: unknown): obj is TransactionBlock;
/**
 * Transaction Builder
 */
export declare class TransactionBlock {
    #private;
    /** Returns `true` if the object is an instance of the Transaction builder class.
     * @deprecated Use `isTransactionBlock` from `@mysten/sui.js/transactions` instead.
     */
    static is(obj: unknown): obj is TransactionBlock;
    /**
     * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
     * Supports either a byte array, or base64-encoded bytes.
     */
    static fromKind(serialized: string | Uint8Array): TransactionBlock;
    /**
     * Converts from a serialized transaction format to a `Transaction` class.
     * There are two supported serialized formats:
     * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
     * - A byte array (or base64-encoded bytes) containing BCS transaction data.
     */
    static from(serialized: string | Uint8Array): TransactionBlock;
    /**
     * A helper to retrieve the Transaction builder `Transactions`
     * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Transactions` from `@mysten/sui.js/transactions`.
     */
    static get Transactions(): {
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
            arguments?: ({
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
            typeArguments?: string[];
        }): {
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
        };
        TransferObjects(objects: ({
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
        })[], address: {
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
        }): {
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
        };
        SplitCoins(coin: {
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
        }, amounts: ({
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
        })[]): {
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
        };
        MergeCoins(destination: {
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
        }, sources: ({
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
        })[]): {
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
        };
        Publish({ modules, dependencies, }: {
            modules: string[] | number[][];
            dependencies: string[];
        }): {
            kind: "Publish";
            dependencies: string[];
            modules: number[][];
        };
        Upgrade({ modules, dependencies, packageId, ticket, }: {
            modules: string[] | number[][];
            dependencies: string[];
            packageId: string;
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
        }): {
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
        };
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
        }): {
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
        };
    };
    /**
     * A helper to retrieve the Transaction builder `Inputs`
     * * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Inputs` from `@mysten/sui.js/transactions`.
     */
    static get Inputs(): {
        Pure(data: unknown, type?: string): {
            Pure: number[];
        };
        ObjectRef({ objectId, digest, version }: {
            objectId: string;
            version: string | number;
            digest: string;
        }): {
            Object: {
                ImmOrOwned: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            } | {
                Shared: {
                    objectId: string;
                    initialSharedVersion: string | number;
                    mutable: boolean;
                };
            };
        };
        SharedObjectRef({ objectId, mutable, initialSharedVersion, }: import("..").SharedObjectRef): {
            Object: {
                ImmOrOwned: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            } | {
                Shared: {
                    objectId: string;
                    initialSharedVersion: string | number;
                    mutable: boolean;
                };
            };
        };
    };
    setSender(sender: string): void;
    /**
     * Sets the sender only if it has not already been set.
     * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
     */
    setSenderIfNotSet(sender: string): void;
    setExpiration(expiration?: TransactionExpiration): void;
    setGasPrice(price: number | bigint): void;
    setGasBudget(budget: number | bigint): void;
    setGasOwner(owner: string): void;
    setGasPayment(payments: SuiObjectRef[]): void;
    /** Get a snapshot of the transaction data, in JSON form: */
    get blockData(): {
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
    };
    get [TRANSACTION_BRAND](): boolean;
    constructor(transaction?: TransactionBlock);
    /** Returns an argument for the gas coin, to be used in a transaction. */
    get gas(): TransactionArgument;
    /**
     * Add a new object input to the transaction.
     */
    object(value: string | ObjectCallArg): {
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    };
    /**
     * Add a new object input to the transaction using the fully-resolved object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    objectRef(...args: Parameters<(typeof Inputs)['ObjectRef']>): {
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    };
    /**
     * Add a new shared object input to the transaction using the fully-resolved shared object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    sharedObjectRef(...args: Parameters<(typeof Inputs)['SharedObjectRef']>): {
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    };
    /**
     * Add a new non-object input to the transaction.
     */
    pure(
    /**
     * The pure value that will be used as the input value. If this is a Uint8Array, then the value
     * is assumed to be raw bytes, and will be used directly.
     */
    value: unknown, 
    /**
     * The BCS type to serialize the value into. If not provided, the type will automatically be determined
     * based on how the input is used.
     */
    type?: string): {
        type: "object" | "pure";
        kind: "Input";
        index: number;
        value?: any;
    };
    /** Add a transaction to the transaction block. */
    add(transaction: TransactionType): TransactionResult;
    splitCoins(...args: Parameters<(typeof Transactions)['SplitCoins']>): TransactionResult;
    mergeCoins(...args: Parameters<(typeof Transactions)['MergeCoins']>): TransactionResult;
    publish(...args: Parameters<(typeof Transactions)['Publish']>): TransactionResult;
    upgrade(...args: Parameters<(typeof Transactions)['Upgrade']>): TransactionResult;
    moveCall(...args: Parameters<(typeof Transactions)['MoveCall']>): TransactionResult;
    transferObjects(...args: Parameters<(typeof Transactions)['TransferObjects']>): TransactionResult;
    makeMoveVec(...args: Parameters<(typeof Transactions)['MakeMoveVec']>): TransactionResult;
    /**
     * Serialize the transaction to a string so that it can be sent to a separate context.
     * This is different from `build` in that it does not serialize to BCS bytes, and instead
     * uses a separate format that is unique to the transaction builder. This allows
     * us to serialize partially-complete transactions, that can then be completed and
     * built in a separate context.
     *
     * For example, a dapp can construct a transaction, but not provide gas objects
     * or a gas budget. The transaction then can be sent to the wallet, where this
     * information is automatically filled in (e.g. by querying for coin objects
     * and performing a dry run).
     */
    serialize(): string;
    /** Build the transaction to BCS bytes, and sign it with the provided keypair. */
    sign(options: SignOptions): Promise<SignatureWithBytes>;
    /** Build the transaction to BCS bytes. */
    build(options?: BuildOptions): Promise<Uint8Array>;
    /** Derive transaction digest */
    getDigest(options?: {
        /**
         * @deprecated Use `client` instead.
         */
        provider?: JsonRpcProvider | SuiClient;
        client?: SuiClient;
    }): Promise<string>;
}
export {};
//# sourceMappingURL=TransactionBlock.d.ts.map
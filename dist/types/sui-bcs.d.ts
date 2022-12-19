import { BCS } from '@mysten/bcs';
import { Base64DataBuffer } from '../serialization/base64';
import { SuiObjectRef } from './objects';
declare const bcs: BCS;
/**
 * Transaction type used for transferring objects.
 * For this transaction to be executed, and `SuiObjectRef` should be queried
 * upfront and used as a parameter.
 */
export declare type TransferObjectTx = {
    TransferObject: {
        recipient: string;
        object_ref: SuiObjectRef;
    };
};
/**
 * Transaction type used for transferring Sui.
 */
export declare type TransferSuiTx = {
    TransferSui: {
        recipient: string;
        amount: {
            Some: number;
        } | {
            None: null;
        };
    };
};
/**
 * Transaction type used for Pay transaction.
 */
export declare type PayTx = {
    Pay: {
        coins: SuiObjectRef[];
        recipients: string[];
        amounts: number[];
    };
};
export declare type PaySuiTx = {
    PaySui: {
        coins: SuiObjectRef[];
        recipients: string[];
        amounts: number[];
    };
};
export declare type PayAllSuiTx = {
    PayAllSui: {
        coins: SuiObjectRef[];
        recipient: string;
    };
};
/**
 * Transaction type used for publishing Move modules to the Sui.
 * Should be already compiled using `sui-move`, example:
 * ```
 * $ sui-move build
 * $ cat build/project_name/bytecode_modules/module.mv
 * ```
 * In JS:
 * ```
 * let file = fs.readFileSync('./move/build/project_name/bytecode_modules/module.mv');
 * let bytes = Array.from(bytes);
 * let modules = [ bytes ];
 *
 * // ... publish logic ...
 * ```
 *
 * Each module should be represented as a sequence of bytes.
 */
export declare type PublishTx = {
    Publish: {
        modules: ArrayLike<ArrayLike<number>>;
    };
};
/**
 * A reference to a shared object.
 */
export declare type SharedObjectRef = {
    /** Hex code as string representing the object id */
    objectId: string;
    /** The version the object was shared at */
    initialSharedVersion: number;
};
/**
 * An object argument.
 */
export declare type ObjectArg = {
    ImmOrOwned: SuiObjectRef;
} | {
    Shared: SharedObjectRef;
};
/**
 * An argument for the transaction. It is a 'meant' enum which expects to have
 * one of the optional properties. If not, the BCS error will be thrown while
 * attempting to form a transaction.
 *
 * Example:
 * ```js
 * let arg1: CallArg = { Object: { Shared: {
 *   objectId: '5460cf92b5e3e7067aaace60d88324095fd22944',
 *   initialSharedVersion: 1,
 * } } };
 * let arg2: CallArg = { Pure: bcs.set(bcs.STRING, 100000).toBytes() };
 * let arg3: CallArg = { Object: { ImmOrOwned: {
 *   objectId: '4047d2e25211d87922b6650233bd0503a6734279',
 *   version: 1,
 *   digest: 'bCiANCht4O9MEUhuYjdRCqRPZjr2rJ8MfqNiwyhmRgA='
 * } } };
 * ```
 *
 * For `Pure` arguments BCS is required. You must encode the values with BCS according
 * to the type required by the called function. Pure accepts only serialized values
 */
export declare type CallArg = {
    Pure: ArrayLike<number>;
} | {
    Object: ObjectArg;
} | {
    ObjVec: ArrayLike<ObjectArg>;
};
/**
 * Kind of a TypeTag which is represented by a Move type identifier.
 */
export declare type StructTag = {
    address: string;
    module: string;
    name: string;
    typeParams: TypeTag[];
};
/**
 * Sui TypeTag object. A decoupled `0x...::module::Type<???>` parameter.
 */
export declare type TypeTag = {
    bool: null;
} | {
    u8: null;
} | {
    u64: null;
} | {
    u128: null;
} | {
    address: null;
} | {
    signer: null;
} | {
    vector: TypeTag;
} | {
    struct: StructTag;
} | {
    u16: null;
} | {
    u32: null;
} | {
    u256: null;
};
/**
 * Transaction type used for calling Move modules' functions.
 * Should be crafted carefully, because the order of type parameters and
 * arguments matters.
 */
export declare type MoveCallTx = {
    Call: {
        package: SuiObjectRef;
        module: string;
        function: string;
        typeArguments: TypeTag[];
        arguments: CallArg[];
    };
};
export declare type Transaction = MoveCallTx | PayTx | PaySuiTx | PayAllSuiTx | PublishTx | TransferObjectTx | TransferSuiTx;
/**
 * Transaction kind - either Batch or Single.
 *
 * Can be improved to change serialization automatically based on
 * the passed value (single Transaction or an array).
 */
export declare type TransactionKind = {
    Single: Transaction;
} | {
    Batch: Transaction[];
};
/**
 * The TransactionData to be signed and sent to the RPC service.
 *
 * Field `sender` is made optional as it can be added during the signing
 * process and there's no need to define it sooner.
 */
export declare type TransactionData = {
    sender?: string;
    gasBudget: number;
    gasPrice: number;
    kind: TransactionKind;
    gasPayment: SuiObjectRef;
};
export declare const TRANSACTION_DATA_TYPE_TAG: number[];
export declare function deserializeTransactionBytesToTransactionData(useIntentSigning: boolean, bytes: Base64DataBuffer): TransactionData;
export { bcs };
//# sourceMappingURL=sui-bcs.d.ts.map
"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TransactionBlock_instances, _TransactionBlock_blockData, _TransactionBlock_input, _TransactionBlock_getConfig, _TransactionBlock_validate, _TransactionBlock_prepareGasPayment, _TransactionBlock_prepareGasPrice, _TransactionBlock_prepareTransactions, _TransactionBlock_prepare;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBlock = exports.isTransactionBlock = void 0;
const bcs_1 = require("@mysten/bcs");
const superstruct_1 = require("superstruct");
const index_1 = require("../types/index");
const Transactions_1 = require("./Transactions");
const Inputs_1 = require("./Inputs");
const serializer_1 = require("./serializer");
const TransactionBlockData_1 = require("./TransactionBlockData");
const utils_1 = require("./utils");
const sui_types_1 = require("../utils/sui-types");
const framework_1 = require("../framework/framework");
const DefaultOfflineLimits = {
    maxPureArgumentSize: 16 * 1024,
    maxTxGas: 50000000000,
    maxGasObjects: 256,
    maxTxSizeBytes: 128 * 1024,
};
function createTransactionResult(index) {
    const baseResult = { kind: 'Result', index };
    const nestedResults = [];
    const nestedResultFor = (resultIndex) => (nestedResults[resultIndex] ?? (nestedResults[resultIndex] = {
        kind: 'NestedResult',
        index,
        resultIndex,
    }));
    return new Proxy(baseResult, {
        set() {
            throw new Error('The transaction result is a proxy, and does not support setting properties directly');
        },
        // TODO: Instead of making this return a concrete argument, we should ideally
        // make it reference-based (so that this gets resolved at build-time), which
        // allows re-ordering transactions.
        get(target, property) {
            // This allows this transaction argument to be used in the singular form:
            if (property in target) {
                return Reflect.get(target, property);
            }
            // Support destructuring:
            if (property === Symbol.iterator) {
                return function* () {
                    let i = 0;
                    while (true) {
                        yield nestedResultFor(i);
                        i++;
                    }
                };
            }
            if (typeof property === 'symbol')
                return;
            const resultIndex = parseInt(property, 10);
            if (Number.isNaN(resultIndex) || resultIndex < 0)
                return;
            return nestedResultFor(resultIndex);
        },
    });
}
function expectClient(options) {
    if (!options.client && !options.provider) {
        throw new Error(`No provider passed to Transaction#build, but transaction data was not sufficient to build offline.`);
    }
    return (options.client ?? options.provider);
}
const TRANSACTION_BRAND = Symbol.for('@mysten/transaction');
const LIMITS = {
    // The maximum gas that is allowed.
    maxTxGas: 'max_tx_gas',
    // The maximum number of gas objects that can be selected for one transaction.
    maxGasObjects: 'max_gas_payment_objects',
    // The maximum size (in bytes) that the transaction can be:
    maxTxSizeBytes: 'max_tx_size_bytes',
    // The maximum size (in bytes) that pure arguments can be:
    maxPureArgumentSize: 'max_pure_argument_size',
};
// An amount of gas (in gas units) that is added to transactions as an overhead to ensure transactions do not fail.
const GAS_SAFE_OVERHEAD = 1000n;
// The maximum objects that can be fetched at once using multiGetObjects.
const MAX_OBJECTS_PER_FETCH = 50;
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
function isTransactionBlock(obj) {
    return (!!obj && typeof obj === 'object' && obj[TRANSACTION_BRAND] === true);
}
exports.isTransactionBlock = isTransactionBlock;
/**
 * Transaction Builder
 */
class TransactionBlock {
    /** Returns `true` if the object is an instance of the Transaction builder class.
     * @deprecated Use `isTransactionBlock` from `@mysten/sui.js/transactions` instead.
     */
    static is(obj) {
        return (!!obj &&
            typeof obj === 'object' &&
            obj[TRANSACTION_BRAND] === true);
    }
    /**
     * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
     * Supports either a byte array, or base64-encoded bytes.
     */
    static fromKind(serialized) {
        const tx = new TransactionBlock();
        __classPrivateFieldSet(tx, _TransactionBlock_blockData, TransactionBlockData_1.TransactionBlockDataBuilder.fromKindBytes(typeof serialized === 'string' ? (0, bcs_1.fromB64)(serialized) : serialized), "f");
        return tx;
    }
    /**
     * Converts from a serialized transaction format to a `Transaction` class.
     * There are two supported serialized formats:
     * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
     * - A byte array (or base64-encoded bytes) containing BCS transaction data.
     */
    static from(serialized) {
        const tx = new TransactionBlock();
        // Check for bytes:
        if (typeof serialized !== 'string' || !serialized.startsWith('{')) {
            __classPrivateFieldSet(tx, _TransactionBlock_blockData, TransactionBlockData_1.TransactionBlockDataBuilder.fromBytes(typeof serialized === 'string' ? (0, bcs_1.fromB64)(serialized) : serialized), "f");
        }
        else {
            __classPrivateFieldSet(tx, _TransactionBlock_blockData, TransactionBlockData_1.TransactionBlockDataBuilder.restore(JSON.parse(serialized)), "f");
        }
        return tx;
    }
    /**
     * A helper to retrieve the Transaction builder `Transactions`
     * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Transactions` from `@mysten/sui.js/transactions`.
     */
    static get Transactions() {
        return Transactions_1.Transactions;
    }
    /**
     * A helper to retrieve the Transaction builder `Inputs`
     * * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Inputs` from `@mysten/sui.js/transactions`.
     */
    static get Inputs() {
        return Inputs_1.Inputs;
    }
    setSender(sender) {
        __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").sender = sender;
    }
    /**
     * Sets the sender only if it has not already been set.
     * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
     */
    setSenderIfNotSet(sender) {
        if (!__classPrivateFieldGet(this, _TransactionBlock_blockData, "f").sender) {
            __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").sender = sender;
        }
    }
    setExpiration(expiration) {
        __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").expiration = expiration;
    }
    setGasPrice(price) {
        __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.price = String(price);
    }
    setGasBudget(budget) {
        __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.budget = String(budget);
    }
    setGasOwner(owner) {
        __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.owner = owner;
    }
    setGasPayment(payments) {
        __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.payment = payments.map((payment) => (0, superstruct_1.mask)(payment, index_1.SuiObjectRef));
    }
    /** Get a snapshot of the transaction data, in JSON form: */
    get blockData() {
        return __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").snapshot();
    }
    // Used to brand transaction classes so that they can be identified, even between multiple copies
    // of the builder.
    get [(_TransactionBlock_blockData = new WeakMap(), _TransactionBlock_instances = new WeakSet(), TRANSACTION_BRAND)]() {
        return true;
    }
    constructor(transaction) {
        _TransactionBlock_instances.add(this);
        _TransactionBlock_blockData.set(this, void 0);
        __classPrivateFieldSet(this, _TransactionBlock_blockData, new TransactionBlockData_1.TransactionBlockDataBuilder(transaction ? transaction.blockData : undefined), "f");
    }
    /** Returns an argument for the gas coin, to be used in a transaction. */
    get gas() {
        return { kind: 'GasCoin' };
    }
    /**
     * Add a new object input to the transaction.
     */
    object(value) {
        const id = (0, Inputs_1.getIdFromCallArg)(value);
        // deduplicate
        const inserted = __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").inputs.find((i) => i.type === 'object' && id === (0, Inputs_1.getIdFromCallArg)(i.value));
        return inserted ?? __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_input).call(this, 'object', value);
    }
    /**
     * Add a new object input to the transaction using the fully-resolved object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    objectRef(...args) {
        return this.object(Inputs_1.Inputs.ObjectRef(...args));
    }
    /**
     * Add a new shared object input to the transaction using the fully-resolved shared object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    sharedObjectRef(...args) {
        return this.object(Inputs_1.Inputs.SharedObjectRef(...args));
    }
    /**
     * Add a new non-object input to the transaction.
     */
    pure(
    /**
     * The pure value that will be used as the input value. If this is a Uint8Array, then the value
     * is assumed to be raw bytes, and will be used directly.
     */
    value, 
    /**
     * The BCS type to serialize the value into. If not provided, the type will automatically be determined
     * based on how the input is used.
     */
    type) {
        // TODO: we can also do some deduplication here
        return __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_input).call(this, 'pure', value instanceof Uint8Array
            ? Inputs_1.Inputs.Pure(value)
            : type
                ? Inputs_1.Inputs.Pure(value, type)
                : value);
    }
    /** Add a transaction to the transaction block. */
    add(transaction) {
        const index = __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").transactions.push(transaction);
        return createTransactionResult(index - 1);
    }
    // Method shorthands:
    splitCoins(...args) {
        return this.add(Transactions_1.Transactions.SplitCoins(...args));
    }
    mergeCoins(...args) {
        return this.add(Transactions_1.Transactions.MergeCoins(...args));
    }
    publish(...args) {
        return this.add(Transactions_1.Transactions.Publish(...args));
    }
    upgrade(...args) {
        return this.add(Transactions_1.Transactions.Upgrade(...args));
    }
    moveCall(...args) {
        return this.add(Transactions_1.Transactions.MoveCall(...args));
    }
    transferObjects(...args) {
        return this.add(Transactions_1.Transactions.TransferObjects(...args));
    }
    makeMoveVec(...args) {
        return this.add(Transactions_1.Transactions.MakeMoveVec(...args));
    }
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
    serialize() {
        return JSON.stringify(__classPrivateFieldGet(this, _TransactionBlock_blockData, "f").snapshot());
    }
    /** Build the transaction to BCS bytes, and sign it with the provided keypair. */
    async sign(options) {
        const { signer, ...buildOptions } = options;
        const bytes = await this.build(buildOptions);
        return signer.signTransactionBlock(bytes);
    }
    /** Build the transaction to BCS bytes. */
    async build(options = {}) {
        await __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_prepare).call(this, options);
        return __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").build({
            maxSizeBytes: __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_getConfig).call(this, 'maxTxSizeBytes', options),
            onlyTransactionKind: options.onlyTransactionKind,
        });
    }
    /** Derive transaction digest */
    async getDigest(options = {}) {
        await __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_prepare).call(this, options);
        return __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").getDigest();
    }
}
exports.TransactionBlock = TransactionBlock;
_TransactionBlock_input = function _TransactionBlock_input(type, value) {
    const index = __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").inputs.length;
    const input = (0, utils_1.create)({
        kind: 'Input',
        // bigints can't be serialized to JSON, so just string-convert them here:
        value: typeof value === 'bigint' ? String(value) : value,
        index,
        type,
    }, Transactions_1.TransactionBlockInput);
    __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").inputs.push(input);
    return input;
}, _TransactionBlock_getConfig = function _TransactionBlock_getConfig(key, { protocolConfig, limits }) {
    // Use the limits definition if that exists:
    if (limits && typeof limits[key] === 'number') {
        return limits[key];
    }
    if (!protocolConfig) {
        return DefaultOfflineLimits[key];
    }
    // Fallback to protocol config:
    const attribute = protocolConfig?.attributes[LIMITS[key]];
    if (!attribute) {
        throw new Error(`Missing expected protocol config: "${LIMITS[key]}"`);
    }
    const value = 'u64' in attribute
        ? attribute.u64
        : 'u32' in attribute
            ? attribute.u32
            : attribute.f64;
    if (!value) {
        throw new Error(`Unexpected protocol config value found for: "${LIMITS[key]}"`);
    }
    // NOTE: Technically this is not a safe conversion, but we know all of the values in protocol config are safe
    return Number(value);
}, _TransactionBlock_validate = function _TransactionBlock_validate(options) {
    const maxPureArgumentSize = __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_getConfig).call(this, 'maxPureArgumentSize', options);
    // Validate all inputs are the correct size:
    __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").inputs.forEach((input, index) => {
        if ((0, superstruct_1.is)(input.value, Inputs_1.PureCallArg)) {
            if (input.value.Pure.length > maxPureArgumentSize) {
                throw new Error(`Input at index ${index} is too large, max pure input size is ${maxPureArgumentSize} bytes, got ${input.value.Pure.length} bytes`);
            }
        }
    });
}, _TransactionBlock_prepareGasPayment = 
// The current default is just picking _all_ coins we can which may not be ideal.
async function _TransactionBlock_prepareGasPayment(options) {
    if (__classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.payment) {
        const maxGasObjects = __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_getConfig).call(this, 'maxGasObjects', options);
        if (__classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.payment.length > maxGasObjects) {
            throw new Error(`Payment objects exceed maximum amount: ${maxGasObjects}`);
        }
    }
    // Early return if the payment is already set:
    if (options.onlyTransactionKind || __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.payment) {
        return;
    }
    const gasOwner = __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.owner ?? __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").sender;
    const coins = await expectClient(options).getCoins({
        owner: gasOwner,
        coinType: framework_1.SUI_TYPE_ARG,
    });
    const paymentCoins = coins.data
        // Filter out coins that are also used as input:
        .filter((coin) => {
        const matchingInput = __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").inputs.find((input) => {
            if ((0, superstruct_1.is)(input.value, Inputs_1.BuilderCallArg) &&
                'Object' in input.value &&
                'ImmOrOwned' in input.value.Object) {
                return coin.coinObjectId === input.value.Object.ImmOrOwned.objectId;
            }
            return false;
        });
        return !matchingInput;
    })
        .slice(0, __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_getConfig).call(this, 'maxGasObjects', options) - 1)
        .map((coin) => ({
        objectId: coin.coinObjectId,
        digest: coin.digest,
        version: coin.version,
    }));
    if (!paymentCoins.length) {
        throw new Error('No valid gas coins found for the transaction.');
    }
    this.setGasPayment(paymentCoins);
}, _TransactionBlock_prepareGasPrice = async function _TransactionBlock_prepareGasPrice(options) {
    if (options.onlyTransactionKind || __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.price) {
        return;
    }
    this.setGasPrice(await expectClient(options).getReferenceGasPrice());
}, _TransactionBlock_prepareTransactions = async function _TransactionBlock_prepareTransactions(options) {
    const { inputs, transactions } = __classPrivateFieldGet(this, _TransactionBlock_blockData, "f");
    const moveModulesToResolve = [];
    // Keep track of the object references that will need to be resolved at the end of the transaction.
    // We keep the input by-reference to avoid needing to re-resolve it:
    const objectsToResolve = [];
    transactions.forEach((transaction) => {
        // Special case move call:
        if (transaction.kind === 'MoveCall') {
            // Determine if any of the arguments require encoding.
            // - If they don't, then this is good to go.
            // - If they do, then we need to fetch the normalized move module.
            const needsResolution = transaction.arguments.some((arg) => arg.kind === 'Input' &&
                !(0, superstruct_1.is)(inputs[arg.index].value, Inputs_1.BuilderCallArg));
            if (needsResolution) {
                moveModulesToResolve.push(transaction);
            }
            return;
        }
        // Get the matching struct definition for the transaction, and use it to attempt to automatically
        // encode the matching inputs.
        const transactionType = (0, Transactions_1.getTransactionType)(transaction);
        if (!transactionType.schema)
            return;
        Object.entries(transaction).forEach(([key, value]) => {
            if (key === 'kind')
                return;
            const keySchema = transactionType.schema[key];
            const isArray = keySchema.type === 'array';
            const wellKnownEncoding = isArray
                ? keySchema.schema[utils_1.TRANSACTION_TYPE]
                : keySchema[utils_1.TRANSACTION_TYPE];
            // This argument has unknown encoding, assume it must be fully-encoded:
            if (!wellKnownEncoding)
                return;
            const encodeInput = (index) => {
                const input = inputs[index];
                if (!input) {
                    throw new Error(`Missing input ${value.index}`);
                }
                // Input is fully resolved:
                if ((0, superstruct_1.is)(input.value, Inputs_1.BuilderCallArg))
                    return;
                if (wellKnownEncoding.kind === 'object' &&
                    typeof input.value === 'string') {
                    // The input is a string that we need to resolve to an object reference:
                    objectsToResolve.push({ id: input.value, input });
                }
                else if (wellKnownEncoding.kind === 'pure') {
                    // Pure encoding, so construct BCS bytes:
                    input.value = Inputs_1.Inputs.Pure(input.value, wellKnownEncoding.type);
                }
                else {
                    throw new Error('Unexpected input format.');
                }
            };
            if (isArray) {
                value.forEach((arrayItem) => {
                    if (arrayItem.kind !== 'Input')
                        return;
                    encodeInput(arrayItem.index);
                });
            }
            else {
                if (value.kind !== 'Input')
                    return;
                encodeInput(value.index);
            }
        });
    });
    if (moveModulesToResolve.length) {
        await Promise.all(moveModulesToResolve.map(async (moveCall) => {
            const [packageId, moduleName, functionName] = moveCall.target.split('::');
            const normalized = await expectClient(options).getNormalizedMoveFunction({
                package: (0, sui_types_1.normalizeSuiObjectId)(packageId),
                module: moduleName,
                function: functionName,
            });
            // Entry functions can have a mutable reference to an instance of the TxContext
            // struct defined in the TxContext module as the last parameter. The caller of
            // the function does not need to pass it in as an argument.
            const hasTxContext = normalized.parameters.length > 0 &&
                (0, serializer_1.isTxContext)(normalized.parameters.at(-1));
            const params = hasTxContext
                ? normalized.parameters.slice(0, normalized.parameters.length - 1)
                : normalized.parameters;
            if (params.length !== moveCall.arguments.length) {
                throw new Error('Incorrect number of arguments.');
            }
            params.forEach((param, i) => {
                const arg = moveCall.arguments[i];
                if (arg.kind !== 'Input')
                    return;
                const input = inputs[arg.index];
                // Skip if the input is already resolved
                if ((0, superstruct_1.is)(input.value, Inputs_1.BuilderCallArg))
                    return;
                const inputValue = input.value;
                const serType = (0, serializer_1.getPureSerializationType)(param, inputValue);
                if (serType) {
                    input.value = Inputs_1.Inputs.Pure(inputValue, serType);
                    return;
                }
                const structVal = (0, index_1.extractStructTag)(param);
                if (structVal != null ||
                    (typeof param === 'object' && 'TypeParameter' in param)) {
                    if (typeof inputValue !== 'string') {
                        throw new Error(`Expect the argument to be an object id string, got ${JSON.stringify(inputValue, null, 2)}`);
                    }
                    objectsToResolve.push({
                        id: inputValue,
                        input,
                        normalizedType: param,
                    });
                    return;
                }
                throw new Error(`Unknown call arg type ${JSON.stringify(param, null, 2)} for value ${JSON.stringify(inputValue, null, 2)}`);
            });
        }));
    }
    if (objectsToResolve.length) {
        const dedupedIds = [...new Set(objectsToResolve.map(({ id }) => id))];
        const objectChunks = chunk(dedupedIds, MAX_OBJECTS_PER_FETCH);
        const objects = (await Promise.all(objectChunks.map((chunk) => expectClient(options).multiGetObjects({
            ids: chunk,
            // @ts-ignore
            options: { showOwner: true },
        })))).flat();
        let objectsById = new Map(dedupedIds.map((id, index) => {
            return [id, objects[index]];
        }));
        const invalidObjects = Array.from(objectsById)
            .filter(([_, obj]) => obj.error)
            .map(([id, _]) => id);
        if (invalidObjects.length) {
            throw new Error(`The following input objects are invalid: ${invalidObjects.join(', ')}`);
        }
        objectsToResolve.forEach(({ id, input, normalizedType }) => {
            const object = objectsById.get(id);
            const owner = object.data?.owner;
            const initialSharedVersion = owner && typeof owner === 'object' && 'Shared' in owner
                ? owner.Shared.initial_shared_version
                : undefined;
            if (initialSharedVersion) {
                // There could be multiple transactions that reference the same shared object.
                // If one of them is a mutable reference, then we should mark the input
                // as mutable.
                const mutable = (0, Inputs_1.isMutableSharedObjectInput)(input.value) ||
                    (normalizedType != null &&
                        (0, index_1.extractMutableReference)(normalizedType) != null);
                input.value = Inputs_1.Inputs.SharedObjectRef({
                    objectId: id,
                    initialSharedVersion,
                    mutable,
                });
            }
            else {
                input.value = Inputs_1.Inputs.ObjectRef((0, index_1.getObjectReference)(object));
            }
        });
    }
}, _TransactionBlock_prepare = 
/**
 * Prepare the transaction by valdiating the transaction data and resolving all inputs
 * so that it can be built into bytes.
 */
async function _TransactionBlock_prepare(options) {
    if (!options.onlyTransactionKind && !__classPrivateFieldGet(this, _TransactionBlock_blockData, "f").sender) {
        throw new Error('Missing transaction sender');
    }
    const client = options.client || options.provider;
    if (!options.protocolConfig && !options.limits && client) {
        options.protocolConfig = await client.getProtocolConfig();
    }
    await Promise.all([
        __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_prepareGasPrice).call(this, options),
        __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_prepareTransactions).call(this, options),
    ]);
    if (!options.onlyTransactionKind) {
        await __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_prepareGasPayment).call(this, options);
        if (!__classPrivateFieldGet(this, _TransactionBlock_blockData, "f").gasConfig.budget) {
            const dryRunResult = await expectClient(options).dryRunTransactionBlock({
                transactionBlock: __classPrivateFieldGet(this, _TransactionBlock_blockData, "f").build({
                    maxSizeBytes: __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_getConfig).call(this, 'maxTxSizeBytes', options),
                    overrides: {
                        // @ts-ignore
                        gasConfig: {
                            budget: String(__classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_getConfig).call(this, 'maxTxGas', options)),
                            payment: [],
                        },
                    },
                }),
            });
            if (dryRunResult.effects.status.status !== 'success') {
                throw new Error(`Dry run failed, could not automatically determine a budget: ${dryRunResult.effects.status.error}`, 
                // @ts-ignore
                { cause: dryRunResult });
            }
            const safeOverhead = GAS_SAFE_OVERHEAD * BigInt(this.blockData.gasConfig.price || 1n);
            const baseComputationCostWithOverhead = BigInt(dryRunResult.effects.gasUsed.computationCost) + safeOverhead;
            const gasBudget = baseComputationCostWithOverhead +
                BigInt(dryRunResult.effects.gasUsed.storageCost) -
                BigInt(dryRunResult.effects.gasUsed.storageRebate);
            // Set the budget to max(computation, computation + storage - rebate)
            this.setGasBudget(gasBudget > baseComputationCostWithOverhead
                ? gasBudget
                : baseComputationCostWithOverhead);
        }
    }
    // Perform final validation on the transaction:
    __classPrivateFieldGet(this, _TransactionBlock_instances, "m", _TransactionBlock_validate).call(this, options);
};
//# sourceMappingURL=TransactionBlock.js.map
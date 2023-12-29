var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ADD_STAKE_FUN_NAME: () => ADD_STAKE_FUN_NAME,
  ADD_STAKE_LOCKED_COIN_FUN_NAME: () => ADD_STAKE_LOCKED_COIN_FUN_NAME,
  ARGUMENT: () => ARGUMENT,
  ARGUMENT_INNER: () => ARGUMENT_INNER,
  AddressMetrics: () => AddressMetrics,
  AllEpochsAddressMetrics: () => AllEpochsAddressMetrics,
  AppId: () => AppId,
  Apy: () => Apy,
  AuthorityName: () => AuthorityName,
  AuthorityQuorumSignInfo: () => AuthorityQuorumSignInfo,
  AuthoritySignature: () => AuthoritySignature,
  Balance: () => Balance,
  BalanceChange: () => BalanceChange,
  BaseSigner: () => BaseSigner,
  BuilderCallArg: () => BuilderCallArg,
  CALL_ARG: () => CALL_ARG,
  COIN_TYPE_ARG_REGEX: () => COIN_TYPE_ARG_REGEX,
  COMPRESSED_SIGNATURE: () => COMPRESSED_SIGNATURE,
  CheckPointContentsDigest: () => CheckPointContentsDigest,
  Checkpoint: () => Checkpoint,
  CheckpointCommitment: () => CheckpointCommitment,
  CheckpointDigest: () => CheckpointDigest,
  CheckpointPage: () => CheckpointPage,
  CheckpointedObjectId: () => CheckpointedObjectId,
  Coin: () => Coin,
  CoinBalance: () => CoinBalance,
  CoinMetadataStruct: () => CoinMetadataStruct,
  CoinStruct: () => CoinStruct,
  CoinSupply: () => CoinSupply,
  CommitteeInfo: () => CommitteeInfo,
  Connection: () => Connection,
  Contents: () => Contents,
  ContentsFields: () => ContentsFields,
  ContentsFieldsWithdraw: () => ContentsFieldsWithdraw,
  DEFAULT_CLIENT_OPTIONS: () => DEFAULT_CLIENT_OPTIONS,
  DEFAULT_SECP256K1_DERIVATION_PATH: () => DEFAULT_SECP256K1_DERIVATION_PATH,
  DEFAULT_SECP256R1_DERIVATION_PATH: () => DEFAULT_SECP256R1_DERIVATION_PATH,
  DelegatedStake: () => DelegatedStake,
  Delegation: () => Delegation,
  DelegationStakingPool: () => DelegationStakingPool,
  DelegationStakingPoolFields: () => DelegationStakingPoolFields,
  DevInspectResults: () => DevInspectResults,
  DisplayFieldsBackwardCompatibleResponse: () => DisplayFieldsBackwardCompatibleResponse,
  DisplayFieldsResponse: () => DisplayFieldsResponse,
  DryRunTransactionBlockResponse: () => DryRunTransactionBlockResponse,
  DynamicFieldInfo: () => DynamicFieldInfo,
  DynamicFieldName: () => DynamicFieldName,
  DynamicFieldPage: () => DynamicFieldPage,
  DynamicFieldType: () => DynamicFieldType,
  ECMHLiveObjectSetDigest: () => ECMHLiveObjectSetDigest,
  ENUM_KIND: () => ENUM_KIND,
  Ed25519Keypair: () => Ed25519Keypair,
  Ed25519PublicKey: () => Ed25519PublicKey,
  EndOfEpochData: () => EndOfEpochData,
  EndOfEpochInfo: () => EndOfEpochInfo,
  EpochId: () => EpochId,
  EpochInfo: () => EpochInfo,
  EpochPage: () => EpochPage,
  EventId: () => EventId,
  ExecutionDigests: () => ExecutionDigests,
  ExecutionStatus: () => ExecutionStatus,
  ExecutionStatusType: () => ExecutionStatusType,
  GasCostSummary: () => GasCostSummary,
  GenericAuthoritySignature: () => GenericAuthoritySignature,
  Genesis: () => Genesis,
  GetOwnedObjectsResponse: () => GetOwnedObjectsResponse,
  ID_STRUCT_NAME: () => ID_STRUCT_NAME,
  Inputs: () => Inputs,
  IntentScope: () => IntentScope,
  IntentVersion: () => IntentVersion,
  JsonRpcClient: () => JsonRpcClient,
  JsonRpcProvider: () => JsonRpcProvider,
  Keypair: () => Keypair,
  LEGACY_PRIVATE_KEY_SIZE: () => LEGACY_PRIVATE_KEY_SIZE,
  MAX_SIGNER_IN_MULTISIG: () => MAX_SIGNER_IN_MULTISIG,
  MIST_PER_SUI: () => MIST_PER_SUI,
  MOVE_STDLIB_ADDRESS: () => MOVE_STDLIB_ADDRESS,
  MULTISIG: () => MULTISIG,
  MULTISIG_PK_MAP: () => MULTISIG_PK_MAP,
  MULTISIG_PUBLIC_KEY: () => MULTISIG_PUBLIC_KEY,
  MakeMoveVecTransaction: () => MakeMoveVecTransaction,
  MergeCoinsTransaction: () => MergeCoinsTransaction,
  MoveCallMetric: () => MoveCallMetric,
  MoveCallMetrics: () => MoveCallMetrics,
  MoveCallSuiTransaction: () => MoveCallSuiTransaction,
  MoveCallTransaction: () => MoveCallTransaction,
  MovePackageContent: () => MovePackageContent,
  NetworkMetrics: () => NetworkMetrics,
  NftClient: () => NftClient,
  NftParser: () => NftParser,
  OBJECT_ARG: () => OBJECT_ARG,
  OBJECT_MODULE_NAME: () => OBJECT_MODULE_NAME,
  OPTION: () => OPTION,
  ObjectCallArg: () => ObjectCallArg,
  ObjectContentFields: () => ObjectContentFields,
  ObjectDigest: () => ObjectDigest,
  ObjectId: () => ObjectId,
  ObjectOwner: () => ObjectOwner,
  ObjectRead: () => ObjectRead,
  ObjectStatus: () => ObjectStatus,
  ObjectTransactionArgument: () => ObjectTransactionArgument,
  ObjectType: () => ObjectType,
  OwnedObjectRef: () => OwnedObjectRef,
  PAY_JOIN_COIN_FUNC_NAME: () => PAY_JOIN_COIN_FUNC_NAME,
  PAY_MODULE_NAME: () => PAY_MODULE_NAME,
  PAY_SPLIT_COIN_VEC_FUNC_NAME: () => PAY_SPLIT_COIN_VEC_FUNC_NAME,
  PRIVATE_KEY_SIZE: () => PRIVATE_KEY_SIZE,
  PROGRAMMABLE_CALL: () => PROGRAMMABLE_CALL,
  PROGRAMMABLE_CALL_INNER: () => PROGRAMMABLE_CALL_INNER,
  PROGRAMMABLE_TX_BLOCK: () => PROGRAMMABLE_TX_BLOCK,
  PUBLIC_KEY: () => PUBLIC_KEY,
  PaginatedCoins: () => PaginatedCoins,
  PaginatedEvents: () => PaginatedEvents,
  PaginatedObjectsResponse: () => PaginatedObjectsResponse,
  PaginatedTransactionResponse: () => PaginatedTransactionResponse,
  ProgrammableTransaction: () => ProgrammableTransaction,
  ProtocolConfig: () => ProtocolConfig,
  PublicKey: () => PublicKey,
  PublishTransaction: () => PublishTransaction,
  PureCallArg: () => PureCallArg,
  PureTransactionArgument: () => PureTransactionArgument,
  RPCValidationError: () => RPCValidationError,
  RawSigner: () => RawSigner,
  ResolvedNameServiceNames: () => ResolvedNameServiceNames,
  SIGNATURE_FLAG_TO_SCHEME: () => SIGNATURE_FLAG_TO_SCHEME,
  SIGNATURE_SCHEME_TO_FLAG: () => SIGNATURE_SCHEME_TO_FLAG,
  SIGNATURE_SCHEME_TO_SIZE: () => SIGNATURE_SCHEME_TO_SIZE,
  SUI_ADDRESS_LENGTH: () => SUI_ADDRESS_LENGTH,
  SUI_CLOCK_OBJECT_ID: () => SUI_CLOCK_OBJECT_ID,
  SUI_DECIMALS: () => SUI_DECIMALS,
  SUI_FRAMEWORK_ADDRESS: () => SUI_FRAMEWORK_ADDRESS,
  SUI_SYSTEM_ADDRESS: () => SUI_SYSTEM_ADDRESS,
  SUI_SYSTEM_MODULE_NAME: () => SUI_SYSTEM_MODULE_NAME,
  SUI_SYSTEM_STATE_OBJECT_ID: () => SUI_SYSTEM_STATE_OBJECT_ID,
  SUI_TYPE_ARG: () => SUI_TYPE_ARG,
  Secp256k1Keypair: () => Secp256k1Keypair,
  Secp256k1PublicKey: () => Secp256k1PublicKey,
  Secp256r1Keypair: () => Secp256r1Keypair,
  Secp256r1PublicKey: () => Secp256r1PublicKey,
  SequenceNumber: () => SequenceNumber,
  SignerWithProvider: () => SignerWithProvider,
  SplitCoinsTransaction: () => SplitCoinsTransaction,
  StakeObject: () => StakeObject,
  StakeSubsidy: () => StakeSubsidy,
  StakeSubsidyFields: () => StakeSubsidyFields,
  SuiAddress: () => SuiAddress,
  SuiArgument: () => SuiArgument,
  SuiCallArg: () => SuiCallArg,
  SuiChangeEpoch: () => SuiChangeEpoch,
  SuiConsensusCommitPrologue: () => SuiConsensusCommitPrologue,
  SuiEvent: () => SuiEvent,
  SuiGasData: () => SuiGasData,
  SuiJsonValue: () => SuiJsonValue,
  SuiMoveAbilitySet: () => SuiMoveAbilitySet,
  SuiMoveFunctionArgType: () => SuiMoveFunctionArgType,
  SuiMoveFunctionArgTypes: () => SuiMoveFunctionArgTypes,
  SuiMoveModuleId: () => SuiMoveModuleId,
  SuiMoveNormalizedField: () => SuiMoveNormalizedField,
  SuiMoveNormalizedFunction: () => SuiMoveNormalizedFunction,
  SuiMoveNormalizedModule: () => SuiMoveNormalizedModule,
  SuiMoveNormalizedModules: () => SuiMoveNormalizedModules,
  SuiMoveNormalizedStruct: () => SuiMoveNormalizedStruct,
  SuiMoveNormalizedStructType: () => SuiMoveNormalizedStructType,
  SuiMoveNormalizedType: () => SuiMoveNormalizedType,
  SuiMoveNormalizedTypeParameterType: () => SuiMoveNormalizedTypeParameterType,
  SuiMoveObject: () => SuiMoveObject,
  SuiMovePackage: () => SuiMovePackage,
  SuiMoveStructTypeParameter: () => SuiMoveStructTypeParameter,
  SuiMoveVisibility: () => SuiMoveVisibility,
  SuiObjectChange: () => SuiObjectChange,
  SuiObjectChangeCreated: () => SuiObjectChangeCreated,
  SuiObjectChangeDeleted: () => SuiObjectChangeDeleted,
  SuiObjectChangeMutated: () => SuiObjectChangeMutated,
  SuiObjectChangePublished: () => SuiObjectChangePublished,
  SuiObjectChangeTransferred: () => SuiObjectChangeTransferred,
  SuiObjectChangeWrapped: () => SuiObjectChangeWrapped,
  SuiObjectData: () => SuiObjectData,
  SuiObjectDataOptions: () => SuiObjectDataOptions,
  SuiObjectInfo: () => SuiObjectInfo,
  SuiObjectRef: () => SuiObjectRef,
  SuiObjectResponse: () => SuiObjectResponse,
  SuiObjectResponseError: () => SuiObjectResponseError,
  SuiParsedData: () => SuiParsedData,
  SuiRawData: () => SuiRawData,
  SuiRawMoveObject: () => SuiRawMoveObject,
  SuiRawMovePackage: () => SuiRawMovePackage,
  SuiSupplyFields: () => SuiSupplyFields,
  SuiSystemStateSummary: () => SuiSystemStateSummary,
  SuiSystemStateUtil: () => SuiSystemStateUtil,
  SuiTransaction: () => SuiTransaction,
  SuiTransactionBlock: () => SuiTransactionBlock,
  SuiTransactionBlockData: () => SuiTransactionBlockData,
  SuiTransactionBlockKind: () => SuiTransactionBlockKind,
  SuiTransactionBlockResponse: () => SuiTransactionBlockResponse,
  SuiTransactionBlockResponseOptions: () => SuiTransactionBlockResponseOptions,
  SuiValidatorSummary: () => SuiValidatorSummary,
  TRANSACTION: () => TRANSACTION,
  TRANSACTION_INNER: () => TRANSACTION_INNER,
  TYPE_TAG: () => TYPE_TAG,
  TransactionArgument: () => TransactionArgument,
  TransactionBlock: () => TransactionBlock,
  TransactionBlockInput: () => TransactionBlockInput,
  TransactionDigest: () => TransactionDigest,
  TransactionEffects: () => TransactionEffects,
  TransactionEffectsDigest: () => TransactionEffectsDigest,
  TransactionEffectsModifiedAtVersions: () => TransactionEffectsModifiedAtVersions,
  TransactionEventDigest: () => TransactionEventDigest,
  TransactionEvents: () => TransactionEvents,
  TransactionType: () => TransactionType,
  Transactions: () => Transactions,
  TransferObjectsTransaction: () => TransferObjectsTransaction,
  TypeTagSerializer: () => TypeTagSerializer,
  UID_STRUCT_NAME: () => UID_STRUCT_NAME,
  UpgradePolicy: () => UpgradePolicy,
  UpgradeTransaction: () => UpgradeTransaction,
  VALIDATORS_EVENTS_QUERY: () => VALIDATORS_EVENTS_QUERY,
  VECTOR: () => VECTOR2,
  ValidatorSignature: () => ValidatorSignature,
  Validators: () => Validators,
  ValidatorsApy: () => ValidatorsApy,
  WITHDRAW_STAKE_FUN_NAME: () => WITHDRAW_STAKE_FUN_NAME,
  WalletClient: () => WalletClient,
  WebsocketClient: () => WebsocketClient,
  assert: () => import_superstruct21.assert,
  bcs: () => bcs,
  builder: () => builder,
  bytesEqual: () => bytesEqual,
  combinePartialSigs: () => combinePartialSigs,
  decodeMultiSig: () => decodeMultiSig,
  devnetConnection: () => devnetConnection,
  extractMutableReference: () => extractMutableReference,
  extractReference: () => extractReference,
  extractStructTag: () => extractStructTag,
  formatAddress: () => formatAddress,
  formatDigest: () => formatDigest,
  fromB64: () => import_bcs33.fromB64,
  fromExportedKeypair: () => fromExportedKeypair,
  getChangeEpochTransaction: () => getChangeEpochTransaction,
  getConsensusCommitPrologueTransaction: () => getConsensusCommitPrologueTransaction,
  getCreatedObjects: () => getCreatedObjects,
  getEventPackage: () => getEventPackage,
  getEventSender: () => getEventSender,
  getEvents: () => getEvents,
  getExecutionStatus: () => getExecutionStatus,
  getExecutionStatusError: () => getExecutionStatusError,
  getExecutionStatusGasSummary: () => getExecutionStatusGasSummary,
  getExecutionStatusType: () => getExecutionStatusType,
  getGasData: () => getGasData,
  getIdFromCallArg: () => getIdFromCallArg,
  getMoveObject: () => getMoveObject,
  getMoveObjectType: () => getMoveObjectType,
  getMovePackageContent: () => getMovePackageContent,
  getNewlyCreatedCoinRefsAfterSplit: () => getNewlyCreatedCoinRefsAfterSplit,
  getObjectChanges: () => getObjectChanges,
  getObjectDeletedResponse: () => getObjectDeletedResponse,
  getObjectDisplay: () => getObjectDisplay,
  getObjectFields: () => getObjectFields,
  getObjectId: () => getObjectId,
  getObjectNotExistsResponse: () => getObjectNotExistsResponse,
  getObjectOwner: () => getObjectOwner,
  getObjectPreviousTransactionDigest: () => getObjectPreviousTransactionDigest,
  getObjectReference: () => getObjectReference,
  getObjectType: () => getObjectType,
  getObjectVersion: () => getObjectVersion,
  getProgrammableTransaction: () => getProgrammableTransaction,
  getPublishedObjectChanges: () => getPublishedObjectChanges,
  getPureSerializationType: () => getPureSerializationType,
  getSharedObjectInitialVersion: () => getSharedObjectInitialVersion,
  getSharedObjectInput: () => getSharedObjectInput,
  getSuiObjectData: () => getSuiObjectData,
  getTimestampFromTransactionResponse: () => getTimestampFromTransactionResponse,
  getTotalGasUsed: () => getTotalGasUsed,
  getTotalGasUsedUpperBound: () => getTotalGasUsedUpperBound,
  getTransaction: () => getTransaction,
  getTransactionDigest: () => getTransactionDigest,
  getTransactionEffects: () => getTransactionEffects,
  getTransactionGasBudget: () => getTransactionGasBudget,
  getTransactionGasObject: () => getTransactionGasObject,
  getTransactionGasPrice: () => getTransactionGasPrice,
  getTransactionKind: () => getTransactionKind,
  getTransactionKindName: () => getTransactionKindName,
  getTransactionSender: () => getTransactionSender,
  getTransactionSignature: () => getTransactionSignature,
  getTransactionType: () => getTransactionType,
  getWebsocketUrl: () => getWebsocketUrl,
  hasPublicTransfer: () => hasPublicTransfer,
  is: () => import_superstruct21.is,
  isImmutableObject: () => isImmutableObject,
  isMutableSharedObjectInput: () => isMutableSharedObjectInput,
  isObjectDataFull: () => isObjectDataFull,
  isPureArg: () => isPureArg,
  isSharedObject: () => isSharedObject,
  isSharedObjectInput: () => isSharedObjectInput,
  isSuiObjectResponse: () => isSuiObjectResponse,
  isTxContext: () => isTxContext,
  isValidBIP32Path: () => isValidBIP32Path,
  isValidHardenedPath: () => isValidHardenedPath,
  isValidSuiAddress: () => isValidSuiAddress,
  isValidSuiObjectId: () => isValidSuiObjectId,
  isValidTransactionDigest: () => isValidTransactionDigest,
  localnetConnection: () => localnetConnection,
  mainnetConnection: () => mainnetConnection,
  messageWithIntent: () => messageWithIntent,
  mnemonicToSeed: () => mnemonicToSeed,
  mnemonicToSeedHex: () => mnemonicToSeedHex,
  normalizeStructTag: () => normalizeStructTag,
  normalizeSuiAddress: () => normalizeSuiAddress,
  normalizeSuiObjectId: () => normalizeSuiObjectId,
  parseDomains: () => parseDomains,
  parseSerializedSignature: () => parseSerializedSignature,
  parseStructTag: () => parseStructTag,
  publicKeyFromSerialized: () => publicKeyFromSerialized,
  testnetConnection: () => testnetConnection,
  toB64: () => import_bcs33.toB64,
  toMultiSigAddress: () => toMultiSigAddress,
  toParsedSignaturePubkeyPair: () => toParsedSignaturePubkeyPair,
  toSerializedSignature: () => toSerializedSignature,
  toSingleSignaturePubkeyPair: () => toSingleSignaturePubkeyPair,
  verifyMessage: () => verifyMessage
});
module.exports = __toCommonJS(src_exports);

// src/cryptography/utils.ts
var import_bcs21 = require("@mysten/bcs");

// src/cryptography/signature.ts
var import_bcs6 = require("@mysten/bcs");

// src/builder/bcs.ts
var import_bcs4 = require("@mysten/bcs");

// src/bcs/index.ts
var import_bcs = require("@mysten/bcs");
function isPureArg(arg) {
  return arg.Pure !== void 0;
}
var VECTOR = "vector";
var TransactionDataV1 = {
  kind: "TransactionKind",
  sender: import_bcs.BCS.ADDRESS,
  gasData: "GasData",
  expiration: "TransactionExpiration"
};
var BCS_SPEC = {
  enums: {
    "Option<T>": {
      None: null,
      Some: "T"
    },
    ObjectArg: {
      ImmOrOwned: "SuiObjectRef",
      Shared: "SharedObjectRef"
    },
    CallArg: {
      Pure: [VECTOR, import_bcs.BCS.U8],
      Object: "ObjectArg",
      ObjVec: [VECTOR, "ObjectArg"]
    },
    TypeTag: {
      bool: null,
      u8: null,
      u64: null,
      u128: null,
      address: null,
      signer: null,
      vector: "TypeTag",
      struct: "StructTag",
      u16: null,
      u32: null,
      u256: null
    },
    TransactionKind: {
      // can not be called from sui.js; dummy placement
      // to set the enum counter right for ProgrammableTransact
      ProgrammableTransaction: "ProgrammableTransaction",
      ChangeEpoch: null,
      Genesis: null,
      ConsensusCommitPrologue: null
    },
    TransactionExpiration: {
      None: null,
      Epoch: "unsafe_u64"
    },
    TransactionData: {
      V1: "TransactionDataV1"
    }
  },
  structs: {
    SuiObjectRef: {
      objectId: import_bcs.BCS.ADDRESS,
      version: import_bcs.BCS.U64,
      digest: "ObjectDigest"
    },
    SharedObjectRef: {
      objectId: import_bcs.BCS.ADDRESS,
      initialSharedVersion: import_bcs.BCS.U64,
      mutable: import_bcs.BCS.BOOL
    },
    StructTag: {
      address: import_bcs.BCS.ADDRESS,
      module: import_bcs.BCS.STRING,
      name: import_bcs.BCS.STRING,
      typeParams: [VECTOR, "TypeTag"]
    },
    GasData: {
      payment: [VECTOR, "SuiObjectRef"],
      owner: import_bcs.BCS.ADDRESS,
      price: import_bcs.BCS.U64,
      budget: import_bcs.BCS.U64
    },
    // Signed transaction data needed to generate transaction digest.
    SenderSignedData: {
      data: "TransactionData",
      txSignatures: [VECTOR, [VECTOR, import_bcs.BCS.U8]]
    },
    TransactionDataV1
  },
  aliases: {
    ObjectDigest: import_bcs.BCS.BASE58
  }
};
var bcs = new import_bcs.BCS({ ...(0, import_bcs.getSuiMoveConfig)(), types: BCS_SPEC });
bcs.registerType(
  "utf8string",
  (writer, str) => {
    const bytes = Array.from(new TextEncoder().encode(str));
    return writer.writeVec(bytes, (writer2, el) => writer2.write8(el));
  },
  (reader) => {
    let bytes = reader.readVec((reader2) => reader2.read8());
    return new TextDecoder().decode(new Uint8Array(bytes));
  }
);
bcs.registerType(
  "unsafe_u64",
  (writer, data) => writer.write64(data),
  (reader) => Number.parseInt(reader.read64(), 10)
);

// src/builder/type-tag-serializer.ts
var import_bcs3 = require("@mysten/bcs");

// src/utils/sui-types.ts
var import_bcs2 = require("@mysten/bcs");
var TX_DIGEST_LENGTH = 32;
function isValidTransactionDigest(value) {
  try {
    const buffer = (0, import_bcs2.fromB58)(value);
    return buffer.length === TX_DIGEST_LENGTH;
  } catch (e) {
    return false;
  }
}
var SUI_ADDRESS_LENGTH = 32;
function isValidSuiAddress(value) {
  return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}
function isValidSuiObjectId(value) {
  return isValidSuiAddress(value);
}
function parseTypeTag(type) {
  if (!type.includes("::"))
    return type;
  return parseStructTag(type);
}
function parseStructTag(type) {
  const [address, module2] = type.split("::");
  const rest = type.slice(address.length + module2.length + 4);
  const name = rest.includes("<") ? rest.slice(0, rest.indexOf("<")) : rest;
  const typeParams = rest.includes("<") ? (0, import_bcs2.splitGenericParameters)(
    rest.slice(rest.indexOf("<") + 1, rest.lastIndexOf(">"))
  ).map((typeParam) => parseTypeTag(typeParam.trim())) : [];
  return {
    address: normalizeSuiAddress(address),
    module: module2,
    name,
    typeParams
  };
}
function normalizeStructTag(type) {
  const { address, module: module2, name, typeParams } = typeof type === "string" ? parseStructTag(type) : type;
  const formattedTypeParams = typeParams.length > 0 ? `<${typeParams.map(
    (typeParam) => typeof typeParam === "string" ? typeParam : normalizeStructTag(typeParam)
  ).join(",")}>` : "";
  return `${address}::${module2}::${name}${formattedTypeParams}`;
}
function normalizeSuiAddress(value, forceAdd0x = false) {
  let address = value.toLowerCase();
  if (!forceAdd0x && address.startsWith("0x")) {
    address = address.slice(2);
  }
  return `0x${address.padStart(SUI_ADDRESS_LENGTH * 2, "0")}`;
}
function normalizeSuiObjectId(value, forceAdd0x = false) {
  return normalizeSuiAddress(value, forceAdd0x);
}
function isHex(value) {
  return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
  return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}

// src/builder/type-tag-serializer.ts
var VECTOR_REGEX = /^vector<(.+)>$/;
var STRUCT_REGEX = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/;
var TypeTagSerializer = class {
  static parseFromStr(str, normalizeAddress = false) {
    if (str === "address") {
      return { address: null };
    } else if (str === "bool") {
      return { bool: null };
    } else if (str === "u8") {
      return { u8: null };
    } else if (str === "u16") {
      return { u16: null };
    } else if (str === "u32") {
      return { u32: null };
    } else if (str === "u64") {
      return { u64: null };
    } else if (str === "u128") {
      return { u128: null };
    } else if (str === "u256") {
      return { u256: null };
    } else if (str === "signer") {
      return { signer: null };
    }
    const vectorMatch = str.match(VECTOR_REGEX);
    if (vectorMatch) {
      return {
        vector: TypeTagSerializer.parseFromStr(vectorMatch[1], normalizeAddress)
      };
    }
    const structMatch = str.match(STRUCT_REGEX);
    if (structMatch) {
      const address = normalizeAddress ? normalizeSuiAddress(structMatch[1]) : structMatch[1];
      return {
        struct: {
          address,
          module: structMatch[2],
          name: structMatch[3],
          typeParams: structMatch[5] === void 0 ? [] : TypeTagSerializer.parseStructTypeArgs(structMatch[5], normalizeAddress)
        }
      };
    }
    throw new Error(`Encountered unexpected token when parsing type args for ${str}`);
  }
  static parseStructTypeArgs(str, normalizeAddress = false) {
    return (0, import_bcs3.splitGenericParameters)(str).map(
      (tok) => TypeTagSerializer.parseFromStr(tok, normalizeAddress)
    );
  }
  static tagToString(tag) {
    if ("bool" in tag) {
      return "bool";
    }
    if ("u8" in tag) {
      return "u8";
    }
    if ("u16" in tag) {
      return "u16";
    }
    if ("u32" in tag) {
      return "u32";
    }
    if ("u64" in tag) {
      return "u64";
    }
    if ("u128" in tag) {
      return "u128";
    }
    if ("u256" in tag) {
      return "u256";
    }
    if ("address" in tag) {
      return "address";
    }
    if ("signer" in tag) {
      return "signer";
    }
    if ("vector" in tag) {
      return `vector<${TypeTagSerializer.tagToString(tag.vector)}>`;
    }
    if ("struct" in tag) {
      const struct = tag.struct;
      const typeParams = struct.typeParams.map(TypeTagSerializer.tagToString).join(", ");
      return `${struct.address}::${struct.module}::${struct.name}${typeParams ? `<${typeParams}>` : ""}`;
    }
    throw new Error("Invalid TypeTag");
  }
};

// src/builder/bcs.ts
var ARGUMENT_INNER = "Argument";
var VECTOR2 = "vector";
var OPTION = "Option";
var CALL_ARG = "CallArg";
var TYPE_TAG = "TypeTag";
var OBJECT_ARG = "ObjectArg";
var PROGRAMMABLE_TX_BLOCK = "ProgrammableTransaction";
var PROGRAMMABLE_CALL_INNER = "ProgrammableMoveCall";
var TRANSACTION_INNER = "Transaction";
var COMPRESSED_SIGNATURE = "CompressedSignature";
var PUBLIC_KEY = "PublicKey";
var MULTISIG_PUBLIC_KEY = "MultiSigPublicKey";
var MULTISIG_PK_MAP = "MultiSigPkMap";
var MULTISIG = "MultiSig";
var ENUM_KIND = "EnumKind";
var TRANSACTION = [ENUM_KIND, TRANSACTION_INNER];
var ARGUMENT = [ENUM_KIND, ARGUMENT_INNER];
var PROGRAMMABLE_CALL = "SimpleProgrammableMoveCall";
var builder = new import_bcs4.BCS(bcs);
registerFixedArray(builder, "FixedArray[64]", 64);
registerFixedArray(builder, "FixedArray[33]", 33);
registerFixedArray(builder, "FixedArray[32]", 32);
builder.registerStructType(PROGRAMMABLE_TX_BLOCK, {
  inputs: [VECTOR2, CALL_ARG],
  transactions: [VECTOR2, TRANSACTION]
}).registerEnumType(ARGUMENT_INNER, {
  GasCoin: null,
  Input: { index: import_bcs4.BCS.U16 },
  Result: { index: import_bcs4.BCS.U16 },
  NestedResult: { index: import_bcs4.BCS.U16, resultIndex: import_bcs4.BCS.U16 }
}).registerStructType(PROGRAMMABLE_CALL_INNER, {
  package: import_bcs4.BCS.ADDRESS,
  module: import_bcs4.BCS.STRING,
  function: import_bcs4.BCS.STRING,
  type_arguments: [VECTOR2, TYPE_TAG],
  arguments: [VECTOR2, ARGUMENT]
}).registerEnumType(TRANSACTION_INNER, {
  /**
   * A Move Call - any public Move function can be called via
   * this transaction. The results can be used that instant to pass
   * into the next transaction.
   */
  MoveCall: PROGRAMMABLE_CALL,
  /**
   * Transfer vector of objects to a receiver.
   */
  TransferObjects: {
    objects: [VECTOR2, ARGUMENT],
    address: ARGUMENT
  },
  /**
   * Split `amount` from a `coin`.
   */
  SplitCoins: { coin: ARGUMENT, amounts: [VECTOR2, ARGUMENT] },
  /**
   * Merge Vector of Coins (`sources`) into a `destination`.
   */
  MergeCoins: { destination: ARGUMENT, sources: [VECTOR2, ARGUMENT] },
  /**
   * Publish a Move module.
   */
  Publish: {
    modules: [VECTOR2, [VECTOR2, import_bcs4.BCS.U8]],
    dependencies: [VECTOR2, import_bcs4.BCS.ADDRESS]
  },
  /**
   * Build a vector of objects using the input arguments.
   * It is impossible to construct a `vector<T: key>` otherwise,
   * so this call serves a utility function.
   */
  MakeMoveVec: {
    type: [OPTION, TYPE_TAG],
    objects: [VECTOR2, ARGUMENT]
  },
  /**  */
  Upgrade: {
    modules: [VECTOR2, [VECTOR2, import_bcs4.BCS.U8]],
    dependencies: [VECTOR2, import_bcs4.BCS.ADDRESS],
    packageId: import_bcs4.BCS.ADDRESS,
    ticket: ARGUMENT
  }
}).registerEnumType(COMPRESSED_SIGNATURE, {
  ED25519: ["FixedArray[64]", "u8"],
  Secp256k1: ["FixedArray[64]", "u8"],
  Secp256r1: ["FixedArray[64]", "u8"]
}).registerEnumType(PUBLIC_KEY, {
  ED25519: ["FixedArray[32]", "u8"],
  Secp256k1: ["FixedArray[33]", "u8"],
  Secp256r1: ["FixedArray[33]", "u8"]
}).registerStructType(MULTISIG_PK_MAP, {
  pubKey: PUBLIC_KEY,
  weight: import_bcs4.BCS.U8
}).registerStructType(MULTISIG_PUBLIC_KEY, {
  pk_map: [VECTOR2, MULTISIG_PK_MAP],
  threshold: import_bcs4.BCS.U16
}).registerStructType(MULTISIG, {
  sigs: [VECTOR2, COMPRESSED_SIGNATURE],
  bitmap: import_bcs4.BCS.U16,
  multisig_pk: MULTISIG_PUBLIC_KEY
});
builder.registerType(
  [ENUM_KIND, "T"],
  function encode(writer, data, typeParams, typeMap) {
    const kind = data.kind;
    const invariant = { [kind]: data };
    const [enumType] = typeParams;
    return this.getTypeInterface(enumType)._encodeRaw.call(
      this,
      writer,
      invariant,
      typeParams,
      typeMap
    );
  },
  function decode(reader, typeParams, typeMap) {
    const [enumType] = typeParams;
    const data = this.getTypeInterface(enumType)._decodeRaw.call(
      this,
      reader,
      typeParams,
      typeMap
    );
    const kind = Object.keys(data)[0];
    return { kind, ...data[kind] };
  },
  (data) => {
    if (typeof data !== "object" && !("kind" in data)) {
      throw new Error(`EnumKind: Missing property "kind" in the input ${JSON.stringify(data)}`);
    }
    return true;
  }
);
builder.registerType(
  PROGRAMMABLE_CALL,
  function encodeProgrammableTx(writer, data, typeParams, typeMap) {
    const [pkg, module2, fun] = data.target.split("::");
    const type_arguments = data.typeArguments.map(
      (tag) => TypeTagSerializer.parseFromStr(tag, true)
    );
    return this.getTypeInterface(PROGRAMMABLE_CALL_INNER)._encodeRaw.call(
      this,
      writer,
      {
        package: normalizeSuiAddress(pkg),
        module: module2,
        function: fun,
        type_arguments,
        arguments: data.arguments
      },
      typeParams,
      typeMap
    );
  },
  function decodeProgrammableTx(reader, typeParams, typeMap) {
    let data = builder.getTypeInterface(PROGRAMMABLE_CALL_INNER)._decodeRaw.call(this, reader, typeParams, typeMap);
    return {
      target: [data.package, data.module, data.function].join("::"),
      arguments: data.arguments,
      typeArguments: data.type_arguments.map(TypeTagSerializer.tagToString)
    };
  },
  // Validation callback to error out if the data format is invalid.
  // TODO: make sure TypeTag can be parsed.
  (data) => {
    return data.target.split("::").length === 3;
  }
);
function registerFixedArray(bcs2, name, length) {
  bcs2.registerType(
    name,
    function encode2(writer, data, typeParams, typeMap) {
      if (data.length !== length) {
        throw new Error(`Expected fixed array of length ${length}, got ${data.length}`);
      }
      if (typeParams.length !== 1) {
        throw new Error(`Expected one type parameter in a fixed array, got ${typeParams.length}`);
      }
      let [type] = typeof typeParams[0] === "string" ? [typeParams[0], []] : typeParams[0];
      for (let piece of data) {
        this.getTypeInterface(type)._encodeRaw.call(this, writer, piece, typeParams, typeMap);
      }
      return writer;
    },
    function decode2(reader, typeParams, typeMap) {
      if (typeParams.length !== 1) {
        throw new Error(`Expected one type parameter in a fixed array, got ${typeParams.length}`);
      }
      let result = [];
      let [type] = typeof typeParams[0] === "string" ? [typeParams[0], []] : typeParams[0];
      for (let i = 0; i < length; i++) {
        result.push(this.getTypeInterface(type)._decodeRaw.call(this, reader, typeParams, typeMap));
      }
      return result;
    }
  );
}

// src/cryptography/signature.ts
var SIGNATURE_SCHEME_TO_FLAG = {
  ED25519: 0,
  Secp256k1: 1,
  Secp256r1: 2,
  MultiSig: 3
};
var SIGNATURE_SCHEME_TO_SIZE = {
  ED25519: 32,
  Secp256k1: 33,
  Secp256r1: 33
};
var SIGNATURE_FLAG_TO_SCHEME = {
  0: "ED25519",
  1: "Secp256k1",
  2: "Secp256r1",
  3: "MultiSig"
};
function toSerializedSignature({
  signature,
  signatureScheme,
  pubKey,
  publicKey = pubKey
}) {
  if (!publicKey) {
    throw new Error("`publicKey` is required");
  }
  const pubKeyBytes = publicKey.toBytes();
  const serializedSignature = new Uint8Array(
    1 + signature.length + pubKeyBytes.length
  );
  serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
  serializedSignature.set(signature, 1);
  serializedSignature.set(pubKeyBytes, 1 + signature.length);
  return (0, import_bcs6.toB64)(serializedSignature);
}
function parseSerializedSignature(serializedSignature) {
  const bytes = (0, import_bcs6.fromB64)(serializedSignature);
  const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
  if (signatureScheme === "MultiSig") {
    const multisig = builder.de("MultiSig", bytes.slice(1));
    return {
      serializedSignature,
      signatureScheme,
      multisig,
      bytes
    };
  }
  if (!(signatureScheme in SIGNATURE_SCHEME_TO_SIZE)) {
    throw new Error("Unsupported signature scheme");
  }
  const size = SIGNATURE_SCHEME_TO_SIZE[signatureScheme];
  const signature = bytes.slice(1, bytes.length - size);
  const publicKey = bytes.slice(1 + signature.length);
  return {
    serializedSignature,
    signatureScheme,
    signature,
    publicKey,
    bytes
  };
}

// src/keypairs/secp256r1/publickey.ts
var import_bcs10 = require("@mysten/bcs");

// src/cryptography/publickey.ts
var import_bcs8 = require("@mysten/bcs");

// src/cryptography/intent.ts
var AppId = /* @__PURE__ */ ((AppId2) => {
  AppId2[AppId2["Sui"] = 0] = "Sui";
  return AppId2;
})(AppId || {});
var IntentVersion = /* @__PURE__ */ ((IntentVersion2) => {
  IntentVersion2[IntentVersion2["V0"] = 0] = "V0";
  return IntentVersion2;
})(IntentVersion || {});
var IntentScope = /* @__PURE__ */ ((IntentScope2) => {
  IntentScope2[IntentScope2["TransactionData"] = 0] = "TransactionData";
  IntentScope2[IntentScope2["TransactionEffects"] = 1] = "TransactionEffects";
  IntentScope2[IntentScope2["CheckpointSummary"] = 2] = "CheckpointSummary";
  IntentScope2[IntentScope2["PersonalMessage"] = 3] = "PersonalMessage";
  return IntentScope2;
})(IntentScope || {});
function intentWithScope(scope) {
  return [scope, 0 /* V0 */, 0 /* Sui */];
}
function messageWithIntent(scope, message) {
  const intent = intentWithScope(scope);
  const intentMessage = new Uint8Array(intent.length + message.length);
  intentMessage.set(intent);
  intentMessage.set(message, intent.length);
  return intentMessage;
}

// src/cryptography/publickey.ts
var import_blake2b = require("@noble/hashes/blake2b");
var import_utils = require("@noble/hashes/utils");
function bytesEqual(a, b) {
  if (a === b)
    return true;
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var PublicKey = class {
  /**
   * Checks if two public keys are equal
   */
  equals(publicKey) {
    return bytesEqual(this.toRawBytes(), publicKey.toRawBytes());
  }
  /**
   * Return the base-64 representation of the public key
   */
  toBase64() {
    return (0, import_bcs8.toB64)(this.toRawBytes());
  }
  /**
   * @deprecated use toBase64 instead.
   *
   * Return the base-64 representation of the public key
   */
  toString() {
    return this.toBase64();
  }
  /**
   * Return the Sui representation of the public key encoded in
   * base-64. A Sui public key is formed by the concatenation
   * of the scheme flag with the raw bytes of the public key
   */
  toSuiPublicKey() {
    const bytes = this.toSuiBytes();
    return (0, import_bcs8.toB64)(bytes);
  }
  verifyWithIntent(bytes, signature, intent) {
    const intentMessage = messageWithIntent(intent, bytes);
    const digest = (0, import_blake2b.blake2b)(intentMessage, { dkLen: 32 });
    return this.verify(digest, signature);
  }
  /**
   * Verifies that the signature is valid for for the provided PersonalMessage
   */
  verifyPersonalMessage(message, signature) {
    return this.verifyWithIntent(
      bcs.ser(["vector", "u8"], message).toBytes(),
      signature,
      3 /* PersonalMessage */
    );
  }
  /**
   * Verifies that the signature is valid for for the provided TransactionBlock
   */
  verifyTransactionBlock(transactionBlock, signature) {
    return this.verifyWithIntent(
      transactionBlock,
      signature,
      0 /* TransactionData */
    );
  }
  /**
   * Returns the bytes representation of the public key
   * prefixed with the signature scheme flag
   */
  toSuiBytes() {
    const rawBytes = this.toRawBytes();
    const suiBytes = new Uint8Array(rawBytes.length + 1);
    suiBytes.set([this.flag()]);
    suiBytes.set(rawBytes, 1);
    return suiBytes;
  }
  /**
   * @deprecated use `toRawBytes` instead.
   */
  toBytes() {
    return this.toRawBytes();
  }
  /**
   * Return the Sui address associated with this Ed25519 public key
   */
  toSuiAddress() {
    return normalizeSuiAddress(
      (0, import_utils.bytesToHex)((0, import_blake2b.blake2b)(this.toSuiBytes(), { dkLen: 32 })).slice(
        0,
        SUI_ADDRESS_LENGTH * 2
      )
    );
  }
};

// src/keypairs/secp256r1/publickey.ts
var import_sha256 = require("@noble/hashes/sha256");
var import_p256 = require("@noble/curves/p256");
var SECP256R1_PUBLIC_KEY_SIZE = 33;
var Secp256r1PublicKey = class extends PublicKey {
  /**
   * Create a new Secp256r1PublicKey object
   * @param value secp256r1 public key as buffer or base-64 encoded string
   */
  constructor(value) {
    super();
    if (typeof value === "string") {
      this.data = (0, import_bcs10.fromB64)(value);
    } else if (value instanceof Uint8Array) {
      this.data = value;
    } else {
      this.data = Uint8Array.from(value);
    }
    if (this.data.length !== SECP256R1_PUBLIC_KEY_SIZE) {
      throw new Error(
        `Invalid public key input. Expected ${SECP256R1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
      );
    }
  }
  /**
   * Checks if two Secp256r1 public keys are equal
   */
  equals(publicKey) {
    return super.equals(publicKey);
  }
  /**
   * Return the byte array representation of the Secp256r1 public key
   */
  toRawBytes() {
    return this.data;
  }
  /**
   * Return the Sui address associated with this Secp256r1 public key
   */
  flag() {
    return SIGNATURE_SCHEME_TO_FLAG["Secp256r1"];
  }
  /**
   * Verifies that the signature is valid for for the provided message
   */
  async verify(message, signature) {
    let bytes;
    if (typeof signature === "string") {
      const parsed = parseSerializedSignature(signature);
      if (parsed.signatureScheme !== "Secp256r1") {
        throw new Error("Invalid signature scheme");
      }
      if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) {
        throw new Error("Signature does not match public key");
      }
      bytes = parsed.signature;
    } else {
      bytes = signature;
    }
    return import_p256.secp256r1.verify(
      import_p256.secp256r1.Signature.fromCompact(bytes),
      (0, import_sha256.sha256)(message),
      this.toRawBytes()
    );
  }
};
Secp256r1PublicKey.SIZE = SECP256R1_PUBLIC_KEY_SIZE;

// src/keypairs/secp256k1/publickey.ts
var import_bcs11 = require("@mysten/bcs");
var import_secp256k1 = require("@noble/curves/secp256k1");
var import_sha2562 = require("@noble/hashes/sha256");
var SECP256K1_PUBLIC_KEY_SIZE = 33;
var Secp256k1PublicKey = class extends PublicKey {
  /**
   * Create a new Secp256k1PublicKey object
   * @param value secp256k1 public key as buffer or base-64 encoded string
   */
  constructor(value) {
    super();
    if (typeof value === "string") {
      this.data = (0, import_bcs11.fromB64)(value);
    } else if (value instanceof Uint8Array) {
      this.data = value;
    } else {
      this.data = Uint8Array.from(value);
    }
    if (this.data.length !== SECP256K1_PUBLIC_KEY_SIZE) {
      throw new Error(
        `Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
      );
    }
  }
  /**
   * Checks if two Secp256k1 public keys are equal
   */
  equals(publicKey) {
    return super.equals(publicKey);
  }
  /**
   * Return the byte array representation of the Secp256k1 public key
   */
  toRawBytes() {
    return this.data;
  }
  /**
   * Return the Sui address associated with this Secp256k1 public key
   */
  flag() {
    return SIGNATURE_SCHEME_TO_FLAG["Secp256k1"];
  }
  /**
   * Verifies that the signature is valid for for the provided message
   */
  async verify(message, signature) {
    let bytes;
    if (typeof signature === "string") {
      const parsed = parseSerializedSignature(signature);
      if (parsed.signatureScheme !== "Secp256k1") {
        throw new Error("Invalid signature scheme");
      }
      if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) {
        throw new Error("Signature does not match public key");
      }
      bytes = parsed.signature;
    } else {
      bytes = signature;
    }
    return import_secp256k1.secp256k1.verify(
      import_secp256k1.secp256k1.Signature.fromCompact(bytes),
      (0, import_sha2562.sha256)(message),
      this.toRawBytes()
    );
  }
};
Secp256k1PublicKey.SIZE = SECP256K1_PUBLIC_KEY_SIZE;

// src/keypairs/ed25519/publickey.ts
var import_bcs12 = require("@mysten/bcs");
var import_tweetnacl = __toESM(require("tweetnacl"));
var PUBLIC_KEY_SIZE = 32;
var Ed25519PublicKey = class extends PublicKey {
  /**
   * Create a new Ed25519PublicKey object
   * @param value ed25519 public key as buffer or base-64 encoded string
   */
  constructor(value) {
    super();
    if (typeof value === "string") {
      this.data = (0, import_bcs12.fromB64)(value);
    } else if (value instanceof Uint8Array) {
      this.data = value;
    } else {
      this.data = Uint8Array.from(value);
    }
    if (this.data.length !== PUBLIC_KEY_SIZE) {
      throw new Error(
        `Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
      );
    }
  }
  /**
   * Checks if two Ed25519 public keys are equal
   */
  equals(publicKey) {
    return super.equals(publicKey);
  }
  /**
   * Return the byte array representation of the Ed25519 public key
   */
  toRawBytes() {
    return this.data;
  }
  /**
   * Return the Sui address associated with this Ed25519 public key
   */
  flag() {
    return SIGNATURE_SCHEME_TO_FLAG["ED25519"];
  }
  /**
   * Verifies that the signature is valid for for the provided message
   */
  async verify(message, signature) {
    let bytes;
    if (typeof signature === "string") {
      const parsed = parseSerializedSignature(signature);
      if (parsed.signatureScheme !== "ED25519") {
        throw new Error("Invalid signature scheme");
      }
      if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) {
        throw new Error("Signature does not match public key");
      }
      bytes = parsed.signature;
    } else {
      bytes = signature;
    }
    return import_tweetnacl.default.sign.detached.verify(message, bytes, this.toRawBytes());
  }
};
Ed25519PublicKey.SIZE = PUBLIC_KEY_SIZE;

// src/cryptography/multisig.ts
var import_bcs13 = require("@mysten/bcs");
var import_blake2b2 = require("@noble/hashes/blake2b");
var import_utils3 = require("@noble/hashes/utils");
var MAX_SIGNER_IN_MULTISIG = 10;
function toMultiSigAddress(pks, threshold) {
  if (pks.length > MAX_SIGNER_IN_MULTISIG) {
    throw new Error(
      `Max number of signers in a multisig is ${MAX_SIGNER_IN_MULTISIG}`
    );
  }
  let maxLength = 1 + (64 + 1) * MAX_SIGNER_IN_MULTISIG + 2;
  let tmp = new Uint8Array(maxLength);
  tmp.set([SIGNATURE_SCHEME_TO_FLAG["MultiSig"]]);
  let arr = to_uint8array(threshold);
  tmp.set(arr, 1);
  let i = 3;
  for (const pk of pks) {
    tmp.set([pk.pubKey.flag()], i);
    tmp.set(pk.pubKey.toRawBytes(), i + 1);
    tmp.set([pk.weight], i + 1 + pk.pubKey.toRawBytes().length);
    i += pk.pubKey.toRawBytes().length + 2;
  }
  return normalizeSuiAddress(
    (0, import_utils3.bytesToHex)((0, import_blake2b2.blake2b)(tmp.slice(0, i), { dkLen: 32 }))
  );
}
function combinePartialSigs(sigs, pks, threshold) {
  let multisig_pk = {
    pk_map: pks.map((x) => toPkWeightPair(x)),
    threshold
  };
  let bitmap = 0;
  let compressed_sigs = new Array(sigs.length);
  for (let i = 0; i < sigs.length; i++) {
    let parsed = toSingleSignaturePubkeyPair(sigs[i]);
    let bytes2 = Array.from(parsed.signature.map((x) => Number(x)));
    if (parsed.signatureScheme === "ED25519") {
      compressed_sigs[i] = { ED25519: bytes2 };
    } else if (parsed.signatureScheme === "Secp256k1") {
      compressed_sigs[i] = { Secp256k1: bytes2 };
    } else if (parsed.signatureScheme === "Secp256r1") {
      compressed_sigs[i] = { Secp256r1: bytes2 };
    }
    for (let j = 0; j < pks.length; j++) {
      if (parsed.pubKey.equals(pks[j].pubKey)) {
        bitmap |= 1 << j;
        break;
      }
    }
  }
  let multisig = {
    sigs: compressed_sigs,
    bitmap,
    multisig_pk
  };
  const bytes = builder.ser("MultiSig", multisig).toBytes();
  let tmp = new Uint8Array(bytes.length + 1);
  tmp.set([SIGNATURE_SCHEME_TO_FLAG["MultiSig"]]);
  tmp.set(bytes, 1);
  return (0, import_bcs13.toB64)(tmp);
}
function decodeMultiSig(signature) {
  const parsed = (0, import_bcs13.fromB64)(signature);
  if (parsed.length < 1 || parsed[0] !== SIGNATURE_SCHEME_TO_FLAG["MultiSig"]) {
    throw new Error("Invalid MultiSig flag");
  }
  const multisig = builder.de("MultiSig", parsed.slice(1));
  let res = new Array(multisig.sigs.length);
  for (let i = 0; i < multisig.sigs.length; i++) {
    let s = multisig.sigs[i];
    let pk_index = as_indices(multisig.bitmap).at(i);
    let pk_bytes = Object.values(
      multisig.multisig_pk.pk_map[pk_index].pubKey
    )[0];
    const scheme = Object.keys(s)[0];
    if (scheme === "MultiSig") {
      throw new Error("MultiSig is not supported inside MultiSig");
    }
    const SIGNATURE_SCHEME_TO_PUBLIC_KEY = {
      ED25519: Ed25519PublicKey,
      Secp256k1: Secp256k1PublicKey,
      Secp256r1: Secp256r1PublicKey
    };
    const PublicKey2 = SIGNATURE_SCHEME_TO_PUBLIC_KEY[scheme];
    res[i] = {
      signatureScheme: scheme,
      signature: Uint8Array.from(Object.values(s)[0]),
      pubKey: new PublicKey2(pk_bytes),
      weight: multisig.multisig_pk.pk_map[pk_index].weight
    };
  }
  return res;
}
function toPkWeightPair(pair) {
  let pk_bytes = Array.from(pair.pubKey.toBytes().map((x) => Number(x)));
  switch (pair.pubKey.flag()) {
    case SIGNATURE_SCHEME_TO_FLAG["Secp256k1"]:
      return {
        pubKey: {
          Secp256k1: pk_bytes
        },
        weight: pair.weight
      };
    case SIGNATURE_SCHEME_TO_FLAG["Secp256r1"]:
      return {
        pubKey: {
          Secp256r1: pk_bytes
        },
        weight: pair.weight
      };
    case SIGNATURE_SCHEME_TO_FLAG["ED25519"]:
      return {
        pubKey: {
          ED25519: pk_bytes
        },
        weight: pair.weight
      };
    default:
      throw new Error("Unsupported signature scheme");
  }
}
function to_uint8array(threshold) {
  if (threshold < 0 || threshold > 65535) {
    throw new Error("Invalid threshold");
  }
  let arr = new Uint8Array(2);
  arr[0] = threshold & 255;
  arr[1] = threshold >> 8;
  return arr;
}
function as_indices(bitmap) {
  if (bitmap < 0 || bitmap > 1024) {
    throw new Error("Invalid bitmap");
  }
  let res = [];
  for (let i = 0; i < 10; i++) {
    if ((bitmap & 1 << i) !== 0) {
      res.push(i);
    }
  }
  return Uint8Array.from(res);
}

// src/keypairs/ed25519/keypair.ts
var import_tweetnacl3 = __toESM(require("tweetnacl"));

// src/cryptography/mnemonics.ts
var import_bcs15 = require("@mysten/bcs");
var import_bip39 = require("@scure/bip39");
function isValidHardenedPath(path) {
  if (!new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$").test(path)) {
    return false;
  }
  return true;
}
function isValidBIP32Path(path) {
  if (!new RegExp("^m\\/(54|74)'\\/784'\\/[0-9]+'\\/[0-9]+\\/[0-9]+$").test(path)) {
    return false;
  }
  return true;
}
function mnemonicToSeed(mnemonics) {
  return (0, import_bip39.mnemonicToSeedSync)(mnemonics, "");
}
function mnemonicToSeedHex(mnemonics) {
  return (0, import_bcs15.toHEX)(mnemonicToSeed(mnemonics));
}

// src/keypairs/ed25519/ed25519-hd-key.ts
var import_sha512 = require("@noble/hashes/sha512");
var import_hmac = require("@noble/hashes/hmac");
var import_tweetnacl2 = __toESM(require("tweetnacl"));
var import_bcs16 = require("@mysten/bcs");
var ED25519_CURVE = "ed25519 seed";
var HARDENED_OFFSET = 2147483648;
var pathRegex = new RegExp("^m(\\/[0-9]+')+$");
var replaceDerive = (val) => val.replace("'", "");
var getMasterKeyFromSeed = (seed) => {
  const h = import_hmac.hmac.create(import_sha512.sha512, ED25519_CURVE);
  const I = h.update((0, import_bcs16.fromHEX)(seed)).digest();
  const IL = I.slice(0, 32);
  const IR = I.slice(32);
  return {
    key: IL,
    chainCode: IR
  };
};
var CKDPriv = ({ key, chainCode }, index) => {
  const indexBuffer = new ArrayBuffer(4);
  const cv = new DataView(indexBuffer);
  cv.setUint32(0, index);
  const data = new Uint8Array(1 + key.length + indexBuffer.byteLength);
  data.set(new Uint8Array(1).fill(0));
  data.set(key, 1);
  data.set(new Uint8Array(indexBuffer, 0, indexBuffer.byteLength), key.length + 1);
  const I = import_hmac.hmac.create(import_sha512.sha512, chainCode).update(data).digest();
  const IL = I.slice(0, 32);
  const IR = I.slice(32);
  return {
    key: IL,
    chainCode: IR
  };
};
var isValidPath = (path) => {
  if (!pathRegex.test(path)) {
    return false;
  }
  return !path.split("/").slice(1).map(replaceDerive).some(
    isNaN
    /* ts T_T*/
  );
};
var derivePath = (path, seed, offset = HARDENED_OFFSET) => {
  if (!isValidPath(path)) {
    throw new Error("Invalid derivation path");
  }
  const { key, chainCode } = getMasterKeyFromSeed(seed);
  const segments = path.split("/").slice(1).map(replaceDerive).map((el) => parseInt(el, 10));
  return segments.reduce((parentKeys, segment) => CKDPriv(parentKeys, segment + offset), {
    key,
    chainCode
  });
};

// src/keypairs/ed25519/keypair.ts
var import_bcs19 = require("@mysten/bcs");

// src/cryptography/keypair.ts
var import_blake2b3 = require("@noble/hashes/blake2b");
var import_bcs18 = require("@mysten/bcs");
var PRIVATE_KEY_SIZE = 32;
var LEGACY_PRIVATE_KEY_SIZE = 64;
var BaseSigner = class {
  async signWithIntent(bytes, intent) {
    const intentMessage = messageWithIntent(intent, bytes);
    const digest = (0, import_blake2b3.blake2b)(intentMessage, { dkLen: 32 });
    const signature = toSerializedSignature({
      signature: await this.sign(digest),
      signatureScheme: this.getKeyScheme(),
      pubKey: this.getPublicKey()
    });
    return {
      signature,
      bytes: (0, import_bcs18.toB64)(bytes)
    };
  }
  async signTransactionBlock(bytes) {
    return this.signWithIntent(bytes, 0 /* TransactionData */);
  }
  async signPersonalMessage(bytes) {
    return this.signWithIntent(
      bcs.ser(["vector", "u8"], bytes).toBytes(),
      3 /* PersonalMessage */
    );
  }
  /**
   * @deprecated use `signPersonalMessage` instead
   */
  async signMessage(bytes) {
    return this.signPersonalMessage(bytes);
  }
  toSuiAddress() {
    return this.getPublicKey().toSuiAddress();
  }
};
var Keypair = class extends BaseSigner {
};

// src/keypairs/ed25519/keypair.ts
var DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
var Ed25519Keypair = class extends Keypair {
  /**
   * Create a new Ed25519 keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair Ed25519 keypair
   */
  constructor(keypair, _mpc = false, _email = null) {
    super();
    this.mpc = false;
    this.email = "";
    this.mpc = _mpc;
    if (this.mpc) {
      this.keypair = keypair;
      this.email = _email;
    } else if (keypair) {
      this.keypair = keypair;
    } else {
      this.keypair = import_tweetnacl3.default.sign.keyPair();
    }
  }
  /**
   * Get the key scheme of the keypair ED25519
   */
  getKeyScheme() {
    return "ED25519";
  }
  /**
   * Generate a new random Ed25519 keypair
   */
  static generate() {
    return new Ed25519Keypair(import_tweetnacl3.default.sign.keyPair());
  }
  /**
   * Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
   * This is NOT the private scalar which is result of hashing and bit clamping of
   * the raw secret key.
   *
   * The sui.keystore key is a list of Base64 encoded `flag || privkey`. To import
   * a key from sui.keystore to typescript, decode from base64 and remove the first
   * flag byte after checking it is indeed the Ed25519 scheme flag 0x00 (See more
   * on flag for signature scheme: https://github.com/MystenLabs/sui/blob/818406c5abdf7de1b80915a0519071eec3a5b1c7/crates/sui-types/src/crypto.rs#L1650):
   * ```
   * import { Ed25519Keypair, fromB64 } from '@mysten/sui';
   * const raw = fromB64(t[1]);
   * if (raw[0] !== 0 || raw.length !== PRIVATE_KEY_SIZE + 1) {
   *   throw new Error('invalid key');
   * }
   * const imported = Ed25519Keypair.fromSecretKey(raw.slice(1))
   * ```
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array
   * @param options: skip secret key validation
   */
  static fromSecretKey(secretKey, options) {
    const secretKeyLength = secretKey.length;
    if (secretKeyLength !== PRIVATE_KEY_SIZE) {
      throw new Error(
        `Wrong secretKey size. Expected ${PRIVATE_KEY_SIZE} bytes, got ${secretKeyLength}.`
      );
    }
    const keypair = import_tweetnacl3.default.sign.keyPair.fromSeed(secretKey);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const signature = import_tweetnacl3.default.sign.detached(signData, keypair.secretKey);
      if (!import_tweetnacl3.default.sign.detached.verify(signData, signature, keypair.publicKey)) {
        throw new Error("provided secretKey is invalid");
      }
    }
    return new Ed25519Keypair(keypair);
  }
  /**
   * The public key for this Ed25519 keypair
   */
  getPublicKey() {
    return new Ed25519PublicKey(this.keypair.publicKey);
  }
  async sign(data) {
    return this.signData(data);
  }
  /**
   * Return the signature for the provided data using Ed25519.
   */
  signData(data) {
    return import_tweetnacl3.default.sign.detached(data, this.keypair.secretKey);
  }
  /**
   * Return the signature for the provided data using Ed25519.
   */
  signBuffer(data) {
    return import_tweetnacl3.default.sign.detached(data, this.keypair.secretKey);
  }
  /**
   * Generate an Ed25519 keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */
  static fromSeed(seed) {
    const seedLength = seed.length;
    if (seedLength != 32) {
      throw new Error(`Wrong seed size. Expected 32 bytes, got ${seedLength}.`);
    }
    return new Ed25519Keypair(import_tweetnacl3.default.sign.keyPair.fromSeed(seed));
  }
  /**
   * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */
  static deriveKeypair(mnemonics, path) {
    if (path == null) {
      path = DEFAULT_ED25519_DERIVATION_PATH;
    }
    if (!isValidHardenedPath(path)) {
      throw new Error("Invalid derivation path");
    }
    const { key } = derivePath(path, mnemonicToSeedHex(mnemonics));
    return Ed25519Keypair.fromSecretKey(key);
  }
  /**
   * Derive Ed25519 keypair from mnemonicSeed and path.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */
  static deriveKeypairFromSeed(seedHex, path) {
    if (path == null) {
      path = DEFAULT_ED25519_DERIVATION_PATH;
    }
    if (!isValidHardenedPath(path)) {
      throw new Error("Invalid derivation path");
    }
    const { key } = derivePath(path, seedHex);
    return Ed25519Keypair.fromSecretKey(key);
  }
  /**
   * Derives account address, public key and private key
   * @returns publicKey, address and privateKey
   */
  toPrivateKeyObject() {
    const publicKeyHex = Buffer.from(this.getPublicKey().toBytes()).toString(
      "hex"
    );
    const privateKeyHex = Buffer.from(
      this.keypair.secretKey.slice(0, 32)
    ).toString("hex");
    const address = this.getPublicKey().toSuiAddress();
    return {
      address: address.startsWith("0x") ? address : "0x" + address,
      publicKeyHex: publicKeyHex.startsWith("0x") ? publicKeyHex : "0x" + publicKeyHex,
      privateKeyHex: privateKeyHex.startsWith("0x") ? privateKeyHex : "0x" + privateKeyHex
    };
  }
  /**
   * This returns an exported keypair object, the private key field is the pure 32-byte seed.
   */
  export() {
    return {
      schema: "ED25519",
      privateKey: (0, import_bcs19.toB64)(this.keypair.secretKey.slice(0, PRIVATE_KEY_SIZE))
    };
  }
};

// src/keypairs/secp256k1/keypair.ts
var import_sha2563 = require("@noble/hashes/sha256");
var import_secp256k12 = require("@noble/curves/secp256k1");
var import_bip32 = require("@scure/bip32");
var import_bcs20 = require("@mysten/bcs");
var import_utils4 = require("@noble/hashes/utils");
var import_blake2b4 = require("@noble/hashes/blake2b");
var DEFAULT_SECP256K1_DERIVATION_PATH = "m/54'/784'/0'/0/0";
var Secp256k1Keypair = class extends Keypair {
  /**
   * Create a new keypair instance.
   * Generate random keypair if no {@link Secp256k1Keypair} is provided.
   *
   * @param keypair secp256k1 keypair
   */
  constructor(keypair) {
    super();
    if (keypair) {
      this.keypair = keypair;
    } else {
      const secretKey = import_secp256k12.secp256k1.utils.randomPrivateKey();
      const publicKey = import_secp256k12.secp256k1.getPublicKey(secretKey, true);
      this.keypair = { publicKey, secretKey };
    }
  }
  /**
   * Get the key scheme of the keypair Secp256k1
   */
  getKeyScheme() {
    return "Secp256k1";
  }
  /**
   * Generate a new random keypair
   */
  static generate() {
    return new Secp256k1Keypair();
  }
  /**
   * Create a keypair from a raw secret key byte array.
   *
   * This method should only be used to recreate a keypair from a previously
   * generated secret key. Generating keypairs from a random seed should be done
   * with the {@link Keypair.fromSeed} method.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array
   * @param options: skip secret key validation
   */
  static fromSecretKey(secretKey, options) {
    const publicKey = import_secp256k12.secp256k1.getPublicKey(secretKey, true);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const msgHash = (0, import_utils4.bytesToHex)((0, import_blake2b4.blake2b)(signData, { dkLen: 32 }));
      const signature = import_secp256k12.secp256k1.sign(msgHash, secretKey);
      if (!import_secp256k12.secp256k1.verify(signature, msgHash, publicKey, { lowS: true })) {
        throw new Error("Provided secretKey is invalid");
      }
    }
    return new Secp256k1Keypair({ publicKey, secretKey });
  }
  /**
   * Generate a keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */
  static fromSeed(seed) {
    let publicKey = import_secp256k12.secp256k1.getPublicKey(seed, true);
    return new Secp256k1Keypair({ publicKey, secretKey: seed });
  }
  /**
   * The public key for this keypair
   */
  getPublicKey() {
    return new Secp256k1PublicKey(this.keypair.publicKey);
  }
  async sign(data) {
    return this.signData(data);
  }
  /**
   * Return the signature for the provided data.
   */
  signData(data) {
    const msgHash = (0, import_sha2563.sha256)(data);
    const sig = import_secp256k12.secp256k1.sign(msgHash, this.keypair.secretKey, {
      lowS: true
    });
    return sig.toCompactRawBytes();
  }
  /**
   * Derive Secp256k1 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/54'/784'/0'/0/0, otherwise the path must
   * be compliant to BIP-32 in form m/54'/784'/{account_index}'/{change_index}/{address_index}.
   */
  static deriveKeypair(mnemonics, path) {
    if (path == null) {
      path = DEFAULT_SECP256K1_DERIVATION_PATH;
    }
    if (!isValidBIP32Path(path)) {
      throw new Error("Invalid derivation path");
    }
    const key = import_bip32.HDKey.fromMasterSeed(mnemonicToSeed(mnemonics)).derive(path);
    if (key.publicKey == null || key.privateKey == null) {
      throw new Error("Invalid key");
    }
    return new Secp256k1Keypair({
      publicKey: key.publicKey,
      secretKey: key.privateKey
    });
  }
  export() {
    return {
      schema: "Secp256k1",
      privateKey: (0, import_bcs20.toB64)(this.keypair.secretKey)
    };
  }
};

// src/cryptography/utils.ts
function toParsedSignaturePubkeyPair(serializedSignature) {
  const bytes = (0, import_bcs21.fromB64)(serializedSignature);
  const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
  if (signatureScheme === "MultiSig") {
    try {
      return decodeMultiSig(serializedSignature);
    } catch (e) {
      throw new Error("legacy multisig viewing unsupported");
    }
  }
  const SIGNATURE_SCHEME_TO_PUBLIC_KEY = {
    ED25519: Ed25519PublicKey,
    Secp256k1: Secp256k1PublicKey,
    Secp256r1: Secp256r1PublicKey
  };
  const PublicKey2 = SIGNATURE_SCHEME_TO_PUBLIC_KEY[signatureScheme];
  const signature = bytes.slice(1, bytes.length - PublicKey2.SIZE);
  const pubkeyBytes = bytes.slice(1 + signature.length);
  const pubKey = new PublicKey2(pubkeyBytes);
  return [
    {
      signatureScheme,
      signature,
      pubKey
    }
  ];
}
function toSingleSignaturePubkeyPair(serializedSignature) {
  const res = toParsedSignaturePubkeyPair(serializedSignature);
  if (res.length !== 1) {
    throw Error("Expected a single signature");
  }
  return res[0];
}
function publicKeyFromSerialized(schema, pubKey) {
  if (schema === "ED25519") {
    return new Ed25519PublicKey(pubKey);
  }
  if (schema === "Secp256k1") {
    return new Secp256k1PublicKey(pubKey);
  }
  throw new Error("Unknown public key schema");
}
function fromExportedKeypair(keypair) {
  const secretKey = (0, import_bcs21.fromB64)(keypair.privateKey);
  switch (keypair.schema) {
    case "ED25519":
      let pureSecretKey = secretKey;
      if (secretKey.length === LEGACY_PRIVATE_KEY_SIZE) {
        pureSecretKey = secretKey.slice(0, PRIVATE_KEY_SIZE);
      }
      return Ed25519Keypair.fromSecretKey(pureSecretKey);
    case "Secp256k1":
      return Secp256k1Keypair.fromSecretKey(secretKey);
    default:
      throw new Error(`Invalid keypair schema ${keypair.schema}`);
  }
}

// src/types/checkpoints.ts
var import_superstruct = require("superstruct");
var GasCostSummary = (0, import_superstruct.object)({
  computationCost: (0, import_superstruct.string)(),
  storageCost: (0, import_superstruct.string)(),
  storageRebate: (0, import_superstruct.string)(),
  nonRefundableStorageFee: (0, import_superstruct.string)()
});
var CheckPointContentsDigest = (0, import_superstruct.string)();
var CheckpointDigest = (0, import_superstruct.string)();
var ECMHLiveObjectSetDigest = (0, import_superstruct.object)({
  digest: (0, import_superstruct.array)((0, import_superstruct.number)())
});
var CheckpointCommitment = (0, import_superstruct.any)();
var ValidatorSignature = (0, import_superstruct.string)();
var EndOfEpochData = (0, import_superstruct.object)({
  nextEpochCommittee: (0, import_superstruct.array)((0, import_superstruct.tuple)([(0, import_superstruct.string)(), (0, import_superstruct.string)()])),
  nextEpochProtocolVersion: (0, import_superstruct.string)(),
  epochCommitments: (0, import_superstruct.array)(CheckpointCommitment)
});
var ExecutionDigests = (0, import_superstruct.object)({
  transaction: (0, import_superstruct.string)(),
  effects: (0, import_superstruct.string)()
});
var Checkpoint = (0, import_superstruct.object)({
  epoch: (0, import_superstruct.string)(),
  sequenceNumber: (0, import_superstruct.string)(),
  digest: (0, import_superstruct.string)(),
  networkTotalTransactions: (0, import_superstruct.string)(),
  previousDigest: (0, import_superstruct.optional)((0, import_superstruct.string)()),
  epochRollingGasCostSummary: GasCostSummary,
  timestampMs: (0, import_superstruct.string)(),
  endOfEpochData: (0, import_superstruct.optional)(EndOfEpochData),
  validatorSignature: (0, import_superstruct.string)(),
  transactions: (0, import_superstruct.array)((0, import_superstruct.string)()),
  checkpointCommitments: (0, import_superstruct.array)(CheckpointCommitment)
});
var CheckpointPage = (0, import_superstruct.object)({
  data: (0, import_superstruct.array)(Checkpoint),
  nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
  hasNextPage: (0, import_superstruct.boolean)()
});

// src/types/objects.ts
var import_superstruct3 = require("superstruct");

// src/types/common.ts
var import_superstruct2 = require("superstruct");
var TransactionDigest = (0, import_superstruct2.string)();
var TransactionEffectsDigest = (0, import_superstruct2.string)();
var TransactionEventDigest = (0, import_superstruct2.string)();
var ObjectId = (0, import_superstruct2.string)();
var SuiAddress = (0, import_superstruct2.string)();
var SequenceNumber = (0, import_superstruct2.string)();
var ObjectOwner = (0, import_superstruct2.union)([
  (0, import_superstruct2.object)({
    AddressOwner: (0, import_superstruct2.string)()
  }),
  (0, import_superstruct2.object)({
    ObjectOwner: (0, import_superstruct2.string)()
  }),
  (0, import_superstruct2.object)({
    Shared: (0, import_superstruct2.object)({
      initial_shared_version: (0, import_superstruct2.nullable)((0, import_superstruct2.string)())
    })
  }),
  (0, import_superstruct2.literal)("Immutable")
]);
var SuiJsonValue = (0, import_superstruct2.define)("SuiJsonValue", () => true);
var ProtocolConfigValue = (0, import_superstruct2.union)([
  (0, import_superstruct2.object)({ u32: (0, import_superstruct2.string)() }),
  (0, import_superstruct2.object)({ u64: (0, import_superstruct2.string)() }),
  (0, import_superstruct2.object)({ f64: (0, import_superstruct2.string)() })
]);
var ProtocolConfig = (0, import_superstruct2.object)({
  attributes: (0, import_superstruct2.record)((0, import_superstruct2.string)(), (0, import_superstruct2.nullable)(ProtocolConfigValue)),
  featureFlags: (0, import_superstruct2.record)((0, import_superstruct2.string)(), (0, import_superstruct2.boolean)()),
  maxSupportedProtocolVersion: (0, import_superstruct2.string)(),
  minSupportedProtocolVersion: (0, import_superstruct2.string)(),
  protocolVersion: (0, import_superstruct2.string)()
});

// src/types/objects.ts
var ObjectType = (0, import_superstruct3.union)([(0, import_superstruct3.string)(), (0, import_superstruct3.literal)("package")]);
var SuiObjectRef = (0, import_superstruct3.object)({
  /** Base64 string representing the object digest */
  digest: (0, import_superstruct3.string)(),
  /** Hex code as string representing the object id */
  objectId: (0, import_superstruct3.string)(),
  /** Object version */
  version: (0, import_superstruct3.union)([(0, import_superstruct3.number)(), (0, import_superstruct3.string)()])
});
var SuiGasData = (0, import_superstruct3.object)({
  payment: (0, import_superstruct3.array)(SuiObjectRef),
  /** Gas Object's owner */
  owner: (0, import_superstruct3.string)(),
  price: (0, import_superstruct3.string)(),
  budget: (0, import_superstruct3.string)()
});
var SuiObjectInfo = (0, import_superstruct3.assign)(
  SuiObjectRef,
  (0, import_superstruct3.object)({
    type: (0, import_superstruct3.string)(),
    owner: ObjectOwner,
    previousTransaction: (0, import_superstruct3.string)()
  })
);
var ObjectContentFields = (0, import_superstruct3.record)((0, import_superstruct3.string)(), (0, import_superstruct3.any)());
var MovePackageContent = (0, import_superstruct3.record)((0, import_superstruct3.string)(), (0, import_superstruct3.unknown)());
var SuiMoveObject = (0, import_superstruct3.object)({
  /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */
  type: (0, import_superstruct3.string)(),
  /** Fields and values stored inside the Move object */
  fields: ObjectContentFields,
  hasPublicTransfer: (0, import_superstruct3.boolean)()
});
var SuiMovePackage = (0, import_superstruct3.object)({
  /** A mapping from module name to disassembled Move bytecode */
  disassembled: MovePackageContent
});
var SuiParsedData = (0, import_superstruct3.union)([
  (0, import_superstruct3.assign)(SuiMoveObject, (0, import_superstruct3.object)({ dataType: (0, import_superstruct3.literal)("moveObject") })),
  (0, import_superstruct3.assign)(SuiMovePackage, (0, import_superstruct3.object)({ dataType: (0, import_superstruct3.literal)("package") }))
]);
var SuiRawMoveObject = (0, import_superstruct3.object)({
  /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */
  type: (0, import_superstruct3.string)(),
  hasPublicTransfer: (0, import_superstruct3.boolean)(),
  version: (0, import_superstruct3.string)(),
  bcsBytes: (0, import_superstruct3.string)()
});
var SuiRawMovePackage = (0, import_superstruct3.object)({
  id: (0, import_superstruct3.string)(),
  /** A mapping from module name to Move bytecode enocded in base64*/
  moduleMap: (0, import_superstruct3.record)((0, import_superstruct3.string)(), (0, import_superstruct3.string)())
});
var SuiRawData = (0, import_superstruct3.union)([
  (0, import_superstruct3.assign)(SuiRawMoveObject, (0, import_superstruct3.object)({ dataType: (0, import_superstruct3.literal)("moveObject") })),
  (0, import_superstruct3.assign)(SuiRawMovePackage, (0, import_superstruct3.object)({ dataType: (0, import_superstruct3.literal)("package") }))
]);
var SUI_DECIMALS = 9;
var MIST_PER_SUI = BigInt(1e9);
var ObjectDigest = (0, import_superstruct3.string)();
var SuiObjectResponseError = (0, import_superstruct3.object)({
  code: (0, import_superstruct3.string)(),
  error: (0, import_superstruct3.optional)((0, import_superstruct3.string)()),
  object_id: (0, import_superstruct3.optional)((0, import_superstruct3.string)()),
  parent_object_id: (0, import_superstruct3.optional)((0, import_superstruct3.string)()),
  version: (0, import_superstruct3.optional)((0, import_superstruct3.string)()),
  digest: (0, import_superstruct3.optional)((0, import_superstruct3.string)())
});
var DisplayFieldsResponse = (0, import_superstruct3.object)({
  data: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.record)((0, import_superstruct3.string)(), (0, import_superstruct3.string)()))),
  error: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(SuiObjectResponseError))
});
var DisplayFieldsBackwardCompatibleResponse = (0, import_superstruct3.union)([
  DisplayFieldsResponse,
  (0, import_superstruct3.optional)((0, import_superstruct3.record)((0, import_superstruct3.string)(), (0, import_superstruct3.string)()))
]);
var SuiObjectData = (0, import_superstruct3.object)({
  objectId: (0, import_superstruct3.string)(),
  version: (0, import_superstruct3.string)(),
  digest: (0, import_superstruct3.string)(),
  /**
   * Type of the object, default to be undefined unless SuiObjectDataOptions.showType is set to true
   */
  type: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.string)())),
  /**
   * Move object content or package content, default to be undefined unless SuiObjectDataOptions.showContent is set to true
   */
  content: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(SuiParsedData)),
  /**
   * Move object content or package content in BCS bytes, default to be undefined unless SuiObjectDataOptions.showBcs is set to true
   */
  bcs: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(SuiRawData)),
  /**
   * The owner of this object. Default to be undefined unless SuiObjectDataOptions.showOwner is set to true
   */
  owner: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(ObjectOwner)),
  /**
   * The digest of the transaction that created or last mutated this object.
   * Default to be undefined unless SuiObjectDataOptions.showPreviousTransaction is set to true
   */
  previousTransaction: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.string)())),
  /**
   * The amount of SUI we would rebate if this object gets deleted.
   * This number is re-calculated each time the object is mutated based on
   * the present storage gas price.
   * Default to be undefined unless SuiObjectDataOptions.showStorageRebate is set to true
   */
  storageRebate: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.string)())),
  /**
   * Display metadata for this object, default to be undefined unless SuiObjectDataOptions.showDisplay is set to true
   * This can also be None if the struct type does not have Display defined
   * See more details in https://forums.sui.io/t/nft-object-display-proposal/4872
   */
  display: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(DisplayFieldsBackwardCompatibleResponse))
});
var SuiObjectDataOptions = (0, import_superstruct3.object)({
  /* Whether to fetch the object type, default to be true */
  showType: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)())),
  /* Whether to fetch the object content, default to be false */
  showContent: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)())),
  /* Whether to fetch the object content in BCS bytes, default to be false */
  showBcs: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)())),
  /* Whether to fetch the object owner, default to be false */
  showOwner: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)())),
  /* Whether to fetch the previous transaction digest, default to be false */
  showPreviousTransaction: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)())),
  /* Whether to fetch the storage rebate, default to be false */
  showStorageRebate: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)())),
  /* Whether to fetch the display metadata, default to be false */
  showDisplay: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)((0, import_superstruct3.boolean)()))
});
var ObjectStatus = (0, import_superstruct3.union)([(0, import_superstruct3.literal)("Exists"), (0, import_superstruct3.literal)("notExists"), (0, import_superstruct3.literal)("Deleted")]);
var GetOwnedObjectsResponse = (0, import_superstruct3.array)(SuiObjectInfo);
var SuiObjectResponse = (0, import_superstruct3.object)({
  data: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(SuiObjectData)),
  error: (0, import_superstruct3.nullable)((0, import_superstruct3.optional)(SuiObjectResponseError))
});
function getSuiObjectData(resp) {
  return resp.data;
}
function getObjectDeletedResponse(resp) {
  if (resp.error && "object_id" in resp.error && "version" in resp.error && "digest" in resp.error) {
    const error = resp.error;
    return {
      objectId: error.object_id,
      version: error.version,
      digest: error.digest
    };
  }
  return void 0;
}
function getObjectNotExistsResponse(resp) {
  if (resp.error && "object_id" in resp.error && !("version" in resp.error) && !("digest" in resp.error)) {
    return resp.error.object_id;
  }
  return void 0;
}
function getObjectReference(resp) {
  if ("reference" in resp) {
    return resp.reference;
  }
  const exists = getSuiObjectData(resp);
  if (exists) {
    return {
      objectId: exists.objectId,
      version: exists.version,
      digest: exists.digest
    };
  }
  return getObjectDeletedResponse(resp);
}
function getObjectId(data) {
  if ("objectId" in data) {
    return data.objectId;
  }
  return getObjectReference(data)?.objectId ?? getObjectNotExistsResponse(data);
}
function getObjectVersion(data) {
  if ("version" in data) {
    return data.version;
  }
  return getObjectReference(data)?.version;
}
function isSuiObjectResponse(resp) {
  return resp.data !== void 0;
}
function getObjectType(resp) {
  const data = isSuiObjectResponse(resp) ? resp.data : resp;
  if (!data?.type && "data" in resp) {
    if (data?.content?.dataType === "package") {
      return "package";
    }
    return getMoveObjectType(resp);
  }
  return data?.type;
}
function getObjectPreviousTransactionDigest(resp) {
  return getSuiObjectData(resp)?.previousTransaction;
}
function getObjectOwner(resp) {
  if ((0, import_superstruct3.is)(resp, ObjectOwner)) {
    return resp;
  }
  return getSuiObjectData(resp)?.owner;
}
function getObjectDisplay(resp) {
  const display = getSuiObjectData(resp)?.display;
  if (!display) {
    return { data: null, error: null };
  }
  if ((0, import_superstruct3.is)(display, DisplayFieldsResponse)) {
    return display;
  }
  return {
    data: display,
    error: null
  };
}
function getSharedObjectInitialVersion(resp) {
  const owner = getObjectOwner(resp);
  if (owner && typeof owner === "object" && "Shared" in owner) {
    return owner.Shared.initial_shared_version;
  } else {
    return void 0;
  }
}
function isSharedObject(resp) {
  const owner = getObjectOwner(resp);
  return !!owner && typeof owner === "object" && "Shared" in owner;
}
function isImmutableObject(resp) {
  const owner = getObjectOwner(resp);
  return owner === "Immutable";
}
function getMoveObjectType(resp) {
  return getMoveObject(resp)?.type;
}
function getObjectFields(resp) {
  if ("fields" in resp) {
    return resp.fields;
  }
  return getMoveObject(resp)?.fields;
}
function isSuiObjectDataWithContent(data) {
  return data.content !== void 0;
}
function getMoveObject(data) {
  const suiObject = "data" in data ? getSuiObjectData(data) : data;
  if (!suiObject || !isSuiObjectDataWithContent(suiObject) || suiObject.content.dataType !== "moveObject") {
    return void 0;
  }
  return suiObject.content;
}
function hasPublicTransfer(data) {
  return getMoveObject(data)?.hasPublicTransfer ?? false;
}
function getMovePackageContent(data) {
  if ("disassembled" in data) {
    return data.disassembled;
  }
  const suiObject = getSuiObjectData(data);
  if (suiObject?.content?.dataType !== "package") {
    return void 0;
  }
  return suiObject.content.disassembled;
}
var CheckpointedObjectId = (0, import_superstruct3.object)({
  objectId: (0, import_superstruct3.string)(),
  atCheckpoint: (0, import_superstruct3.optional)((0, import_superstruct3.number)())
});
var PaginatedObjectsResponse = (0, import_superstruct3.object)({
  data: (0, import_superstruct3.array)(SuiObjectResponse),
  nextCursor: (0, import_superstruct3.optional)((0, import_superstruct3.nullable)((0, import_superstruct3.string)())),
  hasNextPage: (0, import_superstruct3.boolean)()
});
var ObjectRead = (0, import_superstruct3.union)([
  (0, import_superstruct3.object)({
    details: SuiObjectData,
    status: (0, import_superstruct3.literal)("VersionFound")
  }),
  (0, import_superstruct3.object)({
    details: (0, import_superstruct3.string)(),
    status: (0, import_superstruct3.literal)("ObjectNotExists")
  }),
  (0, import_superstruct3.object)({
    details: SuiObjectRef,
    status: (0, import_superstruct3.literal)("ObjectDeleted")
  }),
  (0, import_superstruct3.object)({
    details: (0, import_superstruct3.tuple)([(0, import_superstruct3.string)(), (0, import_superstruct3.number)()]),
    status: (0, import_superstruct3.literal)("VersionNotFound")
  }),
  (0, import_superstruct3.object)({
    details: (0, import_superstruct3.object)({
      asked_version: (0, import_superstruct3.number)(),
      latest_version: (0, import_superstruct3.number)(),
      object_id: (0, import_superstruct3.string)()
    }),
    status: (0, import_superstruct3.literal)("VersionTooHigh")
  })
]);

// src/types/transactions.ts
var import_superstruct5 = require("superstruct");

// src/types/events.ts
var import_superstruct4 = require("superstruct");
var EventId = (0, import_superstruct4.object)({
  txDigest: (0, import_superstruct4.string)(),
  eventSeq: (0, import_superstruct4.string)()
});
var SuiEvent = (0, import_superstruct4.object)({
  id: EventId,
  // Move package where this event was emitted.
  packageId: (0, import_superstruct4.string)(),
  // Move module where this event was emitted.
  transactionModule: (0, import_superstruct4.string)(),
  // Sender's Sui address.
  sender: (0, import_superstruct4.string)(),
  // Move event type.
  type: (0, import_superstruct4.string)(),
  // Parsed json value of the event
  parsedJson: (0, import_superstruct4.optional)((0, import_superstruct4.record)((0, import_superstruct4.string)(), (0, import_superstruct4.any)())),
  // Base 58 encoded bcs bytes of the move event
  bcs: (0, import_superstruct4.optional)((0, import_superstruct4.string)()),
  timestampMs: (0, import_superstruct4.optional)((0, import_superstruct4.string)())
});
var PaginatedEvents = (0, import_superstruct4.object)({
  data: (0, import_superstruct4.array)(SuiEvent),
  nextCursor: (0, import_superstruct4.nullable)(EventId),
  hasNextPage: (0, import_superstruct4.boolean)()
});
function getEventSender(event) {
  return event.sender;
}
function getEventPackage(event) {
  return event.packageId;
}

// src/types/transactions.ts
var EpochId = (0, import_superstruct5.string)();
var SuiChangeEpoch = (0, import_superstruct5.object)({
  epoch: (0, import_superstruct5.string)(),
  storage_charge: (0, import_superstruct5.string)(),
  computation_charge: (0, import_superstruct5.string)(),
  storage_rebate: (0, import_superstruct5.string)(),
  epoch_start_timestamp_ms: (0, import_superstruct5.optional)((0, import_superstruct5.string)())
});
var SuiConsensusCommitPrologue = (0, import_superstruct5.object)({
  epoch: (0, import_superstruct5.string)(),
  round: (0, import_superstruct5.string)(),
  commit_timestamp_ms: (0, import_superstruct5.string)()
});
var Genesis = (0, import_superstruct5.object)({
  objects: (0, import_superstruct5.array)((0, import_superstruct5.string)())
});
var SuiArgument = (0, import_superstruct5.union)([
  (0, import_superstruct5.literal)("GasCoin"),
  (0, import_superstruct5.object)({ Input: (0, import_superstruct5.number)() }),
  (0, import_superstruct5.object)({ Result: (0, import_superstruct5.number)() }),
  (0, import_superstruct5.object)({ NestedResult: (0, import_superstruct5.tuple)([(0, import_superstruct5.number)(), (0, import_superstruct5.number)()]) })
]);
var MoveCallSuiTransaction = (0, import_superstruct5.object)({
  arguments: (0, import_superstruct5.optional)((0, import_superstruct5.array)(SuiArgument)),
  type_arguments: (0, import_superstruct5.optional)((0, import_superstruct5.array)((0, import_superstruct5.string)())),
  package: (0, import_superstruct5.string)(),
  module: (0, import_superstruct5.string)(),
  function: (0, import_superstruct5.string)()
});
var SuiTransaction = (0, import_superstruct5.union)([
  (0, import_superstruct5.object)({ MoveCall: MoveCallSuiTransaction }),
  (0, import_superstruct5.object)({ TransferObjects: (0, import_superstruct5.tuple)([(0, import_superstruct5.array)(SuiArgument), SuiArgument]) }),
  (0, import_superstruct5.object)({ SplitCoins: (0, import_superstruct5.tuple)([SuiArgument, (0, import_superstruct5.array)(SuiArgument)]) }),
  (0, import_superstruct5.object)({ MergeCoins: (0, import_superstruct5.tuple)([SuiArgument, (0, import_superstruct5.array)(SuiArgument)]) }),
  (0, import_superstruct5.object)({
    Publish: (0, import_superstruct5.union)([
      // TODO: Remove this after 0.34 is released:
      (0, import_superstruct5.tuple)([SuiMovePackage, (0, import_superstruct5.array)((0, import_superstruct5.string)())]),
      (0, import_superstruct5.array)((0, import_superstruct5.string)())
    ])
  }),
  (0, import_superstruct5.object)({
    Upgrade: (0, import_superstruct5.union)([
      // TODO: Remove this after 0.34 is released:
      (0, import_superstruct5.tuple)([SuiMovePackage, (0, import_superstruct5.array)((0, import_superstruct5.string)()), (0, import_superstruct5.string)(), SuiArgument]),
      (0, import_superstruct5.tuple)([(0, import_superstruct5.array)((0, import_superstruct5.string)()), (0, import_superstruct5.string)(), SuiArgument])
    ])
  }),
  (0, import_superstruct5.object)({ MakeMoveVec: (0, import_superstruct5.tuple)([(0, import_superstruct5.nullable)((0, import_superstruct5.string)()), (0, import_superstruct5.array)(SuiArgument)]) })
]);
var SuiCallArg = (0, import_superstruct5.union)([
  (0, import_superstruct5.object)({
    type: (0, import_superstruct5.literal)("pure"),
    valueType: (0, import_superstruct5.nullable)((0, import_superstruct5.string)()),
    value: SuiJsonValue
  }),
  (0, import_superstruct5.object)({
    type: (0, import_superstruct5.literal)("object"),
    objectType: (0, import_superstruct5.literal)("immOrOwnedObject"),
    objectId: (0, import_superstruct5.string)(),
    version: (0, import_superstruct5.string)(),
    digest: (0, import_superstruct5.string)()
  }),
  (0, import_superstruct5.object)({
    type: (0, import_superstruct5.literal)("object"),
    objectType: (0, import_superstruct5.literal)("sharedObject"),
    objectId: (0, import_superstruct5.string)(),
    initialSharedVersion: (0, import_superstruct5.string)(),
    mutable: (0, import_superstruct5.boolean)()
  })
]);
var ProgrammableTransaction = (0, import_superstruct5.object)({
  transactions: (0, import_superstruct5.array)(SuiTransaction),
  inputs: (0, import_superstruct5.array)(SuiCallArg)
});
var SuiTransactionBlockKind = (0, import_superstruct5.union)([
  (0, import_superstruct5.assign)(SuiChangeEpoch, (0, import_superstruct5.object)({ kind: (0, import_superstruct5.literal)("ChangeEpoch") })),
  (0, import_superstruct5.assign)(
    SuiConsensusCommitPrologue,
    (0, import_superstruct5.object)({
      kind: (0, import_superstruct5.literal)("ConsensusCommitPrologue")
    })
  ),
  (0, import_superstruct5.assign)(Genesis, (0, import_superstruct5.object)({ kind: (0, import_superstruct5.literal)("Genesis") })),
  (0, import_superstruct5.assign)(
    ProgrammableTransaction,
    (0, import_superstruct5.object)({ kind: (0, import_superstruct5.literal)("ProgrammableTransaction") })
  )
]);
var SuiTransactionBlockData = (0, import_superstruct5.object)({
  // Eventually this will become union(literal('v1'), literal('v2'), ...)
  messageVersion: (0, import_superstruct5.literal)("v1"),
  transaction: SuiTransactionBlockKind,
  sender: (0, import_superstruct5.string)(),
  gasData: SuiGasData
});
var AuthoritySignature = (0, import_superstruct5.string)();
var GenericAuthoritySignature = (0, import_superstruct5.union)([(0, import_superstruct5.string)(), (0, import_superstruct5.array)((0, import_superstruct5.string)())]);
var AuthorityQuorumSignInfo = (0, import_superstruct5.object)({
  epoch: (0, import_superstruct5.string)(),
  signature: GenericAuthoritySignature,
  signers_map: (0, import_superstruct5.array)((0, import_superstruct5.number)())
});
var GasCostSummary2 = (0, import_superstruct5.object)({
  computationCost: (0, import_superstruct5.string)(),
  storageCost: (0, import_superstruct5.string)(),
  storageRebate: (0, import_superstruct5.string)(),
  nonRefundableStorageFee: (0, import_superstruct5.string)()
});
var ExecutionStatusType = (0, import_superstruct5.union)([
  (0, import_superstruct5.literal)("success"),
  (0, import_superstruct5.literal)("failure")
]);
var ExecutionStatus = (0, import_superstruct5.object)({
  status: ExecutionStatusType,
  error: (0, import_superstruct5.optional)((0, import_superstruct5.string)())
});
var OwnedObjectRef = (0, import_superstruct5.object)({
  owner: ObjectOwner,
  reference: SuiObjectRef
});
var TransactionEffectsModifiedAtVersions = (0, import_superstruct5.object)({
  objectId: (0, import_superstruct5.string)(),
  sequenceNumber: (0, import_superstruct5.string)()
});
var TransactionEffects = (0, import_superstruct5.object)({
  // Eventually this will become union(literal('v1'), literal('v2'), ...)
  messageVersion: (0, import_superstruct5.literal)("v1"),
  /** The status of the execution */
  status: ExecutionStatus,
  /** The epoch when this transaction was executed */
  executedEpoch: (0, import_superstruct5.string)(),
  /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/
  modifiedAtVersions: (0, import_superstruct5.optional)((0, import_superstruct5.array)(TransactionEffectsModifiedAtVersions)),
  gasUsed: GasCostSummary2,
  /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */
  sharedObjects: (0, import_superstruct5.optional)((0, import_superstruct5.array)(SuiObjectRef)),
  /** The transaction digest */
  transactionDigest: (0, import_superstruct5.string)(),
  /** ObjectRef and owner of new objects created */
  created: (0, import_superstruct5.optional)((0, import_superstruct5.array)(OwnedObjectRef)),
  /** ObjectRef and owner of mutated objects, including gas object */
  mutated: (0, import_superstruct5.optional)((0, import_superstruct5.array)(OwnedObjectRef)),
  /**
   * ObjectRef and owner of objects that are unwrapped in this transaction.
   * Unwrapped objects are objects that were wrapped into other objects in the past,
   * and just got extracted out.
   */
  unwrapped: (0, import_superstruct5.optional)((0, import_superstruct5.array)(OwnedObjectRef)),
  /** Object Refs of objects now deleted (the old refs) */
  deleted: (0, import_superstruct5.optional)((0, import_superstruct5.array)(SuiObjectRef)),
  /** Object Refs of objects now deleted (the old refs) */
  unwrappedThenDeleted: (0, import_superstruct5.optional)((0, import_superstruct5.array)(SuiObjectRef)),
  /** Object refs of objects now wrapped in other objects */
  wrapped: (0, import_superstruct5.optional)((0, import_superstruct5.array)(SuiObjectRef)),
  /**
   * The updated gas object reference. Have a dedicated field for convenient access.
   * It's also included in mutated.
   */
  gasObject: OwnedObjectRef,
  /** The events emitted during execution. Note that only successful transactions emit events */
  eventsDigest: (0, import_superstruct5.nullable)((0, import_superstruct5.optional)((0, import_superstruct5.string)())),
  /** The set of transaction digests this transaction depends on */
  dependencies: (0, import_superstruct5.optional)((0, import_superstruct5.array)((0, import_superstruct5.string)()))
});
var TransactionEvents = (0, import_superstruct5.array)(SuiEvent);
var ReturnValueType = (0, import_superstruct5.tuple)([(0, import_superstruct5.array)((0, import_superstruct5.number)()), (0, import_superstruct5.string)()]);
var MutableReferenceOutputType = (0, import_superstruct5.tuple)([
  SuiArgument,
  (0, import_superstruct5.array)((0, import_superstruct5.number)()),
  (0, import_superstruct5.string)()
]);
var ExecutionResultType = (0, import_superstruct5.object)({
  mutableReferenceOutputs: (0, import_superstruct5.optional)((0, import_superstruct5.array)(MutableReferenceOutputType)),
  returnValues: (0, import_superstruct5.optional)((0, import_superstruct5.array)(ReturnValueType))
});
var DevInspectResults = (0, import_superstruct5.object)({
  effects: TransactionEffects,
  events: TransactionEvents,
  results: (0, import_superstruct5.optional)((0, import_superstruct5.array)(ExecutionResultType)),
  error: (0, import_superstruct5.optional)((0, import_superstruct5.string)())
});
var AuthorityName = (0, import_superstruct5.string)();
var SuiTransactionBlock = (0, import_superstruct5.object)({
  data: SuiTransactionBlockData,
  txSignatures: (0, import_superstruct5.array)((0, import_superstruct5.string)())
});
var SuiObjectChangePublished = (0, import_superstruct5.object)({
  type: (0, import_superstruct5.literal)("published"),
  packageId: (0, import_superstruct5.string)(),
  version: (0, import_superstruct5.string)(),
  digest: (0, import_superstruct5.string)(),
  modules: (0, import_superstruct5.array)((0, import_superstruct5.string)())
});
var SuiObjectChangeTransferred = (0, import_superstruct5.object)({
  type: (0, import_superstruct5.literal)("transferred"),
  sender: (0, import_superstruct5.string)(),
  recipient: ObjectOwner,
  objectType: (0, import_superstruct5.string)(),
  objectId: (0, import_superstruct5.string)(),
  version: (0, import_superstruct5.string)(),
  digest: (0, import_superstruct5.string)()
});
var SuiObjectChangeMutated = (0, import_superstruct5.object)({
  type: (0, import_superstruct5.literal)("mutated"),
  sender: (0, import_superstruct5.string)(),
  owner: ObjectOwner,
  objectType: (0, import_superstruct5.string)(),
  objectId: (0, import_superstruct5.string)(),
  version: (0, import_superstruct5.string)(),
  previousVersion: (0, import_superstruct5.string)(),
  digest: (0, import_superstruct5.string)()
});
var SuiObjectChangeDeleted = (0, import_superstruct5.object)({
  type: (0, import_superstruct5.literal)("deleted"),
  sender: (0, import_superstruct5.string)(),
  objectType: (0, import_superstruct5.string)(),
  objectId: (0, import_superstruct5.string)(),
  version: (0, import_superstruct5.string)()
});
var SuiObjectChangeWrapped = (0, import_superstruct5.object)({
  type: (0, import_superstruct5.literal)("wrapped"),
  sender: (0, import_superstruct5.string)(),
  objectType: (0, import_superstruct5.string)(),
  objectId: (0, import_superstruct5.string)(),
  version: (0, import_superstruct5.string)()
});
var SuiObjectChangeCreated = (0, import_superstruct5.object)({
  type: (0, import_superstruct5.literal)("created"),
  sender: (0, import_superstruct5.string)(),
  owner: ObjectOwner,
  objectType: (0, import_superstruct5.string)(),
  objectId: (0, import_superstruct5.string)(),
  version: (0, import_superstruct5.string)(),
  digest: (0, import_superstruct5.string)()
});
var SuiObjectChange = (0, import_superstruct5.union)([
  SuiObjectChangePublished,
  SuiObjectChangeTransferred,
  SuiObjectChangeMutated,
  SuiObjectChangeDeleted,
  SuiObjectChangeWrapped,
  SuiObjectChangeCreated
]);
var BalanceChange = (0, import_superstruct5.object)({
  owner: ObjectOwner,
  coinType: (0, import_superstruct5.string)(),
  /* Coin balance change(positive means receive, negative means send) */
  amount: (0, import_superstruct5.string)()
});
var SuiTransactionBlockResponse = (0, import_superstruct5.object)({
  digest: (0, import_superstruct5.string)(),
  transaction: (0, import_superstruct5.optional)(SuiTransactionBlock),
  effects: (0, import_superstruct5.optional)(TransactionEffects),
  events: (0, import_superstruct5.optional)(TransactionEvents),
  timestampMs: (0, import_superstruct5.optional)((0, import_superstruct5.string)()),
  checkpoint: (0, import_superstruct5.optional)((0, import_superstruct5.string)()),
  confirmedLocalExecution: (0, import_superstruct5.optional)((0, import_superstruct5.boolean)()),
  objectChanges: (0, import_superstruct5.optional)((0, import_superstruct5.array)(SuiObjectChange)),
  balanceChanges: (0, import_superstruct5.optional)((0, import_superstruct5.array)(BalanceChange)),
  /* Errors that occurred in fetching/serializing the transaction. */
  errors: (0, import_superstruct5.optional)((0, import_superstruct5.array)((0, import_superstruct5.string)()))
});
var SuiTransactionBlockResponseOptions = (0, import_superstruct5.object)({
  /* Whether to show transaction input data. Default to be false. */
  showInput: (0, import_superstruct5.optional)((0, import_superstruct5.boolean)()),
  /* Whether to show transaction effects. Default to be false. */
  showEffects: (0, import_superstruct5.optional)((0, import_superstruct5.boolean)()),
  /* Whether to show transaction events. Default to be false. */
  showEvents: (0, import_superstruct5.optional)((0, import_superstruct5.boolean)()),
  /* Whether to show object changes. Default to be false. */
  showObjectChanges: (0, import_superstruct5.optional)((0, import_superstruct5.boolean)()),
  /* Whether to show coin balance changes. Default to be false. */
  showBalanceChanges: (0, import_superstruct5.optional)((0, import_superstruct5.boolean)())
});
var PaginatedTransactionResponse = (0, import_superstruct5.object)({
  data: (0, import_superstruct5.array)(SuiTransactionBlockResponse),
  nextCursor: (0, import_superstruct5.nullable)((0, import_superstruct5.string)()),
  hasNextPage: (0, import_superstruct5.boolean)()
});
var DryRunTransactionBlockResponse = (0, import_superstruct5.object)({
  effects: TransactionEffects,
  events: TransactionEvents,
  objectChanges: (0, import_superstruct5.array)(SuiObjectChange),
  balanceChanges: (0, import_superstruct5.array)(BalanceChange),
  // TODO: Remove optional when this is rolled out to all networks:
  input: (0, import_superstruct5.optional)(SuiTransactionBlockData)
});
function getTransaction(tx) {
  return tx.transaction;
}
function getTransactionDigest(tx) {
  return tx.digest;
}
function getTransactionSignature(tx) {
  return tx.transaction?.txSignatures;
}
function getTransactionSender(tx) {
  return tx.transaction?.data.sender;
}
function getGasData(tx) {
  return tx.transaction?.data.gasData;
}
function getTransactionGasObject(tx) {
  return getGasData(tx)?.payment;
}
function getTransactionGasPrice(tx) {
  return getGasData(tx)?.price;
}
function getTransactionGasBudget(tx) {
  return getGasData(tx)?.budget;
}
function getChangeEpochTransaction(data) {
  return data.kind === "ChangeEpoch" ? data : void 0;
}
function getConsensusCommitPrologueTransaction(data) {
  return data.kind === "ConsensusCommitPrologue" ? data : void 0;
}
function getTransactionKind(data) {
  return data.transaction?.data.transaction;
}
function getTransactionKindName(data) {
  return data.kind;
}
function getProgrammableTransaction(data) {
  return data.kind === "ProgrammableTransaction" ? data : void 0;
}
function getExecutionStatusType(data) {
  return getExecutionStatus(data)?.status;
}
function getExecutionStatus(data) {
  return getTransactionEffects(data)?.status;
}
function getExecutionStatusError(data) {
  return getExecutionStatus(data)?.error;
}
function getExecutionStatusGasSummary(data) {
  if ((0, import_superstruct5.is)(data, TransactionEffects)) {
    return data.gasUsed;
  }
  return getTransactionEffects(data)?.gasUsed;
}
function getTotalGasUsed(data) {
  const gasSummary = getExecutionStatusGasSummary(data);
  return gasSummary ? BigInt(gasSummary.computationCost) + BigInt(gasSummary.storageCost) - BigInt(gasSummary.storageRebate) : void 0;
}
function getTotalGasUsedUpperBound(data) {
  const gasSummary = getExecutionStatusGasSummary(data);
  return gasSummary ? BigInt(gasSummary.computationCost) + BigInt(gasSummary.storageCost) : void 0;
}
function getTransactionEffects(data) {
  return data.effects;
}
function getEvents(data) {
  return data.events;
}
function getCreatedObjects(data) {
  return getTransactionEffects(data)?.created;
}
function getTimestampFromTransactionResponse(data) {
  return data.timestampMs ?? void 0;
}
function getNewlyCreatedCoinRefsAfterSplit(data) {
  return getTransactionEffects(data)?.created?.map((c) => c.reference);
}
function getObjectChanges(data) {
  return data.objectChanges;
}
function getPublishedObjectChanges(data) {
  return data.objectChanges?.filter(
    (a) => (0, import_superstruct5.is)(a, SuiObjectChangePublished)
  ) ?? [];
}

// src/types/normalized.ts
var import_superstruct6 = require("superstruct");
var SuiMoveFunctionArgType = (0, import_superstruct6.union)([
  (0, import_superstruct6.string)(),
  (0, import_superstruct6.object)({ Object: (0, import_superstruct6.string)() })
]);
var SuiMoveFunctionArgTypes = (0, import_superstruct6.array)(SuiMoveFunctionArgType);
var SuiMoveModuleId = (0, import_superstruct6.object)({
  address: (0, import_superstruct6.string)(),
  name: (0, import_superstruct6.string)()
});
var SuiMoveVisibility = (0, import_superstruct6.union)([
  (0, import_superstruct6.literal)("Private"),
  (0, import_superstruct6.literal)("Public"),
  (0, import_superstruct6.literal)("Friend")
]);
var SuiMoveAbilitySet = (0, import_superstruct6.object)({
  abilities: (0, import_superstruct6.array)((0, import_superstruct6.string)())
});
var SuiMoveStructTypeParameter = (0, import_superstruct6.object)({
  constraints: SuiMoveAbilitySet,
  isPhantom: (0, import_superstruct6.boolean)()
});
var SuiMoveNormalizedTypeParameterType = (0, import_superstruct6.object)({
  TypeParameter: (0, import_superstruct6.number)()
});
var MoveCallMetric = (0, import_superstruct6.tuple)([
  (0, import_superstruct6.object)({
    module: (0, import_superstruct6.string)(),
    package: (0, import_superstruct6.string)(),
    function: (0, import_superstruct6.string)()
  }),
  (0, import_superstruct6.string)()
]);
var MoveCallMetrics = (0, import_superstruct6.object)({
  rank3Days: (0, import_superstruct6.array)(MoveCallMetric),
  rank7Days: (0, import_superstruct6.array)(MoveCallMetric),
  rank30Days: (0, import_superstruct6.array)(MoveCallMetric)
});
function isSuiMoveNormalizedType(value) {
  if (!value)
    return false;
  if (typeof value === "string")
    return true;
  if ((0, import_superstruct6.is)(value, SuiMoveNormalizedTypeParameterType))
    return true;
  if (isSuiMoveNormalizedStructType(value))
    return true;
  if (typeof value !== "object")
    return false;
  const valueProperties = value;
  if ((0, import_superstruct6.is)(valueProperties.Reference, SuiMoveNormalizedType))
    return true;
  if ((0, import_superstruct6.is)(valueProperties.MutableReference, SuiMoveNormalizedType))
    return true;
  if ((0, import_superstruct6.is)(valueProperties.Vector, SuiMoveNormalizedType))
    return true;
  return false;
}
var SuiMoveNormalizedType = (0, import_superstruct6.define)(
  "SuiMoveNormalizedType",
  isSuiMoveNormalizedType
);
function isSuiMoveNormalizedStructType(value) {
  if (!value || typeof value !== "object")
    return false;
  const valueProperties = value;
  if (!valueProperties.Struct || typeof valueProperties.Struct !== "object")
    return false;
  const structProperties = valueProperties.Struct;
  if (typeof structProperties.address !== "string" || typeof structProperties.module !== "string" || typeof structProperties.name !== "string" || !Array.isArray(structProperties.typeArguments) || !structProperties.typeArguments.every(
    (value2) => isSuiMoveNormalizedType(value2)
  )) {
    return false;
  }
  return true;
}
var SuiMoveNormalizedStructType = (0, import_superstruct6.define)(
  "SuiMoveNormalizedStructType",
  isSuiMoveNormalizedStructType
);
var SuiMoveNormalizedFunction = (0, import_superstruct6.object)({
  visibility: SuiMoveVisibility,
  isEntry: (0, import_superstruct6.boolean)(),
  typeParameters: (0, import_superstruct6.array)(SuiMoveAbilitySet),
  parameters: (0, import_superstruct6.array)(SuiMoveNormalizedType),
  return: (0, import_superstruct6.array)(SuiMoveNormalizedType)
});
var SuiMoveNormalizedField = (0, import_superstruct6.object)({
  name: (0, import_superstruct6.string)(),
  type: SuiMoveNormalizedType
});
var SuiMoveNormalizedStruct = (0, import_superstruct6.object)({
  abilities: SuiMoveAbilitySet,
  typeParameters: (0, import_superstruct6.array)(SuiMoveStructTypeParameter),
  fields: (0, import_superstruct6.array)(SuiMoveNormalizedField)
});
var SuiMoveNormalizedModule = (0, import_superstruct6.object)({
  fileFormatVersion: (0, import_superstruct6.number)(),
  address: (0, import_superstruct6.string)(),
  name: (0, import_superstruct6.string)(),
  friends: (0, import_superstruct6.array)(SuiMoveModuleId),
  structs: (0, import_superstruct6.record)((0, import_superstruct6.string)(), SuiMoveNormalizedStruct),
  exposedFunctions: (0, import_superstruct6.record)((0, import_superstruct6.string)(), SuiMoveNormalizedFunction)
});
var SuiMoveNormalizedModules = (0, import_superstruct6.record)(
  (0, import_superstruct6.string)(),
  SuiMoveNormalizedModule
);
function extractMutableReference(normalizedType) {
  return typeof normalizedType === "object" && "MutableReference" in normalizedType ? normalizedType.MutableReference : void 0;
}
function extractReference(normalizedType) {
  return typeof normalizedType === "object" && "Reference" in normalizedType ? normalizedType.Reference : void 0;
}
function extractStructTag(normalizedType) {
  if (typeof normalizedType === "object" && "Struct" in normalizedType) {
    return normalizedType;
  }
  const ref = extractReference(normalizedType);
  const mutRef = extractMutableReference(normalizedType);
  if (typeof ref === "object" && "Struct" in ref) {
    return ref;
  }
  if (typeof mutRef === "object" && "Struct" in mutRef) {
    return mutRef;
  }
  return void 0;
}

// src/types/validator.ts
var import_superstruct7 = require("superstruct");
var Apy = (0, import_superstruct7.object)({
  apy: (0, import_superstruct7.number)(),
  address: (0, import_superstruct7.string)()
});
var ValidatorsApy = (0, import_superstruct7.object)({
  epoch: (0, import_superstruct7.string)(),
  apys: (0, import_superstruct7.array)(Apy)
});
var Balance = (0, import_superstruct7.object)({
  value: (0, import_superstruct7.number)()
});
var StakeObject = (0, import_superstruct7.object)({
  stakedSuiId: (0, import_superstruct7.string)(),
  stakeRequestEpoch: (0, import_superstruct7.string)(),
  stakeActiveEpoch: (0, import_superstruct7.string)(),
  principal: (0, import_superstruct7.string)(),
  status: (0, import_superstruct7.union)([(0, import_superstruct7.literal)("Active"), (0, import_superstruct7.literal)("Pending"), (0, import_superstruct7.literal)("Unstaked")]),
  estimatedReward: (0, import_superstruct7.optional)((0, import_superstruct7.string)())
});
var DelegatedStake = (0, import_superstruct7.object)({
  validatorAddress: (0, import_superstruct7.string)(),
  stakingPool: (0, import_superstruct7.string)(),
  stakes: (0, import_superstruct7.array)(StakeObject)
});
var StakeSubsidyFields = (0, import_superstruct7.object)({
  balance: (0, import_superstruct7.object)({ value: (0, import_superstruct7.number)() }),
  distribution_counter: (0, import_superstruct7.number)(),
  current_distribution_amount: (0, import_superstruct7.number)(),
  stake_subsidy_period_length: (0, import_superstruct7.number)(),
  stake_subsidy_decrease_rate: (0, import_superstruct7.number)()
});
var StakeSubsidy = (0, import_superstruct7.object)({
  type: (0, import_superstruct7.string)(),
  fields: StakeSubsidyFields
});
var SuiSupplyFields = (0, import_superstruct7.object)({
  value: (0, import_superstruct7.number)()
});
var ContentsFields = (0, import_superstruct7.object)({
  id: (0, import_superstruct7.string)(),
  size: (0, import_superstruct7.number)(),
  head: (0, import_superstruct7.object)({ vec: (0, import_superstruct7.array)() }),
  tail: (0, import_superstruct7.object)({ vec: (0, import_superstruct7.array)() })
});
var ContentsFieldsWithdraw = (0, import_superstruct7.object)({
  id: (0, import_superstruct7.string)(),
  size: (0, import_superstruct7.number)()
});
var Contents = (0, import_superstruct7.object)({
  type: (0, import_superstruct7.string)(),
  fields: ContentsFields
});
var DelegationStakingPoolFields = (0, import_superstruct7.object)({
  exchangeRates: (0, import_superstruct7.object)({
    id: (0, import_superstruct7.string)(),
    size: (0, import_superstruct7.number)()
  }),
  id: (0, import_superstruct7.string)(),
  pendingStake: (0, import_superstruct7.number)(),
  pendingPoolTokenWithdraw: (0, import_superstruct7.number)(),
  pendingTotalSuiWithdraw: (0, import_superstruct7.number)(),
  poolTokenBalance: (0, import_superstruct7.number)(),
  rewardsPool: (0, import_superstruct7.object)({ value: (0, import_superstruct7.number)() }),
  activationEpoch: (0, import_superstruct7.object)({ vec: (0, import_superstruct7.array)() }),
  deactivationEpoch: (0, import_superstruct7.object)({ vec: (0, import_superstruct7.array)() }),
  suiBalance: (0, import_superstruct7.number)()
});
var DelegationStakingPool = (0, import_superstruct7.object)({
  type: (0, import_superstruct7.string)(),
  fields: DelegationStakingPoolFields
});
var Validators = (0, import_superstruct7.array)((0, import_superstruct7.tuple)([(0, import_superstruct7.string)(), (0, import_superstruct7.string)()]));
var CommitteeInfo = (0, import_superstruct7.object)({
  epoch: (0, import_superstruct7.string)(),
  /** Array of (validator public key, stake unit) tuple */
  validators: Validators
});
var SuiValidatorSummary = (0, import_superstruct7.object)({
  suiAddress: (0, import_superstruct7.string)(),
  protocolPubkeyBytes: (0, import_superstruct7.string)(),
  networkPubkeyBytes: (0, import_superstruct7.string)(),
  workerPubkeyBytes: (0, import_superstruct7.string)(),
  proofOfPossessionBytes: (0, import_superstruct7.string)(),
  operationCapId: (0, import_superstruct7.string)(),
  name: (0, import_superstruct7.string)(),
  description: (0, import_superstruct7.string)(),
  imageUrl: (0, import_superstruct7.string)(),
  projectUrl: (0, import_superstruct7.string)(),
  p2pAddress: (0, import_superstruct7.string)(),
  netAddress: (0, import_superstruct7.string)(),
  primaryAddress: (0, import_superstruct7.string)(),
  workerAddress: (0, import_superstruct7.string)(),
  nextEpochProtocolPubkeyBytes: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochProofOfPossession: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochNetworkPubkeyBytes: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochWorkerPubkeyBytes: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochNetAddress: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochP2pAddress: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochPrimaryAddress: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  nextEpochWorkerAddress: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  votingPower: (0, import_superstruct7.string)(),
  gasPrice: (0, import_superstruct7.string)(),
  commissionRate: (0, import_superstruct7.string)(),
  nextEpochStake: (0, import_superstruct7.string)(),
  nextEpochGasPrice: (0, import_superstruct7.string)(),
  nextEpochCommissionRate: (0, import_superstruct7.string)(),
  stakingPoolId: (0, import_superstruct7.string)(),
  stakingPoolActivationEpoch: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  stakingPoolDeactivationEpoch: (0, import_superstruct7.nullable)((0, import_superstruct7.string)()),
  stakingPoolSuiBalance: (0, import_superstruct7.string)(),
  rewardsPool: (0, import_superstruct7.string)(),
  poolTokenBalance: (0, import_superstruct7.string)(),
  pendingStake: (0, import_superstruct7.string)(),
  pendingPoolTokenWithdraw: (0, import_superstruct7.string)(),
  pendingTotalSuiWithdraw: (0, import_superstruct7.string)(),
  exchangeRatesId: (0, import_superstruct7.string)(),
  exchangeRatesSize: (0, import_superstruct7.string)()
});
var SuiSystemStateSummary = (0, import_superstruct7.object)({
  epoch: (0, import_superstruct7.string)(),
  protocolVersion: (0, import_superstruct7.string)(),
  systemStateVersion: (0, import_superstruct7.string)(),
  storageFundTotalObjectStorageRebates: (0, import_superstruct7.string)(),
  storageFundNonRefundableBalance: (0, import_superstruct7.string)(),
  referenceGasPrice: (0, import_superstruct7.string)(),
  safeMode: (0, import_superstruct7.boolean)(),
  safeModeStorageRewards: (0, import_superstruct7.string)(),
  safeModeComputationRewards: (0, import_superstruct7.string)(),
  safeModeStorageRebates: (0, import_superstruct7.string)(),
  safeModeNonRefundableStorageFee: (0, import_superstruct7.string)(),
  epochStartTimestampMs: (0, import_superstruct7.string)(),
  epochDurationMs: (0, import_superstruct7.string)(),
  stakeSubsidyStartEpoch: (0, import_superstruct7.string)(),
  maxValidatorCount: (0, import_superstruct7.string)(),
  minValidatorJoiningStake: (0, import_superstruct7.string)(),
  validatorLowStakeThreshold: (0, import_superstruct7.string)(),
  validatorVeryLowStakeThreshold: (0, import_superstruct7.string)(),
  validatorLowStakeGracePeriod: (0, import_superstruct7.string)(),
  stakeSubsidyBalance: (0, import_superstruct7.string)(),
  stakeSubsidyDistributionCounter: (0, import_superstruct7.string)(),
  stakeSubsidyCurrentDistributionAmount: (0, import_superstruct7.string)(),
  stakeSubsidyPeriodLength: (0, import_superstruct7.string)(),
  stakeSubsidyDecreaseRate: (0, import_superstruct7.number)(),
  totalStake: (0, import_superstruct7.string)(),
  activeValidators: (0, import_superstruct7.array)(SuiValidatorSummary),
  pendingActiveValidatorsId: (0, import_superstruct7.string)(),
  pendingActiveValidatorsSize: (0, import_superstruct7.string)(),
  pendingRemovals: (0, import_superstruct7.array)((0, import_superstruct7.string)()),
  stakingPoolMappingsId: (0, import_superstruct7.string)(),
  stakingPoolMappingsSize: (0, import_superstruct7.string)(),
  inactivePoolsId: (0, import_superstruct7.string)(),
  inactivePoolsSize: (0, import_superstruct7.string)(),
  validatorCandidatesId: (0, import_superstruct7.string)(),
  validatorCandidatesSize: (0, import_superstruct7.string)(),
  atRiskValidators: (0, import_superstruct7.array)((0, import_superstruct7.tuple)([(0, import_superstruct7.string)(), (0, import_superstruct7.string)()])),
  validatorReportRecords: (0, import_superstruct7.array)((0, import_superstruct7.tuple)([(0, import_superstruct7.string)(), (0, import_superstruct7.array)((0, import_superstruct7.string)())]))
});

// src/types/coin.ts
var import_superstruct8 = require("superstruct");
var CoinStruct = (0, import_superstruct8.object)({
  coinType: (0, import_superstruct8.string)(),
  // TODO(chris): rename this to objectId
  coinObjectId: (0, import_superstruct8.string)(),
  version: (0, import_superstruct8.string)(),
  digest: (0, import_superstruct8.string)(),
  balance: (0, import_superstruct8.string)(),
  previousTransaction: (0, import_superstruct8.string)()
});
var PaginatedCoins = (0, import_superstruct8.object)({
  data: (0, import_superstruct8.array)(CoinStruct),
  nextCursor: (0, import_superstruct8.nullable)((0, import_superstruct8.string)()),
  hasNextPage: (0, import_superstruct8.boolean)()
});
var CoinBalance = (0, import_superstruct8.object)({
  coinType: (0, import_superstruct8.string)(),
  coinObjectCount: (0, import_superstruct8.number)(),
  totalBalance: (0, import_superstruct8.string)(),
  lockedBalance: (0, import_superstruct8.object)({
    epochId: (0, import_superstruct8.optional)((0, import_superstruct8.number)()),
    number: (0, import_superstruct8.optional)((0, import_superstruct8.number)())
  })
});
var CoinSupply = (0, import_superstruct8.object)({
  value: (0, import_superstruct8.string)()
});

// src/types/epochs.ts
var import_superstruct9 = require("superstruct");
var EndOfEpochInfo = (0, import_superstruct9.object)({
  lastCheckpointId: (0, import_superstruct9.string)(),
  epochEndTimestamp: (0, import_superstruct9.string)(),
  protocolVersion: (0, import_superstruct9.string)(),
  referenceGasPrice: (0, import_superstruct9.string)(),
  totalStake: (0, import_superstruct9.string)(),
  storageFundReinvestment: (0, import_superstruct9.string)(),
  storageCharge: (0, import_superstruct9.string)(),
  storageRebate: (0, import_superstruct9.string)(),
  storageFundBalance: (0, import_superstruct9.string)(),
  stakeSubsidyAmount: (0, import_superstruct9.string)(),
  totalGasFees: (0, import_superstruct9.string)(),
  totalStakeRewardsDistributed: (0, import_superstruct9.string)(),
  leftoverStorageFundInflow: (0, import_superstruct9.string)()
});
var EpochInfo = (0, import_superstruct9.object)({
  epoch: (0, import_superstruct9.string)(),
  validators: (0, import_superstruct9.array)(SuiValidatorSummary),
  epochTotalTransactions: (0, import_superstruct9.string)(),
  firstCheckpointId: (0, import_superstruct9.string)(),
  epochStartTimestamp: (0, import_superstruct9.string)(),
  endOfEpochInfo: (0, import_superstruct9.nullable)(EndOfEpochInfo),
  referenceGasPrice: (0, import_superstruct9.nullable)((0, import_superstruct9.number)())
});
var EpochPage = (0, import_superstruct9.object)({
  data: (0, import_superstruct9.array)(EpochInfo),
  nextCursor: (0, import_superstruct9.nullable)((0, import_superstruct9.string)()),
  hasNextPage: (0, import_superstruct9.boolean)()
});

// src/types/name-service.ts
var import_superstruct10 = require("superstruct");
var ResolvedNameServiceNames = (0, import_superstruct10.object)({
  data: (0, import_superstruct10.array)((0, import_superstruct10.string)()),
  hasNextPage: (0, import_superstruct10.boolean)(),
  nextCursor: (0, import_superstruct10.nullable)((0, import_superstruct10.string)())
});

// src/types/dynamic_fields.ts
var import_superstruct11 = require("superstruct");
var DynamicFieldType = (0, import_superstruct11.union)([(0, import_superstruct11.literal)("DynamicField"), (0, import_superstruct11.literal)("DynamicObject")]);
var DynamicFieldName = (0, import_superstruct11.object)({
  type: (0, import_superstruct11.string)(),
  value: (0, import_superstruct11.any)()
});
var DynamicFieldInfo = (0, import_superstruct11.object)({
  name: DynamicFieldName,
  bcsName: (0, import_superstruct11.string)(),
  type: DynamicFieldType,
  objectType: (0, import_superstruct11.string)(),
  objectId: (0, import_superstruct11.string)(),
  version: (0, import_superstruct11.number)(),
  digest: (0, import_superstruct11.string)()
});
var DynamicFieldPage = (0, import_superstruct11.object)({
  data: (0, import_superstruct11.array)(DynamicFieldInfo),
  nextCursor: (0, import_superstruct11.nullable)((0, import_superstruct11.string)()),
  hasNextPage: (0, import_superstruct11.boolean)()
});

// src/types/metrics.ts
var import_superstruct12 = require("superstruct");
var NetworkMetrics = (0, import_superstruct12.object)({
  currentTps: (0, import_superstruct12.number)(),
  tps30Days: (0, import_superstruct12.number)(),
  currentCheckpoint: (0, import_superstruct12.string)(),
  currentEpoch: (0, import_superstruct12.string)(),
  totalAddresses: (0, import_superstruct12.string)(),
  totalObjects: (0, import_superstruct12.string)(),
  totalPackages: (0, import_superstruct12.string)()
});
var AddressMetrics = (0, import_superstruct12.object)({
  checkpoint: (0, import_superstruct12.number)(),
  epoch: (0, import_superstruct12.number)(),
  timestampMs: (0, import_superstruct12.number)(),
  cumulativeAddresses: (0, import_superstruct12.number)(),
  cumulativeActiveAddresses: (0, import_superstruct12.number)(),
  dailyActiveAddresses: (0, import_superstruct12.number)()
});
var AllEpochsAddressMetrics = (0, import_superstruct12.array)(AddressMetrics);

// src/keypairs/secp256r1/keypair.ts
var import_sha2564 = require("@noble/hashes/sha256");
var import_p2562 = require("@noble/curves/p256");
var import_bip322 = require("@scure/bip32");
var import_bcs22 = require("@mysten/bcs");
var import_utils5 = require("@noble/hashes/utils");
var import_blake2b5 = require("@noble/hashes/blake2b");
var DEFAULT_SECP256R1_DERIVATION_PATH = "m/74'/784'/0'/0/0";
var Secp256r1Keypair = class extends Keypair {
  /**
   * Create a new keypair instance.
   * Generate random keypair if no {@link Secp256r1Keypair} is provided.
   *
   * @param keypair Secp256r1 keypair
   */
  constructor(keypair) {
    super();
    if (keypair) {
      this.keypair = keypair;
    } else {
      const secretKey = import_p2562.secp256r1.utils.randomPrivateKey();
      const publicKey = import_p2562.secp256r1.getPublicKey(secretKey, true);
      this.keypair = { publicKey, secretKey };
    }
  }
  /**
   * Get the key scheme of the keypair Secp256r1
   */
  getKeyScheme() {
    return "Secp256r1";
  }
  /**
   * Generate a new random keypair
   */
  static generate() {
    return new Secp256r1Keypair();
  }
  /**
   * Create a keypair from a raw secret key byte array.
   *
   * This method should only be used to recreate a keypair from a previously
   * generated secret key. Generating keypairs from a random seed should be done
   * with the {@link Keypair.fromSeed} method.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array
   * @param options: skip secret key validation
   */
  static fromSecretKey(secretKey, options) {
    const publicKey = import_p2562.secp256r1.getPublicKey(secretKey, true);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const msgHash = (0, import_utils5.bytesToHex)((0, import_blake2b5.blake2b)(signData, { dkLen: 32 }));
      const signature = import_p2562.secp256r1.sign(msgHash, secretKey, { lowS: true });
      if (!import_p2562.secp256r1.verify(signature, msgHash, publicKey, { lowS: true })) {
        throw new Error("Provided secretKey is invalid");
      }
    }
    return new Secp256r1Keypair({ publicKey, secretKey });
  }
  /**
   * Generate a keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */
  static fromSeed(seed) {
    let publicKey = import_p2562.secp256r1.getPublicKey(seed, true);
    return new Secp256r1Keypair({ publicKey, secretKey: seed });
  }
  /**
   * The public key for this keypair
   */
  getPublicKey() {
    return new Secp256r1PublicKey(this.keypair.publicKey);
  }
  async sign(data) {
    return this.signData(data);
  }
  /**
   * Return the signature for the provided data.
   */
  signData(data) {
    const msgHash = (0, import_sha2564.sha256)(data);
    const sig = import_p2562.secp256r1.sign(msgHash, this.keypair.secretKey, {
      lowS: true
    });
    return sig.toCompactRawBytes();
  }
  /**
   * Derive Secp256r1 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/74'/784'/0'/0/0, otherwise the path must
   * be compliant to BIP-32 in form m/74'/784'/{account_index}'/{change_index}/{address_index}.
   */
  static deriveKeypair(mnemonics, path) {
    if (path == null) {
      path = DEFAULT_SECP256R1_DERIVATION_PATH;
    }
    if (!isValidBIP32Path(path)) {
      throw new Error("Invalid derivation path");
    }
    const privateKey = import_bip322.HDKey.fromMasterSeed(mnemonicToSeed(mnemonics)).derive(
      path
    ).privateKey;
    return Secp256r1Keypair.fromSecretKey(privateKey);
  }
  export() {
    return {
      schema: "Secp256r1",
      privateKey: (0, import_bcs22.toB64)(this.keypair.secretKey)
    };
  }
};

// src/rpc/client.ts
var import_client_js = require("@open-rpc/client-js");
var import_superstruct13 = require("superstruct");

// src/version.ts
var PACKAGE_VERSION = "0.40.0";
var TARGETED_RPC_VERSION = "1.8.0";

// src/rpc/errors.ts
var RPCValidationError = class extends Error {
  constructor(options) {
    super(
      "RPC Validation Error: The response returned from RPC server does not match the TypeScript definition. This is likely because the SDK version is not compatible with the RPC server.",
      // @ts-ignore
      { cause: options.cause }
    );
    this.req = options.req;
    this.result = options.result;
    this.message = this.toString();
  }
  toString() {
    let str = super.toString();
    if (this.cause) {
      str += `
Cause: ${this.cause}`;
    }
    if (this.result) {
      str += `
Reponse Received: ${JSON.stringify(this.result, null, 2)}`;
    }
    return str;
  }
};

// src/rpc/client.ts
var JsonRpcClient = class {
  constructor(url, httpHeaders) {
    const transport = new import_client_js.HTTPTransport(url, {
      headers: {
        "Content-Type": "application/json",
        "Client-Sdk-Type": "typescript",
        "Client-Sdk-Version": PACKAGE_VERSION,
        "Client-Target-Api-Version": TARGETED_RPC_VERSION,
        ...httpHeaders
      }
    });
    this.rpcClient = new import_client_js.Client(new import_client_js.RequestManager([transport]));
  }
  async requestWithType(method, args, struct) {
    const req = { method, args };
    const response = await this.request(method, args);
    if (process.env.NODE_ENV === "test") {
      const [err] = (0, import_superstruct13.validate)(response, struct);
      if (err) {
        throw new RPCValidationError({
          req,
          result: response,
          cause: err
        });
      }
    }
    return response;
  }
  async request(method, params) {
    return await this.rpcClient.request({ method, params });
  }
};

// src/rpc/websocket-client.ts
var import_client_js2 = require("@open-rpc/client-js");
var getWebsocketUrl = (httpUrl, port) => {
  const url = new URL(httpUrl);
  url.protocol = url.protocol.replace("http", "ws");
  if (port) {
    url.port = port.toString();
  }
  return url.toString();
};
var DEFAULT_CLIENT_OPTIONS = {
  callTimeout: 3e4,
  reconnectTimeout: 3e3,
  maxReconnects: 5
};
var _client, _subscriptions, _disconnects, _setupClient, setupClient_fn, _reconnect, reconnect_fn;
var WebsocketClient = class {
  constructor(endpoint, options = DEFAULT_CLIENT_OPTIONS) {
    this.endpoint = endpoint;
    this.options = options;
    __privateAdd(this, _setupClient);
    __privateAdd(this, _reconnect);
    __privateAdd(this, _client, void 0);
    __privateAdd(this, _subscriptions, void 0);
    __privateAdd(this, _disconnects, void 0);
    if (this.endpoint.startsWith("http")) {
      this.endpoint = getWebsocketUrl(this.endpoint);
    }
    __privateSet(this, _client, null);
    __privateSet(this, _subscriptions, /* @__PURE__ */ new Map());
    __privateSet(this, _disconnects, 0);
  }
  async request(input) {
    const client = __privateMethod(this, _setupClient, setupClient_fn).call(this);
    const id = await client.request(
      { method: input.method, params: input.params },
      this.options.callTimeout
    );
    const initialId = input.initialId || id;
    __privateGet(this, _subscriptions).set(initialId, {
      ...input,
      // Always set the latest actual subscription ID:
      id,
      initialId
    });
    return async () => {
      const client2 = __privateMethod(this, _setupClient, setupClient_fn).call(this);
      const subscription = __privateGet(this, _subscriptions).get(initialId);
      if (!subscription)
        return false;
      __privateGet(this, _subscriptions).delete(initialId);
      return client2.request(
        { method: input.unsubscribe, params: [subscription.id] },
        this.options.callTimeout
      );
    };
  }
};
_client = new WeakMap();
_subscriptions = new WeakMap();
_disconnects = new WeakMap();
_setupClient = new WeakSet();
setupClient_fn = function() {
  if (__privateGet(this, _client)) {
    return __privateGet(this, _client);
  }
  const transport = new import_client_js2.WebSocketTransport(this.endpoint);
  const requestManager = new import_client_js2.RequestManager([transport]);
  __privateSet(this, _client, new import_client_js2.Client(requestManager));
  transport.connection.addEventListener("open", () => {
    __privateSet(this, _disconnects, 0);
  });
  transport.connection.addEventListener("close", () => {
    __privateWrapper(this, _disconnects)._++;
    if (__privateGet(this, _disconnects) <= this.options.maxReconnects) {
      setTimeout(() => {
        __privateMethod(this, _reconnect, reconnect_fn).call(this);
      }, this.options.reconnectTimeout);
    }
  });
  __privateGet(this, _client).onNotification((data) => {
    const params = data.params;
    __privateGet(this, _subscriptions).forEach((subscription) => {
      if (subscription.method === data.method && params.subscription === subscription.id) {
        subscription.onMessage(params.result);
      }
    });
  });
  return __privateGet(this, _client);
};
_reconnect = new WeakSet();
reconnect_fn = function() {
  __privateGet(this, _client)?.close();
  __privateSet(this, _client, null);
  __privateGet(this, _subscriptions).forEach((subscription) => this.request(subscription));
};

// src/providers/json-rpc-provider.ts
var import_superstruct20 = require("superstruct");
var import_bcs28 = require("@mysten/bcs");

// src/rpc/connection.ts
var _options;
var Connection = class {
  constructor(options) {
    __privateAdd(this, _options, void 0);
    __privateSet(this, _options, options);
  }
  get fullnode() {
    return __privateGet(this, _options).fullnode;
  }
  // TODO: Decide if we should default the websocket URL like this:
  get websocket() {
    return __privateGet(this, _options).websocket || __privateGet(this, _options).fullnode;
  }
  /** @deprecated Use the new faucet APIs from `@mysten/sui.js/faucet` instead. */
  get faucet() {
    return __privateGet(this, _options).faucet;
  }
};
_options = new WeakMap();
var localnetConnection = new Connection({
  fullnode: "http://127.0.0.1:9000",
  faucet: "http://127.0.0.1:9123/gas"
});
var devnetConnection = new Connection({
  fullnode: "https://fullnode.devnet.sui.io:443/",
  faucet: "https://faucet.devnet.sui.io/gas"
});
var testnetConnection = new Connection({
  fullnode: "https://fullnode.testnet.sui.io:443/",
  faucet: "https://faucet.testnet.sui.io/gas"
});
var mainnetConnection = new Connection({
  fullnode: "https://fullnode.mainnet.sui.io:443/"
});

// src/builder/TransactionBlock.ts
var import_bcs27 = require("@mysten/bcs");
var import_superstruct19 = require("superstruct");

// src/builder/Transactions.ts
var import_bcs23 = require("@mysten/bcs");
var import_superstruct15 = require("superstruct");

// src/builder/utils.ts
var import_superstruct14 = require("superstruct");
function create(value, struct) {
  return (0, import_superstruct14.create)(value, struct);
}
var TRANSACTION_TYPE = Symbol("transaction-argument-type");

// src/builder/Transactions.ts
var option = (some) => (0, import_superstruct15.union)([
  (0, import_superstruct15.object)({ None: (0, import_superstruct15.union)([(0, import_superstruct15.literal)(true), (0, import_superstruct15.literal)(null)]) }),
  (0, import_superstruct15.object)({ Some: some })
]);
var TransactionBlockInput = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("Input"),
  index: (0, import_superstruct15.integer)(),
  value: (0, import_superstruct15.optional)((0, import_superstruct15.any)()),
  type: (0, import_superstruct15.optional)((0, import_superstruct15.union)([(0, import_superstruct15.literal)("pure"), (0, import_superstruct15.literal)("object")]))
});
var TransactionArgumentTypes = [
  TransactionBlockInput,
  (0, import_superstruct15.object)({ kind: (0, import_superstruct15.literal)("GasCoin") }),
  (0, import_superstruct15.object)({ kind: (0, import_superstruct15.literal)("Result"), index: (0, import_superstruct15.integer)() }),
  (0, import_superstruct15.object)({
    kind: (0, import_superstruct15.literal)("NestedResult"),
    index: (0, import_superstruct15.integer)(),
    resultIndex: (0, import_superstruct15.integer)()
  })
];
var TransactionArgument = (0, import_superstruct15.union)([...TransactionArgumentTypes]);
var ObjectTransactionArgument = (0, import_superstruct15.union)([...TransactionArgumentTypes]);
ObjectTransactionArgument[TRANSACTION_TYPE] = {
  kind: "object"
};
var PureTransactionArgument = (type) => {
  const struct = (0, import_superstruct15.union)([...TransactionArgumentTypes]);
  struct[TRANSACTION_TYPE] = {
    kind: "pure",
    type
  };
  return struct;
};
var MoveCallTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("MoveCall"),
  target: (0, import_superstruct15.define)(
    "target",
    (0, import_superstruct15.string)().validator
  ),
  typeArguments: (0, import_superstruct15.array)((0, import_superstruct15.string)()),
  arguments: (0, import_superstruct15.array)(TransactionArgument)
});
var TransferObjectsTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("TransferObjects"),
  objects: (0, import_superstruct15.array)(ObjectTransactionArgument),
  address: PureTransactionArgument(import_bcs23.BCS.ADDRESS)
});
var SplitCoinsTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("SplitCoins"),
  coin: ObjectTransactionArgument,
  amounts: (0, import_superstruct15.array)(PureTransactionArgument("u64"))
});
var MergeCoinsTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("MergeCoins"),
  destination: ObjectTransactionArgument,
  sources: (0, import_superstruct15.array)(ObjectTransactionArgument)
});
var MakeMoveVecTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("MakeMoveVec"),
  // TODO: ideally we should use `TypeTag` instead of `record()` here,
  // but TypeTag is recursively defined and it's tricky to define a
  // recursive struct in superstruct
  type: (0, import_superstruct15.optional)(option((0, import_superstruct15.record)((0, import_superstruct15.string)(), (0, import_superstruct15.unknown)()))),
  objects: (0, import_superstruct15.array)(ObjectTransactionArgument)
});
var PublishTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("Publish"),
  modules: (0, import_superstruct15.array)((0, import_superstruct15.array)((0, import_superstruct15.integer)())),
  dependencies: (0, import_superstruct15.array)((0, import_superstruct15.string)())
});
var UpgradePolicy = /* @__PURE__ */ ((UpgradePolicy2) => {
  UpgradePolicy2[UpgradePolicy2["COMPATIBLE"] = 0] = "COMPATIBLE";
  UpgradePolicy2[UpgradePolicy2["ADDITIVE"] = 128] = "ADDITIVE";
  UpgradePolicy2[UpgradePolicy2["DEP_ONLY"] = 192] = "DEP_ONLY";
  return UpgradePolicy2;
})(UpgradePolicy || {});
var UpgradeTransaction = (0, import_superstruct15.object)({
  kind: (0, import_superstruct15.literal)("Upgrade"),
  modules: (0, import_superstruct15.array)((0, import_superstruct15.array)((0, import_superstruct15.integer)())),
  dependencies: (0, import_superstruct15.array)((0, import_superstruct15.string)()),
  packageId: (0, import_superstruct15.string)(),
  ticket: ObjectTransactionArgument
});
var TransactionTypes = [
  MoveCallTransaction,
  TransferObjectsTransaction,
  SplitCoinsTransaction,
  MergeCoinsTransaction,
  PublishTransaction,
  UpgradeTransaction,
  MakeMoveVecTransaction
];
var TransactionType = (0, import_superstruct15.union)([...TransactionTypes]);
function getTransactionType(data) {
  (0, import_superstruct15.assert)(data, TransactionType);
  return TransactionTypes.find((schema) => (0, import_superstruct15.is)(data, schema));
}
var Transactions = {
  MoveCall(input) {
    return create(
      {
        kind: "MoveCall",
        target: input.target,
        arguments: input.arguments ?? [],
        typeArguments: input.typeArguments ?? []
      },
      MoveCallTransaction
    );
  },
  TransferObjects(objects, address) {
    return create(
      { kind: "TransferObjects", objects, address },
      TransferObjectsTransaction
    );
  },
  SplitCoins(coin, amounts) {
    return create({ kind: "SplitCoins", coin, amounts }, SplitCoinsTransaction);
  },
  MergeCoins(destination, sources) {
    return create(
      { kind: "MergeCoins", destination, sources },
      MergeCoinsTransaction
    );
  },
  Publish({
    modules,
    dependencies
  }) {
    return create(
      {
        kind: "Publish",
        modules: modules.map(
          (module2) => typeof module2 === "string" ? Array.from((0, import_bcs23.fromB64)(module2)) : module2
        ),
        dependencies: dependencies.map((dep) => normalizeSuiObjectId(dep))
      },
      PublishTransaction
    );
  },
  Upgrade({
    modules,
    dependencies,
    packageId,
    ticket
  }) {
    return create(
      {
        kind: "Upgrade",
        modules: modules.map(
          (module2) => typeof module2 === "string" ? Array.from((0, import_bcs23.fromB64)(module2)) : module2
        ),
        dependencies: dependencies.map((dep) => normalizeSuiObjectId(dep)),
        packageId,
        ticket
      },
      UpgradeTransaction
    );
  },
  MakeMoveVec({
    type,
    objects
  }) {
    return create(
      {
        kind: "MakeMoveVec",
        type: type ? { Some: TypeTagSerializer.parseFromStr(type) } : { None: null },
        objects
      },
      MakeMoveVecTransaction
    );
  }
};

// src/builder/Inputs.ts
var import_superstruct16 = require("superstruct");
var ObjectArg = (0, import_superstruct16.union)([
  (0, import_superstruct16.object)({ ImmOrOwned: SuiObjectRef }),
  (0, import_superstruct16.object)({
    Shared: (0, import_superstruct16.object)({
      objectId: (0, import_superstruct16.string)(),
      initialSharedVersion: (0, import_superstruct16.union)([(0, import_superstruct16.integer)(), (0, import_superstruct16.string)()]),
      mutable: (0, import_superstruct16.boolean)()
    })
  })
]);
var PureCallArg = (0, import_superstruct16.object)({ Pure: (0, import_superstruct16.array)((0, import_superstruct16.integer)()) });
var ObjectCallArg = (0, import_superstruct16.object)({ Object: ObjectArg });
var BuilderCallArg = (0, import_superstruct16.union)([PureCallArg, ObjectCallArg]);
var Inputs = {
  Pure(data, type) {
    return {
      Pure: Array.from(
        data instanceof Uint8Array ? data : (
          // NOTE: We explicitly set this to be growable to infinity, because we have maxSize validation at the builder-level:
          builder.ser(type, data, { maxSize: Infinity }).toBytes()
        )
      )
    };
  },
  ObjectRef({ objectId, digest, version }) {
    return {
      Object: {
        ImmOrOwned: {
          digest,
          version,
          objectId: normalizeSuiAddress(objectId)
        }
      }
    };
  },
  SharedObjectRef({
    objectId,
    mutable,
    initialSharedVersion
  }) {
    return {
      Object: {
        Shared: {
          mutable,
          initialSharedVersion,
          objectId: normalizeSuiAddress(objectId)
        }
      }
    };
  }
};
function getIdFromCallArg(arg) {
  if (typeof arg === "string") {
    return normalizeSuiAddress(arg);
  }
  if ("ImmOrOwned" in arg.Object) {
    return normalizeSuiAddress(arg.Object.ImmOrOwned.objectId);
  }
  return normalizeSuiAddress(arg.Object.Shared.objectId);
}
function getSharedObjectInput(arg) {
  return typeof arg === "object" && "Object" in arg && "Shared" in arg.Object ? arg.Object.Shared : void 0;
}
function isSharedObjectInput(arg) {
  return !!getSharedObjectInput(arg);
}
function isMutableSharedObjectInput(arg) {
  return getSharedObjectInput(arg)?.mutable ?? false;
}

// src/types/option.ts
function getOption(option2) {
  if (typeof option2 === "object" && option2 !== null && "type" in option2 && option2.type.startsWith("0x1::option::Option<")) {
    return void 0;
  }
  return option2;
}

// src/framework/framework.ts
var import_superstruct17 = require("superstruct");
var SUI_SYSTEM_ADDRESS = "0x3";
var SUI_FRAMEWORK_ADDRESS = "0x2";
var MOVE_STDLIB_ADDRESS = "0x1";
var OBJECT_MODULE_NAME = "object";
var UID_STRUCT_NAME = "UID";
var ID_STRUCT_NAME = "ID";
var SUI_TYPE_ARG = `${SUI_FRAMEWORK_ADDRESS}::sui::SUI`;
var VALIDATORS_EVENTS_QUERY = "0x3::validator_set::ValidatorEpochInfoEventV2";
var SUI_CLOCK_OBJECT_ID = normalizeSuiObjectId("0x6");
var PAY_MODULE_NAME = "pay";
var PAY_SPLIT_COIN_VEC_FUNC_NAME = "split_vec";
var PAY_JOIN_COIN_FUNC_NAME = "join";
var COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
function isObjectDataFull(resp) {
  return !!resp.data || !!resp.type;
}
var CoinMetadataStruct = (0, import_superstruct17.object)({
  decimals: (0, import_superstruct17.number)(),
  name: (0, import_superstruct17.string)(),
  symbol: (0, import_superstruct17.string)(),
  description: (0, import_superstruct17.string)(),
  iconUrl: (0, import_superstruct17.nullable)((0, import_superstruct17.string)()),
  id: (0, import_superstruct17.nullable)((0, import_superstruct17.string)())
});
var Coin = class {
  static isCoin(data) {
    return Coin.getType(data)?.match(COIN_TYPE_ARG_REGEX) != null;
  }
  static getCoinType(type) {
    const [, res] = type.match(COIN_TYPE_ARG_REGEX) ?? [];
    return res || null;
  }
  static getCoinTypeArg(obj) {
    const type = Coin.getType(obj);
    return type ? Coin.getCoinType(type) : null;
  }
  static isSUI(obj) {
    const arg = Coin.getCoinTypeArg(obj);
    return arg ? Coin.getCoinSymbol(arg) === "SUI" : false;
  }
  static getCoinSymbol(coinTypeArg) {
    return coinTypeArg.substring(coinTypeArg.lastIndexOf(":") + 1);
  }
  static getCoinStructTag(coinTypeArg) {
    return {
      address: normalizeSuiObjectId(coinTypeArg.split("::")[0]),
      module: coinTypeArg.split("::")[1],
      name: coinTypeArg.split("::")[2],
      typeParams: []
    };
  }
  static getID(obj) {
    if ("fields" in obj) {
      return obj.fields.id.id;
    }
    return getObjectId(obj);
  }
  static totalBalance(coins) {
    return coins.reduce(
      (partialSum, c) => partialSum + Coin.getBalanceFromCoinStruct(c),
      BigInt(0)
    );
  }
  /**
   * Sort coin by balance in an ascending order
   */
  static sortByBalance(coins) {
    return [...coins].sort(
      (a, b) => Coin.getBalanceFromCoinStruct(a) < Coin.getBalanceFromCoinStruct(b) ? -1 : Coin.getBalanceFromCoinStruct(a) > Coin.getBalanceFromCoinStruct(b) ? 1 : 0
    );
  }
  static getBalanceFromCoinStruct(coin) {
    return BigInt(coin.balance);
  }
  static getBalance(data) {
    if (!Coin.isCoin(data)) {
      return void 0;
    }
    const balance = getObjectFields(data)?.balance;
    return BigInt(balance);
  }
  static getType(data) {
    if (isObjectDataFull(data)) {
      return getObjectType(data);
    }
    return data.type;
  }
};
var _Delegation = class {
  static isDelegationSuiObject(obj) {
    return "type" in obj && obj.type === _Delegation.SUI_OBJECT_TYPE;
  }
  constructor(obj) {
    this.suiObject = obj;
  }
  nextRewardUnclaimedEpoch() {
    return this.suiObject.data.fields.next_reward_unclaimed_epoch;
  }
  activeDelegation() {
    return BigInt(getOption(this.suiObject.data.fields.active_delegation) || 0);
  }
  delegateAmount() {
    return this.suiObject.data.fields.delegate_amount;
  }
  endingEpoch() {
    return getOption(this.suiObject.data.fields.ending_epoch);
  }
  validatorAddress() {
    return this.suiObject.data.fields.validator_address;
  }
  isActive() {
    return this.activeDelegation() > 0 && !this.endingEpoch();
  }
  hasUnclaimedRewards(epoch) {
    return this.nextRewardUnclaimedEpoch() <= epoch && (this.isActive() || (this.endingEpoch() || 0) > epoch);
  }
};
var Delegation = _Delegation;
Delegation.SUI_OBJECT_TYPE = "0x2::delegation::Delegation";

// src/builder/serializer.ts
var STD_ASCII_MODULE_NAME = "ascii";
var STD_ASCII_STRUCT_NAME = "String";
var STD_UTF8_MODULE_NAME = "string";
var STD_UTF8_STRUCT_NAME = "String";
var STD_OPTION_MODULE_NAME = "option";
var STD_OPTION_STRUCT_NAME = "Option";
var RESOLVED_SUI_ID = {
  address: SUI_FRAMEWORK_ADDRESS,
  module: OBJECT_MODULE_NAME,
  name: ID_STRUCT_NAME
};
var RESOLVED_ASCII_STR = {
  address: MOVE_STDLIB_ADDRESS,
  module: STD_ASCII_MODULE_NAME,
  name: STD_ASCII_STRUCT_NAME
};
var RESOLVED_UTF8_STR = {
  address: MOVE_STDLIB_ADDRESS,
  module: STD_UTF8_MODULE_NAME,
  name: STD_UTF8_STRUCT_NAME
};
var RESOLVED_STD_OPTION = {
  address: MOVE_STDLIB_ADDRESS,
  module: STD_OPTION_MODULE_NAME,
  name: STD_OPTION_STRUCT_NAME
};
var isSameStruct = (a, b) => a.address === b.address && a.module === b.module && a.name === b.name;
function isTxContext(param) {
  const struct = extractStructTag(param)?.Struct;
  return struct?.address === "0x2" && struct?.module === "tx_context" && struct?.name === "TxContext";
}
function expectType(typeName, argVal) {
  if (typeof argVal === "undefined") {
    return;
  }
  if (typeof argVal !== typeName) {
    throw new Error(
      `Expect ${argVal} to be ${typeName}, received ${typeof argVal}`
    );
  }
}
var allowedTypes = [
  "Address",
  "Bool",
  "U8",
  "U16",
  "U32",
  "U64",
  "U128",
  "U256"
];
function getPureSerializationType(normalizedType, argVal) {
  if (typeof normalizedType === "string" && allowedTypes.includes(normalizedType)) {
    if (normalizedType in ["U8", "U16", "U32", "U64", "U128", "U256"]) {
      expectType("number", argVal);
    } else if (normalizedType === "Bool") {
      expectType("boolean", argVal);
    } else if (normalizedType === "Address") {
      expectType("string", argVal);
      if (argVal && !isValidSuiAddress(argVal)) {
        throw new Error("Invalid Sui Address");
      }
    }
    return normalizedType.toLowerCase();
  } else if (typeof normalizedType === "string") {
    throw new Error(
      `Unknown pure normalized type ${JSON.stringify(normalizedType, null, 2)}`
    );
  }
  if ("Vector" in normalizedType) {
    if ((argVal === void 0 || typeof argVal === "string") && normalizedType.Vector === "U8") {
      return "string";
    }
    if (argVal !== void 0 && !Array.isArray(argVal)) {
      throw new Error(
        `Expect ${argVal} to be a array, received ${typeof argVal}`
      );
    }
    const innerType = getPureSerializationType(
      normalizedType.Vector,
      // undefined when argVal is empty
      argVal ? argVal[0] : void 0
    );
    if (innerType === void 0) {
      return;
    }
    return `vector<${innerType}>`;
  }
  if ("Struct" in normalizedType) {
    if (isSameStruct(normalizedType.Struct, RESOLVED_ASCII_STR)) {
      return "string";
    } else if (isSameStruct(normalizedType.Struct, RESOLVED_UTF8_STR)) {
      return "utf8string";
    } else if (isSameStruct(normalizedType.Struct, RESOLVED_SUI_ID)) {
      return "address";
    } else if (isSameStruct(normalizedType.Struct, RESOLVED_STD_OPTION)) {
      const optionToVec = {
        Vector: normalizedType.Struct.typeArguments[0]
      };
      return getPureSerializationType(optionToVec, argVal);
    }
  }
  return void 0;
}

// src/builder/TransactionBlockData.ts
var import_bcs25 = require("@mysten/bcs");
var import_superstruct18 = require("superstruct");

// src/builder/hash.ts
var import_blake2b6 = require("@noble/hashes/blake2b");
function hashTypedData(typeTag, data) {
  const typeTagBytes = Array.from(`${typeTag}::`).map((e) => e.charCodeAt(0));
  const dataWithTag = new Uint8Array(typeTagBytes.length + data.length);
  dataWithTag.set(typeTagBytes);
  dataWithTag.set(data, typeTagBytes.length);
  return (0, import_blake2b6.blake2b)(dataWithTag, { dkLen: 32 });
}

// src/builder/TransactionBlockData.ts
var TransactionExpiration = (0, import_superstruct18.optional)(
  (0, import_superstruct18.nullable)(
    (0, import_superstruct18.union)([
      (0, import_superstruct18.object)({ Epoch: (0, import_superstruct18.integer)() }),
      (0, import_superstruct18.object)({ None: (0, import_superstruct18.union)([(0, import_superstruct18.literal)(true), (0, import_superstruct18.literal)(null)]) })
    ])
  )
);
var StringEncodedBigint = (0, import_superstruct18.define)("StringEncodedBigint", (val) => {
  if (!["string", "number", "bigint"].includes(typeof val))
    return false;
  try {
    BigInt(val);
    return true;
  } catch {
    return false;
  }
});
var GasConfig = (0, import_superstruct18.object)({
  budget: (0, import_superstruct18.optional)(StringEncodedBigint),
  price: (0, import_superstruct18.optional)(StringEncodedBigint),
  payment: (0, import_superstruct18.optional)((0, import_superstruct18.array)(SuiObjectRef)),
  owner: (0, import_superstruct18.optional)((0, import_superstruct18.string)())
});
var SerializedTransactionDataBuilder = (0, import_superstruct18.object)({
  version: (0, import_superstruct18.literal)(1),
  sender: (0, import_superstruct18.optional)((0, import_superstruct18.string)()),
  expiration: TransactionExpiration,
  gasConfig: GasConfig,
  inputs: (0, import_superstruct18.array)(TransactionBlockInput),
  transactions: (0, import_superstruct18.array)(TransactionType)
});
function prepareSuiAddress(address) {
  return normalizeSuiAddress(address).replace("0x", "");
}
var TransactionBlockDataBuilder = class {
  constructor(clone) {
    this.version = 1;
    this.sender = clone?.sender;
    this.expiration = clone?.expiration;
    this.gasConfig = clone?.gasConfig ?? {};
    this.inputs = clone?.inputs ?? [];
    this.transactions = clone?.transactions ?? [];
  }
  static fromKindBytes(bytes) {
    const kind = builder.de("TransactionKind", bytes);
    const programmableTx = kind?.ProgrammableTransaction;
    if (!programmableTx) {
      throw new Error("Unable to deserialize from bytes.");
    }
    const serialized = create(
      {
        version: 1,
        // @ts-ignore
        gasConfig: {},
        inputs: programmableTx.inputs.map(
          (value, index) => create(
            {
              kind: "Input",
              value,
              index,
              type: (0, import_superstruct18.is)(value, PureCallArg) ? "pure" : "object"
            },
            TransactionBlockInput
          )
        ),
        transactions: programmableTx.transactions
      },
      SerializedTransactionDataBuilder
    );
    return TransactionBlockDataBuilder.restore(serialized);
  }
  static fromBytes(bytes) {
    const rawData = builder.de("TransactionData", bytes);
    const data = rawData?.V1;
    const programmableTx = data?.kind?.ProgrammableTransaction;
    if (!data || !programmableTx) {
      throw new Error("Unable to deserialize from bytes.");
    }
    const serialized = create(
      {
        version: 1,
        sender: data.sender,
        expiration: data.expiration,
        gasConfig: data.gasData,
        inputs: programmableTx.inputs.map(
          (value, index) => create(
            {
              kind: "Input",
              value,
              index,
              type: (0, import_superstruct18.is)(value, PureCallArg) ? "pure" : "object"
            },
            TransactionBlockInput
          )
        ),
        transactions: programmableTx.transactions
      },
      SerializedTransactionDataBuilder
    );
    return TransactionBlockDataBuilder.restore(serialized);
  }
  static restore(data) {
    (0, import_superstruct18.assert)(data, SerializedTransactionDataBuilder);
    const transactionData = new TransactionBlockDataBuilder();
    Object.assign(transactionData, data);
    return transactionData;
  }
  /**
   * Generate transaction digest.
   *
   * @param bytes BCS serialized transaction data
   * @returns transaction digest.
   */
  static getDigestFromBytes(bytes) {
    const hash = hashTypedData("TransactionData", bytes);
    return (0, import_bcs25.toB58)(hash);
  }
  build({
    maxSizeBytes = Infinity,
    overrides,
    onlyTransactionKind
  } = {}) {
    const inputs = this.inputs.map((input) => {
      (0, import_superstruct18.assert)(input.value, BuilderCallArg);
      return input.value;
    });
    const kind = {
      ProgrammableTransaction: {
        inputs,
        transactions: this.transactions
      }
    };
    if (onlyTransactionKind) {
      return builder.ser("TransactionKind", kind, { maxSize: maxSizeBytes }).toBytes();
    }
    const expiration = overrides?.expiration ?? this.expiration;
    const sender = overrides?.sender ?? this.sender;
    const gasConfig = { ...this.gasConfig, ...overrides?.gasConfig };
    if (!sender) {
      throw new Error("Missing transaction sender");
    }
    if (!gasConfig.budget) {
      throw new Error("Missing gas budget");
    }
    if (!gasConfig.payment) {
      throw new Error("Missing gas payment");
    }
    if (!gasConfig.price) {
      throw new Error("Missing gas price");
    }
    const transactionData = {
      sender: prepareSuiAddress(sender),
      expiration: expiration ? expiration : { None: true },
      gasData: {
        payment: gasConfig.payment,
        owner: prepareSuiAddress(this.gasConfig.owner ?? sender),
        price: BigInt(gasConfig.price),
        budget: BigInt(gasConfig.budget)
      },
      kind: {
        ProgrammableTransaction: {
          inputs,
          transactions: this.transactions
        }
      }
    };
    return builder.ser(
      "TransactionData",
      { V1: transactionData },
      { maxSize: maxSizeBytes }
    ).toBytes();
  }
  getDigest() {
    const bytes = this.build({ onlyTransactionKind: false });
    return TransactionBlockDataBuilder.getDigestFromBytes(bytes);
  }
  snapshot() {
    return create(this, SerializedTransactionDataBuilder);
  }
};

// src/builder/TransactionBlock.ts
var DefaultOfflineLimits = {
  maxPureArgumentSize: 16 * 1024,
  maxTxGas: 5e10,
  maxGasObjects: 256,
  maxTxSizeBytes: 128 * 1024
};
function createTransactionResult(index) {
  const baseResult = { kind: "Result", index };
  const nestedResults = [];
  const nestedResultFor = (resultIndex) => nestedResults[resultIndex] ?? (nestedResults[resultIndex] = {
    kind: "NestedResult",
    index,
    resultIndex
  });
  return new Proxy(baseResult, {
    set() {
      throw new Error(
        "The transaction result is a proxy, and does not support setting properties directly"
      );
    },
    // TODO: Instead of making this return a concrete argument, we should ideally
    // make it reference-based (so that this gets resolved at build-time), which
    // allows re-ordering transactions.
    get(target, property) {
      if (property in target) {
        return Reflect.get(target, property);
      }
      if (property === Symbol.iterator) {
        return function* () {
          let i = 0;
          while (true) {
            yield nestedResultFor(i);
            i++;
          }
        };
      }
      if (typeof property === "symbol")
        return;
      const resultIndex = parseInt(property, 10);
      if (Number.isNaN(resultIndex) || resultIndex < 0)
        return;
      return nestedResultFor(resultIndex);
    }
  });
}
function expectClient(options) {
  if (!options.client && !options.provider) {
    throw new Error(
      `No provider passed to Transaction#build, but transaction data was not sufficient to build offline.`
    );
  }
  return options.client ?? options.provider;
}
var TRANSACTION_BRAND = Symbol.for("@mysten/transaction");
var LIMITS = {
  // The maximum gas that is allowed.
  maxTxGas: "max_tx_gas",
  // The maximum number of gas objects that can be selected for one transaction.
  maxGasObjects: "max_gas_payment_objects",
  // The maximum size (in bytes) that the transaction can be:
  maxTxSizeBytes: "max_tx_size_bytes",
  // The maximum size (in bytes) that pure arguments can be:
  maxPureArgumentSize: "max_pure_argument_size"
};
var GAS_SAFE_OVERHEAD = 1000n;
var MAX_OBJECTS_PER_FETCH = 50;
var chunk = (arr, size) => Array.from(
  { length: Math.ceil(arr.length / size) },
  (_, i) => arr.slice(i * size, i * size + size)
);
function isTransactionBlock(obj) {
  return !!obj && typeof obj === "object" && obj[TRANSACTION_BRAND] === true;
}
var _blockData, _input, input_fn, _getConfig, getConfig_fn, _validate, validate_fn, _prepareGasPayment, prepareGasPayment_fn, _prepareGasPrice, prepareGasPrice_fn, _prepareTransactions, prepareTransactions_fn, _prepare, prepare_fn;
var _TransactionBlock = class {
  constructor(transaction) {
    /**
     * Dynamically create a new input, which is separate from the `input`. This is important
     * for generated clients to be able to define unique inputs that are non-overlapping with the
     * defined inputs.
     *
     * For `Uint8Array` type automatically convert the input into a `Pure` CallArg, since this
     * is the format required for custom serialization.
     *
     */
    __privateAdd(this, _input);
    __privateAdd(this, _getConfig);
    __privateAdd(this, _validate);
    // The current default is just picking _all_ coins we can which may not be ideal.
    __privateAdd(this, _prepareGasPayment);
    __privateAdd(this, _prepareGasPrice);
    __privateAdd(this, _prepareTransactions);
    /**
     * Prepare the transaction by valdiating the transaction data and resolving all inputs
     * so that it can be built into bytes.
     */
    __privateAdd(this, _prepare);
    __privateAdd(this, _blockData, void 0);
    __privateSet(this, _blockData, new TransactionBlockDataBuilder(
      transaction ? transaction.blockData : void 0
    ));
  }
  /** Returns `true` if the object is an instance of the Transaction builder class.
   * @deprecated Use `isTransactionBlock` from `@mysten/sui.js/transactions` instead.
   */
  static is(obj) {
    return !!obj && typeof obj === "object" && obj[TRANSACTION_BRAND] === true;
  }
  /**
   * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
   * Supports either a byte array, or base64-encoded bytes.
   */
  static fromKind(serialized) {
    const tx = new _TransactionBlock();
    __privateSet(tx, _blockData, TransactionBlockDataBuilder.fromKindBytes(
      typeof serialized === "string" ? (0, import_bcs27.fromB64)(serialized) : serialized
    ));
    return tx;
  }
  /**
   * Converts from a serialized transaction format to a `Transaction` class.
   * There are two supported serialized formats:
   * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
   * - A byte array (or base64-encoded bytes) containing BCS transaction data.
   */
  static from(serialized) {
    const tx = new _TransactionBlock();
    if (typeof serialized !== "string" || !serialized.startsWith("{")) {
      __privateSet(tx, _blockData, TransactionBlockDataBuilder.fromBytes(
        typeof serialized === "string" ? (0, import_bcs27.fromB64)(serialized) : serialized
      ));
    } else {
      __privateSet(tx, _blockData, TransactionBlockDataBuilder.restore(
        JSON.parse(serialized)
      ));
    }
    return tx;
  }
  /**
   * A helper to retrieve the Transaction builder `Transactions`
   * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Transactions` from `@mysten/sui.js/transactions`.
   */
  static get Transactions() {
    return Transactions;
  }
  /**
   * A helper to retrieve the Transaction builder `Inputs`
   * * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Inputs` from `@mysten/sui.js/transactions`.
   */
  static get Inputs() {
    return Inputs;
  }
  setSender(sender) {
    __privateGet(this, _blockData).sender = sender;
  }
  /**
   * Sets the sender only if it has not already been set.
   * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
   */
  setSenderIfNotSet(sender) {
    if (!__privateGet(this, _blockData).sender) {
      __privateGet(this, _blockData).sender = sender;
    }
  }
  setExpiration(expiration) {
    __privateGet(this, _blockData).expiration = expiration;
  }
  setGasPrice(price) {
    __privateGet(this, _blockData).gasConfig.price = String(price);
  }
  setGasBudget(budget) {
    __privateGet(this, _blockData).gasConfig.budget = String(budget);
  }
  setGasOwner(owner) {
    __privateGet(this, _blockData).gasConfig.owner = owner;
  }
  setGasPayment(payments) {
    __privateGet(this, _blockData).gasConfig.payment = payments.map(
      (payment) => (0, import_superstruct19.mask)(payment, SuiObjectRef)
    );
  }
  /** Get a snapshot of the transaction data, in JSON form: */
  get blockData() {
    return __privateGet(this, _blockData).snapshot();
  }
  // Used to brand transaction classes so that they can be identified, even between multiple copies
  // of the builder.
  get [TRANSACTION_BRAND]() {
    return true;
  }
  /** Returns an argument for the gas coin, to be used in a transaction. */
  get gas() {
    return { kind: "GasCoin" };
  }
  /**
   * Add a new object input to the transaction.
   */
  object(value) {
    const id = getIdFromCallArg(value);
    const inserted = __privateGet(this, _blockData).inputs.find(
      (i) => i.type === "object" && id === getIdFromCallArg(i.value)
    );
    return inserted ?? __privateMethod(this, _input, input_fn).call(this, "object", value);
  }
  /**
   * Add a new object input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  objectRef(...args) {
    return this.object(Inputs.ObjectRef(...args));
  }
  /**
   * Add a new shared object input to the transaction using the fully-resolved shared object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  sharedObjectRef(...args) {
    return this.object(Inputs.SharedObjectRef(...args));
  }
  /**
   * Add a new non-object input to the transaction.
   */
  pure(value, type) {
    return __privateMethod(this, _input, input_fn).call(this, "pure", value instanceof Uint8Array ? Inputs.Pure(value) : type ? Inputs.Pure(value, type) : value);
  }
  /** Add a transaction to the transaction block. */
  add(transaction) {
    const index = __privateGet(this, _blockData).transactions.push(transaction);
    return createTransactionResult(index - 1);
  }
  // Method shorthands:
  splitCoins(...args) {
    return this.add(Transactions.SplitCoins(...args));
  }
  mergeCoins(...args) {
    return this.add(Transactions.MergeCoins(...args));
  }
  publish(...args) {
    return this.add(Transactions.Publish(...args));
  }
  upgrade(...args) {
    return this.add(Transactions.Upgrade(...args));
  }
  moveCall(...args) {
    return this.add(Transactions.MoveCall(...args));
  }
  transferObjects(...args) {
    return this.add(Transactions.TransferObjects(...args));
  }
  makeMoveVec(...args) {
    return this.add(Transactions.MakeMoveVec(...args));
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
    return JSON.stringify(__privateGet(this, _blockData).snapshot());
  }
  /** Build the transaction to BCS bytes, and sign it with the provided keypair. */
  async sign(options) {
    const { signer, ...buildOptions } = options;
    const bytes = await this.build(buildOptions);
    return signer.signTransactionBlock(bytes);
  }
  /** Build the transaction to BCS bytes. */
  async build(options = {}) {
    await __privateMethod(this, _prepare, prepare_fn).call(this, options);
    return __privateGet(this, _blockData).build({
      maxSizeBytes: __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxTxSizeBytes", options),
      onlyTransactionKind: options.onlyTransactionKind
    });
  }
  /** Derive transaction digest */
  async getDigest(options = {}) {
    await __privateMethod(this, _prepare, prepare_fn).call(this, options);
    return __privateGet(this, _blockData).getDigest();
  }
};
var TransactionBlock = _TransactionBlock;
_blockData = new WeakMap();
_input = new WeakSet();
input_fn = function(type, value) {
  const index = __privateGet(this, _blockData).inputs.length;
  const input = create(
    {
      kind: "Input",
      // bigints can't be serialized to JSON, so just string-convert them here:
      value: typeof value === "bigint" ? String(value) : value,
      index,
      type
    },
    TransactionBlockInput
  );
  __privateGet(this, _blockData).inputs.push(input);
  return input;
};
_getConfig = new WeakSet();
getConfig_fn = function(key, { protocolConfig, limits }) {
  if (limits && typeof limits[key] === "number") {
    return limits[key];
  }
  if (!protocolConfig) {
    return DefaultOfflineLimits[key];
  }
  const attribute = protocolConfig?.attributes[LIMITS[key]];
  if (!attribute) {
    throw new Error(`Missing expected protocol config: "${LIMITS[key]}"`);
  }
  const value = "u64" in attribute ? attribute.u64 : "u32" in attribute ? attribute.u32 : attribute.f64;
  if (!value) {
    throw new Error(
      `Unexpected protocol config value found for: "${LIMITS[key]}"`
    );
  }
  return Number(value);
};
_validate = new WeakSet();
validate_fn = function(options) {
  const maxPureArgumentSize = __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxPureArgumentSize", options);
  __privateGet(this, _blockData).inputs.forEach((input, index) => {
    if ((0, import_superstruct19.is)(input.value, PureCallArg)) {
      if (input.value.Pure.length > maxPureArgumentSize) {
        throw new Error(
          `Input at index ${index} is too large, max pure input size is ${maxPureArgumentSize} bytes, got ${input.value.Pure.length} bytes`
        );
      }
    }
  });
};
_prepareGasPayment = new WeakSet();
prepareGasPayment_fn = async function(options) {
  if (__privateGet(this, _blockData).gasConfig.payment) {
    const maxGasObjects = __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxGasObjects", options);
    if (__privateGet(this, _blockData).gasConfig.payment.length > maxGasObjects) {
      throw new Error(
        `Payment objects exceed maximum amount: ${maxGasObjects}`
      );
    }
  }
  if (options.onlyTransactionKind || __privateGet(this, _blockData).gasConfig.payment) {
    return;
  }
  const gasOwner = __privateGet(this, _blockData).gasConfig.owner ?? __privateGet(this, _blockData).sender;
  const coins = await expectClient(options).getCoins({
    owner: gasOwner,
    coinType: SUI_TYPE_ARG
  });
  const paymentCoins = coins.data.filter((coin) => {
    const matchingInput = __privateGet(this, _blockData).inputs.find((input) => {
      if ((0, import_superstruct19.is)(input.value, BuilderCallArg) && "Object" in input.value && "ImmOrOwned" in input.value.Object) {
        return coin.coinObjectId === input.value.Object.ImmOrOwned.objectId;
      }
      return false;
    });
    return !matchingInput;
  }).slice(0, __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxGasObjects", options) - 1).map((coin) => ({
    objectId: coin.coinObjectId,
    digest: coin.digest,
    version: coin.version
  }));
  if (!paymentCoins.length) {
    throw new Error("No valid gas coins found for the transaction.");
  }
  this.setGasPayment(paymentCoins);
};
_prepareGasPrice = new WeakSet();
prepareGasPrice_fn = async function(options) {
  if (options.onlyTransactionKind || __privateGet(this, _blockData).gasConfig.price) {
    return;
  }
  this.setGasPrice(await expectClient(options).getReferenceGasPrice());
};
_prepareTransactions = new WeakSet();
prepareTransactions_fn = async function(options) {
  const { inputs, transactions } = __privateGet(this, _blockData);
  const moveModulesToResolve = [];
  const objectsToResolve = [];
  transactions.forEach((transaction) => {
    if (transaction.kind === "MoveCall") {
      const needsResolution = transaction.arguments.some(
        (arg) => arg.kind === "Input" && !(0, import_superstruct19.is)(inputs[arg.index].value, BuilderCallArg)
      );
      if (needsResolution) {
        moveModulesToResolve.push(transaction);
      }
      return;
    }
    const transactionType = getTransactionType(transaction);
    if (!transactionType.schema)
      return;
    Object.entries(transaction).forEach(([key, value]) => {
      if (key === "kind")
        return;
      const keySchema = transactionType.schema[key];
      const isArray = keySchema.type === "array";
      const wellKnownEncoding = isArray ? keySchema.schema[TRANSACTION_TYPE] : keySchema[TRANSACTION_TYPE];
      if (!wellKnownEncoding)
        return;
      const encodeInput = (index) => {
        const input = inputs[index];
        if (!input) {
          throw new Error(`Missing input ${value.index}`);
        }
        if ((0, import_superstruct19.is)(input.value, BuilderCallArg))
          return;
        if (wellKnownEncoding.kind === "object" && typeof input.value === "string") {
          objectsToResolve.push({ id: input.value, input });
        } else if (wellKnownEncoding.kind === "pure") {
          input.value = Inputs.Pure(input.value, wellKnownEncoding.type);
        } else {
          throw new Error("Unexpected input format.");
        }
      };
      if (isArray) {
        value.forEach((arrayItem) => {
          if (arrayItem.kind !== "Input")
            return;
          encodeInput(arrayItem.index);
        });
      } else {
        if (value.kind !== "Input")
          return;
        encodeInput(value.index);
      }
    });
  });
  if (moveModulesToResolve.length) {
    await Promise.all(
      moveModulesToResolve.map(async (moveCall) => {
        const [packageId, moduleName, functionName] = moveCall.target.split("::");
        const normalized = await expectClient(
          options
        ).getNormalizedMoveFunction({
          package: normalizeSuiObjectId(packageId),
          module: moduleName,
          function: functionName
        });
        const hasTxContext = normalized.parameters.length > 0 && isTxContext(normalized.parameters.at(-1));
        const params = hasTxContext ? normalized.parameters.slice(0, normalized.parameters.length - 1) : normalized.parameters;
        if (params.length !== moveCall.arguments.length) {
          throw new Error("Incorrect number of arguments.");
        }
        params.forEach((param, i) => {
          const arg = moveCall.arguments[i];
          if (arg.kind !== "Input")
            return;
          const input = inputs[arg.index];
          if ((0, import_superstruct19.is)(input.value, BuilderCallArg))
            return;
          const inputValue = input.value;
          const serType = getPureSerializationType(param, inputValue);
          if (serType) {
            input.value = Inputs.Pure(inputValue, serType);
            return;
          }
          const structVal = extractStructTag(param);
          if (structVal != null || typeof param === "object" && "TypeParameter" in param) {
            if (typeof inputValue !== "string") {
              throw new Error(
                `Expect the argument to be an object id string, got ${JSON.stringify(
                  inputValue,
                  null,
                  2
                )}`
              );
            }
            objectsToResolve.push({
              id: inputValue,
              input,
              normalizedType: param
            });
            return;
          }
          throw new Error(
            `Unknown call arg type ${JSON.stringify(
              param,
              null,
              2
            )} for value ${JSON.stringify(inputValue, null, 2)}`
          );
        });
      })
    );
  }
  if (objectsToResolve.length) {
    const dedupedIds = [...new Set(objectsToResolve.map(({ id }) => id))];
    const objectChunks = chunk(dedupedIds, MAX_OBJECTS_PER_FETCH);
    const objects = (await Promise.all(
      objectChunks.map(
        (chunk2) => expectClient(options).multiGetObjects({
          ids: chunk2,
          // @ts-ignore
          options: { showOwner: true }
        })
      )
    )).flat();
    let objectsById = new Map(
      dedupedIds.map((id, index) => {
        return [id, objects[index]];
      })
    );
    const invalidObjects = Array.from(objectsById).filter(([_, obj]) => obj.error).map(([id, _]) => id);
    if (invalidObjects.length) {
      throw new Error(
        `The following input objects are invalid: ${invalidObjects.join(
          ", "
        )}`
      );
    }
    objectsToResolve.forEach(({ id, input, normalizedType }) => {
      const object17 = objectsById.get(id);
      const owner = object17.data?.owner;
      const initialSharedVersion = owner && typeof owner === "object" && "Shared" in owner ? owner.Shared.initial_shared_version : void 0;
      if (initialSharedVersion) {
        const mutable = isMutableSharedObjectInput(input.value) || normalizedType != null && extractMutableReference(normalizedType) != null;
        input.value = Inputs.SharedObjectRef({
          objectId: id,
          initialSharedVersion,
          mutable
        });
      } else {
        input.value = Inputs.ObjectRef(
          getObjectReference(object17)
        );
      }
    });
  }
};
_prepare = new WeakSet();
prepare_fn = async function(options) {
  if (!options.onlyTransactionKind && !__privateGet(this, _blockData).sender) {
    throw new Error("Missing transaction sender");
  }
  const client = options.client || options.provider;
  if (!options.protocolConfig && !options.limits && client) {
    options.protocolConfig = await client.getProtocolConfig();
  }
  await Promise.all([
    __privateMethod(this, _prepareGasPrice, prepareGasPrice_fn).call(this, options),
    __privateMethod(this, _prepareTransactions, prepareTransactions_fn).call(this, options)
  ]);
  if (!options.onlyTransactionKind) {
    await __privateMethod(this, _prepareGasPayment, prepareGasPayment_fn).call(this, options);
    if (!__privateGet(this, _blockData).gasConfig.budget) {
      const dryRunResult = await expectClient(options).dryRunTransactionBlock(
        {
          transactionBlock: __privateGet(this, _blockData).build({
            maxSizeBytes: __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxTxSizeBytes", options),
            overrides: {
              // @ts-ignore
              gasConfig: {
                budget: String(__privateMethod(this, _getConfig, getConfig_fn).call(this, "maxTxGas", options)),
                payment: []
              }
            }
          })
        }
      );
      if (dryRunResult.effects.status.status !== "success") {
        throw new Error(
          `Dry run failed, could not automatically determine a budget: ${dryRunResult.effects.status.error}`,
          // @ts-ignore
          { cause: dryRunResult }
        );
      }
      const safeOverhead = GAS_SAFE_OVERHEAD * BigInt(this.blockData.gasConfig.price || 1n);
      const baseComputationCostWithOverhead = BigInt(dryRunResult.effects.gasUsed.computationCost) + safeOverhead;
      const gasBudget = baseComputationCostWithOverhead + BigInt(dryRunResult.effects.gasUsed.storageCost) - BigInt(dryRunResult.effects.gasUsed.storageRebate);
      this.setGasBudget(
        gasBudget > baseComputationCostWithOverhead ? gasBudget : baseComputationCostWithOverhead
      );
    }
  }
  __privateMethod(this, _validate, validate_fn).call(this, options);
};

// src/faucet/index.ts
var FaucetRateLimitError = class extends Error {
};
async function faucetRequest(host, path, body, headers) {
  const endpoint = new URL(path, host).toString();
  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
  if (res.status === 429) {
    throw new FaucetRateLimitError(
      `Too many requests from this client have been sent to the faucet. Please retry later`
    );
  }
  try {
    const parsed = await res.json();
    if (parsed.error) {
      throw new Error(`Faucet returns error: ${parsed.error}`);
    }
    return parsed;
  } catch (e) {
    throw new Error(
      `Encountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`
    );
  }
}
async function requestSuiFromFaucetV0(input) {
  return faucetRequest(
    input.host,
    "/gas",
    {
      FixedAmountRequest: {
        recipient: input.recipient
      }
    },
    input.headers
  );
}

// src/providers/json-rpc-provider.ts
var DEFAULT_OPTIONS = {
  socketOptions: DEFAULT_CLIENT_OPTIONS,
  versionCacheTimeoutInSeconds: 600
};
var JsonRpcProvider = class {
  /**
   * Establish a connection to a Sui RPC endpoint
   *
   * @param connection The `Connection` object containing configuration for the network.
   * @param options configuration options for the provider
   */
  constructor(connection = devnetConnection, options = DEFAULT_OPTIONS) {
    this.options = options;
    this.connection = connection;
    const opts = { ...DEFAULT_OPTIONS, ...options };
    this.options = opts;
    this.client = opts.rpcClient ?? new JsonRpcClient(this.connection.fullnode);
    this.wsClient = opts.websocketClient ?? new WebsocketClient(this.connection.websocket, opts.socketOptions);
  }
  async getRpcApiVersion() {
    if (this.rpcApiVersion && this.cacheExpiry && this.cacheExpiry <= Date.now()) {
      return this.rpcApiVersion;
    }
    try {
      const resp = await this.client.requestWithType("rpc.discover", [], (0, import_superstruct20.any)());
      this.rpcApiVersion = resp.info.version;
      this.cacheExpiry = // Date.now() is in milliseconds, but the timeout is in seconds
      Date.now() + (this.options.versionCacheTimeoutInSeconds ?? 0) * 1e3;
      return this.rpcApiVersion;
    } catch (err) {
      console.warn("Error fetching version number of the RPC API", err);
    }
    return void 0;
  }
  /** @deprecated Use `@mysten/sui.js/faucet` instead. */
  async requestSuiFromFaucet(recipient, headers) {
    if (!this.connection.faucet) {
      throw new Error("Faucet URL is not specified");
    }
    return requestSuiFromFaucetV0({
      host: this.connection.faucet,
      recipient,
      headers
    });
  }
  /**
   * Get all Coin<`coin_type`> objects owned by an address.
   */
  async getCoins(input) {
    if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) {
      throw new Error("Invalid Sui address");
    }
    return await this.client.requestWithType(
      "suix_getCoins",
      [input.owner, input.coinType, input.cursor, input.limit],
      PaginatedCoins
    );
  }
  /**
   * Get all Coin objects owned by an address.
   */
  async getAllCoins(input) {
    if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) {
      throw new Error("Invalid Sui address");
    }
    return await this.client.requestWithType(
      "suix_getAllCoins",
      [input.owner, input.cursor, input.limit],
      PaginatedCoins
    );
  }
  /**
   * Get the total coin balance for one coin type, owned by the address owner.
   */
  async getBalance(input) {
    if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) {
      throw new Error("Invalid Sui address");
    }
    return await this.client.requestWithType(
      "suix_getBalance",
      [input.owner, input.coinType],
      CoinBalance
    );
  }
  /**
   * Get the total coin balance for all coin types, owned by the address owner.
   */
  async getAllBalances(input) {
    if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) {
      throw new Error("Invalid Sui address");
    }
    return await this.client.requestWithType(
      "suix_getAllBalances",
      [input.owner],
      (0, import_superstruct20.array)(CoinBalance)
    );
  }
  /**
   * Fetch CoinMetadata for a given coin type
   */
  async getCoinMetadata(input) {
    return await this.client.requestWithType(
      "suix_getCoinMetadata",
      [input.coinType],
      CoinMetadataStruct
    );
  }
  /**
   *  Fetch total supply for a coin
   */
  async getTotalSupply(input) {
    return await this.client.requestWithType(
      "suix_getTotalSupply",
      [input.coinType],
      CoinSupply
    );
  }
  /**
   * Invoke any RPC method
   * @param method the method to be invoked
   * @param args the arguments to be passed to the RPC request
   */
  async call(method, params) {
    return await this.client.request(method, params);
  }
  /**
   * Get Move function argument types like read, write and full access
   */
  async getMoveFunctionArgTypes(input) {
    return await this.client.requestWithType(
      "sui_getMoveFunctionArgTypes",
      [input.package, input.module, input.function],
      SuiMoveFunctionArgTypes
    );
  }
  /**
   * Get a map from module name to
   * structured representations of Move modules
   */
  async getNormalizedMoveModulesByPackage(input) {
    return await this.client.requestWithType(
      "sui_getNormalizedMoveModulesByPackage",
      [input.package],
      SuiMoveNormalizedModules
    );
  }
  /**
   * Get a structured representation of Move module
   */
  async getNormalizedMoveModule(input) {
    return await this.client.requestWithType(
      "sui_getNormalizedMoveModule",
      [input.package, input.module],
      SuiMoveNormalizedModule
    );
  }
  /**
   * Get a structured representation of Move function
   */
  async getNormalizedMoveFunction(input) {
    return await this.client.requestWithType(
      "sui_getNormalizedMoveFunction",
      [input.package, input.module, input.function],
      SuiMoveNormalizedFunction
    );
  }
  /**
   * Get a structured representation of Move struct
   */
  async getNormalizedMoveStruct(input) {
    return await this.client.requestWithType(
      "sui_getNormalizedMoveStruct",
      [input.package, input.module, input.struct],
      SuiMoveNormalizedStruct
    );
  }
  /**
   * Get all objects owned by an address
   */
  async getOwnedObjects(input) {
    if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) {
      throw new Error("Invalid Sui address");
    }
    return await this.client.requestWithType(
      "suix_getOwnedObjects",
      [
        input.owner,
        {
          filter: input.filter,
          options: input.options
        },
        input.cursor,
        input.limit
      ],
      PaginatedObjectsResponse
    );
  }
  /**
   * Get details about an object
   */
  async getObject(input) {
    if (!input.id || !isValidSuiObjectId(normalizeSuiObjectId(input.id))) {
      throw new Error("Invalid Sui Object id");
    }
    return await this.client.requestWithType(
      "sui_getObject",
      [input.id, input.options],
      SuiObjectResponse
    );
  }
  async tryGetPastObject(input) {
    return await this.client.requestWithType(
      "sui_tryGetPastObject",
      [input.id, input.version, input.options],
      ObjectRead
    );
  }
  /**
   * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
   */
  async multiGetObjects(input) {
    input.ids.forEach((id) => {
      if (!id || !isValidSuiObjectId(normalizeSuiObjectId(id))) {
        throw new Error(`Invalid Sui Object id ${id}`);
      }
    });
    const hasDuplicates = input.ids.length !== new Set(input.ids).size;
    if (hasDuplicates) {
      throw new Error(`Duplicate object ids in batch call ${input.ids}`);
    }
    return await this.client.requestWithType(
      "sui_multiGetObjects",
      [input.ids, input.options],
      (0, import_superstruct20.array)(SuiObjectResponse)
    );
  }
  /**
   * Get transaction blocks for a given query criteria
   */
  async queryTransactionBlocks(input) {
    return await this.client.requestWithType(
      "suix_queryTransactionBlocks",
      [
        {
          filter: input.filter,
          options: input.options
        },
        input.cursor,
        input.limit,
        (input.order || "descending") === "descending"
      ],
      PaginatedTransactionResponse
    );
  }
  async getTransactionBlock(input) {
    if (!isValidTransactionDigest(input.digest)) {
      throw new Error("Invalid Transaction digest");
    }
    return await this.client.requestWithType(
      "sui_getTransactionBlock",
      [input.digest, input.options],
      SuiTransactionBlockResponse
    );
  }
  async multiGetTransactionBlocks(input) {
    input.digests.forEach((d) => {
      if (!isValidTransactionDigest(d)) {
        throw new Error(`Invalid Transaction digest ${d}`);
      }
    });
    const hasDuplicates = input.digests.length !== new Set(input.digests).size;
    if (hasDuplicates) {
      throw new Error(`Duplicate digests in batch call ${input.digests}`);
    }
    return await this.client.requestWithType(
      "sui_multiGetTransactionBlocks",
      [input.digests, input.options],
      (0, import_superstruct20.array)(SuiTransactionBlockResponse)
    );
  }
  async executeTransactionBlock(input) {
    return await this.client.requestWithType(
      "sui_executeTransactionBlock",
      [
        typeof input.transactionBlock === "string" ? input.transactionBlock : (0, import_bcs28.toB64)(input.transactionBlock),
        Array.isArray(input.signature) ? input.signature : [input.signature],
        input.options,
        input.requestType
      ],
      SuiTransactionBlockResponse
    );
  }
  /**
   * Get total number of transactions
   */
  async getTotalTransactionBlocks() {
    const resp = await this.client.requestWithType(
      "sui_getTotalTransactionBlocks",
      [],
      (0, import_superstruct20.string)()
    );
    return BigInt(resp);
  }
  /**
   * Getting the reference gas price for the network
   */
  async getReferenceGasPrice() {
    const resp = await this.client.requestWithType(
      "suix_getReferenceGasPrice",
      [],
      (0, import_superstruct20.string)()
    );
    return BigInt(resp);
  }
  /**
   * Return the delegated stakes for an address
   */
  async getStakes(input) {
    if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) {
      throw new Error("Invalid Sui address");
    }
    return await this.client.requestWithType(
      "suix_getStakes",
      [input.owner],
      (0, import_superstruct20.array)(DelegatedStake)
    );
  }
  /**
   * Return the delegated stakes queried by id.
   */
  async getStakesByIds(input) {
    input.stakedSuiIds.forEach((id) => {
      if (!id || !isValidSuiObjectId(normalizeSuiObjectId(id))) {
        throw new Error(`Invalid Sui Stake id ${id}`);
      }
    });
    return await this.client.requestWithType(
      "suix_getStakesByIds",
      [input.stakedSuiIds],
      (0, import_superstruct20.array)(DelegatedStake)
    );
  }
  /**
   * Return the latest system state content.
   */
  async getLatestSuiSystemState() {
    return await this.client.requestWithType(
      "suix_getLatestSuiSystemState",
      [],
      SuiSystemStateSummary
    );
  }
  /**
   * Get events for a given query criteria
   */
  async queryEvents(input) {
    return await this.client.requestWithType(
      "suix_queryEvents",
      [
        input.query,
        input.cursor,
        input.limit,
        (input.order || "descending") === "descending"
      ],
      PaginatedEvents
    );
  }
  /**
   * Subscribe to get notifications whenever an event matching the filter occurs
   */
  async subscribeEvent(input) {
    return this.wsClient.request({
      method: "suix_subscribeEvent",
      unsubscribe: "suix_unsubscribeEvent",
      params: [input.filter],
      onMessage: input.onMessage
    });
  }
  async subscribeTransaction(input) {
    return this.wsClient.request({
      method: "suix_subscribeTransaction",
      unsubscribe: "suix_unsubscribeTransaction",
      params: [input.filter],
      onMessage: input.onMessage
    });
  }
  /**
   * Runs the transaction block in dev-inspect mode. Which allows for nearly any
   * transaction (or Move call) with any arguments. Detailed results are
   * provided, including both the transaction effects and any return values.
   */
  async devInspectTransactionBlock(input) {
    let devInspectTxBytes;
    if (isTransactionBlock(input.transactionBlock)) {
      input.transactionBlock.setSenderIfNotSet(input.sender);
      devInspectTxBytes = (0, import_bcs28.toB64)(
        await input.transactionBlock.build({
          provider: this,
          onlyTransactionKind: true
        })
      );
    } else if (typeof input.transactionBlock === "string") {
      devInspectTxBytes = input.transactionBlock;
    } else if (input.transactionBlock instanceof Uint8Array) {
      devInspectTxBytes = (0, import_bcs28.toB64)(input.transactionBlock);
    } else {
      throw new Error("Unknown transaction block format.");
    }
    return await this.client.requestWithType(
      "sui_devInspectTransactionBlock",
      [input.sender, devInspectTxBytes, input.gasPrice, input.epoch],
      DevInspectResults
    );
  }
  /**
   * Dry run a transaction block and return the result.
   */
  async dryRunTransactionBlock(input) {
    return await this.client.requestWithType(
      "sui_dryRunTransactionBlock",
      [
        typeof input.transactionBlock === "string" ? input.transactionBlock : (0, import_bcs28.toB64)(input.transactionBlock)
      ],
      DryRunTransactionBlockResponse
    );
  }
  /**
   * Return the list of dynamic field objects owned by an object
   */
  async getDynamicFields(input) {
    if (!input.parentId || !isValidSuiObjectId(normalizeSuiObjectId(input.parentId))) {
      throw new Error("Invalid Sui Object id");
    }
    return await this.client.requestWithType(
      "suix_getDynamicFields",
      [input.parentId, input.cursor, input.limit],
      DynamicFieldPage
    );
  }
  /**
   * Return the dynamic field object information for a specified object
   */
  async getDynamicFieldObject(input) {
    return await this.client.requestWithType(
      "suix_getDynamicFieldObject",
      [input.parentId, input.name],
      SuiObjectResponse
    );
  }
  /**
   * Get the sequence number of the latest checkpoint that has been executed
   */
  async getLatestCheckpointSequenceNumber() {
    const resp = await this.client.requestWithType(
      "sui_getLatestCheckpointSequenceNumber",
      [],
      (0, import_superstruct20.string)()
    );
    return String(resp);
  }
  /**
   * Returns information about a given checkpoint
   */
  async getCheckpoint(input) {
    return await this.client.requestWithType(
      "sui_getCheckpoint",
      [input.id],
      Checkpoint
    );
  }
  /**
   * Returns historical checkpoints paginated
   */
  async getCheckpoints(input) {
    const resp = await this.client.requestWithType(
      "sui_getCheckpoints",
      [input.cursor, input?.limit, input.descendingOrder],
      CheckpointPage
    );
    return resp;
  }
  /**
   * Return the committee information for the asked epoch
   */
  async getCommitteeInfo(input) {
    return await this.client.requestWithType(
      "suix_getCommitteeInfo",
      [input?.epoch],
      CommitteeInfo
    );
  }
  async getNetworkMetrics() {
    return await this.client.requestWithType(
      "suix_getNetworkMetrics",
      [],
      NetworkMetrics
    );
  }
  async getAddressMetrics() {
    return await this.client.requestWithType(
      "suix_getLatestAddressMetrics",
      [],
      AddressMetrics
    );
  }
  async getAllEpochAddressMetrics(input) {
    return await this.client.requestWithType(
      "suix_getAllEpochAddressMetrics",
      [input?.descendingOrder],
      AllEpochsAddressMetrics
    );
  }
  /**
   * Return the committee information for the asked epoch
   */
  async getEpochs(input) {
    return await this.client.requestWithType(
      "suix_getEpochs",
      [input?.cursor, input?.limit, input?.descendingOrder],
      EpochPage
    );
  }
  /**
   * Returns list of top move calls by usage
   */
  async getMoveCallMetrics() {
    return await this.client.requestWithType(
      "suix_getMoveCallMetrics",
      [],
      MoveCallMetrics
    );
  }
  /**
   * Return the committee information for the asked epoch
   */
  async getCurrentEpoch() {
    return await this.client.requestWithType(
      "suix_getCurrentEpoch",
      [],
      EpochInfo
    );
  }
  /**
   * Return the Validators APYs
   */
  async getValidatorsApy() {
    return await this.client.requestWithType(
      "suix_getValidatorsApy",
      [],
      ValidatorsApy
    );
  }
  // TODO: Migrate this to `sui_getChainIdentifier` once it is widely available.
  async getChainIdentifier() {
    const checkpoint = await this.getCheckpoint({ id: "0" });
    const bytes = (0, import_bcs28.fromB58)(checkpoint.digest);
    return (0, import_bcs28.toHEX)(bytes.slice(0, 4));
  }
  async resolveNameServiceAddress(input) {
    return await this.client.requestWithType(
      "suix_resolveNameServiceAddress",
      [input.name],
      (0, import_superstruct20.nullable)((0, import_superstruct20.string)())
    );
  }
  async resolveNameServiceNames(input) {
    return await this.client.requestWithType(
      "suix_resolveNameServiceNames",
      [input.address],
      ResolvedNameServiceNames
    );
  }
  async getProtocolConfig(input) {
    return await this.client.requestWithType(
      "sui_getProtocolConfig",
      [input?.version],
      ProtocolConfig
    );
  }
  /**
   * Wait for a transaction block result to be available over the API.
   * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
   * be available via the API.
   * This currently polls the `getTransactionBlock` API to check for the transaction.
   */
  async waitForTransactionBlock({
    signal,
    timeout = 60 * 1e3,
    pollInterval = 2 * 1e3,
    ...input
  }) {
    const timeoutSignal = AbortSignal.timeout(timeout);
    const timeoutPromise = new Promise((_, reject) => {
      timeoutSignal.addEventListener(
        "abort",
        () => reject(timeoutSignal.reason)
      );
    });
    timeoutPromise.catch(() => {
    });
    while (!timeoutSignal.aborted) {
      signal?.throwIfAborted();
      try {
        return await this.getTransactionBlock(input);
      } catch (e) {
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, pollInterval)),
          timeoutPromise
        ]);
      }
    }
    timeoutSignal.throwIfAborted();
    throw new Error("Unexpected error while waiting for transaction block.");
  }
};

// src/signers/raw-signer.ts
var import_blake2b7 = require("@noble/hashes/blake2b");

// src/signers/signer-with-provider.ts
var import_bcs29 = require("@mysten/bcs");
var SignerWithProvider = class {
  /**
   * @deprecated Use `client` instead.
   */
  get provider() {
    return this.client;
  }
  ///////////////////
  // Sub-classes MAY override these
  /**
   * Request gas tokens from a faucet server and send to the signer
   * address
   * @param httpHeaders optional request headers
   * @deprecated Use `@mysten/sui.js/faucet` instead.
   */
  async requestSuiFromFaucet(httpHeaders) {
    if (!("requestSuiFromFaucet" in this.provider)) {
      throw new Error(
        "To request SUI from faucet, please use @mysten/sui.js/faucet instead"
      );
    }
    return this.provider.requestSuiFromFaucet(
      await this.getAddress(),
      httpHeaders
    );
  }
  constructor(client) {
    this.client = client;
  }
  /**
   * Sign a message using the keypair, with the `PersonalMessage` intent.
   */
  async signMessage(input) {
    const signature = await this.signData(
      messageWithIntent(
        3 /* PersonalMessage */,
        bcs.ser(["vector", "u8"], input.message).toBytes()
      )
    );
    return {
      messageBytes: (0, import_bcs29.toB64)(input.message),
      signature
    };
  }
  async prepareTransactionBlock(transactionBlock) {
    if (isTransactionBlock(transactionBlock)) {
      transactionBlock.setSenderIfNotSet(await this.getAddress());
      return await transactionBlock.build({
        client: this.client
      });
    }
    if (transactionBlock instanceof Uint8Array) {
      return transactionBlock;
    }
    throw new Error("Unknown transaction format");
  }
  async getIntentMessage(input) {
    const transactionBlockBytes = await this.prepareTransactionBlock(
      input.transactionBlock
    );
    const intent = messageWithIntent(
      0 /* TransactionData */,
      transactionBlockBytes
    );
    return [intent, transactionBlockBytes];
  }
  /**
   * Sign a transaction.
   */
  async signTransactionBlock(input) {
    const transactionBlockBytes = await this.prepareTransactionBlock(
      input.transactionBlock
    );
    const intentMessage = messageWithIntent(
      0 /* TransactionData */,
      transactionBlockBytes
    );
    const signature = await this.signData(intentMessage);
    return {
      transactionBlockBytes: (0, import_bcs29.toB64)(transactionBlockBytes),
      signature
    };
  }
  /**
   * Sign a transaction block and submit to the Fullnode for execution.
   *
   * @param options specify which fields to return (e.g., transaction, effects, events, etc).
   * By default, only the transaction digest will be returned.
   * @param requestType WaitForEffectsCert or WaitForLocalExecution, see details in `ExecuteTransactionRequestType`.
   * Defaults to `WaitForLocalExecution` if options.show_effects or options.show_events is true
   */
  async signAndExecuteTransactionBlock(input) {
    const { transactionBlockBytes, signature } = await this.signTransactionBlock({
      transactionBlock: input.transactionBlock
    });
    return await this.client.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
      options: input.options,
      requestType: input.requestType
    });
  }
  /**
   * Derive transaction digest from
   * @param tx BCS serialized transaction data or a `Transaction` object
   * @returns transaction digest
   */
  async getTransactionBlockDigest(tx) {
    if (isTransactionBlock(tx)) {
      tx.setSenderIfNotSet(await this.getAddress());
      return tx.getDigest({ client: this.client });
    } else if (tx instanceof Uint8Array) {
      return TransactionBlockDataBuilder.getDigestFromBytes(tx);
    } else {
      throw new Error("Unknown transaction format.");
    }
  }
  /**
   * Runs the transaction in dev-inpsect mode. Which allows for nearly any
   * transaction (or Move call) with any arguments. Detailed results are
   * provided, including both the transaction effects and any return values.
   */
  async devInspectTransactionBlock(input) {
    const address = await this.getAddress();
    return this.client.devInspectTransactionBlock({
      sender: address,
      ...input
    });
  }
  /**
   * Dry run a transaction and return the result.
   */
  async dryRunTransactionBlock(input) {
    let dryRunTxBytes;
    if (isTransactionBlock(input.transactionBlock)) {
      input.transactionBlock.setSenderIfNotSet(await this.getAddress());
      dryRunTxBytes = await input.transactionBlock.build({
        client: this.client
      });
    } else if (typeof input.transactionBlock === "string") {
      dryRunTxBytes = (0, import_bcs29.fromB64)(input.transactionBlock);
    } else if (input.transactionBlock instanceof Uint8Array) {
      dryRunTxBytes = input.transactionBlock;
    } else {
      throw new Error("Unknown transaction format");
    }
    return this.client.dryRunTransactionBlock({
      transactionBlock: dryRunTxBytes
    });
  }
  /**
   * Returns the estimated gas cost for the transaction
   * @param tx The transaction to estimate the gas cost. When string it is assumed it's a serialized tx in base64
   * @returns total gas cost estimation
   * @throws whens fails to estimate the gas cost
   */
  async getGasCostEstimation(...args) {
    const txEffects = await this.dryRunTransactionBlock(...args);
    const gasEstimation = getTotalGasUsedUpperBound(txEffects.effects);
    if (typeof gasEstimation === "undefined") {
      throw new Error("Failed to estimate the gas cost from transaction");
    }
    return gasEstimation;
  }
};

// src/signers/raw-signer.ts
var RawSigner = class extends SignerWithProvider {
  constructor(keypair, client) {
    super(client);
    this.keypair = keypair;
  }
  async getAddress() {
    return this.keypair.getPublicKey().toSuiAddress();
  }
  static async getDigest(data) {
    return (0, import_blake2b7.blake2b)(data, { dkLen: 32 });
  }
  async getSerializedSignature(signature) {
    const signatureScheme = this.keypair.getKeyScheme();
    const pubkey = this.keypair.getPublicKey();
    return toSerializedSignature({
      signatureScheme,
      signature,
      pubKey: pubkey
    });
  }
  async signData(data) {
    const pubkey = this.keypair.getPublicKey();
    const digest = (0, import_blake2b7.blake2b)(data, { dkLen: 32 });
    const signature = this.keypair.signData(digest);
    const signatureScheme = this.keypair.getKeyScheme();
    return toSerializedSignature({
      signatureScheme,
      signature,
      pubKey: pubkey
    });
  }
  connect(client) {
    return new RawSigner(this.keypair, client);
  }
};

// src/utils/verify.ts
var import_bcs31 = require("@mysten/bcs");
var import_blake2b8 = require("@noble/hashes/blake2b");
async function verifyMessage(message, serializedSignature, scope) {
  const signature = toSingleSignaturePubkeyPair(serializedSignature);
  if (scope === 3 /* PersonalMessage */) {
    const messageBytes2 = messageWithIntent(
      scope,
      bcs.ser(
        ["vector", "u8"],
        typeof message === "string" ? (0, import_bcs31.fromB64)(message) : message
      ).toBytes()
    );
    if (await signature.pubKey.verify(
      (0, import_blake2b8.blake2b)(messageBytes2, { dkLen: 32 }),
      signature.signature
    )) {
      return true;
    }
    const unwrappedMessageBytes = messageWithIntent(
      scope,
      typeof message === "string" ? (0, import_bcs31.fromB64)(message) : message
    );
    return signature.pubKey.verify(
      (0, import_blake2b8.blake2b)(unwrappedMessageBytes, { dkLen: 32 }),
      signature.signature
    );
  }
  const messageBytes = messageWithIntent(
    scope,
    typeof message === "string" ? (0, import_bcs31.fromB64)(message) : message
  );
  return signature.pubKey.verify(
    (0, import_blake2b8.blake2b)(messageBytes, { dkLen: 32 }),
    signature.signature
  );
}

// src/index.ts
var import_bcs33 = require("@mysten/bcs");

// src/utils/format.ts
var ELLIPSIS = "\u2026";
function formatAddress(address) {
  if (address.length <= 6) {
    return address;
  }
  const offset = address.startsWith("0x") ? 2 : 0;
  return `0x${address.slice(offset, offset + 4)}${ELLIPSIS}${address.slice(
    -4
  )}`;
}
function formatDigest(digest) {
  return `${digest.slice(0, 10)}${ELLIPSIS}`;
}

// src/index.ts
var import_superstruct21 = require("superstruct");

// src/framework/sui-system-state.ts
var SUI_SYSTEM_STATE_OBJECT_ID = normalizeSuiObjectId("0x5");
var SUI_SYSTEM_MODULE_NAME = "sui_system";
var ADD_STAKE_FUN_NAME = "request_add_stake";
var ADD_STAKE_LOCKED_COIN_FUN_NAME = "request_add_stake_with_locked_coin";
var WITHDRAW_STAKE_FUN_NAME = "request_withdraw_stake";
var SuiSystemStateUtil = class {
  /**
   * Create a new transaction for staking coins ready to be signed and executed with `signer-and-provider`.
   *
   * @param coins the coins to be staked
   * @param amount the amount to stake
   * @param gasBudget omittable only for DevInspect mode
   */
  static async newRequestAddStakeTxn(client, coins, amount, validatorAddress) {
    const tx = new TransactionBlock();
    const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
    tx.moveCall({
      target: `${SUI_SYSTEM_ADDRESS}::${SUI_SYSTEM_MODULE_NAME}::${ADD_STAKE_FUN_NAME}`,
      arguments: [
        tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
        coin,
        tx.pure(validatorAddress)
      ]
    });
    const coinObjects = await client.multiGetObjects({
      ids: coins,
      // @ts-ignore
      options: {
        showOwner: true
      }
    });
    tx.setGasPayment(coinObjects.map((obj) => getObjectReference(obj)));
    return tx;
  }
  /**
   * Create a new transaction for withdrawing coins ready to be signed and
   * executed with `signer-and-provider`.
   *
   * @param stake the stake object created in the requestAddStake txn
   * @param stakedCoinId the coins to withdraw
   * @param gasBudget omittable only for DevInspect mode
   */
  static async newRequestWithdrawlStakeTxn(stake, stakedCoinId) {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${SUI_SYSTEM_ADDRESS}::${SUI_SYSTEM_MODULE_NAME}::${WITHDRAW_STAKE_FUN_NAME}`,
      arguments: [
        tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
        tx.object(stake),
        tx.object(stakedCoinId)
      ]
    });
    return tx;
  }
};

// src/wallet-client.ts
var bip39 = __toESM(require("@scure/bip39"));
var english = __toESM(require("@scure/bip39/wordlists/english"));

// src/nft-client.ts
var NftRegex = /(0x[a-f0-9]{39,40})::nft::Nft<0x[a-f0-9]{39,40}::([a-zA-Z]{1,})::([a-zA-Z]{1,})>/;
var UrlDomainRegex = /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
var DisplayDomainRegex = /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;
var NftParser = {
  parser: (data, suiData, rpcResponse) => {
    if (typeof rpcResponse.data === "object" && "owner" in rpcResponse.data) {
      const { owner } = rpcResponse.data;
      const matches = suiData.content.type.match(NftRegex);
      if (!matches) {
        return void 0;
      }
      const packageObjectId = matches[1];
      const packageModule = matches[2];
      const packageModuleClassName = matches[3];
      return {
        owner,
        type: suiData.content?.dataType,
        id: rpcResponse.data.objectId,
        packageObjectId,
        packageModule,
        packageModuleClassName,
        rawResponse: rpcResponse,
        logicalOwner: data.logical_owner,
        bagId: data.bag.fields.id.id
      };
    }
    return void 0;
  },
  regex: NftRegex
};
var isTypeMatchRegex = (d, regex) => {
  const { data } = d;
  if ((0, import_superstruct21.is)(data, SuiObjectData)) {
    const { content } = data;
    if (content && "type" in content) {
      return content.type.match(regex);
    }
  }
  return false;
};
var parseDomains = (domains) => {
  const response = {};
  const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
  const displayDomain = domains.find(
    (d) => isTypeMatchRegex(d, DisplayDomainRegex)
  );
  if (urlDomain && getObjectFields(urlDomain)) {
    response.url = getObjectFields(urlDomain).value.fields.url;
  }
  if (displayDomain && getObjectFields(displayDomain)) {
    response.description = getObjectFields(displayDomain).value.fields.description;
    response.name = getObjectFields(displayDomain).value.fields.name;
  }
  return response;
};
var NftClient = class {
  constructor(provider) {
    this.parseObjects = async (objects) => {
      const parsedObjects = objects.map((object17) => {
        if (getObjectType(object17)?.match(NftParser.regex)) {
          return NftParser.parser(
            getObjectFields(object17),
            getSuiObjectData(object17),
            object17
          );
        }
        return void 0;
      }).filter((object17) => !!object17);
      return parsedObjects;
    };
    this.fetchAndParseObjectsById = async (ids) => {
      if (ids.length === 0) {
        return new Array();
      }
      const objects = await this.provider.multiGetObjects({
        ids,
        // @ts-ignore
        options: {
          showType: true,
          showContent: true,
          showOwner: true
        }
      });
      return this.parseObjects(objects);
    };
    this.getBagContent = async (bagId) => {
      const bagObjects = await this.provider.getDynamicFields({
        parentId: bagId
      });
      const objectIds = bagObjects.data.map((bagObject) => bagObject.objectId);
      return this.provider.multiGetObjects({
        ids: objectIds,
        // @ts-ignore
        options: {
          showType: true,
          showContent: true,
          showOwner: true
        }
      });
    };
    this.getNftsById = async (params) => {
      const nfts = await this.fetchAndParseObjectsById(params.objectIds);
      const bags = await Promise.all(
        nfts.map(async (nft) => {
          const content = await this.getBagContent(nft.bagId);
          return {
            nftId: nft.id,
            content: parseDomains(content)
          };
        })
      );
      const bagsByNftId = new Map(bags.map((b) => [b.nftId, b]));
      return nfts.map((nft) => {
        const fields = bagsByNftId.get(nft.id);
        return {
          nft,
          fields: fields?.content
        };
      });
    };
    this.provider = provider;
  }
};

// src/stakeHelperFunctions.ts
var import_bignumber = __toESM(require("bignumber.js"));
var calculateStakeShare = (validatorStake, totalStake, decimalPlaces = 2) => {
  const bn = new import_bignumber.default(validatorStake.toString());
  const bd = new import_bignumber.default(totalStake.toString());
  const percentage = bn.div(bd).multipliedBy(100).decimalPlaces(decimalPlaces).toNumber();
  return percentage;
};
function calculateAPY(apy, roundDecimals = 4) {
  return parseFloat((apy * 100).toFixed(roundDecimals));
}

// src/wallet-client.ts
var import_kiosk = require("@mysten/kiosk");
var COIN_TYPE = 784;
var MAX_ACCOUNTS = 20;
var MAX_COINS_PER_REQUEST = 100;
var WalletClient = class {
  constructor(nodeUrl, faucetUrl) {
    this.provider = new JsonRpcProvider(
      new Connection({
        fullnode: nodeUrl,
        faucet: faucetUrl
      })
    );
    this.nftClient = new NftClient(this.provider);
  }
  /**
   * Creates new account with bip44 path and mnemonics,
   * @param path. (e.g. m/44'/784'/0'/0'/0')
   * Detailed description: {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
   * @param mnemonics.
   * @returns Ed25519Keypair
   */
  //Use deriveKeypair() in ed25519-keypair.ts
  //Giving error for different derivation path other than standard 0
  static fromDerivePath(mnemonics, derivationPath) {
    return Ed25519Keypair.deriveKeypair(mnemonics, derivationPath);
  }
  /**
   * returns an Ed25519Keypair object given a private key and
   * address of the account
   *
   * @param privateKey Private key of an account as a Buffer
   * @returns Ed25519Keypair object
   */
  static getAccountFromPrivateKey(privateKey) {
    return Ed25519Keypair.fromSeed(privateKey.slice(0, 32));
  }
  /**
   * Each mnemonic phrase corresponds to a single wallet
   * Wallet can contain multiple accounts
   * An account corresponds to a key pair + address
   *
   * Get all the accounts of a user from their mnemonic phrase
   *
   * @param code The mnemonic phrase (12 word)
   * @returns Wallet object containing all accounts of a user
   */
  async importWallet(code) {
    const accountMetaData = [];
    for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
      const derivationPath = `m/44'/${COIN_TYPE}'/${i}'/0'/0'`;
      const keypair = WalletClient.fromDerivePath(code, derivationPath);
      const address = keypair.getPublicKey().toSuiAddress();
      const publicKey = Buffer.from(keypair.getPublicKey().toBytes()).toString(
        "hex"
      );
      let response;
      try {
        response = await this.provider.getAllBalances({
          owner: address
        });
      } catch (err) {
        response = void 0;
      }
      if (!response) {
        accountMetaData.push({
          derivationPath,
          address: address.startsWith("0x") ? address : "0x" + address,
          publicKey: publicKey.startsWith("0x") ? publicKey : "0x" + publicKey
        });
        break;
      }
      if (Object.keys(response).length !== 0 || i === 0) {
        accountMetaData.push({
          derivationPath,
          address: address.startsWith("0x") ? address : "0x" + address,
          publicKey: publicKey.startsWith("0x") ? publicKey : "0x" + publicKey
        });
      } else {
        break;
      }
    }
    return { code, accounts: accountMetaData };
  }
  /**
   * Creates a new wallet which contains a single account,
   * which is registered on Sui
   *
   * @returns A wallet object
   */
  async createWallet(code) {
    if (!code) {
      code = bip39.generateMnemonic(english.wordlist);
    }
    const accountMetadata = await this.createNewAccount(code, 0);
    return { code, accounts: [accountMetadata] };
  }
  /**
   * Creates a new account in the provided wallet
   *
   * @param code mnemonic phrase of the wallet
   * @returns
   */
  async createNewAccount(code, index) {
    if (index >= MAX_ACCOUNTS) {
      throw new Error("Max no. of accounts reached");
    }
    const derivationPath = `m/44'/${COIN_TYPE}'/${index}'/0'/0'`;
    const keypair = WalletClient.fromDerivePath(code, derivationPath);
    const address = keypair.getPublicKey().toSuiAddress();
    const pubKey = Buffer.from(keypair.getPublicKey().toBytes()).toString(
      "hex"
    );
    return {
      derivationPath,
      address: address.startsWith("0x") ? address : "0x" + address,
      publicKey: pubKey.startsWith("0x") ? pubKey : "0x" + pubKey
    };
  }
  async transferSui(amount, suiAccount, receiverAddress) {
    const keypair = suiAccount;
    const tx = new TransactionBlock();
    const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
    tx.transferObjects([coin], tx.pure(receiverAddress));
    const signer = new RawSigner(keypair, this.provider);
    return await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx
    });
  }
  async getBalance(address, typeArg = SUI_TYPE_ARG) {
    const objects = await this.provider.getBalance({
      owner: address,
      coinType: typeArg
    });
    return objects.totalBalance;
  }
  async airdrop(address) {
    return await this.provider.requestSuiFromFaucet(address);
  }
  async getCoinsWithRequiredBalance(address, amount, cursor, limit) {
    const input = {
      owner: address
    };
    if (cursor)
      input.cursor = cursor;
    if (limit)
      input.limit = limit;
    const coinsNeeded = await this.provider.getCoins(input);
    const coins = coinsNeeded.data.map(
      (coin) => coin.balance && parseInt(coin.balance) >= amount ? coin.coinObjectId : void 0
    ).filter((d) => d);
    return coins;
  }
  async getStake(address) {
    return await this.provider.getStakes({
      owner: address
    });
  }
  async getGasObjectsOwnedByAddress(address) {
    const objects = await this.provider.getOwnedObjects({
      owner: address,
      // @ts-ignore
      options: { showType: true, showContent: true, showOwner: true }
    });
    return objects.data.filter((obj) => Coin.isCoin(obj));
  }
  async getGasObject(address) {
    const gasObj = await this.getGasObjectsOwnedByAddress(address);
    if (gasObj.length === 0) {
      throw new Error("Not Enough Gas");
    }
    const details = gasObj[0].data;
    const gasObjId = details.objectId;
    return gasObjId;
  }
  async getCustomCoins(address) {
    const objects = await this.provider.getAllCoins({
      owner: address
    });
    let coinIds = await Promise.all(
      objects.data.map(async (c) => {
        let coinData;
        try {
          coinData = await this.provider.getCoinMetadata({
            coinType: c.coinType
          });
        } catch (getCoinErr) {
          console.warn("[SDK]", getCoinErr);
        }
        if (!coinData && c.coinType !== SUI_TYPE_ARG)
          return;
        if (c.coinType === SUI_TYPE_ARG) {
          return {
            Id: c.coinObjectId,
            symbol: Coin.getCoinSymbol(c.coinType),
            name: Coin.getCoinSymbol(c.coinType),
            balance: Number(c.balance),
            decimals: 9,
            iconUrl: null,
            coinTypeArg: c.coinType
          };
        }
        return {
          Id: c.coinObjectId,
          symbol: coinData.symbol,
          name: coinData.name,
          balance: Number(c.balance),
          decimals: coinData.decimals,
          iconUrl: coinData.iconUrl,
          coinTypeArg: c.coinType
        };
      })
    );
    coinIds = coinIds.filter((d) => d);
    return coinIds;
  }
  /**
   *
   * @param coinType coin type path
   * @param address address to get the coins for
   * @returns coins array
   */
  // Fetch all coins for an address, this will keep calling the API until all coins are fetched
  async getCoins(coinType, address) {
    let cursor = null;
    const allData = [];
    do {
      const { data, nextCursor } = await this.provider.getCoins(
        {
          owner: address,
          coinType,
          cursor,
          limit: MAX_COINS_PER_REQUEST
        }
      );
      if (!data || !data.length) {
        break;
      }
      allData.push(...data);
      cursor = nextCursor;
    } while (cursor);
    return allData;
  }
  async getCoinBalance(coinType, address) {
    return await this.provider.getBalance({ owner: address, coinType });
  }
  async getAllBalances(address) {
    return await this.provider.getAllBalances({ owner: address });
  }
  async getActiveValidators() {
    return (await this.provider.getLatestSuiSystemState()).activeValidators;
  }
  async getCoinMetadata(coinType) {
    return await this.provider.getCoinMetadata({ coinType });
  }
  /**
   * Dry run a transaction and return the result.
   * @param tx the transaction bytes in Uint8Array
   * @returns The transaction effects
   */
  async dryRunTransaction(tx) {
    return this.provider.dryRunTransactionBlock({ transactionBlock: tx });
  }
  async simulateTransaction(tx) {
    return await this.dryRunTransaction(tx);
  }
  async getTransactions(address, limit = 50, cursor = void 0) {
    const [txnIds, fromTxnIds] = await Promise.all([
      this.provider.queryTransactionBlocks({
        filter: {
          ToAddress: address
        },
        // @ts-ignore
        options: {
          showInput: true,
          showEffects: true,
          showEvents: true
        },
        cursor,
        limit
      }),
      this.provider.queryTransactionBlocks({
        filter: {
          FromAddress: address
        },
        // @ts-ignore
        options: {
          showInput: true,
          showEffects: true,
          showEvents: true
        },
        cursor,
        limit
      })
    ]);
    const inserted = /* @__PURE__ */ new Map();
    const uniqueList = [];
    [...txnIds.data, ...fromTxnIds.data].sort((a, b) => Number(b.timestampMs ?? 0) - Number(a.timestampMs ?? 0)).forEach((txb) => {
      if (inserted.get(txb.digest))
        return;
      uniqueList.push(txb);
      inserted.set(txb.digest, true);
    });
    return uniqueList;
  }
  // Function to get the object metadata of a given objectId
  async getObject(objectId) {
    const normalizedObjId = objectId && normalizeSuiAddress(objectId);
    const objData = await this.provider.getObject({
      id: normalizedObjId,
      options: {
        showType: true,
        showContent: true,
        showOwner: true,
        showDisplay: true,
        showPreviousTransaction: false,
        showStorageRebate: false,
        showBcs: false
      }
    });
    return objData;
  }
  // Function to get the metadata of a an nft with the given object id
  async getNftMetadata(objectID) {
    const resp = await this.getObject(objectID);
    if (!resp)
      return null;
    if (!resp.data)
      return null;
    const display = getObjectDisplay(resp);
    if (!display.data) {
      return null;
    }
    const {
      name,
      description,
      creator,
      image_url,
      link,
      project_url,
      collection_name,
      collection_image
    } = display.data;
    if (!image_url)
      return null;
    return {
      name: name || null,
      collection: collection_name || null,
      collection_image: collection_image || null,
      description: description || null,
      imageUrl: image_url || null,
      link: link || null,
      projectUrl: project_url || null,
      creator: creator || null,
      data: resp.data
    };
  }
  // Function to parge the ipfs url of nft metadata (same as we do with aptos nfts ipfs urls)
  parseIpfsUrl(ipfsUrl) {
    return ipfsUrl.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
  }
  async getKioskNfts(kioskId) {
    const kiosk = await this.provider.getDynamicFields({ parentId: kioskId });
    return kiosk.data.filter((item) => item.name.type === "0x2::kiosk::Item").map((item) => ({ kioskId, nft: item.name.value.id }));
  }
  /**
   * This function retrieves the contents of kiosks owned by a given address on the OriginByte
   * contract.
   * @param {SuiAddress} address - The `address` parameter is a `SuiAddress` type
   * @returns The function `getOriginByteKioskContents` returns the contents of the objects within the
   * kiosks owned by the provided address. The contents are fetched by first finding the kiosk IDs
   * owned by the address, then finding the object IDs within each kiosk, and finally fetching the
   * contents of the objects within each kiosk. The function returns the fetched kiosk content.
   */
  async getOriginByteKioskContents(address) {
    const ORIGINBYTE_KIOSK_MODULE = "0x95a441d389b07437d00dd07e0b6f05f513d7659b13fd7c5d3923c7d9d847199b::ob_kiosk";
    const ORIGINBYTE_KIOSK_OWNER_TOKEN = `${ORIGINBYTE_KIOSK_MODULE}::OwnerToken`;
    const objects = await this.provider.getOwnedObjects({
      owner: address,
      filter: {
        StructType: ORIGINBYTE_KIOSK_OWNER_TOKEN
      },
      options: {
        showType: true,
        showDisplay: true,
        showContent: true,
        showBcs: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true
      }
    });
    const kioskInfo = objects?.data[0]?.data?.content;
    const obKioskIds = objects?.data.map(
      (obj) => obj.data?.content && "fields" in obj.data.content && obj.data.content.fields.kiosk
    ) ?? [];
    if (!obKioskIds.length)
      return [];
    const ownedKiosks = await this.provider.multiGetObjects({
      ids: obKioskIds,
      options: {
        showType: true,
        showDisplay: true,
        showContent: true,
        showBcs: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true
      }
    });
    const kioskObjectIds = await Promise.all(
      ownedKiosks.map(async (kiosk) => {
        if (!kiosk.data?.objectId)
          return [];
        const objects2 = await this.provider.getDynamicFields({
          parentId: kiosk.data.objectId
        });
        return objects2.data.map((obj) => obj.objectId);
      })
    );
    const kioskContent = await this.provider.multiGetObjects({
      ids: kioskObjectIds.flat(),
      options: {
        showType: true,
        showDisplay: true,
        showContent: true,
        showBcs: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true
      }
    });
    return { kioskContent, kioskInfo };
  }
  async getSuiKioskContents(address) {
    const ownedKiosks = await (0, import_kiosk.getOwnedKiosks)(this.provider, address);
    const kioskContents = await Promise.all(
      ownedKiosks.kioskOwnerCaps.map(async ({ objectId, kioskId }) => {
        const data = await (0, import_kiosk.fetchKiosk)(
          // @ts-ignore adding this because type issue with JsonRpcProvider
          this.provider,
          kioskId,
          { limit: 1e3 },
          {}
        );
        return {
          data,
          kioskId,
          kioskOwnerCapId: objectId
        };
      })
    );
    const items = kioskContents.flatMap((k) => k.data.data.items);
    const ids = items.map((item) => item.objectId);
    const kioskContent = await this.provider.multiGetObjects({
      ids,
      // @ts-ignore
      options: {
        showContent: true,
        showDisplay: true,
        showType: true
      }
    });
    kioskContent.forEach((data) => {
      kioskContents.forEach((k) => {
        if (!k.data.data.itemIds.includes(data.data.objectId))
          return;
        data.kioskInfo = {
          kioskId: k.kioskId,
          kioskOwnerCapId: k.kioskOwnerCapId
        };
      });
    });
    return kioskContent;
  }
  /**
   * This function retrieves NFTs owned by a given address and their metadata, as well as kiosk NFTs
   * and their metadata if specified.
   * @param {SuiAddress} address - The address of the owner whose NFTs are being fetched.
   * @param {boolean} [shouldFetchKioskContents] - `shouldFetchKioskContents` is an optional boolean
   * @param {string} after - last fetched key
   * @param {number} limit - limit total count
   * parameter that determines whether or not to fetch kiosk contents for the given `address`. If
   * `shouldFetchKioskContents` is `true`, the function will call
   * `this.getOriginByteKioskContents(address)` to fetch kiosk contents
   * shouldFetchKioskContents will be true only for mainnet
   * @returns The function `getNfts` returns an array of objects containing metadata for NFTs owned by
   * a given address, as well as metadata for NFTs stored in a kiosk.
   * Each object in the array contains the following properties: `nftMeta` (an object
   * containing metadata for the NFT), `objectId` and `type`
   */
  async getNfts(address, shouldFetchKioskContents = true, after = void 0, limit = void 0) {
    const args = {
      owner: address,
      filter: {
        MatchNone: [{ StructType: "0x2::coin::Coin" }]
      },
      options: {
        showType: true,
        showDisplay: true,
        showContent: true,
        showBcs: false,
        showOwner: false,
        showPreviousTransaction: false,
        showStorageRebate: false
      }
    };
    if (after) {
      args.cursor = after;
    }
    if (limit) {
      args.limit = limit;
    }
    let objects = await this.provider.getOwnedObjects(args);
    let obKioskContents;
    if (shouldFetchKioskContents) {
      obKioskContents = await this.getOriginByteKioskContents(address);
    }
    const filteredKioskContents = obKioskContents.kioskContent?.filter(
      ({ data }) => typeof data === "object" && "display" in data && data.display.data
    ).map(({ data }) => data) || [];
    const nfts = objects?.data.filter(
      ({ data }) => typeof data === "object" && "display" in data && data.display.data
    ).map(({ data }) => data);
    const nftsWithMetadataArray = [];
    await Promise.all(
      nfts.map(async (nft) => {
        const nftMeta = await this.getNftMetadata(nft.objectId);
        if (nftMeta) {
          nftsWithMetadataArray.push({
            nftMeta,
            objectId: nft.objectId,
            type: "nft"
          });
        } else {
          const nftDisplayData = nft.display.data;
          nftsWithMetadataArray.push({
            nftMeta: {
              ...nftDisplayData,
              imageUrl: nftDisplayData?.image_url
            },
            objectId: nft.objectId,
            type: "nft"
          });
        }
      })
    );
    filteredKioskContents.forEach((nft) => {
      const nftDisplayData = nft.display?.data;
      if (nftDisplayData) {
        nftsWithMetadataArray.push({
          ...nft,
          nftMeta: {
            ...nftDisplayData,
            imageUrl: nftDisplayData?.image_url
          },
          objectId: nft.objectId,
          type: "kiosk-nft",
          kioskInfo: obKioskContents.kioskInfo,
          nftType: nft.type
        });
      }
    });
    const suiKioskContents = await this.getSuiKioskContents(address);
    suiKioskContents.forEach(({ data, kioskInfo }) => {
      if (!data)
        return;
      const nftDisplayData = data.display?.data;
      if (!nftDisplayData)
        return;
      nftsWithMetadataArray.push({
        ...data,
        nftMeta: {
          ...nftDisplayData,
          imageUrl: nftDisplayData?.image_url
        },
        objectId: data.objectId,
        type: "kiosk-nft",
        kioskInfo,
        nftType: data.type
      });
    });
    return {
      nftsWithMetadataArray,
      cursor: objects.nextCursor,
      hasNextPage: objects.hasNextPage
    };
  }
  // get the current system state (required to get total staked sui value and validators data)
  async getSystemState() {
    const state = await this.provider.getLatestSuiSystemState();
    return state;
  }
  // get total staked sui value
  async getTotalStake() {
    const data = await this.getSystemState();
    if (!data)
      return 0;
    return data.activeValidators.reduce(
      (acc, curr) => acc += BigInt(curr.stakingPoolSuiBalance),
      0n
    );
  }
  async getValidatorsList(sortKey = "stakeShare", sortAscending) {
    const data = await this.getSystemState();
    if (!data)
      return [];
    const totalStake = await this.getTotalStake();
    const { apys } = await this.provider.getValidatorsApy();
    const sortedAsc = data.activeValidators.map((validator) => ({
      name: validator.name,
      address: validator.suiAddress,
      imageUrl: validator.imageUrl,
      apy: calculateAPY(
        apys.filter((d) => d.address === validator.suiAddress)[0]?.apy || 0
      ),
      stakeShare: calculateStakeShare(
        BigInt(validator.stakingPoolSuiBalance),
        BigInt(totalStake)
      ),
      totalStaked: validator.stakingPoolSuiBalance,
      epoch: data.epoch
    })).sort((a, b) => {
      if (sortKey === "name") {
        return a[sortKey].localeCompare(b[sortKey], "en", {
          sensitivity: "base",
          numeric: true
        });
      }
      return a[sortKey] - b[sortKey];
    });
    return sortAscending ? sortedAsc : sortedAsc.reverse();
  }
  async getDelegatedStake(address) {
    const stakedAmount = await this.provider.getStakes({ owner: address });
    return stakedAmount;
  }
  // Get time between current epoch and specified epoch
  // Get the period between the current epoch and next epoch
  async getTimeBeforeEpochNumber(epoch) {
    const data = await this.getSystemState();
    let currentEpoch = data?.epoch || "0";
    let currentEpochStartTime = data?.epochStartTimestampMs || "0";
    let epochPeriod = data?.epochDurationMs || "0";
    currentEpoch = parseInt(currentEpoch);
    currentEpochStartTime = parseInt(currentEpochStartTime);
    epochPeriod = parseInt(epochPeriod);
    const timeBeforeSpecifiedEpoch = epoch > currentEpoch && epoch > 0 && epochPeriod > 0 ? currentEpochStartTime + (epoch - currentEpoch) * epochPeriod : 0;
    return {
      ...data,
      data: timeBeforeSpecifiedEpoch
    };
  }
  static getAccountFromMetaData(mnemonic, metadata) {
    const keypair = Ed25519Keypair.deriveKeypair(
      mnemonic,
      metadata.derivationPath
    );
    return keypair;
  }
  /**
   * returns an Ed25519Keypair at position m/44'/784'/0'/0'/0'
   *
   * @param mnemonic mnemonic phrase of the wallet
   * @returns Ed25519Keypair
   */
  static getAccountFromMnemonic(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    return keypair;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ADD_STAKE_FUN_NAME,
  ADD_STAKE_LOCKED_COIN_FUN_NAME,
  ARGUMENT,
  ARGUMENT_INNER,
  AddressMetrics,
  AllEpochsAddressMetrics,
  AppId,
  Apy,
  AuthorityName,
  AuthorityQuorumSignInfo,
  AuthoritySignature,
  Balance,
  BalanceChange,
  BaseSigner,
  BuilderCallArg,
  CALL_ARG,
  COIN_TYPE_ARG_REGEX,
  COMPRESSED_SIGNATURE,
  CheckPointContentsDigest,
  Checkpoint,
  CheckpointCommitment,
  CheckpointDigest,
  CheckpointPage,
  CheckpointedObjectId,
  Coin,
  CoinBalance,
  CoinMetadataStruct,
  CoinStruct,
  CoinSupply,
  CommitteeInfo,
  Connection,
  Contents,
  ContentsFields,
  ContentsFieldsWithdraw,
  DEFAULT_CLIENT_OPTIONS,
  DEFAULT_SECP256K1_DERIVATION_PATH,
  DEFAULT_SECP256R1_DERIVATION_PATH,
  DelegatedStake,
  Delegation,
  DelegationStakingPool,
  DelegationStakingPoolFields,
  DevInspectResults,
  DisplayFieldsBackwardCompatibleResponse,
  DisplayFieldsResponse,
  DryRunTransactionBlockResponse,
  DynamicFieldInfo,
  DynamicFieldName,
  DynamicFieldPage,
  DynamicFieldType,
  ECMHLiveObjectSetDigest,
  ENUM_KIND,
  Ed25519Keypair,
  Ed25519PublicKey,
  EndOfEpochData,
  EndOfEpochInfo,
  EpochId,
  EpochInfo,
  EpochPage,
  EventId,
  ExecutionDigests,
  ExecutionStatus,
  ExecutionStatusType,
  GasCostSummary,
  GenericAuthoritySignature,
  Genesis,
  GetOwnedObjectsResponse,
  ID_STRUCT_NAME,
  Inputs,
  IntentScope,
  IntentVersion,
  JsonRpcClient,
  JsonRpcProvider,
  Keypair,
  LEGACY_PRIVATE_KEY_SIZE,
  MAX_SIGNER_IN_MULTISIG,
  MIST_PER_SUI,
  MOVE_STDLIB_ADDRESS,
  MULTISIG,
  MULTISIG_PK_MAP,
  MULTISIG_PUBLIC_KEY,
  MakeMoveVecTransaction,
  MergeCoinsTransaction,
  MoveCallMetric,
  MoveCallMetrics,
  MoveCallSuiTransaction,
  MoveCallTransaction,
  MovePackageContent,
  NetworkMetrics,
  NftClient,
  NftParser,
  OBJECT_ARG,
  OBJECT_MODULE_NAME,
  OPTION,
  ObjectCallArg,
  ObjectContentFields,
  ObjectDigest,
  ObjectId,
  ObjectOwner,
  ObjectRead,
  ObjectStatus,
  ObjectTransactionArgument,
  ObjectType,
  OwnedObjectRef,
  PAY_JOIN_COIN_FUNC_NAME,
  PAY_MODULE_NAME,
  PAY_SPLIT_COIN_VEC_FUNC_NAME,
  PRIVATE_KEY_SIZE,
  PROGRAMMABLE_CALL,
  PROGRAMMABLE_CALL_INNER,
  PROGRAMMABLE_TX_BLOCK,
  PUBLIC_KEY,
  PaginatedCoins,
  PaginatedEvents,
  PaginatedObjectsResponse,
  PaginatedTransactionResponse,
  ProgrammableTransaction,
  ProtocolConfig,
  PublicKey,
  PublishTransaction,
  PureCallArg,
  PureTransactionArgument,
  RPCValidationError,
  RawSigner,
  ResolvedNameServiceNames,
  SIGNATURE_FLAG_TO_SCHEME,
  SIGNATURE_SCHEME_TO_FLAG,
  SIGNATURE_SCHEME_TO_SIZE,
  SUI_ADDRESS_LENGTH,
  SUI_CLOCK_OBJECT_ID,
  SUI_DECIMALS,
  SUI_FRAMEWORK_ADDRESS,
  SUI_SYSTEM_ADDRESS,
  SUI_SYSTEM_MODULE_NAME,
  SUI_SYSTEM_STATE_OBJECT_ID,
  SUI_TYPE_ARG,
  Secp256k1Keypair,
  Secp256k1PublicKey,
  Secp256r1Keypair,
  Secp256r1PublicKey,
  SequenceNumber,
  SignerWithProvider,
  SplitCoinsTransaction,
  StakeObject,
  StakeSubsidy,
  StakeSubsidyFields,
  SuiAddress,
  SuiArgument,
  SuiCallArg,
  SuiChangeEpoch,
  SuiConsensusCommitPrologue,
  SuiEvent,
  SuiGasData,
  SuiJsonValue,
  SuiMoveAbilitySet,
  SuiMoveFunctionArgType,
  SuiMoveFunctionArgTypes,
  SuiMoveModuleId,
  SuiMoveNormalizedField,
  SuiMoveNormalizedFunction,
  SuiMoveNormalizedModule,
  SuiMoveNormalizedModules,
  SuiMoveNormalizedStruct,
  SuiMoveNormalizedStructType,
  SuiMoveNormalizedType,
  SuiMoveNormalizedTypeParameterType,
  SuiMoveObject,
  SuiMovePackage,
  SuiMoveStructTypeParameter,
  SuiMoveVisibility,
  SuiObjectChange,
  SuiObjectChangeCreated,
  SuiObjectChangeDeleted,
  SuiObjectChangeMutated,
  SuiObjectChangePublished,
  SuiObjectChangeTransferred,
  SuiObjectChangeWrapped,
  SuiObjectData,
  SuiObjectDataOptions,
  SuiObjectInfo,
  SuiObjectRef,
  SuiObjectResponse,
  SuiObjectResponseError,
  SuiParsedData,
  SuiRawData,
  SuiRawMoveObject,
  SuiRawMovePackage,
  SuiSupplyFields,
  SuiSystemStateSummary,
  SuiSystemStateUtil,
  SuiTransaction,
  SuiTransactionBlock,
  SuiTransactionBlockData,
  SuiTransactionBlockKind,
  SuiTransactionBlockResponse,
  SuiTransactionBlockResponseOptions,
  SuiValidatorSummary,
  TRANSACTION,
  TRANSACTION_INNER,
  TYPE_TAG,
  TransactionArgument,
  TransactionBlock,
  TransactionBlockInput,
  TransactionDigest,
  TransactionEffects,
  TransactionEffectsDigest,
  TransactionEffectsModifiedAtVersions,
  TransactionEventDigest,
  TransactionEvents,
  TransactionType,
  Transactions,
  TransferObjectsTransaction,
  TypeTagSerializer,
  UID_STRUCT_NAME,
  UpgradePolicy,
  UpgradeTransaction,
  VALIDATORS_EVENTS_QUERY,
  VECTOR,
  ValidatorSignature,
  Validators,
  ValidatorsApy,
  WITHDRAW_STAKE_FUN_NAME,
  WalletClient,
  WebsocketClient,
  assert,
  bcs,
  builder,
  bytesEqual,
  combinePartialSigs,
  decodeMultiSig,
  devnetConnection,
  extractMutableReference,
  extractReference,
  extractStructTag,
  formatAddress,
  formatDigest,
  fromB64,
  fromExportedKeypair,
  getChangeEpochTransaction,
  getConsensusCommitPrologueTransaction,
  getCreatedObjects,
  getEventPackage,
  getEventSender,
  getEvents,
  getExecutionStatus,
  getExecutionStatusError,
  getExecutionStatusGasSummary,
  getExecutionStatusType,
  getGasData,
  getIdFromCallArg,
  getMoveObject,
  getMoveObjectType,
  getMovePackageContent,
  getNewlyCreatedCoinRefsAfterSplit,
  getObjectChanges,
  getObjectDeletedResponse,
  getObjectDisplay,
  getObjectFields,
  getObjectId,
  getObjectNotExistsResponse,
  getObjectOwner,
  getObjectPreviousTransactionDigest,
  getObjectReference,
  getObjectType,
  getObjectVersion,
  getProgrammableTransaction,
  getPublishedObjectChanges,
  getPureSerializationType,
  getSharedObjectInitialVersion,
  getSharedObjectInput,
  getSuiObjectData,
  getTimestampFromTransactionResponse,
  getTotalGasUsed,
  getTotalGasUsedUpperBound,
  getTransaction,
  getTransactionDigest,
  getTransactionEffects,
  getTransactionGasBudget,
  getTransactionGasObject,
  getTransactionGasPrice,
  getTransactionKind,
  getTransactionKindName,
  getTransactionSender,
  getTransactionSignature,
  getTransactionType,
  getWebsocketUrl,
  hasPublicTransfer,
  is,
  isImmutableObject,
  isMutableSharedObjectInput,
  isObjectDataFull,
  isPureArg,
  isSharedObject,
  isSharedObjectInput,
  isSuiObjectResponse,
  isTxContext,
  isValidBIP32Path,
  isValidHardenedPath,
  isValidSuiAddress,
  isValidSuiObjectId,
  isValidTransactionDigest,
  localnetConnection,
  mainnetConnection,
  messageWithIntent,
  mnemonicToSeed,
  mnemonicToSeedHex,
  normalizeStructTag,
  normalizeSuiAddress,
  normalizeSuiObjectId,
  parseDomains,
  parseSerializedSignature,
  parseStructTag,
  publicKeyFromSerialized,
  testnetConnection,
  toB64,
  toMultiSigAddress,
  toParsedSignaturePubkeyPair,
  toSerializedSignature,
  toSingleSignaturePubkeyPair,
  verifyMessage
});
//# sourceMappingURL=index.js.map
import { ObjectOwner } from './common';
import { TransactionDigest } from './common';
export declare type SuiObjectRef = {
    /** Base64 string representing the object digest */
    digest: TransactionDigest;
    /** Hex code as string representing the object id */
    objectId: string;
    /** Object version */
    version: number;
};
export declare type SuiObjectInfo = SuiObjectRef & {
    type: string;
    owner: ObjectOwner;
    previousTransaction: TransactionDigest;
};
export declare type ObjectContentFields = Record<string, any>;
export declare type MovePackageContent = Record<string, string>;
export declare type SuiData = {
    dataType: ObjectType;
} & (SuiMoveObject | SuiMovePackage);
export declare type SuiMoveObject = {
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */
    type: string;
    /** Fields and values stored inside the Move object */
    fields: ObjectContentFields;
    has_public_transfer?: boolean;
};
export declare const MIST_PER_SUI: BigInt;
export declare type SuiMovePackage = {
    /** A mapping from module name to disassembled Move bytecode */
    disassembled: MovePackageContent;
};
export declare type SuiMoveFunctionArgTypesResponse = SuiMoveFunctionArgType[];
export declare type SuiMoveFunctionArgType = string | {
    Object: string;
};
export declare type SuiMoveFunctionArgTypes = SuiMoveFunctionArgType[];
export declare type SuiMoveNormalizedModules = Record<string, SuiMoveNormalizedModule>;
export declare type SuiMoveNormalizedModule = {
    file_format_version: number;
    address: string;
    name: string;
    friends: SuiMoveModuleId[];
    structs: Record<string, SuiMoveNormalizedStruct>;
    exposed_functions: Record<string, SuiMoveNormalizedFunction>;
};
export declare type SuiMoveModuleId = {
    address: string;
    name: string;
};
export declare type SuiMoveNormalizedStruct = {
    abilities: SuiMoveAbilitySet;
    type_parameters: SuiMoveStructTypeParameter[];
    fields: SuiMoveNormalizedField[];
};
export declare type SuiMoveStructTypeParameter = {
    constraints: SuiMoveAbilitySet;
    is_phantom: boolean;
};
export declare type SuiMoveNormalizedField = {
    name: string;
    type_: SuiMoveNormalizedType;
};
export declare type SuiMoveNormalizedFunction = {
    visibility: SuiMoveVisibility;
    is_entry: boolean;
    type_parameters: SuiMoveAbilitySet[];
    parameters: SuiMoveNormalizedType[];
    return_: SuiMoveNormalizedType[];
};
export declare type SuiMoveVisibility = 'Private' | 'Public' | 'Friend';
export declare type SuiMoveTypeParameterIndex = number;
export declare type SuiMoveAbilitySet = {
    abilities: string[];
};
export declare type SuiMoveNormalizedType = string | SuiMoveNormalizedTypeParameterType | {
    Reference: SuiMoveNormalizedType;
} | {
    MutableReference: SuiMoveNormalizedType;
} | {
    Vector: SuiMoveNormalizedType;
} | SuiMoveNormalizedStructType;
export declare type SuiMoveNormalizedTypeParameterType = {
    TypeParameter: SuiMoveTypeParameterIndex;
};
export declare type SuiMoveNormalizedStructType = {
    Struct: {
        address: string;
        module: string;
        name: string;
        type_arguments: SuiMoveNormalizedType[];
    };
};
export declare type SuiObject = {
    /** The meat of the object */
    data: SuiData;
    /** The owner of the object */
    owner: ObjectOwner;
    /** The digest of the transaction that created or last mutated this object */
    previousTransaction: TransactionDigest;
    /**
     * The amount of SUI we would rebate if this object gets deleted.
     * This number is re-calculated each time the object is mutated based on
     * the present storage gas price.
     */
    storageRebate: number;
    reference: SuiObjectRef;
};
export declare type ObjectStatus = 'Exists' | 'NotExists' | 'Deleted';
export declare type ObjectType = 'moveObject' | 'package';
export declare type GetOwnedObjectsResponse = SuiObjectInfo[];
export declare type GetObjectDataResponse = {
    status: ObjectStatus;
    details: SuiObject | ObjectId | SuiObjectRef;
};
export declare type ObjectDigest = string;
export declare type ObjectId = string;
export declare type SequenceNumber = number;
export declare type Order = 'ascending' | 'descending';
export declare function getObjectExistsResponse(resp: GetObjectDataResponse): SuiObject | undefined;
export declare function getObjectDeletedResponse(resp: GetObjectDataResponse): SuiObjectRef | undefined;
export declare function getObjectNotExistsResponse(resp: GetObjectDataResponse): ObjectId | undefined;
export declare function getObjectReference(resp: GetObjectDataResponse): SuiObjectRef | undefined;
export declare function getObjectId(data: GetObjectDataResponse | SuiObjectRef): ObjectId;
export declare function getObjectVersion(data: GetObjectDataResponse | SuiObjectRef): number | undefined;
export declare function getObjectType(resp: GetObjectDataResponse): ObjectType | undefined;
export declare function getObjectPreviousTransactionDigest(resp: GetObjectDataResponse): TransactionDigest | undefined;
export declare function getObjectOwner(resp: GetObjectDataResponse): ObjectOwner | undefined;
export declare function getSharedObjectInitialVersion(resp: GetObjectDataResponse): number | undefined;
export declare function isSharedObject(resp: GetObjectDataResponse): boolean;
export declare function isImmutableObject(resp: GetObjectDataResponse): boolean;
export declare function getMoveObjectType(resp: GetObjectDataResponse): string | undefined;
export declare function getObjectFields(resp: GetObjectDataResponse | SuiMoveObject): ObjectContentFields | undefined;
export declare function getMoveObject(data: GetObjectDataResponse | SuiObject): SuiMoveObject | undefined;
export declare function hasPublicTransfer(data: GetObjectDataResponse | SuiObject): boolean;
export declare function getMovePackageContent(data: GetObjectDataResponse | SuiMovePackage): MovePackageContent | undefined;
export declare function extractMutableReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractStructTag(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedStructType | undefined;
//# sourceMappingURL=objects.d.ts.map
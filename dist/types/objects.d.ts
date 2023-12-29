import type { Infer } from 'superstruct';
import { ObjectOwner } from './common';
import type { OwnedObjectRef } from './transactions';
export declare const ObjectType: import("superstruct").Struct<string, null>;
export type ObjectType = Infer<typeof ObjectType>;
export declare const SuiObjectRef: import("superstruct").Struct<{
    objectId: string;
    version: string | number;
    digest: string;
}, {
    /** Base64 string representing the object digest */
    digest: import("superstruct").Struct<string, null>;
    /** Hex code as string representing the object id */
    objectId: import("superstruct").Struct<string, null>;
    /** Object version */
    version: import("superstruct").Struct<string | number, null>;
}>;
export type SuiObjectRef = Infer<typeof SuiObjectRef>;
export declare const SuiGasData: import("superstruct").Struct<{
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
        /** Base64 string representing the object digest */
        digest: import("superstruct").Struct<string, null>;
        /** Hex code as string representing the object id */
        objectId: import("superstruct").Struct<string, null>;
        /** Object version */
        version: import("superstruct").Struct<string | number, null>;
    }>>;
    /** Gas Object's owner */
    owner: import("superstruct").Struct<string, null>;
    price: import("superstruct").Struct<string, null>;
    budget: import("superstruct").Struct<string, null>;
}>;
export type SuiGasData = Infer<typeof SuiGasData>;
export declare const SuiObjectInfo: import("superstruct").Struct<{
    type: string;
    objectId: string;
    version: string | number;
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
    previousTransaction: string;
}, {
    type: import("superstruct").Struct<string, null>;
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    previousTransaction: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string | number, null>;
    digest: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectInfo = Infer<typeof SuiObjectInfo>;
export declare const ObjectContentFields: import("superstruct").Struct<Record<string, any>, null>;
export type ObjectContentFields = Infer<typeof ObjectContentFields>;
export declare const MovePackageContent: import("superstruct").Struct<Record<string, unknown>, null>;
export type MovePackageContent = Infer<typeof MovePackageContent>;
export declare const SuiMoveObject: import("superstruct").Struct<{
    type: string;
    fields: Record<string, any>;
    hasPublicTransfer: boolean;
}, {
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */
    type: import("superstruct").Struct<string, null>;
    /** Fields and values stored inside the Move object */
    fields: import("superstruct").Struct<Record<string, any>, null>;
    hasPublicTransfer: import("superstruct").Struct<boolean, null>;
}>;
export type SuiMoveObject = Infer<typeof SuiMoveObject>;
export declare const SuiMovePackage: import("superstruct").Struct<{
    disassembled: Record<string, unknown>;
}, {
    /** A mapping from module name to disassembled Move bytecode */
    disassembled: import("superstruct").Struct<Record<string, unknown>, null>;
}>;
export type SuiMovePackage = Infer<typeof SuiMovePackage>;
export declare const SuiParsedData: import("superstruct").Struct<{
    type: string;
    fields: Record<string, any>;
    hasPublicTransfer: boolean;
    dataType: "moveObject";
} | {
    disassembled: Record<string, unknown>;
    dataType: "package";
}, null>;
export type SuiParsedData = Infer<typeof SuiParsedData>;
export declare const SuiRawMoveObject: import("superstruct").Struct<{
    type: string;
    version: string;
    hasPublicTransfer: boolean;
    bcsBytes: string;
}, {
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */
    type: import("superstruct").Struct<string, null>;
    hasPublicTransfer: import("superstruct").Struct<boolean, null>;
    version: import("superstruct").Struct<string, null>;
    bcsBytes: import("superstruct").Struct<string, null>;
}>;
export type SuiRawMoveObject = Infer<typeof SuiRawMoveObject>;
export declare const SuiRawMovePackage: import("superstruct").Struct<{
    id: string;
    moduleMap: Record<string, string>;
}, {
    id: import("superstruct").Struct<string, null>;
    /** A mapping from module name to Move bytecode enocded in base64*/
    moduleMap: import("superstruct").Struct<Record<string, string>, null>;
}>;
export type SuiRawMovePackage = Infer<typeof SuiRawMovePackage>;
export declare const SuiRawData: import("superstruct").Struct<{
    type: string;
    version: string;
    hasPublicTransfer: boolean;
    dataType: "moveObject";
    bcsBytes: string;
} | {
    id: string;
    dataType: "package";
    moduleMap: Record<string, string>;
}, null>;
export type SuiRawData = Infer<typeof SuiRawData>;
export declare const SUI_DECIMALS = 9;
export declare const MIST_PER_SUI: bigint;
/** @deprecated Use `string` instead. */
export declare const ObjectDigest: import("superstruct").Struct<string, null>;
/** @deprecated Use `string` instead. */
export type ObjectDigest = Infer<typeof ObjectDigest>;
export declare const SuiObjectResponseError: import("superstruct").Struct<{
    version: string;
    digest: string;
    error: string;
    code: string;
    object_id: string;
    parent_object_id: string;
}, {
    code: import("superstruct").Struct<string, null>;
    error: import("superstruct").Struct<string, null>;
    object_id: import("superstruct").Struct<string, null>;
    parent_object_id: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
}>;
export type SuiObjectResponseError = Infer<typeof SuiObjectResponseError>;
export declare const DisplayFieldsResponse: import("superstruct").Struct<{
    data: Record<string, string>;
    error: {
        version: string;
        digest: string;
        error: string;
        code: string;
        object_id: string;
        parent_object_id: string;
    };
}, {
    data: import("superstruct").Struct<Record<string, string>, null>;
    error: import("superstruct").Struct<{
        version: string;
        digest: string;
        error: string;
        code: string;
        object_id: string;
        parent_object_id: string;
    }, {
        code: import("superstruct").Struct<string, null>;
        error: import("superstruct").Struct<string, null>;
        object_id: import("superstruct").Struct<string, null>;
        parent_object_id: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string, null>;
        digest: import("superstruct").Struct<string, null>;
    }>;
}>;
export type DisplayFieldsResponse = Infer<typeof DisplayFieldsResponse>;
export declare const DisplayFieldsBackwardCompatibleResponse: import("superstruct").Struct<Record<string, string> | {
    data: Record<string, string>;
    error: {
        version: string;
        digest: string;
        error: string;
        code: string;
        object_id: string;
        parent_object_id: string;
    };
}, null>;
export type DisplayFieldsBackwardCompatibleResponse = Infer<typeof DisplayFieldsBackwardCompatibleResponse>;
export declare const SuiObjectData: import("superstruct").Struct<{
    type: string;
    bcs: {
        type: string;
        version: string;
        hasPublicTransfer: boolean;
        dataType: "moveObject";
        bcsBytes: string;
    } | {
        id: string;
        dataType: "package";
        moduleMap: Record<string, string>;
    };
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
    storageRebate: string;
    previousTransaction: string;
    content: {
        type: string;
        fields: Record<string, any>;
        hasPublicTransfer: boolean;
        dataType: "moveObject";
    } | {
        disassembled: Record<string, unknown>;
        dataType: "package";
    };
    display: Record<string, string> | {
        data: Record<string, string>;
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    };
}, {
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
    /**
     * Type of the object, default to be undefined unless SuiObjectDataOptions.showType is set to true
     */
    type: import("superstruct").Struct<string, null>;
    /**
     * Move object content or package content, default to be undefined unless SuiObjectDataOptions.showContent is set to true
     */
    content: import("superstruct").Struct<{
        type: string;
        fields: Record<string, any>;
        hasPublicTransfer: boolean;
        dataType: "moveObject";
    } | {
        disassembled: Record<string, unknown>;
        dataType: "package";
    }, null>;
    /**
     * Move object content or package content in BCS bytes, default to be undefined unless SuiObjectDataOptions.showBcs is set to true
     */
    bcs: import("superstruct").Struct<{
        type: string;
        version: string;
        hasPublicTransfer: boolean;
        dataType: "moveObject";
        bcsBytes: string;
    } | {
        id: string;
        dataType: "package";
        moduleMap: Record<string, string>;
    }, null>;
    /**
     * The owner of this object. Default to be undefined unless SuiObjectDataOptions.showOwner is set to true
     */
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    /**
     * The digest of the transaction that created or last mutated this object.
     * Default to be undefined unless SuiObjectDataOptions.showPreviousTransaction is set to true
     */
    previousTransaction: import("superstruct").Struct<string, null>;
    /**
     * The amount of SUI we would rebate if this object gets deleted.
     * This number is re-calculated each time the object is mutated based on
     * the present storage gas price.
     * Default to be undefined unless SuiObjectDataOptions.showStorageRebate is set to true
     */
    storageRebate: import("superstruct").Struct<string, null>;
    /**
     * Display metadata for this object, default to be undefined unless SuiObjectDataOptions.showDisplay is set to true
     * This can also be None if the struct type does not have Display defined
     * See more details in https://forums.sui.io/t/nft-object-display-proposal/4872
     */
    display: import("superstruct").Struct<Record<string, string> | {
        data: Record<string, string>;
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }, null>;
}>;
export type SuiObjectData = Infer<typeof SuiObjectData>;
/**
 * Config for fetching object data
 */
export declare const SuiObjectDataOptions: import("superstruct").Struct<{
    showType: boolean;
    showContent: boolean;
    showBcs: boolean;
    showOwner: boolean;
    showPreviousTransaction: boolean;
    showStorageRebate: boolean;
    showDisplay: boolean;
}, {
    showType: import("superstruct").Struct<boolean, null>;
    showContent: import("superstruct").Struct<boolean, null>;
    showBcs: import("superstruct").Struct<boolean, null>;
    showOwner: import("superstruct").Struct<boolean, null>;
    showPreviousTransaction: import("superstruct").Struct<boolean, null>;
    showStorageRebate: import("superstruct").Struct<boolean, null>;
    showDisplay: import("superstruct").Struct<boolean, null>;
}>;
export type SuiObjectDataOptions = Infer<typeof SuiObjectDataOptions>;
export declare const ObjectStatus: import("superstruct").Struct<"Exists" | "notExists" | "Deleted", null>;
export type ObjectStatus = Infer<typeof ObjectStatus>;
export declare const GetOwnedObjectsResponse: import("superstruct").Struct<{
    type: string;
    objectId: string;
    version: string | number;
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
    previousTransaction: string;
}[], import("superstruct").Struct<{
    type: string;
    objectId: string;
    version: string | number;
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
    previousTransaction: string;
}, {
    type: import("superstruct").Struct<string, null>;
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: string;
        };
    } | "Immutable", null>;
    previousTransaction: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<string | number, null>;
    digest: import("superstruct").Struct<string, null>;
}>>;
export type GetOwnedObjectsResponse = Infer<typeof GetOwnedObjectsResponse>;
export declare const SuiObjectResponse: import("superstruct").Struct<{
    data: {
        type: string;
        bcs: {
            type: string;
            version: string;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
            bcsBytes: string;
        } | {
            id: string;
            dataType: "package";
            moduleMap: Record<string, string>;
        };
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
        storageRebate: string;
        previousTransaction: string;
        content: {
            type: string;
            fields: Record<string, any>;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
        } | {
            disassembled: Record<string, unknown>;
            dataType: "package";
        };
        display: Record<string, string> | {
            data: Record<string, string>;
            error: {
                version: string;
                digest: string;
                error: string;
                code: string;
                object_id: string;
                parent_object_id: string;
            };
        };
    };
    error: {
        version: string;
        digest: string;
        error: string;
        code: string;
        object_id: string;
        parent_object_id: string;
    };
}, {
    data: import("superstruct").Struct<{
        type: string;
        bcs: {
            type: string;
            version: string;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
            bcsBytes: string;
        } | {
            id: string;
            dataType: "package";
            moduleMap: Record<string, string>;
        };
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
        storageRebate: string;
        previousTransaction: string;
        content: {
            type: string;
            fields: Record<string, any>;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
        } | {
            disassembled: Record<string, unknown>;
            dataType: "package";
        };
        display: Record<string, string> | {
            data: Record<string, string>;
            error: {
                version: string;
                digest: string;
                error: string;
                code: string;
                object_id: string;
                parent_object_id: string;
            };
        };
    }, {
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string, null>;
        digest: import("superstruct").Struct<string, null>;
        /**
         * Type of the object, default to be undefined unless SuiObjectDataOptions.showType is set to true
         */
        type: import("superstruct").Struct<string, null>;
        /**
         * Move object content or package content, default to be undefined unless SuiObjectDataOptions.showContent is set to true
         */
        content: import("superstruct").Struct<{
            type: string;
            fields: Record<string, any>;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
        } | {
            disassembled: Record<string, unknown>;
            dataType: "package";
        }, null>;
        /**
         * Move object content or package content in BCS bytes, default to be undefined unless SuiObjectDataOptions.showBcs is set to true
         */
        bcs: import("superstruct").Struct<{
            type: string;
            version: string;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
            bcsBytes: string;
        } | {
            id: string;
            dataType: "package";
            moduleMap: Record<string, string>;
        }, null>;
        /**
         * The owner of this object. Default to be undefined unless SuiObjectDataOptions.showOwner is set to true
         */
        owner: import("superstruct").Struct<{
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: string;
            };
        } | "Immutable", null>;
        /**
         * The digest of the transaction that created or last mutated this object.
         * Default to be undefined unless SuiObjectDataOptions.showPreviousTransaction is set to true
         */
        previousTransaction: import("superstruct").Struct<string, null>;
        /**
         * The amount of SUI we would rebate if this object gets deleted.
         * This number is re-calculated each time the object is mutated based on
         * the present storage gas price.
         * Default to be undefined unless SuiObjectDataOptions.showStorageRebate is set to true
         */
        storageRebate: import("superstruct").Struct<string, null>;
        /**
         * Display metadata for this object, default to be undefined unless SuiObjectDataOptions.showDisplay is set to true
         * This can also be None if the struct type does not have Display defined
         * See more details in https://forums.sui.io/t/nft-object-display-proposal/4872
         */
        display: import("superstruct").Struct<Record<string, string> | {
            data: Record<string, string>;
            error: {
                version: string;
                digest: string;
                error: string;
                code: string;
                object_id: string;
                parent_object_id: string;
            };
        }, null>;
    }>;
    error: import("superstruct").Struct<{
        version: string;
        digest: string;
        error: string;
        code: string;
        object_id: string;
        parent_object_id: string;
    }, {
        code: import("superstruct").Struct<string, null>;
        error: import("superstruct").Struct<string, null>;
        object_id: import("superstruct").Struct<string, null>;
        parent_object_id: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<string, null>;
        digest: import("superstruct").Struct<string, null>;
    }>;
}>;
export type SuiObjectResponse = Infer<typeof SuiObjectResponse>;
export type Order = 'ascending' | 'descending';
export declare function getSuiObjectData(resp: SuiObjectResponse): SuiObjectData | null | undefined;
export declare function getObjectDeletedResponse(resp: SuiObjectResponse): SuiObjectRef | undefined;
export declare function getObjectNotExistsResponse(resp: SuiObjectResponse): string | undefined;
export declare function getObjectReference(resp: SuiObjectResponse | OwnedObjectRef): SuiObjectRef | undefined;
export declare function getObjectId(data: SuiObjectResponse | SuiObjectRef | OwnedObjectRef): string;
export declare function getObjectVersion(data: SuiObjectResponse | SuiObjectRef | SuiObjectData): string | number | undefined;
export declare function isSuiObjectResponse(resp: SuiObjectResponse | SuiObjectData): resp is SuiObjectResponse;
/**
 * Deriving the object type from the object response
 * @returns 'package' if the object is a package, move object type(e.g., 0x2::coin::Coin<0x2::sui::SUI>)
 * if the object is a move object
 */
export declare function getObjectType(resp: SuiObjectResponse | SuiObjectData): ObjectType | null | undefined;
export declare function getObjectPreviousTransactionDigest(resp: SuiObjectResponse): string | null | undefined;
export declare function getObjectOwner(resp: SuiObjectResponse | ObjectOwner): ObjectOwner | null | undefined;
export declare function getObjectDisplay(resp: SuiObjectResponse): DisplayFieldsResponse;
export declare function getSharedObjectInitialVersion(resp: SuiObjectResponse | ObjectOwner): string | null | undefined;
export declare function isSharedObject(resp: SuiObjectResponse | ObjectOwner): boolean;
export declare function isImmutableObject(resp: SuiObjectResponse | ObjectOwner): boolean;
export declare function getMoveObjectType(resp: SuiObjectResponse): string | undefined;
export declare function getObjectFields(resp: SuiObjectResponse | SuiMoveObject | SuiObjectData): ObjectContentFields | undefined;
export interface SuiObjectDataWithContent extends SuiObjectData {
    content: SuiParsedData;
}
export declare function getMoveObject(data: SuiObjectResponse | SuiObjectData): SuiMoveObject | undefined;
export declare function hasPublicTransfer(data: SuiObjectResponse | SuiObjectData): boolean;
export declare function getMovePackageContent(data: SuiObjectResponse | SuiMovePackage): MovePackageContent | undefined;
export declare const CheckpointedObjectId: import("superstruct").Struct<{
    objectId: string;
    atCheckpoint: number;
}, {
    objectId: import("superstruct").Struct<string, null>;
    atCheckpoint: import("superstruct").Struct<number, null>;
}>;
export type CheckpointedObjectId = Infer<typeof CheckpointedObjectId>;
export declare const PaginatedObjectsResponse: import("superstruct").Struct<{
    data: {
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
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
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }[];
    nextCursor: string;
    hasNextPage: boolean;
}, {
    data: import("superstruct").Struct<{
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
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
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }[], import("superstruct").Struct<{
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
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
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }, {
        data: import("superstruct").Struct<{
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
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
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        }, {
            objectId: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string, null>;
            digest: import("superstruct").Struct<string, null>;
            /**
             * Type of the object, default to be undefined unless SuiObjectDataOptions.showType is set to true
             */
            type: import("superstruct").Struct<string, null>;
            /**
             * Move object content or package content, default to be undefined unless SuiObjectDataOptions.showContent is set to true
             */
            content: import("superstruct").Struct<{
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            }, null>;
            /**
             * Move object content or package content in BCS bytes, default to be undefined unless SuiObjectDataOptions.showBcs is set to true
             */
            bcs: import("superstruct").Struct<{
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            }, null>;
            /**
             * The owner of this object. Default to be undefined unless SuiObjectDataOptions.showOwner is set to true
             */
            owner: import("superstruct").Struct<{
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable", null>;
            /**
             * The digest of the transaction that created or last mutated this object.
             * Default to be undefined unless SuiObjectDataOptions.showPreviousTransaction is set to true
             */
            previousTransaction: import("superstruct").Struct<string, null>;
            /**
             * The amount of SUI we would rebate if this object gets deleted.
             * This number is re-calculated each time the object is mutated based on
             * the present storage gas price.
             * Default to be undefined unless SuiObjectDataOptions.showStorageRebate is set to true
             */
            storageRebate: import("superstruct").Struct<string, null>;
            /**
             * Display metadata for this object, default to be undefined unless SuiObjectDataOptions.showDisplay is set to true
             * This can also be None if the struct type does not have Display defined
             * See more details in https://forums.sui.io/t/nft-object-display-proposal/4872
             */
            display: import("superstruct").Struct<Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            }, null>;
        }>;
        error: import("superstruct").Struct<{
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        }, {
            code: import("superstruct").Struct<string, null>;
            error: import("superstruct").Struct<string, null>;
            object_id: import("superstruct").Struct<string, null>;
            parent_object_id: import("superstruct").Struct<string, null>;
            version: import("superstruct").Struct<string, null>;
            digest: import("superstruct").Struct<string, null>;
        }>;
    }>>;
    nextCursor: import("superstruct").Struct<string, null>;
    hasNextPage: import("superstruct").Struct<boolean, null>;
}>;
export type PaginatedObjectsResponse = Infer<typeof PaginatedObjectsResponse>;
export type SuiObjectDataFilter = {
    MatchAll: SuiObjectDataFilter[];
} | {
    MatchAny: SuiObjectDataFilter[];
} | {
    MatchNone: SuiObjectDataFilter[];
} | {
    Package: string;
} | {
    MoveModule: {
        package: string;
        module: string;
    };
} | {
    StructType: string;
} | {
    AddressOwner: string;
} | {
    ObjectOwner: string;
} | {
    ObjectId: string;
} | {
    ObjectIds: string[];
} | {
    Version: string;
};
export type SuiObjectResponseQuery = {
    filter?: SuiObjectDataFilter;
    options?: SuiObjectDataOptions;
};
export declare const ObjectRead: import("superstruct").Struct<{
    status: "VersionFound";
    details: {
        type: string;
        bcs: {
            type: string;
            version: string;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
            bcsBytes: string;
        } | {
            id: string;
            dataType: "package";
            moduleMap: Record<string, string>;
        };
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
        storageRebate: string;
        previousTransaction: string;
        content: {
            type: string;
            fields: Record<string, any>;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
        } | {
            disassembled: Record<string, unknown>;
            dataType: "package";
        };
        display: Record<string, string> | {
            data: Record<string, string>;
            error: {
                version: string;
                digest: string;
                error: string;
                code: string;
                object_id: string;
                parent_object_id: string;
            };
        };
    };
} | {
    status: "ObjectNotExists";
    details: string;
} | {
    status: "ObjectDeleted";
    details: {
        objectId: string;
        version: string | number;
        digest: string;
    };
} | {
    status: "VersionNotFound";
    details: [string, number];
} | {
    status: "VersionTooHigh";
    details: {
        object_id: string;
        asked_version: number;
        latest_version: number;
    };
}, null>;
export type ObjectRead = Infer<typeof ObjectRead>;
//# sourceMappingURL=objects.d.ts.map
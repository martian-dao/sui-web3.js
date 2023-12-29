import type { Infer } from 'superstruct';
export declare const DynamicFieldType: import("superstruct").Struct<"DynamicField" | "DynamicObject", null>;
export type DynamicFieldType = Infer<typeof DynamicFieldType>;
export declare const DynamicFieldName: import("superstruct").Struct<{
    type: string;
    value?: any;
}, {
    type: import("superstruct").Struct<string, null>;
    value: import("superstruct").Struct<any, null>;
}>;
export type DynamicFieldName = Infer<typeof DynamicFieldName>;
export declare const DynamicFieldInfo: import("superstruct").Struct<{
    type: "DynamicField" | "DynamicObject";
    name: {
        type: string;
        value?: any;
    };
    objectType: string;
    objectId: string;
    version: number;
    digest: string;
    bcsName: string;
}, {
    name: import("superstruct").Struct<{
        type: string;
        value?: any;
    }, {
        type: import("superstruct").Struct<string, null>;
        value: import("superstruct").Struct<any, null>;
    }>;
    bcsName: import("superstruct").Struct<string, null>;
    type: import("superstruct").Struct<"DynamicField" | "DynamicObject", null>;
    objectType: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<number, null>;
    digest: import("superstruct").Struct<string, null>;
}>;
export type DynamicFieldInfo = Infer<typeof DynamicFieldInfo>;
export declare const DynamicFieldPage: import("superstruct").Struct<{
    data: {
        type: "DynamicField" | "DynamicObject";
        name: {
            type: string;
            value?: any;
        };
        objectType: string;
        objectId: string;
        version: number;
        digest: string;
        bcsName: string;
    }[];
    nextCursor: string;
    hasNextPage: boolean;
}, {
    data: import("superstruct").Struct<{
        type: "DynamicField" | "DynamicObject";
        name: {
            type: string;
            value?: any;
        };
        objectType: string;
        objectId: string;
        version: number;
        digest: string;
        bcsName: string;
    }[], import("superstruct").Struct<{
        type: "DynamicField" | "DynamicObject";
        name: {
            type: string;
            value?: any;
        };
        objectType: string;
        objectId: string;
        version: number;
        digest: string;
        bcsName: string;
    }, {
        name: import("superstruct").Struct<{
            type: string;
            value?: any;
        }, {
            type: import("superstruct").Struct<string, null>;
            value: import("superstruct").Struct<any, null>;
        }>;
        bcsName: import("superstruct").Struct<string, null>;
        type: import("superstruct").Struct<"DynamicField" | "DynamicObject", null>;
        objectType: import("superstruct").Struct<string, null>;
        objectId: import("superstruct").Struct<string, null>;
        version: import("superstruct").Struct<number, null>;
        digest: import("superstruct").Struct<string, null>;
    }>>;
    nextCursor: import("superstruct").Struct<string, null>;
    hasNextPage: import("superstruct").Struct<boolean, null>;
}>;
export type DynamicFieldPage = Infer<typeof DynamicFieldPage>;
//# sourceMappingURL=dynamic_fields.d.ts.map
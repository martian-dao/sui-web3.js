import type { TypeTag } from '../bcs/index';
export declare class TypeTagSerializer {
    static parseFromStr(str: string, normalizeAddress?: boolean): TypeTag;
    static parseStructTypeArgs(str: string, normalizeAddress?: boolean): TypeTag[];
    static tagToString(tag: TypeTag): string;
}
//# sourceMappingURL=type-tag-serializer.d.ts.map
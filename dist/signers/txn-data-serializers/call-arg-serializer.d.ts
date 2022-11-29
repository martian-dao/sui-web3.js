import { Provider } from '../../providers/provider';
import { ObjectId, SuiJsonValue } from '../../types';
import { CallArg, MoveCallTx, ObjectArg } from '../../types/sui-bcs';
import { MoveCallTransaction } from './txn-data-serializer';
export declare class CallArgSerializer {
    private provider;
    constructor(provider: Provider);
    extractObjectIds(txn: MoveCallTransaction): Promise<ObjectId[]>;
    serializeMoveCallArguments(txn: MoveCallTransaction): Promise<CallArg[]>;
    /**
     * Deserialize Call Args used in `Transaction` into `SuiJsonValue` arguments
     */
    deserializeCallArgs(txn: MoveCallTx): Promise<SuiJsonValue[]>;
    private extractNormalizedFunctionParams;
    newObjectArg(objectId: string): Promise<ObjectArg>;
    private newCallArg;
    private extractIdFromObjectArg;
    private deserializeCallArg;
    /**
     *
     * @param argVal used to do additional data validation to make sure the argVal
     * matches the normalized Move types. If `argVal === undefined`, the data validation
     * will be skipped. This is useful in the case where `normalizedType` is a vector<T>
     * and `argVal` is an empty array, the data validation for the inner types will be skipped.
     */
    private getPureSerializationType;
    private checkArgVal;
    private isTxContext;
}
//# sourceMappingURL=call-arg-serializer.d.ts.map
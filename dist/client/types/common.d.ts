import type { CallArg } from '../../bcs/index';
export type SuiJsonValue = boolean | number | string | CallArg | Array<SuiJsonValue>;
export type Order = 'ascending' | 'descending';
export type Unsubscribe = () => Promise<boolean>;
//# sourceMappingURL=common.d.ts.map
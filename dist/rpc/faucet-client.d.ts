import { FaucetResponse, SuiAddress } from '../types';
import { HttpHeaders } from './client';
export declare class FaucetRateLimitError extends Error {
}
export declare function requestSuiFromFaucet(endpoint: string, recipient: SuiAddress, httpHeaders?: HttpHeaders): Promise<FaucetResponse>;
//# sourceMappingURL=faucet-client.d.ts.map
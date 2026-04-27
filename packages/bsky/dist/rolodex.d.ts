import { Code, ConnectError, Interceptor, PromiseClient } from '@connectrpc/connect';
import { ConnectTransportOptions } from '@connectrpc/connect-node';
import { RolodexService } from './proto/rolodex_connect';
export type RolodexClient = PromiseClient<typeof RolodexService>;
export declare const createRolodexClient: (opts: ConnectTransportOptions) => RolodexClient;
export { Code };
export declare const isRolodexError: (err: unknown, code?: Code) => err is ConnectError;
export declare const authWithApiKey: (apiKey: string) => Interceptor;
//# sourceMappingURL=rolodex.d.ts.map
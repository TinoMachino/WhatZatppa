import { AppContext } from '../../../..';
import { RolodexClient } from '../../../../rolodex';
export declare function assertRolodexOrThrowUnimplemented(ctx: AppContext): asserts ctx is AppContext & {
    rolodexClient: RolodexClient;
};
/**
 * Helper to call Rolodex client methods and translate RPC errors to XRPC
 * errors.
 *
 * These `reason` values need to stay in sync with the Rolodex service
 */
export declare function callRolodexClient<T>(caller: T): Promise<T>;
//# sourceMappingURL=util.d.ts.map
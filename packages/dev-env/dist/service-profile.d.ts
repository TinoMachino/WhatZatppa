import { AtpAgent } from '@atproto/api';
import { DidString } from '@atproto/lex';
import { TestPds } from './pds';
export type ServiceUserDetails = {
    email: string;
    handle: string;
    password: string;
};
export type ServiceMigrationOptions = {
    services?: Record<string, unknown>;
    verificationMethods?: Record<string, unknown>;
};
export declare class ServiceProfile {
    protected pds: TestPds;
    /** @note assumes the session is already authenticated */
    protected agent: AtpAgent;
    protected userDetails: ServiceUserDetails;
    protected constructor(pds: TestPds, 
    /** @note assumes the session is already authenticated */
    agent: AtpAgent, userDetails: ServiceUserDetails);
    get did(): DidString;
    migrateTo(newPds: TestPds, options?: ServiceMigrationOptions): Promise<void>;
}
//# sourceMappingURL=service-profile.d.ts.map
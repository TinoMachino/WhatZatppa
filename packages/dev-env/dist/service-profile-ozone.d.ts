import { AtpAgent } from '@atproto/api';
import { Secp256k1Keypair } from '@atproto/crypto';
import { TestPds } from './pds';
import { ServiceMigrationOptions, ServiceProfile, ServiceUserDetails } from './service-profile';
export declare class OzoneServiceProfile extends ServiceProfile {
    readonly ozoneUrl: string;
    readonly key: Secp256k1Keypair;
    static create(pds: TestPds, ozoneUrl: string, userDetails?: {
        email: string;
        handle: string;
        password: string;
    }): Promise<OzoneServiceProfile>;
    protected constructor(pds: TestPds, agent: AtpAgent, userDetails: ServiceUserDetails, ozoneUrl: string, key: Secp256k1Keypair);
    createAppPasswordForVerification(): Promise<string>;
    migrateTo(pds: TestPds, options?: ServiceMigrationOptions): Promise<void>;
    createRecords(): Promise<void>;
}
//# sourceMappingURL=service-profile-ozone.d.ts.map
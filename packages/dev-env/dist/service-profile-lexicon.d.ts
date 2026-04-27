import { TestPds } from './pds';
import { ServiceProfile } from './service-profile';
export declare class LexiconAuthorityProfile extends ServiceProfile {
    static create(pds: TestPds, userDetails?: {
        email: string;
        handle: string;
        password: string;
    }): Promise<LexiconAuthorityProfile>;
    createRecords(): Promise<void>;
}
//# sourceMappingURL=service-profile-lexicon.d.ts.map
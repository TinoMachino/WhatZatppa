import { Generated } from 'kysely';
export interface Actor {
    did: string;
    handle: string | null;
    indexedAt: string;
    takedownRef: string | null;
    upstreamStatus: string | null;
    trustedVerifier: Generated<boolean>;
    ageAssuranceStatus: string | null;
    ageAssuranceLastInitiatedAt: string | null;
    ageAssuranceAccess: string | null;
    ageAssuranceCountryCode: string | null;
    ageAssuranceRegionCode: string | null;
}
export declare const tableName = "actor";
export type PartialDB = {
    [tableName]: Actor;
};
//# sourceMappingURL=actor.d.ts.map
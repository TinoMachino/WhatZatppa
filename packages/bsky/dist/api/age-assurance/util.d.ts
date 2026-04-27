import { app } from '../../lexicons/index.js';
/**
 * Compute age assurance access based on verified minimum age. Thrown errors
 * are internal errors, so handle them accordingly.
 */
export declare function computeAgeAssuranceAccessOrThrow(config: app.bsky.ageassurance.defs.Config, { countryCode, regionCode, verifiedMinimumAge, }: {
    countryCode: string;
    regionCode?: string;
    verifiedMinimumAge: number;
}): {
    access: import("@atproto/api/dist/client/types/app/bsky/ageassurance/defs.js").Access;
    reason: import("@atproto/api").AgeAssuranceRuleID;
};
export declare function createLocationString(countryCode: string, regionCode?: string): string;
//# sourceMappingURL=util.d.ts.map
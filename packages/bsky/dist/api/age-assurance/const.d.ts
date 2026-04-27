import { app } from '../../lexicons/index.js';
/**
 * Age assurance configuration defining rules for various regions.
 *
 * NOTE: These rules are matched in order, and the first matching rule
 * determines the access level granted.
 *
 * NOTE: all regions MUST have a default rule as the last rule.
 */
export declare const AGE_ASSURANCE_CONFIG: {
    $type: "app.bsky.ageassurance.defs#config";
    regions: app.bsky.ageassurance.defs.$defs.ConfigRegion[];
};
//# sourceMappingURL=const.d.ts.map
import { type UserContext as GrowthBookUserContext } from '@growthbook/growthbook';
import { NormalizedUserContext, TrackingMetadata, UserContext } from './types';
export declare function normalizeUserContext(userContext: UserContext): NormalizedUserContext;
/**
 * Merge the base user context with any overrides provided at check time. This
 * allows us to set a base context for the request, but also override or add
 * properties for specific gate checks if needed.
 */
export declare function mergeUserContexts(base: NormalizedUserContext, overrides?: UserContext): NormalizedUserContext;
/**
 * Extract the `UserContext` from GrowthBook's own `UserContext`, which we
 * passed into `isOn` as `attributes`.
 */
export declare function extractUserContextFromGrowthbookUserContext(userContext: GrowthBookUserContext): NormalizedUserContext;
/**
 * Convert the `UserContext` into the `TrackingMetadata` format that we
 * use for our analytics events. This ensures that we have the same user
 * properties as we do for events from our client app.
 */
export declare function parsedUserContextToTrackingMetadata(userContext: NormalizedUserContext): TrackingMetadata;
//# sourceMappingURL=utils.d.ts.map
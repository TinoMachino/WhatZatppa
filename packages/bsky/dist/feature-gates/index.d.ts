import type express from 'express';
import { Gate } from './gates';
import { ScopedFeatureGatesClient, UserContext } from './types';
export { type ScopedFeatureGatesClient } from './types';
export declare class FeatureGatesClient {
    private config;
    private ready;
    private client;
    private refreshInterval;
    private metrics;
    /**
     * Easy access to the `Gate` enum for consumers of this class, so they don't
     * need to import it separately.
     */
    Gate: typeof Gate;
    constructor(config: {
        growthBookApiHost?: string;
        growthBookClientKey?: string;
        eventProxyTrackingEndpoint?: string;
    });
    start(): Promise<void>;
    destroy(): void;
    /**
     * Evaluate multiple feature gates for a given user, returning a map of gate
     * ID to boolean result.
     */
    private checkGates;
    scope(scopedUserContext: UserContext): ScopedFeatureGatesClient;
    /**
     * Parse properties available in XRPC handlers to `UserContext`. The returned
     * proeprties are used as GrowthBook `attributes` as well as the metadata
     * payload for our analytics events. This ensures that the same user properties
     * are used for both feature gate targeting and analytics.
     */
    parseUserContextFromHandler({ viewer, req, }: {
        /**
         * The user's DID
         */
        viewer: string | null;
        /**
         * The express request object, used to extract analytics headers for the user context
         */
        req: express.Request;
    }): UserContext;
}
//# sourceMappingURL=index.d.ts.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGatesClient = void 0;
const growthbook_1 = require("@growthbook/growthbook");
const logger_1 = require("../logger");
const gates_1 = require("./gates");
const metrics_1 = require("./metrics");
const utils_1 = require("./utils");
/**
 * We want this to be sufficiently high that we don't time out under
 * normal conditions, but not so high that it takes too long to boot
 * the server.
 */
const FETCH_TIMEOUT = 3e3; // 3 seconds
/**
 * StatSig used to default to every 10s, but I think 1m is fine
 */
const REFETCH_INTERVAL = 60e3; // 1 minute
/**
 * These need to match what the client sends
 */
const ANALYTICS_HEADER_DEVICE_ID = 'X-Bsky-Device-Id';
const ANALYTICS_HEADER_SESSION_ID = 'X-Bsky-Session-Id';
class FeatureGatesClient {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "refreshInterval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "metrics", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Easy access to the `Gate` enum for consumers of this class, so they don't
         * need to import it separately.
         */
        Object.defineProperty(this, "Gate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: gates_1.Gate
        });
        this.metrics = new metrics_1.MetricsClient({
            trackingEndpoint: config.eventProxyTrackingEndpoint,
        });
    }
    async start() {
        if (!this.config.growthBookApiHost || !this.config.growthBookClientKey) {
            logger_1.featureGatesLogger.info({}, 'feature gates not configured, skipping initialization');
            return;
        }
        try {
            this.client = new growthbook_1.GrowthBookClient({
                apiHost: this.config.growthBookApiHost,
                clientKey: this.config.growthBookClientKey,
                onFeatureUsage: (feature, result, userContext) => {
                    if (gates_1.IGNORE_METRICS_FOR_GATES.has(feature))
                        return;
                    this.metrics.track('feature:viewed', {
                        featureId: feature,
                        featureResultValue: result.value,
                        experimentId: result.experiment?.key,
                        variationId: result.experimentResult?.key,
                    }, (0, utils_1.parsedUserContextToTrackingMetadata)((0, utils_1.extractUserContextFromGrowthbookUserContext)(userContext)));
                },
                trackingCallback: (experiment, result, userContext) => {
                    /**
                     * Experiments are only fired in a feature gate has an Experiment
                     * attached in Growthbook. Howerver, we want to be extra sure that a
                     * misconfigured experiment doesn't result in a huge increase in events, so we
                     * protect this here.
                     */
                    if (result.featureId &&
                        gates_1.IGNORE_METRICS_FOR_GATES.has(result.featureId))
                        return;
                    this.metrics.track('experiment:viewed', {
                        experimentId: experiment.key,
                        variationId: result.key,
                    }, (0, utils_1.parsedUserContextToTrackingMetadata)((0, utils_1.extractUserContextFromGrowthbookUserContext)(userContext)));
                },
            });
            const { source, error } = await this.client.init({
                timeout: FETCH_TIMEOUT,
            });
            /**
             * This does not necessarily mean that the client completely failed,
             * since it could just be that the request timed out. It may succeed
             * after the timeout, or later during refreshes.
             *
             * @see https://docs.growthbook.io/lib/node#error-handling
             */
            if (error) {
                logger_1.featureGatesLogger.error({ err: error, source }, 'Client failed to initialize normally');
            }
            /**
             * Set up periodic refresh of feature definitions
             *
             * @see https://docs.growthbook.io/lib/node#refreshing-features
             */
            this.refreshInterval = setInterval(async () => {
                try {
                    await this.client?.refreshFeatures({
                        timeout: FETCH_TIMEOUT,
                    });
                }
                catch (err) {
                    logger_1.featureGatesLogger.error({ err }, 'Failed to refresh features');
                }
            }, REFETCH_INTERVAL);
            /* Ready or not, here we come */
            this.ready = true;
        }
        catch (err) {
            logger_1.featureGatesLogger.error({ err }, 'Client initialization failed');
        }
    }
    destroy() {
        if (this.ready) {
            this.ready = false;
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }
        }
        this.metrics.stop();
    }
    /**
     * Evaluate multiple feature gates for a given user, returning a map of gate
     * ID to boolean result.
     */
    checkGates(gates, userContext) {
        const gb = this.client;
        const attributes = (0, utils_1.normalizeUserContext)(userContext);
        if (!gb || !this.ready)
            return new Map(gates.map((g) => [g, false]));
        return new Map(gates.map((g) => [g, gb.isOn(g, { attributes })]));
    }
    scope(scopedUserContext) {
        /*
         * Create initial deviceId and sessionId values for the scoped client, to
         * be used throughout this request lifecycle.
         */
        const base = (0, utils_1.normalizeUserContext)(scopedUserContext);
        return {
            Gate: this.Gate,
            checkGates: (gates, userContextOverrides) => {
                const userContext = (0, utils_1.mergeUserContexts)(base, userContextOverrides);
                return this.checkGates(gates, userContext);
            },
            checkGate: (gate, userContextOverrides) => {
                const userContext = (0, utils_1.mergeUserContexts)(base, userContextOverrides);
                return this.checkGates([gate], userContext).get(gate) || false;
            },
        };
    }
    /**
     * Parse properties available in XRPC handlers to `UserContext`. The returned
     * proeprties are used as GrowthBook `attributes` as well as the metadata
     * payload for our analytics events. This ensures that the same user properties
     * are used for both feature gate targeting and analytics.
     */
    parseUserContextFromHandler({ viewer, req, }) {
        const deviceId = req.header(ANALYTICS_HEADER_DEVICE_ID);
        const sessionId = req.header(ANALYTICS_HEADER_SESSION_ID);
        return (0, utils_1.normalizeUserContext)({
            did: viewer,
            deviceId,
            sessionId,
        });
    }
}
exports.FeatureGatesClient = FeatureGatesClient;
//# sourceMappingURL=index.js.map
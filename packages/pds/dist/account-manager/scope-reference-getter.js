"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeReferenceGetter = void 0;
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const oauth_provider_1 = require("@atproto/oauth-provider");
const xrpc_server_1 = require("@atproto/xrpc-server");
const simple_store_1 = require("@atproto-labs/simple-store");
const simple_store_memory_1 = require("@atproto-labs/simple-store-memory");
const simple_store_redis_1 = require("@atproto-labs/simple-store-redis");
const lexicons_js_1 = require("../lexicons.js");
const logger_js_1 = require("../logger.js");
const PREFIX = 'ref:';
const isScopeReference = (scope) => scope != null && scope.startsWith(PREFIX) && !scope.includes(' ');
const identity = (value) => value;
class ScopeReferenceGetter extends simple_store_1.CachedGetter {
    constructor(entryway, redis) {
        super(async (ref, options) => {
            return (0, common_1.retry)(async () => this.fetchDereferencedScope(ref, options), {
                maxRetries: 3,
                getWaitMs: (n) => (0, common_1.backoffMs)(n, 250, 2000),
                retryable: (err) => !options?.signal?.aborted &&
                    err instanceof lex_1.XrpcError &&
                    err.shouldRetry(),
            });
        }, redis
            ? new simple_store_redis_1.SimpleStoreRedis(redis, {
                // tradeoff between wasted memory usage (by no longer used scopes)
                // and amount of requests to entryway:
                ttl: 1 * common_1.DAY,
                keyPrefix: `auth-scope-${PREFIX}`,
                encode: identity,
                decode: identity,
            })
            : new simple_store_memory_1.SimpleStoreMemory({ max: 1000 }));
        Object.defineProperty(this, "entryway", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: entryway
        });
    }
    async fetchDereferencedScope(ref, opts) {
        logger_js_1.oauthLogger.info({ ref }, 'Fetching scope reference');
        try {
            const { scope } = await this.entryway.call(lexicons_js_1.com.atproto.temp.dereferenceScope, { scope: ref }, {
                signal: opts?.signal,
                headers: opts?.noCache ? { 'Cache-Control': 'no-cache' } : undefined,
            });
            logger_js_1.oauthLogger.info({ ref, scope }, 'Successfully fetched scope reference');
            // @NOTE the part after `PREFIX` (in the input scope) is the CID of the
            // scope string returned by entryway. Since there is a trust
            // relationship with the entryway, we don't need to verify or enforce
            // that here.
            return scope;
        }
        catch (err) {
            logger_js_1.oauthLogger.error({ err, ref }, 'Failed to fetch scope reference');
            throw err;
        }
    }
    async dereference(scope) {
        logger_js_1.oauthLogger.debug({ scope }, 'Dereferencing scope');
        if (!isScopeReference(scope))
            return scope;
        return this.get(scope).catch(handleDereferenceError);
    }
}
exports.ScopeReferenceGetter = ScopeReferenceGetter;
function handleDereferenceError(cause) {
    if (cause instanceof lex_1.XrpcError && cause.error === 'InvalidScopeReference') {
        // The scope reference cannot be found on the server.
        // Consider the session as invalid, allowing entryway to
        // re-build the scope as the user re-authenticates. This
        // should never happen though.
        throw oauth_provider_1.InvalidTokenError.from(cause, 'DPoP');
    }
    throw new xrpc_server_1.UpstreamFailureError('Failed to fetch token permissions', undefined, { cause });
}
//# sourceMappingURL=scope-reference-getter.js.map
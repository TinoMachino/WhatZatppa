"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitExceededError = exports.RouteRateLimiter = exports.CombinedRateLimiter = exports.WrappedRateLimiter = exports.formatLimiterStatus = exports.RedisRateLimiter = exports.MemoryRateLimiter = exports.RateLimiter = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const errors_1 = require("./errors");
const logger_1 = require("./logger");
class RateLimiter {
    constructor(limiter, options) {
        Object.defineProperty(this, "limiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: limiter
        });
        Object.defineProperty(this, "failClosed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "calcKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "calcPoints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.limiter = limiter;
        this.failClosed = options.failClosed ?? false;
        this.calcKey = options.calcKey;
        this.calcPoints = options.calcPoints;
    }
    async consume(ctx, opts) {
        const calcKey = opts?.calcKey ?? this.calcKey;
        const key = calcKey(ctx);
        if (key === null) {
            return null;
        }
        const calcPoints = opts?.calcPoints ?? this.calcPoints;
        const points = calcPoints(ctx);
        if (points < 1) {
            return null;
        }
        try {
            const res = await this.limiter.consume(key, points);
            return (0, exports.formatLimiterStatus)(this.limiter, res);
        }
        catch (err) {
            // yes this library rejects with a res not an error
            if (err instanceof rate_limiter_flexible_1.RateLimiterRes) {
                const status = (0, exports.formatLimiterStatus)(this.limiter, err);
                return new RateLimitExceededError(status);
            }
            else {
                if (this.failClosed) {
                    throw err;
                }
                logger_1.logger.error({
                    err,
                    keyPrefix: this.limiter.keyPrefix,
                    points: this.limiter.points,
                    duration: this.limiter.duration,
                }, 'rate limiter failed to consume points');
                return null;
            }
        }
    }
    async reset(ctx, opts) {
        const key = opts?.calcKey ? opts.calcKey(ctx) : this.calcKey(ctx);
        if (key === null) {
            return;
        }
        try {
            await this.limiter.delete(key);
        }
        catch (cause) {
            throw new Error(`rate limiter failed to reset key: ${key}`, { cause });
        }
    }
}
exports.RateLimiter = RateLimiter;
class MemoryRateLimiter extends RateLimiter {
    constructor(options) {
        const limiter = new rate_limiter_flexible_1.RateLimiterMemory({
            keyPrefix: options.keyPrefix,
            duration: Math.floor(options.durationMs / 1000),
            points: options.points,
        });
        super(limiter, options);
    }
}
exports.MemoryRateLimiter = MemoryRateLimiter;
class RedisRateLimiter extends RateLimiter {
    constructor(storeClient, options) {
        const limiter = new rate_limiter_flexible_1.RateLimiterRedis({
            storeClient,
            keyPrefix: options.keyPrefix,
            duration: Math.floor(options.durationMs / 1000),
            points: options.points,
        });
        super(limiter, options);
    }
}
exports.RedisRateLimiter = RedisRateLimiter;
const formatLimiterStatus = (limiter, res) => {
    return {
        limit: limiter.points,
        duration: limiter.duration,
        remainingPoints: res.remainingPoints,
        msBeforeNext: res.msBeforeNext,
        consumedPoints: res.consumedPoints,
        isFirstInDuration: res.isFirstInDuration,
    };
};
exports.formatLimiterStatus = formatLimiterStatus;
/**
 * Wraps a {@link RateLimiterI} instance with custom key and points calculation
 * functions.
 */
class WrappedRateLimiter {
    constructor(rateLimiter, options) {
        Object.defineProperty(this, "rateLimiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: rateLimiter
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    async consume(ctx, opts) {
        return this.rateLimiter.consume(ctx, {
            calcKey: opts?.calcKey ?? this.options.calcKey,
            calcPoints: opts?.calcPoints ?? this.options.calcPoints,
        });
    }
    async reset(ctx, opts) {
        return this.rateLimiter.reset(ctx, {
            calcKey: opts?.calcKey ?? this.options.calcKey,
        });
    }
    static from(rateLimiter, { calcKey, calcPoints } = {}) {
        if (!calcKey && !calcPoints)
            return rateLimiter;
        return new WrappedRateLimiter(rateLimiter, { calcKey, calcPoints });
    }
}
exports.WrappedRateLimiter = WrappedRateLimiter;
/**
 * Combines multiple rate limiters into one.
 *
 * The combined rate limiter will return the tightest (most restrictive) of all
 * the provided rate limiters.
 */
class CombinedRateLimiter {
    constructor(rateLimiters) {
        Object.defineProperty(this, "rateLimiters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: rateLimiters
        });
    }
    async consume(ctx, opts) {
        const promises = [];
        for (const rl of this.rateLimiters)
            promises.push(rl.consume(ctx, opts));
        return Promise.all(promises).then(getTightestLimit);
    }
    async reset(ctx, opts) {
        const promises = [];
        for (const rl of this.rateLimiters)
            promises.push(rl.reset(ctx, opts));
        await Promise.all(promises);
    }
    static from(rateLimiters) {
        if (rateLimiters.length === 0)
            return undefined;
        if (rateLimiters.length === 1)
            return rateLimiters[0];
        return new CombinedRateLimiter(rateLimiters);
    }
}
exports.CombinedRateLimiter = CombinedRateLimiter;
const getTightestLimit = (resps) => {
    let lowest = null;
    for (const resp of resps) {
        if (resp === null)
            continue;
        if (resp instanceof RateLimitExceededError)
            return resp;
        if (lowest === null || resp.remainingPoints < lowest.remainingPoints) {
            lowest = resp;
        }
    }
    return lowest;
};
/**
 * Wraps a {@link RateLimiterI} interface into a class that will apply the
 * appropriate headers to the response if a limit is exceeded.
 */
class RouteRateLimiter {
    constructor(rateLimiter, options = {}) {
        Object.defineProperty(this, "rateLimiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: rateLimiter
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    async handle(ctx) {
        const { bypass } = this.options;
        if (bypass && bypass(ctx)) {
            return null;
        }
        const result = await this.consume(ctx);
        if (result instanceof RateLimitExceededError) {
            setStatusHeaders(ctx, result.status);
            throw result;
        }
        else if (result != null) {
            setStatusHeaders(ctx, result);
        }
        return result;
    }
    async consume(...args) {
        return this.rateLimiter.consume(...args);
    }
    async reset(...args) {
        return this.rateLimiter.reset(...args);
    }
    static from(rateLimiters, { bypass } = {}) {
        const rateLimiter = CombinedRateLimiter.from(rateLimiters);
        if (!rateLimiter)
            return undefined;
        return new RouteRateLimiter(rateLimiter, { bypass });
    }
}
exports.RouteRateLimiter = RouteRateLimiter;
function setStatusHeaders(ctx, status) {
    const resetAt = Math.floor((Date.now() + status.msBeforeNext) / 1e3);
    ctx.res?.setHeader('RateLimit-Limit', status.limit);
    ctx.res?.setHeader('RateLimit-Reset', resetAt);
    ctx.res?.setHeader('RateLimit-Remaining', status.remainingPoints);
    ctx.res?.setHeader('RateLimit-Policy', `${status.limit};w=${status.duration}`);
}
class RateLimitExceededError extends errors_1.XRPCError {
    constructor(status, errorMessage, customErrorName, options) {
        super(errors_1.ResponseType.RateLimitExceeded, errorMessage, customErrorName, options);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: status
        });
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof errors_1.XRPCError &&
            instance.type === errors_1.ResponseType.RateLimitExceeded);
    }
}
exports.RateLimitExceededError = RateLimitExceededError;
//# sourceMappingURL=rate-limiter.js.map
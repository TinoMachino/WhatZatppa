import { IncomingMessage, ServerResponse } from 'node:http';
import { RateLimiterAbstract, RateLimiterRes } from 'rate-limiter-flexible';
import { XRPCError } from './errors';
export interface RateLimiterContext {
    req: IncomingMessage;
    res?: ServerResponse;
}
export type CalcKeyFn<C extends RateLimiterContext = RateLimiterContext> = (ctx: C) => string | null;
export type CalcPointsFn<C extends RateLimiterContext = RateLimiterContext> = (ctx: C) => number;
export interface RateLimiterI<C extends RateLimiterContext = RateLimiterContext> {
    consume: RateLimiterConsume<C>;
    reset: RateLimiterReset<C>;
}
export type RateLimiterConsumeOptions<C extends RateLimiterContext = RateLimiterContext> = {
    calcKey?: CalcKeyFn<C>;
    calcPoints?: CalcPointsFn<C>;
};
export type RateLimiterConsume<C extends RateLimiterContext = RateLimiterContext> = (ctx: C, opts?: RateLimiterConsumeOptions<C>) => Promise<RateLimiterStatus | RateLimitExceededError | null>;
export type RateLimiterStatus = {
    limit: number;
    duration: number;
    remainingPoints: number;
    msBeforeNext: number;
    consumedPoints: number;
    isFirstInDuration: boolean;
};
export type RateLimiterResetOptions<C extends RateLimiterContext = RateLimiterContext> = {
    calcKey?: CalcKeyFn<C>;
};
export type RateLimiterReset<C extends RateLimiterContext = RateLimiterContext> = (ctx: C, opts?: RateLimiterResetOptions<C>) => Promise<void>;
export type RateLimiterOptions<C extends RateLimiterContext = RateLimiterContext> = {
    keyPrefix: string;
    durationMs: number;
    points: number;
    calcKey: CalcKeyFn<C>;
    calcPoints: CalcPointsFn<C>;
    failClosed?: boolean;
};
export declare class RateLimiter<C extends RateLimiterContext = RateLimiterContext> implements RateLimiterI<C> {
    limiter: RateLimiterAbstract;
    private readonly failClosed?;
    private readonly calcKey;
    private readonly calcPoints;
    constructor(limiter: RateLimiterAbstract, options: RateLimiterOptions<C>);
    consume(ctx: C, opts?: RateLimiterConsumeOptions<C>): Promise<RateLimiterStatus | RateLimitExceededError | null>;
    reset(ctx: C, opts?: RateLimiterResetOptions<C>): Promise<void>;
}
export declare class MemoryRateLimiter<C extends RateLimiterContext = RateLimiterContext> extends RateLimiter<C> {
    constructor(options: RateLimiterOptions<C>);
}
export declare class RedisRateLimiter<C extends RateLimiterContext = RateLimiterContext> extends RateLimiter<C> {
    constructor(storeClient: unknown, options: RateLimiterOptions<C>);
}
export declare const formatLimiterStatus: (limiter: RateLimiterAbstract, res: RateLimiterRes) => RateLimiterStatus;
export type WrappedRateLimiterOptions<C extends RateLimiterContext = RateLimiterContext> = {
    calcKey?: CalcKeyFn<C>;
    calcPoints?: CalcPointsFn<C>;
};
/**
 * Wraps a {@link RateLimiterI} instance with custom key and points calculation
 * functions.
 */
export declare class WrappedRateLimiter<C extends RateLimiterContext = RateLimiterContext> implements RateLimiterI<C> {
    private readonly rateLimiter;
    private readonly options;
    private constructor();
    consume(ctx: C, opts?: RateLimiterConsumeOptions<C>): Promise<RateLimiterStatus | RateLimitExceededError | null>;
    reset(ctx: C, opts?: RateLimiterResetOptions<C>): Promise<void>;
    static from<C extends RateLimiterContext = RateLimiterContext>(rateLimiter: RateLimiterI<C>, { calcKey, calcPoints }?: WrappedRateLimiterOptions<C>): RateLimiterI<C>;
}
/**
 * Combines multiple rate limiters into one.
 *
 * The combined rate limiter will return the tightest (most restrictive) of all
 * the provided rate limiters.
 */
export declare class CombinedRateLimiter<C extends RateLimiterContext = RateLimiterContext> implements RateLimiterI<C> {
    private readonly rateLimiters;
    private constructor();
    consume(ctx: C, opts?: RateLimiterConsumeOptions<C>): Promise<RateLimiterStatus | RateLimitExceededError | null>;
    reset(ctx: C, opts?: RateLimiterResetOptions<C>): Promise<void>;
    static from<C extends RateLimiterContext = RateLimiterContext>(rateLimiters: readonly RateLimiterI<C>[]): RateLimiterI<C> | undefined;
}
export type RouteRateLimiterOptions<C extends RateLimiterContext = RateLimiterContext> = {
    bypass?: (ctx: C) => boolean;
};
/**
 * Wraps a {@link RateLimiterI} interface into a class that will apply the
 * appropriate headers to the response if a limit is exceeded.
 */
export declare class RouteRateLimiter<C extends RateLimiterContext = RateLimiterContext> implements RateLimiterI<C> {
    private readonly rateLimiter;
    private readonly options;
    constructor(rateLimiter: RateLimiterI<C>, options?: Readonly<RouteRateLimiterOptions<C>>);
    handle(ctx: C): Promise<RateLimiterStatus | null>;
    consume(...args: Parameters<RateLimiterConsume<C>>): Promise<RateLimiterStatus | RateLimitExceededError | null>;
    reset(...args: Parameters<RateLimiterReset<C>>): Promise<void>;
    static from<C extends RateLimiterContext = RateLimiterContext>(rateLimiters: readonly RateLimiterI<C>[], { bypass }?: RouteRateLimiterOptions<C>): RouteRateLimiter<C> | undefined;
}
export declare class RateLimitExceededError extends XRPCError {
    status: RateLimiterStatus;
    constructor(status: RateLimiterStatus, errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
//# sourceMappingURL=rate-limiter.d.ts.map
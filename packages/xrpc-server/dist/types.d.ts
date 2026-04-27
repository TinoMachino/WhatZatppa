import { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';
import { NextFunction, Request, Response } from 'express';
import { JsonToLexOptions } from '@atproto/lex-json';
import { l } from '@atproto/lex-schema';
import { ErrorResult, XRPCError } from './errors';
import { CalcKeyFn, CalcPointsFn, RateLimiterI } from './rate-limiter';
import { Overwrite } from './util';
export type Awaitable<T> = T | Promise<T>;
export type CatchallHandler = (req: Request, res: Response, next: NextFunction) => unknown;
export type Options = {
    validateResponse?: boolean;
    catchall?: CatchallHandler;
    payload?: RouteOptions;
    rateLimits?: {
        creator: RateLimiterCreator<HandlerContext>;
        global?: ServerRateLimitDescription<HandlerContext>[];
        shared?: ServerRateLimitDescription<HandlerContext>[];
        bypass?: (ctx: HandlerContext) => boolean;
    };
    /**
     * By default, errors are converted to {@link XRPCError} using
     * {@link XRPCError.fromError} before being rendered. If method handlers throw
     * error objects that are not properly rendered in the HTTP response, this
     * function can be used to properly convert them to {@link XRPCError}. The
     * provided function will typically fallback to the default error conversion
     * (`return XRPCError.fromError(err)`) if the error is not recognized.
     *
     * @note This function should not throw errors.
     */
    errorParser?: (err: unknown) => XRPCError;
};
export type UndecodedParams = Request['query'];
export type Primitive = string | number | boolean;
export type Params = {
    [P in string]?: undefined | Primitive | Primitive[];
};
export type HandlerInput = {
    encoding: string;
    body: unknown;
};
export type AuthResult = {
    credentials: unknown;
    artifacts?: unknown;
};
export declare const headersSchema: l.DictSchema<l.StringSchema<{}>, l.StringSchema<{}>>;
export type Headers = l.Infer<typeof headersSchema>;
export declare const handlerSuccess: l.ObjectSchema<{
    readonly encoding: l.StringSchema<{}>;
    readonly body: l.UnknownSchema;
    readonly headers: l.OptionalSchema<l.DictSchema<l.StringSchema<{}>, l.StringSchema<{}>>>;
}>;
export type HandlerSuccess = l.Infer<typeof handlerSuccess>;
export declare const handlerPipeThroughBuffer: l.ObjectSchema<{
    readonly encoding: l.StringSchema<{}>;
    readonly buffer: l.CustomSchema<Buffer<ArrayBufferLike>>;
    readonly headers: l.OptionalSchema<l.DictSchema<l.StringSchema<{}>, l.StringSchema<{}>>>;
}>;
export type HandlerPipeThroughBuffer = l.Infer<typeof handlerPipeThroughBuffer>;
export declare const handlerPipeThroughStream: l.ObjectSchema<{
    readonly encoding: l.StringSchema<{}>;
    readonly stream: l.CustomSchema<Readable>;
    readonly headers: l.OptionalSchema<l.DictSchema<l.StringSchema<{}>, l.StringSchema<{}>>>;
}>;
export type HandlerPipeThroughStream = l.Infer<typeof handlerPipeThroughStream>;
export declare const handlerPipeThrough: l.UnionSchema<readonly [l.ObjectSchema<{
    readonly encoding: l.StringSchema<{}>;
    readonly buffer: l.CustomSchema<Buffer<ArrayBufferLike>>;
    readonly headers: l.OptionalSchema<l.DictSchema<l.StringSchema<{}>, l.StringSchema<{}>>>;
}>, l.ObjectSchema<{
    readonly encoding: l.StringSchema<{}>;
    readonly stream: l.CustomSchema<Readable>;
    readonly headers: l.OptionalSchema<l.DictSchema<l.StringSchema<{}>, l.StringSchema<{}>>>;
}>]>;
export type HandlerPipeThrough = l.Infer<typeof handlerPipeThrough>;
export type Auth = void | AuthResult;
export type Input = void | HandlerInput;
export type Output = void | HandlerSuccess | HandlerPipeThrough | ErrorResult;
export type AuthVerifier<C, A extends AuthResult = AuthResult> = ((ctx: C) => Awaitable<A | ErrorResult>) | ((ctx: C) => Awaitable<A>);
export type MethodAuthContext<P extends Params = Params> = {
    params: P;
    req: Request;
    res: Response;
};
export type MethodAuthVerifier<A extends AuthResult = AuthResult, P extends Params = Params> = AuthVerifier<MethodAuthContext<P>, A>;
export type HandlerContext<A extends Auth = Auth, P extends Params = Params, I extends Input = Input> = MethodAuthContext<P> & {
    auth: A;
    input: I;
    resetRouteRateLimits: () => Promise<void>;
};
export type MethodHandler<A extends Auth = Auth, P extends Params = Params, I extends Input = Input, O extends Output = Output> = (ctx: HandlerContext<A, P, I>) => Awaitable<O | HandlerPipeThrough>;
export type RateLimiterCreator<T extends HandlerContext = HandlerContext> = <C extends T = T>(opts: {
    keyPrefix: string;
    durationMs: number;
    points: number;
    calcKey: CalcKeyFn<C>;
    calcPoints: CalcPointsFn<C>;
    failClosed?: boolean;
}) => RateLimiterI<C>;
export type ServerRateLimitDescription<C extends HandlerContext = HandlerContext> = {
    name: string;
    durationMs: number;
    points: number;
    calcKey?: CalcKeyFn<C>;
    calcPoints?: CalcPointsFn<C>;
    failClosed?: boolean;
};
export type SharedRateLimitOpts<C extends HandlerContext = HandlerContext> = {
    name: string;
    calcKey?: CalcKeyFn<C>;
    calcPoints?: CalcPointsFn<C>;
};
export type RouteRateLimitOpts<C extends HandlerContext = HandlerContext> = {
    durationMs: number;
    points: number;
    calcKey?: CalcKeyFn<C>;
    calcPoints?: CalcPointsFn<C>;
};
export type RateLimitOpts<C extends HandlerContext = HandlerContext> = SharedRateLimitOpts<C> | RouteRateLimitOpts<C>;
export declare function isSharedRateLimitOpts<C extends HandlerContext = HandlerContext>(opts: RateLimitOpts<C>): opts is SharedRateLimitOpts<C>;
export type RouteOptions = {
    blobLimit?: number;
    jsonLimit?: number;
    textLimit?: number;
    paramsParseLoose?: boolean;
    /** @default { strict: false } */
    inputProcessingOptions?: Overwrite<JsonToLexOptions & l.ParseOptions, {
        /** @default false */
        strict?: boolean;
    }>;
};
export type MethodAuth<A extends Auth = Auth, P extends Params = Params> = MethodAuthVerifier<Extract<A, AuthResult>, P>;
export type MethodRateLimit<A extends Auth = Auth, P extends Params = Params, I extends Input = Input> = RateLimitOpts<HandlerContext<A, P, I>> | RateLimitOpts<HandlerContext<A, P, I>>[];
export type MethodConfig<A extends Auth = Auth, P extends Params = Params, I extends Input = Input, O extends Output = Output> = {
    handler: MethodHandler<A, P, I, O>;
    auth?: MethodAuth<A, P>;
    opts?: RouteOptions;
    rateLimit?: MethodRateLimit<A, P, I>;
};
export type MethodConfigWithAuth<A extends Auth = Auth, P extends Params = Params, I extends Input = Input, O extends Output = Output> = {
    handler: MethodHandler<A, P, I, O>;
    auth: MethodAuth<A, P>;
    opts?: RouteOptions;
    rateLimit?: MethodRateLimit<A, P, I>;
};
export type MethodConfigOrHandler<A extends Auth = Auth, P extends Params = Params, I extends Input = Input, O extends Output = Output> = MethodHandler<A, P, I, O> | MethodConfig<A, P, I, O>;
export type StreamAuthContext<P extends Params = Params> = {
    params: P;
    req: IncomingMessage;
};
export type LexMethodParams<M extends l.Procedure | l.Query | l.Subscription> = l.InferMethodParams<M>;
export type LexMethodInput<M extends l.Procedure | l.Query> = l.InferMethodInput<M, Readable>;
export type LexMethodOutput<M extends l.Procedure | l.Query> = l.InferMethodOutput<M, Readable> extends undefined ? l.InferMethodOutput<M, Uint8Array | Readable> | void : l.InferMethodOutput<M, Uint8Array | Readable>;
export type LexMethodMessage<M extends l.Subscription> = l.InferMethodMessage<M>;
export type LexMethodHandler<M extends l.Procedure | l.Query, A extends Auth = Auth> = MethodHandler<A, LexMethodParams<M>, LexMethodInput<M>, LexMethodOutput<M>>;
export type LexMethodConfig<M extends l.Procedure | l.Query, A extends Auth = Auth> = MethodConfig<A, LexMethodParams<M>, LexMethodInput<M>, LexMethodOutput<M>>;
export type LexSubscriptionHandler<M extends l.Subscription, A extends Auth = Auth> = StreamHandler<Extract<A, AuthResult>, LexMethodParams<M>, LexMethodMessage<M>>;
export type LexSubscriptionConfig<M extends l.Subscription, A extends Auth = Auth> = StreamConfig<A, LexMethodParams<M>, LexMethodMessage<M>>;
export type StreamAuthVerifier<A extends AuthResult = AuthResult, P extends Params = Params> = AuthVerifier<StreamAuthContext<P>, A>;
export type StreamContext<A extends Auth = Auth, P extends Params = Params> = StreamAuthContext<P> & {
    auth: A;
    signal: AbortSignal;
};
export type StreamHandler<A extends Auth = Auth, P extends Params = Params, O = unknown> = (ctx: StreamContext<A, P>) => AsyncIterable<O>;
export type StreamConfig<A extends Auth = Auth, P extends Params = Params, O = unknown> = {
    auth?: StreamAuthVerifier<Extract<A, AuthResult>, P>;
    handler: StreamHandler<A, P, O>;
};
export type StreamConfigOrHandler<A extends Auth = Auth, P extends Params = Params, O = unknown> = StreamHandler<A, P, O> | StreamConfig<A, P, O>;
export declare function isHandlerSuccess(output: Output): output is HandlerSuccess;
export declare function isHandlerPipeThroughBuffer(output: Output): output is HandlerPipeThroughBuffer;
export declare function isHandlerPipeThroughStream(output: Output): output is HandlerPipeThroughStream;
//# sourceMappingURL=types.d.ts.map
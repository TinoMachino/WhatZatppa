import { IncomingMessage } from 'node:http';
import { Express, RequestHandler, Router } from 'express';
import { l } from '@atproto/lex-schema';
import { LexXrpcProcedure, LexXrpcQuery, LexXrpcSubscription, LexiconDoc, Lexicons } from '@atproto/lexicon';
import { RateLimiterI, RouteRateLimiter } from './rate-limiter';
import { XrpcStreamServer } from './stream';
import { Auth, AuthResult, CatchallHandler, HandlerContext, Input, LexMethodConfig, LexMethodHandler, LexSubscriptionConfig, LexSubscriptionHandler, MethodAuthContext, MethodConfig, MethodConfigOrHandler, MethodHandler, Options, Output, Params, StreamAuthContext, StreamConfig, StreamConfigOrHandler, StreamContext } from './types';
import { AuthVerifierInternal, InputVerifierInternal, OutputVerifierInternal, ParamsVerifierInternal } from './util';
export declare function createServer(lexicons?: LexiconDoc[], options?: Options): Server;
export declare class Server {
    router: Express;
    routes: Router;
    subscriptions: Map<string, XrpcStreamServer>;
    lex: Lexicons;
    options: Options;
    globalRateLimiter?: RouteRateLimiter<HandlerContext>;
    sharedRateLimiters?: Map<string, RateLimiterI<HandlerContext>>;
    constructor(lexicons?: LexiconDoc[], opts?: Options);
    listen(port: number, callback?: () => void): import("http").Server<typeof IncomingMessage, typeof import("http").ServerResponse>;
    add<M extends l.Procedure | l.Query | l.Subscription, A extends AuthResult>(ns: l.Main<M>, config: M extends l.Procedure | l.Query ? LexMethodConfig<M, A> & {
        auth: Exclude<unknown, void>;
    } : M extends l.Subscription ? LexSubscriptionConfig<M, A> & {
        auth: Exclude<unknown, void>;
    } : never): void;
    add<M extends l.Procedure | l.Query | l.Subscription>(ns: l.Main<M>, config: M extends l.Procedure | l.Query ? LexMethodConfig<M, void> | LexMethodHandler<M, void> : M extends l.Subscription ? LexSubscriptionConfig<M, void> | LexSubscriptionHandler<M, void> : never): void;
    protected addProcedureSchema<M extends l.Procedure, A extends Auth>(schema: M, config: LexMethodConfig<M, A>): void;
    protected addQuerySchema<M extends l.Query, A extends Auth>(schema: M, config: LexMethodConfig<M, A>): void;
    protected addSubscriptionSchema<M extends l.Subscription, A extends Auth = void>(schema: M, config: LexSubscriptionConfig<M, A>): void;
    method<A extends Auth = Auth>(nsid: string, configOrFn: MethodConfigOrHandler<A>): void;
    addMethod<A extends Auth = Auth>(nsid: string, configOrFn: MethodConfigOrHandler<A>): void;
    streamMethod<A extends Auth = Auth>(nsid: string, configOrFn: StreamConfigOrHandler<A, Params>): void;
    addStreamMethod<A extends Auth = Auth>(nsid: string, configOrFn: StreamConfigOrHandler<A, Params>): void;
    addLexicon(doc: LexiconDoc): void;
    addLexicons(docs: LexiconDoc[]): void;
    protected addRoute<A extends Auth = Auth>(nsid: string, def: LexXrpcQuery | LexXrpcProcedure, config: MethodConfig<A>): Promise<void>;
    catchall: CatchallHandler;
    createHandler<A extends Auth = Auth, P extends Params = Params, I extends Input = Input, O extends Output = Output>(nsid: string, def: LexXrpcQuery | LexXrpcProcedure, cfg: MethodConfig<A, P, I, O>): RequestHandler;
    protected createHandlerInternal<A extends Auth, P extends Params, I extends Input, O extends Output>(authVerifier: AuthVerifierInternal<MethodAuthContext<P>, A> | null, paramsVerifier: ParamsVerifierInternal<P>, inputVerifier: InputVerifierInternal<I>, routeLimiter: RouteRateLimiter<HandlerContext<A, P, I>> | undefined, handler: MethodHandler<A, P, I, O>, validateResOutput: null | OutputVerifierInternal<O>): RequestHandler;
    protected addSubscription<A extends Auth = Auth>(nsid: string, def: LexXrpcSubscription, cfg: StreamConfig<A, Params>): Promise<void>;
    protected addSubscriptionInternal<A extends Auth, P extends Params>(nsid: string, paramsVerifier: ParamsVerifierInternal<P>, authVerifier: AuthVerifierInternal<StreamAuthContext<P>, A> | null, handler: (ctx: StreamContext<A, P>) => AsyncIterable<unknown>): void;
    private createAuthVerifier;
    private createLexiconParamsVerifier;
    private createLexiconInputVerifier;
    private createLexiconOutputVerifier;
    private createSchemaParamsVerifier;
    private createSchemaInputVerifier;
    private createSchemaOutputVerifier;
    private enableStreamingOnListen;
    private createRouteRateLimiter;
}
//# sourceMappingURL=server.d.ts.map
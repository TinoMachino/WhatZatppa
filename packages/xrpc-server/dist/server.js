"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
exports.createServer = createServer;
const node_assert_1 = __importDefault(require("node:assert"));
const node_stream_1 = require("node:stream");
const promises_1 = require("node:stream/promises");
const express_1 = __importStar(require("express"));
const lex_schema_1 = require("@atproto/lex-schema");
const lexicon_1 = require("@atproto/lexicon");
const errors_1 = require("./errors");
const logger_1 = __importStar(require("./logger"));
const rate_limiter_1 = require("./rate-limiter");
const stream_1 = require("./stream");
const types_1 = require("./types");
const util_1 = require("./util");
function createServer(lexicons, options) {
    return new Server(lexicons, options);
}
class Server {
    constructor(lexicons, opts = {}) {
        Object.defineProperty(this, "router", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, express_1.default)()
        });
        Object.defineProperty(this, "routes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, express_1.Router)()
        });
        Object.defineProperty(this, "subscriptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "lex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new lexicon_1.Lexicons()
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "globalRateLimiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sharedRateLimiters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "catchall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (req, res, next) => {
                // catchall handler only applies to XRPC routes
                if (!req.url.startsWith('/xrpc/'))
                    return next();
                // Validate the NSID
                const nsid = (0, util_1.extractUrlNsid)(req.url);
                if (!nsid) {
                    return next(new errors_1.InvalidRequestError('invalid xrpc path'));
                }
                if (this.globalRateLimiter) {
                    try {
                        await this.globalRateLimiter.handle({
                            req,
                            res,
                            auth: undefined,
                            params: {},
                            input: undefined,
                            async resetRouteRateLimits() { },
                        });
                    }
                    catch (err) {
                        return next(err);
                    }
                }
                // Ensure that known XRPC methods are only called with the correct HTTP
                // method.
                const def = this.lex.getDef(nsid);
                if (def) {
                    const expectedMethod = def.type === 'procedure' ? 'POST' : def.type === 'query' ? 'GET' : null;
                    if (expectedMethod != null && expectedMethod !== req.method) {
                        return next(new errors_1.InvalidRequestError(`Incorrect HTTP method (${req.method}) expected ${expectedMethod}`));
                    }
                }
                if (this.options.catchall) {
                    this.options.catchall.call(null, req, res, next);
                }
                else if (!def) {
                    next(new errors_1.MethodNotImplementedError());
                }
                else {
                    next();
                }
            }
        });
        if (lexicons) {
            this.addLexicons(lexicons);
        }
        this.router.use(this.routes);
        this.router.use(this.catchall);
        this.router.use(createErrorMiddleware(opts));
        this.router.once('mount', (app) => {
            this.enableStreamingOnListen(app);
        });
        this.options = opts;
        if (opts.rateLimits) {
            const { global, shared, creator, bypass } = opts.rateLimits;
            if (global) {
                this.globalRateLimiter = rate_limiter_1.RouteRateLimiter.from(global.map((options) => creator(buildRateLimiterOptions(options))), { bypass });
            }
            if (shared) {
                this.sharedRateLimiters = new Map(shared.map((options) => [
                    options.name,
                    creator(buildRateLimiterOptions(options)),
                ]));
            }
        }
    }
    listen(port, callback) {
        return this.router.listen(port, callback);
    }
    add(ns, configOfHandler) {
        const schema = lex_schema_1.l.getMain(ns);
        const config = typeof configOfHandler === 'function'
            ? { handler: configOfHandler }
            : configOfHandler;
        switch (schema.type) {
            case 'procedure':
                return this.addProcedureSchema(schema, config);
            case 'query':
                return this.addQuerySchema(schema, config);
            case 'subscription':
                return this.addSubscriptionSchema(schema, config);
            default:
                throw new TypeError(
                // @ts-expect-error should never happen
                `Unsupported schema ${schema.nsid} of type ${schema.type}`);
        }
    }
    addProcedureSchema(schema, config) {
        this.routes.post(`/xrpc/${schema.nsid}`, this.createHandlerInternal(this.createAuthVerifier(config), this.createSchemaParamsVerifier(schema, config.opts), this.createSchemaInputVerifier(schema, config.opts), this.createRouteRateLimiter(schema.nsid, config), config.handler, this.createSchemaOutputVerifier(schema)));
    }
    addQuerySchema(schema, config) {
        this.routes.get(`/xrpc/${schema.nsid}`, this.createHandlerInternal(this.createAuthVerifier(config), this.createSchemaParamsVerifier(schema, config.opts), this.createSchemaInputVerifier(schema, config.opts), this.createRouteRateLimiter(schema.nsid, config), config.handler, this.createSchemaOutputVerifier(schema)));
    }
    addSubscriptionSchema(schema, config) {
        const { handler } = config;
        const messageSchema = this.options.validateResponse === false ? undefined : schema.message;
        return this.addSubscriptionInternal(schema.nsid, this.createSchemaParamsVerifier(schema), this.createAuthVerifier(config), 
        // Wrap the handler to validate outgoing messages if a message schema
        // is available
        messageSchema
            ? async function* (ctx) {
                for await (const item of handler(ctx)) {
                    if (item instanceof stream_1.Frame) {
                        messageSchema.validate(item.body);
                        yield item;
                    }
                    else {
                        yield messageSchema.validate(item);
                    }
                }
            }
            : handler);
    }
    method(nsid, configOrFn) {
        this.addMethod(nsid, configOrFn);
    }
    addMethod(nsid, configOrFn) {
        const config = typeof configOrFn === 'function' ? { handler: configOrFn } : configOrFn;
        if (config.opts && 'paramsParseLoose' in config.opts) {
            throw new Error(`paramsParseLoose is not supported with method(), use add() instead`);
        }
        const def = this.lex.getDef(nsid);
        if (def?.type === 'query' || def?.type === 'procedure') {
            this.addRoute(nsid, def, config);
        }
        else {
            throw new Error(`Lex def for ${nsid} is not a query or a procedure`);
        }
    }
    streamMethod(nsid, configOrFn) {
        this.addStreamMethod(nsid, configOrFn);
    }
    addStreamMethod(nsid, configOrFn) {
        const config = typeof configOrFn === 'function' ? { handler: configOrFn } : configOrFn;
        const def = this.lex.getDef(nsid);
        if (def?.type === 'subscription') {
            this.addSubscription(nsid, def, config);
        }
        else {
            throw new Error(`Lex def for ${nsid} is not a subscription`);
        }
    }
    // schemas
    // =
    addLexicon(doc) {
        this.lex.add(doc);
    }
    addLexicons(docs) {
        for (const doc of docs) {
            this.addLexicon(doc);
        }
    }
    // http
    // =
    async addRoute(nsid, def, config) {
        const path = `/xrpc/${nsid}`;
        const handler = this.createHandler(nsid, def, config);
        if (def.type === 'procedure') {
            this.routes.post(path, handler);
        }
        else {
            this.routes.get(path, handler);
        }
    }
    createHandler(nsid, def, cfg) {
        return this.createHandlerInternal(this.createAuthVerifier(cfg), this.createLexiconParamsVerifier(nsid, def), this.createLexiconInputVerifier(nsid, def, cfg.opts), this.createRouteRateLimiter(nsid, cfg), cfg.handler, this.createLexiconOutputVerifier(nsid, def));
    }
    createHandlerInternal(authVerifier, paramsVerifier, inputVerifier, routeLimiter, handler, validateResOutput) {
        return async function (req, res, next) {
            try {
                // parse & validate params
                const params = paramsVerifier(req);
                // authenticate request
                const auth = authVerifier
                    ? await authVerifier({ req, res, params })
                    : undefined;
                // parse & validate input
                const input = await inputVerifier(req, res);
                const ctx = {
                    params,
                    input,
                    auth,
                    req,
                    res,
                    resetRouteRateLimits: async () => routeLimiter?.reset(ctx),
                };
                // handle rate limits
                if (routeLimiter)
                    await routeLimiter.handle(ctx);
                // run the handler
                const output = (await handler(ctx));
                if (!output) {
                    validateResOutput?.(output);
                    res.status(200);
                    res.end();
                }
                else if ((0, types_1.isHandlerPipeThroughStream)(output)) {
                    (0, util_1.setHeaders)(res, output.headers);
                    res.status(200);
                    res.header('Content-Type', output.encoding);
                    await (0, promises_1.pipeline)(output.stream, res);
                }
                else if ((0, types_1.isHandlerPipeThroughBuffer)(output)) {
                    (0, util_1.setHeaders)(res, output.headers);
                    res.status(200);
                    res.header('Content-Type', output.encoding);
                    res.end(output.buffer);
                }
                else if ((0, types_1.isHandlerSuccess)(output)) {
                    validateResOutput?.(output);
                    res.status(200);
                    (0, util_1.setHeaders)(res, output.headers);
                    const encoding = output.encoding === 'json' ? 'application/json' : output.encoding;
                    res.header('Content-Type', encoding);
                    if (output.body instanceof node_stream_1.Readable) {
                        // The "Readable" check comes first to avoid calling "lexToJson" on
                        // a stream, which would be a bug.
                        await (0, promises_1.pipeline)(output.body, res);
                    }
                    else if (encoding === 'application/json') {
                        // @NOTE using "stringifyLex" instead of
                        // "JSON.stringify(lexToJson(...))" because stringifyLex handles
                        // deeply nested LexValues better.
                        res.header('Content-Type', `${encoding}; charset=utf-8`);
                        res.send((0, lexicon_1.stringifyLex)(output.body));
                    }
                    else {
                        res.send(Buffer.isBuffer(output.body)
                            ? output.body
                            : output.body instanceof Uint8Array
                                ? Buffer.from(output.body)
                                : output.body);
                    }
                }
                else {
                    next(errors_1.XRPCError.fromError(output));
                }
            }
            catch (err) {
                // Express will not call the next middleware (errorMiddleware in this case)
                // if the value passed to next is false-y (e.g. null, undefined, 0).
                // Hence we replace it with an InternalServerError.
                if (!err) {
                    next(new errors_1.InternalServerError());
                }
                else {
                    next(err);
                }
            }
        };
    }
    async addSubscription(nsid, def, cfg) {
        this.addSubscriptionInternal(nsid, this.createLexiconParamsVerifier(nsid, def), this.createAuthVerifier(cfg), 
        // @NOTE outgoing messages are not validated against the lexicon schema
        // (unlike the handlers for @atproto/lex based subscriptions)
        cfg.handler);
    }
    addSubscriptionInternal(nsid, paramsVerifier, authVerifier, handler) {
        this.subscriptions.set(nsid, new stream_1.XrpcStreamServer({
            noServer: true,
            handler: async function* (req, signal) {
                try {
                    // validate request
                    const params = paramsVerifier(req);
                    // authenticate request
                    const auth = authVerifier
                        ? await authVerifier({ req, params })
                        : undefined;
                    // stream
                    for await (const item of handler({ req, params, auth, signal })) {
                        yield item instanceof stream_1.Frame
                            ? item
                            : stream_1.MessageFrame.fromLexValue(item, nsid);
                    }
                }
                catch (err) {
                    yield stream_1.ErrorFrame.fromError(err);
                }
            },
        }));
    }
    createAuthVerifier(cfg) {
        const { auth } = cfg;
        if (!auth)
            return null;
        return async (ctx) => {
            const result = await auth(ctx);
            return (0, errors_1.excludeErrorResult)(result);
        };
    }
    createLexiconParamsVerifier(nsid, def) {
        return (0, util_1.createLexiconParamsVerifier)(nsid, def, this.lex);
    }
    createLexiconInputVerifier(nsid, def, opts) {
        return (0, util_1.createLexiconInputVerifier)(nsid, def, {
            blobLimit: opts?.blobLimit ?? this.options.payload?.blobLimit,
            jsonLimit: opts?.jsonLimit ?? this.options.payload?.jsonLimit,
            textLimit: opts?.textLimit ?? this.options.payload?.textLimit,
        }, this.lex);
    }
    createLexiconOutputVerifier(nsid, def) {
        if (this.options.validateResponse === false) {
            return null;
        }
        return (0, util_1.createLexiconOutputVerifier)(nsid, def, this.lex);
    }
    createSchemaParamsVerifier(ns, opts) {
        return (0, util_1.createSchemaParamsVerifier)(ns, opts);
    }
    createSchemaInputVerifier(ns, opts) {
        return (0, util_1.createSchemaInputVerifier)(ns, {
            blobLimit: opts?.blobLimit ?? this.options.payload?.blobLimit,
            jsonLimit: opts?.jsonLimit ?? this.options.payload?.jsonLimit,
            textLimit: opts?.textLimit ?? this.options.payload?.textLimit,
        });
    }
    createSchemaOutputVerifier(ns) {
        if (this.options.validateResponse === false) {
            return null;
        }
        return (0, util_1.createSchemaOutputVerifier)(ns);
    }
    enableStreamingOnListen(app) {
        const _listen = app.listen;
        app.listen = (...args) => {
            // @ts-ignore the args spread
            const httpServer = _listen.call(app, ...args);
            httpServer.on('upgrade', (req, socket, head) => {
                const nsid = req.url ? (0, util_1.extractUrlNsid)(req.url) : undefined;
                const sub = nsid ? this.subscriptions.get(nsid) : undefined;
                if (!sub)
                    return socket.destroy();
                sub.wss.handleUpgrade(req, socket, head, (ws) => sub.wss.emit('connection', ws, req));
            });
            return httpServer;
        };
    }
    createRouteRateLimiter(nsid, config) {
        // @NOTE global & shared rate limiters are instantiated with a context of
        // HandlerContext which is compatible (more generic) with the context of
        // this route specific rate limiters (C). For this reason, it's safe to
        // cast these with an `any` context
        const globalRateLimiter = this.globalRateLimiter;
        // No route specific rate limiting configured, use the global rate limiter.
        if (!config.rateLimit)
            return globalRateLimiter;
        const { rateLimits } = this.options;
        // @NOTE Silently ignore creation of route specific rate limiter if the
        // `rateLimits` options was not provided to the constructor.
        if (!rateLimits)
            return globalRateLimiter;
        const { creator, bypass } = rateLimits;
        const rateLimiters = (0, util_1.asArray)(config.rateLimit).map((options, i) => {
            if ((0, types_1.isSharedRateLimitOpts)(options)) {
                const rateLimiter = this.sharedRateLimiters?.get(options.name);
                // The route config references a shared rate limiter that does not
                // exist. This is a configuration error.
                (0, node_assert_1.default)(rateLimiter, `Shared rate limiter "${options.name}" not defined`);
                return rate_limiter_1.WrappedRateLimiter.from(rateLimiter, options);
            }
            else {
                return creator({
                    ...options,
                    calcKey: options.calcKey ?? defaultKey,
                    calcPoints: options.calcPoints ?? defaultPoints,
                    keyPrefix: `${nsid}-${i}`,
                });
            }
        });
        // If the route config contains an empty array, use global rate limiter.
        if (!rateLimiters.length)
            return globalRateLimiter;
        // The global rate limiter (if present) should be applied in addition to
        // the route specific rate limiters.
        if (globalRateLimiter)
            rateLimiters.push(globalRateLimiter);
        return rate_limiter_1.RouteRateLimiter.from(rateLimiters, { bypass });
    }
}
exports.Server = Server;
function createErrorMiddleware({ errorParser = (err) => errors_1.XRPCError.fromError(err), }) {
    return (err, req, res, next) => {
        const nsid = (0, util_1.extractUrlNsid)(req.originalUrl);
        const xrpcError = errorParser(err);
        // Use the request's logger (if available) to benefit from request context
        // (id, timing) and logging configuration (serialization, etc.).
        const logger = isPinoHttpRequest(req) ? req.log : logger_1.default;
        const isInternalError = xrpcError instanceof errors_1.InternalServerError;
        const msgPrefix = isInternalError ? 'unhandled exception' : 'error';
        const msgSuffix = nsid ? `xrpc method ${nsid}` : `${req.method} ${req.url}`;
        const msg = `${msgPrefix} in ${msgSuffix}`;
        logger.error({
            // @NOTE Computation of error stack is an expensive operation, so
            // we strip it for expected errors.
            err: isInternalError || process.env.NODE_ENV === 'development'
                ? err
                : toSimplifiedErrorLike(err),
            // XRPC specific properties, for easier browsing of logs
            nsid,
            type: xrpcError.type,
            status: xrpcError.statusCode,
            payload: xrpcError.payload,
            // Ensure that the logged item's name is set to LOGGER_NAME, instead of
            // the name of the pino-http logger, to ensure consistency across logs.
            name: logger_1.LOGGER_NAME,
        }, msg);
        if (res.headersSent) {
            return next(err);
        }
        return res.status(xrpcError.statusCode).json(xrpcError.payload);
    };
}
function isPinoHttpRequest(req) {
    return typeof req.log?.error === 'function';
}
function toSimplifiedErrorLike(err) {
    if (err instanceof Error) {
        // Transform into an "ErrorLike" for pino's std "err" serializer
        return {
            ...err,
            // Carry over non-enumerable properties
            message: err.message,
            name: !Object.hasOwn(err, 'name') &&
                Object.prototype.toString.call(err.constructor) === '[object Function]'
                ? err.constructor.name // extract the class name for sub-classes of Error
                : err.name,
            // @NOTE Error.stack, Error.cause and AggregateError.error are non
            // enumerable properties so they won't be spread to the ErrorLike
        };
    }
    return err;
}
function buildRateLimiterOptions({ name, calcKey = defaultKey, calcPoints = defaultPoints, ...desc }) {
    return { ...desc, calcKey, calcPoints, keyPrefix: `rl-${name}` };
}
const defaultPoints = () => 1;
/**
 * @note when using a proxy, ensure headers are getting forwarded correctly:
 * `app.set('trust proxy', true)`
 *
 * @see {@link https://expressjs.com/en/guide/behind-proxies.html}
 */
const defaultKey = ({ req }) => req.ip;
//# sourceMappingURL=server.js.map
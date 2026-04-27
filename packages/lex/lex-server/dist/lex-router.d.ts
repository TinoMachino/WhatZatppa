import { DidString, InferMethodInput, InferMethodMessage, InferMethodOutput, InferMethodOutputBody, InferMethodOutputEncoding, InferMethodParams, Main, NsidString, Procedure, Query, Subscription } from '@atproto/lex-schema';
import { LexServerError } from './errors.js';
type Awaitable<T> = T | Promise<T>;
/**
 * Union type representing the supported Lexicon method types.
 *
 * - `Query`: Read-only methods invoked via HTTP GET
 * - `Procedure`: Methods that may modify state, invoked via HTTP POST
 * - `Subscription`: Real-time streaming methods over WebSocket
 */
export type LexMethod = Query | Procedure | Subscription;
/**
 * Network address for TCP or UDP connections.
 *
 * @example
 * ```typescript
 * const addr: NetAddr = {
 *   hostname: '127.0.0.1',
 *   port: 3000,
 *   transport: 'tcp'
 * }
 * ```
 */
export type NetAddr = {
    /** The hostname or IP address of the connection. */
    hostname: string;
    /** The port number of the connection. */
    port: number;
    /** The transport protocol used. */
    transport: 'tcp' | 'udp';
};
/**
 * Unix domain socket address.
 *
 * @example
 * ```typescript
 * const addr: UnixAddr = {
 *   path: '/var/run/app.sock',
 *   transport: 'unix'
 * }
 * ```
 */
export type UnixAddr = {
    /** The filesystem path to the Unix socket. */
    path: string;
    /** The transport protocol used. */
    transport: 'unix' | 'unixpacket';
};
/**
 * Union type for all supported address types.
 *
 * Can be a network address ({@link NetAddr}), Unix socket address ({@link UnixAddr}),
 * or `undefined` when the address is not available.
 */
export type Addr = NetAddr | UnixAddr | undefined;
/**
 * Metadata about the client connection for an incoming request.
 *
 * @typeParam A - The address type, defaults to {@link Addr}
 *
 * @example
 * ```typescript
 * const info: ConnectionInfo<NetAddr> = {
 *   remoteAddr: { hostname: '192.168.1.1', port: 54321, transport: 'tcp' },
 *   completed: new Promise((resolve) => socket.on('close', resolve))
 * }
 * ```
 */
export type ConnectionInfo<A extends Addr = Addr> = {
    /** The remote address of the client, if available. */
    remoteAddr: A;
    /** Promise that resolves when the connection is fully closed. */
    completed: Promise<void>;
};
/**
 * Function signature for handling HTTP requests in the XRPC router.
 *
 * This is the standard fetch-style handler that processes incoming requests
 * and returns responses. It is used both internally by the router and can
 * be used to integrate with other HTTP frameworks.
 *
 * @param request - The incoming HTTP request
 * @param connection - Optional connection metadata including remote address
 * @returns A promise resolving to the HTTP response
 *
 * @example
 * ```typescript
 * const handler: FetchHandler = async (request, connection) => {
 *   console.log('Request from:', connection?.remoteAddr)
 *   return new Response('Hello, World!')
 * }
 * ```
 */
export type FetchHandler = (request: Request, connection?: ConnectionInfo) => Promise<Response>;
/**
 * Context object passed to XRPC method handlers.
 *
 * Contains all the information needed to process a request, including
 * parsed parameters, authentication credentials, and the raw request object.
 *
 * @typeParam Method - The Lexicon method type (Query, Procedure, or Subscription)
 * @typeParam Credentials - The type of authentication credentials, determined by the auth handler
 *
 * @example
 * ```typescript
 * const handler: LexRouterMethodHandler<MyMethod, UserCredentials> = async (ctx) => {
 *   const { credentials, params, input, signal } = ctx
 *   // credentials.userId is available if auth handler returns UserCredentials
 *   // params contains validated query parameters
 *   // input contains the request body (for procedures)
 *   // signal can be used to abort long-running operations
 *   return { body: { result: 'success' } }
 * }
 * ```
 */
export type LexRouterHandlerContext<Method extends LexMethod, Credentials> = {
    /** Authentication credentials returned by the auth handler. */
    credentials: Credentials;
    /** Parsed and validated request input (body for procedures, undefined for queries). */
    input: InferMethodInput<Method, Body>;
    /** Parsed and validated URL query parameters. */
    params: InferMethodParams<Method>;
    /** The original HTTP request object. */
    request: Request;
    /** Abort signal that is triggered when the request is cancelled. */
    signal: AbortSignal;
    /** Connection metadata including remote address. */
    connection?: ConnectionInfo;
};
type AsOptionalPayloadOptions<T> = T extends undefined | void ? {
    encoding?: undefined;
    body?: undefined;
} : T;
/**
 * Return type for XRPC method handlers (queries and procedures).
 *
 * Handlers can return either:
 * - A raw {@link Response} object for full control over the HTTP response
 * - An object with `body`, optional `encoding`, and optional `headers`
 *
 * For JSON methods, the body is automatically serialized. For other encodings,
 * the body must be a valid {@link BodyInit} type.
 *
 * @typeParam Method - The Lexicon method type (Query or Procedure)
 *
 * @example
 * ```typescript
 * // Return JSON body (most common)
 * return { body: { users: [...] } }
 *
 * // Return with custom headers
 * return {
 *   body: { data: 'value' },
 *   headers: { 'Cache-Control': 'max-age=3600' }
 * }
 *
 * // Return raw Response for full control
 * return new Response(binaryData, {
 *   headers: { 'Content-Type': 'application/octet-stream' }
 * })
 * ```
 */
export type LexRouterHandlerOutput<Method extends Query | Procedure> = Response | ({
    headers?: HeadersInit;
} & (InferMethodOutputEncoding<Method> extends 'application/json' ? {
    encoding?: 'application/json';
    body: InferMethodOutputBody<Method>;
} : AsOptionalPayloadOptions<InferMethodOutput<Method, BodyInit>>));
/**
 * Handler function for XRPC query and procedure methods.
 *
 * Receives a context object with request details and credentials,
 * and returns either a Response or a structured output object.
 *
 * @typeParam Method - The Lexicon method type (Query or Procedure)
 * @typeParam Credentials - The type of authentication credentials
 *
 * @example
 * ```typescript
 * const getProfile: LexRouterMethodHandler<GetProfileMethod, UserCredentials> = async (ctx) => {
 *   const profile = await db.getProfile(ctx.params.actor)
 *   return { body: profile }
 * }
 * ```
 */
export type LexRouterMethodHandler<Method extends Query | Procedure = Query | Procedure, Credentials = unknown> = (ctx: LexRouterHandlerContext<Method, Credentials>) => Awaitable<LexRouterHandlerOutput<Method>>;
/**
 * Configuration object for registering an XRPC method with authentication.
 *
 * Used when you need to specify both a handler and an auth function.
 *
 * @typeParam Method - The Lexicon method type (Query or Procedure)
 * @typeParam Credentials - The type of authentication credentials
 *
 * @example
 * ```typescript
 * const config: LexRouterMethodConfig<GetProfileMethod, UserCredentials> = {
 *   handler: async (ctx) => {
 *     return { body: await getProfile(ctx.params.actor) }
 *   },
 *   auth: async ({ request }) => {
 *     return verifyToken(request.headers.get('authorization'))
 *   }
 * }
 * ```
 */
export type LexRouterMethodConfig<Method extends Query | Procedure = Query | Procedure, Credentials = unknown> = {
    /** The handler function that processes the request. */
    handler: LexRouterMethodHandler<Method, Credentials>;
    /** Authentication function that validates credentials before the handler runs. */
    auth: LexRouterAuth<Credentials, Method>;
};
/**
 * Handler function for XRPC subscription methods (WebSocket streams).
 *
 * Returns an async iterable that yields messages to be sent over the WebSocket.
 * The connection remains open until the iterable completes or an error occurs.
 *
 * @typeParam Method - The Lexicon subscription method type
 * @typeParam Credentials - The type of authentication credentials
 *
 * @example
 * ```typescript
 * const subscribeRepos: LexRouterSubscriptionHandler<SubscribeReposMethod> = async function* (ctx) {
 *   const cursor = ctx.params.cursor ?? 0
 *   for await (const event of eventStream.since(cursor)) {
 *     if (ctx.signal.aborted) break
 *     yield { $type: 'com.atproto.sync.subscribeRepos#commit', ...event }
 *   }
 * }
 * ```
 */
export type LexRouterSubscriptionHandler<Method extends Subscription = Subscription, Credentials = unknown> = (ctx: LexRouterHandlerContext<Method, Credentials>) => AsyncIterable<InferMethodMessage<Method>>;
/**
 * Configuration object for registering an XRPC subscription with authentication.
 *
 * Used when you need to specify both a handler and an auth function for subscriptions.
 *
 * @typeParam Method - The Lexicon subscription method type
 * @typeParam Credentials - The type of authentication credentials
 *
 * @example
 * ```typescript
 * const config: LexRouterSubscriptionConfig<SubscribeReposMethod, ServiceCredentials> = {
 *   handler: async function* (ctx) {
 *     for await (const event of eventStream) {
 *       yield event
 *     }
 *   },
 *   auth: async ({ request }) => {
 *     return verifyServiceAuth(request)
 *   }
 * }
 * ```
 */
export type LexRouterSubscriptionConfig<Method extends Subscription = Subscription, Credentials = unknown> = {
    /** The handler function that yields subscription messages. */
    handler: LexRouterSubscriptionHandler<Method, Credentials>;
    /** Authentication function that validates credentials before the handler runs. */
    auth: LexRouterAuth<Credentials, Method>;
};
/**
 * Context object passed to authentication handlers.
 *
 * Contains the information needed to authenticate a request before
 * the main handler is invoked.
 *
 * @typeParam Method - The Lexicon method type
 *
 * @example
 * ```typescript
 * const authHandler: LexRouterAuth<UserCredentials> = async (ctx) => {
 *   const token = ctx.request.headers.get('authorization')
 *   if (!token) throw new LexServerAuthError('AuthenticationRequired', 'Missing token')
 *   return { userId: await verifyToken(token) }
 * }
 * ```
 */
export type LexRouterAuthContext<Method extends LexMethod = LexMethod> = {
    /** The Lexicon method definition being called. */
    method: Method;
    /** Parsed and validated URL query parameters. */
    params: InferMethodParams<Method>;
    /** The original HTTP request object. */
    request: Request;
    /** Connection metadata including remote address. */
    connection?: ConnectionInfo;
};
/**
 * Authentication handler function for XRPC methods.
 *
 * Called before the main handler to validate authentication credentials.
 * Should return the validated credentials or throw an error if authentication fails.
 *
 * @typeParam Credentials - The type of credentials to return on success
 * @typeParam Method - The Lexicon method type
 *
 * @example
 * ```typescript
 * // Simple token-based auth
 * const tokenAuth: LexRouterAuth<{ userId: string }> = async ({ request }) => {
 *   const token = request.headers.get('authorization')?.replace('Bearer ', '')
 *   if (!token) throw new LexServerAuthError('AuthenticationRequired', 'Token required')
 *   const userId = await verifyToken(token)
 *   if (!userId) throw new LexServerAuthError('AuthenticationRequired', 'Invalid token')
 *   return { userId }
 * }
 *
 * // Using with serviceAuth for AT Protocol service authentication
 * import { serviceAuth } from '@atproto/lex-server'
 * const auth = serviceAuth({ audience: 'did:web:example.com', unique: checkNonce })
 * ```
 */
export type LexRouterAuth<Credentials = unknown, Method extends LexMethod = LexMethod> = (ctx: LexRouterAuthContext<Method>) => Credentials | Promise<Credentials>;
/**
 * Context object passed to error handler callbacks.
 *
 * Used for logging and monitoring errors that occur during request handling.
 */
export type HandlerErrorContext = {
    request: Request;
    method: LexMethod;
    error: LexServerError;
};
export type HandlerErrorHook = (ctx: HandlerErrorContext) => void | Promise<void>;
export type SocketErrorContext = {
    request: Request;
    method: Subscription;
    error: unknown;
};
export type SocketErrorHook = (ctx: SocketErrorContext) => void | Promise<void>;
/**
 * Function that upgrades an HTTP request to a WebSocket connection.
 *
 * This is platform-specific: Deno provides this natively, while Node.js
 * requires the `upgradeWebSocket` function from this package.
 *
 * @param request - The HTTP request to upgrade
 * @returns An object containing the WebSocket and the upgrade response
 *
 * @example
 * ```typescript
 * // In Node.js, use the provided upgradeWebSocket function
 * import { upgradeWebSocket } from '@atproto/lex-server/nodejs'
 *
 * const router = new LexRouter({ upgradeWebSocket })
 * ```
 */
export type UpgradeWebSocket = (request: Request) => {
    /** The WebSocket instance for bidirectional communication. */
    socket: WebSocket;
    /** The HTTP response to return (101 Switching Protocols). */
    response: Response;
};
export type HealthCheckHandler = (request: Request) => Awaitable<{
    [x: string]: unknown;
    status: 'ok';
}>;
/**
 * Configuration options for the {@link LexRouter}.
 *
 * @example
 * ```typescript
 * const options: LexRouterOptions = {
 *   upgradeWebSocket,
 *   onHandlerError: async ({ error, request, method }) => {
 *     console.error(`Error in ${method.nsid}:`, error)
 *     await reportToSentry(error)
 *   },
 *   highWaterMark: 64 * 1024,  // 64KB
 *   lowWaterMark: 16 * 1024    // 16KB
 * }
 * ```
 */
export type LexRouterOptions = {
    /**
     * Function to upgrade HTTP requests to WebSocket connections. Required for
     * subscription methods. Defaults to Deno's built-in
     * {@link globalThis.upgradeWebSocket} if available. For NodeJS, use the
     * homonymous export from `@atproto/lex-server/nodejs`.
     */
    upgradeWebSocket?: UpgradeWebSocket;
    /**
     * Callback invoked when an error occurs during request handling. Useful for
     * logging and error reporting. Not called for client-induced errors (e.g.,
     * request abortion).
     */
    onHandlerError?: HandlerErrorHook;
    /**
     * Optional hook for handling errors during generation of WebSocket messages.
     */
    onSocketError?: SocketErrorHook;
    /**
     * Optional health check handler. If provided, this function will be called
     * for requests to the /xrpc/_health endpoint, allowing for custom health
     * check logic and responses.
     *
     * If not provided, the server will respond to /xrpc/_health requests with a
     * default JSON response of `{ status: 'ok' }`.
     */
    healthCheck?: HealthCheckHandler;
    /**
     * Optional fallback handler for requests that are not /xrpc/ paths. Can be
     * used to serve static files or other routes. If not provided, non-/xrpc/
     * requests will return 404 responses.
     */
    fallback?: FetchHandler;
    /**
     * High water mark for WebSocket backpressure (in bytes). When buffered data
     * exceeds this, the handler will wait before sending more.
     */
    highWaterMark?: number;
    /**
     * Low water mark for WebSocket backpressure (in bytes). The handler resumes
     * sending when buffered data drops below this.
     */
    lowWaterMark?: number;
};
/**
 * XRPC router for handling AT Protocol Lexicon methods.
 *
 * The router handles HTTP routing, parameter parsing, input validation,
 * authentication, and response serialization for XRPC methods. It supports
 * queries (GET), procedures (POST), and subscriptions (WebSocket).
 *
 * @example Setting up a basic XRPC server
 * ```typescript
 * import { LexRouter } from '@atproto/lex-server'
 * import { serve, upgradeWebSocket } from '@atproto/lex-server/nodejs'
 * import { getProfile, createPost, subscribeRepos } from './lexicons'
 *
 * const router = new LexRouter({ upgradeWebSocket })
 *
 * // Register a query handler (GET request)
 * router.add(getProfile, async (ctx) => {
 *   const profile = await db.getProfile(ctx.params.actor)
 *   return { body: profile }
 * })
 *
 * // Register a procedure handler with authentication (POST request)
 * router.add(createPost, {
 *   handler: async (ctx) => {
 *     const post = await db.createPost(ctx.credentials.did, ctx.input.body)
 *     return { body: { uri: post.uri, cid: post.cid } }
 *   },
 *   auth: async ({ request }) => {
 *     return verifyAccessToken(request)
 *   }
 * })
 *
 * // Register a subscription handler (WebSocket)
 * router.add(subscribeRepos, async function* (ctx) {
 *   for await (const event of eventStream.since(ctx.params.cursor)) {
 *     if (ctx.signal.aborted) break
 *     yield event
 *   }
 * })
 *
 * // Start the server
 * const server = await serve(router, { port: 3000 })
 * console.log('XRPC server listening on port 3000')
 * ```
 *
 * @example Using with service authentication
 * ```typescript
 * import { LexRouter, serviceAuth } from '@atproto/lex-server'
 *
 * const router = new LexRouter()
 *
 * const auth = serviceAuth({
 *   audience: 'did:web:api.example.com',
 *   unique: async (nonce) => {
 *     // Check and record nonce uniqueness
 *     return await nonceStore.checkAndAdd(nonce)
 *   }
 * })
 *
 * router.add(protectedMethod, {
 *   handler: async (ctx) => {
 *     // ctx.credentials contains { did, didDocument, jwt }
 *     return { body: { callerDid: ctx.credentials.did } }
 *   },
 *   auth
 * })
 * ```
 */
export declare class LexRouter {
    readonly options: LexRouterOptions;
    /** Map of NSID strings to their fetch handlers. */
    readonly handlers: Map<NsidString, FetchHandler>;
    /**
     * Creates a new XRPC router.
     *
     * @param options - Router configuration options
     */
    constructor(options?: LexRouterOptions);
    /**
     * Registers a subscription handler without authentication.
     *
     * @param ns - The Lexicon namespace definition for the subscription
     * @param handler - Async generator function that yields subscription messages
     * @returns This router instance for chaining
     */
    add<M extends Subscription>(ns: Main<M>, handler: LexRouterSubscriptionHandler<M, void>): this;
    /**
     * Registers a subscription handler with authentication.
     *
     * @param ns - The Lexicon namespace definition for the subscription
     * @param config - Configuration object with handler and auth function
     * @returns This router instance for chaining
     */
    add<M extends Subscription, Credentials>(ns: Main<M>, config: LexRouterSubscriptionConfig<M, Credentials>): this;
    /**
     * Registers a query or procedure handler without authentication.
     *
     * @param ns - The Lexicon namespace definition for the method
     * @param handler - Handler function that processes requests
     * @returns This router instance for chaining
     */
    add<M extends Query | Procedure>(ns: Main<M>, handler: LexRouterMethodHandler<M, void>): this;
    /**
     * Registers a query or procedure handler with authentication.
     *
     * @param ns - The Lexicon namespace definition for the method
     * @param config - Configuration object with handler and auth function
     * @returns This router instance for chaining
     */
    add<M extends Query | Procedure, Credentials>(ns: Main<M>, config: LexRouterMethodConfig<M, Credentials>): this;
    /**
     * Registers a Lexicon method handler.
     *
     * This is the unified overload that accepts any method type with optional authentication.
     *
     * @param ns - The Lexicon namespace definition
     * @param config - Handler function or configuration object
     * @returns This router instance for chaining
     *
     * @throws {TypeError} If a method with the same NSID is already registered
     *
     * @example
     * ```typescript
     * // Register without auth (credentials will be void)
     * router.add(myQuery, async (ctx) => {
     *   return { body: { data: 'value' } }
     * })
     *
     * // Register with auth
     * router.add(myProcedure, {
     *   handler: async (ctx) => {
     *     console.log('Caller:', ctx.credentials.userId)
     *     return { body: { success: true } }
     *   },
     *   auth: async ({ request }) => ({ userId: await verifyToken(request) })
     * })
     * ```
     */
    add<M extends LexMethod, Credentials = unknown>(ns: Main<M>, config: M extends Subscription ? LexRouterSubscriptionHandler<M, Credentials> | LexRouterSubscriptionConfig<M, Credentials> : M extends Query | Procedure ? LexRouterMethodHandler<M, Credentials> | LexRouterMethodConfig<M, Credentials> : never): this;
    private buildMethodHandler;
    private buildSubscriptionHandler;
    private handlerError;
    /**
     * The main fetch handler for processing XRPC requests.
     *
     * Routes incoming requests to the appropriate method handler based on the
     * NSID in the URL path. Returns appropriate error responses for invalid
     * paths or unimplemented methods.
     *
     * This handler can be used directly with HTTP servers that support the
     * fetch API pattern, or converted to a Node.js request listener using
     * `toRequestListener()`.
     *
     * @param request - The incoming HTTP request
     * @param connection - Optional connection metadata
     * @returns A promise resolving to the HTTP response
     *
     * @example
     * ```typescript
     * // Use with Deno
     * Deno.serve(router.fetch)
     *
     * // Use with Bun
     * Bun.serve({ fetch: router.fetch })
     *
     * // Use with Node.js
     * import { toRequestListener } from '@atproto/lex-server/nodejs'
     * const listener = toRequestListener(router.fetch)
     * http.createServer(listener).listen(3000)
     * ```
     */
    fetch: FetchHandler;
}
export type ServiceProxyInfo = {
    did: DidString;
    serviceId: string;
};
export {};
//# sourceMappingURL=lex-router.d.ts.map
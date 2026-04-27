"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexRouter = void 0;
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
const lex_json_1 = require("@atproto/lex-json");
const lex_schema_1 = require("@atproto/lex-schema");
const errors_js_1 = require("./errors.js");
const drain_websocket_js_1 = require("./lib/drain-websocket.js");
const XRPC_PATH_PREFIX = '/xrpc/';
const XRPC_HEALTH_CHECK_PATH = '/xrpc/_health';
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
class LexRouter {
    options;
    /** Map of NSID strings to their fetch handlers. */
    handlers = new Map();
    /**
     * Creates a new XRPC router.
     *
     * @param options - Router configuration options
     */
    constructor(options = {}) {
        this.options = options;
    }
    add(ns, config) {
        const method = (0, lex_schema_1.getMain)(ns);
        const nsid = normalizeNsid(method.nsid);
        if (this.handlers.has(nsid)) {
            throw new TypeError(`Method ${method.nsid} already registered`);
        }
        const methodConfig = typeof config === 'function'
            ? { handler: config, auth: undefined }
            : config;
        const handler = method.type === 'subscription'
            ? this.buildSubscriptionHandler(method, methodConfig.handler, methodConfig.auth)
            : this.buildMethodHandler(method, methodConfig.handler, methodConfig.auth);
        this.handlers.set(nsid, handler);
        return this;
    }
    buildMethodHandler(method, methodHandler, auth) {
        const getInput = (method.type === 'procedure'
            ? getProcedureInput.bind(method)
            : getQueryInput.bind(method));
        return async (request, connection) => {
            // @NOTE CORS requests should be handled by a middleware before reaching
            // this point.
            if ((method.type === 'procedure' && request.method !== 'POST') ||
                (method.type === 'query' &&
                    request.method !== 'GET' &&
                    request.method !== 'HEAD')) {
                return invalidRequestResponse('Method not allowed', 405);
            }
            try {
                const url = new URL(request.url);
                const params = method.parameters.fromURLSearchParams(url.searchParams);
                const credentials = auth
                    ? await auth({ method, params, request, connection })
                    : undefined;
                const input = await getInput(request);
                const output = await methodHandler({
                    credentials,
                    params,
                    input,
                    request,
                    connection,
                    signal: request.signal,
                });
                if (output instanceof Response) {
                    return output;
                }
                // @TODO add validation of output based on method.output.schema?
                if (output.body === undefined && output.encoding === undefined) {
                    return new Response(null, { status: 200, headers: output.headers });
                }
                if (method.output?.encoding === 'application/json') {
                    return Response.json((0, lex_json_1.lexToJson)(output.body), {
                        status: 200,
                        headers: output.headers,
                    });
                }
                const headers = new Headers(output.headers);
                headers.set('content-type', output.encoding);
                return new Response(output.body, {
                    status: 200,
                    headers,
                });
            }
            catch (error) {
                return this.handlerError(request, method, error);
            }
        };
    }
    buildSubscriptionHandler(method, methodHandler, auth) {
        const { onSocketError, upgradeWebSocket = globalThis.Deno?.upgradeWebSocket, } = this.options;
        if (!upgradeWebSocket) {
            throw new TypeError('WebSocket upgrade not supported in this environment. Please provide an upgradeWebSocket option when creating the LexRouter.');
        }
        return async (request, connection) => {
            if (request.method !== 'GET') {
                return invalidRequestResponse('Method not allowed', 405);
            }
            if (request.headers.get('connection')?.toLowerCase() !== 'upgrade' ||
                request.headers.get('upgrade')?.toLowerCase() !== 'websocket') {
                return invalidRequestResponse('XRPC subscriptions are only available over WebSocket', 426, {
                    Connection: 'Upgrade',
                    Upgrade: 'websocket',
                });
            }
            if (request.signal.aborted) {
                return invalidRequestResponse('Request aborted', 499);
            }
            try {
                const { response, socket } = upgradeWebSocket(request);
                // @NOTE We are using a distinct signal than request.signal because that
                // signal may get aborted before the WebSocket is closed (this is the
                // case with Deno).
                const abortController = new AbortController();
                const { signal } = abortController;
                const abort = () => abortController.abort();
                const onOpen = async () => {
                    try {
                        const url = new URL(request.url);
                        const params = method.parameters.fromURLSearchParams(url.searchParams);
                        const credentials = auth
                            ? await auth({ method, params, request, connection })
                            : undefined;
                        signal.throwIfAborted();
                        const iterable = methodHandler({
                            credentials,
                            params,
                            input: undefined,
                            request,
                            connection,
                            signal,
                        });
                        const iterator = iterable[Symbol.asyncIterator]();
                        if (iterator.return) {
                            signal.addEventListener('abort', () => {
                                // @NOTE if iterator.return() throws, and no onSocketError is
                                // provided, or if onSocketError itself throws, the error will
                                // be unhandled, causing the process to crash. This is
                                // intentional, as it surfaces critical errors that occur
                                // during cleanup of the subscription.
                                void new Promise((resolve) => {
                                    // Wrapping in new Promise to catch any potential sync errors thrown by iterator.return()
                                    resolve(iterator.return());
                                }).catch(onSocketError
                                    ? (error) => onSocketError({ request, method, error })
                                    : null);
                            }, {
                                once: true,
                            });
                        }
                        while (!signal.aborted && socket.readyState === 1) {
                            const result = await iterator.next();
                            if (result.done)
                                break;
                            // @TODO add validation of output based on method.output.schema?
                            const data = encodeMessageFrame(method, result.value);
                            socket.send(data);
                            // Apply backpressure by waiting for the buffered data to drain
                            // before generating the next message
                            await (0, drain_websocket_js_1.drainWebsocket)(socket, signal, this.options);
                        }
                        if (socket.readyState === 1) {
                            socket.close(1000);
                        }
                    }
                    catch (error) {
                        // If the socket is still open, send an error frame before closing
                        if (socket.readyState === 1) {
                            const isLexError = error instanceof lex_data_1.LexError;
                            // https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
                            const code = isLexError && method.errors?.includes(error.error)
                                ? 1008 // Policy Violation for known LexErrors
                                : 1011; // Internal Error for unexpected errors
                            if (isLexError) {
                                socket.send(encodeErrorFrame(error.toJSON()));
                                socket.close(code, error.error);
                            }
                            else {
                                const error = 'InternalServerError';
                                const message = 'An internal error occurred';
                                socket.send(encodeErrorFrame({ error, message }));
                                socket.close(code, error);
                            }
                        }
                        if (onSocketError && !isAbortReason(signal, error)) {
                            await onSocketError({ request, method, error });
                        }
                    }
                    finally {
                        abortController.abort();
                    }
                };
                socket.addEventListener('error', abort);
                socket.addEventListener('close', abort);
                socket.addEventListener('open', onOpen);
                socket.addEventListener('message', onMessage);
                return response;
            }
            catch (error) {
                return this.handlerError(request, method, error);
            }
        };
    }
    async handlerError(request, method, cause) {
        // Only report unexpected processing errors
        if (isAbortReason(request.signal, cause)) {
            return Response.json({ error: 'RequestAborted' }, { status: 499 });
        }
        const error = errors_js_1.LexServerError.from(cause);
        const { onHandlerError } = this.options;
        if (onHandlerError)
            await onHandlerError({ error, request, method });
        return error.toResponse();
    }
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
    fetch = async (request, connection) => {
        const { pathname } = new URL(request.url);
        const atprotoProxy = request.headers.get('atproto-proxy');
        if (!pathname.startsWith(XRPC_PATH_PREFIX)) {
            // Handle non XRPC paths
            const { fallback } = this.options;
            if (fallback)
                return fallback(request, connection);
            return new Response('Not Found', { status: 404 });
        }
        if (pathname === XRPC_HEALTH_CHECK_PATH) {
            if (request.method !== 'GET') {
                return invalidRequestResponse('Method not allowed', 405);
            }
            if (atprotoProxy != null) {
                return invalidRequestResponse('atproto-proxy header is not allowed on health check endpoint');
            }
            const { healthCheck } = this.options;
            const data = healthCheck ? await healthCheck(request) : { status: 'ok' };
            return Response.json(data);
        }
        const subPath = pathname.slice(XRPC_PATH_PREFIX.length);
        if (!(0, lex_schema_1.isNsidString)(subPath)) {
            return invalidRequestResponse('Invalid NSID in URL path');
        }
        const nsid = normalizeNsid(subPath);
        if (atprotoProxy == null) {
            const handler = this.handlers.get(nsid);
            if (handler)
                return handler(request, connection);
        }
        else {
            // Handle service proxying logic.
            const proxyInfo = parseAtprotoProxyHeader(atprotoProxy);
            if (!proxyInfo) {
                return invalidRequestResponse(`Invalid atproto-proxy header value: ${atprotoProxy}`);
            }
            // @TODO actually implement service proxying logic here. The reason it was
            // not done already is because we want to perform all the heavy lifting
            // here, while still allowing the possibility to override the endpoint
            // resolution, etc.
            // @NOTE see ./service-auth.ts for potential common code (did resolver, etc.)
        }
        return Response.json({
            error: 'MethodNotImplemented',
            message: `XRPC method "${nsid}" not implemented on this server`,
        }, { status: 501 });
    };
}
exports.LexRouter = LexRouter;
async function getProcedureInput(request) {
    const encodingRaw = request.headers
        .get('content-type')
        ?.split(';')[0]
        .trim()
        .toLowerCase();
    const encoding = encodingRaw ||
        // If the caller did not provide a content-type, but the method
        // expects an input, assume binary
        (request.body != null && this.input.encoding != null
            ? 'application/octet-stream'
            : undefined);
    if (!this.input.matchesEncoding(encoding)) {
        throw new errors_js_1.LexServerError(400, {
            error: 'InvalidRequest',
            message: `Invalid content-type: ${encoding}`,
        });
    }
    if (this.input.encoding === 'application/json') {
        // @TODO limit size?
        const data = (0, lex_json_1.lexParseJsonBytes)(await request.bytes());
        const body = this.input.schema ? this.input.schema.parse(data) : data;
        return { encoding, body };
    }
    else if (this.input.encoding) {
        const body = request;
        return { encoding, body };
    }
    else {
        return undefined;
    }
}
async function getQueryInput(request) {
    if (request.body ||
        request.headers.has('content-type') ||
        request.headers.has('content-length')) {
        throw new errors_js_1.LexServerError(400, {
            error: 'InvalidRequest',
            message: 'GET requests must not have a body',
        });
    }
    return undefined;
}
function onMessage(_event) {
    const error = 'InvalidRequest';
    const message = 'XRPC subscriptions do not accept messages';
    this.send(encodeErrorFrame({ error, message }));
    // 1003 indicates that an endpoint is terminating the connection
    // because it has received a type of data it cannot accept (e.g., an
    // endpoint that understands only text data MAY send this if it
    // receives a binary message).
    this.close(1003, error);
}
// Pre-encoded frame header for error frames
const ERROR_FRAME_HEADER = /*#__PURE__*/ (0, lex_cbor_1.encode)({ op: -1 });
function encodeErrorFrame(errorData) {
    return (0, lex_data_1.ui8Concat)([ERROR_FRAME_HEADER, (0, lex_cbor_1.encode)(errorData)]);
}
// Pre-encoded frame header for message frames with unknown type
const UNKNOWN_MESSAGE_FRAME_HEADER = /*#__PURE__*/ (0, lex_cbor_1.encode)({ op: 1 });
function encodeMessageFrame(method, value) {
    if ((0, lex_data_1.isPlainObject)(value) && typeof value.$type === 'string') {
        const { $type, ...rest } = value;
        return (0, lex_data_1.ui8Concat)([
            (0, lex_cbor_1.encode)({
                op: 1,
                t: 
                // If $type starts with `nsid#`, strip the NSID prefix
                $type.charCodeAt(0) !== 0x23 && // '#'
                    $type.charCodeAt(method.nsid.length) === 0x23 && // '#'
                    $type.startsWith(method.nsid)
                    ? $type.slice(method.nsid.length)
                    : $type,
            }),
            (0, lex_cbor_1.encode)(rest),
        ]);
    }
    return (0, lex_data_1.ui8Concat)([UNKNOWN_MESSAGE_FRAME_HEADER, (0, lex_cbor_1.encode)(value)]);
}
function isAbortReason(signal, error) {
    return (signal.aborted &&
        signal.reason != null &&
        error instanceof Error &&
        (error === signal.reason || error.cause === signal.reason));
}
function parseAtprotoProxyHeader(value) {
    // /!\ Hot path
    // (fast) sanity check to avoid unnecessary parsing for non-DID values
    if (!value.startsWith('did:'))
        return null;
    // The format is expected to be `did:example:service#serviceId`
    const hashIndex = value.indexOf('#');
    if (hashIndex === -1)
        return null;
    const fragmentIndex = hashIndex + 1;
    // Basic validation if the fragment
    if (fragmentIndex === value.length)
        return null;
    if (value.includes('#', fragmentIndex))
        return null;
    if (value.includes(' ', fragmentIndex))
        return null;
    const did = value.slice(0, hashIndex);
    if (!(0, lex_schema_1.isDidString)(did))
        return null;
    const serviceId = value.slice(fragmentIndex);
    return { did, serviceId };
}
function normalizeNsid(nsid) {
    const lastDotIdx = nsid.lastIndexOf('.');
    // The domain name part of the NSID is case-insensitive, but the last part is
    // case-sensitive. Normalize the domain part to lowercase.
    if (lastDotIdx !== -1 && hasUpperCase(nsid, 0, lastDotIdx)) {
        return `${nsid.slice(0, lastDotIdx).toLowerCase()}.${nsid.slice(lastDotIdx + 1)}`;
    }
    return nsid;
}
function hasUpperCase(str, start = 0, end = str.length) {
    for (let i = start; i < end; i++) {
        const code = str.charCodeAt(i);
        if (code >= 0x41 && code <= 0x5a) {
            return true;
        }
    }
    return false;
}
function invalidRequestResponse(message, status = 400, headers) {
    return Response.json({
        error: 'InvalidRequest',
        message,
    }, { status, headers });
}
//# sourceMappingURL=lex-router.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexRouter = void 0;
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
const lex_json_1 = require("@atproto/lex-json");
const lex_schema_1 = require("@atproto/lex-schema");
const errors_js_1 = require("./errors.js");
const drain_websocket_js_1 = require("./lib/drain-websocket.js");
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
        if (this.handlers.has(method.nsid)) {
            throw new TypeError(`Method ${method.nsid} already registered`);
        }
        const methodConfig = typeof config === 'function'
            ? { handler: config, auth: undefined }
            : config;
        const fetch = method.type === 'subscription'
            ? this.buildSubscriptionHandler(method, methodConfig.handler, methodConfig.auth)
            : this.buildMethodHandler(method, methodConfig.handler, methodConfig.auth);
        this.handlers.set(method.nsid, fetch);
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
                return Response.json({ error: 'InvalidRequest', message: 'Method not allowed' }, { status: 405 });
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
                return this.handleError(request, method, error);
            }
        };
    }
    buildSubscriptionHandler(method, methodHandler, auth) {
        const { onHandlerError, upgradeWebSocket = globalThis.Deno?.upgradeWebSocket, } = this.options;
        if (!upgradeWebSocket) {
            throw new TypeError('WebSocket upgrade not supported in this environment. Please provide an upgradeWebSocket option when creating the LexRouter.');
        }
        return async (request, connection) => {
            if (request.method !== 'GET') {
                return Response.json({ error: 'InvalidRequest', message: 'Method not allowed' }, { status: 405 });
            }
            if (request.headers.get('connection')?.toLowerCase() !== 'upgrade' ||
                request.headers.get('upgrade')?.toLowerCase() !== 'websocket') {
                return Response.json({
                    error: 'InvalidRequest',
                    message: 'XRPC subscriptions are only available over WebSocket',
                }, {
                    status: 426,
                    headers: {
                        Connection: 'Upgrade',
                        Upgrade: 'websocket',
                    },
                });
            }
            if (request.signal.aborted) {
                return Response.json({ error: 'RequestAborted', message: 'The request was aborted' }, { status: 499 });
            }
            try {
                const { response, socket } = upgradeWebSocket(request);
                // @NOTE We are using a distinct signal than request.signal because that
                // signal may get aborted before the WebSocket is closed (this is the
                // case with Deno).
                const abortController = new AbortController();
                const { signal } = abortController;
                const abort = () => abortController.abort();
                const onMessage = (event) => {
                    const error = new lex_data_1.LexError('InvalidRequest', 'XRPC subscriptions do not accept messages', { cause: event });
                    socket.send(encodeErrorFrame(error));
                    socket.close(1008, error.error);
                };
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
                        signal.addEventListener('abort', async () => {
                            // @NOTE will cause the process to crash if this throws
                            await iterator.return?.();
                        });
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
                            const lexError = error instanceof lex_data_1.LexError
                                ? error
                                : new lex_data_1.LexError('InternalError', 'An internal error occurred');
                            socket.send(encodeErrorFrame(lexError));
                            socket.close(
                            // https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
                            error instanceof lex_data_1.LexError ? 1008 : 1011, lexError.error);
                        }
                        // Only report unexpected processing errors
                        if (onHandlerError && !isAbortReason(request.signal, error)) {
                            await onHandlerError({ error, request, method });
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
                return this.handleError(request, method, error);
            }
        };
    }
    async handleError(request, method, cause) {
        if (isAbortReason(request.signal, cause)) {
            return Response.json({ error: 'RequestAborted' }, { status: 499 });
        }
        const error = errors_js_1.LexServerError.from(cause);
        // Only report unexpected processing errors
        const { onHandlerError } = this.options;
        if (onHandlerError) {
            await onHandlerError({ error, request, method });
        }
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
        const nsid = extractMethodNsid(request);
        const fetch = nsid
            ? this.handlers.get(nsid)
            : undefined;
        if (fetch)
            return fetch(request, connection);
        if (!nsid || !(0, lex_schema_1.isNsidString)(nsid)) {
            return Response.json({
                error: 'InvalidRequest',
                message: 'Invalid XRPC method path',
            }, { status: 404 });
        }
        return Response.json({
            error: 'MethodNotImplemented',
            message: `XRPC method "${nsid}" not implemented on this server`,
        }, { status: 501 });
    };
}
exports.LexRouter = LexRouter;
function extractMethodNsid(request) {
    const { pathname } = new URL(request.url);
    if (!pathname.startsWith('/xrpc/'))
        return null;
    if (pathname.includes('/', 6))
        return null;
    // We don't really need to validate the NSID here, the existence of the route
    // (which is looked up based on an NSID) is sufficient.
    return pathname.slice(6);
}
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
        throw new lex_data_1.LexError('InvalidRequest', `Invalid content-type: ${encoding}`);
    }
    if (this.input.encoding === 'application/json') {
        // @TODO limit size?
        const data = (0, lex_json_1.lexParse)(await request.text());
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
        throw new lex_data_1.LexError('InvalidRequest', 'GET requests must not have a body');
    }
    return undefined;
}
// Pre-encoded frame header for error frames
const ERROR_FRAME_HEADER = /*#__PURE__*/ (0, lex_cbor_1.encode)({ op: -1 });
function encodeErrorFrame(error) {
    return (0, lex_data_1.ui8Concat)([ERROR_FRAME_HEADER, (0, lex_cbor_1.encode)(error.toJSON())]);
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
    if (!signal.aborted || signal.reason == null)
        return false;
    return (error === signal.reason ||
        (error instanceof Error && error.cause === signal.reason));
}
//# sourceMappingURL=lex-server.js.map
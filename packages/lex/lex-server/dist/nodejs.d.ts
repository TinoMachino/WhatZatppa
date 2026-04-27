import { IncomingMessage, Server as HttpServer, ServerOptions, ServerResponse } from 'node:http';
import { ListenOptions } from 'node:net';
import type { FetchHandler } from './lex-router.js';
/**
 * Upgrades an HTTP request to a WebSocket connection for Node.js.
 *
 * This function must be passed to the {@link LexRouter} constructor to enable
 * subscription (WebSocket) support on Node.js. It creates a WebSocket instance
 * and a placeholder response that signals the need for protocol upgrade.
 *
 * The actual upgrade is handled internally when the response is sent through
 * {@link sendResponse}.
 *
 * @param request - The incoming HTTP request to upgrade
 * @returns An object containing the WebSocket and upgrade response
 * @throws {TypeError} If the request is not a valid WebSocket upgrade request
 *
 * @example
 * ```typescript
 * import { LexRouter } from '@atproto/lex-server'
 * import { upgradeWebSocket } from '@atproto/lex-server/nodejs'
 *
 * // Pass to router for subscription support
 * const router = new LexRouter({ upgradeWebSocket })
 *
 * // Now you can add subscription handlers
 * router.add(subscribeRepos, async function* (ctx) {
 *   for await (const event of eventStream) {
 *     yield event
 *   }
 * })
 * ```
 */
export declare function upgradeWebSocket(request: Request): {
    response: Response;
    socket: WebSocket;
};
/**
 * Sends a fetch API Response through a Node.js ServerResponse.
 *
 * Handles both regular HTTP responses and WebSocket upgrades. For WebSocket
 * upgrades (status 101), delegates to the WebSocket upgrade handler.
 *
 * This function is used internally by {@link toRequestListener} and
 * {@link createServer}, but can be used directly for custom integrations.
 *
 * @param req - The Node.js IncomingMessage
 * @param res - The Node.js ServerResponse to write to
 * @param response - The fetch API Response to send
 * @throws {TypeError} If headers have already been sent
 *
 * @example
 * ```typescript
 * import http from 'node:http'
 * import { sendResponse } from '@atproto/lex-server/nodejs'
 *
 * const server = http.createServer(async (req, res) => {
 *   const response = new Response('Hello, World!', {
 *     headers: { 'Content-Type': 'text/plain' }
 *   })
 *   await sendResponse(req, res, response)
 * })
 * ```
 */
export declare function sendResponse(req: IncomingMessage, res: ServerResponse, response: Response): Promise<void>;
/**
 * Network address type for Node.js TCP connections.
 *
 * @example
 * ```typescript
 * const addr: NetAddr = {
 *   transport: 'tcp',
 *   hostname: '192.168.1.100',
 *   port: 54321
 * }
 * ```
 */
export type NetAddr = {
    /** Always 'tcp' for Node.js HTTP connections. */
    transport: 'tcp';
    /** The IP address of the remote client. */
    hostname: string;
    /** The port number of the remote client. */
    port: number;
};
/**
 * Connection metadata for Node.js HTTP requests.
 *
 * Provides information about the client connection, including the remote
 * address and a promise that resolves when the connection is fully closed
 * (including WebSocket connections).
 */
export type NodeConnectionInfo = {
    /** Promise that resolves when the connection is fully closed. */
    completed: Promise<void>;
    /** The remote address of the client, if available. */
    remoteAddr: NetAddr | undefined;
};
/**
 * Interface for objects that can handle fetch-style requests.
 *
 * Used by {@link createServer} and {@link serve} to accept either
 * a fetch handler function or an object with a `fetch` method
 * (like {@link LexRouter}).
 */
export interface HandlerObject {
    /** The fetch handler method. */
    fetch: FetchHandler;
}
/**
 * Converts a fetch-style handler to a Node.js request listener.
 *
 * The returned listener can be used with Node.js HTTP servers directly,
 * or as middleware in frameworks like Express (supports the `next` callback).
 *
 * @typeParam Request - The request class type (default: IncomingMessage)
 * @typeParam Response - The response class type (default: ServerResponse)
 * @param fetchHandler - The fetch-style handler function
 * @returns A Node.js RequestListener compatible with http.createServer
 *
 * @example Using as Express middleware
 * ```typescript
 * import express from 'express'
 * import { toRequestListener } from '@atproto/lex-server/nodejs'
 * import { LexRouter } from '@atproto/lex-server'
 *
 * const router = new LexRouter()
 * // Register handlers...
 *
 * const app = express()
 *
 * // Mount the XRPC router
 * app.use('/xrpc', toRequestListener(router.fetch))
 * ```
 */
export declare function toRequestListener<Request extends typeof IncomingMessage = typeof IncomingMessage, Response extends typeof ServerResponse<InstanceType<Request>> = typeof ServerResponse>(fetchHandler: FetchHandler): (req: InstanceType<Request>, res: InstanceType<Response> & {
    req: InstanceType<Request>;
}, next?: (err?: unknown) => void) => void;
/**
 * Options for creating an XRPC server.
 *
 * Extends Node.js {@link ServerOptions} with additional options for graceful shutdown.
 */
export type CreateServerOptions<Request extends typeof IncomingMessage = typeof IncomingMessage, Response extends typeof ServerResponse<InstanceType<Request>> = typeof ServerResponse> = ServerOptions<Request, Response> & {
    /**
     * Timeout in milliseconds for graceful termination.
     *
     * When `terminate()` is called, the server will wait up to this duration
     * for active connections to complete before forcibly closing them.
     */
    gracefulTerminationTimeout?: number;
};
/**
 * Extended HTTP server with graceful shutdown support.
 *
 * Extends the standard Node.js HttpServer with a `terminate()` method
 * for graceful shutdown and implements `AsyncDisposable` for use with
 * `await using`.
 *
 * @typeParam Request - The request class type
 * @typeParam Response - The response class type
 *
 * @example Graceful shutdown
 * ```typescript
 * const server = createServer(router)
 * server.listen(3000)
 *
 * process.on('SIGTERM', async () => {
 *   console.log('Shutting down...')
 *   await server.terminate()
 *   console.log('Server stopped')
 * })
 * ```
 *
 * @example Using with await using
 * ```typescript
 * await using server = await serve(router, { port: 3000 })
 * // Server will be automatically terminated when scope exits
 * ```
 */
export interface Server<Request extends typeof IncomingMessage = typeof IncomingMessage, Response extends typeof ServerResponse<InstanceType<Request>> = typeof ServerResponse> extends HttpServer<Request, Response>, AsyncDisposable {
    /**
     * Gracefully terminates the server.
     *
     * Stops accepting new connections and waits for active connections
     * to complete (up to `gracefulTerminationTimeout`).
     *
     * @returns Promise that resolves when the server is fully stopped
     */
    terminate(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
}
/**
 * Creates an HTTP server configured for XRPC request handling.
 *
 * The server includes graceful shutdown support and can be used with
 * either a fetch handler function or an object with a `fetch` method
 * (like {@link LexRouter}).
 *
 * Note: This creates the server but does not start listening. Call
 * `server.listen()` to start the server, or use {@link serve} for
 * a combined create-and-listen operation.
 *
 * @typeParam Request - The request class type
 * @typeParam Response - The response class type
 * @param handler - A fetch handler or object with fetch method
 * @param options - Server configuration options
 * @returns An HTTP server with graceful shutdown support
 *
 * @example Basic usage
 * ```typescript
 * import { LexRouter } from '@atproto/lex-server'
 * import { createServer, upgradeWebSocket } from '@atproto/lex-server/nodejs'
 *
 * const router = new LexRouter({ upgradeWebSocket })
 * router.add(myMethod, myHandler)
 *
 * const server = createServer(router)
 * server.listen(3000, () => {
 *   console.log('Server listening on port 3000')
 * })
 * ```
 *
 * @example With graceful termination timeout
 * ```typescript
 * const server = createServer(router, {
 *   gracefulTerminationTimeout: 10000 // 10 seconds
 * })
 * ```
 */
export declare function createServer<Request extends typeof IncomingMessage = typeof IncomingMessage, Response extends typeof ServerResponse<InstanceType<Request>> = typeof ServerResponse>(handler: FetchHandler | HandlerObject, options?: CreateServerOptions<Request, Response>): Server<Request, Response>;
/**
 * Combined options for creating and starting an XRPC server.
 *
 * Includes both server creation options and network listen options.
 *
 * @typeParam Request - The request class type
 * @typeParam Response - The response class type
 *
 * @example
 * ```typescript
 * const options: StartServerOptions = {
 *   port: 3000,
 *   host: '0.0.0.0',
 *   gracefulTerminationTimeout: 10000
 * }
 * ```
 */
export type StartServerOptions<Request extends typeof IncomingMessage = typeof IncomingMessage, Response extends typeof ServerResponse<InstanceType<Request>> = typeof ServerResponse> = ListenOptions & CreateServerOptions<Request, Response>;
/**
 * Creates and starts an HTTP server, returning when it's ready to accept connections.
 *
 * This is a convenience function that combines {@link createServer} and `server.listen()`
 * into a single async operation. The returned promise resolves once the server
 * is actively listening.
 *
 * @typeParam Request - The request class type
 * @typeParam Response - The response class type
 * @param handler - A fetch handler or object with fetch method (like {@link LexRouter})
 * @param options - Combined server and listen options
 * @returns Promise resolving to the running server
 *
 * @example Basic usage
 * ```typescript
 * import { LexRouter } from '@atproto/lex-server'
 * import { serve, upgradeWebSocket } from '@atproto/lex-server/nodejs'
 *
 * const router = new LexRouter({ upgradeWebSocket })
 *
 * // Register handlers
 * router.add(getProfile, async (ctx) => {
 *   return { body: await db.getProfile(ctx.params.actor) }
 * })
 *
 * // Start server on port 3000
 * const server = await serve(router, { port: 3000 })
 * console.log('Server listening on port 3000')
 *
 * // Graceful shutdown
 * process.on('SIGTERM', () => server.terminate())
 * process.on('SIGINT', () => server.terminate())
 * ```
 *
 * @example With all options
 * ```typescript
 * const server = await serve(router, {
 *   port: 3000,
 *   host: '0.0.0.0',
 *   gracefulTerminationTimeout: 15000,
 * })
 * ```
 *
 * @example Using with await using (auto-cleanup)
 * ```typescript
 * async function main() {
 *   await using server = await serve(router, { port: 3000 })
 *
 *   // Server is running...
 *   console.log('Server listening on port 3000')
 *
 *   // Wait for termination signal
 *   await Promise.race([
 *     once(process, 'SIGINT'),
 *     once(process, 'SIGTERM'),
 *   ])
 *
 *   // Server will be automatically terminated when scope exits
 * }
 * ```
 */
export declare function serve<Request extends typeof IncomingMessage = typeof IncomingMessage, Response extends typeof ServerResponse<InstanceType<Request>> = typeof ServerResponse>(handler: FetchHandler | HandlerObject, options?: StartServerOptions<Request, Response>): Promise<Server<Request, Response>>;
//# sourceMappingURL=nodejs.d.ts.map
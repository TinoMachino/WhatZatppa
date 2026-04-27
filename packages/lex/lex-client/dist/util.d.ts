import type { DidString, Service } from './types.js';
export declare function applyDefaults<TDefaults extends Record<string, unknown>, TOptions extends {
    [K in keyof TDefaults]?: TDefaults[K];
}>(options: TOptions, defaults: TDefaults): TOptions & TDefaults;
/**
 * Type guard to check if a value is {@link Blob}-like.
 *
 * Handles both native Blobs and polyfilled Blob implementations
 * (e.g., fetch-blob from node-fetch).
 *
 * @param value - The value to check
 * @returns `true` if the value is a Blob or Blob-like object
 */
export declare function isBlobLike(value: unknown): value is Blob;
export declare function isAsyncIterable<T>(value: T): value is unknown extends T ? T & AsyncIterable<unknown> : Extract<T, AsyncIterable<any>>;
export type XrpcRequestHeadersOptions = {
    /** Additional HTTP headers to include in the request. */
    headers?: HeadersInit;
    /** Labeler DIDs to request labels from for content moderation. */
    labelers?: Iterable<DidString>;
    /** Service proxy identifier for routing requests through a specific service. */
    service?: Service;
};
/**
 * Builds HTTP headers for AT Protocol requests.
 *
 * Adds the following headers when applicable:
 * - `atproto-proxy`: Service routing header (if service is specified)
 * - `atproto-accept-labelers`: Comma-separated list of labeler DIDs
 *
 * @see {@link XrpcRequestHeadersOptions}
 * @returns A new Headers object with AT Protocol headers added
 */
export declare function buildXrpcRequestHeaders(options: XrpcRequestHeadersOptions): Headers;
export declare function toReadableStream(data: AsyncIterable<Uint8Array>): ReadableStream<Uint8Array>;
export declare function toReadableStreamPonyfill(data: AsyncIterable<Uint8Array>): ReadableStream<Uint8Array>;
//# sourceMappingURL=util.d.ts.map
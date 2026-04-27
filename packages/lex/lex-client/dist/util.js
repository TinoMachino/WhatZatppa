"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDefaults = applyDefaults;
exports.isBlobLike = isBlobLike;
exports.isAsyncIterable = isAsyncIterable;
exports.buildXrpcRequestHeaders = buildXrpcRequestHeaders;
exports.toReadableStream = toReadableStream;
exports.toReadableStreamPonyfill = toReadableStreamPonyfill;
function applyDefaults(options, defaults) {
    const combined = { ...options };
    // @NOTE We make sure that options with an explicit `undefined` value get the
    // default, since spreading doesn't override with `undefined`.
    for (const key of Object.keys(defaults)) {
        if (options[key] === undefined) {
            combined[key] = defaults[key];
        }
    }
    return combined;
}
/**
 * Type guard to check if a value is {@link Blob}-like.
 *
 * Handles both native Blobs and polyfilled Blob implementations
 * (e.g., fetch-blob from node-fetch).
 *
 * @param value - The value to check
 * @returns `true` if the value is a Blob or Blob-like object
 */
function isBlobLike(value) {
    if (value == null)
        return false;
    if (typeof value !== 'object')
        return false;
    if (typeof Blob === 'function' && value instanceof Blob)
        return true;
    // Support for Blobs provided by libraries that don't use the native Blob
    // (e.g. fetch-blob from node-fetch).
    // https://github.com/node-fetch/fetch-blob/blob/a1a182e5978811407bef4ea1632b517567dda01f/index.js#L233-L244
    const tag = value[Symbol.toStringTag];
    if (tag === 'Blob' || tag === 'File') {
        return 'stream' in value && typeof value.stream === 'function';
    }
    return false;
}
function isAsyncIterable(value) {
    return (value != null && typeof value[Symbol.asyncIterator] === 'function');
}
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
function buildXrpcRequestHeaders(options) {
    const headers = new Headers(options?.headers);
    if (options.service && !headers.has('atproto-proxy')) {
        headers.set('atproto-proxy', options.service);
    }
    if (options.labelers) {
        headers.set('atproto-accept-labelers', [...options.labelers, headers.get('atproto-accept-labelers')?.trim()]
            .filter(Boolean)
            .join(', '));
    }
    return headers;
}
function toReadableStream(data) {
    // Use the native ReadableStream.from() if available.
    /* v8 ignore next -- @preserve */
    if ('from' in ReadableStream && typeof ReadableStream.from === 'function') {
        return ReadableStream.from(data);
    }
    /* v8 ignore next -- @preserve */
    return toReadableStreamPonyfill(data);
}
function toReadableStreamPonyfill(data) {
    let iterator;
    return new ReadableStream({
        async pull(controller) {
            try {
                iterator ??= data[Symbol.asyncIterator]();
                const result = await iterator.next();
                if (result.done)
                    controller.close();
                else
                    controller.enqueue(result.value);
            }
            catch (err) {
                controller.error(err);
                iterator = undefined;
            }
        },
        async cancel() {
            await iterator?.return?.();
            iterator = undefined;
        },
    });
}
//# sourceMappingURL=util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xrpc = xrpc;
exports.xrpcSafe = xrpcSafe;
exports.extractFetchErrorCause = extractFetchErrorCause;
const lex_data_1 = require("@atproto/lex-data");
const lex_json_1 = require("@atproto/lex-json");
const lex_schema_1 = require("@atproto/lex-schema");
const agent_js_1 = require("./agent.js");
const errors_js_1 = require("./errors.js");
const response_js_1 = require("./response.js");
const util_js_1 = require("./util.js");
async function xrpc(agentOpts, ns, options = {}) {
    const response = await xrpcSafe(agentOpts, ns, options);
    if (response.success)
        return response;
    else
        throw response;
}
async function xrpcSafe(agentOpts, ns, options = {}) {
    options.signal?.throwIfAborted();
    const method = (0, lex_schema_1.getMain)(ns);
    try {
        const agent = (0, agent_js_1.buildAgent)(agentOpts);
        const url = xrpcRequestUrl(method, options);
        const request = xrpcRequestInit(method, options);
        const response = await agent.fetchHandler(url, request).catch((err) => {
            const cause = extractFetchErrorCause(err);
            throw new errors_js_1.XrpcFetchError(method, cause);
        });
        return await response_js_1.XrpcResponse.fromFetchResponse(method, response, options);
    }
    catch (cause) {
        return (0, errors_js_1.asXrpcFailure)(method, cause);
    }
}
function xrpcRequestUrl(method, options) {
    const path = `/xrpc/${method.nsid}`;
    // @NOTE param.toURLSearchParams() will always validate the params in order to
    // apply default values, so we can't disable it with options.validateRequest
    const queryString = method.parameters
        ?.toURLSearchParams(options.params ?? {})
        .toString();
    return queryString ? `${path}?${queryString}` : path;
}
function xrpcRequestInit(schema, options) {
    const headers = (0, util_js_1.buildXrpcRequestHeaders)(options);
    // Tell the server what type of response we're expecting
    if (schema.output.encoding) {
        headers.set('accept', schema.output.encoding);
    }
    // Caller should not set content-type header
    if (headers.has('content-type')) {
        const contentType = headers.get('content-type');
        throw new TypeError(`Unexpected content-type header (${contentType})`);
    }
    // Requests with body
    if ('input' in schema) {
        const encodingHint = options.encoding;
        const input = xrpcProcedureInput(schema, options, encodingHint);
        if (input) {
            headers.set('content-type', input.encoding);
        }
        else if (encodingHint != null) {
            throw new TypeError(`Unexpected encoding hint (${encodingHint})`);
        }
        return {
            duplex: 'half',
            redirect: 'follow',
            referrerPolicy: 'strict-origin-when-cross-origin', // (default)
            mode: 'cors', // (default)
            signal: options.signal,
            method: 'POST',
            headers,
            body: input?.body,
        };
    }
    // Requests without body
    return {
        duplex: 'half',
        redirect: 'follow',
        referrerPolicy: 'strict-origin-when-cross-origin', // (default)
        mode: 'cors', // (default)
        signal: options.signal,
        method: 'GET',
        headers,
    };
}
function xrpcProcedureInput(method, options, encodingHint) {
    const { input } = method;
    const { body } = options;
    if (options.validateRequest) {
        input.schema?.check(body);
    }
    // Special handling for endpoints expecting application/json input
    if (input.encoding === 'application/json') {
        // @NOTE **NOT** using isLexValue here to avoid deep checks in order to
        // distinguish between LexValue and BinaryBodyInit.
        if (!(0, lex_data_1.isLexScalar)(body) && !(0, lex_data_1.isPlainObject)(body) && !Array.isArray(body)) {
            throw new TypeError(`Expected LexValue body, got ${typeof body}`);
        }
        return buildPayload(input, (0, lex_json_1.lexStringify)(body), encodingHint);
    }
    // Other encodings will be sent unaltered (ie. as binary data)
    switch (typeof body) {
        case 'undefined':
        case 'string':
            return buildPayload(input, body, encodingHint);
        case 'object': {
            if (body === null)
                break;
            if (ArrayBuffer.isView(body) ||
                body instanceof ArrayBuffer ||
                body instanceof ReadableStream) {
                return buildPayload(input, body, encodingHint);
            }
            else if ((0, util_js_1.isAsyncIterable)(body)) {
                return buildPayload(input, (0, util_js_1.toReadableStream)(body), encodingHint);
            }
            else if ((0, util_js_1.isBlobLike)(body)) {
                return buildPayload(input, body, encodingHint || body.type);
            }
        }
    }
    throw new TypeError(`Invalid ${typeof body} body for ${input.encoding} encoding`);
}
function buildPayload(schema, body, encodingHint) {
    if (schema.encoding === undefined) {
        if (body !== undefined) {
            throw new TypeError(`Endpoint expects no payload`);
        }
        return null;
    }
    if (body === undefined) {
        // This error would be returned by the server, but we can catch it earlier
        // to avoid un-necessary requests. Note that a content-length of 0 does not
        // necessary mean that the body is "empty" (e.g. an empty txt file).
        throw new TypeError(`A request body is expected but none was provided`);
    }
    const encoding = buildEncoding(schema, encodingHint);
    return { encoding, body };
}
function buildEncoding(schema, encodingHint) {
    // Should never happen (required for type safety)
    if (!schema.encoding) {
        throw new TypeError('Unexpected payload');
    }
    if (encodingHint?.length) {
        if (!schema.matchesEncoding(encodingHint)) {
            throw new TypeError(`Cannot send a body with content-type "${encodingHint}" for "${schema.encoding}" encoding`);
        }
        return encodingHint;
    }
    // Fallback
    if (schema.encoding === '*/*') {
        return 'application/octet-stream';
    }
    if (schema.encoding.startsWith('text/')) {
        return schema.encoding.includes('*')
            ? 'text/plain; charset=utf-8'
            : `${schema.encoding}; charset=utf-8`;
    }
    if (!schema.encoding.includes('*')) {
        return schema.encoding;
    }
    throw new TypeError(`Unable to determine payload encoding. Please provide a 'content-type' header matching ${schema.encoding}.`);
}
/**
 * Extracts the root cause from an error, unwrapping common fetch-related errors
 * such as those from undici (Node's internal fetch implementation).
 *
 * @param err - The error to extract the root cause from
 * @returns The root cause error, or the original error if no specific pattern is matched
 * @remarks This is useful for getting more specific error information from fetch-related failures, especially in Node environments using undici.
 */
function extractFetchErrorCause(err) {
    // Unwrap the Network error from undici (i.e. Node's internal fetch() implementation)
    // https://github.com/nodejs/undici/blob/04cb77327f7ada95c2e5b67424cddcb22d7bf882/lib/web/fetch/index.js#L234-L239
    if (err instanceof TypeError &&
        err.message === 'fetch failed' &&
        err.cause !== undefined) {
        return err.cause;
    }
    // @TODO Add other unwrap patterns here as needed (e.g. for other fetch
    // implementations or common network libraries, like "node:http", or in other
    // environments like React Native, Deno, Bun, Browser, etc.)
    return err;
}
//# sourceMappingURL=xrpc.js.map
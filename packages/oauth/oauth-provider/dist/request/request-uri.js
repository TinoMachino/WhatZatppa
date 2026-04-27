"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUriSchema = exports.REQUEST_URI_PREFIX = void 0;
exports.encodeRequestUri = encodeRequestUri;
exports.decodeRequestUri = decodeRequestUri;
exports.parseRequestUri = parseRequestUri;
const zod_1 = require("zod");
const invalid_request_error_js_1 = require("../errors/invalid-request-error.js");
const error_js_1 = require("../lib/util/error.js");
const request_id_js_1 = require("./request-id.js");
exports.REQUEST_URI_PREFIX = 'urn:ietf:params:oauth:request_uri:';
exports.requestUriSchema = zod_1.z
    .string()
    .refinement((data) => data.startsWith(exports.REQUEST_URI_PREFIX) &&
    request_id_js_1.requestIdSchema.safeParse(decodeRequestUri(data)).success, {
    code: zod_1.z.ZodIssueCode.custom,
    message: 'Invalid request_uri format',
});
function encodeRequestUri(requestId) {
    return `${exports.REQUEST_URI_PREFIX}${encodeURIComponent(requestId)}`;
}
function decodeRequestUri(requestUri) {
    const requestIdEnc = requestUri.slice(exports.REQUEST_URI_PREFIX.length);
    return decodeURIComponent(requestIdEnc);
}
function parseRequestUri(requestUri, parseParams) {
    const parseResult = exports.requestUriSchema.safeParse(requestUri, parseParams);
    if (!parseResult.success) {
        const err = parseResult.error;
        const msg = (0, error_js_1.formatError)(err, 'Invalid "request_uri" query parameter');
        throw new invalid_request_error_js_1.InvalidRequestError(msg, err);
    }
    return parseResult.data;
}
//# sourceMappingURL=request-uri.js.map
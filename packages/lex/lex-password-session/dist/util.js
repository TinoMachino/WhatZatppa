"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractXrpcErrorCode = extractXrpcErrorCode;
exports.extractPdsUrl = extractPdsUrl;
const lex_schema_1 = require("@atproto/lex-schema");
async function extractXrpcErrorCode(response) {
    const json = await peekJson(response, 10 * 1024); // Avoid reading large bodies
    if (json === undefined)
        return null;
    if (!lex_schema_1.lexErrorDataSchema.matches(json))
        return null;
    return json.error;
}
async function peekJson(response, maxSize = Infinity) {
    const type = extractType(response);
    if (type !== 'application/json')
        return undefined;
    const length = extractLength(response);
    if (length != null && length > maxSize)
        return undefined;
    try {
        return (await response.clone().json());
    }
    catch {
        return undefined;
    }
}
function extractLength({ headers }) {
    return headers.get('Content-Length')
        ? Number(headers.get('Content-Length'))
        : undefined;
}
function extractType({ headers }) {
    return headers.get('Content-Type')?.split(';')[0]?.trim().toLowerCase();
}
function extractPdsUrl(didDoc) {
    const pdsService = ifArray(didDoc?.service)?.find((service) => ifString(service?.id)?.endsWith('#atproto_pds'));
    const pdsEndpoint = ifString(pdsService?.serviceEndpoint);
    return pdsEndpoint && URL.canParse(pdsEndpoint) ? pdsEndpoint : null;
}
const ifString = (v) => (typeof v === 'string' ? v : undefined);
const ifArray = (v) => (Array.isArray(v) ? v : undefined);
//# sourceMappingURL=util.js.map
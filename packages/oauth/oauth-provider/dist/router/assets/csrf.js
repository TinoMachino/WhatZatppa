"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCsrfToken = setupCsrfToken;
exports.validateCsrfToken = validateCsrfToken;
exports.getCookieCsrf = getCookieCsrf;
exports.getHeadersCsrf = getHeadersCsrf;
const http_errors_1 = __importDefault(require("http-errors"));
const oauth_provider_api_1 = require("@atproto/oauth-provider-api");
const index_js_1 = require("../../lib/http/index.js");
const crypto_js_1 = require("../../lib/util/crypto.js");
const TOKEN_BYTE_LENGTH = 12;
const TOKEN_LENGTH = TOKEN_BYTE_LENGTH * 2; // 2 hex chars per byte
// @NOTE Cookie based CSRF protection is redundant with session cookies using
// `SameSite` and could probably be removed in the future.
const CSRF_COOKIE_OPTIONS = {
    expires: undefined, // "session" cookie
    secure: true,
    httpOnly: false, // Need to be accessible from JavaScript
    sameSite: 'lax',
    path: `/`,
};
async function generateCsrfToken() {
    return (0, crypto_js_1.randomHexId)(TOKEN_BYTE_LENGTH);
}
async function setupCsrfToken(req, res) {
    const token = getCookieCsrf(req) || (await generateCsrfToken());
    // Refresh cookie (See Chrome's "Lax+POST" behavior)
    (0, index_js_1.setCookie)(res, oauth_provider_api_1.CSRF_COOKIE_NAME, token, CSRF_COOKIE_OPTIONS);
}
async function validateCsrfToken(req, res) {
    const cookieValue = getCookieCsrf(req);
    const headerValue = getHeadersCsrf(req);
    // Refresh cookie (See Chrome's "Lax+POST" behavior), or set a new one,
    // allowing clients to retry with the new token.
    (0, index_js_1.setCookie)(res, oauth_provider_api_1.CSRF_COOKIE_NAME, cookieValue || (await generateCsrfToken()), CSRF_COOKIE_OPTIONS);
    if (!headerValue) {
        throw (0, http_errors_1.default)(400, `Missing CSRF header`);
    }
    if (!cookieValue) {
        throw (0, http_errors_1.default)(400, `Missing CSRF cookie`);
    }
    if (cookieValue !== headerValue) {
        throw (0, http_errors_1.default)(400, `CSRF mismatch`);
    }
}
function getCookieCsrf(req) {
    const cookieValue = (0, index_js_1.getCookie)(req, oauth_provider_api_1.CSRF_COOKIE_NAME);
    if (cookieValue?.length === TOKEN_LENGTH) {
        return cookieValue;
    }
    return undefined;
}
function getHeadersCsrf(req) {
    const headerValue = req.headers[oauth_provider_api_1.CSRF_HEADER_NAME];
    if (typeof headerValue === 'string' && headerValue.length === TOKEN_LENGTH) {
        return headerValue;
    }
    return undefined;
}
//# sourceMappingURL=csrf.js.map
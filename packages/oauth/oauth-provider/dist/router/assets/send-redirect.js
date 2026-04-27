"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_REDIRECT_KEYS = exports.SUCCESS_REDIRECT_KEYS = void 0;
exports.buildRedirectUri = buildRedirectUri;
exports.buildRedirectMode = buildRedirectMode;
exports.buildRedirectParams = buildRedirectParams;
exports.sendAuthorizationResultRedirect = sendAuthorizationResultRedirect;
exports.sendRedirect = sendRedirect;
const authorization_error_js_1 = require("../../errors/authorization-error.js");
const write_form_redirect_js_1 = require("../../lib/write-form-redirect.js");
// https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-7.5.4
const REDIRECT_STATUS_CODE = 303;
exports.SUCCESS_REDIRECT_KEYS = [
    'code',
    'id_token',
    'access_token',
    'expires_in',
    'token_type',
];
exports.ERROR_REDIRECT_KEYS = [
    'error',
    'error_description',
    'error_uri',
];
function buildRedirectUri(parameters) {
    const uri = parameters.redirect_uri;
    if (uri)
        return uri;
    throw new authorization_error_js_1.AuthorizationError(parameters, 'No redirect_uri', 'invalid_request');
}
function buildRedirectMode(parameters) {
    const mode = parameters.response_mode || 'query'; // @TODO default should depend on response_type
    return mode;
}
function buildRedirectParams(issuer, parameters, redirect) {
    const params = [
        ['iss', issuer], // rfc9207
    ];
    if (parameters.state != null) {
        params.push(['state', parameters.state]);
    }
    const keys = 'code' in redirect ? exports.SUCCESS_REDIRECT_KEYS : exports.ERROR_REDIRECT_KEYS;
    for (const key of keys) {
        const value = redirect[key];
        if (value != null)
            params.push([key, value]);
    }
    return params;
}
function sendAuthorizationResultRedirect(res, result, options) {
    const { issuer, parameters, redirect } = result;
    return sendRedirect(res, {
        redirectUri: buildRedirectUri(parameters),
        mode: buildRedirectMode(parameters),
        params: buildRedirectParams(issuer, parameters, redirect),
    }, options);
}
function sendRedirect(res, redirect, options) {
    res.setHeader('Cache-Control', 'no-store');
    const { mode, redirectUri: uri, params } = redirect;
    switch (mode) {
        case 'query':
            return writeQuery(res, uri, params);
        case 'fragment':
            return writeFragment(res, uri, params);
        case 'form_post':
            return (0, write_form_redirect_js_1.writeFormRedirect)(res, 'post', uri, params, options);
    }
    // @ts-expect-error fool proof
    throw new Error(`Unsupported mode: ${mode}`);
}
function writeQuery(res, uri, params) {
    const url = new URL(uri);
    for (const [key, value] of params)
        url.searchParams.set(key, value);
    res.writeHead(REDIRECT_STATUS_CODE, { Location: url.href }).end();
}
function writeFragment(res, uri, params) {
    const url = new URL(uri);
    const searchParams = new URLSearchParams();
    for (const [key, value] of params)
        searchParams.set(key, value);
    url.hash = searchParams.toString();
    res.writeHead(REDIRECT_STATUS_CODE, { Location: url.href }).end();
}
//# sourceMappingURL=send-redirect.js.map
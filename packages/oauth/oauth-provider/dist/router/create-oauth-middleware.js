"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOAuthMiddleware = createOAuthMiddleware;
const oauth_types_1 = require("@atproto/oauth-types");
const error_parser_js_1 = require("../errors/error-parser.js");
const invalid_client_error_js_1 = require("../errors/invalid-client-error.js");
const invalid_grant_error_js_1 = require("../errors/invalid-grant-error.js");
const invalid_request_error_js_1 = require("../errors/invalid-request-error.js");
const www_authenticate_error_js_1 = require("../errors/www-authenticate-error.js");
const index_js_1 = require("../lib/http/index.js");
const error_js_1 = require("../lib/util/error.js");
const oauth_errors_js_1 = require("../oauth-errors.js");
// CORS preflight
const corsHeaders = function (req, res, next) {
    res.setHeader('Access-Control-Max-Age', '86400'); // 1 day
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
    //
    // > For requests without credentials, the literal value "*" can be
    // > specified as a wildcard; the value tells browsers to allow
    // > requesting code from any origin to access the resource.
    // > Attempting to use the wildcard with credentials results in an
    // > error.
    //
    // A "*" is safer to use than reflecting the request origin.
    res.setHeader('Access-Control-Allow-Origin', '*');
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
    // > The value "*" only counts as a special wildcard value for
    // > requests without credentials (requests without HTTP cookies or
    // > HTTP authentication information). In requests with credentials,
    // > it is treated as the literal method name "*" without special
    // > semantics.
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,DPoP');
    next();
};
const corsPreflight = (0, index_js_1.combineMiddlewares)([
    corsHeaders,
    (req, res) => {
        res.writeHead(200).end();
    },
]);
function createOAuthMiddleware(server, { onError }) {
    const router = new index_js_1.Router(new URL(server.issuer));
    //- Public OAuth endpoints
    router.options('/.well-known/oauth-authorization-server', corsPreflight);
    router.get('/.well-known/oauth-authorization-server', corsHeaders, (0, index_js_1.cacheControlMiddleware)(300), (0, index_js_1.staticJsonMiddleware)(server.metadata));
    router.options('/oauth/jwks', corsPreflight);
    router.get('/oauth/jwks', corsHeaders, (0, index_js_1.cacheControlMiddleware)(300), (0, index_js_1.staticJsonMiddleware)(server.jwks));
    router.options('/oauth/par', corsPreflight);
    router.post('/oauth/par', corsHeaders, oauthHandler(async function (req) {
        const payload = await (0, index_js_1.parseHttpRequest)(req, ['json', 'urlencoded']);
        // https://datatracker.ietf.org/doc/html/rfc9126#name-error-response
        // https://datatracker.ietf.org/doc/html/rfc6749#autoid-56
        const credentials = await oauth_types_1.oauthClientCredentialsSchema
            .parseAsync(payload, { path: ['body'] })
            .catch((err) => throwInvalidClient(err, 'Client credentials missing'));
        const authorizationRequest = await oauth_types_1.oauthAuthorizationRequestParSchema
            .parseAsync(payload, { path: ['body'] })
            .catch((err) => throwInvalidRequest(err, 'Invalid authorization request'));
        const dpopProof = await server.checkDpopProof(req.method, this.url, req.headers);
        return server.pushedAuthorizationRequest(credentials, authorizationRequest, dpopProof);
    }, 201));
    // https://datatracker.ietf.org/doc/html/rfc9126#section-2.3
    // > If the request did not use the POST method, the authorization server
    // > responds with an HTTP 405 (Method Not Allowed) status code.
    router.all('/oauth/par', (req, res) => {
        res.writeHead(405).end();
    });
    router.options('/oauth/token', corsPreflight);
    router.post('/oauth/token', corsHeaders, oauthHandler(async function (req) {
        const payload = await (0, index_js_1.parseHttpRequest)(req, ['json', 'urlencoded']);
        const clientMetadata = await server.deviceManager.getRequestMetadata(req);
        const clientCredentials = await oauth_types_1.oauthClientCredentialsSchema
            .parseAsync(payload, { path: ['body'] })
            .catch((err) => throwInvalidGrant(err, 'Client credentials missing'));
        const tokenRequest = await oauth_types_1.oauthTokenRequestSchema
            .parseAsync(payload, { path: ['body'] })
            .catch((err) => throwInvalidGrant(err, 'Invalid request payload'));
        const dpopProof = await server.checkDpopProof(req.method, this.url, req.headers);
        return server.token(clientCredentials, clientMetadata, tokenRequest, dpopProof);
    }));
    router.options('/oauth/revoke', corsPreflight);
    router.post('/oauth/revoke', corsHeaders, oauthHandler(async function (req, res) {
        const payload = await (0, index_js_1.parseHttpRequest)(req, ['json', 'urlencoded']);
        const credentials = await oauth_types_1.oauthClientCredentialsSchema
            .parseAsync(payload, { path: ['body'] })
            .catch((err) => throwInvalidRequest(err, 'Client credentials missing'));
        const tokenIdentification = await oauth_types_1.oauthTokenIdentificationSchema
            .parseAsync(payload, { path: ['body'] })
            .catch((err) => throwInvalidRequest(err, 'Invalid request payload'));
        const dpopProof = await server.checkDpopProof(req.method, this.url, req.headers);
        try {
            await server.revoke(credentials, tokenIdentification, dpopProof);
        }
        catch (err) {
            // > Note: invalid tokens do not cause an error response since the
            // > client cannot handle such an error in a reasonable way.  Moreover,
            // > the purpose of the revocation request, invalidating the particular
            // > token, is already achieved.
            //
            // https://datatracker.ietf.org/doc/html/rfc7009#section-2.2
            onError?.(req, res, err, 'Failed to revoke token');
        }
        return {};
    }));
    return router.buildMiddleware();
    function oauthHandler(buildOAuthResponse, status) {
        return (0, index_js_1.jsonHandler)(async function (req, res) {
            try {
                // https://www.rfc-editor.org/rfc/rfc6749.html#section-5.1
                res.setHeader('Cache-Control', 'no-store');
                res.setHeader('Pragma', 'no-cache');
                // https://datatracker.ietf.org/doc/html/rfc9449#section-8.2
                const dpopNonce = server.nextDpopNonce();
                if (dpopNonce) {
                    const name = 'DPoP-Nonce';
                    res.setHeader(name, dpopNonce);
                    res.appendHeader('Access-Control-Expose-Headers', name);
                }
                const json = await buildOAuthResponse.call(this, req, res);
                return { json, status };
            }
            catch (err) {
                onError?.(req, res, err, err instanceof oauth_errors_js_1.OAuthError
                    ? `OAuth "${err.error}" error`
                    : 'Unexpected error');
                if (!res.headersSent && err instanceof www_authenticate_error_js_1.WWWAuthenticateError) {
                    const name = 'WWW-Authenticate';
                    res.setHeader(name, err.wwwAuthenticateHeader);
                    res.appendHeader('Access-Control-Expose-Headers', name);
                }
                const status = (0, error_parser_js_1.buildErrorStatus)(err);
                const json = (0, error_parser_js_1.buildErrorPayload)(err);
                return { json, status };
            }
        });
    }
}
function throwInvalidGrant(err, prefix) {
    throw new invalid_grant_error_js_1.InvalidGrantError((0, error_js_1.formatError)(err, prefix), err);
}
function throwInvalidClient(err, prefix) {
    throw new invalid_client_error_js_1.InvalidClientError((0, error_js_1.formatError)(err, prefix), err);
}
function throwInvalidRequest(err, prefix) {
    throw new invalid_request_error_js_1.InvalidRequestError((0, error_js_1.formatError)(err, prefix), err);
}
//# sourceMappingURL=create-oauth-middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorizationPageMiddleware = createAuthorizationPageMiddleware;
const oauth_types_1 = require("@atproto/oauth-types");
const authorization_error_js_1 = require("../errors/authorization-error.js");
const invalid_request_error_js_1 = require("../errors/invalid-request-error.js");
const index_js_1 = require("../lib/http/index.js");
const error_js_1 = require("../lib/util/error.js");
const write_form_redirect_js_1 = require("../lib/write-form-redirect.js");
const request_uri_js_1 = require("../request/request-uri.js");
const send_authorization_page_js_1 = require("./assets/send-authorization-page.js");
const send_cookie_error_page_js_1 = require("./assets/send-cookie-error-page.js");
const send_error_page_js_1 = require("./assets/send-error-page.js");
const send_redirect_js_1 = require("./assets/send-redirect.js");
const create_api_middleware_js_1 = require("./create-api-middleware.js");
function createAuthorizationPageMiddleware(server, { onError }) {
    const issuerUrl = new URL(server.issuer);
    const issuerOrigin = issuerUrl.origin;
    const securityOptions = {
        hsts: issuerUrl.protocol === 'http:' ? false : undefined,
    };
    const sendAuthorizePage = (0, send_authorization_page_js_1.sendAuthorizePageFactory)(server.customization, securityOptions);
    const sendErrorPage = (0, send_error_page_js_1.sendErrorPageFactory)(server.customization, securityOptions);
    const sendCookieErrorPage = (0, send_cookie_error_page_js_1.sendCookieErrorPageFactory)(server.customization, securityOptions);
    const router = new index_js_1.Router(issuerUrl);
    router.get('/oauth/authorize', withErrorHandler(async function (req, res) {
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        // "same-origin" is required to support the redirect test logic below (as
        // well as refreshing the authorization page).
        // @TODO Consider removing this altogether to allow hosting PDS and app on
        // the same site but different origins (different subdomains).
        (0, index_js_1.validateFetchSite)(req, ['same-origin', 'cross-site', 'none']);
        (0, index_js_1.validateFetchMode)(req, ['navigate']);
        (0, index_js_1.validateFetchDest)(req, ['document']);
        (0, index_js_1.validateOrigin)(req, issuerOrigin);
        // Do not perform any of the following logic if the request is invalid
        const query = parseOAuthAuthorizationRequestQuery(this.url);
        // @NOTE For some reason, even when loaded through a
        // ASWebAuthenticationSession, iOS will sometimes fail to properly save
        // cookies set during the rendering of the page. When this happens, the
        // authorization page logic, which relies on cookies to maintain the session,
        // will fail. To work around this, we perform an initial redirect to ourselves
        // using a form GET submit, in an attempt to verify if the browser saves
        // cookies on redirect or not. If it does, we proceed as normal. If it
        // doesn't, we redirect the user back to the client with an error message.
        if (
        // Only for iOS users
        req.headers['user-agent']?.includes('iPhone OS') &&
            // Disabled if the user already passed the test, which means their browser preserves cookies on redirect
            !((0, index_js_1.getCookie)(req, 'cookie-test') === 'succeeded') &&
            // Disabled if the user already has a session
            !(await server.deviceManager.hasSession(req))) {
            // @TODO Another possible solution would be to avoid relying on cookies if we
            // detect that they are not being preserved. This would mean that preserving
            // sessions (SSO) would not be possible for browsers that don't preserve
            // cookies on redirect, but at least the authorization request could still be
            // completed. This was not implemented yet due to the extra complexity
            // involved in supporting this.
            // 1) When the user first comes here, we will test if their browser
            // preserves cookies by redirecting back to ourselves
            if (!this.url.searchParams.has('redirect-test')) {
                // 2) Set a testing cookie
                (0, index_js_1.setCookie)(res, 'cookie-test', 'testing', {
                    sameSite: 'lax',
                    httpOnly: true,
                });
                // 3) And send an auto-submit form redirecting back to ourselves
                return (0, write_form_redirect_js_1.writeFormRedirect)(res, 'get', this.url.href, 
                // 4) We add an extra query parameter to trigger the test logic after
                // the redirect occurred.
                [...this.url.searchParams, ['redirect-test', '1']], securityOptions);
            }
            else {
                // 5) We just got redirected back to ourselves. Verify that the
                // browser preserved cookies during the redirect
                if ((0, index_js_1.getCookie)(req, 'cookie-test')) {
                    // 6) Success! The browser preserved cookies. Proceed with the
                    // normal authorization flow.
                    // 7) Set a long lasting cookie to skip the test next time
                    (0, index_js_1.setCookie)(res, 'cookie-test', 'succeeded', {
                        sameSite: 'lax',
                        maxAge: 31 * 24 * 60 * 60,
                        httpOnly: true,
                    });
                }
                else {
                    // The browser did NOT preserve cookies. We have to abort the
                    // authorization request.
                    if (this.url.searchParams.get('redirect-test') === '1') {
                        // 8) Show an error page to the user explaining the situation
                        // Give the browser another chance to save cookies after the use
                        // pressed "Continue"
                        (0, index_js_1.setCookie)(res, 'cookie-test', 'testing', {
                            sameSite: 'lax',
                            httpOnly: true,
                        });
                        // Make sure next time we reach the other branch and redirect back
                        // to the client
                        const continueUrl = new URL(this.url.href);
                        continueUrl.searchParams.set('redirect-test', '2');
                        return sendCookieErrorPage(req, res, { continueUrl });
                    }
                    else {
                        // 9) Once the use acknowledges the error, redirect them back to
                        // the client with an error message.
                        // Allow the client to understand what happened (the `error`
                        // response parameter value is constrained by the OAuth2 spec)
                        const message = 'ERR_COOKIES_UNSUPPORTED';
                        // @NOTE AuthorizationError thrown here will be caught by the
                        // error handler middleware defined below, and cause a redirect
                        // back to the client with the error parameters.
                        if ('request_uri' in query) {
                            // Load and delete the authorization request
                            const requestUri = (0, request_uri_js_1.parseRequestUri)(query.request_uri, {
                                path: ['query', 'request_uri'],
                            });
                            const data = await server.requestManager.get(requestUri, undefined, query.client_id);
                            await server.requestManager.delete(requestUri);
                            throw new authorization_error_js_1.AuthorizationError(data.parameters, message);
                        }
                        else if ('request' in query) {
                            const client = await server.clientManager.getClient(query.client_id);
                            const parameters = await server.decodeJAR(client, query);
                            throw new authorization_error_js_1.AuthorizationError(parameters, message);
                        }
                        else {
                            throw new authorization_error_js_1.AuthorizationError(query, message);
                        }
                    }
                }
            }
        }
        // Normal authorization flow
        const device = await server.deviceManager.load(req, res);
        const result = await server.authorize(query, device);
        if ('redirect' in result) {
            return (0, send_redirect_js_1.sendAuthorizationResultRedirect)(res, result, securityOptions);
        }
        else {
            return sendAuthorizePage(req, res, result);
        }
    }));
    // This is a private endpoint that will be called by the user after the
    // authorization request was either approved or denied. The logic performed
    // here **could** be performed directly in the frontend. We decided to
    // implement it here to avoid duplicating the logic.
    router.get('/oauth/authorize/redirect', withErrorHandler(async function (req, res) {
        // Ensure we come from the authorization page
        (0, index_js_1.validateFetchSite)(req, ['same-origin']);
        (0, index_js_1.validateFetchMode)(req, ['navigate']);
        (0, index_js_1.validateFetchDest)(req, ['document']);
        (0, index_js_1.validateOrigin)(req, issuerOrigin);
        const referrer = (0, index_js_1.validateReferrer)(req, {
            origin: issuerOrigin,
            pathname: '/oauth/authorize',
        });
        // Ensure we are coming from the authorization page
        request_uri_js_1.requestUriSchema.parse(referrer.searchParams.get('request_uri'));
        return (0, send_redirect_js_1.sendRedirect)(res, (0, create_api_middleware_js_1.parseRedirectUrl)(this.url), securityOptions);
    }));
    return router.buildMiddleware();
    function withErrorHandler(handler) {
        return async function (req, res) {
            try {
                await handler.call(this, req, res);
            }
            catch (err) {
                onError?.(req, res, err, `Authorization Request Error`);
                if (!res.headersSent) {
                    if (err instanceof authorization_error_js_1.AuthorizationError) {
                        return (0, send_redirect_js_1.sendAuthorizationResultRedirect)(res, {
                            issuer: server.issuer,
                            parameters: err.parameters,
                            redirect: err.toJSON(),
                        }, securityOptions);
                    }
                    else {
                        return sendErrorPage(req, res, err);
                    }
                }
                else if (!res.destroyed) {
                    res.end();
                }
            }
        };
    }
}
function parseOAuthAuthorizationRequestQuery(url) {
    const query = Object.fromEntries(url.searchParams);
    const result = oauth_types_1.oauthAuthorizationRequestQuerySchema.safeParse(query, {
        path: ['query'],
    });
    if (!result.success) {
        const message = 'Invalid request parameters';
        const err = result.error;
        throw new invalid_request_error_js_1.InvalidRequestError((0, error_js_1.formatError)(err, message), err);
    }
    return result.data;
}
//# sourceMappingURL=create-authorization-page-middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const oauth_provider_1 = require("@atproto/oauth-provider");
const logger_js_1 = require("./logger.js");
const createRouter = ({ oauthProvider, cfg }) => {
    const router = (0, express_1.Router)();
    const oauthProtectedResourceMetadata = oauth_provider_1.oauthProtectedResourceMetadataSchema.parse({
        resource: cfg.service.publicUrl,
        authorization_servers: [cfg.entryway?.url ?? cfg.service.publicUrl],
        bearer_methods_supported: ['header'],
        scopes_supported: [],
        resource_documentation: 'https://atproto.com',
    });
    if (!cfg.service.devMode &&
        !oauthProtectedResourceMetadata.resource.startsWith('https://')) {
        throw new Error('Resource URL must use the https scheme');
    }
    router.get('/.well-known/oauth-protected-resource', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.status(200).json(oauthProtectedResourceMetadata);
    });
    if (oauthProvider) {
        router.use((0, oauth_provider_1.oauthMiddleware)(oauthProvider, {
            onError: (req, res, err, msg) => {
                if (!ignoreError(err)) {
                    logger_js_1.oauthLogger.error({ err, req: (0, logger_js_1.reqSerializer)(req) }, msg);
                }
            },
        }));
    }
    return router;
};
exports.createRouter = createRouter;
function ignoreError(err) {
    if (err instanceof oauth_provider_1.InvalidRequestError) {
        return err.error_description === 'Invalid identifier or password';
    }
    return (err instanceof oauth_provider_1.UseDpopNonceError ||
        err instanceof oauth_provider_1.HandleUnavailableError ||
        err instanceof oauth_provider_1.SecondAuthenticationFactorRequiredError);
}
//# sourceMappingURL=auth-routes.js.map
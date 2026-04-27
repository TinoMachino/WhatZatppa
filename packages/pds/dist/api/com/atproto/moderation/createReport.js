"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_1 = require("@atproto/lex");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.moderation.createReport, {
        auth: ctx.authVerifier.authorization({
            additional: [auth_scope_1.AuthScope.Takendown],
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.com.atproto.moderation.createReport.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ auth, params, input: { body }, req }) => {
            const { url, did: aud } = await (0, pipethrough_1.parseProxyInfo)(ctx, req, index_js_1.com.atproto.moderation.createReport.$lxm);
            const { headers } = await ctx.serviceAuthHeaders(auth.credentials.did, aud, index_js_1.com.atproto.moderation.createReport.$lxm);
            return (0, lex_1.xrpc)(url, index_js_1.com.atproto.moderation.createReport, {
                validateRequest: ctx.cfg.service.devMode,
                validateResponse: ctx.cfg.service.devMode,
                strictResponseProcessing: ctx.cfg.service.devMode,
                headers,
                params,
                body,
            });
        },
    });
}
//# sourceMappingURL=createReport.js.map
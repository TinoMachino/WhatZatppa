"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const identity_1 = require("@atproto/identity");
const lex_1 = require("@atproto/lex");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const resolver_1 = require("../util/resolver");
function default_1(server, ctx) {
    const { bskyAppView } = ctx;
    if (!bskyAppView)
        return;
    server.add(index_js_1.app.bsky.notification.registerPush, {
        auth: ctx.authVerifier.authorization({
            additional: [auth_scope_1.AuthScope.SignupQueued],
            authorize: () => {
                // @NOTE this endpoint predates generic service proxying but we want to
                // map the permission to the "RPC" scope for consistency. However, since
                // the service info is only available in the request body, we can't
                // assert permissions here.
            },
        }),
        handler: async ({ auth, input: { body } }) => {
            const { serviceDid } = body;
            const { did } = auth.credentials;
            if (auth.credentials.type === 'oauth') {
                auth.credentials.permissions.assertRpc({
                    aud: `${serviceDid}#bsky_notif`,
                    lxm: index_js_1.app.bsky.notification.registerPush.$lxm,
                });
            }
            const { headers } = await ctx.serviceAuthHeaders(did, serviceDid, index_js_1.app.bsky.notification.registerPush.$lxm);
            if (bskyAppView.did === serviceDid) {
                await bskyAppView.client.call(index_js_1.app.bsky.notification.registerPush, body, { headers });
                return;
            }
            const notifEndpoint = await getEndpoint(ctx, serviceDid);
            await (0, lex_1.xrpc)(notifEndpoint, index_js_1.app.bsky.notification.registerPush, {
                validateRequest: ctx.cfg.service.devMode,
                validateResponse: ctx.cfg.service.devMode,
                strictResponseProcessing: ctx.cfg.service.devMode,
                body,
                headers,
            });
        },
    });
}
const getEndpoint = async (ctx, serviceDid) => {
    const doc = await (0, resolver_1.getDidDoc)(ctx, serviceDid);
    const notifEndpoint = (0, identity_1.getNotif)(doc);
    if (!notifEndpoint) {
        throw new xrpc_server_1.InvalidRequestError(`invalid notification service details in did document: ${serviceDid}`);
    }
    return notifEndpoint;
};
//# sourceMappingURL=registerPush.js.map
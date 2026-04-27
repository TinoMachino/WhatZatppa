"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    const { bskyAppView } = ctx;
    if (!bskyAppView)
        return;
    server.add(index_js_1.app.bsky.actor.getPreferences, {
        auth: ctx.authVerifier.authorization({
            additional: [auth_scope_1.AuthScope.Takendown],
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.actor.getPreferences.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ auth, req }) => {
            const { did } = auth.credentials;
            // If the request has a proxy header different from the bsky app view,
            // we need to proxy the request to the requested app view.
            // @TODO This behavior should not be implemented as part of the XRPC framework
            const lxm = index_js_1.app.bsky.actor.getPreferences.$lxm;
            const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
            if (aud !== `${bskyAppView.did}#bsky_appview`) {
                return (0, pipethrough_1.pipethrough)(ctx, req, { iss: did, aud, lxm });
            }
            const hasAccessFull = auth.credentials.type === 'access' &&
                (0, auth_scope_1.isAccessFull)(auth.credentials.scope);
            const preferences = await ctx.actorStore.read(did, (store) => {
                return store.pref.getPreferences('app.bsky', {
                    hasAccessFull,
                });
            });
            return {
                encoding: 'application/json',
                body: { preferences },
            };
        },
    });
}
//# sourceMappingURL=getPreferences.js.map
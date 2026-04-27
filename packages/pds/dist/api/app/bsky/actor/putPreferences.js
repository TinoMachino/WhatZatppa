"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    const { bskyAppView } = ctx;
    if (!bskyAppView)
        return;
    server.add(index_js_1.app.bsky.actor.putPreferences, {
        auth: ctx.authVerifier.authorization({
            checkTakedown: true,
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.actor.putPreferences.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ req, auth, input }) => {
            const { did } = auth.credentials;
            // If the request has a proxy header different from the bsky app view,
            // we need to proxy the request to the requested app view.
            // @TODO This behavior should not be implemented as part of the XRPC framework
            const lxm = index_js_1.app.bsky.actor.putPreferences.$lxm;
            const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
            if (aud !== `${bskyAppView.did}#bsky_appview`) {
                return (0, pipethrough_1.pipethrough)(ctx, req, { iss: did, aud, lxm });
            }
            const checkedPreferences = [];
            for (const pref of input.body.preferences) {
                if (typeof pref.$type === 'string') {
                    checkedPreferences.push(pref);
                }
                else {
                    throw new xrpc_server_1.InvalidRequestError('Preference is missing a $type');
                }
            }
            const hasAccessFull = auth.credentials.type === 'access' &&
                (0, auth_scope_1.isAccessFull)(auth.credentials.scope);
            await ctx.actorStore.transact(did, async (actorTxn) => {
                await actorTxn.pref.putPreferences(checkedPreferences, 'app.bsky', {
                    hasAccessFull,
                });
            });
        },
    });
}
//# sourceMappingURL=putPreferences.js.map
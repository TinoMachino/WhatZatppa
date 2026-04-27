"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lexicons_1 = require("../../../../lexicon/lexicons");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.com.para.actor.getProfileStats({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaActorGetProfileStats;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ auth, req }) => {
            return (0, pipethrough_1.pipethrough)(ctx, req, { iss: auth.credentials.did });
        },
    });
}
//# sourceMappingURL=getProfileStats.js.map
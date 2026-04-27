"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.labeler.getServices, {
        auth: ctx.authVerifier.standardOptional,
        handler: async ({ params, auth, req }) => {
            const { dids, detailed } = params;
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                viewer,
                labelers,
            });
            const hydration = await ctx.hydrator.hydrateLabelers(dids, hydrateCtx);
            const views = (0, common_1.mapDefined)(dids, (did) => {
                if (detailed) {
                    const view = ctx.views.labelerDetailed(did, hydration);
                    if (!view)
                        return;
                    return index_js_1.app.bsky.labeler.defs.labelerViewDetailed.$build(view);
                }
                else {
                    const view = ctx.views.labeler(did, hydration);
                    if (!view)
                        return;
                    return index_js_1.app.bsky.labeler.defs.labelerView.$build(view);
                }
            });
            return {
                encoding: 'application/json',
                body: {
                    views,
                },
                headers: (0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
//# sourceMappingURL=getServices.js.map
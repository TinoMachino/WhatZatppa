"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.unspecced.getAgeAssuranceState, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth }) => {
            const viewer = auth.credentials.iss;
            const actorInfo = await getAgeVerificationState(ctx, viewer);
            const lastInitiatedAt = actorInfo.ageAssuranceStatus?.lastInitiatedAt;
            return {
                encoding: 'application/json',
                body: {
                    lastInitiatedAt: lastInitiatedAt
                        ? lastInitiatedAt.toDate().toISOString()
                        : undefined,
                    status: actorInfo.ageAssuranceStatus?.status ?? 'unknown',
                },
            };
        },
    });
}
const getAgeVerificationState = async (ctx, actorDid) => {
    try {
        const res = await ctx.dataplane.getActors({
            dids: [actorDid],
            returnAgeAssuranceForDids: [actorDid],
            skipCacheForDids: [actorDid],
        });
        return res.actors[0];
    }
    catch (err) {
        throw new xrpc_server_1.UpstreamFailureError('Cannot get current age assurance state', 'GetAgeAssuranceStateFailed', { cause: err });
    }
};
//# sourceMappingURL=getAgeAssuranceState.js.map
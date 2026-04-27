"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.social.getPostMeta({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
            });
            const result = await getPostMeta({
                ctx,
                params: { ...params, hydrateCtx },
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({
                    repoRev,
                    labelers: hydrateCtx.labelers,
                }),
            };
        },
    });
}
const getPostMeta = async (inputs) => {
    const { ctx, params } = inputs;
    const post = await ctx.hydrator.resolveUri(params.post);
    const meta = await ctx.dataplane.getParaPostMeta({ postUri: post });
    if (!meta.post) {
        throw new xrpc_server_1.InvalidRequestError(`Post not found: ${post}`, 'NotFound');
    }
    const hydration = await ctx.hydrator.hydrateProfileViewers([meta.post.author], params.hydrateCtx);
    const shouldHide = ctx.views.viewerBlockExists(meta.post.author, hydration) ||
        ctx.views.viewerMuteExists(meta.post.author, hydration);
    if (shouldHide) {
        throw new xrpc_server_1.InvalidRequestError(`Post not found: ${post}`, 'NotFound');
    }
    const postType = asPostType(meta.post.postType);
    const interactionMode = asInteractionMode(meta.post.interactionMode);
    return {
        uri: meta.post.uri,
        postType,
        official: meta.post.official,
        party: (0, util_1.parseString)(meta.post.party),
        community: (0, util_1.parseString)(meta.post.community),
        category: (0, util_1.parseString)(meta.post.category),
        tags: meta.post.tags.length ? meta.post.tags : undefined,
        flairs: meta.post.flairs.length ? meta.post.flairs : undefined,
        voteScore: meta.post.voteScore,
        interactionMode,
        createdAt: (0, util_1.parseString)(meta.post.createdAt),
    };
};
const asPostType = (value) => {
    if (value === 'policy' || value === 'matter' || value === 'meme') {
        return value;
    }
    return undefined;
};
const asInteractionMode = (value) => {
    if (value === 'policy_ballot') {
        return 'policy_ballot';
    }
    return 'reddit_votes';
};
//# sourceMappingURL=getPostMeta.js.map
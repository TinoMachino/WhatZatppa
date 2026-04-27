"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const util_1 = require("../../../../data-plane/server/util");
const util_2 = require("../../../../hydration/util");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const uris_1 = require("../../../../util/uris");
const util_3 = require("../../../util");
function default_1(server, ctx) {
    const searchPosts = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocksOrTagged, presentation);
    server.add(index_js_1.app.bsky.feed.searchPosts, {
        auth: ctx.authVerifier.standardOptional,
        handler: async ({ auth, params, req }) => {
            const { viewer, isModService, skipViewerBlocks } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                skipViewerBlocks,
                features: ctx.featureGatesClient.scope(ctx.featureGatesClient.parseUserContextFromHandler({
                    viewer,
                    req,
                })),
            });
            const results = await searchPosts({ ...params, hydrateCtx, isModService }, ctx);
            return {
                encoding: 'application/json',
                body: results,
                headers: (0, util_3.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
const skeleton = async (inputs) => {
    const { ctx, params } = inputs;
    const parsedQuery = (0, util_1.parsePostSearchQuery)(params.q, {
        author: params.author,
    });
    if (ctx.searchClient) {
        // @NOTE cursors won't change on appview swap
        const res = await ctx.searchClient.call(index_js_1.app.bsky.unspecced.searchPostsSkeleton, {
            q: params.q,
            cursor: params.cursor,
            limit: params.limit,
            author: params.author,
            domain: params.domain,
            lang: params.lang,
            mentions: params.mentions,
            since: params.since,
            sort: params.sort,
            tag: params.tag,
            until: params.until,
            url: params.url,
            viewer: params.hydrateCtx.viewer ?? undefined,
        });
        return {
            posts: res.posts.map(({ uri }) => uri),
            cursor: (0, util_2.parseString)(res.cursor),
            parsedQuery,
        };
    }
    const res = await ctx.dataplane.searchPosts({
        term: params.q,
        limit: params.limit,
        cursor: params.cursor,
    });
    return {
        posts: res.uris,
        cursor: (0, util_2.parseString)(res.cursor),
        parsedQuery,
    };
};
const hydration = async (inputs) => {
    const { ctx, params, skeleton } = inputs;
    return ctx.hydrator.hydratePosts(skeleton.posts.map((uri) => ({ uri })), params.hydrateCtx, undefined, {
        processDynamicTagsForView: params.hydrateCtx.features?.checkGate(params.hydrateCtx.features.Gate.SearchFilteringExplorationEnable)
            ? 'search'
            : undefined,
    });
};
const noBlocksOrTagged = (inputs) => {
    const { ctx, params, skeleton, hydration } = inputs;
    const { parsedQuery } = skeleton;
    skeleton.posts = skeleton.posts.filter((uri) => {
        const post = hydration.posts?.get(uri);
        if (!post)
            return;
        const creator = (0, uris_1.uriToDid)(uri);
        const isCuratedSearch = params.sort === 'top';
        const isPostByViewer = creator === params.hydrateCtx.viewer;
        // Cases to always show.
        if (isPostByViewer)
            return true;
        if (params.isModService)
            return true;
        // Cases to never show.
        if (ctx.views.viewerBlockExists(creator, hydration))
            return false;
        let tagged = false;
        if (params.hydrateCtx.features?.checkGate(params.hydrateCtx.features.Gate.SearchFilteringExplorationEnable)) {
            tagged = post.tags.has(ctx.cfg.visibilityTagHide);
        }
        else {
            tagged = [...ctx.cfg.searchTagsHide].some((t) => post.tags.has(t));
        }
        // Cases to conditionally show based on tagging.
        if (isCuratedSearch && tagged)
            return false;
        if (!parsedQuery.author && tagged)
            return false;
        return true;
    });
    return skeleton;
};
const presentation = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    const posts = (0, common_1.mapDefined)(skeleton.posts, (uri) => {
        const post = hydration.posts?.get(uri);
        if (!post)
            return;
        return ctx.views.post(uri, hydration);
    });
    return {
        posts,
        cursor: skeleton.cursor,
        hitsTotal: skeleton.hitsTotal,
    };
};
//# sourceMappingURL=searchPosts.js.map
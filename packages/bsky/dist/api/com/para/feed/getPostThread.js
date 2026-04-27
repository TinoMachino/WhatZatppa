"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
const DEFAULT_DEPTH = 6;
const DEFAULT_PARENT_HEIGHT = 80;
function default_1(server, ctx) {
    server.com.para.feed.getPostThread({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
            });
            const result = await getPostThread({
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
const getPostThread = async (inputs) => {
    const { ctx, params } = inputs;
    const anchor = await ctx.hydrator.resolveUri(params.uri);
    const depth = params.depth ?? DEFAULT_DEPTH;
    const parentHeight = params.parentHeight ?? DEFAULT_PARENT_HEIGHT;
    const thread = await ctx.dataplane.getParaThread({
        postUri: anchor,
        above: parentHeight,
        below: depth,
    });
    if (!thread.post) {
        throw new xrpc_server_1.InvalidRequestError(`Post not found: ${anchor}`, 'NotFound');
    }
    const authors = [
        thread.post.author,
        ...thread.parents.map((item) => item.author),
        ...thread.replies.map((item) => item.author),
    ];
    const hydration = await ctx.hydrator.hydrateProfileViewers([...new Set(authors)], params.hydrateCtx);
    const shouldHide = (authorDid) => {
        return (ctx.views.viewerBlockExists(authorDid, hydration) ||
            ctx.views.viewerMuteExists(authorDid, hydration));
    };
    if (shouldHide(thread.post.author)) {
        throw new xrpc_server_1.InvalidRequestError(`Post not found: ${anchor}`, 'NotFound');
    }
    const rootUri = thread.post.replyRoot ?? thread.post.uri;
    const isOnRoot = (item) => item.uri === rootUri || item.replyRoot === rootUri;
    return {
        post: mapPost(thread.post),
        parents: thread.parents
            .filter((item) => isOnRoot(item) && !shouldHide(item.author))
            .map(mapPost),
        replies: thread.replies
            .filter((item) => isOnRoot(item) && !shouldHide(item.author))
            .map(mapPost),
    };
};
const mapPost = (item) => ({
    uri: item.uri,
    cid: item.cid,
    author: item.author,
    text: item.text,
    createdAt: item.createdAt,
    replyRoot: (0, util_1.parseString)(item.replyRoot),
    replyParent: (0, util_1.parseString)(item.replyParent),
    langs: item.langs.length ? item.langs : undefined,
    tags: item.tags.length ? item.tags : undefined,
    flairs: item.flairs.length ? item.flairs : undefined,
    postType: (0, util_1.parseString)(item.postType),
});
//# sourceMappingURL=getPostThread.js.map
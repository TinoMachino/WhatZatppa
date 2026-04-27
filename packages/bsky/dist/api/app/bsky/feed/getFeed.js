"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const xrpc_server_1 = require("@atproto/xrpc-server");
const data_plane_1 = require("../../../../data-plane");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getFeed = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocksOrMutes, presentation);
    server.add(index_js_1.app.bsky.feed.getFeed, {
        auth: ctx.authVerifier.standardOptionalParameterized({
            lxmCheck: (method) => {
                return (method === index_js_1.app.bsky.feed.getFeedSkeleton.$lxm ||
                    method === index_js_1.app.bsky.feed.getFeed.$lxm);
            },
            skipAudCheck: true,
        }),
        handler: async ({ params, auth, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({ labelers, viewer });
            const headers = (0, common_1.noUndefinedVals)({
                'user-agent': util_1.BSKY_USER_AGENT,
                authorization: req.headers['authorization'],
                'accept-language': req.headers['accept-language'],
                'x-bsky-topics': Array.isArray(req.headers['x-bsky-topics'])
                    ? req.headers['x-bsky-topics'].join(',')
                    : req.headers['x-bsky-topics'],
            });
            // @NOTE feed cursors should not be affected by appview swap
            const { timerSkele, timerHydr, resHeaders: feedResHeaders, ...result } = await getFeed({ ...params, hydrateCtx, headers }, ctx);
            return {
                encoding: 'application/json',
                body: result,
                headers: {
                    ...feedResHeaders,
                    ...(0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
                    'server-timing': (0, xrpc_server_1.serverTimingHeader)([timerSkele, timerHydr]),
                },
            };
        },
    });
}
const skeleton = async (inputs) => {
    const { ctx, params } = inputs;
    const timerSkele = new xrpc_server_1.ServerTimer('skele').start();
    const { feedItems: algoItems, reqId, cursor, resHeaders, ...passthrough } = await skeletonFromFeedGen(ctx, params);
    return {
        cursor,
        items: algoItems,
        reqId,
        timerSkele: timerSkele.stop(),
        timerHydr: new xrpc_server_1.ServerTimer('hydr').start(),
        resHeaders,
        passthrough,
    };
};
const hydration = async (inputs) => {
    const { ctx, params, skeleton } = inputs;
    const timerHydr = new xrpc_server_1.ServerTimer('hydr').start();
    const hydration = await ctx.hydrator.hydrateFeedItems(skeleton.items, params.hydrateCtx);
    skeleton.timerHydr = timerHydr.stop();
    return hydration;
};
const noBlocksOrMutes = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    skeleton.items = skeleton.items.filter((item) => {
        const bam = ctx.views.feedItemBlocksAndMutes(item, hydration);
        return (!bam.authorBlocked &&
            !bam.authorMuted &&
            !bam.originatorBlocked &&
            !bam.originatorMuted &&
            !bam.ancestorAuthorBlocked);
    });
    return skeleton;
};
const presentation = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    const feed = (0, common_1.mapDefined)(skeleton.items, (item) => {
        const post = ctx.views.feedViewPost(item, hydration);
        if (!post)
            return;
        return {
            ...post,
            feedContext: item.feedContext,
        };
    });
    return {
        feed: feed.map((fi) => ({ ...fi, reqId: skeleton.reqId })),
        cursor: skeleton.cursor,
        timerSkele: skeleton.timerSkele,
        timerHydr: skeleton.timerHydr,
        resHeaders: skeleton.resHeaders,
        ...skeleton.passthrough,
    };
};
const skeletonFromFeedGen = async (ctx, params) => {
    const { feed, headers } = params;
    const found = await ctx.hydrator.feed.getFeedGens([feed], true);
    const feedDid = found.get(feed)?.record.did;
    if (!feedDid) {
        throw new xrpc_server_1.InvalidRequestError('could not find feed');
    }
    let identity;
    try {
        identity = await ctx.dataplane.getIdentityByDid({ did: feedDid });
    }
    catch (err) {
        if ((0, data_plane_1.isDataplaneError)(err, data_plane_1.Code.NotFound)) {
            throw new xrpc_server_1.InvalidRequestError(`could not resolve identity: ${feedDid}`);
        }
        throw err;
    }
    const services = (0, data_plane_1.unpackIdentityServices)(identity.services);
    const fgEndpoint = (0, data_plane_1.getServiceEndpoint)(services, {
        id: 'bsky_fg',
        type: 'BskyFeedGenerator',
    });
    if (!fgEndpoint) {
        throw new xrpc_server_1.InvalidRequestError(`invalid feed generator service details in did document: ${feedDid}`);
    }
    // @TODO currently passthrough auth headers from pds
    const result = await (0, lex_1.xrpcSafe)(fgEndpoint, index_js_1.app.bsky.feed.getFeedSkeleton, {
        strictResponseProcessing: false,
        headers,
        params: {
            feed: params.feed,
            // The feedgen is not guaranteed to honor the limit, but we try it.
            limit: params.limit,
            cursor: params.cursor,
        },
    });
    if (!result.success) {
        const cause = result.reason;
        // Pass through structurally valid XRPC error response (4xx/5xx), such as
        // auth errors
        if (cause instanceof lex_1.XrpcResponseError) {
            const { status, body } = cause.toDownstreamError();
            throw new xrpc_server_1.XRPCError(status, body.message, body.error, { cause });
        }
        // The response does not match the schema
        if (cause instanceof lex_1.XrpcInvalidResponseError) {
            throw new xrpc_server_1.UpstreamFailureError('feed provided an invalid response', 'InvalidFeedResponse', { cause });
        }
        // Typically a network error.
        throw new xrpc_server_1.UpstreamFailureError('feed unavailable', undefined, { cause });
    }
    const { feed: feedSkele, cursor, ...skele } = result.body;
    const feedItems = feedSkele.slice(0, params.limit).map((item) => ({
        post: { uri: item.post },
        repost: item.reason != null &&
            index_js_1.app.bsky.feed.defs.skeletonReasonRepost.$isTypeOf(item.reason)
            ? { uri: item.reason.repost }
            : undefined,
        feedContext: item.feedContext,
    }));
    const contentLang = result.headers.get('content-language');
    return {
        ...skele,
        resHeaders: contentLang ? { 'content-language': contentLang } : undefined,
        feedItems,
        // Prevents loops if the custom feed echoes the input cursor back.
        cursor: cursor === params.cursor ? undefined : cursor,
    };
};
//# sourceMappingURL=getFeed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const cid_1 = require("multiformats/cid");
const syntax_1 = require("@atproto/syntax");
const lexicon_1 = require("@atproto/lexicon");
const logger_1 = require("../../../../logger");
const lexicons_1 = require("../../../../lexicon/lexicons");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
const util_1 = require("./util");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.com.para.feed.getPosts({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaFeedGetPosts;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async (reqCtx) => {
            const uris = Array.isArray(reqCtx.params.uris)
                ? reqCtx.params.uris
                : [reqCtx.params.uris];
            const pipethroughRes = await (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.com.para.feed.getPosts.main, (_, original, local) => getPostsMunge(original, local, uris));
            if (!('stream' in pipethroughRes)) {
                return pipethroughRes;
            }
            const requester = reqCtx.auth.credentials.did;
            const fallbackDid = await resolveFallbackDid(ctx, requester, uris);
            const local = await ctx.actorStore.read(fallbackDid, (store) => getRequestedLocalPosts(store, uris));
            if (local.count === 0) {
                return pipethroughRes;
            }
            if ((0, pipethrough_1.isJsonContentType)(pipethroughRes.headers?.['content-type']) === false) {
                return pipethroughRes;
            }
            let bufferRes;
            try {
                const { buffer } = (bufferRes = await (0, pipethrough_1.asPipeThroughBuffer)(pipethroughRes));
                const lex = (0, lexicon_1.jsonToLex)(JSON.parse(buffer.toString('utf8')));
                const original = lex;
                const data = await getPostsMunge(original, local, uris);
                return (0, read_after_write_1.formatMungedResponse)(data, (0, read_after_write_1.getLocalLag)(local));
            }
            catch (err) {
                logger_1.readStickyLogger.warn({ err, requester }, 'error in para getPosts read-after-write');
                return bufferRes ?? pipethroughRes;
            }
        },
    });
}
const getPostsMunge = async (original, local, requestedUris) => {
    const requested = new Set(requestedUris);
    const postsByUri = new Map(original.posts.map((post) => [post.uri, post]));
    for (const post of local.paraPosts) {
        const uri = post.uri.toString();
        if (!requested.has(uri) || postsByUri.has(uri))
            continue;
        postsByUri.set(uri, (0, util_1.toPostView)(post));
    }
    const posts = requestedUris
        .map((uri) => postsByUri.get(uri))
        .filter((post) => post !== undefined);
    return {
        ...original,
        posts,
    };
};
const getRequestedLocalPosts = async (store, requestedUris) => {
    const seen = new Set();
    const paraPosts = [];
    for (const uri of requestedUris) {
        if (seen.has(uri))
            continue;
        seen.add(uri);
        let parsed;
        try {
            parsed = new syntax_1.AtUri(uri);
        }
        catch {
            continue;
        }
        if (parsed.collection !== lexicons_1.ids.ComParaPost) {
            continue;
        }
        const record = await store.record.getRecord(parsed, null);
        if (!record)
            continue;
        paraPosts.push({
            uri: parsed,
            cid: cid_1.CID.parse(record.cid),
            indexedAt: record.indexedAt,
            record: record.value,
        });
    }
    return {
        count: paraPosts.length,
        profile: null,
        posts: [],
        paraPosts,
    };
};
const resolveFallbackDid = async (ctx, requester, requestedUris) => {
    for (const uri of requestedUris) {
        let parsed;
        try {
            parsed = new syntax_1.AtUri(uri);
        }
        catch {
            continue;
        }
        if (parsed.collection !== lexicons_1.ids.ComParaPost)
            continue;
        if (parsed.hostname.startsWith('did:'))
            return parsed.hostname;
        const did = await ctx.accountManager.getDidForActor(parsed.hostname);
        if (did)
            return did;
    }
    return requester;
};
//# sourceMappingURL=getPosts.js.map
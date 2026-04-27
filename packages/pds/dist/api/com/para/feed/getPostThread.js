"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const syntax_1 = require("@atproto/syntax");
const cid_1 = require("multiformats/cid");
const lexicons_1 = require("../../../../lexicon/lexicons");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
const util_1 = require("./util");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.com.para.feed.getPostThread({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaFeedGetPostThread;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async (reqCtx) => {
            try {
                return await (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.com.para.feed.getPostThread.main, getPostThreadMunge);
            }
            catch (err) {
                const isNotFound = err instanceof pipethrough_1.PipethroughUpstreamError &&
                    (err.error === 'NotFound' ||
                        err.status === 400 ||
                        err.status === 404);
                if (!isNotFound) {
                    throw err;
                }
                const rev = err.headers && (0, read_after_write_1.getRepoRev)(err.headers);
                const requester = reqCtx.auth.credentials.did;
                const resolvedUri = await (0, util_1.resolveDidUri)(ctx, reqCtx.params.uri);
                if (resolvedUri.hostname !== requester)
                    throw err;
                const local = await ctx.actorStore.read(requester, async (store) => {
                    if (rev) {
                        const records = await store.record.getRecordsSinceRev(rev);
                        const fromRev = readAfterWriteNotFound(records, resolvedUri.toString());
                        if (fromRev)
                            return fromRev;
                    }
                    return readAfterWriteNotFoundNoRev(store, resolvedUri.toString());
                });
                if (!local)
                    throw err;
                return (0, read_after_write_1.formatMungedResponse)(local.data, local.lag);
            }
        },
    });
}
const getPostThreadMunge = async (_localViewer, original, local) => {
    if (local.paraPosts.length === 0)
        return original;
    const byUri = new Map(local.paraPosts.map((post) => [post.uri.toString(), post]));
    const seen = new Set([
        original.post.uri,
        ...original.parents.map((post) => post.uri),
        ...original.replies.map((post) => post.uri),
    ]);
    const localAnchor = byUri.get(original.post.uri);
    const post = localAnchor ? (0, util_1.toPostView)(localAnchor) : original.post;
    const parentsToAdd = [];
    let nextParent = original.post.replyParent;
    while (nextParent && !seen.has(nextParent)) {
        const parent = byUri.get(nextParent);
        if (!parent)
            break;
        const parentView = (0, util_1.toPostView)(parent);
        parentsToAdd.unshift(parentView);
        seen.add(parentView.uri);
        nextParent = parent.record.reply?.parent.uri;
    }
    const rootUri = original.post.replyRoot ?? original.post.uri;
    const replies = [...original.replies];
    for (const localPost of local.paraPosts) {
        const uri = localPost.uri.toString();
        if (seen.has(uri) || uri === original.post.uri)
            continue;
        if (localPost.record.reply?.root.uri !== rootUri)
            continue;
        replies.push((0, util_1.toPostView)(localPost));
        seen.add(uri);
    }
    replies.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return {
        ...original,
        post,
        parents: [...parentsToAdd, ...original.parents],
        replies,
    };
};
const readAfterWriteNotFound = (local, uri) => {
    const anchor = local.paraPosts.find((post) => post.uri.toString() === uri);
    if (!anchor)
        return null;
    const byUri = new Map(local.paraPosts.map((post) => [post.uri.toString(), post]));
    const post = (0, util_1.toPostView)(anchor);
    const parents = [];
    let nextParent = anchor.record.reply?.parent.uri;
    while (nextParent) {
        const parent = byUri.get(nextParent);
        if (!parent)
            break;
        parents.unshift((0, util_1.toPostView)(parent));
        nextParent = parent.record.reply?.parent.uri;
    }
    const rootUri = post.replyRoot ?? post.uri;
    const replies = local.paraPosts
        .filter((post) => post.uri.toString() !== uri)
        .filter((post) => post.record.reply?.root.uri === rootUri)
        .map(util_1.toPostView)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return {
        data: {
            post,
            parents,
            replies,
        },
        lag: (0, read_after_write_1.getLocalLag)(local),
    };
};
const readAfterWriteNotFoundNoRev = async (store, uri) => {
    const anchorUri = new syntax_1.AtUri(uri);
    const anchor = await store.record.getRecord(anchorUri, null);
    if (!anchor || anchorUri.collection !== lexicons_1.ids.ComParaPost)
        return null;
    const anchorDescript = {
        uri: anchorUri,
        cid: cid_1.CID.parse(anchor.cid),
        indexedAt: anchor.indexedAt,
        record: anchor.value,
    };
    const all = await store.record.listRecordsForCollection({
        collection: lexicons_1.ids.ComParaPost,
        limit: 1000,
        reverse: false,
    });
    const byUri = new Map(all.map((record) => [record.uri, record]));
    const parentUris = [];
    let nextParent = anchorDescript.record.reply?.parent.uri;
    while (nextParent) {
        const parent = byUri.get(nextParent);
        if (!parent)
            break;
        parentUris.unshift(nextParent);
        nextParent = parent.value.reply?.parent.uri;
    }
    const rootUri = anchorDescript.record.reply?.root.uri ?? uri;
    const asRecordDescript = (record) => ({
        uri: new syntax_1.AtUri(record.uri),
        cid: cid_1.CID.parse(record.cid),
        indexedAt: anchorDescript.indexedAt,
        record: record.value,
    });
    const replies = all
        .filter((record) => record.uri !== uri)
        .filter((record) => record.value.reply?.root.uri === rootUri)
        .map((record) => (0, util_1.toPostView)(asRecordDescript(record)))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const lag = Date.now() - new Date(anchorDescript.indexedAt).getTime();
    return {
        data: {
            post: (0, util_1.toPostView)(anchorDescript),
            parents: parentUris
                .map((parentUri) => byUri.get(parentUri))
                .filter((record) => record !== undefined)
                .map((record) => (0, util_1.toPostView)(asRecordDescript(record))),
            replies,
        },
        lag,
    };
};
//# sourceMappingURL=getPostThread.js.map
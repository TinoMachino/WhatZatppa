"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_assert_1 = __importDefault(require("node:assert"));
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.add(index_js_1.app.bsky.feed.getPostThread, {
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.feed.getPostThread.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        opts: {
            // @TODO remove after grace period has passed, behavior is non-standard.
            // temporarily added for compat w/ previous version of xrpc-server to avoid breakage of a few specified parties.
            paramsParseLoose: true,
        },
        handler: async (reqCtx) => {
            try {
                return await (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.app.bsky.feed.getPostThread, getPostThreadMunge);
            }
            catch (err) {
                if (err instanceof pipethrough_1.PipethroughUpstreamError &&
                    err.error === 'NotFound') {
                    const { auth, params } = reqCtx;
                    const requester = auth.credentials.did;
                    const rev = err.headers?.['atproto-repo-rev'];
                    if (!rev)
                        throw err;
                    const uri = new syntax_1.AtUri(params.uri);
                    if (!uri.hostname.startsWith('did:') &&
                        (0, lex_1.isHandleString)(uri.hostname)) {
                        const account = await ctx.accountManager.getAccount(uri.hostname);
                        if (account) {
                            uri.hostname = account.did;
                        }
                    }
                    if (uri.hostname !== requester)
                        throw err;
                    const local = await ctx.actorStore.read(requester, (store) => {
                        const localViewer = ctx.localViewer(store);
                        return readAfterWriteNotFound(ctx, localViewer, params, requester, rev, uri);
                    });
                    if (local === null) {
                        throw err;
                    }
                    else {
                        return (0, read_after_write_1.formatMungedResponse)(local.data, local.lag);
                    }
                }
                else {
                    throw err;
                }
            }
        },
    });
}
// READ AFTER WRITE
// ----------------
const getPostThreadMunge = async (localViewer, original, local) => {
    // @TODO if is NotFoundPost, handle similarly to error
    // @NOTE not necessary right now as we never return those for the requested uri
    if (!index_js_1.app.bsky.feed.defs.threadViewPost.$isTypeOf(original.thread)) {
        return original;
    }
    const thread = await addPostsToThread(localViewer, original.thread, local.posts);
    return {
        ...original,
        thread,
    };
};
const addPostsToThread = async (localViewer, original, posts) => {
    const inThread = findPostsInThread(original, posts);
    if (inThread.length === 0)
        return original;
    let thread = original;
    for (const record of inThread) {
        thread = await insertIntoThreadReplies(localViewer, thread, record);
    }
    return thread;
};
const findPostsInThread = (thread, posts) => {
    return posts.filter((post) => {
        const rootUri = post.record.reply?.root.uri;
        if (!rootUri)
            return false;
        if (rootUri === thread.post.uri)
            return true;
        return (thread.post.record.reply?.root.uri ===
            rootUri);
    });
};
const insertIntoThreadReplies = async (localViewer, view, descript) => {
    if (descript.record.reply?.parent.uri === view.post.uri) {
        const postView = await threadPostView(localViewer, descript);
        if (!postView)
            return view;
        const replies = [postView, ...(view.replies ?? [])];
        return {
            ...view,
            replies,
        };
    }
    if (!view.replies)
        return view;
    const replies = await Promise.all(view.replies.map(async (reply) => index_js_1.app.bsky.feed.defs.threadViewPost.$isTypeOf(reply)
        ? await insertIntoThreadReplies(localViewer, reply, descript)
        : reply));
    return {
        ...view,
        replies,
    };
};
const threadPostView = async (localViewer, descript) => {
    const postView = await localViewer.getPost(descript);
    if (!postView)
        return null;
    return index_js_1.app.bsky.feed.defs.threadViewPost.$build({
        post: postView,
    });
};
// Read after write on error
// ---------------------
const readAfterWriteNotFound = async (ctx, localViewer, params, requester, rev, resolvedUri) => {
    if (resolvedUri.hostname !== requester) {
        return null;
    }
    const local = await localViewer.getRecordsSinceRev(rev);
    const found = local.posts.find((p) => p.uri.toString() === resolvedUri.toString());
    if (!found)
        return null;
    let thread = await threadPostView(localViewer, found);
    if (!thread)
        return null;
    const rest = local.posts.filter((p) => p.uri.toString() !== resolvedUri.toString());
    thread = await addPostsToThread(localViewer, thread, rest);
    const highestParent = getHighestParent(thread);
    if (highestParent) {
        try {
            (0, node_assert_1.default)(ctx.bskyAppView);
            const parentsRes = await ctx.bskyAppView.client.call(index_js_1.app.bsky.feed.getPostThread, { uri: highestParent, parentHeight: params.parentHeight, depth: 0 }, await ctx.appviewAuthHeaders(requester, index_js_1.app.bsky.feed.getPostThread.$lxm));
            thread.parent = parentsRes.thread;
        }
        catch (err) {
            // do nothing
        }
    }
    return {
        data: {
            thread,
        },
        lag: (0, read_after_write_1.getLocalLag)(local),
    };
};
const getHighestParent = (thread) => {
    while (thread.parent &&
        index_js_1.app.bsky.feed.defs.threadViewPost.$isTypeOf(thread.parent)) {
        thread = thread.parent;
    }
    // @NOTE we might get away with type casting here, but being safe to avoid
    // potential issues
    if (!index_js_1.app.bsky.feed.post.$matches(thread.post.record)) {
        return undefined;
    }
    return thread.post.record.reply?.parent.uri;
};
//# sourceMappingURL=getPostThread.js.map
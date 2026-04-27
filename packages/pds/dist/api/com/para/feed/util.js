"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDidUri = exports.resolveLocalActorDid = exports.insertLocalPostsInFeed = exports.toPostView = void 0;
// @ts-nocheck
const syntax_1 = require("@atproto/syntax");
const toPostView = (descript) => {
    const { uri, cid, record } = descript;
    return {
        uri: uri.toString(),
        cid: cid.toString(),
        author: uri.host,
        text: record.text,
        createdAt: record.createdAt,
        replyRoot: record.reply?.root.uri,
        replyParent: record.reply?.parent.uri,
        langs: record.langs?.length ? record.langs : undefined,
        tags: record.tags?.length ? record.tags : undefined,
        flairs: record.flairs?.length ? record.flairs : undefined,
        postType: record.postType,
    };
};
exports.toPostView = toPostView;
const insertLocalPostsInFeed = (feed, paraPosts) => {
    if (paraPosts.length === 0)
        return feed;
    const urisInFeed = new Set(feed.map((item) => item.uri));
    const lastCreatedAt = feed.at(-1)?.createdAt ?? new Date(0).toISOString();
    const local = paraPosts
        .filter((post) => post.record.createdAt > lastCreatedAt)
        .map(exports.toPostView)
        .filter((post) => !urisInFeed.has(post.uri))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    for (const post of local) {
        const idx = feed.findIndex((item) => item.createdAt < post.createdAt);
        if (idx >= 0) {
            feed.splice(idx, 0, post);
        }
        else {
            feed.push(post);
        }
        urisInFeed.add(post.uri);
    }
    return feed;
};
exports.insertLocalPostsInFeed = insertLocalPostsInFeed;
const resolveLocalActorDid = async (ctx, actor) => {
    if (actor.startsWith('did:'))
        return actor;
    return (await ctx.accountManager.getDidForActor(actor)) ?? undefined;
};
exports.resolveLocalActorDid = resolveLocalActorDid;
const resolveDidUri = async (ctx, uri) => {
    const resolved = new syntax_1.AtUri(uri);
    if (resolved.hostname.startsWith('did:'))
        return resolved;
    const account = await ctx.accountManager.getAccount(resolved.hostname);
    if (account) {
        resolved.hostname = account.did;
    }
    return resolved;
};
exports.resolveDidUri = resolveDidUri;
//# sourceMappingURL=util.js.map
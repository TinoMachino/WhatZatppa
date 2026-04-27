"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalViewer = void 0;
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../lexicons/index.js");
class LocalViewer {
    constructor(actorStoreReader, accountManager, imageUrlBuilder, bskyAppView) {
        Object.defineProperty(this, "actorStoreReader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: actorStoreReader
        });
        Object.defineProperty(this, "accountManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: accountManager
        });
        Object.defineProperty(this, "imageUrlBuilder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: imageUrlBuilder
        });
        Object.defineProperty(this, "bskyAppView", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bskyAppView
        });
    }
    get did() {
        return this.actorStoreReader.did;
    }
    static creator(accountManager, imageUrlBuilder, bskyAppView) {
        return (actorStore) => new LocalViewer(actorStore, accountManager, imageUrlBuilder, bskyAppView);
    }
    getImageUrl(pattern, cid) {
        return this.imageUrlBuilder.build(pattern, this.did, cid);
    }
    async serviceAuthHeaders(did, lxm) {
        if (!this.bskyAppView) {
            throw new Error('Could not find bsky appview did');
        }
        const keypair = await this.actorStoreReader.keypair();
        return (0, xrpc_server_1.createServiceAuthHeaders)({
            iss: did,
            aud: this.bskyAppView.did,
            lxm,
            keypair,
        });
    }
    async getRecordsSinceRev(rev) {
        return this.actorStoreReader.record.getRecordsSinceRev(rev);
    }
    async getProfileBasic() {
        const [profileRes, accountRes] = await Promise.all([
            this.actorStoreReader.record.getProfileRecord(),
            this.accountManager.getAccount(this.did),
        ]);
        if (!accountRes)
            return null;
        return {
            did: this.did,
            handle: (accountRes.handle ?? syntax_1.INVALID_HANDLE),
            displayName: profileRes?.displayName,
            avatar: profileRes?.avatar
                ? this.getImageUrl('avatar', (0, lex_1.getBlobCidString)(profileRes.avatar))
                : undefined,
        };
    }
    async formatAndInsertPostsInFeed(feed, posts) {
        if (posts.length === 0) {
            return feed;
        }
        const lastTime = feed.at(-1)?.post.indexedAt ?? new Date(0).toISOString();
        const inFeed = posts.filter((p) => p.indexedAt > lastTime);
        const newestToOldest = inFeed.reverse();
        const maybeFormatted = await Promise.all(newestToOldest.map((p) => this.getPost(p)));
        const formatted = maybeFormatted.filter((p) => p !== null);
        for (const post of formatted) {
            const idx = feed.findIndex((fi) => fi.post.indexedAt < post.indexedAt);
            if (idx >= 0) {
                feed.splice(idx, 0, { post });
            }
            else {
                feed.push({ post });
            }
        }
        return feed;
    }
    async getPost(descript) {
        const { uri, cid, indexedAt, record } = descript;
        const author = await this.getProfileBasic();
        if (!author)
            return null;
        const embed = record.embed ? await this.formatPostEmbed(record) : undefined;
        return {
            uri: uri.toString(),
            cid: cid.toString(),
            likeCount: 0, // counts presumed to be 0 directly after post creation
            replyCount: 0,
            repostCount: 0,
            quoteCount: 0,
            author,
            record: record,
            embed,
            indexedAt,
        };
    }
    async formatPostEmbed(post) {
        const embed = post.embed;
        if (!embed)
            return undefined;
        if (index_js_1.app.bsky.embed.images.$isTypeOf(embed)) {
            return this.formatImageEmbed(embed);
        }
        else if (index_js_1.app.bsky.embed.external.$isTypeOf(embed)) {
            return this.formatExternalEmbed(embed);
        }
        else if (index_js_1.app.bsky.embed.record.$isTypeOf(embed)) {
            return this.formatRecordEmbed(embed);
        }
        else if (index_js_1.app.bsky.embed.recordWithMedia.$isTypeOf(embed)) {
            return this.formatRecordWithMediaEmbed(embed);
        }
        else {
            return undefined;
        }
    }
    formatImageEmbed(embed) {
        const images = embed.images.map((img) => ({
            thumb: this.getImageUrl('feed_thumbnail', (0, lex_1.getBlobCidString)(img.image)),
            fullsize: this.getImageUrl('feed_fullsize', (0, lex_1.getBlobCidString)(img.image)),
            aspectRatio: img.aspectRatio,
            alt: img.alt,
        }));
        return index_js_1.app.bsky.embed.images.view.$build({ images });
    }
    formatExternalEmbed(embed) {
        const { uri, title, description, thumb } = embed.external;
        return index_js_1.app.bsky.embed.external.view.$build({
            external: {
                uri,
                title,
                description,
                thumb: thumb
                    ? this.getImageUrl('feed_thumbnail', (0, lex_1.getBlobCidString)(thumb))
                    : undefined,
            },
        });
    }
    async formatRecordEmbed(embed) {
        const view = await this.formatRecordEmbedInternal(embed);
        return index_js_1.app.bsky.embed.record.view.$build({
            record: view ??
                index_js_1.app.bsky.embed.record.viewNotFound.$build({
                    uri: embed.record.uri,
                    notFound: true,
                }),
        });
    }
    async formatRecordEmbedInternal(embed) {
        if (!this.bskyAppView) {
            return undefined;
        }
        const collection = new syntax_1.AtUri(embed.record.uri).collection;
        if (collection === index_js_1.app.bsky.feed.post.$type) {
            const { headers } = await this.serviceAuthHeaders(this.did, index_js_1.app.bsky.feed.getPosts.$lxm);
            const data = await this.bskyAppView.client.call(index_js_1.app.bsky.feed.getPosts, { uris: [embed.record.uri] }, { headers });
            const post = data.posts[0];
            if (!post)
                return undefined;
            return index_js_1.app.bsky.embed.record.viewRecord.$build({
                uri: post.uri,
                cid: post.cid,
                author: post.author,
                value: post.record,
                labels: post.labels,
                embeds: post.embed ? [post.embed] : undefined,
                indexedAt: post.indexedAt,
            });
        }
        else if (collection === index_js_1.app.bsky.feed.generator.$type) {
            const { headers } = await this.serviceAuthHeaders(this.did, index_js_1.app.bsky.feed.getFeedGenerator.$lxm);
            const data = await this.bskyAppView.client.call(index_js_1.app.bsky.feed.getFeedGenerator, { feed: embed.record.uri }, { headers });
            return index_js_1.app.bsky.feed.defs.generatorView.$build(data.view);
        }
        else if (collection === index_js_1.app.bsky.graph.list.$type) {
            const { headers } = await this.serviceAuthHeaders(this.did, index_js_1.app.bsky.graph.getList.$lxm);
            const data = await this.bskyAppView.client.call(index_js_1.app.bsky.graph.getList, { list: embed.record.uri }, { headers });
            return index_js_1.app.bsky.graph.defs.listView.$build(data.list);
        }
        return undefined;
    }
    async formatRecordWithMediaEmbed(embed) {
        const media = index_js_1.app.bsky.embed.images.$isTypeOf(embed.media)
            ? this.formatImageEmbed(embed.media)
            : index_js_1.app.bsky.embed.external.$isTypeOf(embed.media)
                ? this.formatExternalEmbed(embed.media)
                : null;
        if (!media)
            return undefined;
        const record = await this.formatRecordEmbed(embed.record);
        return index_js_1.app.bsky.embed.recordWithMedia.view.$build({
            record,
            media,
        });
    }
    updateProfileViewBasic(view, record) {
        return {
            ...view,
            displayName: record.displayName,
            avatar: record.avatar
                ? this.getImageUrl('avatar', (0, lex_1.getBlobCidString)(record.avatar))
                : undefined,
        };
    }
    updateProfileView(view, record) {
        return {
            ...this.updateProfileViewBasic(view, record),
            description: record.description,
        };
    }
    updateProfileDetailed(view, record) {
        return {
            ...this.updateProfileView(view, record),
            banner: record.banner
                ? this.getImageUrl('banner', (0, lex_1.getBlobCidString)(record.banner))
                : undefined,
        };
    }
}
exports.LocalViewer = LocalViewer;
//# sourceMappingURL=viewer.js.map
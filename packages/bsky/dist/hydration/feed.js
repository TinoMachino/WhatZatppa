"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedHydrator = void 0;
const common_1 = require("@atproto/common");
const index_js_1 = require("../lexicons/index.js");
const uris_1 = require("../util/uris");
const util_1 = require("./util");
class FeedHydrator {
    constructor(dataplane) {
        Object.defineProperty(this, "dataplane", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dataplane
        });
    }
    async getPosts(uris, includeTakedowns = false, given = new util_1.HydrationMap(), viewer, options = {}) {
        const [have, need] = (0, util_1.split)(uris, (uri) => given.has(uri));
        const base = new util_1.HydrationMap();
        for (const uri of have) {
            base.set(uri, given.get(uri) ?? null);
        }
        if (need.length) {
            const res = await this.dataplane.getPostRecords(options.processDynamicTagsForView
                ? {
                    uris: need,
                    viewerDid: viewer ?? undefined,
                    processDynamicTagsForView: options.processDynamicTagsForView,
                }
                : {
                    uris: need,
                });
            for (let i = 0; i < need.length; i++) {
                const record = (0, util_1.parseRecord)(index_js_1.app.bsky.feed.post.main, res.records[i], includeTakedowns);
                const violatesThreadGate = res.meta[i].violatesThreadGate;
                const violatesEmbeddingRules = res.meta[i].violatesEmbeddingRules;
                const hasThreadGate = res.meta[i].hasThreadGate;
                const hasPostGate = res.meta[i].hasPostGate;
                const tags = new Set(res.records[i].tags ?? []);
                const debug = { tags: Array.from(tags) };
                base.set(need[i], record
                    ? {
                        ...record,
                        violatesThreadGate,
                        violatesEmbeddingRules,
                        hasThreadGate,
                        hasPostGate,
                        tags,
                        debug,
                    }
                    : null);
            }
        }
        return base;
    }
    async getPostViewerStates(refs, viewer) {
        const map = new util_1.HydrationMap();
        if (!refs.length)
            return map;
        const [likes, reposts, bookmarks, threadMutesMap] = await Promise.all([
            this.dataplane.getLikesByActorAndSubjects({
                actorDid: viewer,
                refs,
            }),
            this.dataplane.getRepostsByActorAndSubjects({
                actorDid: viewer,
                refs,
            }),
            this.dataplane.getBookmarksByActorAndSubjects({
                actorDid: viewer,
                uris: refs.map((r) => r.uri),
            }),
            this.getThreadMutes(refs.map((r) => r.threadRoot), viewer),
        ]);
        for (let i = 0; i < refs.length; i++) {
            const { uri, threadRoot } = refs[i];
            map.set(uri, {
                like: (0, util_1.parseString)(likes.uris[i]),
                repost: (0, util_1.parseString)(reposts.uris[i]),
                // @NOTE: The dataplane contract is that the array position will be present,
                // but the optional chaining is to ensure it works regardless of the dataplane being update to provide the data.
                bookmarked: !!bookmarks.bookmarks.at(i)?.ref?.key,
                threadMuted: threadMutesMap.get(threadRoot) ?? false,
            });
        }
        return map;
    }
    async getThreadMutes(threadRoots, viewer) {
        const deduped = (0, common_1.dedupeStrs)(threadRoots);
        const threadMutes = await this.dataplane.getThreadMutesOnSubjects({
            actorDid: viewer,
            threadRoots: deduped,
        });
        const map = new Map();
        for (let i = 0; i < deduped.length; i++) {
            map.set(deduped[i], threadMutes.muted[i] ?? false);
        }
        return map;
    }
    async getThreadContexts(refs) {
        const map = new util_1.HydrationMap();
        if (!refs.length)
            return map;
        const refsByRootAuthor = new Map();
        for (const ref of refs) {
            const { threadRoot } = ref;
            const rootAuthor = (0, uris_1.uriToDid)(threadRoot);
            const existingValue = refsByRootAuthor.get(rootAuthor) ?? [];
            refsByRootAuthor.set(rootAuthor, [...existingValue, ref]);
        }
        const refsByRootAuthorEntries = Array.from(refsByRootAuthor.entries());
        const rootAuthorsLikes = await Promise.all(refsByRootAuthorEntries.map(([rootAuthor, refsForAuthor]) => this.dataplane.getLikesByActorAndSubjects({
            actorDid: rootAuthor,
            refs: refsForAuthor.map(({ uri, cid }) => ({ uri, cid })),
        })));
        const likesByUri = new Map();
        for (let i = 0; i < refsByRootAuthorEntries.length; i++) {
            const [_rootAuthor, refsForAuthor] = refsByRootAuthorEntries[i];
            const likesForRootAuthor = rootAuthorsLikes[i];
            for (let j = 0; j < refsForAuthor.length; j++) {
                const { uri } = refsForAuthor[j];
                likesByUri.set(uri, likesForRootAuthor.uris[j]);
            }
        }
        for (const { uri } of refs) {
            map.set(uri, {
                like: (0, util_1.parseString)(likesByUri.get(uri)),
            });
        }
        return map;
    }
    async getPostAggregates(refs, viewer) {
        const map = new util_1.HydrationMap();
        if (!refs.length)
            map;
        const counts = await this.dataplane.getInteractionCounts({
            refs,
            skipCacheForDids: viewer ? [viewer] : undefined,
        });
        for (let i = 0; i < refs.length; i++) {
            map.set(refs[i].uri, {
                likes: counts.likes[i] ?? 0,
                replies: counts.replies[i] ?? 0,
                reposts: counts.reposts[i] ?? 0,
                quotes: counts.quotes[i] ?? 0,
                bookmarks: counts.bookmarks[i] ?? 0,
            });
        }
        return map;
    }
    async getFeedGens(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getFeedGeneratorRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.feed.generator.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getFeedGenViewerStates(uris, viewer) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const likes = await this.dataplane.getLikesByActorAndSubjects({
            actorDid: viewer,
            refs: uris.map((uri) => ({ uri })),
        });
        for (let i = 0; i < uris.length; i++) {
            map.set(uris[i], {
                like: (0, util_1.parseString)(likes.uris[i]),
            });
        }
        return map;
    }
    async getFeedGenAggregates(refs, viewer) {
        const map = new util_1.HydrationMap();
        if (!refs.length)
            return map;
        const counts = await this.dataplane.getInteractionCounts({
            refs,
            skipCacheForDids: viewer ? [viewer] : undefined,
        });
        for (let i = 0; i < refs.length; i++) {
            map.set(refs[i].uri, { likes: counts.likes[i] ?? 0 });
        }
        return map;
    }
    async getThreadgatesForPosts(postUris, includeTakedowns = false) {
        const uris = postUris.map(uris_1.postUriToThreadgateUri);
        return this.getThreadgateRecords(uris, includeTakedowns);
    }
    async getThreadgateRecords(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getThreadGateRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.feed.threadgate.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getPostgatesForPosts(postUris, includeTakedowns = false) {
        const uris = postUris.map(uris_1.postUriToPostgateUri);
        return this.getPostgateRecords(uris, includeTakedowns);
    }
    async getPostgateRecords(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getPostgateRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.feed.postgate.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getLikes(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getLikeRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.feed.like.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getReposts(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getRepostRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.feed.repost.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
}
exports.FeedHydrator = FeedHydrator;
//# sourceMappingURL=feed.js.map
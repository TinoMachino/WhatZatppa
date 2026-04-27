"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphHydrator = exports.Blocks = void 0;
const index_js_1 = require("../lexicons/index.js");
const util_1 = require("./util");
const dedupePairs = (pairs) => {
    const deduped = pairs.reduce((acc, pair) => {
        return acc.set(Blocks.key(...pair), pair);
    }, new Map());
    return [...deduped.values()];
};
class Blocks {
    constructor() {
        Object.defineProperty(this, "_blocks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        }); // did:a,did:b -> block
    }
    static key(didA, didB) {
        return [didA, didB].sort().join(',');
    }
    set(didA, didB, block) {
        const key = Blocks.key(didA, didB);
        this._blocks.set(key, block);
        return this;
    }
    get(didA, didB) {
        if (didA === didB)
            return null; // ignore self-blocks
        const key = Blocks.key(didA, didB);
        return this._blocks.get(key) ?? null;
    }
    merge(blocks) {
        blocks._blocks.forEach((block, key) => {
            this._blocks.set(key, block);
        });
        return this;
    }
}
exports.Blocks = Blocks;
class GraphHydrator {
    constructor(dataplane) {
        Object.defineProperty(this, "dataplane", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dataplane
        });
    }
    async getLists(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getListRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.graph.list.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getListItems(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getListItemRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.graph.listitem.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getListViewerStates(uris, viewer) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const mutesAndBlocks = await Promise.all(uris.map((uri) => this.getMutesAndBlocks(uri, viewer)));
        const listMemberships = await this.dataplane.getListMembership({
            actorDid: viewer,
            listUris: uris,
        });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            map.set(uri, {
                viewerMuted: mutesAndBlocks[i].muted ? uri : undefined,
                viewerListBlockUri: mutesAndBlocks[i].listBlockUri || undefined,
                viewerInList: listMemberships.listitemUris[i],
            });
        }
        return map;
    }
    async getMutesAndBlocks(uri, viewer) {
        const [muted, listBlockUri] = await Promise.all([
            this.dataplane.getMutelistSubscription({
                actorDid: viewer,
                listUri: uri,
            }),
            this.dataplane.getBlocklistSubscription({
                actorDid: viewer,
                listUri: uri,
            }),
        ]);
        return {
            muted: muted.subscribed,
            listBlockUri: listBlockUri.listblockUri,
        };
    }
    async getBidirectionalBlocks(pairs) {
        if (!pairs.length)
            return new Blocks();
        const deduped = dedupePairs(pairs).map(([a, b]) => ({ a, b }));
        const res = await this.dataplane.getBlockExistence({ pairs: deduped });
        const blocks = new Blocks();
        for (let i = 0; i < deduped.length; i++) {
            const pair = deduped[i];
            const block = res.blocks[i];
            blocks.set(pair.a, pair.b, {
                blockUri: (block.blockedBy || block.blocking || undefined),
                blockListUri: (block.blockedByList ||
                    block.blockingByList ||
                    undefined),
            });
        }
        return blocks;
    }
    async getFollows(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getFollowRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.graph.follow.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    async getVerifications(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getVerificationRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.graph.verification.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    async getBlocks(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getBlockRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.graph.block.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    async getActorFollows(input) {
        const { did, cursor, limit } = input;
        const res = await this.dataplane.getFollows({
            actorDid: did,
            cursor,
            limit,
        });
        return { follows: res.follows, cursor: res.cursor };
    }
    async getActorFollowers(input) {
        const { did, cursor, limit } = input;
        const res = await this.dataplane.getFollowers({
            actorDid: did,
            cursor,
            limit,
        });
        return { followers: res.followers, cursor: res.cursor };
    }
    async getStarterPacks(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getStarterPackRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.graph.starterpack.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    async getStarterPackAggregates(refs) {
        const map = new util_1.HydrationMap();
        if (refs.length) {
            const counts = await this.dataplane.getStarterPackCounts({ refs });
            for (let i = 0; i < refs.length; i++) {
                map.set(refs[i].uri, {
                    joinedWeek: counts.joinedWeek[i] ?? 0,
                    joinedAllTime: counts.joinedAllTime[i] ?? 0,
                });
            }
        }
        return map;
    }
    async getListAggregates(refs) {
        const map = new util_1.HydrationMap();
        if (refs.length) {
            const counts = await this.dataplane.getListCounts({ refs });
            for (let i = 0; i < refs.length; i++) {
                map.set(refs[i].uri, {
                    listItems: counts.listItems[i] ?? 0,
                });
            }
        }
        return map;
    }
}
exports.GraphHydrator = GraphHydrator;
//# sourceMappingURL=graph.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHydrator = void 0;
const common_1 = require("@atproto/common");
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../lexicons/index.js");
const util_1 = require("./util");
class ActorHydrator {
    constructor(dataplane) {
        Object.defineProperty(this, "dataplane", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dataplane
        });
    }
    async getRepoRevSafe(did) {
        if (!did)
            return null;
        try {
            const res = await this.dataplane.getLatestRev({ actorDid: did });
            return (0, util_1.parseString)(res.rev) ?? null;
        }
        catch {
            return null;
        }
    }
    /**
     * @note handles do not need to be normalized
     */
    async getDids(handleOrDids, opts) {
        const didByHandle = new Map();
        const handles = handleOrDids.filter(syntax_1.isHandleIdentifier);
        if (handles.length) {
            const { dids } = await this.dataplane.getDidsByHandles({
                handles: handles.map(syntax_1.normalizeHandle),
                lookupUnidirectional: opts?.lookupUnidirectional,
            });
            for (let i = 0; i < handles.length; i++) {
                const did = (0, util_1.parseString)(dids[i]);
                if (did)
                    didByHandle.set(handles[i], did);
            }
        }
        return handleOrDids.map((id) => (0, syntax_1.isDidIdentifier)(id) ? id : didByHandle.get(id));
    }
    async getDidsDefined(handleOrDids) {
        const res = await this.getDids(handleOrDids);
        return res.filter((v) => v != null);
    }
    async getActors(dids, opts = {}) {
        const map = new util_1.HydrationMap();
        if (!dids.length)
            return map;
        const { includeTakedowns = false, skipCacheForDids } = opts;
        const res = await this.dataplane.getActors({ dids, skipCacheForDids });
        for (let i = 0; i < dids.length; i++) {
            const did = dids[i];
            const actor = res.actors[i];
            const isNoHosted = actor.takenDown ||
                (actor.upstreamStatus && actor.upstreamStatus !== 'active');
            if (!actor.exists ||
                (isNoHosted && !includeTakedowns) ||
                !!actor.tombstonedAt) {
                map.set(did, null);
                continue;
            }
            const profile = actor.profile?.record
                ? (0, util_1.parseRecord)(index_js_1.app.bsky.actor.profile.main, actor.profile, includeTakedowns)
                : undefined;
            const status = actor.statusRecord
                ? (0, util_1.parseRecord)(index_js_1.app.bsky.actor.status.main, actor.statusRecord, 
                /*
                 * Always true, we filter this out in the `Views.status()`. If we
                 * ever remove that filter, we'll want to reinstate this here.
                 */
                true)
                : undefined;
            const germ = actor.germRecord
                ? (0, util_1.parseRecord)(index_js_1.com.germnetwork.declaration.main, actor.germRecord, includeTakedowns)
                : undefined;
            const verifications = (0, common_1.mapDefined)(Object.entries(actor.verifiedBy), ([actorDid, verificationMeta]) => {
                if (verificationMeta.handle &&
                    verificationMeta.rkey &&
                    verificationMeta.sortedAt) {
                    return {
                        issuer: actorDid,
                        uri: `at://${actorDid}/app.bsky.graph.verification/${verificationMeta.rkey}`,
                        handle: verificationMeta.handle,
                        displayName: verificationMeta.displayName,
                        createdAt: ((0, util_1.parseDate)(verificationMeta.sortedAt) ?? new Date(0)).toISOString(),
                    };
                }
                // Filter out the verification meta that doesn't contain all info.
                return undefined;
            });
            const allowActivitySubscriptionsFrom = (val) => {
                switch (val) {
                    case 'followers':
                    case 'mutuals':
                    case 'none':
                        return val;
                    default:
                        // The dataplane should set the default of "FOLLOWERS". Just in case.
                        return 'followers';
                }
            };
            const debug = {
                pagerank: actor.pagerank ? actor.pagerank.toString() : undefined,
                accountTags: actor.tags,
                profileTags: actor.profileTags,
            };
            map.set(did, {
                did,
                handle: (0, util_1.parseString)(actor.handle),
                profile: profile?.record,
                profileCid: profile?.cid,
                profileTakedownRef: profile?.takedownRef,
                sortedAt: profile?.sortedAt,
                indexedAt: profile?.indexedAt,
                takedownRef: (0, util_1.safeTakedownRef)(actor),
                isLabeler: actor.labeler ?? false,
                allowIncomingChatsFrom: actor.allowIncomingChatsFrom || undefined,
                allowGroupChatInvitesFrom: actor.allowGroupChatInvitesFrom || undefined,
                upstreamStatus: actor.upstreamStatus || undefined,
                createdAt: (0, util_1.parseDate)(actor.createdAt),
                priorityNotifications: actor.priorityNotifications,
                trustedVerifier: actor.trustedVerifier,
                verifications,
                status: status,
                cabildeoLive: actor.cabildeoLive,
                germ: germ,
                allowActivitySubscriptionsFrom: allowActivitySubscriptionsFrom(actor.allowActivitySubscriptionsFrom),
                debug,
            });
        }
        return map;
    }
    async getChatDeclarations(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getActorChatDeclarationRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.chat.bsky.actor.declaration.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    async getGermDeclarations(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getGermDeclarationRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const record = (0, util_1.parseRecord)(index_js_1.com.germnetwork.declaration.main, res.records[i], includeTakedowns);
            map.set(uris[i], record ?? null);
        }
        return map;
    }
    async getNotificationDeclarations(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getNotificationDeclarationRecords({
            uris,
        });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.notification.declaration.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    async getStatus(uris, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!uris.length)
            return map;
        const res = await this.dataplane.getStatusRecords({ uris });
        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.actor.status.main, res.records[i], includeTakedowns);
            map.set(uri, record ?? null);
        }
        return map;
    }
    // "naive" because this method does not verify the existence of the list itself
    // a later check in the main hydrator will remove list uris that have been deleted or
    // repurposed to "curate lists"
    async getProfileViewerStatesNaive(actors, viewer) {
        const map = new util_1.HydrationMap();
        if (!actors.length)
            return map;
        // @TODO we could use "await this.getDids(actors)" here to resolve the
        // handles (no other code change should be needed). This was not done as
        // part of this PR to avoid changing the behavior of this method.
        const actorDids = actors.map((a) => ((0, syntax_1.isDidIdentifier)(a) ? a : undefined));
        // getRelationships requires DidString so we remove anything that isn't one
        const actorDidsDefined = Array.from(new Set(actorDids
            .filter((did) => did != null)
            // Since we special case self-relationship below, we can skip querying
            // the dataplane for the viewer's own DID if it's included in the
            // input.
            .filter((did) => did !== viewer)));
        const res = await this.dataplane.getRelationships({
            actorDid: viewer,
            targetDids: actorDidsDefined,
        });
        const actorToDid = new Map(actors.map((actor, i) => [actor, actorDids[i]]));
        for (let i = 0; i < actors.length; i++) {
            const actor = actors[i];
            const did = actorToDid.get(actor);
            // ignore unresolved handles
            if (!did)
                continue;
            if (did === viewer) {
                // ignore self-follows, self-mutes, self-blocks, self-activity-subscriptions
                map.set(actor, { did });
                continue;
            }
            // Get the index that was used to query the relationships for this actor
            const index = actorDidsDefined.indexOf(did);
            if (index === -1)
                continue;
            const rels = res.relationships[index];
            map.set(actor, {
                did,
                muted: rels.muted ?? false,
                mutedByList: (0, util_1.parseString)(rels.mutedByList),
                blockedBy: (0, util_1.parseString)(rels.blockedBy),
                blocking: (0, util_1.parseString)(rels.blocking),
                blockedByList: (0, util_1.parseString)(rels.blockedByList),
                blockingByList: (0, util_1.parseString)(rels.blockingByList),
                following: (0, util_1.parseString)(rels.following),
                followedBy: (0, util_1.parseString)(rels.followedBy),
            });
        }
        return map;
    }
    async getKnownFollowers(dids, viewer) {
        const map = new util_1.HydrationMap();
        if (!viewer)
            return map;
        if (!dids.length)
            return map;
        try {
            const { results: knownFollowersResults } = await this.dataplane.getFollowsFollowing({
                actorDid: viewer,
                targetDids: dids,
            }, {
                signal: AbortSignal.timeout(100),
            });
            for (let i = 0; i < dids.length; i++) {
                const did = dids[i];
                const result = knownFollowersResults[i]?.dids;
                map.set(did, result && result.length > 0
                    ? {
                        count: result.length,
                        followers: result.slice(0, 5),
                    }
                    : undefined);
            }
        }
        catch {
            // ignore errors and return empty map
        }
        return map;
    }
    async getActivitySubscriptions(dids, viewer) {
        const map = new util_1.HydrationMap();
        if (!viewer)
            return map;
        if (!dids.length)
            return map;
        try {
            const { subscriptions } = await this.dataplane.getActivitySubscriptionsByActorAndSubjects({ actorDid: viewer, subjectDids: dids }, { signal: AbortSignal.timeout(100) });
            for (let i = 0; i < dids.length; i++) {
                // @NOTE Although not typed as nullable, the code here used to defend
                // against potentially missing subscription objects in the response, so
                // we keep that defense in place.
                const subscription = subscriptions[i];
                const state = {
                    post: subscription?.post != null,
                    reply: subscription?.reply != null,
                };
                const did = dids[i];
                if ((0, util_1.isActivitySubscriptionEnabled)(state)) {
                    map.set(did, state);
                }
                else {
                    map.set(did, undefined);
                }
            }
        }
        catch {
            // ignore errors and return empty map
        }
        return map;
    }
    async getProfileAggregates(dids) {
        const map = new util_1.HydrationMap();
        if (!dids.length)
            return map;
        const counts = await this.dataplane.getCountsForUsers({ dids });
        for (let i = 0; i < dids.length; i++) {
            const did = dids[i];
            map.set(did, {
                followers: counts.followers[i] ?? 0,
                follows: counts.following[i] ?? 0,
                posts: counts.posts[i] ?? 0,
                lists: counts.lists[i] ?? 0,
                feeds: counts.feeds[i] ?? 0,
                starterPacks: counts.starterPacks[i] ?? 0,
            });
        }
        return map;
    }
}
exports.ActorHydrator = ActorHydrator;
//# sourceMappingURL=actor.js.map
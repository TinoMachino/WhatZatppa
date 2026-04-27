"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobuf_1 = require("@bufbuild/protobuf");
const kysely_1 = require("kysely");
const common_1 = require("@atproto/common");
const util_1 = require("../../../hydration/util");
const index_js_1 = require("../../../lexicons/index.js");
const bsky_pb_1 = require("../../../proto/bsky_pb");
const cabildeo_live_1 = require("../cabildeo-live");
const records_1 = require("./records");
exports.default = (db) => ({
    async getActors(req) {
        const { dids, returnAgeAssuranceForDids } = req;
        if (dids.length === 0) {
            return { actors: [] };
        }
        const profileUris = dids.map((did) => `at://${did}/app.bsky.actor.profile/self`);
        const statusUris = dids.map((did) => `at://${did}/app.bsky.actor.status/self`);
        const chatDeclarationUris = dids.map((did) => `at://${did}/chat.bsky.actor.declaration/self`);
        const notifDeclarationUris = dids.map((did) => `at://${did}/app.bsky.notification.declaration/self`);
        const germDeclarationUris = dids.map((did) => `at://${did}/com.germnetwork.declaration/self`);
        const { ref } = db.db.dynamic;
        const now = new Date();
        const [handlesRes, verificationsReceived, cabildeoLiveRows, profiles, statuses, chatDeclarations, notifDeclarations, germDeclarations,] = await Promise.all([
            db.db
                .selectFrom('actor')
                .leftJoin('actor_state', 'actor_state.did', 'actor.did')
                .where('actor.did', 'in', dids)
                .selectAll('actor')
                .select('actor_state.priorityNotifs')
                .select([
                db.db
                    .selectFrom('labeler')
                    .whereRef('creator', '=', ref('actor.did'))
                    .select((0, kysely_1.sql) `${true}`.as('val'))
                    .as('isLabeler'),
            ])
                .execute(),
            db.db
                .selectFrom('verification')
                .selectAll('verification')
                .innerJoin('actor', 'actor.did', 'verification.creator')
                .where('verification.subject', 'in', dids)
                .where('actor.trustedVerifier', '=', true)
                .orderBy('sortedAt', 'asc')
                .execute(),
            db.db
                .selectFrom('cabildeo_live_presence')
                .innerJoin('cabildeo_live_session', 'cabildeo_live_session.cabildeo', 'cabildeo_live_presence.cabildeo')
                .innerJoin('cabildeo_cabildeo', 'cabildeo_cabildeo.uri', 'cabildeo_live_presence.cabildeo')
                .where('cabildeo_live_presence.actorDid', 'in', dids)
                .where('cabildeo_live_presence.expiresAt', '>', now.toISOString())
                .where('cabildeo_live_session.endedAt', 'is', null)
                .where((0, cabildeo_live_1.activeHostPresenceExistsSql)('cabildeo_live_session', now))
                .where('cabildeo_cabildeo.phase', 'in', [
                'open',
                'deliberating',
                'voting',
            ])
                .select([
                'cabildeo_live_presence.actorDid as actorDid',
                'cabildeo_live_presence.cabildeo as cabildeo',
                'cabildeo_cabildeo.community as community',
                'cabildeo_cabildeo.phase as phase',
                'cabildeo_live_presence.expiresAt as expiresAt',
                'cabildeo_live_session.liveUri as liveUri',
            ])
                .orderBy('cabildeo_live_presence.expiresAt', 'desc')
                .execute(),
            (0, records_1.getRecords)(db)({ uris: profileUris }),
            (0, records_1.getRecords)(db)({ uris: statusUris }),
            (0, records_1.getRecords)(db)({ uris: chatDeclarationUris }),
            (0, records_1.getRecords)(db)({ uris: notifDeclarationUris }),
            (0, records_1.getRecords)(db)({ uris: germDeclarationUris }),
        ]);
        const verificationsBySubjectDid = verificationsReceived.reduce((acc, cur) => {
            const list = acc.get(cur.subject) ?? [];
            list.push(cur);
            acc.set(cur.subject, list);
            return acc;
        }, new Map());
        const cabildeoLiveByActorDid = cabildeoLiveRows.reduce((acc, cur) => {
            if (!acc.has(cur.actorDid)) {
                acc.set(cur.actorDid, new bsky_pb_1.ParaCabildeoLive((0, cabildeo_live_1.mapActorCabildeoLive)(cur)));
            }
            return acc;
        }, new Map());
        const byDid = (0, common_1.keyBy)(handlesRes, 'did');
        const actors = dids.map((did, i) => {
            const row = byDid.get(did);
            const status = statuses.records[i];
            const chatDeclaration = (0, util_1.parseJsonBytes)(index_js_1.chat.bsky.actor.declaration.main, chatDeclarations.records[i].record);
            const germDeclaration = germDeclarations.records[i];
            const verifications = verificationsBySubjectDid.get(did) ?? [];
            const verifiedBy = verifications.reduce((acc, cur) => {
                acc[cur.creator] = {
                    rkey: cur.rkey,
                    handle: cur.handle,
                    displayName: cur.displayName,
                    sortedAt: protobuf_1.Timestamp.fromDate(new Date(cur.sortedAt)),
                };
                return acc;
            }, {});
            const ageAssuranceForDids = new Set(returnAgeAssuranceForDids);
            const activitySubscription = () => {
                const record = (0, util_1.parseJsonBytes)(index_js_1.app.bsky.notification.declaration.main, notifDeclarations.records[i].record);
                // The dataplane is responsible for setting the default of "followers" (default according to the lexicon).
                const defaultVal = 'followers';
                if (typeof record?.allowSubscriptions !== 'string') {
                    return defaultVal;
                }
                switch (record.allowSubscriptions) {
                    case 'followers':
                    case 'mutuals':
                    case 'none':
                        return record.allowSubscriptions;
                    default:
                        return defaultVal;
                }
            };
            const ageAssuranceStatus = () => {
                if (!ageAssuranceForDids.has(did)) {
                    return undefined;
                }
                const status = row?.ageAssuranceStatus ?? 'unknown';
                let access = row?.ageAssuranceAccess;
                if (!access || access === 'unknown') {
                    if (status === 'assured') {
                        access = 'full';
                    }
                    else if (status === 'blocked') {
                        access = 'none';
                    }
                    else {
                        access = 'unknown';
                    }
                }
                return {
                    lastInitiatedAt: row?.ageAssuranceLastInitiatedAt
                        ? protobuf_1.Timestamp.fromDate(new Date(row?.ageAssuranceLastInitiatedAt))
                        : undefined,
                    status,
                    access,
                };
            };
            return {
                exists: !!row,
                handle: row?.handle ?? undefined,
                profile: profiles.records[i],
                takenDown: !!row?.takedownRef,
                takedownRef: row?.takedownRef || undefined,
                tombstonedAt: undefined, // in current implementation, tombstoned actors are deleted
                labeler: row?.isLabeler ?? false,
                allowIncomingChatsFrom: typeof chatDeclaration?.['allowIncoming'] === 'string'
                    ? chatDeclaration['allowIncoming']
                    : undefined,
                allowGroupChatInvitesFrom: typeof chatDeclaration?.['allowGroupInvites'] === 'string'
                    ? chatDeclaration['allowGroupInvites']
                    : undefined,
                upstreamStatus: row?.upstreamStatus ?? '',
                createdAt: profiles.records[i].createdAt, // @NOTE profile creation date not trusted in production
                priorityNotifications: row?.priorityNotifs ?? false,
                trustedVerifier: row?.trustedVerifier ?? false,
                verifiedBy,
                statusRecord: status,
                cabildeoLive: cabildeoLiveByActorDid.get(did),
                germRecord: germDeclaration,
                tags: [],
                profileTags: [],
                allowActivitySubscriptionsFrom: activitySubscription(),
                ageAssuranceStatus: ageAssuranceStatus(),
            };
        });
        return { actors };
    },
    // @TODO handle req.lookupUnidirectional w/ networked handle resolution
    async getDidsByHandles(req) {
        const { handles } = req;
        if (handles.length === 0) {
            return { dids: [] };
        }
        const res = await db.db
            .selectFrom('actor')
            .where('handle', 'in', handles)
            .selectAll()
            .execute();
        const byHandle = (0, common_1.keyBy)(res, 'handle');
        const dids = handles.map((handle) => byHandle.get(handle)?.did ?? '');
        return { dids };
    },
    async updateActorUpstreamStatus(req) {
        const { actorDid, upstreamStatus } = req;
        await db.db
            .updateTable('actor')
            .set({ upstreamStatus })
            .where('did', '=', actorDid)
            .execute();
    },
    async getParaProfileStats(req) {
        const [stats, status] = await Promise.all([
            db.db
                .selectFrom('para_profile_stats')
                .selectAll()
                .where('did', '=', req.actorDid)
                .executeTakeFirst(),
            db.db
                .selectFrom('para_status')
                .selectAll()
                .where('did', '=', req.actorDid)
                .executeTakeFirst(),
        ]);
        return {
            actorDid: req.actorDid,
            stats: stats
                ? new bsky_pb_1.ParaProfileStats({
                    influence: stats.influence,
                    votesReceivedAllTime: stats.votesReceivedAllTime,
                    votesCastAllTime: stats.votesCastAllTime,
                    contributions: new bsky_pb_1.ParaContributions({
                        policies: stats.policies,
                        matters: stats.matters,
                        comments: stats.comments,
                    }),
                    activeIn: stats.activeIn ?? [],
                    computedAt: stats.computedAt,
                })
                : undefined,
            status: status
                ? new bsky_pb_1.ParaStatusView({
                    status: status.status,
                    party: status.party ?? undefined,
                    community: status.community ?? undefined,
                    createdAt: status.createdAt,
                })
                : undefined,
        };
    },
});
//# sourceMappingURL=profile.js.map
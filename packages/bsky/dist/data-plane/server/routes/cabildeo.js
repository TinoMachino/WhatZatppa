"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("@connectrpc/connect");
const kysely_1 = require("kysely");
const cabildeo_live_1 = require("../cabildeo-live");
const pagination_1 = require("../db/pagination");
exports.default = (db) => ({
    async getParaCabildeos(req) {
        const { ref } = db.db.dynamic;
        const normalizedCommunity = normalizeCommunity(req.community);
        const phase = req.phase?.trim();
        const now = new Date();
        const activeLiveSql = (0, kysely_1.sql) `(
      "cabildeo_cabildeo"."phase" in (${kysely_1.sql.join(cabildeo_live_1.LIVE_CABILDEO_ALLOWED_PHASES.map((item) => (0, kysely_1.sql) `${item}`), (0, kysely_1.sql) `, `)})
      and exists (
        select 1
        from cabildeo_live_session as live_session
        where live_session.cabildeo = "cabildeo_cabildeo"."uri"
          and live_session."endedAt" is null
          and ${(0, cabildeo_live_1.activeHostPresenceExistsSql)('live_session', now)}
      )
    )`;
        const sortRankSql = (0, kysely_1.sql) `case
      when ${activeLiveSql}
        then to_char(
          "cabildeo_cabildeo"."sortAt"::timestamptz + interval '100 years',
          'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
        )
      else "cabildeo_cabildeo"."sortAt"
    end`;
        let builder = db.db
            .selectFrom('cabildeo_cabildeo')
            .selectAll()
            .select(sortRankSql.as('sortRank'));
        if (normalizedCommunity) {
            builder = builder.where((0, kysely_1.sql) `lower(regexp_replace(coalesce("community", ''), '^p/', ''))`, '=', normalizedCommunity);
        }
        if (phase) {
            builder = builder.where('phase', '=', phase);
        }
        const keyset = new RankedTimeCidKeyset(sortRankSql, ref('cabildeo_cabildeo.cid'));
        builder = (0, pagination_1.paginate)(builder, {
            limit: req.limit,
            cursor: req.cursor,
            keyset,
            tryIndex: true,
        });
        const rows = await builder.execute();
        const views = await Promise.all(rows.map((row) => mapCabildeoRow(db, row, req.viewerDid || undefined, now)));
        return {
            items: views,
            cursor: keyset.packFromResult(rows),
        };
    },
    async getParaCabildeo(req) {
        const now = new Date();
        const row = await db.db
            .selectFrom('cabildeo_cabildeo')
            .where('uri', '=', req.cabildeoUri)
            .selectAll()
            .executeTakeFirst();
        if (!row) {
            return {};
        }
        return {
            cabildeo: await mapCabildeoRow(db, row, req.viewerDid || undefined, now),
        };
    },
    async getParaCabildeoPositions(req) {
        const { ref } = db.db.dynamic;
        let builder = db.db
            .selectFrom('cabildeo_position')
            .where('cabildeo', '=', req.cabildeoUri)
            .selectAll();
        if (req.stance) {
            builder = builder.where('stance', '=', req.stance);
        }
        const keyset = new pagination_1.TimeCidKeyset(ref('cabildeo_position.sortAt'), ref('cabildeo_position.cid'));
        builder = (0, pagination_1.paginate)(builder, {
            limit: req.limit,
            cursor: req.cursor,
            keyset,
            tryIndex: true,
        });
        const positions = await builder.execute();
        return {
            positions: positions.map((position) => ({
                uri: position.uri,
                cid: position.cid,
                creator: position.creator,
                indexedAt: position.indexedAt,
                cabildeo: position.cabildeo,
                stance: position.stance,
                optionIndex: typeof position.optionIndex === 'number'
                    ? position.optionIndex
                    : undefined,
                text: position.text,
                compassQuadrant: position.compassQuadrant ?? '',
                createdAt: position.createdAt,
            })),
            cursor: keyset.packFromResult(positions),
        };
    },
    async getParaDelegationCandidates(req) {
        const cabildeo = await db.db
            .selectFrom('cabildeo_cabildeo')
            .where('uri', '=', req.cabildeoUri)
            .select(['uri', 'community'])
            .executeTakeFirst();
        if (!cabildeo) {
            return { candidates: [], cursor: '' };
        }
        const board = await selectCandidateCommunityBoard(db, req.communityId || cabildeo.community);
        const rolesByDid = new Map();
        if (board) {
            await assertActiveCommunityViewer(db, {
                communityUri: board.uri,
                viewerDid: req.viewerDid,
                viewerIsAdmin: req.viewerIsAdmin,
            });
            const [governance, members] = await Promise.all([
                getCandidateGovernanceRecord(db, board.name, board.slug),
                selectDelegateLikeMembers(db, board.uri),
            ]);
            addGovernanceCandidates(rolesByDid, governance);
            for (const member of members) {
                const set = ensureRoleSet(rolesByDid, member.creator);
                for (const role of member.roles ?? []) {
                    set.add(role);
                }
                if (set.size === 0)
                    set.add('member');
            }
        }
        const dids = [...rolesByDid.keys()];
        if (dids.length === 0) {
            return { candidates: [], cursor: '' };
        }
        const [profiles, delegationCounts, votes] = await Promise.all([
            hydrateCandidateProfiles(db, dids),
            getCandidateDelegationCounts(db, dids),
            getCandidateVotes(db, req.cabildeoUri, dids),
        ]);
        const candidates = dids
            .map((did) => {
            const profile = profiles.get(did);
            const vote = votes.get(did);
            return {
                did,
                handle: profile?.handle ?? '',
                displayName: profile?.displayName ?? '',
                avatar: '',
                description: profile?.description ?? '',
                roles: [...(rolesByDid.get(did) ?? new Set())],
                activeDelegationCount: delegationCounts.get(did) ?? 0,
                hasVoted: Boolean(vote),
                votedAt: vote?.createdAt ?? '',
                selectedOption: typeof vote?.selectedOption === 'number'
                    ? vote.selectedOption
                    : undefined,
            };
        })
            .sort((a, b) => {
            const delegationDelta = b.activeDelegationCount - a.activeDelegationCount;
            if (delegationDelta !== 0)
                return delegationDelta;
            return (a.displayName || a.handle || a.did).localeCompare(b.displayName || b.handle || b.did);
        });
        const offset = decodeOffsetCursor(req.cursor);
        const limit = normalizeLimit(req.limit);
        const page = candidates.slice(offset, offset + limit);
        const nextOffset = offset + page.length;
        return {
            candidates: page,
            cursor: nextOffset < candidates.length ? encodeOffsetCursor(nextOffset) : '',
        };
    },
    async putParaCabildeoLivePresence(req) {
        const now = new Date();
        const nowIso = now.toISOString();
        const cabildeo = await db.db
            .selectFrom('cabildeo_cabildeo')
            .where('uri', '=', req.cabildeoUri)
            .select(['uri', 'phase'])
            .executeTakeFirst();
        if (!cabildeo || !(0, cabildeo_live_1.isLiveCabildeoPhase)(cabildeo.phase)) {
            return {
                cabildeoUri: req.cabildeoUri,
                present: false,
            };
        }
        if (!req.present) {
            await db.db
                .deleteFrom('cabildeo_live_presence')
                .where('cabildeo', '=', req.cabildeoUri)
                .where('actorDid', '=', req.actorDid)
                .where('sessionId', '=', req.sessionId)
                .execute();
            const session = await db.db
                .selectFrom('cabildeo_live_session')
                .where('cabildeo', '=', req.cabildeoUri)
                .select(['hostDid'])
                .executeTakeFirst();
            if (session?.hostDid === req.actorDid) {
                await db.db
                    .updateTable('cabildeo_live_session')
                    .set({
                    endedAt: nowIso,
                    updatedAt: nowIso,
                })
                    .where('cabildeo', '=', req.cabildeoUri)
                    .execute();
            }
            return {
                cabildeoUri: req.cabildeoUri,
                present: false,
            };
        }
        let session = await (0, cabildeo_live_1.getActiveLiveSession)(db, req.cabildeoUri, now);
        if (!session) {
            if (!req.hostLiveUri) {
                return {
                    cabildeoUri: req.cabildeoUri,
                    present: false,
                };
            }
            await db.db
                .insertInto('cabildeo_live_session')
                .values({
                cabildeo: req.cabildeoUri,
                hostDid: req.actorDid,
                liveUri: req.hostLiveUri,
                startedAt: nowIso,
                endedAt: null,
                createdAt: nowIso,
                updatedAt: nowIso,
            })
                .onConflict((oc) => oc.column('cabildeo').doUpdateSet({
                hostDid: req.actorDid,
                liveUri: req.hostLiveUri,
                startedAt: nowIso,
                endedAt: null,
                updatedAt: nowIso,
            }))
                .execute();
            session = await (0, cabildeo_live_1.getActiveLiveSession)(db, req.cabildeoUri, now);
        }
        else if (session.hostDid === req.actorDid &&
            req.hostLiveUri &&
            req.hostLiveUri !== session.liveUri) {
            await db.db
                .updateTable('cabildeo_live_session')
                .set({
                liveUri: req.hostLiveUri,
                updatedAt: nowIso,
            })
                .where('cabildeo', '=', req.cabildeoUri)
                .execute();
        }
        const expiresAt = (0, cabildeo_live_1.presenceExpiry)();
        const existing = await db.db
            .selectFrom('cabildeo_live_presence')
            .where('cabildeo', '=', req.cabildeoUri)
            .where('actorDid', '=', req.actorDid)
            .where('sessionId', '=', req.sessionId)
            .select(['joinedAt'])
            .executeTakeFirst();
        if (existing) {
            await db.db
                .updateTable('cabildeo_live_presence')
                .set({
                lastHeartbeatAt: nowIso,
                expiresAt,
            })
                .where('cabildeo', '=', req.cabildeoUri)
                .where('actorDid', '=', req.actorDid)
                .where('sessionId', '=', req.sessionId)
                .execute();
        }
        else {
            await db.db
                .insertInto('cabildeo_live_presence')
                .values({
                cabildeo: req.cabildeoUri,
                actorDid: req.actorDid,
                sessionId: req.sessionId,
                joinedAt: nowIso,
                lastHeartbeatAt: nowIso,
                expiresAt,
            })
                .execute();
        }
        return {
            cabildeoUri: req.cabildeoUri,
            present: true,
            expiresAt,
        };
    },
});
const selectCandidateCommunityBoard = async (db, communityId) => {
    const normalizedSlug = normalizeCommunitySlug(communityId);
    if (communityId.startsWith('at://')) {
        const byUri = await db.db
            .selectFrom('para_community_board')
            .where('uri', '=', communityId)
            .select(['uri', 'name', 'slug'])
            .executeTakeFirst();
        if (byUri)
            return byUri;
    }
    return db.db
        .selectFrom('para_community_board')
        .where((0, kysely_1.sql) `(
        "slug" = ${normalizedSlug}
        or regexp_replace(lower(coalesce("name", '')), '[^a-z0-9]+', '-', 'g') = ${normalizedSlug}
      )`)
        .select(['uri', 'name', 'slug'])
        .executeTakeFirst();
};
const selectDelegateLikeMembers = async (db, communityUri) => db.db
    .selectFrom('para_community_membership')
    .where('communityUri', '=', communityUri)
    .where('membershipState', '=', 'active')
    .where((0, kysely_1.sql) `coalesce("roles", array[]::text[]) && array[
        'delegate',
        'delegado',
        'representative',
        'representante',
        'moderator',
        'official',
        'deputy',
        'subdelegate',
        'agent'
      ]::text[]`)
    .select(['creator', 'roles'])
    .execute();
const assertActiveCommunityViewer = async (db, opts) => {
    if (opts.viewerIsAdmin)
        return;
    if (!opts.viewerDid) {
        throw new connect_1.ConnectError('Active community membership is required', connect_1.Code.PermissionDenied);
    }
    const membership = await db.db
        .selectFrom('para_community_membership')
        .where('creator', '=', opts.viewerDid)
        .where('communityUri', '=', opts.communityUri)
        .where('membershipState', '=', 'active')
        .select(['uri'])
        .executeTakeFirst();
    if (!membership) {
        throw new connect_1.ConnectError('Active community membership is required', connect_1.Code.PermissionDenied);
    }
};
const getCandidateGovernanceRecord = async (db, community, slug) => {
    const suffix = `/com.para.community.governance/${slug || 'community'}`;
    const slugMatch = await db.db
        .selectFrom('record')
        .select(['json'])
        .where('uri', 'like', `%${suffix}`)
        .orderBy('indexedAt', 'desc')
        .executeTakeFirst();
    if (slugMatch)
        return parseCandidateGovernance(slugMatch.json);
    const normalizedCommunity = normalizeCommunityKey(community);
    const recordMatch = await db.db
        .selectFrom('record')
        .select(['json'])
        .where('uri', 'like', '%/com.para.community.governance/%')
        .where((0, kysely_1.sql) `regexp_replace(lower(translate(regexp_replace(coalesce(("record"."json"::jsonb ->> 'community'), ''), '^p/', '', 'i'), ${COMMUNITY_TRANSLATION_SOURCE}, ${COMMUNITY_TRANSLATION_TARGET})), '[^a-z0-9]+', '', 'g')`, '=', normalizedCommunity)
        .orderBy('indexedAt', 'desc')
        .executeTakeFirst();
    return recordMatch ? parseCandidateGovernance(recordMatch.json) : null;
};
const parseCandidateGovernance = (json) => {
    try {
        const parsed = JSON.parse(json);
        if (!parsed || typeof parsed !== 'object')
            return null;
        return parsed;
    }
    catch {
        return null;
    }
};
const addGovernanceCandidates = (rolesByDid, governance) => {
    for (const moderator of governance?.moderators ?? []) {
        if (!moderator.did)
            continue;
        const roles = ensureRoleSet(rolesByDid, moderator.did);
        roles.add(moderator.role || 'moderator');
    }
    for (const official of governance?.officials ?? []) {
        if (!official.did)
            continue;
        const roles = ensureRoleSet(rolesByDid, official.did);
        roles.add(official.office || 'official');
    }
    for (const deputy of governance?.deputies ?? []) {
        const holder = deputy.activeHolder;
        if (!holder?.did)
            continue;
        const roles = ensureRoleSet(rolesByDid, holder.did);
        roles.add(deputy.role || 'deputy');
    }
};
const ensureRoleSet = (map, did) => {
    let set = map.get(did);
    if (!set) {
        set = new Set();
        map.set(did, set);
    }
    return set;
};
const hydrateCandidateProfiles = async (db, dids) => {
    const rows = await db.db
        .selectFrom('actor')
        .leftJoin('profile', 'profile.creator', 'actor.did')
        .where('actor.did', 'in', dids)
        .select([
        'actor.did',
        'actor.handle',
        'profile.displayName',
        'profile.description',
    ])
        .execute();
    return new Map(rows.map((row) => [row.did, row]));
};
const getCandidateDelegationCounts = async (db, dids) => {
    const rows = await db.db
        .selectFrom('cabildeo_delegation')
        .where('delegateTo', 'in', dids)
        .select(['delegateTo', (0, kysely_1.sql) `count(distinct "creator")`.as('count')])
        .groupBy('delegateTo')
        .execute();
    return new Map(rows.map((row) => [row.delegateTo, Number(row.count) || 0]));
};
const getCandidateVotes = async (db, cabildeoUri, dids) => {
    const rows = await db.db
        .selectFrom('cabildeo_vote')
        .where('cabildeo', '=', cabildeoUri)
        .where('creator', 'in', dids)
        .select(['creator', 'selectedOption', 'createdAt'])
        .orderBy('sortAt', 'desc')
        .execute();
    const votes = new Map();
    for (const row of rows) {
        if (!votes.has(row.creator)) {
            votes.set(row.creator, {
                selectedOption: row.selectedOption,
                createdAt: row.createdAt,
            });
        }
    }
    return votes;
};
class RankedTimeCidKeyset extends pagination_1.TimeCidKeyset {
    labelResult(result) {
        return { primary: result.sortRank, secondary: result.cid };
    }
}
const mapCabildeoRow = async (db, row, viewerDid, now) => {
    const options = asOptions(row.options);
    const voteCounts = asNumberArray(row.optionVoteCounts, options.length);
    const positionCounts = asNumberArray(row.optionPositionCounts, options.length);
    const optionSummary = options.map((option, optionIndex) => ({
        optionIndex,
        label: option.label,
        votes: voteCounts[optionIndex] || 0,
        positions: positionCounts[optionIndex] || 0,
    }));
    const positionSummary = {
        total: row.positionCount,
        forCount: row.positionForCount,
        againstCount: row.positionAgainstCount,
        amendmentCount: row.positionAmendmentCount,
        byOption: optionSummary,
    };
    const voteTotals = {
        total: row.voteCount,
        direct: row.directVoteCount,
        delegated: row.delegatedVoteCount,
    };
    const outcomeSummary = row.phase === 'resolved'
        ? {
            winningOption: typeof row.winningOption === 'number'
                ? row.winningOption
                : undefined,
            totalParticipants: row.voteCount,
            effectiveTotalPower: row.voteCount,
            tie: row.isTie === 1,
            breakdown: optionSummary,
        }
        : undefined;
    const viewerContext = viewerDid
        ? await getViewerContext(db, row.uri, viewerDid)
        : undefined;
    const liveSession = (0, cabildeo_live_1.isLiveCabildeoPhase)(row.phase)
        ? await (0, cabildeo_live_1.getLiveSessionSummary)(db, row.uri, now ?? new Date())
        : undefined;
    return {
        uri: row.uri,
        cid: row.cid,
        creator: row.creator,
        indexedAt: row.indexedAt,
        title: row.title,
        description: row.description,
        community: row.community,
        communities: asStringArray(row.communities),
        flairs: asStringArray(row.flairs),
        region: row.region ?? '',
        geoRestricted: row.geoRestricted === 1,
        options,
        minQuorum: typeof row.minQuorum === 'number' && row.minQuorum > 0
            ? row.minQuorum
            : undefined,
        phase: row.phase,
        phaseDeadline: row.phaseDeadline ?? '',
        createdAt: row.createdAt,
        optionSummary,
        positionCounts: positionSummary,
        voteTotals,
        outcomeSummary,
        viewerContext,
        liveSession,
    };
};
const getViewerContext = async (db, cabildeoUri, viewerDid) => {
    const [currentVote, delegation] = await Promise.all([
        db.db
            .selectFrom('cabildeo_vote')
            .where('creator', '=', viewerDid)
            .where('cabildeo', '=', cabildeoUri)
            .orderBy('sortAt', 'desc')
            .orderBy('cid', 'desc')
            .select(['selectedOption', 'isDirect'])
            .executeTakeFirst(),
        db.db
            .selectFrom('cabildeo_delegation')
            .where('creator', '=', viewerDid)
            .where((qb) => qb.where('cabildeo', '=', cabildeoUri).orWhere('cabildeo', 'is', null))
            .orderBy((0, kysely_1.sql) `case when "cabildeo" = ${cabildeoUri} then 0 else 1 end`)
            .orderBy('createdAt', 'desc')
            .orderBy('indexedAt', 'desc')
            .select(['delegateTo'])
            .executeTakeFirst(),
    ]);
    const delegateVote = delegation?.delegateTo && delegation.delegateTo.length
        ? await db.db
            .selectFrom('cabildeo_vote')
            .where('creator', '=', delegation.delegateTo)
            .where('cabildeo', '=', cabildeoUri)
            .orderBy('sortAt', 'desc')
            .orderBy('cid', 'desc')
            .select(['selectedOption', 'createdAt'])
            .executeTakeFirst()
        : null;
    const delegatedVotedAt = delegateVote?.createdAt ?? '';
    const gracePeriodEndsAt = delegatedVotedAt
        ? new Date(new Date(delegatedVotedAt).getTime() + 24 * 60 * 60 * 1000).toISOString()
        : '';
    return {
        currentVoteOption: typeof currentVote?.selectedOption === 'number'
            ? currentVote.selectedOption
            : undefined,
        currentVoteIsDirect: currentVote?.isDirect === 1,
        activeDelegation: delegation?.delegateTo ?? '',
        delegateHasVoted: !!delegateVote,
        delegatedVoteOption: typeof delegateVote?.selectedOption === 'number'
            ? delegateVote.selectedOption
            : undefined,
        delegatedVotedAt,
        gracePeriodEndsAt,
        delegateVoteDismissed: false,
    };
};
const asOptions = (value) => {
    if (!Array.isArray(value))
        return [];
    return value
        .filter((item) => typeof item === 'object' && item !== null)
        .map((item) => ({
        label: typeof item.label === 'string' ? item.label : '',
        description: typeof item.description === 'string' ? item.description : '',
        isConsensus: item.isConsensus === true,
    }));
};
const asStringArray = (value) => {
    if (!Array.isArray(value))
        return [];
    return value.filter((item) => typeof item === 'string');
};
const asNumberArray = (value, length) => {
    const base = Array.from({ length }, () => 0);
    if (!Array.isArray(value))
        return base;
    for (let i = 0; i < Math.min(value.length, length); i++) {
        const current = value[i];
        if (typeof current === 'number' && Number.isFinite(current)) {
            base[i] = Math.max(0, Math.floor(current));
        }
    }
    return base;
};
const normalizeCommunity = (value) => {
    return value?.trim().toLowerCase().replace(/^p\//, '') || '';
};
const COMMUNITY_TRANSLATION_SOURCE = 'ÁÀÄÂÃáàäâãÉÈËÊéèëêÍÌÏÎíìïîÓÒÖÔÕóòöôõÚÙÜÛúùüûÑñÇç';
const COMMUNITY_TRANSLATION_TARGET = 'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuNnCc';
const normalizeCommunityKey = (value) => value
    .trim()
    .replace(/^p\//i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
const normalizeCommunitySlug = (value) => value
    .trim()
    .replace(/^p\//i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const normalizeLimit = (limit) => {
    if (!limit || Number.isNaN(limit))
        return 50;
    return Math.max(1, Math.min(limit, 100));
};
const decodeOffsetCursor = (cursor) => {
    if (!cursor)
        return 0;
    const parsed = Number.parseInt(cursor, 10);
    if (!Number.isFinite(parsed) || parsed < 0)
        return 0;
    return parsed;
};
const encodeOffsetCursor = (offset) => String(Math.max(0, offset));
//# sourceMappingURL=cabildeo.js.map
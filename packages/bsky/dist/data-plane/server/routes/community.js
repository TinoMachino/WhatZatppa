"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("@connectrpc/connect");
const kysely_1 = require("kysely");
const ComParaCommunityGovernance = __importStar(require("../../../lexicon/types/com/para/community/governance"));
const bsky_pb_1 = require("../../../proto/bsky_pb");
const util_1 = require("../db/util");
exports.default = (db) => ({
    async getParaCommunityBoard(req) {
        const board = await selectBoard(db, req.communityId, req.uri);
        if (!board) {
            return new bsky_pb_1.GetParaCommunityBoardResponse();
        }
        const [viewerMembership, memberCount, governanceSummary] = await Promise.all([
            req.viewerDid
                ? getViewerMemberships(db, req.viewerDid, [board.uri]).then((memberships) => memberships.get(board.uri))
                : Promise.resolve(undefined),
            getMemberCounts(db, [board.uri]).then((counts) => counts.get(board.uri) ?? 0),
            getGovernanceSummary(db, board.name, board.slug),
        ]);
        return new bsky_pb_1.GetParaCommunityBoardResponse({
            board: toBoardView(board, memberCount, viewerMembership),
            governanceSummary: governanceSummary ?? undefined,
        });
    },
    async getParaCommunityBoards(req) {
        const result = await selectBoards(db, {
            limit: normalizeLimit(req.limit),
            cursor: req.cursor,
            query: req.query,
            state: req.state,
            participationKind: req.participationKind,
            flairId: req.flairId,
            sort: req.sort,
            quadrant: req.quadrant,
        });
        if (result.boards.length === 0) {
            return new bsky_pb_1.GetParaCommunityBoardsResponse({ boards: [] });
        }
        const uris = result.boards.map((board) => board.uri);
        const [memberCounts, viewerMemberships] = await Promise.all([
            getMemberCounts(db, uris),
            req.viewerDid
                ? getViewerMemberships(db, req.viewerDid, uris)
                : Promise.resolve(new Map()),
        ]);
        return new bsky_pb_1.GetParaCommunityBoardsResponse({
            boards: result.boards.map((board) => toBoardView(board, memberCounts.get(board.uri) ?? 0, viewerMemberships.get(board.uri))),
            cursor: result.cursor,
        });
    },
    async getParaCommunityMembers(req) {
        const board = await selectBoard(db, req.communityId, undefined);
        if (!board) {
            return new bsky_pb_1.GetParaCommunityMembersResponse({ members: [] });
        }
        await assertActiveCommunityViewer(db, {
            communityUri: board.uri,
            viewerDid: req.viewerDid,
            viewerIsAdmin: req.viewerIsAdmin,
        });
        const result = await selectMembers(db, board.uri, {
            membershipState: req.membershipState,
            role: req.role,
            sort: req.sort,
            limit: normalizeLimit(req.limit),
            cursor: req.cursor,
        });
        return new bsky_pb_1.GetParaCommunityMembersResponse({
            members: result.members.map((member) => new bsky_pb_1.ParaCommunityMemberView(member)),
            cursor: result.cursor,
        });
    },
    async getParaCommunityGovernance(req) {
        const community = normalizeCommunitySlug(req.community);
        const [record, counters] = await Promise.all([
            getPublishedGovernanceRecord(db, req.community, community),
            getCommunityCounters(db, community),
        ]);
        const computedAt = new Date().toISOString();
        return new bsky_pb_1.GetParaCommunityGovernanceResponse({
            community,
            summary: new bsky_pb_1.ParaCommunitySummary(counters),
            moderators: record?.moderators.map((moderator) => new bsky_pb_1.ParaCommunityModerator({
                member: toGovernanceMember(moderator),
                role: moderator.role,
                badge: moderator.badge,
            })) ?? [],
            officials: record?.officials.map((official) => new bsky_pb_1.ParaCommunityOfficial({
                member: toGovernanceMember(official),
                office: official.office,
                mandate: official.mandate,
            })) ?? [],
            deputies: record?.deputies.map((deputy) => new bsky_pb_1.ParaCommunityDeputyRole({
                tier: deputy.tier,
                role: deputy.role,
                activeHolder: deputy.activeHolder
                    ? toGovernanceMember(deputy.activeHolder)
                    : undefined,
                votesBackingRole: deputy.votes,
                applicants: deputy.applicants.map((applicant) => applicant.displayName || applicant.handle || applicant.did || ''),
            })) ?? [],
            computedAt: record?.updatedAt || record?.createdAt || computedAt,
            metadata: record?.metadata
                ? new bsky_pb_1.ParaCommunityGovernanceMetadata({
                    termLengthDays: record.metadata.termLengthDays ?? 0,
                    reviewCadence: record.metadata.reviewCadence ?? '',
                    escalationPath: record.metadata.escalationPath ?? '',
                    publicContact: record.metadata.publicContact ?? '',
                    lastPublishedAt: record.metadata.lastPublishedAt ||
                        record.updatedAt ||
                        record.createdAt,
                    state: record.metadata.state ?? '',
                    matterFlairIds: record.metadata.matterFlairIds ?? [],
                    policyFlairIds: record.metadata.policyFlairIds ?? [],
                })
                : undefined,
            editHistory: record?.editHistory?.map((entry) => new bsky_pb_1.ParaCommunityGovernanceHistoryEntry({
                id: entry.id,
                action: entry.action,
                actorDid: entry.actorDid ?? '',
                actorHandle: entry.actorHandle ?? '',
                createdAt: entry.createdAt,
                summary: entry.summary,
            })) ?? [],
        });
    },
});
const selectBoard = async (db, communityId, uri) => {
    let builder = boardBaseQuery(db);
    if (uri) {
        builder = builder.where('board.uri', '=', uri);
    }
    else if (communityId) {
        const normalizedCommunity = normalizeCommunitySlug(communityId);
        builder = builder.where((0, kysely_1.sql) `(
        "board"."uri" = ${communityId}
        or "board"."slug" = ${communityId}
        or "board"."slug" = ${normalizedCommunity}
        or regexp_replace(lower(coalesce("board"."name", '')), '[^a-z0-9]+', '-', 'g') = ${normalizedCommunity}
      )`);
    }
    else {
        return undefined;
    }
    return (await builder.executeTakeFirst());
};
const selectBoards = async (db, opts) => {
    const pageOffset = decodeOffsetCursor(opts.cursor);
    let builder = boardBaseQuery(db);
    if (opts.quadrant) {
        builder = builder.where('board.quadrant', '=', opts.quadrant);
    }
    const state = opts.state?.trim();
    if (state) {
        builder = builder.where('gov.state', '=', state);
    }
    const flairId = opts.flairId?.trim();
    if (flairId) {
        if (opts.participationKind === 'matter') {
            builder = builder.where((0, kysely_1.sql) `gov."matterFlairIds" ? ${flairId}`);
        }
        else if (opts.participationKind === 'policy') {
            builder = builder.where((0, kysely_1.sql) `gov."policyFlairIds" ? ${flairId}`);
        }
    }
    const query = opts.query?.trim();
    if (query) {
        const like = `%${query.replace(/[%_]/g, '\\$&')}%`;
        builder = builder.where((0, kysely_1.sql) `(
        "board"."name" ilike ${like}
        or "board"."description" ilike ${like}
        or "board"."slug" ilike ${like}
        or "board"."quadrant" ilike ${like}
      )`);
    }
    const ordered = opts.sort === 'size'
        ? builder.orderBy((eb) => eb
            .selectFrom('para_community_membership')
            .whereRef('communityUri', '=', 'board.uri')
            .where('membershipState', '=', 'active')
            .select((0, kysely_1.sql) `count(*)`.as('memberCount')), 'desc')
        : opts.sort === 'activity'
            ? builder.orderBy('board.indexedAt', 'desc')
            : builder.orderBy('board.createdAt', 'desc');
    const rows = (await ordered
        .orderBy('board.cid', 'desc')
        .offset(pageOffset)
        .limit(opts.limit + 1)
        .execute());
    const page = rows.slice(0, opts.limit);
    const hasMore = rows.length > opts.limit;
    const nextOffset = pageOffset + page.length;
    return {
        boards: page,
        cursor: hasMore ? encodeOffsetCursor(nextOffset) : '',
    };
};
const boardBaseQuery = (db) => db.db
    .selectFrom('para_community_board as board')
    .leftJoin('actor as actor', 'actor.did', 'board.creator')
    .leftJoin('para_community_governance as gov', 'gov.communityUri', 'board.uri')
    .select([
    'board.uri',
    'board.cid',
    'board.creator',
    'board.slug',
    'board.name',
    'board.description',
    'board.quadrant',
    'board.delegatesChatId',
    'board.subdelegatesChatId',
    'board.createdAt',
    'gov.state',
    'gov.matterFlairIds',
    'gov.policyFlairIds',
    'gov.moderatorCount',
    'gov.officialCount',
    'gov.deputyRoleCount',
    'gov.lastPublishedAt',
])
    .select('actor.handle as creatorHandle')
    .select((0, kysely_1.sql) `null`.as('creatorDisplayName'));
const getMemberCounts = async (db, communityUris) => {
    if (communityUris.length === 0) {
        return new Map();
    }
    const rows = await db.db
        .selectFrom('para_community_membership')
        .where('communityUri', 'in', communityUris)
        .where('membershipState', '=', 'active')
        .select([
        'communityUri',
        (0, kysely_1.sql) `count(*)`.as('memberCount'),
    ])
        .groupBy('communityUri')
        .execute();
    return new Map(rows.map((row) => [row.communityUri, Number(row.memberCount) || 0]));
};
const getViewerMemberships = async (db, viewerDid, communityUris) => {
    if (!viewerDid || communityUris.length === 0) {
        return new Map();
    }
    const rows = await db.db
        .selectFrom('para_community_membership')
        .where('creator', '=', viewerDid)
        .where('communityUri', 'in', communityUris)
        .select(['communityUri', 'creator', 'membershipState', 'roles', 'joinedAt'])
        .execute();
    return new Map(rows.map((row) => [row.communityUri, row]));
};
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
const toBoardView = (board, memberCount, viewerMembership) => new bsky_pb_1.ParaCommunityBoardView({
    uri: board.uri,
    cid: board.cid,
    creatorDid: board.creator,
    creatorHandle: board.creatorHandle ?? '',
    creatorDisplayName: board.creatorDisplayName ?? '',
    communityId: board.slug,
    slug: board.slug,
    name: board.name,
    description: board.description ?? '',
    quadrant: board.quadrant,
    delegatesChatId: board.delegatesChatId,
    subdelegatesChatId: board.subdelegatesChatId,
    memberCount,
    viewerMembershipState: viewerMembership?.membershipState ?? 'none',
    viewerRoles: viewerMembership?.roles ?? [],
    status: board.state ?? undefined,
    governanceSummary: {
        moderatorCount: board.moderatorCount ?? 0,
        officialCount: board.officialCount ?? 0,
        deputyRoleCount: board.deputyRoleCount ?? 0,
        lastPublishedAt: board.lastPublishedAt ?? undefined,
    },
    createdAt: board.createdAt,
});
const selectMembers = async (db, communityUri, opts) => {
    const offset = decodeOffsetCursor(opts.cursor);
    const requestedState = opts.membershipState?.trim() || 'active';
    let builder = db.db
        .selectFrom('para_community_membership as membership')
        .leftJoin('actor as actor', 'actor.did', 'membership.creator')
        .leftJoin('profile as profile', 'profile.creator', 'membership.creator')
        .where('membership.communityUri', '=', communityUri)
        .where('membership.membershipState', '=', requestedState)
        .select([
        'membership.creator as did',
        'membership.membershipState',
        'membership.roles',
        'membership.joinedAt',
        'actor.handle as handle',
        'profile.displayName as displayName',
    ]);
    const role = opts.role?.trim();
    if (role) {
        builder = builder.where((0, kysely_1.sql) `${role} = any(coalesce("membership"."roles", array[]::text[]))`);
    }
    const ordered = opts.sort === 'participation'
        ? builder.orderBy((eb) => eb
            .selectFrom('cabildeo_vote')
            .whereRef('creator', '=', 'membership.creator')
            .select((0, kysely_1.sql) `count(*)`.as('voteCount')), 'desc')
        : builder.orderBy('membership.joinedAt', 'desc');
    const rows = await ordered
        .orderBy('membership.cid', 'desc')
        .offset(offset)
        .limit(opts.limit + 1)
        .execute();
    const page = rows.slice(0, opts.limit);
    const dids = page.map((row) => row.did);
    const [voteCounts, delegationCounts, postCounts] = await Promise.all([
        getVoteCounts(db, dids),
        getDelegationCounts(db, dids),
        getCommunityPostCounts(db, dids, communityUri),
    ]);
    return {
        members: page.map((row) => {
            const postCount = postCounts.get(row.did);
            return {
                did: row.did,
                handle: row.handle ?? '',
                displayName: row.displayName ?? '',
                avatar: '',
                membershipState: row.membershipState,
                roles: row.roles ?? [],
                joinedAt: row.joinedAt,
                votesCast: voteCounts.get(row.did) ?? 0,
                delegationsReceived: delegationCounts.get(row.did) ?? 0,
                policyPosts: postCount?.policyPosts ?? 0,
                matterPosts: postCount?.matterPosts ?? 0,
            };
        }),
        cursor: rows.length > opts.limit ? encodeOffsetCursor(offset + page.length) : '',
    };
};
const getVoteCounts = async (db, dids) => {
    if (dids.length === 0)
        return new Map();
    const rows = await db.db
        .selectFrom('cabildeo_vote')
        .where('creator', 'in', dids)
        .select(['creator', (0, kysely_1.sql) `count(*)`.as('count')])
        .groupBy('creator')
        .execute();
    return new Map(rows.map((row) => [row.creator, Number(row.count) || 0]));
};
const getDelegationCounts = async (db, dids) => {
    if (dids.length === 0)
        return new Map();
    const rows = await db.db
        .selectFrom('cabildeo_delegation')
        .where('delegateTo', 'in', dids)
        .select(['delegateTo', (0, kysely_1.sql) `count(distinct "creator")`.as('count')])
        .groupBy('delegateTo')
        .execute();
    return new Map(rows.map((row) => [row.delegateTo, Number(row.count) || 0]));
};
const getCommunityPostCounts = async (db, dids, communityUri) => {
    if (dids.length === 0) {
        return new Map();
    }
    const board = await db.db
        .selectFrom('para_community_board')
        .where('uri', '=', communityUri)
        .select(['name', 'slug'])
        .executeTakeFirst();
    const community = board ? normalizeCommunitySlug(board.slug || board.name) : '';
    let builder = db.db
        .selectFrom('para_post_meta')
        .where('creator', 'in', dids)
        .select(['creator'])
        .select((0, kysely_1.sql) `coalesce(sum(case when "postType" = 'policy' then 1 else 0 end), 0)`.as('policyPosts'))
        .select((0, kysely_1.sql) `coalesce(sum(case when "postType" = 'matter' then 1 else 0 end), 0)`.as('matterPosts'))
        .groupBy('creator');
    if (community) {
        builder = builder.where((0, kysely_1.sql) `regexp_replace(lower(coalesce("community", '')), '[^a-z0-9]+', '-', 'g')`, '=', community);
    }
    const rows = await builder.execute();
    return new Map(rows.map((row) => [
        row.creator,
        {
            policyPosts: Number(row.policyPosts) || 0,
            matterPosts: Number(row.matterPosts) || 0,
        },
    ]));
};
const getGovernanceSummary = async (db, community, slug) => {
    const record = await getPublishedGovernanceRecord(db, community, slug);
    if (!record)
        return null;
    return new bsky_pb_1.ParaCommunityGovernanceSummary({
        moderatorCount: record.moderators.length,
        officialCount: record.officials.length,
        deputyRoleCount: record.deputies.length,
        lastPublishedAt: record.metadata?.lastPublishedAt || record.updatedAt || record.createdAt,
    });
};
const getCommunityCounters = async (db, community) => {
    const [members, posters, posts, badges] = await Promise.all([
        db.db
            .selectFrom('para_status')
            .where((0, kysely_1.sql) `regexp_replace(lower(coalesce("community", '')), '[^a-z0-9]+', '-', 'g')`, '=', community)
            .select(util_1.countAll.as('count'))
            .executeTakeFirst(),
        db.db
            .selectFrom('para_post_meta')
            .where((0, kysely_1.sql) `regexp_replace(lower(coalesce("community", '')), '[^a-z0-9]+', '-', 'g')`, '=', community)
            .select((0, kysely_1.sql) `count(distinct "creator")`.as('count'))
            .executeTakeFirst(),
        db.db
            .selectFrom('para_post_meta')
            .where((0, kysely_1.sql) `regexp_replace(lower(coalesce("community", '')), '[^a-z0-9]+', '-', 'g')`, '=', community)
            .select((0, kysely_1.sql) `coalesce(sum(case when "postType" = 'policy' then 1 else 0 end), 0)`.as('policyPosts'))
            .select((0, kysely_1.sql) `coalesce(sum(case when "postType" = 'matter' then 1 else 0 end), 0)`.as('matterPosts'))
            .executeTakeFirst(),
        db.db
            .selectFrom('para_status')
            .where((0, kysely_1.sql) `regexp_replace(lower(coalesce("party", '')), '[^a-z0-9]+', '', 'g')`, '!=', '')
            .where((0, kysely_1.sql) `regexp_replace(lower(coalesce("community", '')), '[^a-z0-9]+', '-', 'g')`, '=', community)
            .select(util_1.countAll.as('count'))
            .executeTakeFirst(),
    ]);
    return {
        members: Number(members?.count ?? 0),
        visiblePosters: Number(posters?.count ?? 0),
        policyPosts: Number(posts?.policyPosts ?? 0),
        matterPosts: Number(posts?.matterPosts ?? 0),
        badgeHolders: Number(badges?.count ?? 0),
    };
};
const toGovernanceMember = (person) => new bsky_pb_1.ParaCommunityMember({
    did: person.did ?? '',
    handle: person.handle ?? undefined,
    displayName: person.displayName ?? undefined,
    avatar: person.avatar ?? undefined,
});
const COMMUNITY_TRANSLATION_SOURCE = 'ÁÀÄÂÃáàäâãÉÈËÊéèëêÍÌÏÎíìïîÓÒÖÔÕóòöôõÚÙÜÛúùüûÑñÇç';
const COMMUNITY_TRANSLATION_TARGET = 'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuNnCc';
const getPublishedGovernanceRecord = async (db, community, slug) => {
    const suffix = `/com.para.community.governance/${slug || 'community'}`;
    const slugMatch = await db.db
        .selectFrom('record')
        .select(['json'])
        .where('uri', 'like', `%${suffix}`)
        .orderBy('indexedAt', 'desc')
        .executeTakeFirst();
    if (slugMatch) {
        return parseGovernanceRecord(slugMatch.json);
    }
    const normalizedCommunity = normalizeCommunityKey(community);
    const recordMatch = await db.db
        .selectFrom('record')
        .select(['json'])
        .where('uri', 'like', '%/com.para.community.governance/%')
        .where((0, kysely_1.sql) `regexp_replace(lower(translate(regexp_replace(coalesce(("record"."json"::jsonb ->> 'community'), ''), '^p/', '', 'i'), ${COMMUNITY_TRANSLATION_SOURCE}, ${COMMUNITY_TRANSLATION_TARGET})), '[^a-z0-9]+', '', 'g')`, '=', normalizedCommunity)
        .orderBy('indexedAt', 'desc')
        .executeTakeFirst();
    return recordMatch ? parseGovernanceRecord(recordMatch.json) : null;
};
const parseGovernanceRecord = (json) => {
    try {
        const parsed = JSON.parse(json);
        const validated = ComParaCommunityGovernance.validateRecord(parsed);
        if (validated.success)
            return validated.value;
        if (typeof parsed?.community === 'string' &&
            typeof parsed?.slug === 'string' &&
            Array.isArray(parsed?.moderators) &&
            Array.isArray(parsed?.officials) &&
            Array.isArray(parsed?.deputies)) {
            return parsed;
        }
        return null;
    }
    catch {
        return null;
    }
};
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
//# sourceMappingURL=community.js.map
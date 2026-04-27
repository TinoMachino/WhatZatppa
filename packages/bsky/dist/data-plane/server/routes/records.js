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
exports.getPostRecords = exports.getRecords = void 0;
const protobuf_1 = require("@bufbuild/protobuf");
const kysely_1 = require("kysely");
const ui8 = __importStar(require("uint8arrays"));
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../../../lexicons/index.js");
const bsky_pb_1 = require("../../../proto/bsky_pb");
exports.default = (db) => ({
    getBlockRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.block),
    getFeedGeneratorRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.feed.generator),
    getFollowRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.follow),
    getLikeRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.feed.like),
    getListBlockRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.listblock),
    getListItemRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.listitem),
    getListRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.list),
    getPostRecords: (0, exports.getPostRecords)(db),
    getProfileRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.actor.profile),
    getRepostRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.feed.repost),
    getThreadGateRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.feed.threadgate),
    getPostgateRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.feed.postgate),
    getLabelerRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.labeler.service),
    getActorChatDeclarationRecords: (0, exports.getRecords)(db, index_js_1.chat.bsky.actor.declaration),
    getNotificationDeclarationRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.notification.declaration),
    getGermDeclarationRecords: (0, exports.getRecords)(db, index_js_1.com.germnetwork.declaration),
    getStarterPackRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.starterpack),
    getVerificationRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.graph.verification),
    getStatusRecords: (0, exports.getRecords)(db, index_js_1.app.bsky.actor.status),
    async getParaPostMeta(req) {
        const [post, meta, agg] = await Promise.all([
            db.db
                .selectFrom('para_post')
                .selectAll()
                .where('uri', '=', req.postUri)
                .executeTakeFirst(),
            db.db
                .selectFrom('para_post_meta')
                .selectAll()
                .where('postUri', '=', req.postUri)
                .executeTakeFirst(),
            db.db
                .selectFrom('post_agg')
                .selectAll()
                .where('uri', '=', req.postUri)
                .executeTakeFirst(),
        ]);
        if (!post) {
            return {};
        }
        return {
            post: new bsky_pb_1.ParaPostMeta({
                uri: post.uri,
                author: post.creator,
                postType: meta?.postType ?? post.postType ?? undefined,
                official: meta?.official ?? undefined,
                party: meta?.party ?? undefined,
                community: meta?.community ?? undefined,
                category: meta?.category ?? undefined,
                tags: meta?.tags ?? post.tags ?? [],
                flairs: meta?.flairs ?? post.flairs ?? [],
                voteScore: meta?.voteScore ?? agg?.likeCount ?? 0,
                interactionMode: (meta?.postType ?? post.postType) === 'policy'
                    ? 'policy_ballot'
                    : 'reddit_votes',
                createdAt: meta?.createdAt ?? post.createdAt,
            }),
        };
    },
    async getParaPolicyTally(req) {
        const post = await db.db
            .selectFrom('para_post as post')
            .leftJoin('para_post_meta as meta', 'meta.postUri', 'post.uri')
            .select([
            'post.uri as postUri',
            'post.postType as postType',
            'meta.official as official',
            'meta.community as community',
        ])
            .where('post.uri', '=', req.postUri)
            .executeTakeFirst();
        if (!post || post.postType !== 'policy') {
            return {};
        }
        const [aggregate, breakdown, eligibleVoterCount] = await Promise.all([
            db.db
                .selectFrom('para_policy_vote')
                .where('subject', '=', req.postUri)
                .where('subjectType', '=', 'policy')
                .select([
                (0, kysely_1.sql) `count(*)`.as('voteCount'),
                (0, kysely_1.sql) `coalesce(sum(case when "isDirect" = 1 then 1 else 0 end), 0)`.as('directVoteCount'),
                (0, kysely_1.sql) `coalesce(sum(case when "isDirect" = 0 then 1 else 0 end), 0)`.as('delegatedVoteCount'),
                (0, kysely_1.sql) `coalesce(sum("signal"), 0)`.as('signalSum'),
            ])
                .executeTakeFirst(),
            db.db
                .selectFrom('para_policy_vote')
                .where('subject', '=', req.postUri)
                .where('subjectType', '=', 'policy')
                .select([
                'signal',
                (0, kysely_1.sql) `count(*)`.as('count'),
            ])
                .groupBy('signal')
                .orderBy('signal', 'asc')
                .execute(),
            getEligiblePolicyVoterCount(db, post.community ?? ''),
        ]);
        const voteCount = Number(aggregate?.voteCount) || 0;
        const directVoteCount = Number(aggregate?.directVoteCount) || 0;
        const delegatedVoteCount = Number(aggregate?.delegatedVoteCount) || 0;
        const signalSum = Number(aggregate?.signalSum) || 0;
        const signalAverage = voteCount > 0 ? signalSum / voteCount : 0;
        const quorumTarget = getPolicyQuorumTarget(eligibleVoterCount);
        const quorumMet = voteCount >= quorumTarget;
        const outcome = getPolicyOutcome({ quorumMet, signalAverage });
        const certified = Boolean(post.official) && isPassedOutcome(outcome);
        const official = certified;
        return {
            tally: new bsky_pb_1.ParaPolicyTally({
                subject: req.postUri,
                subjectType: 'policy',
                community: post.community ?? '',
                voteCount,
                directVoteCount,
                delegatedVoteCount,
                signalSum,
                signalAverage,
                eligibleVoterCount,
                quorumTarget,
                quorumMet,
                official,
                certified,
                outcome,
                state: getPolicyState({ outcome, official, voteCount, quorumMet }),
                breakdown: buildSignalBreakdown(breakdown),
                computedAt: new Date().toISOString(),
            }),
        };
    },
});
const getRecords = (db, ns) => {
    const collection = ns ? lex_1.l.getMain(ns).$type : undefined;
    return async (req) => {
        const validUris = collection
            ? req.uris.filter((uri) => new syntax_1.AtUri(uri).collection === collection)
            : req.uris;
        const res = validUris.length
            ? await db.db
                .selectFrom('record')
                .selectAll()
                .where('uri', 'in', validUris)
                .execute()
            : [];
        const byUri = (0, common_1.keyBy)(res, 'uri');
        const records = req.uris.map((uri) => {
            const row = byUri.get(uri);
            const json = row ? row.json : JSON.stringify(null);
            const createdAtRaw = new Date(JSON.parse(json)?.['createdAt']);
            const createdAt = !isNaN(createdAtRaw.getTime())
                ? protobuf_1.Timestamp.fromDate(createdAtRaw)
                : undefined;
            const indexedAt = row?.indexedAt
                ? protobuf_1.Timestamp.fromDate(new Date(row?.indexedAt))
                : undefined;
            const recordBytes = ui8.fromString(json, 'utf8');
            return new bsky_pb_1.Record({
                record: recordBytes,
                cid: row?.cid,
                createdAt,
                indexedAt,
                sortedAt: compositeTime(createdAt, indexedAt),
                takenDown: !!row?.takedownRef,
                takedownRef: row?.takedownRef ?? undefined,
                tags: row?.tags ?? undefined,
            });
        });
        return { records };
    };
};
exports.getRecords = getRecords;
const getPostRecords = (db) => {
    const getBaseRecords = (0, exports.getRecords)(db, index_js_1.app.bsky.feed.post);
    return async (req) => {
        const [{ records }, details] = await Promise.all([
            getBaseRecords(req),
            req.uris.length
                ? await db.db
                    .selectFrom('post')
                    .where('uri', 'in', req.uris)
                    .select([
                    'uri',
                    'violatesThreadGate',
                    'violatesEmbeddingRules',
                    'hasThreadGate',
                    'hasPostGate',
                ])
                    .execute()
                : [],
        ]);
        const byKey = (0, common_1.keyBy)(details, 'uri');
        const meta = req.uris.map((uri) => {
            return new bsky_pb_1.PostRecordMeta({
                violatesThreadGate: !!byKey.get(uri)?.violatesThreadGate,
                violatesEmbeddingRules: !!byKey.get(uri)?.violatesEmbeddingRules,
                hasThreadGate: !!byKey.get(uri)?.hasThreadGate,
                hasPostGate: !!byKey.get(uri)?.hasPostGate,
            });
        });
        return { records, meta };
    };
};
exports.getPostRecords = getPostRecords;
const compositeTime = (ts1, ts2) => {
    if (!ts1)
        return ts2;
    if (!ts2)
        return ts1;
    return ts1.toDate() < ts2.toDate() ? ts1 : ts2;
};
const getEligiblePolicyVoterCount = async (db, community) => {
    const normalizedCommunity = normalizeCommunity(community);
    if (!normalizedCommunity) {
        return 0;
    }
    const boardUris = await db.db
        .selectFrom('para_community_board')
        .select('uri')
        .where((qb) => qb
        .where((0, kysely_1.sql) `lower(regexp_replace(coalesce("slug", ''), '^p/', ''))`, '=', normalizedCommunity)
        .orWhere((0, kysely_1.sql) `lower(regexp_replace(coalesce("name", ''), '^p/', ''))`, '=', normalizedCommunity))
        .execute();
    if (boardUris.length === 0) {
        return 0;
    }
    const count = await db.db
        .selectFrom('para_community_membership')
        .where('communityUri', 'in', boardUris.map((row) => row.uri))
        .where('membershipState', '=', 'active')
        .select((0, kysely_1.sql) `count(*)`.as('memberCount'))
        .executeTakeFirst();
    return Number(count?.memberCount) || 0;
};
const getPolicyQuorumTarget = (eligibleVoterCount) => {
    if (eligibleVoterCount <= 0) {
        return 10;
    }
    return Math.max(10, Math.ceil(eligibleVoterCount * 0.2));
};
const getPolicyOutcome = ({ quorumMet, signalAverage, }) => {
    if (!quorumMet) {
        return 'insufficient_quorum';
    }
    if (signalAverage >= 2) {
        return 'strong_passed';
    }
    if (signalAverage >= 1) {
        return 'passed';
    }
    if (signalAverage <= -1) {
        return 'failed';
    }
    return 'contested';
};
const getPolicyState = ({ outcome, official, voteCount, quorumMet, }) => {
    if (official) {
        return 'official';
    }
    if (outcome === 'failed') {
        return 'failed';
    }
    if (outcome === 'passed' || outcome === 'strong_passed') {
        return 'passed';
    }
    if (outcome === 'contested') {
        return 'deliberation';
    }
    if (voteCount > 0 && !quorumMet) {
        return 'voting';
    }
    return 'draft';
};
const isPassedOutcome = (outcome) => outcome === 'passed' || outcome === 'strong_passed';
const buildSignalBreakdown = (rows) => {
    const counts = new Map(rows.map((row) => [Number(row.signal), Number(row.count)]));
    const buckets = [];
    for (let signal = -3; signal <= 3; signal++) {
        buckets.push(new bsky_pb_1.ParaPolicySignalBucket({
            signal,
            count: counts.get(signal) ?? 0,
        }));
    }
    return buckets;
};
const normalizeCommunity = (value) => value?.trim().toLowerCase().replace(/^p\//, '') || '';
//# sourceMappingURL=records.js.map
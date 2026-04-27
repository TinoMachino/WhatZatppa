"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
// @ts-nocheck
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const recompute_cabildeo_aggregates_1 = require("./recompute-cabildeo-aggregates");
const lexId = 'com.para.civic.vote';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    if (obj.subjectType === 'policy' && obj.subject && typeof obj.signal === 'number') {
        const inserted = await db
            .insertInto('para_policy_vote')
            .values({
            uri: uri.toString(),
            cid: cid.toString(),
            creator: uri.host,
            subject: obj.subject,
            subjectType: obj.subjectType,
            signal: obj.signal,
            isDirect: obj.isDirect ? 1 : 0,
            delegatedFrom: obj.delegatedFrom?.length
                ? (0, kysely_1.sql) `${JSON.stringify(obj.delegatedFrom)}`
                : null,
            reason: obj.reason ?? null,
            createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
            indexedAt: timestamp,
        })
            .onConflict((oc) => oc.columns(['creator', 'subjectType', 'subject']).doUpdateSet({
            uri: uri.toString(),
            cid: cid.toString(),
            signal: obj.signal,
            isDirect: obj.isDirect ? 1 : 0,
            delegatedFrom: obj.delegatedFrom?.length
                ? (0, kysely_1.sql) `${JSON.stringify(obj.delegatedFrom)}`
                : null,
            reason: obj.reason ?? null,
            createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
            indexedAt: timestamp,
        }))
            .returningAll()
            .executeTakeFirst();
        return inserted ? { policyRecord: inserted } : null;
    }
    if (!obj.cabildeo) {
        return null;
    }
    if (typeof obj.selectedOption !== 'number' || !Number.isInteger(obj.selectedOption)) {
        return null;
    }
    const eligibility = await getCabildeoVoteEligibility(db, {
        actorDid: uri.host,
        cabildeoUri: obj.cabildeo,
        selectedOption: obj.selectedOption,
        indexedAt: timestamp,
    });
    if (!eligibility) {
        return null;
    }
    const record = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        cabildeo: obj.cabildeo,
        selectedOption: obj.selectedOption ?? null,
        isDirect: obj.isDirect ? 1 : 0,
        delegatedFrom: obj.delegatedFrom?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.delegatedFrom)}`
            : null,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    };
    const inserted = await db
        .insertInto('cabildeo_vote')
        .values(record)
        .onConflict((oc) => oc.columns(['creator', 'cabildeo']).doUpdateSet({
        uri: record.uri,
        cid: record.cid,
        selectedOption: record.selectedOption,
        isDirect: record.isDirect,
        delegatedFrom: record.delegatedFrom,
        createdAt: record.createdAt,
        indexedAt: record.indexedAt,
    }))
        .returningAll()
        .executeTakeFirst();
    if (!inserted) {
        return null;
    }
    return { cabildeoRecord: inserted };
};
const findDuplicate = async () => {
    return null;
};
const getCabildeoVoteEligibility = async (db, opts) => {
    const cabildeo = await db
        .selectFrom('cabildeo_cabildeo')
        .where('uri', '=', opts.cabildeoUri)
        .select(['uri', 'community', 'options', 'phase', 'phaseDeadline'])
        .executeTakeFirst();
    if (!cabildeo || cabildeo.phase !== 'voting') {
        return null;
    }
    if (cabildeo.phaseDeadline &&
        new Date(cabildeo.phaseDeadline) <= new Date(opts.indexedAt)) {
        return null;
    }
    const options = Array.isArray(cabildeo.options) ? cabildeo.options : [];
    if (opts.selectedOption < 0 || opts.selectedOption >= options.length) {
        return null;
    }
    const community = normalizeCommunitySlug(cabildeo.community);
    const board = await db
        .selectFrom('para_community_board')
        .where((qb) => qb.or([
        qb('uri', '=', cabildeo.community),
        qb('slug', '=', community),
        qb((0, kysely_1.sql) `regexp_replace(lower(coalesce("name", '')), '[^a-z0-9]+', '-', 'g')`, '=', community),
    ]))
        .select(['uri'])
        .executeTakeFirst();
    if (!board) {
        return null;
    }
    const membership = await db
        .selectFrom('para_community_membership')
        .where('creator', '=', opts.actorDid)
        .where('communityUri', '=', board.uri)
        .where('membershipState', '=', 'active')
        .select(['uri'])
        .executeTakeFirst();
    return membership ? { cabildeo } : null;
};
const normalizeCommunitySlug = (value) => value
    .replace(/^p\//, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deletedPolicy = await db
        .deleteFrom('para_policy_vote')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    if (deletedPolicy) {
        return { policyRecord: deletedPolicy };
    }
    const deletedCabildeo = await db
        .deleteFrom('cabildeo_vote')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deletedCabildeo ? { cabildeoRecord: deletedCabildeo } : null;
};
const notifsForDelete = (deleted, _replacedBy) => {
    const uri = deleted.policyRecord?.uri || deleted.cabildeoRecord?.uri;
    return { notifs: [], toDelete: uri ? [uri] : [] };
};
const updateAggregates = async (db, indexed) => {
    if (indexed.cabildeoRecord) {
        await (0, recompute_cabildeo_aggregates_1.recomputeCabildeoAggregates)(db, indexed.cabildeoRecord.cabildeo);
    }
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        lexId,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
        updateAggregates,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=cabildeo-vote.js.map
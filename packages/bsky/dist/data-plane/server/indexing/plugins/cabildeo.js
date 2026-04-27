"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
// @ts-nocheck
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const recompute_cabildeo_aggregates_1 = require("./recompute-cabildeo-aggregates");
const lexId = 'com.para.civic.cabildeo';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const record = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        title: obj.title,
        description: obj.description,
        community: obj.community,
        communities: obj.communities?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.communities)}`
            : null,
        flairs: obj.flairs?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.flairs)}`
            : null,
        region: obj.region || null,
        geoRestricted: obj.geoRestricted ? 1 : 0,
        options: (0, kysely_1.sql) `${JSON.stringify(obj.options)}`,
        minQuorum: obj.minQuorum || null,
        phase: obj.phase,
        phaseDeadline: obj.phaseDeadline || null,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        positionCount: 0,
        positionForCount: 0,
        positionAgainstCount: 0,
        positionAmendmentCount: 0,
        voteCount: 0,
        directVoteCount: 0,
        delegatedVoteCount: 0,
        delegationCount: 0,
        optionVoteCounts: (0, kysely_1.sql) `'[]'::jsonb`,
        optionPositionCounts: (0, kysely_1.sql) `'[]'::jsonb`,
        winningOption: null,
        isTie: 0,
        indexedAt: timestamp,
    };
    const inserted = await db
        .insertInto('cabildeo_cabildeo')
        .values(record)
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    if (!inserted) {
        return null;
    }
    return { record: inserted };
};
const findDuplicate = async () => {
    return null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('cabildeo_cabildeo')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted ? { record: deleted } : null;
};
const notifsForDelete = (deleted, _replacedBy) => {
    return { notifs: [], toDelete: [deleted.record.uri] };
};
const updateAggregates = async (db, indexed) => {
    await (0, recompute_cabildeo_aggregates_1.recomputeCabildeoAggregates)(db, indexed.record.uri);
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
//# sourceMappingURL=cabildeo.js.map
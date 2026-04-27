"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
// @ts-nocheck
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const recompute_cabildeo_aggregates_1 = require("./recompute-cabildeo-aggregates");
const lexId = 'com.para.civic.delegation';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const record = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        cabildeo: obj.cabildeo || null,
        delegateTo: obj.delegateTo,
        scopeFlairs: obj.scopeFlairs?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.scopeFlairs)}`
            : null,
        reason: obj.reason || null,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    };
    const inserted = await db
        .insertInto('cabildeo_delegation')
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
        .deleteFrom('cabildeo_delegation')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted ? { record: deleted } : null;
};
const notifsForDelete = (deleted, _replacedBy) => {
    return { notifs: [], toDelete: [deleted.record.uri] };
};
const updateAggregates = async (db, indexed) => {
    const cabildeoUri = indexed.record.cabildeo;
    if (!cabildeoUri)
        return;
    await (0, recompute_cabildeo_aggregates_1.recomputeCabildeoAggregates)(db, cabildeoUri);
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
//# sourceMappingURL=cabildeo-delegation.js.map
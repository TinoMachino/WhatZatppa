"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const recompute_cabildeo_aggregates_1 = require("./recompute-cabildeo-aggregates");
const discourse_indexing_1 = require("../discourse-indexing");
const lexId = 'com.para.civic.position';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const record = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        cabildeo: obj.cabildeo,
        stance: obj.stance,
        optionIndex: obj.optionIndex ?? null,
        text: obj.text,
        compassQuadrant: obj.compassQuadrant || null,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    };
    const inserted = await db
        .insertInto('cabildeo_position')
        .values(record)
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    if (!inserted) {
        return null;
    }
    await (0, discourse_indexing_1.indexPostDiscourse)(db, uri, obj.text, timestamp);
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
        .deleteFrom('cabildeo_position')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    await (0, discourse_indexing_1.deletePostDiscourse)(db, uri);
    return deleted ? { record: deleted } : null;
};
const notifsForDelete = (deleted, _replacedBy) => {
    return { notifs: [], toDelete: [deleted.record.uri] };
};
const updateAggregates = async (db, indexed) => {
    await (0, recompute_cabildeo_aggregates_1.recomputeCabildeoAggregates)(db, indexed.record.cabildeo);
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
//# sourceMappingURL=cabildeo-position.js.map
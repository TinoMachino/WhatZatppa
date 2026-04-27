"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const index_js_1 = require("../../../../lexicons/index.js");
const processor_1 = require("../processor");
// @NOTE this indexer is a placeholder to ensure it gets indexed in the generic records table
const insertFn = async (_db, uri, _cid, _obj, _timestamp) => {
    if (uri.rkey !== 'self')
        return null;
    return true;
};
const findDuplicate = async () => {
    return null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (_db, uri) => {
    if (uri.rkey !== 'self')
        return null;
    return true;
};
const notifsForDelete = () => {
    return { notifs: [], toDelete: [] };
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: index_js_1.com.germnetwork.declaration.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=germ-declaration.js.map
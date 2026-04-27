"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoot = void 0;
const lex_1 = require("@atproto/lex");
const updateRoot = async (db, did, cid, rev) => {
    // @TODO balance risk of a race in the case of a long retry
    await db.executeWithRetry(db.db
        .insertInto('repo_root')
        .values({
        did,
        cid: cid.toString(),
        rev,
        indexedAt: (0, lex_1.currentDatetimeString)(),
    })
        .onConflict((oc) => oc.column('did').doUpdateSet({ cid: cid.toString(), rev })));
};
exports.updateRoot = updateRoot;
//# sourceMappingURL=repo.js.map
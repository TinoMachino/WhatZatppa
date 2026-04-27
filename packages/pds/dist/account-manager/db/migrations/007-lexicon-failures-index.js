"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createIndex('lexicon_failures_idx')
        .on('lexicon')
        // https://github.com/kysely-org/kysely/issues/302
        .expression((0, kysely_1.sql) `"updatedAt" DESC) WHERE ("lexicon" is NULL`)
        .execute();
}
async function down(db) {
    await db.schema.dropIndex('lexicon_failures_idx').execute();
}
//# sourceMappingURL=007-lexicon-failures-index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema.alterTable('token').addColumn('scope', 'varchar').execute();
    await db.schema
        .createTable('lexicon')
        .addColumn('nsid', 'varchar', (col) => col.primaryKey())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('updatedAt', 'varchar', (col) => col.notNull())
        .addColumn('lastSucceededAt', 'varchar')
        .addColumn('uri', 'varchar')
        .addColumn('lexicon', 'varchar')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('lexicon').execute();
    await db.schema.alterTable('token').dropColumn('scope').execute();
}
//# sourceMappingURL=006-oauth-permission-sets.js.map
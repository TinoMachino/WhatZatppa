"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('actor')
        .addColumn('ageAssuranceStatus', 'text')
        .execute();
    await db.schema
        .alterTable('actor')
        .addColumn('ageAssuranceLastInitiatedAt', 'varchar')
        .execute();
}
async function down(db) {
    await db.schema.alterTable('actor').dropColumn('ageAssuranceStatus').execute();
    await db.schema
        .alterTable('actor')
        .dropColumn('ageAssuranceLastInitiatedAt')
        .execute();
}
//# sourceMappingURL=20250627T025331240Z-add-actor-age-assurance-columns.js.map
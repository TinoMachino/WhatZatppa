"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('actor')
        .addColumn('ageAssuranceAccess', 'text')
        .execute();
    await db.schema
        .alterTable('actor')
        .addColumn('ageAssuranceCountryCode', 'text')
        .execute();
    await db.schema
        .alterTable('actor')
        .addColumn('ageAssuranceRegionCode', 'text')
        .execute();
}
async function down(db) {
    await db.schema.alterTable('actor').dropColumn('ageAssuranceAccess').execute();
    await db.schema
        .alterTable('actor')
        .dropColumn('ageAssuranceCountryCode')
        .execute();
    await db.schema
        .alterTable('actor')
        .dropColumn('ageAssuranceRegionCode')
        .execute();
}
//# sourceMappingURL=20251120T004738098Z-update-actor-age-assurance-v2.js.map
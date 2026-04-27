"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('moderation_subject_status')
        .addColumn('ageAssuranceState', 'varchar', (col) => col.notNull().defaultTo('unknown'))
        .execute();
    await db.schema
        .alterTable('moderation_subject_status')
        .addColumn('ageAssuranceUpdatedBy', 'varchar')
        .execute();
}
async function down(db) {
    await db.schema
        .alterTable('moderation_subject_status')
        .dropColumn('ageAssuranceState')
        .execute();
    await db.schema
        .alterTable('moderation_subject_status')
        .dropColumn('ageAssuranceUpdatedBy')
        .execute();
}
//# sourceMappingURL=20250701T000000000Z-add-age-assurance-state.js.map
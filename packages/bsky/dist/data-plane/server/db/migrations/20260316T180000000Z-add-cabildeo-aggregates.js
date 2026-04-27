"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('positionCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('positionForCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('positionAgainstCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('positionAmendmentCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('voteCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('directVoteCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('delegatedVoteCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('delegationCount', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('optionVoteCounts', 'jsonb', (col) => col.notNull().defaultTo((0, kysely_1.sql) `'[]'::jsonb`))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('optionPositionCounts', 'jsonb', (col) => col.notNull().defaultTo((0, kysely_1.sql) `'[]'::jsonb`))
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('winningOption', 'integer')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .addColumn('isTie', 'int2', (col) => col.notNull().defaultTo(0))
        .execute();
}
async function down(db) {
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('isTie')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('winningOption')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('optionPositionCounts')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('optionVoteCounts')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('delegationCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('delegatedVoteCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('directVoteCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('voteCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('positionAmendmentCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('positionAgainstCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('positionForCount')
        .execute();
    await db.schema
        .alterTable('cabildeo_cabildeo')
        .dropColumn('positionCount')
        .execute();
}
//# sourceMappingURL=20260316T180000000Z-add-cabildeo-aggregates.js.map
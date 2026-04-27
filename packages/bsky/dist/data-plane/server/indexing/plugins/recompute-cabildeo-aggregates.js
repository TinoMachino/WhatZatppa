"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recomputeCabildeoAggregates = void 0;
const kysely_1 = require("kysely");
const recomputeCabildeoAggregates = async (db, cabildeoUri) => {
    const cabildeo = await db
        .selectFrom('cabildeo_cabildeo')
        .where('uri', '=', cabildeoUri)
        .select(['uri', 'options'])
        .executeTakeFirst();
    if (!cabildeo)
        return;
    const options = asOptions(cabildeo.options);
    const optionCount = options.length;
    const optionVoteCounts = Array.from({ length: optionCount }, () => 0);
    const optionPositionCounts = Array.from({ length: optionCount }, () => 0);
    const [positions, votes, delegationCountRes] = await Promise.all([
        db
            .selectFrom('cabildeo_position')
            .where('cabildeo', '=', cabildeoUri)
            .select(['stance', 'optionIndex'])
            .execute(),
        db
            .selectFrom('cabildeo_vote')
            .where('cabildeo', '=', cabildeoUri)
            .select(['isDirect', 'selectedOption'])
            .execute(),
        db
            .selectFrom('cabildeo_delegation')
            .where('cabildeo', '=', cabildeoUri)
            .select((0, kysely_1.sql) `count(*)::int`.as('count'))
            .executeTakeFirst(),
    ]);
    let positionForCount = 0;
    let positionAgainstCount = 0;
    let positionAmendmentCount = 0;
    for (const position of positions) {
        if (position.stance === 'for')
            positionForCount++;
        if (position.stance === 'against')
            positionAgainstCount++;
        if (position.stance === 'amendment')
            positionAmendmentCount++;
        if (typeof position.optionIndex === 'number' &&
            position.optionIndex >= 0 &&
            position.optionIndex < optionPositionCounts.length) {
            optionPositionCounts[position.optionIndex]++;
        }
    }
    let directVoteCount = 0;
    let delegatedVoteCount = 0;
    for (const vote of votes) {
        if (vote.isDirect === 1) {
            directVoteCount++;
        }
        else {
            delegatedVoteCount++;
        }
        if (typeof vote.selectedOption === 'number' &&
            vote.selectedOption >= 0 &&
            vote.selectedOption < optionVoteCounts.length) {
            optionVoteCounts[vote.selectedOption]++;
        }
    }
    const voteCount = votes.length;
    const positionCount = positions.length;
    const delegationCount = delegationCountRes?.count ?? 0;
    const { winningOption, isTie } = computeWinner(optionVoteCounts);
    await db
        .updateTable('cabildeo_cabildeo')
        .set({
        positionCount,
        positionForCount,
        positionAgainstCount,
        positionAmendmentCount,
        voteCount,
        directVoteCount,
        delegatedVoteCount,
        delegationCount,
        optionVoteCounts: (0, kysely_1.sql) `${JSON.stringify(optionVoteCounts)}`,
        optionPositionCounts: (0, kysely_1.sql) `${JSON.stringify(optionPositionCounts)}`,
        winningOption,
        isTie,
    })
        .where('uri', '=', cabildeoUri)
        .execute();
};
exports.recomputeCabildeoAggregates = recomputeCabildeoAggregates;
const asOptions = (value) => {
    if (!Array.isArray(value))
        return [];
    return value.filter((item) => typeof item === 'object' && item !== null);
};
const computeWinner = (optionVoteCounts) => {
    if (optionVoteCounts.length === 0) {
        return { winningOption: null, isTie: 0 };
    }
    const maxVotes = Math.max(...optionVoteCounts);
    if (maxVotes <= 0) {
        return { winningOption: null, isTie: 0 };
    }
    const winners = optionVoteCounts
        .map((votes, index) => ({ votes, index }))
        .filter((item) => item.votes === maxVotes);
    if (winners.length !== 1) {
        return { winningOption: null, isTie: 1 };
    }
    return { winningOption: winners[0].index, isTie: 0 };
};
//# sourceMappingURL=recompute-cabildeo-aggregates.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexPostDiscourse = indexPostDiscourse;
exports.updatePostDiscourseCommunity = updatePostDiscourseCommunity;
exports.deletePostDiscourse = deletePostDiscourse;
const discourse_nlp_1 = require("./discourse-nlp");
async function indexPostDiscourse(db, uri, text, timestamp, community) {
    const analysis = (0, discourse_nlp_1.analyzeDiscourse)(text);
    await db
        .insertInto('para_sentiment_aggregate')
        .values({
        postUri: uri.toString(),
        creator: uri.host,
        community: community || null,
        sentimentLabel: analysis.sentiment.label,
        sentimentScore: analysis.sentiment.score,
        constructiveness: analysis.constructiveness,
        keywords: JSON.stringify(analysis.keywords),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.column('postUri').doUpdateSet({
        community: community || null,
        sentimentLabel: analysis.sentiment.label,
        sentimentScore: analysis.sentiment.score,
        constructiveness: analysis.constructiveness,
        keywords: JSON.stringify(analysis.keywords),
        indexedAt: timestamp,
    }))
        .execute();
}
async function updatePostDiscourseCommunity(db, postUri, community) {
    await db
        .updateTable('para_sentiment_aggregate')
        .set({ community })
        .where('postUri', '=', postUri)
        .execute();
}
async function deletePostDiscourse(db, uri) {
    await db
        .deleteFrom('para_sentiment_aggregate')
        .where('postUri', '=', uri.toString())
        .execute();
}
//# sourceMappingURL=discourse-indexing.js.map
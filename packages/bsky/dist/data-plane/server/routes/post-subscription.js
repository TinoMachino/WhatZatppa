"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobuf_1 = require("@bufbuild/protobuf");
const bsky_pb_1 = require("../../../proto/bsky_pb");
exports.default = (db) => ({
    async getPostSubscription(req) {
        const subscription = await db.db
            .selectFrom('post_subscription')
            .selectAll()
            .where('subscriberDid', '=', req.subscriberDid)
            .where('postUri', '=', req.postUri)
            .executeTakeFirst();
        return {
            subscription: subscription ? toProto(subscription) : undefined,
        };
    },
    async putPostSubscription(req) {
        const enabled = req.reply || req.quote;
        if (!enabled) {
            await db.db
                .deleteFrom('post_subscription')
                .where('subscriberDid', '=', req.subscriberDid)
                .where('postUri', '=', req.postUri)
                .execute();
            return new bsky_pb_1.PutPostSubscriptionResponse();
        }
        const indexedAt = new Date().toISOString();
        const subscription = await db.db
            .insertInto('post_subscription')
            .values({
            subscriberDid: req.subscriberDid,
            postUri: req.postUri,
            indexedAt,
            reply: req.reply,
            quote: req.quote,
        })
            .onConflict((oc) => oc.columns(['subscriberDid', 'postUri']).doUpdateSet({
            indexedAt,
            reply: req.reply,
            quote: req.quote,
        }))
            .returningAll()
            .executeTakeFirstOrThrow();
        return {
            subscription: toProto(subscription),
        };
    },
});
const toProto = (subscription) => new bsky_pb_1.PostSubscription({
    subscriberDid: subscription.subscriberDid,
    postUri: subscription.postUri,
    reply: subscription.reply,
    quote: subscription.quote,
    indexedAt: protobuf_1.Timestamp.fromDate(new Date(subscription.indexedAt)),
});
//# sourceMappingURL=post-subscription.js.map
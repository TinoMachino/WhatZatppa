"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@atproto/common");
const bsky_pb_1 = require("../../../proto/bsky_pb");
const stash_1 = require("../../../stash");
const pagination_1 = require("../db/pagination");
exports.default = (db) => ({
    async getActivitySubscriptionsByActorAndSubjects(req) {
        const { actorDid, subjectDids } = req;
        if (subjectDids.length === 0) {
            return new bsky_pb_1.GetActivitySubscriptionsByActorAndSubjectsResponse({
                subscriptions: [],
            });
        }
        const res = await db.db
            .selectFrom('activity_subscription')
            .selectAll()
            .where('creator', '=', actorDid)
            .where('subjectDid', 'in', subjectDids)
            .execute();
        const bySubject = (0, common_1.keyBy)(res, 'subjectDid');
        const subscriptions = subjectDids.map((did) => {
            const subject = bySubject.get(did);
            if (!subject) {
                return {
                    actorDid,
                    namespace: stash_1.Namespaces.AppBskyNotificationDefsSubjectActivitySubscription
                        .$type,
                    key: '',
                    post: undefined,
                    reply: undefined,
                    subjectDid: '',
                };
            }
            return {
                actorDid,
                namespace: stash_1.Namespaces.AppBskyNotificationDefsSubjectActivitySubscription.$type,
                key: subject.key,
                post: subject.post ? {} : undefined,
                reply: subject.reply ? {} : undefined,
                subjectDid: subject.subjectDid,
            };
        });
        return {
            subscriptions,
        };
    },
    async getActivitySubscriptionDids(req) {
        const { actorDid, cursor, limit } = req;
        let builder = db.db
            .selectFrom('activity_subscription')
            .selectAll()
            .where('creator', '=', actorDid);
        const { ref } = db.db.dynamic;
        const key = new pagination_1.StashKeyKey(ref('activity_subscription.key'));
        builder = key.paginate(builder, {
            cursor,
            limit,
        });
        const res = await builder.execute();
        const dids = res.map(({ subjectDid }) => subjectDid);
        return {
            dids,
            cursor: key.packFromResult(res),
        };
    },
});
//# sourceMappingURL=activity-subscription.js.map
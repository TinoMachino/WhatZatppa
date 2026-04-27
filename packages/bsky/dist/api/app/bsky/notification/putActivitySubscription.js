"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const index_js_1 = require("../../../../lexicons/index.js");
const stash_1 = require("../../../../stash");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.notification.putActivitySubscription, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const actorDid = auth.credentials.iss;
            const { subject, activitySubscription } = input.body;
            if (actorDid === subject) {
                throw new xrpc_server_1.InvalidRequestError('Cannot subscribe to own activity');
            }
            const existingKey = await getExistingKey(ctx, actorDid, subject);
            const enabled = (0, util_1.isActivitySubscriptionEnabled)(activitySubscription);
            const stashInput = {
                actorDid,
                namespace: stash_1.Namespaces.AppBskyNotificationDefsSubjectActivitySubscription,
                payload: {
                    subject,
                    activitySubscription,
                },
                key: existingKey ?? common_1.TID.nextStr(),
            };
            if (existingKey) {
                if (enabled) {
                    await ctx.stashClient.update(stashInput);
                }
                else {
                    await ctx.stashClient.delete(stashInput);
                }
            }
            else {
                if (enabled) {
                    await ctx.stashClient.create(stashInput);
                }
                else {
                    // no-op: subscription already doesn't exist
                }
            }
            return {
                encoding: 'application/json',
                body: {
                    subject,
                    activitySubscription: enabled ? activitySubscription : undefined,
                },
            };
        },
    });
}
const getExistingKey = async (ctx, actorDid, subject) => {
    const res = await ctx.dataplane.getActivitySubscriptionsByActorAndSubjects({
        actorDid,
        subjectDids: [subject],
    });
    const [existing] = res.subscriptions;
    const key = existing.key;
    return key || null;
};
//# sourceMappingURL=putActivitySubscription.js.map
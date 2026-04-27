"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
const common_1 = require("@atproto/common");
const stash_1 = require("../../stash");
async function createEvent(ctx, actorDid, event) {
    const payload = {
        createdAt: new Date().toISOString(),
        ...event,
    };
    await ctx.stashClient.create({
        actorDid: actorDid,
        namespace: stash_1.Namespaces.AppBskyAgeassuranceDefsEvent,
        key: common_1.TID.nextStr(),
        payload,
    });
    return payload;
}
//# sourceMappingURL=stash.js.map
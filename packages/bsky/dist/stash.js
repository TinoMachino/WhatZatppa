"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StashClient = exports.createStashClient = exports.Namespaces = void 0;
const lex_1 = require("@atproto/lex");
const index_js_1 = require("./lexicons/index.js");
const bsync_pb_1 = require("./proto/bsync_pb");
exports.Namespaces = {
    AppBskyAgeassuranceDefsEvent: index_js_1.app.bsky.ageassurance.defs.event,
    AppBskyBookmarkDefsBookmark: index_js_1.app.bsky.bookmark.defs.bookmark,
    AppBskyContactDefsNotification: index_js_1.app.bsky.contact.defs.notification,
    AppBskyDraftDefsDraftWithId: index_js_1.app.bsky.draft.defs.draftWithId,
    AppBskyNotificationDefsPreferences: index_js_1.app.bsky.notification.defs.preferences,
    AppBskyNotificationDefsSubjectActivitySubscription: index_js_1.app.bsky.notification.defs.subjectActivitySubscription,
    AppBskyUnspeccedDefsAgeAssuranceEvent: index_js_1.app.bsky.unspecced.defs.ageAssuranceEvent,
};
const createStashClient = (bsyncClient) => {
    return new StashClient(bsyncClient);
};
exports.createStashClient = createStashClient;
// An abstraction over the BsyncClient, that uses the bsync `PutOperation` RPC
// to store private data, which can be indexed by the dataplane and queried by the appview.
class StashClient {
    constructor(bsyncClient) {
        Object.defineProperty(this, "bsyncClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bsyncClient
        });
    }
    create(input) {
        input.namespace.assert(input.payload);
        return this.putOperation(bsync_pb_1.Method.CREATE, input);
    }
    update(input) {
        input.namespace.assert(input.payload);
        return this.putOperation(bsync_pb_1.Method.UPDATE, input);
    }
    delete(input) {
        return this.putOperation(bsync_pb_1.Method.DELETE, { ...input, payload: undefined });
    }
    async putOperation(method, input) {
        const { actorDid, namespace, key, payload } = input;
        await this.bsyncClient.putOperation({
            actorDid,
            namespace: namespace.$type,
            key,
            method,
            payload: payload
                ? Buffer.from((0, lex_1.lexStringify)({ ...payload, $type: namespace.$type }))
                : undefined,
        });
    }
}
exports.StashClient = StashClient;
//# sourceMappingURL=stash.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_assert_1 = __importDefault(require("node:assert"));
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const stash_1 = require("../../../../stash");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.notification.putPreferencesV2, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth, input }) => {
            const actorDid = auth.credentials.iss;
            const preferences = await computePreferences(ctx, actorDid, input);
            // Notification preferences are created automatically on the dataplane on signup, so we just update.
            await ctx.stashClient.update({
                actorDid,
                namespace: stash_1.Namespaces.AppBskyNotificationDefsPreferences,
                key: 'self',
                payload: preferences,
            });
            return {
                encoding: 'application/json',
                body: {
                    preferences,
                },
            };
        },
    });
}
const computePreferences = async (ctx, actorDid, input) => {
    let res;
    try {
        res = await ctx.dataplane.getNotificationPreferences({
            dids: [actorDid],
        });
    }
    catch (err) {
        throw new xrpc_server_1.UpstreamFailureError('cannot get current notification preferences', 'NotificationPreferencesFailed', { cause: err });
    }
    (0, node_assert_1.default)(res.preferences.length === 1, `expected exactly one preferences entry, got ${res.preferences.length}`);
    const currentPreferences = (0, util_1.protobufToLex)(res.preferences[0]);
    const preferences = { ...currentPreferences, ...input.body };
    return preferences;
};
//# sourceMappingURL=putPreferencesV2.js.map
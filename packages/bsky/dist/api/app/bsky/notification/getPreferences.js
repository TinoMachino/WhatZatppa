"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_assert_1 = __importDefault(require("node:assert"));
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.notification.getPreferences, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth }) => {
            const actorDid = auth.credentials.iss;
            const preferences = await computePreferences(ctx, actorDid);
            return {
                encoding: 'application/json',
                body: {
                    preferences,
                },
            };
        },
    });
}
const computePreferences = async (ctx, actorDid) => {
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
    return currentPreferences;
};
//# sourceMappingURL=getPreferences.js.map
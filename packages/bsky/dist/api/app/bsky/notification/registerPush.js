"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.notification.registerPush, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth, input }) => {
            if (!ctx.courierClient) {
                throw new xrpc_server_1.MethodNotImplementedError('This service is not configured to support push token registration.');
            }
            const { token, platform, serviceDid, appId, ageRestricted } = input.body;
            const did = auth.credentials.iss;
            if (serviceDid !== auth.credentials.aud) {
                throw new xrpc_server_1.InvalidRequestError('Invalid serviceDid.');
            }
            try {
                (0, util_1.assertLexPlatform)(platform);
            }
            catch (err) {
                throw new xrpc_server_1.InvalidRequestError('Unsupported platform: must be "ios", "android", or "web".');
            }
            await ctx.courierClient.registerDeviceToken({
                did,
                token,
                platform: (0, util_1.lexPlatformToProtoPlatform)(platform),
                appId,
                ageRestricted,
            });
        },
    });
}
//# sourceMappingURL=registerPush.js.map
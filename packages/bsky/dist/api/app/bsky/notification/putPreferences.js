"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.notification.putPreferences, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const { priority } = input.body;
            const viewer = auth.credentials.iss;
            await ctx.bsyncClient.addNotifOperation({
                actorDid: viewer,
                priority,
            });
        },
    });
}
//# sourceMappingURL=putPreferences.js.map
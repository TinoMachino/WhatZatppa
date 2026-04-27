"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.contact.getSyncStatus, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth }) => {
            (0, util_1.assertRolodexOrThrowUnimplemented)(ctx);
            const actor = auth.credentials.iss;
            const res = await (0, util_1.callRolodexClient)(ctx.rolodexClient.getSyncStatus({
                actor,
            }));
            const syncStatus = res.status && res.status.syncedAt
                ? {
                    matchesCount: res.status.matchesCount,
                    syncedAt: res.status.syncedAt
                        .toDate()
                        .toISOString(),
                }
                : undefined;
            return {
                encoding: 'application/json',
                body: {
                    syncStatus,
                },
            };
        },
    });
}
//# sourceMappingURL=getSyncStatus.js.map
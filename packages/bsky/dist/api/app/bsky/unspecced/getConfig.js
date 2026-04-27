"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
// THIS IS A TEMPORARY UNSPECCED ROUTE
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.unspecced.getConfig, {
        handler: async () => {
            return {
                encoding: 'application/json',
                body: {
                    checkEmailConfirmed: ctx.cfg.clientCheckEmailConfirmed,
                    // @ts-expect-error un-specced field
                    topicsEnabled: ctx.cfg.topicsEnabled,
                    liveNow: ctx.cfg.liveNowConfig,
                },
            };
        },
    });
}
//# sourceMappingURL=getConfig.js.map
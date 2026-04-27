"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const const_1 = require("../../../../api/age-assurance/const");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.ageassurance.getConfig, {
        auth: ctx.authVerifier.standardOptional,
        handler: async () => {
            return {
                encoding: 'application/json',
                body: const_1.AGE_ASSURANCE_CONFIG,
            };
        },
    });
}
//# sourceMappingURL=getConfig.js.map
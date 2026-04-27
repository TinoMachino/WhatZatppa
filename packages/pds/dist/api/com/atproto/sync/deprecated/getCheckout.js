"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_verifier_1 = require("../../../../../auth-verifier");
const index_js_1 = require("../../../../../lexicons/index.js");
const getRepo_1 = require("../getRepo");
const util_1 = require("../util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.sync.getCheckout, {
        auth: ctx.authVerifier.authorizationOrAdminTokenOptional({
            authorize: () => {
                // always allow
            },
        }),
        handler: async ({ params, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, (0, auth_verifier_1.isUserOrAdmin)(auth, did));
            const carStream = await (0, getRepo_1.getCarStream)(ctx, did);
            return {
                encoding: 'application/vnd.ipld.car',
                body: carStream,
            };
        },
    });
}
//# sourceMappingURL=getCheckout.js.map
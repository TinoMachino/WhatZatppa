"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.describeServer, () => {
        const did = ctx.cfg.service.did;
        const availableUserDomains = ctx.cfg.identity.serviceHandleDomains;
        const inviteCodeRequired = ctx.cfg.invites.required;
        const privacyPolicy = ctx.cfg.service.privacyPolicyUrl;
        const termsOfService = ctx.cfg.service.termsOfServiceUrl;
        const contactEmailAddress = ctx.cfg.service.contactEmailAddress;
        return {
            encoding: 'application/json',
            body: {
                did,
                availableUserDomains,
                inviteCodeRequired,
                links: { privacyPolicy, termsOfService },
                contact: {
                    email: contactEmailAddress,
                },
            },
        };
    });
}
//# sourceMappingURL=describeServer.js.map
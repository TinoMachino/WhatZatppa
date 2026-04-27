"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_manager_1 = require("../../../../account-manager/account-manager");
const scrypt_1 = require("../../../../account-manager/helpers/scrypt");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    const rateLimit = [
        {
            durationMs: common_1.DAY,
            points: 300,
            calcKey: ({ input, req }) => `${input.body.identifier}-${req.ip}`,
        },
        {
            durationMs: 5 * common_1.MINUTE,
            points: 30,
            calcKey: ({ input, req }) => `${input.body.identifier}-${req.ip}`,
        },
    ];
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.server.createSession, {
            rateLimit,
            handler: async ({ input: { body }, req }) => {
                const { headers } = ctx.entrywayPassthruHeaders(req);
                return entrywayClient.xrpc(index_js_1.com.atproto.server.createSession, {
                    headers,
                    body,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.createSession, {
            rateLimit,
            handler: async ({ input: { body }, }) => {
                if (body.password.length > scrypt_1.OLD_PASSWORD_MAX_LENGTH) {
                    throw new xrpc_server_1.AuthRequiredError('Password too long. Consider resetting your password.');
                }
                const { user, isSoftDeleted, appPassword } = await ctx.accountManager.login(body);
                if (!body.allowTakendown && isSoftDeleted) {
                    throw new xrpc_server_1.AuthRequiredError('Account has been taken down', 'AccountTakedown');
                }
                const [{ accessJwt, refreshJwt }, didDoc] = await Promise.all([
                    ctx.accountManager.createSession(user.did, appPassword, isSoftDeleted),
                    (0, util_1.didDocForSession)(ctx, user.did),
                ]);
                const { status, active } = (0, account_manager_1.formatAccountStatus)(user);
                return {
                    encoding: 'application/json',
                    body: {
                        accessJwt,
                        refreshJwt,
                        did: user.did,
                        // @ts-expect-error https://github.com/bluesky-social/atproto/pull/4406
                        didDoc,
                        handle: (user.handle ?? syntax_1.INVALID_HANDLE),
                        email: user.email ?? undefined,
                        emailConfirmed: !!user.emailConfirmedAt,
                        active,
                        status,
                    },
                };
            },
        });
    }
}
//# sourceMappingURL=createSession.js.map
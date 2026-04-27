"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_manager_1 = require("../../../../account-manager/account-manager");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.getSession, {
        auth: ctx.authVerifier.authorization({
            additional: [auth_scope_1.AuthScope.SignupQueued],
            authorize: () => {
                // Always allowed. "email" access is checked in the handler.
            },
        }),
        handler: async ({ auth, req }) => {
            if (ctx.entrywayClient) {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, 'com.atproto.server.getSession');
                const { body } = await ctx.entrywayClient.xrpc(index_js_1.com.atproto.server.getSession, { headers });
                return {
                    encoding: 'application/json',
                    body: output(auth, body),
                };
            }
            const did = auth.credentials.did;
            const [user, didDoc] = await Promise.all([
                ctx.accountManager.getAccount(did, { includeDeactivated: true }),
                (0, util_1.didDocForSession)(ctx, did),
            ]);
            if (!user) {
                throw new xrpc_server_1.InvalidRequestError(`Could not find user info for account: ${did}`);
            }
            const { status, active } = (0, account_manager_1.formatAccountStatus)(user);
            return {
                encoding: 'application/json',
                body: output(auth, {
                    did: user.did,
                    // @ts-expect-error https://github.com/bluesky-social/atproto/pull/4406
                    didDoc,
                    handle: (user.handle ?? syntax_1.INVALID_HANDLE),
                    email: user.email ?? undefined,
                    emailConfirmed: !!user.emailConfirmedAt,
                    active,
                    status,
                }),
            };
        },
    });
}
function output({ credentials }, data) {
    if (credentials.type === 'oauth' &&
        !credentials.permissions.allowsAccount({ attr: 'email', action: 'read' })) {
        const { email, emailAuthFactor, emailConfirmed, ...rest } = data;
        return rest;
    }
    return data;
}
//# sourceMappingURL=getSession.js.map
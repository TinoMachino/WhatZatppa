"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.getServiceAuth, {
        auth: ctx.authVerifier.authorization({
            additional: [auth_scope_1.AuthScope.Takendown],
            authorize: (permissions, { params }) => {
                const { aud, lxm = '*' } = params;
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ params, auth }) => {
            const did = auth.credentials.did;
            // @NOTE "exp" is expressed in seconds since epoch, not milliseconds
            const { aud, exp, lxm = null } = params;
            // Takendown accounts should not be able to generate service auth tokens except for methods necessary for account migration
            if (auth.credentials.type === 'access') {
                // @NOTE We should probably use "ForbiddenError" here. Using
                // "InvalidRequestError" for legacy reasons.
                if ((0, auth_scope_1.isTakendown)(auth.credentials.scope) &&
                    lxm !== index_js_1.com.atproto.server.createAccount.$lxm) {
                    throw new xrpc_server_1.InvalidRequestError('Bad token scope', 'InvalidToken');
                }
                // @NOTE "oauth" based credentials already checked through permission
                // set in "authorize" method above.
                if (lxm != null &&
                    pipethrough_1.PRIVILEGED_METHODS.has(lxm) &&
                    !(0, auth_scope_1.isAccessPrivileged)(auth.credentials.scope)) {
                    throw new xrpc_server_1.InvalidRequestError(`insufficient access to request a service auth token for the following method: ${lxm}`);
                }
            }
            if (exp) {
                const diff = exp * 1000 - Date.now();
                if (diff < 0) {
                    throw new xrpc_server_1.InvalidRequestError('expiration is in past', 'BadExpiration');
                }
                else if (diff > common_1.HOUR) {
                    throw new xrpc_server_1.InvalidRequestError('cannot request a token with an expiration more than an hour in the future', 'BadExpiration');
                }
                else if (!lxm && diff > common_1.MINUTE) {
                    throw new xrpc_server_1.InvalidRequestError('cannot request a method-less token with an expiration more than a minute in the future', 'BadExpiration');
                }
            }
            if (lxm && pipethrough_1.PROTECTED_METHODS.has(lxm)) {
                throw new xrpc_server_1.InvalidRequestError(`cannot request a service auth token for the following protected method: ${lxm}`);
            }
            const keypair = await ctx.actorStore.keypair(did);
            const token = await (0, xrpc_server_1.createServiceJwt)({
                iss: did,
                aud,
                exp,
                lxm,
                keypair,
            });
            return {
                encoding: 'application/json',
                body: {
                    token,
                },
            };
        },
    });
}
//# sourceMappingURL=getServiceAuth.js.map
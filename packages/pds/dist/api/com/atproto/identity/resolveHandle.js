"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_1 = require("@atproto/lex");
const xrpc_server_1 = require("@atproto/xrpc-server");
const handle_1 = require("../../../../handle");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.identity.resolveHandle, async ({ params }) => {
        const handle = (0, handle_1.baseNormalizeAndValidate)(params.handle);
        const user = await ctx.accountManager.getAccount(handle);
        if (user) {
            return {
                encoding: 'application/json',
                body: { did: user.did },
            };
        }
        const supportedHandle = ctx.cfg.identity.serviceHandleDomains.some((host) => handle.endsWith(host) || handle === host.slice(1));
        // this should be in our DB & we couldn't find it, so fail
        if (supportedHandle) {
            throw new xrpc_server_1.InvalidRequestError('Unable to resolve handle');
        }
        const did = ctx.bskyAppView
            ? await ctx.bskyAppView.client
                .call(index_js_1.com.atproto.identity.resolveHandle, { handle })
                .then((r) => r.did, throwInvalidRequestError)
            : await ctx.idResolver.handle
                .resolve(handle)
                .then((v) => (v && (0, lex_1.isDidString)(v) ? v : throwInvalidRequestError()), throwInvalidRequestError);
        return {
            encoding: 'application/json',
            body: { did },
        };
    });
}
function throwInvalidRequestError(cause) {
    throw new xrpc_server_1.InvalidRequestError('Unable to resolve handle', undefined, {
        cause,
    });
}
//# sourceMappingURL=resolveHandle.js.map
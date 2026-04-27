"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const auth_verifier_1 = require("../../../../auth-verifier");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.sync.getBlob, {
        auth: ctx.authVerifier.authorizationOrAdminTokenOptional({
            additional: [auth_scope_1.AuthScope.Takendown],
            authorize: () => {
                // always allow
            },
        }),
        handler: async ({ params, res, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, (0, auth_verifier_1.isUserOrAdmin)(auth, did));
            const cid = (0, lex_data_1.parseCid)(params.cid);
            const found = await ctx.actorStore.read(params.did, async (store) => {
                try {
                    return await store.repo.blob.getBlob(cid);
                }
                catch (err) {
                    if (err instanceof repo_1.BlobNotFoundError) {
                        throw new xrpc_server_1.InvalidRequestError('Blob not found');
                    }
                    else {
                        throw err;
                    }
                }
            });
            if (!found) {
                throw new xrpc_server_1.InvalidRequestError('Blob not found');
            }
            res.setHeader('content-length', found.size);
            // Important Security headers
            // This prevents the browser from trying to guess the content type
            // and potentially loading the blob as executable code, or rendering it
            // in some other unsafe way.
            res.setHeader('x-content-type-options', 'nosniff');
            // This forces the browser to download the blob instead of trying to
            // render it when visiting the URL. This is important to prevent XSS
            // attacks if the blob happens to be HTML. Even if JS is disabled via the
            // CSP header below, a blob could still contain malicious HTML links.
            res.setHeader('content-disposition', `attachment; filename="${cid}"`);
            // This should prevent the browser from executing the blob in any way
            res.setHeader('content-security-policy', `default-src 'none'; sandbox`);
            return {
                encoding: found.mimeType || 'application/octet-stream',
                body: found.stream,
            };
        },
    });
}
//# sourceMappingURL=getBlob.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_data_1 = require("@atproto/lex-data");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.getSubjectStatus, {
        auth: ctx.authVerifier.moderator,
        handler: async ({ params }) => {
            const { did, uri, blob } = params;
            let body = null;
            if (blob) {
                if (!did) {
                    throw new xrpc_server_1.InvalidRequestError('Must provide a did to request blob state');
                }
                const takedown = await ctx.actorStore.read(did, (store) => store.repo.blob.getBlobTakedownStatus((0, lex_data_1.parseCid)(blob)));
                if (takedown) {
                    body = {
                        subject: {
                            $type: 'com.atproto.admin.defs#repoBlobRef',
                            did: did,
                            cid: blob,
                        },
                        takedown,
                    };
                }
            }
            else if (uri) {
                const parsedUri = new syntax_1.AtUri(uri);
                const [takedown, cid] = await ctx.actorStore.read(parsedUri.hostname, (store) => Promise.all([
                    store.record.getRecordTakedownStatus(parsedUri),
                    store.record.getCurrentRecordCid(parsedUri),
                ]));
                if (cid && takedown) {
                    body = {
                        subject: {
                            $type: 'com.atproto.repo.strongRef',
                            uri: parsedUri.toString(),
                            cid: cid.toString(),
                        },
                        takedown,
                    };
                }
            }
            else if (did) {
                const status = await ctx.accountManager.getAccountAdminStatus(did);
                if (status) {
                    body = {
                        subject: {
                            $type: 'com.atproto.admin.defs#repoRef',
                            did: did,
                        },
                        takedown: status.takedown,
                        deactivated: status.deactivated,
                    };
                }
            }
            else {
                throw new xrpc_server_1.InvalidRequestError('No provided subject');
            }
            if (body === null) {
                throw new xrpc_server_1.InvalidRequestError('Subject not found', 'NotFound');
            }
            return {
                encoding: 'application/json',
                body,
            };
        },
    });
}
//# sourceMappingURL=getSubjectStatus.js.map
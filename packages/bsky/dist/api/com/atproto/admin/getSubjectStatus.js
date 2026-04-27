"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.getSubjectStatus, {
        auth: ctx.authVerifier.roleOrModService,
        handler: async ({ params }) => {
            const { did, uri, blob } = params;
            let body = null;
            if (blob) {
                if (!did) {
                    throw new xrpc_server_1.InvalidRequestError('Must provide a did to request blob state');
                }
                const res = await ctx.dataplane.getBlobTakedown({
                    did,
                    cid: blob,
                });
                body = {
                    subject: {
                        $type: 'com.atproto.admin.defs#repoBlobRef',
                        did: did,
                        cid: blob,
                    },
                    takedown: {
                        applied: res.takenDown,
                        ref: res.takedownRef ? 'TAKEDOWN' : undefined,
                    },
                };
            }
            else if (uri) {
                const res = await ctx.hydrator.getRecord(uri, true);
                if (res) {
                    body = {
                        subject: {
                            $type: 'com.atproto.repo.strongRef',
                            uri,
                            cid: res.cid,
                        },
                        takedown: {
                            applied: !!res.takedownRef,
                            ref: res.takedownRef || undefined,
                        },
                    };
                }
            }
            else if (did) {
                const res = (await ctx.hydrator.actor.getActors([did], {
                    includeTakedowns: true,
                    skipCacheForDids: [did],
                })).get(did);
                if (res) {
                    body = {
                        subject: {
                            $type: 'com.atproto.admin.defs#repoRef',
                            did: did,
                        },
                        takedown: {
                            applied: !!res.takedownRef,
                            ref: res.takedownRef || undefined,
                        },
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const protobuf_1 = require("@bufbuild/protobuf");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.updateSubjectStatus, {
        auth: ctx.authVerifier.roleOrModService,
        handler: async ({ input, auth }) => {
            const { canPerformTakedown } = ctx.authVerifier.parseCreds(auth);
            if (!canPerformTakedown) {
                throw new xrpc_server_1.AuthRequiredError('Must be a full moderator to update subject state');
            }
            const now = new Date();
            const { subject, takedown } = input.body;
            if (takedown) {
                if (index_js_1.com.atproto.admin.defs.repoRef.$isTypeOf(subject)) {
                    if (takedown.applied) {
                        await ctx.dataplane.takedownActor({
                            did: subject.did,
                            ref: takedown.ref,
                            seen: protobuf_1.Timestamp.fromDate(now),
                        });
                    }
                    else {
                        await ctx.dataplane.untakedownActor({
                            did: subject.did,
                            seen: protobuf_1.Timestamp.fromDate(now),
                        });
                    }
                }
                else if (index_js_1.com.atproto.repo.strongRef.$isTypeOf(subject)) {
                    if (takedown.applied) {
                        await ctx.dataplane.takedownRecord({
                            recordUri: subject.uri,
                            ref: takedown.ref,
                            seen: protobuf_1.Timestamp.fromDate(now),
                        });
                    }
                    else {
                        await ctx.dataplane.untakedownRecord({
                            recordUri: subject.uri,
                            seen: protobuf_1.Timestamp.fromDate(now),
                        });
                    }
                }
                else if (index_js_1.com.atproto.admin.defs.repoBlobRef.$isTypeOf(subject)) {
                    if (takedown.applied) {
                        await ctx.dataplane.takedownBlob({
                            did: subject.did,
                            cid: subject.cid,
                            ref: takedown.ref,
                            seen: protobuf_1.Timestamp.fromDate(now),
                        });
                    }
                    else {
                        await ctx.dataplane.untakedownBlob({
                            did: subject.did,
                            cid: subject.cid,
                            seen: protobuf_1.Timestamp.fromDate(now),
                        });
                    }
                }
                else {
                    throw new xrpc_server_1.InvalidRequestError(`Invalid subject type: ${subject.$type}`);
                }
            }
            return {
                encoding: 'application/json',
                body: {
                    subject,
                    takedown,
                },
            };
        },
    });
}
//# sourceMappingURL=updateSubjectStatus.js.map
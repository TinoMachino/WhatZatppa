"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const types_1 = require("../../../../views/types");
const LIVE_ELIGIBLE_PHASES = new Set(['open', 'deliberating', 'voting']);
function default_1(server, ctx) {
    server.com.para.civic.putLivePresence({
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const actorDid = auth.credentials.iss;
            const { cabildeo, sessionId, present = true } = input.body;
            const cabildeoRes = await ctx.dataplane.getParaCabildeo({
                cabildeoUri: cabildeo,
                viewerDid: actorDid,
            });
            const phase = cabildeoRes.cabildeo?.phase;
            if (!cabildeoRes.cabildeo) {
                throw new xrpc_server_1.InvalidRequestError('Cabildeo not found', 'NotFound');
            }
            if (!phase || !LIVE_ELIGIBLE_PHASES.has(phase)) {
                throw new xrpc_server_1.InvalidRequestError('Cabildeo is not live-eligible in its current phase', 'InvalidPhase');
            }
            const hostLiveUri = present
                ? await getActiveHostLiveUri(ctx, actorDid)
                : undefined;
            const res = await ctx.dataplane.putParaCabildeoLivePresence({
                actorDid,
                cabildeoUri: cabildeo,
                sessionId,
                present,
                hostLiveUri: hostLiveUri ?? '',
            });
            if (present && !res.present && !hostLiveUri) {
                throw new xrpc_server_1.InvalidRequestError('An active live status with an external destination is required to host a live cabildeo', 'LiveStatusRequired');
            }
            if (present && !res.present) {
                throw new xrpc_server_1.InvalidRequestError('Unable to update live presence');
            }
            return {
                encoding: 'application/json',
                body: {
                    cabildeo,
                    present: res.present,
                    expiresAt: res.expiresAt || undefined,
                },
            };
        },
    });
}
const getActiveHostLiveUri = async (ctx, actorDid) => {
    const actors = await ctx.hydrator.actor.getActors([actorDid], {
        includeTakedowns: true,
    });
    const actor = actors.get(actorDid);
    const status = actor?.status;
    if (!status || status.takedownRef) {
        return undefined;
    }
    const { record, sortedAt } = status;
    const minDuration = 5 * common_1.MINUTE;
    const maxDuration = 4 * common_1.HOUR;
    const expiresAtMs = record.durationMinutes
        ? sortedAt.getTime() +
            Math.max(Math.min(record.durationMinutes * common_1.MINUTE, maxDuration), minDuration)
        : undefined;
    if (expiresAtMs && expiresAtMs <= Date.now()) {
        return undefined;
    }
    if (!(0, types_1.isExternalEmbedType)(record.embed)) {
        return undefined;
    }
    return record.embed.external.uri;
};
//# sourceMappingURL=putLivePresence.js.map
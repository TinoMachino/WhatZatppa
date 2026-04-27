"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationHandler = void 0;
const logger_1 = require("../../logger");
const const_1 = require("../age-assurance/const");
const external_payload_1 = require("../age-assurance/kws/external-payload");
const stash_1 = require("../age-assurance/stash");
const util_1 = require("../age-assurance/util");
const util_2 = require("./util");
function parseQueryParams(ctx, req) {
    try {
        const status = String(req.query.status);
        const externalPayload = String(req.query.externalPayload);
        const signature = String(req.query.signature);
        (0, util_2.validateSignature)(ctx.cfg.kws.verificationSecret, `${status}:${externalPayload}`, signature);
        return {
            status,
            externalPayload,
        };
    }
    catch (err) {
        throw new Error('Invalid KWS API request', { cause: err });
    }
}
const verificationHandler = (ctx) => async (req, res) => {
    let actorDid;
    try {
        const query = parseQueryParams(ctx, req);
        const { verified } = (0, util_2.parseStatus)(query.status);
        if (!verified) {
            throw new Error('Unexpected KWS verification response call with unverified status');
        }
        // Assumes `app.set('trust proxy', ...)` configured with `true` or specific values.
        const completeIp = req.ip;
        const completeUa = (0, util_2.getClientUa)(req);
        const externalPayload = (0, external_payload_1.parseKWSExternalPayloadV1WithV2Compat)(query.externalPayload);
        actorDid = externalPayload.actorDid;
        if (externalPayload.version === external_payload_1.KWSExternalPayloadVersion.V2) {
            const { countryCode, regionCode, attemptId } = externalPayload;
            const { access } = (0, util_1.computeAgeAssuranceAccessOrThrow)(const_1.AGE_ASSURANCE_CONFIG, {
                countryCode: countryCode,
                regionCode: regionCode,
                verifiedMinimumAge: 18, // `adult-verified` is 18+ only
            });
            await (0, stash_1.createEvent)(ctx, actorDid, {
                attemptId,
                status: 'assured',
                access,
                countryCode,
                regionCode,
                completeIp,
                completeUa,
            });
        }
        else {
            await (0, util_2.createStashEvent)(ctx, {
                actorDid,
                attemptId: externalPayload.attemptId,
                status: 'assured',
                completeIp,
                completeUa,
            });
        }
        return res
            .status(302)
            .setHeader('Location', `${ctx.cfg.kws.redirectUrl}?${new URLSearchParams({ actorDid, result: 'success' })}`)
            .end();
    }
    catch (err) {
        logger_1.httpLogger.error({ err }, 'Failed to handle KWS verification response');
        return res
            .status(302)
            .setHeader('Location', `${ctx.cfg.kws.redirectUrl}?${new URLSearchParams({ ...(actorDid ? { actorDid } : {}), result: 'unknown' })}`)
            .end();
    }
};
exports.verificationHandler = verificationHandler;
//# sourceMappingURL=api.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const logger_1 = require("../../../logger");
const util_1 = require("../../kws/util");
const const_1 = require("../const");
const age_verified_1 = require("../kws/age-verified");
const external_payload_1 = require("../kws/external-payload");
const stash_1 = require("../stash");
const util_2 = require("../util");
function parseQueryParams(ctx, req) {
    try {
        const status = String(req.query.status);
        const externalPayload = String(req.query.externalPayload);
        const signature = String(req.query.signature);
        (0, util_1.validateSignature)(ctx.cfg.kws.ageVerifiedRedirectSecret, `${status}:${externalPayload}`, signature);
        return {
            status,
            externalPayload,
        };
    }
    catch (err) {
        throw new Error('Invalid KWS API request', { cause: err });
    }
}
const handler = (ctx) => async (req, res) => {
    let externalPayload;
    try {
        const query = parseQueryParams(ctx, req);
        const { verified, verifiedMinimumAge } = (0, age_verified_1.parseKWSAgeVerifiedStatus)(query.status);
        externalPayload = (0, external_payload_1.parseKWSExternalPayloadV2)(query.externalPayload);
        const { actorDid, attemptId, countryCode, regionCode } = externalPayload;
        /*
         * KWS does not send unverified webhooks for age verification, so we
         * expect all webhooks to be verified. This is just a sanity check.
         */
        if (!verified) {
            const message = 'Expected KWS verification redirect to have verified status';
            logger_1.ageAssuranceLogger.error({}, message);
            throw new Error(message);
        }
        const { access } = (0, util_2.computeAgeAssuranceAccessOrThrow)(const_1.AGE_ASSURANCE_CONFIG, {
            countryCode,
            regionCode,
            verifiedMinimumAge,
        });
        await (0, stash_1.createEvent)(ctx, actorDid, {
            attemptId,
            // Assumes `app.set('trust proxy', ...)` configured with `true` or specific values.
            completeIp: req.ip,
            completeUa: (0, util_1.getClientUa)(req),
            countryCode,
            regionCode,
            status: 'assured',
            access,
        });
        const q = new URLSearchParams({ actorDid, result: 'success' });
        return res
            .status(302)
            .setHeader('Location', `${ctx.cfg.kws.redirectUrl}?${q}`)
            .end();
    }
    catch (err) {
        logger_1.ageAssuranceLogger.error({ err, ...externalPayload }, 'Failed to handle KWS verification redirect');
        const q = new URLSearchParams({
            ...(externalPayload ? { actorDid: externalPayload.actorDid } : {}),
            result: 'unknown',
        });
        return res
            .status(302)
            .setHeader('Location', `${ctx.cfg.kws.redirectUrl}?${q}`)
            .end();
    }
};
exports.handler = handler;
//# sourceMappingURL=kws-age-verified.js.map
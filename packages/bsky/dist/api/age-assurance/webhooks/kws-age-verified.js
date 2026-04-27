"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const logger_1 = require("../../../logger");
const const_1 = require("../const");
const age_verified_1 = require("../kws/age-verified");
const external_payload_1 = require("../kws/external-payload");
const stash_1 = require("../stash");
const util_1 = require("../util");
const handler = (ctx) => async (req, res) => {
    let body;
    try {
        body = (0, age_verified_1.parseKWSAgeVerifiedWebhook)(req.body);
    }
    catch (err) {
        const message = 'Failed to parse KWS webhook body';
        logger_1.ageAssuranceLogger.error({ err }, message);
        return res.status(400).json({ error: message });
    }
    const { status, externalPayload } = body.payload;
    const { verified, verifiedMinimumAge } = status;
    const { actorDid, countryCode, regionCode, attemptId } = (0, external_payload_1.parseKWSExternalPayloadV2)(externalPayload);
    /*
     * KWS does not send unverified webhooks for age verification, so we
     * expect all webhooks to be verified. This is just a sanity check.
     */
    if (!verified) {
        const message = 'Expected KWS webhook to have verified status';
        logger_1.ageAssuranceLogger.error({}, message);
        return res.status(400).json({ error: message });
    }
    let result;
    try {
        result = (0, util_1.computeAgeAssuranceAccessOrThrow)(const_1.AGE_ASSURANCE_CONFIG, {
            countryCode,
            regionCode,
            verifiedMinimumAge,
        });
    }
    catch (err) {
        // internal errors
        logger_1.ageAssuranceLogger.error({ err, attemptId, actorDid, countryCode, regionCode }, 'Failed to compute age assurance access');
    }
    try {
        if (result) {
            await (0, stash_1.createEvent)(ctx, actorDid, {
                attemptId,
                countryCode,
                regionCode,
                status: 'assured',
                access: result.access,
            });
        }
        return res.status(200).end();
    }
    catch (err) {
        const message = 'Failed to handle KWS webhook';
        logger_1.ageAssuranceLogger.error({ err, attemptId, actorDid, countryCode, regionCode }, message);
        return res.status(500).json({ error: message });
    }
};
exports.handler = handler;
//# sourceMappingURL=kws-age-verified.js.map
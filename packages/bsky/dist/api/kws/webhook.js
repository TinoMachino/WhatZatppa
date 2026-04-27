"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookHandler = exports.webhookAuth = void 0;
const logger_1 = require("../../logger");
const const_1 = require("../age-assurance/const");
const external_payload_1 = require("../age-assurance/kws/external-payload");
const stash_1 = require("../age-assurance/stash");
const util_1 = require("../age-assurance/util");
const types_1 = require("./types");
const util_2 = require("./util");
const webhookAuth = ({ secret }) => (req, res, next) => {
    const body = req.body;
    const sigHeader = req.headers['x-kws-signature'];
    if (!sigHeader || typeof sigHeader !== 'string') {
        return res.status(401).header((0, util_2.kwsWwwAuthenticate)()).json({
            success: false,
            error: 'Invalid authentication for KWS webhook: missing signature header',
        });
    }
    try {
        const parts = sigHeader.split(',');
        const timestamp = parts.find((p) => p.startsWith('t='))?.split('=')[1];
        const signature = parts.find((p) => p.startsWith('v1='))?.split('=')[1];
        if (typeof timestamp !== 'string' || typeof signature !== 'string') {
            throw new Error('Invalid webhook signature format');
        }
        const data = `${timestamp}.${body}`;
        (0, util_2.validateSignature)(secret, data, signature);
        next();
    }
    catch (err) {
        logger_1.httpLogger.error({ err }, 'Invalid KWS webhook signature');
        return res.status(401).header((0, util_2.kwsWwwAuthenticate)()).json({
            success: false,
            error: 'Invalid authentication for KWS webhook: signature mismatch',
        });
    }
};
exports.webhookAuth = webhookAuth;
const parseBody = (serialized) => {
    try {
        const value = JSON.parse(serialized);
        return types_1.webhookBodyIntermediateSchema.parse(value);
    }
    catch (err) {
        throw new Error(`Invalid webhook body: ${serialized}`, { cause: err });
    }
};
const webhookHandler = (ctx) => async (req, res) => {
    let body;
    try {
        body = parseBody(req.body);
    }
    catch (err) {
        logger_1.httpLogger.error({ err }, 'Invalid KWS webhook body');
        return res.status(400).json(err);
    }
    const { verified } = body.payload.status;
    if (!verified) {
        throw new Error('Unexpected KWS webhook call with unverified status');
    }
    const externalPayload = (0, external_payload_1.parseKWSExternalPayloadV1WithV2Compat)(body.payload.externalPayload);
    const isV2 = externalPayload.version === external_payload_1.KWSExternalPayloadVersion.V2;
    let result;
    if (isV2) {
        const { attemptId, actorDid, countryCode, regionCode } = externalPayload;
        try {
            result = (0, util_1.computeAgeAssuranceAccessOrThrow)(const_1.AGE_ASSURANCE_CONFIG, {
                countryCode: countryCode,
                regionCode: regionCode,
                verifiedMinimumAge: 18, // `adult-verified` is 18+ only
            });
        }
        catch (err) {
            // internal errors
            logger_1.httpLogger.error({ err, attemptId, actorDid, countryCode, regionCode }, 'Failed to compute age assurance access');
        }
    }
    try {
        if (isV2) {
            if (result) {
                const { attemptId, actorDid, countryCode, regionCode } = externalPayload;
                await (0, stash_1.createEvent)(ctx, actorDid, {
                    attemptId,
                    status: 'assured',
                    access: result.access,
                    countryCode,
                    regionCode,
                });
            } // else do nothing
        }
        else {
            const { attemptId, actorDid } = externalPayload;
            await (0, util_2.createStashEvent)(ctx, {
                attemptId: attemptId,
                actorDid: actorDid,
                status: 'assured',
            });
        }
        return res.status(200).end();
    }
    catch (err) {
        logger_1.httpLogger.error({ err }, 'Failed to handle KWS webhook');
        return res.status(500).json(err);
    }
};
exports.webhookHandler = webhookHandler;
//# sourceMappingURL=webhook.js.map
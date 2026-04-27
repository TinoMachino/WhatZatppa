"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_crypto_1 = __importDefault(require("node:crypto"));
const address_1 = require("@hapi/address");
const disposable_email_domains_js_1 = require("disposable-email-domains-js");
const api_1 = require("@atproto/api");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const logger_1 = require("../../../../logger");
const const_1 = require("../../../age-assurance/const");
const const_2 = require("../../../age-assurance/kws/const");
const external_payload_1 = require("../../../age-assurance/kws/external-payload");
const stash_1 = require("../../../age-assurance/stash");
const util_1 = require("../../../age-assurance/util");
const util_2 = require("../../../kws/util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.ageassurance.begin, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth, input, req }) => {
            if (!ctx.kwsClient) {
                throw new xrpc_server_1.MethodNotImplementedError('This service is not configured to support age assurance.');
            }
            const actorDid = auth.credentials.iss;
            const actorInfo = await getAgeVerificationState(ctx, actorDid);
            const existingStatus = actorInfo?.ageAssuranceStatus?.status;
            const existingAccess = actorInfo?.ageAssuranceStatus?.access;
            if (existingStatus === 'blocked') {
                throw new xrpc_server_1.InvalidRequestError(`Cannot initiate age assurance flow from current state: ${existingStatus}`, 'InvalidInitiation');
            }
            const attemptId = node_crypto_1.default.randomUUID();
            const { email, language, countryCode, regionCode } = validateInput(input.body);
            let externalPayload;
            try {
                externalPayload = (0, external_payload_1.serializeKWSExternalPayloadV2)({
                    version: external_payload_1.KWSExternalPayloadVersion.V2,
                    actorDid,
                    attemptId,
                    countryCode,
                    regionCode,
                });
            }
            catch (err) {
                if (err instanceof external_payload_1.KWSExternalPayloadTooLargeError) {
                    logger_1.httpLogger.error({ err, actorDid }, err.message);
                    throw new xrpc_server_1.InvalidRequestError('Age Assurance flow failed because DID is too long', 'DidTooLong');
                }
                throw err;
            }
            /*
             * Determine if age assurance config exists for this region. The calling
             * application should already have checked for this, so this is just a
             * safeguard.
             */
            const region = (0, api_1.getAgeAssuranceRegionConfig)(const_1.AGE_ASSURANCE_CONFIG, {
                countryCode,
                regionCode,
            });
            if (!region) {
                const message = 'Age Assurance is not required in this region';
                logger_1.httpLogger.error({ actorDid, countryCode, regionCode }, message);
                throw new xrpc_server_1.InvalidRequestError(message, 'RegionNotSupported');
            }
            const location = (0, util_1.createLocationString)(countryCode, regionCode);
            if (const_2.KWS_V2_COUNTRIES.has(region.countryCode)) {
                // `age-verified` flow
                await ctx.kwsClient.sendAgeVerifiedFlowEmail({
                    location,
                    email,
                    externalPayload,
                    language,
                });
            }
            else {
                // `adult-verified` flow is what we've been using prior to `age-verified`
                await ctx.kwsClient.sendAdultVerifiedFlowEmail({
                    location,
                    email,
                    externalPayload,
                    language,
                });
            }
            // If we have existing status/access for this region, retain it.
            const nextStatus = existingStatus && existingStatus !== 'unknown'
                ? existingStatus
                : 'pending';
            const nextAccess = existingAccess && existingAccess !== 'unknown'
                ? existingAccess
                : 'unknown';
            const event = await (0, stash_1.createEvent)(ctx, actorDid, {
                attemptId,
                email,
                // Assumes `app.set('trust proxy', ...)` configured with `true` or specific values.
                initIp: req.ip,
                initUa: (0, util_2.getClientUa)(req),
                status: nextStatus,
                access: nextAccess,
                countryCode,
                regionCode,
            });
            return {
                encoding: 'application/json',
                body: {
                    lastInitiatedAt: event.createdAt,
                    status: nextStatus,
                    access: nextAccess,
                },
            };
        },
    });
}
function validateInput({ email, language, ...rest }) {
    if (!(0, address_1.isEmailValid)(email) || (0, disposable_email_domains_js_1.isDisposableEmail)(email)) {
        throw new xrpc_server_1.InvalidRequestError('This email address is not supported, please use a different email.', 'InvalidEmail');
    }
    return {
        email,
        language: const_2.KWS_SUPPORTED_LANGUAGES.has(language) ? language : 'en',
        ...rest,
    };
}
async function getAgeVerificationState(ctx, actorDid) {
    try {
        const res = await ctx.dataplane.getActors({
            dids: [actorDid],
            returnAgeAssuranceForDids: [actorDid],
            skipCacheForDids: [actorDid],
        });
        return res.actors[0];
    }
    catch (err) {
        return undefined;
    }
}
//# sourceMappingURL=begin.js.map
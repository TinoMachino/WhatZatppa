"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_crypto_1 = __importDefault(require("node:crypto"));
const address_1 = require("@hapi/address");
const disposable_email_domains_js_1 = require("disposable-email-domains-js");
const xrpc_server_1 = require("@atproto/xrpc-server");
const kws_1 = require("../../../../kws");
const index_js_1 = require("../../../../lexicons/index.js");
const logger_1 = require("../../../../logger");
const util_1 = require("../../../kws/util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.unspecced.initAgeAssurance, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth, input, req }) => {
            if (!ctx.kwsClient) {
                throw new xrpc_server_1.MethodNotImplementedError('This service is not configured to support age assurance.');
            }
            const actorDid = auth.credentials.iss;
            const actorInfo = await getAgeVerificationState(ctx, actorDid);
            if (actorInfo?.ageAssuranceStatus) {
                if (actorInfo.ageAssuranceStatus.status !== 'unknown' &&
                    actorInfo.ageAssuranceStatus.status !== 'pending') {
                    throw new xrpc_server_1.InvalidRequestError(`Cannot initiate age assurance flow from current state: ${actorInfo.ageAssuranceStatus.status}`, 'InvalidInitiation');
                }
            }
            const { countryCode, email, language } = validateInput(input.body);
            const attemptId = node_crypto_1.default.randomUUID();
            // Assumes `app.set('trust proxy', ...)` configured with `true` or specific values.
            const initIp = req.ip;
            const initUa = (0, util_1.getClientUa)(req);
            const externalPayload = { actorDid, attemptId };
            try {
                await ctx.kwsClient.sendEmail({
                    countryCode: countryCode.toUpperCase(),
                    email,
                    externalPayload,
                    language,
                });
            }
            catch (err) {
                if (err instanceof kws_1.KwsExternalPayloadError) {
                    logger_1.httpLogger.error({ externalPayload }, 'Age Assurance flow failed because external payload got too long, which is caused by the DID being too long');
                    throw new xrpc_server_1.InvalidRequestError('Age Assurance flow failed because DID is too long', 'DidTooLong');
                }
                throw err;
            }
            const event = await (0, util_1.createStashEvent)(ctx, {
                actorDid,
                attemptId,
                email,
                initIp,
                initUa,
                status: 'pending',
            });
            return {
                encoding: 'application/json',
                body: {
                    status: event.status,
                    lastInitiatedAt: event.createdAt,
                },
            };
        },
    });
}
// Supported languages for KWS Adult Verification.
// This list comes from KWS's AV Developer Guide PDF doc.
const kwsAvSupportedLanguages = [
    'en',
    'ar',
    'zh-Hans',
    'nl',
    'tl',
    'fr',
    'de',
    'id',
    'it',
    'ja',
    'ko',
    'pl',
    'pt-BR',
    'pt',
    'ru',
    'es',
    'th',
    'tr',
    'vi',
];
const validateInput = (input) => {
    const { countryCode, email, language } = input;
    if (!(0, address_1.isEmailValid)(email) || (0, disposable_email_domains_js_1.isDisposableEmail)(email)) {
        throw new xrpc_server_1.InvalidRequestError('This email address is not supported, please use a different email.', 'InvalidEmail');
    }
    return {
        countryCode,
        email,
        language: kwsAvSupportedLanguages.includes(language) ? language : 'en',
    };
};
const getAgeVerificationState = async (ctx, actorDid) => {
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
};
//# sourceMappingURL=initAgeAssurance.js.map
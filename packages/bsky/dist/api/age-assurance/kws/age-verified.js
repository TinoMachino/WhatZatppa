"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseKWSAgeVerifiedWebhook = exports.KWSAgeVerifiedWebhookSchema = exports.parseKWSAgeVerifiedStatus = exports.KWSAgeVerifiedStatusSchema = void 0;
exports.serializeKWSAgeVerifiedStatus = serializeKWSAgeVerifiedStatus;
const zod_1 = require("zod");
/**
 * Schema for KWS the `status` object on `age-verified` payloads.
 */
exports.KWSAgeVerifiedStatusSchema = zod_1.z.object({
    verified: zod_1.z.boolean(),
    verifiedMinimumAge: zod_1.z.number(),
    transactionId: zod_1.z.string().optional(),
});
function serializeKWSAgeVerifiedStatus(status) {
    return JSON.stringify(exports.KWSAgeVerifiedStatusSchema.parse(status));
}
/**
 * Parse KWS `age-verified` status object.
 */
const parseKWSAgeVerifiedStatus = (raw) => {
    try {
        const value = JSON.parse(raw);
        return exports.KWSAgeVerifiedStatusSchema.parse(value);
    }
    catch (err) {
        throw new Error(`Invalid KWS age-verified status: ${raw}`, {
            cause: err,
        });
    }
};
exports.parseKWSAgeVerifiedStatus = parseKWSAgeVerifiedStatus;
/**
 * Schema for KWS `age-verified` webhooks.
 *
 * Note: we don't use `.strict()` here so that we avoid breaking if KWS adds
 * fields, and some fields below are not strictly typed since we're not using
 * them.
 */
exports.KWSAgeVerifiedWebhookSchema = zod_1.z.object({
    name: zod_1.z.string(),
    time: zod_1.z.string(), // ISO8601 timestamp, but don't validate here
    orgId: zod_1.z.string().uuid().optional(),
    productId: zod_1.z.string().uuid().optional(),
    payload: zod_1.z.object({
        email: zod_1.z.string(), // no need to validate here
        externalPayload: zod_1.z.string(),
        status: exports.KWSAgeVerifiedStatusSchema,
    }),
});
/**
 * Parse KWS `age-verified` webhook body and its external payload.
 */
const parseKWSAgeVerifiedWebhook = (raw) => {
    try {
        const value = JSON.parse(raw);
        return exports.KWSAgeVerifiedWebhookSchema.parse(value);
    }
    catch (err) {
        throw new Error(`Invalid webhook body: ${raw}`, { cause: err });
    }
};
exports.parseKWSAgeVerifiedWebhook = parseKWSAgeVerifiedWebhook;
//# sourceMappingURL=age-verified.js.map
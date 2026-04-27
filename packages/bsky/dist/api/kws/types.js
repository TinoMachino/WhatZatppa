"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookBodyIntermediateSchema = exports.statusSchema = exports.verificationIntermediateQuerySchema = exports.externalPayloadSchema = void 0;
const zod_1 = require("zod");
// `.strict()` because we control the payload structure.
exports.externalPayloadSchema = zod_1.z
    .object({
    actorDid: zod_1.z.string(),
    attemptId: zod_1.z.string(),
})
    .strict();
// Not `.strict()` to avoid breaking if KWS adds fields.
exports.verificationIntermediateQuerySchema = zod_1.z.object({
    externalPayload: zod_1.z.string(),
    signature: zod_1.z.string(),
    status: zod_1.z.string(),
});
// Not `.strict()` to avoid breaking if KWS adds fields.
exports.statusSchema = zod_1.z.object({
    verified: zod_1.z.boolean(),
});
// Not `.strict()` to avoid breaking if KWS adds fields.
exports.webhookBodyIntermediateSchema = zod_1.z.object({
    payload: zod_1.z.object({
        externalPayload: zod_1.z.string(),
        status: exports.statusSchema,
    }),
});
//# sourceMappingURL=types.js.map
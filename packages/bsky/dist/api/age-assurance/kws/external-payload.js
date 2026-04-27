"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KWSExternalPayloadV2Schema = exports.KWSExternalPayloadV1Schema = exports.KWSExternalPayloadVersion = exports.KWSExternalPayloadTooLargeError = exports.KWS_EXTERNAL_PAYLOAD_CHAR_LIMIT = void 0;
exports.parseKWSExternalPayloadVersion = parseKWSExternalPayloadVersion;
exports.parseKWSExternalPayloadV1 = parseKWSExternalPayloadV1;
exports.serializeKWSExternalPayloadV1 = serializeKWSExternalPayloadV1;
exports.parseKWSExternalPayloadV1WithV2Compat = parseKWSExternalPayloadV1WithV2Compat;
exports.serializeKWSExternalPayloadV2 = serializeKWSExternalPayloadV2;
exports.parseKWSExternalPayloadV2 = parseKWSExternalPayloadV2;
const zod_1 = require("zod");
exports.KWS_EXTERNAL_PAYLOAD_CHAR_LIMIT = 250;
/**
 * Thrown when the provided external payload exceeds KWS's character limit.
 *
 * This is most commonly caused by DIDs that are too long, such as for
 * `did:web` DIDs. But it's very rare, and the client has special handling for
 * this case.
 */
class KWSExternalPayloadTooLargeError extends Error {
}
exports.KWSExternalPayloadTooLargeError = KWSExternalPayloadTooLargeError;
var KWSExternalPayloadVersion;
(function (KWSExternalPayloadVersion) {
    KWSExternalPayloadVersion["V1"] = "1";
    KWSExternalPayloadVersion["V2"] = "2";
})(KWSExternalPayloadVersion || (exports.KWSExternalPayloadVersion = KWSExternalPayloadVersion = {}));
function parseKWSExternalPayloadVersion(raw) {
    switch (raw) {
        case KWSExternalPayloadVersion.V2:
            return KWSExternalPayloadVersion.V2;
        default:
            return KWSExternalPayloadVersion.V1;
    }
}
exports.KWSExternalPayloadV1Schema = zod_1.z.object({
    actorDid: zod_1.z.string(),
    attemptId: zod_1.z.string(),
});
function parseKWSExternalPayloadV1(raw) {
    try {
        const value = JSON.parse(raw);
        return exports.KWSExternalPayloadV1Schema.parse(value);
    }
    catch (err) {
        throw new Error(`Failed to parse KWSExternalPayloadV1`, {
            cause: err,
        });
    }
}
function serializeKWSExternalPayloadV1(payload) {
    try {
        return JSON.stringify(exports.KWSExternalPayloadV1Schema.parse(payload));
    }
    catch (err) {
        throw new Error('Failed to serialize KWSExternalPayloadV1', { cause: err });
    }
}
/**
 * During our migration from v1 to v2 of the KWS external payload, we'll be
 * sending v2 payloads on the v1 flow (the `adult-verified` email flow). We use
 * this utility to parse either v1 or v2 payloads in that flow.
 *
 * Check for the `version` field on the output of this method to discriminate
 * between the two types and handle them differently.
 */
function parseKWSExternalPayloadV1WithV2Compat(raw) {
    const deserialized = JSON.parse(raw);
    const v2 = deserialized.v === KWSExternalPayloadVersion.V2;
    if (v2) {
        return parseKWSExternalPayloadV2(raw);
    }
    else {
        return {
            ...parseKWSExternalPayloadV1(raw),
            version: KWSExternalPayloadVersion.V1,
        };
    }
}
exports.KWSExternalPayloadV2Schema = zod_1.z.object({
    v: zod_1.z.string(),
    id: zod_1.z.string(),
    did: zod_1.z.string(),
    gc: zod_1.z.string().length(2),
    gr: zod_1.z.string().optional(),
});
function serializeKWSExternalPayloadV2(payload) {
    let compressed;
    try {
        compressed = exports.KWSExternalPayloadV2Schema.parse({
            v: KWSExternalPayloadVersion.V2, // version
            id: payload.attemptId,
            did: payload.actorDid,
            gc: payload.countryCode, // geolocation country
            gr: payload.regionCode, // geolocation region
        });
    }
    catch (err) {
        throw new Error('Failed to serialize KWSExternalPayloadV2', { cause: err });
    }
    const serialized = JSON.stringify(compressed);
    if (serialized.length > exports.KWS_EXTERNAL_PAYLOAD_CHAR_LIMIT) {
        throw new KWSExternalPayloadTooLargeError(`Serialized external payload size ${serialized.length} exceeds limit of ${exports.KWS_EXTERNAL_PAYLOAD_CHAR_LIMIT}`);
    }
    return serialized;
}
function parseKWSExternalPayloadV2(raw) {
    try {
        const deserialized = JSON.parse(raw);
        const parsed = exports.KWSExternalPayloadV2Schema.parse(deserialized);
        return {
            version: KWSExternalPayloadVersion.V2,
            attemptId: parsed.id,
            actorDid: parsed.did,
            countryCode: parsed.gc,
            regionCode: parsed.gr,
        };
    }
    catch (err) {
        throw new Error(`Failed to parse KWSExternalPayloadV2`, {
            cause: err,
        });
    }
}
//# sourceMappingURL=external-payload.js.map
import { z } from 'zod';
export declare const KWS_EXTERNAL_PAYLOAD_CHAR_LIMIT = 250;
/**
 * Thrown when the provided external payload exceeds KWS's character limit.
 *
 * This is most commonly caused by DIDs that are too long, such as for
 * `did:web` DIDs. But it's very rare, and the client has special handling for
 * this case.
 */
export declare class KWSExternalPayloadTooLargeError extends Error {
}
export declare enum KWSExternalPayloadVersion {
    V1 = "1",
    V2 = "2"
}
export declare function parseKWSExternalPayloadVersion(raw: string): KWSExternalPayloadVersion;
export type KWSExternalPayloadV1 = {
    actorDid: string;
    attemptId: string;
};
export declare const KWSExternalPayloadV1Schema: z.ZodObject<{
    actorDid: z.ZodString;
    attemptId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    actorDid: string;
    attemptId: string;
}, {
    actorDid: string;
    attemptId: string;
}>;
export declare function parseKWSExternalPayloadV1(raw: string): KWSExternalPayloadV1;
export declare function serializeKWSExternalPayloadV1(payload: KWSExternalPayloadV1): string;
/**
 * During our migration from v1 to v2 of the KWS external payload, we'll be
 * sending v2 payloads on the v1 flow (the `adult-verified` email flow). We use
 * this utility to parse either v1 or v2 payloads in that flow.
 *
 * Check for the `version` field on the output of this method to discriminate
 * between the two types and handle them differently.
 */
export declare function parseKWSExternalPayloadV1WithV2Compat(raw: string): (KWSExternalPayloadV1 & {
    version: KWSExternalPayloadVersion.V1;
}) | KWSExternalPayloadV2;
/***************************
 * KWS External Payload V2 *
 ***************************/
export type KWSExternalPayloadV2 = {
    version: KWSExternalPayloadVersion.V2;
    attemptId: string;
    actorDid: string;
    countryCode: string;
    regionCode?: string;
};
export declare const KWSExternalPayloadV2Schema: z.ZodObject<{
    v: z.ZodString;
    id: z.ZodString;
    did: z.ZodString;
    gc: z.ZodString;
    gr: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    did: string;
    id: string;
    v: string;
    gc: string;
    gr?: string | undefined;
}, {
    did: string;
    id: string;
    v: string;
    gc: string;
    gr?: string | undefined;
}>;
export declare function serializeKWSExternalPayloadV2(payload: KWSExternalPayloadV2): string;
export declare function parseKWSExternalPayloadV2(raw: string): KWSExternalPayloadV2;
//# sourceMappingURL=external-payload.d.ts.map
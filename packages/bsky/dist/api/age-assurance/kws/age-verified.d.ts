import { z } from 'zod';
/**
 * Schema for KWS the `status` object on `age-verified` payloads.
 */
export declare const KWSAgeVerifiedStatusSchema: z.ZodObject<{
    verified: z.ZodBoolean;
    verifiedMinimumAge: z.ZodNumber;
    transactionId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    verified: boolean;
    verifiedMinimumAge: number;
    transactionId?: string | undefined;
}, {
    verified: boolean;
    verifiedMinimumAge: number;
    transactionId?: string | undefined;
}>;
/**
 * The KWS `status` object on `age-verified` payloads.
 */
export type KWSAgeVerifiedStatus = z.infer<typeof KWSAgeVerifiedStatusSchema>;
export declare function serializeKWSAgeVerifiedStatus(status: KWSAgeVerifiedStatus): string;
/**
 * Parse KWS `age-verified` status object.
 */
export declare const parseKWSAgeVerifiedStatus: (raw: string) => KWSAgeVerifiedStatus;
/**
 * Schema for KWS `age-verified` webhooks.
 *
 * Note: we don't use `.strict()` here so that we avoid breaking if KWS adds
 * fields, and some fields below are not strictly typed since we're not using
 * them.
 */
export declare const KWSAgeVerifiedWebhookSchema: z.ZodObject<{
    name: z.ZodString;
    time: z.ZodString;
    orgId: z.ZodOptional<z.ZodString>;
    productId: z.ZodOptional<z.ZodString>;
    payload: z.ZodObject<{
        email: z.ZodString;
        externalPayload: z.ZodString;
        status: z.ZodObject<{
            verified: z.ZodBoolean;
            verifiedMinimumAge: z.ZodNumber;
            transactionId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            verified: boolean;
            verifiedMinimumAge: number;
            transactionId?: string | undefined;
        }, {
            verified: boolean;
            verifiedMinimumAge: number;
            transactionId?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: {
            verified: boolean;
            verifiedMinimumAge: number;
            transactionId?: string | undefined;
        };
        email: string;
        externalPayload: string;
    }, {
        status: {
            verified: boolean;
            verifiedMinimumAge: number;
            transactionId?: string | undefined;
        };
        email: string;
        externalPayload: string;
    }>;
}, "strip", z.ZodTypeAny, {
    time: string;
    name: string;
    payload: {
        status: {
            verified: boolean;
            verifiedMinimumAge: number;
            transactionId?: string | undefined;
        };
        email: string;
        externalPayload: string;
    };
    orgId?: string | undefined;
    productId?: string | undefined;
}, {
    time: string;
    name: string;
    payload: {
        status: {
            verified: boolean;
            verifiedMinimumAge: number;
            transactionId?: string | undefined;
        };
        email: string;
        externalPayload: string;
    };
    orgId?: string | undefined;
    productId?: string | undefined;
}>;
/**
 * The raw KWS `age-verified` webhook body
 */
export type KWSWebhookAgeVerified = z.infer<typeof KWSAgeVerifiedWebhookSchema>;
/**
 * Parse KWS `age-verified` webhook body and its external payload.
 */
export declare const parseKWSAgeVerifiedWebhook: (raw: string) => KWSWebhookAgeVerified;
//# sourceMappingURL=age-verified.d.ts.map
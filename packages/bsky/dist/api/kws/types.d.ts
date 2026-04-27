import { z } from 'zod';
import { KwsConfig, ServerConfig } from '../../config';
import { AppContext } from '../../context';
import { KwsClient } from '../../kws';
export type AppContextWithKwsClient = AppContext & {
    kwsClient: KwsClient;
    cfg: ServerConfig & {
        kws: KwsConfig;
    };
};
export type KwsExternalPayload = {
    actorDid: string;
    attemptId: string;
};
export declare const externalPayloadSchema: z.ZodObject<{
    actorDid: z.ZodString;
    attemptId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    actorDid: string;
    attemptId: string;
}, {
    actorDid: string;
    attemptId: string;
}>;
export type KwsStatus = {
    verified: boolean;
};
export type KwsVerificationIntermediateQuery = {
    externalPayload: string;
    status: string;
    signature: string;
};
export declare const verificationIntermediateQuerySchema: z.ZodObject<{
    externalPayload: z.ZodString;
    signature: z.ZodString;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    externalPayload: string;
    signature: string;
}, {
    status: string;
    externalPayload: string;
    signature: string;
}>;
export type KwsVerificationQuery = {
    externalPayload: KwsExternalPayload;
    signature: string;
    status: KwsStatus;
};
export type KwsWebhookBody = {
    payload: {
        externalPayload: KwsExternalPayload;
        status: KwsStatus;
    };
};
export declare const statusSchema: z.ZodObject<{
    verified: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    verified: boolean;
}, {
    verified: boolean;
}>;
export declare const webhookBodyIntermediateSchema: z.ZodObject<{
    payload: z.ZodObject<{
        externalPayload: z.ZodString;
        status: z.ZodObject<{
            verified: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            verified: boolean;
        }, {
            verified: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: {
            verified: boolean;
        };
        externalPayload: string;
    }, {
        status: {
            verified: boolean;
        };
        externalPayload: string;
    }>;
}, "strip", z.ZodTypeAny, {
    payload: {
        status: {
            verified: boolean;
        };
        externalPayload: string;
    };
}, {
    payload: {
        status: {
            verified: boolean;
        };
        externalPayload: string;
    };
}>;
//# sourceMappingURL=types.d.ts.map
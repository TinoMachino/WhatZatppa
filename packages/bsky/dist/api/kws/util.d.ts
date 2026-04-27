import express from 'express';
import { AppContext } from '../../context';
import { app } from '../../lexicons/index.js';
import { KwsExternalPayload, KwsStatus } from './types';
export declare const createStashEvent: (ctx: AppContext, { actorDid, attemptId, email, initIp, initUa, completeIp, completeUa, status, }: {
    actorDid: string;
    attemptId: string;
    email?: string;
    initIp?: string;
    initUa?: string;
    completeIp?: string;
    completeUa?: string;
    status: app.bsky.unspecced.defs.AgeAssuranceState["status"];
}) => Promise<app.bsky.unspecced.defs.$defs.AgeAssuranceEvent>;
export declare const validateSignature: (key: string, data: string, signature: string) => void;
export declare const serializeExternalPayload: (value: KwsExternalPayload) => string;
export declare const parseExternalPayload: (serialized: string) => KwsExternalPayload;
export declare const parseStatus: (serialized: string) => KwsStatus;
export declare const kwsWwwAuthenticate: () => Record<string, string>;
export declare const getClientUa: (req: express.Request) => string | undefined;
//# sourceMappingURL=util.d.ts.map
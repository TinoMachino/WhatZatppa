import express from 'express';
import { HeadersMap } from '@atproto/xrpc';
import { LexValue, l } from '@atproto/lex';
import { HandlerPipeThrough } from '@atproto/xrpc-server';
import { AppContext } from '../context';
import { HandlerResponse, LocalRecords, MungeFn } from './types';
export declare const getRepoRev: (headers: HeadersMap) => string | undefined;
export declare const getLocalLag: (local: LocalRecords) => number | undefined;
export declare const pipethroughReadAfterWrite: <M extends (l.Query | l.Procedure) & {
    output: l.Payload<`application/json`, l.Schema<LexValue>>;
}>(ctx: AppContext, reqCtx: {
    req: express.Request;
    auth: {
        credentials: {
            did: string;
        };
    };
}, ns: l.Main<M>, munge: MungeFn<l.InferMethodOutputBody<M>>) => Promise<HandlerResponse<l.InferMethodOutputBody<M>> | HandlerPipeThrough>;
export declare const formatMungedResponse: <T>(body: T, lag?: number) => HandlerResponse<T>;
//# sourceMappingURL=util.d.ts.map
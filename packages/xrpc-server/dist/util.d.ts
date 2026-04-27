import { IncomingMessage, OutgoingMessage } from 'node:http';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { l } from '@atproto/lex-schema';
import { type LexXrpcProcedure, type LexXrpcQuery, type LexXrpcSubscription, Lexicons } from '@atproto/lexicon';
import { ErrorResult } from './errors';
import { Auth, Input, LexMethodInput, LexMethodOutput, LexMethodParams, Output, Params, RouteOptions, UndecodedParams } from './types';
export type Overwrite<T, U> = Omit<T, keyof U> & U;
export type ParamsVerifierInternal<P extends Params = Params> = (req: IncomingMessage | ExpressRequest) => P;
export type AuthVerifierInternal<C, A extends Auth = Auth> = (ctx: C) => Promise<Exclude<A, ErrorResult>>;
export type InputVerifierInternal<I extends Input = Input> = (req: ExpressRequest, res: ExpressResponse) => Promise<I>;
export type OutputVerifierInternal<O extends Output = Output> = (handleOutput: O) => void;
export declare const asArray: <T>(arr: T | T[]) => T[];
export declare function setHeaders(res: OutgoingMessage, headers?: Record<string, string | number>): void;
export declare function decodeQueryParam(type: string, value: unknown): string | number | boolean | undefined;
export declare function getQueryParams(req: IncomingMessage | ExpressRequest, opts?: {
    parseLoose?: boolean;
}): UndecodedParams;
export declare function createLexiconParamsVerifier<P extends Params = Params>(nsid: string, def: LexXrpcQuery | LexXrpcProcedure | LexXrpcSubscription, lexicons: Lexicons): ParamsVerifierInternal<P>;
export declare function createSchemaParamsVerifier<M extends l.Procedure | l.Query | l.Subscription>(ns: l.Main<M>, options?: RouteOptions): ParamsVerifierInternal<LexMethodParams<M>>;
export declare function createLexiconInputVerifier<I extends Input = Input>(nsid: string, def: LexXrpcProcedure | LexXrpcQuery, options: RouteOptions, lexicons: Lexicons): InputVerifierInternal<I>;
export declare function createSchemaInputVerifier<M extends l.Procedure | l.Query>(ns: l.Main<M>, options: RouteOptions): InputVerifierInternal<LexMethodInput<M>>;
export declare function createLexiconOutputVerifier<O extends Output = Output>(nsid: string, def: LexXrpcProcedure | LexXrpcQuery, lexicons: Lexicons): OutputVerifierInternal<O>;
export declare function createSchemaOutputVerifier<M extends l.Procedure | l.Query>(ns: l.Main<M>): OutputVerifierInternal<LexMethodOutput<M>>;
export declare function parseReqEncoding(req: IncomingMessage): string;
export declare function serverTimingHeader(timings: ServerTiming[]): string;
export declare class ServerTimer implements ServerTiming {
    name: string;
    description?: string | undefined;
    duration?: number;
    private startMs?;
    constructor(name: string, description?: string | undefined);
    start(): this;
    stop(): this;
}
export interface ServerTiming {
    name: string;
    duration?: number;
    description?: string;
}
export declare const parseReqNsid: (req: ExpressRequest | IncomingMessage) => string;
/**
 * Validates and extracts the nsid from an xrpc path
 */
export declare const parseUrlNsid: (url: string) => string;
export declare const extractUrlNsid: (url: string) => string | undefined;
//# sourceMappingURL=util.d.ts.map
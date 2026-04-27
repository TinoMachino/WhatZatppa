import { type IncomingMessage } from 'node:http';
export declare const blobStoreLogger: import("pino").default.Logger<never>;
export declare const dbLogger: import("pino").default.Logger<never>;
export declare const didCacheLogger: import("pino").default.Logger<never>;
export declare const readStickyLogger: import("pino").default.Logger<never>;
export declare const redisLogger: import("pino").default.Logger<never>;
export declare const seqLogger: import("pino").default.Logger<never>;
export declare const mailerLogger: import("pino").default.Logger<never>;
export declare const labelerLogger: import("pino").default.Logger<never>;
export declare const crawlerLogger: import("pino").default.Logger<never>;
export declare const httpLogger: import("pino").default.Logger<never>;
export declare const fetchLogger: import("pino").default.Logger<never>;
export declare const oauthLogger: import("pino").default.Logger<never>;
export declare const lexiconResolverLogger: import("pino").default.Logger<never>;
export declare const loggerMiddleware: import("pino-http").HttpLogger<IncomingMessage, import("http").ServerResponse<IncomingMessage>, never>;
export declare function reqSerializer(req: IncomingMessage): {
    headers: Record<string, string>;
    id: string | undefined;
    method: string;
    url: string;
    remoteAddress: string;
    remotePort: number;
    params: Record<string, string>;
    query: Record<string, string>;
    raw: IncomingMessage;
};
//# sourceMappingURL=logger.d.ts.map
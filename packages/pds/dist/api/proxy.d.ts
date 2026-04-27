import { IncomingMessage } from 'node:http';
import express from 'express';
export declare function authPassthru(req: IncomingMessage): {
    headers: {
        authorization: string;
    };
} | undefined;
export declare const forwardedFor: (req: express.Request, params: HeadersParam | undefined) => HeadersParam;
type HeadersParam = {
    headers: Record<string, string>;
};
export {};
//# sourceMappingURL=proxy.d.ts.map
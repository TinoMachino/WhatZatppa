import { z } from 'zod';
import { RequestId } from './request-id.js';
export declare const REQUEST_URI_PREFIX = "urn:ietf:params:oauth:request_uri:";
export declare const requestUriSchema: z.ZodEffects<z.ZodString, `urn:ietf:params:oauth:request_uri:req-${string}`, string>;
export type RequestUri = z.infer<typeof requestUriSchema>;
export declare function encodeRequestUri(requestId: RequestId): RequestUri;
export declare function decodeRequestUri(requestUri: RequestUri): RequestId;
export declare function parseRequestUri(requestUri: string, parseParams?: {
    path?: (string | number)[];
}): RequestUri;
//# sourceMappingURL=request-uri.d.ts.map
import { IncomingHttpHeaders } from 'node:http';
import { Readable } from 'node:stream';
import { Request } from 'express';
import { CatchallHandler, HandlerPipeThroughBuffer, HandlerPipeThroughStream, XRPCError as XRPCServerError } from '@atproto/xrpc-server';
import { AppContext } from './context';
export declare const proxyHandler: (ctx: AppContext) => CatchallHandler;
export type PipethroughOptions = {
    /**
     * Specify the issuer (requester) for service auth. If not provided, no
     * authorization headers will be added to the request.
     */
    iss?: string;
    /**
     * Override the audience for service auth. If not provided, the audience will
     * be determined based on the proxy service.
     */
    aud?: string;
    /**
     * Override the lexicon method for service auth. If not provided, the lexicon
     * method will be determined based on the request path.
     */
    lxm?: string;
};
export declare function pipethrough(ctx: AppContext, req: Request, options?: PipethroughOptions): Promise<HandlerPipeThroughStream & {
    stream: Readable;
    headers: Record<string, string>;
    encoding: string;
}>;
export declare function computeProxyTo(ctx: AppContext, req: Request, lxm: string): string;
export declare function parseProxyInfo(ctx: AppContext, req: Request, lxm: string): Promise<{
    url: string;
    did: string;
}>;
export declare const parseProxyHeader: (ctx: Pick<AppContext, "cfg" | "idResolver">, proxyTo: string) => Promise<{
    did: string;
    url: string;
}>;
export declare function isJsonContentType(contentType?: string): boolean | undefined;
export declare function asPipeThroughBuffer(input: HandlerPipeThroughStream): Promise<HandlerPipeThroughBuffer>;
/**
 * Performs lexicon method matching on a set of methods,
 * taking into account that they are treated case-insensitively.
 */
export declare class LxmSet {
    private inner;
    private original;
    constructor(items: Iterable<string>);
    has(lxm: string): boolean;
    [Symbol.iterator](): Iterator<string>;
}
export declare function normalizeLxm(lxm: string): string;
export declare const CHAT_BSKY_METHODS: LxmSet;
export declare const PRIVILEGED_METHODS: LxmSet;
export declare const PROTECTED_METHODS: LxmSet;
export declare class PipethroughUpstreamError extends XRPCServerError {
    readonly upstream: {
        statusCode: number;
        headers: IncomingHttpHeaders;
    };
    constructor(upstream: {
        statusCode: number;
        headers: IncomingHttpHeaders;
    }, payload: {
        message?: string;
        error?: string;
    }, options?: ErrorOptions);
    get headers(): Record<string, string>;
    get error(): string | undefined;
}
//# sourceMappingURL=pipethrough.d.ts.map
import { Writable } from 'node:stream';
import { Dispatcher } from 'undici';
import { AtprotoDid } from '@atproto/did';
import { Cid } from '@atproto/lex';
import { AppContext } from '../context';
import { Middleware } from '../util/http';
export declare function createMiddleware(ctx: AppContext): Middleware;
export type StreamBlobOptions = {
    cid: string;
    did: string;
    acceptEncoding?: string;
    signal?: AbortSignal;
};
export type StreamBlobFactory = (data: Dispatcher.StreamFactoryData, info: {
    url: URL;
    did: AtprotoDid;
    cid: Cid;
}) => Writable;
export declare function streamBlob(ctx: AppContext, options: StreamBlobOptions, factory: StreamBlobFactory): Promise<Dispatcher.StreamData>;
//# sourceMappingURL=blob-resolver.d.ts.map
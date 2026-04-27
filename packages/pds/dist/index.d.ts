import 'express-async-errors';
import http from 'node:http';
import express from 'express';
import { MethodHandler } from '@atproto/xrpc-server';
import { ServerConfig, ServerSecrets } from './config';
import { AppContext, AppContextOptions } from './context';
import { app } from './lexicons.js';
export * from './lexicons.js';
export { createSecretKeyObject } from './auth-verifier';
export * from './config';
export { AppContext } from './context';
export { Database } from './db';
export { DiskBlobStore } from './disk-blobstore';
export { createServer as createLexiconServer } from './lexicon';
export { httpLogger } from './logger';
export { type CommitDataWithOps, type PreparedWrite } from './repo';
export * as repoPrepare from './repo/prepare';
export { scripts } from './scripts';
export * as sequencer from './sequencer';
/**
 * @deprecated Legacy export for backwards compatibility
 */
export type SkeletonHandler = MethodHandler<void, app.bsky.feed.getFeedSkeleton.$Params, void, app.bsky.feed.getFeedSkeleton.$Output>;
export declare class PDS {
    ctx: AppContext;
    app: express.Application;
    server?: http.Server;
    private terminator?;
    private dbStatsInterval?;
    private sequencerStatsInterval?;
    constructor(opts: {
        ctx: AppContext;
        app: express.Application;
    });
    static create(cfg: ServerConfig, secrets: ServerSecrets, overrides?: Partial<AppContextOptions>): Promise<PDS>;
    start(): Promise<http.Server>;
    destroy(): Promise<void>;
}
export default PDS;
//# sourceMappingURL=index.d.ts.map
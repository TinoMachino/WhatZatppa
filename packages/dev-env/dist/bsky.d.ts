import { AtpAgent } from '@atproto/api';
import * as bsky from '@atproto/bsky';
import { Client } from '@atproto/lex';
import { BskyConfig } from './types';
export * from '@atproto/bsky';
export declare class TestBsky {
    url: string;
    port: number;
    db: bsky.Database;
    server: bsky.BskyAppView;
    dataplane: bsky.DataPlaneServer;
    bsync: bsky.MockBsync;
    sub: bsky.RepoSubscription;
    serverDid: string;
    constructor(url: string, port: number, db: bsky.Database, server: bsky.BskyAppView, dataplane: bsky.DataPlaneServer, bsync: bsky.MockBsync, sub: bsky.RepoSubscription, serverDid: string);
    static create(cfg: BskyConfig): Promise<TestBsky>;
    get ctx(): bsky.AppContext;
    getAgent(): AtpAgent;
    getClient(): Client;
    adminAuth(): string;
    adminAuthHeaders(): {
        authorization: string;
    };
    close(): Promise<void>;
}
//# sourceMappingURL=bsky.d.ts.map
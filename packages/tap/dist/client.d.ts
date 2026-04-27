import { DidDocument } from '@atproto/common';
import { TapChannel, TapHandler, TapWebsocketOptions } from './channel';
import { RepoInfo } from './types';
export interface TapConfig {
    adminPassword?: string;
}
export declare class Tap {
    url: string;
    private adminPassword?;
    private authHeader?;
    private addReposUrl;
    private removeReposUrl;
    constructor(url: string, config?: TapConfig);
    private getHeaders;
    channel(handler: TapHandler, opts?: TapWebsocketOptions): TapChannel;
    addRepos(dids: string[]): Promise<void>;
    removeRepos(dids: string[]): Promise<void>;
    resolveDid(did: string): Promise<DidDocument | null>;
    getRepoInfo(did: string): Promise<RepoInfo>;
}
//# sourceMappingURL=client.d.ts.map
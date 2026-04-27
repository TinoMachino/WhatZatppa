import type { ClientOptions } from 'ws';
import { IdResolver } from '@atproto/identity';
import { AccountEvt, CommitEvt, Event, IdentityEvt, SyncEvt } from '../events';
import { com } from '../lexicons/index.js';
import { EventRunner } from '../runner';
export type FirehoseOptions = ClientOptions & {
    idResolver: IdResolver;
    handleEvent: (evt: Event) => Awaited<void>;
    onError: (err: Error) => void;
    getCursor?: () => Awaited<number | undefined>;
    runner?: EventRunner;
    service?: string;
    subscriptionReconnectDelay?: number;
    unauthenticatedCommits?: boolean;
    unauthenticatedHandles?: boolean;
    filterCollections?: string[];
    excludeIdentity?: boolean;
    excludeAccount?: boolean;
    excludeCommit?: boolean;
    excludeSync?: boolean;
};
export declare class Firehose {
    opts: FirehoseOptions;
    private sub;
    private abortController;
    private destoryDefer;
    private matchCollection;
    constructor(opts: FirehoseOptions);
    start(): any;
    private parseEvt;
    private processEvt;
    destroy(): Promise<void>;
}
export declare const parseCommitAuthenticated: (idResolver: IdResolver, evt: com.atproto.sync.subscribeRepos.Commit, matchCollection?: ((col: string) => boolean) | null, forceKeyRefresh?: boolean) => Promise<CommitEvt[]>;
export declare const parseCommitUnauthenticated: (evt: com.atproto.sync.subscribeRepos.Commit, matchCollection?: ((col: string) => boolean) | null) => Promise<CommitEvt[]>;
export declare const parseSync: (evt: com.atproto.sync.subscribeRepos.Sync) => Promise<SyncEvt | null>;
export declare const parseIdentity: (idResolver: IdResolver, evt: com.atproto.sync.subscribeRepos.Identity, unauthenticated?: boolean) => Promise<IdentityEvt | null>;
export declare const parseAccount: (evt: com.atproto.sync.subscribeRepos.Account) => AccountEvt | undefined;
export declare class FirehoseValidationError extends Error {
    value: unknown;
    constructor(err: unknown, value: unknown);
}
export declare class FirehoseParseError extends Error {
    event: com.atproto.sync.subscribeRepos.$Message;
    constructor(err: unknown, event: com.atproto.sync.subscribeRepos.$Message);
}
export declare class FirehoseSubscriptionError extends Error {
    constructor(err: unknown);
}
export declare class FirehoseHandlerError extends Error {
    event: Event;
    constructor(err: unknown, event: Event);
}
//# sourceMappingURL=index.d.ts.map
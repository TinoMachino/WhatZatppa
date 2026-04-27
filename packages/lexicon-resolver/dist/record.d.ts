import { IdResolver } from '@atproto/identity';
import { AgentConfig, Cid, DidString, FetchHandler, LexMap } from '@atproto/lex';
import { Commit } from '@atproto/repo';
import { AtUri, AtUriString } from '@atproto/syntax';
export { AtUri, IdResolver };
export type { AgentConfig, AtUriString, Cid, Commit, DidString, FetchHandler, LexMap, };
/**
 * Resolve a record from the network.
 */
export type RecordResolver = (uri: AtUri | AtUriString) => Promise<RecordResolution>;
/**
 * Resolve a record from the network, verifying its authenticity.
 */
export type AtprotoRecordResolver = (uri: AtUri | AtUriString, options?: ResolveRecordOptions) => Promise<RecordResolution>;
export type BuildRecordResolverOptions = {
    idResolver?: IdResolver;
    rpc?: Partial<AgentConfig> | FetchHandler;
};
export type ResolveRecordOptions = {
    forceRefresh?: boolean;
};
export type RecordResolution = {
    commit: Commit;
    uri: AtUri;
    cid: Cid;
    record: LexMap;
};
/**
 * Build a record resolver function.
 */
export declare function buildRecordResolver(options?: BuildRecordResolverOptions): AtprotoRecordResolver;
export declare const resolveRecord: AtprotoRecordResolver;
export declare const safeFetch: (input: string | URL | Request, init?: RequestInit | undefined) => Promise<Response>;
export declare class RecordResolutionError extends Error {
    constructor(message?: string, options?: ErrorOptions);
}
//# sourceMappingURL=record.d.ts.map
import Redis from 'ioredis';
import { Client } from '@atproto/lex';
import { OAuthScope } from '@atproto/oauth-provider';
import { CachedGetter, GetterOptions } from '@atproto-labs/simple-store';
declare const PREFIX = "ref:";
type ScopeReference = `${typeof PREFIX}${string}`;
export declare class ScopeReferenceGetter extends CachedGetter<ScopeReference, OAuthScope> {
    protected readonly entryway: Client;
    constructor(entryway: Client, redis?: Redis);
    protected fetchDereferencedScope(ref: ScopeReference, opts?: GetterOptions): Promise<OAuthScope>;
    dereference(scope?: OAuthScope): Promise<undefined | OAuthScope>;
}
export {};
//# sourceMappingURL=scope-reference-getter.d.ts.map
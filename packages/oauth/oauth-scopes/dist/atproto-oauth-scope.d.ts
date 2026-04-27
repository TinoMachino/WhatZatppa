import { ScopeStringFor, isScopeStringFor } from './lib/syntax.js';
export { type ScopeStringFor, isScopeStringFor };
export declare const STATIC_SCOPE_VALUES: readonly ["atproto", "transition:email", "transition:generic", "transition:chat.bsky"];
export type StaticScopeValue = (typeof STATIC_SCOPE_VALUES)[number];
export declare function isStaticScopeValue(value: string): value is StaticScopeValue;
export type AtprotoOauthScope = StaticScopeValue | ScopeStringFor<'account'> | ScopeStringFor<'blob'> | ScopeStringFor<'identity'> | ScopeStringFor<'include'> | ScopeStringFor<'repo'> | ScopeStringFor<'rpc'>;
/**
 * @note This function does not only verify the scope string format (with
 * {@link isScopeStringFor}), but also checks if the provided parameters are
 * valid according to the respective scope syntax definition. This allows
 * excluding scopes that cannot be fully interpreted by the current version of
 * the code.
 */
export declare function isAtprotoOauthScope(value: string): value is AtprotoOauthScope;
export declare function normalizeAtprotoOauthScope(scope: string): string;
export declare function normalizeAtprotoOauthScopeValue(value: string): AtprotoOauthScope | null;
//# sourceMappingURL=atproto-oauth-scope.d.ts.map
import type { DidDocument, InternalStateData, OAuthAuthorizationServerMetadata, OAuthProtectedResourceMetadata, ResolvedHandle, Session } from '@atproto/oauth-client';
import { MMKVSimpleStoreTTL } from './mmkv-simple-store-ttl';
export declare class AuthorizationServerMetadataCache extends MMKVSimpleStoreTTL<OAuthAuthorizationServerMetadata> {
    constructor();
}
export declare class ProtectedResourceMetadataCache extends MMKVSimpleStoreTTL<OAuthProtectedResourceMetadata> {
    constructor();
}
export declare class DpopNonceCache extends MMKVSimpleStoreTTL<string> {
    constructor();
}
export declare class DidCache extends MMKVSimpleStoreTTL<DidDocument> {
    constructor();
}
export declare class HandleCache extends MMKVSimpleStoreTTL<ResolvedHandle> {
    constructor();
}
export declare class StateStore extends MMKVSimpleStoreTTL<InternalStateData> {
    constructor();
}
export declare class SessionStore extends MMKVSimpleStoreTTL<Session> {
    constructor();
}
//# sourceMappingURL=stores.d.ts.map
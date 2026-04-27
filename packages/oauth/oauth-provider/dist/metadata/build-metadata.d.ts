import { Keyset } from '@atproto/jwk';
import { OAuthAuthorizationServerMetadata, OAuthIssuerIdentifier } from '@atproto/oauth-types';
export type CustomMetadata = {
    authorization_details_types_supported?: string[];
    protected_resources?: string[];
};
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc8414#section-2}
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata}
 * @see {@link https://openid.net/specs/openid-connect-prompt-create-1_0.html}
 */
export declare function buildMetadata(issuer: OAuthIssuerIdentifier, keyset: Keyset, customMetadata?: CustomMetadata): OAuthAuthorizationServerMetadata;
//# sourceMappingURL=build-metadata.d.ts.map
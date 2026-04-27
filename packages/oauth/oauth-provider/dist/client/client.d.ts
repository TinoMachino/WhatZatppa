import { JWTClaimVerificationOptions, type JWTPayload, type JWTVerifyOptions, type JWTVerifyResult, type KeyLike, type ResolvedKey, type UnsecuredResult } from 'jose';
import { Jwks, SignedJwt, UnsignedJwt } from '@atproto/jwk';
import { OAuthAuthorizationRequestParameters, OAuthClientCredentials, OAuthClientMetadata, OAuthRedirectUri } from '@atproto/oauth-types';
import { ClientAuth } from './client-auth.js';
import { ClientId } from './client-id.js';
import { ClientInfo } from './client-info.js';
export declare class Client {
    readonly id: ClientId;
    readonly metadata: OAuthClientMetadata;
    readonly jwks: undefined | Jwks;
    readonly info: ClientInfo;
    /**
     * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method}
     */
    static readonly AUTH_METHODS_SUPPORTED: readonly ["none", "private_key_jwt"];
    private readonly keyGetter;
    constructor(id: ClientId, metadata: OAuthClientMetadata, jwks: undefined | Jwks, info: ClientInfo);
    /**
     * @see {@link https://www.rfc-editor.org/rfc/rfc9101.html#name-request-object-2}
     */
    decodeRequestObject(jar: SignedJwt | UnsignedJwt, audience: string): Promise<UnsecuredResult<JWTPayload> | (JWTVerifyResult<JWTPayload> & ResolvedKey<KeyLike>)>;
    protected jwtVerifyUnsecured<PayloadType = JWTPayload>(token: string, { audience, allowMissingAudience, allowMissingIssuer, ...options }?: Omit<JWTClaimVerificationOptions, 'issuer'> & {
        allowMissingIssuer?: boolean;
        allowMissingAudience?: boolean;
    }): Promise<UnsecuredResult<PayloadType>>;
    protected jwtVerify<PayloadType = JWTPayload>(token: string, options?: Omit<JWTVerifyOptions, 'issuer'>): Promise<JWTVerifyResult<PayloadType> & ResolvedKey<KeyLike>>;
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc6749#section-2.3.1}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7523#section-3}
     * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method}
     */
    authenticate(input: OAuthClientCredentials, checks: {
        authorizationServerIdentifier: string;
    }): Promise<ClientAuth>;
    /**
     * Validates the request parameters against the client metadata.
     */
    validateRequest(parameters: Readonly<OAuthAuthorizationRequestParameters>): Readonly<OAuthAuthorizationRequestParameters>;
    get defaultRedirectUri(): OAuthRedirectUri | undefined;
}
export declare function authJwkThumbprint(key: Uint8Array | KeyLike): Promise<string>;
//# sourceMappingURL=client.d.ts.map
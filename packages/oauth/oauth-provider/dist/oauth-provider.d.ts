import type { Redis, RedisOptions } from 'ioredis';
import { Jwks, Keyset } from '@atproto/jwk';
import { LexResolver } from '@atproto/lex-resolver';
import { OAuthAccessToken, OAuthAuthorizationCodeGrantTokenRequest, OAuthAuthorizationRequestJar, OAuthAuthorizationRequestPar, OAuthAuthorizationRequestParameters, OAuthAuthorizationRequestQuery, OAuthAuthorizationServerMetadata, OAuthClientCredentials, OAuthClientMetadata, OAuthParResponse, OAuthRefreshTokenGrantTokenRequest, OAuthTokenIdentification, OAuthTokenRequest, OAuthTokenResponse, OAuthTokenType } from '@atproto/oauth-types';
import { SimpleStore } from '@atproto-labs/simple-store';
import { AccessTokenMode } from './access-token/access-token-mode.js';
import { AccountManager } from './account/account-manager.js';
import { AccountStore, AuthorizedClientData, DeviceAccount } from './account/account-store.js';
import { ClientAuth, ClientAuthLegacy } from './client/client-auth.js';
import { ClientId } from './client/client-id.js';
import { ClientManager, LoopbackMetadataGetter } from './client/client-manager.js';
import { ClientStore } from './client/client-store.js';
import { Client } from './client/client.js';
import { Branding, BrandingInput } from './customization/branding.js';
import { Customization, CustomizationInput } from './customization/customization.js';
import { DeviceInfo, DeviceManager, DeviceManagerOptions } from './device/device-manager.js';
import { DeviceStore } from './device/device-store.js';
import { LexiconManager } from './lexicon/lexicon-manager.js';
import { LexiconStore } from './lexicon/lexicon-store.js';
import { HcaptchaConfig } from './lib/hcaptcha.js';
import { RequestMetadata } from './lib/http/request.js';
import { MultiLangString } from './lib/util/locale.js';
import { CustomMetadata } from './metadata/build-metadata.js';
import { OAuthHooks } from './oauth-hooks.js';
import { DpopProof, OAuthVerifier, OAuthVerifierOptions, VerifyTokenPayloadOptions } from './oauth-verifier.js';
import { ReplayStore } from './replay/replay-store.js';
import { RequestManager } from './request/request-manager.js';
import { RequestStore } from './request/request-store.js';
import { AuthorizationRedirectParameters } from './result/authorization-redirect-parameters.js';
import { AuthorizationResultAuthorizePage } from './result/authorization-result-authorize-page.js';
import { AuthorizationResultRedirect } from './result/authorization-result-redirect.js';
import { ErrorHandler } from './router/error-handler.js';
import { AccessTokenPayload } from './signer/access-token-payload.js';
import { TokenData } from './token/token-data.js';
import { TokenManager } from './token/token-manager.js';
import { TokenStore } from './token/token-store.js';
export { AccessTokenMode, Keyset, LexResolver };
export type { AccessTokenPayload, AuthorizationRedirectParameters, AuthorizationResultAuthorizePage as AuthorizationResultAuthorize, AuthorizationResultRedirect, Branding, BrandingInput, CustomMetadata, Customization, CustomizationInput, ErrorHandler, HcaptchaConfig, MultiLangString, OAuthAuthorizationServerMetadata, VerifyTokenPayloadOptions, };
type OAuthProviderConfig = {
    /**
     * Maximum age a device/account session can be before requiring
     * re-authentication.
     */
    authenticationMaxAge?: number;
    /**
     * Maximum age access & id tokens can be before requiring a refresh.
     */
    tokenMaxAge?: number;
    /**
     * If set to {@link AccessTokenMode.stateless}, the generated access tokens
     * will contain all the necessary information to validate the token without
     * needing to query the database. This is useful for cases where the Resource
     * Server is on a different host/server than the Authorization Server.
     *
     * When set to {@link AccessTokenMode.light}, the access tokens will contain
     * only the necessary information to validate the token, but the token id
     * will need to be queried from the database to retrieve the full token
     * information (scope, audience, etc.)
     *
     * @see {@link AccessTokenMode}
     * @default {AccessTokenMode.stateless}
     */
    accessTokenMode?: AccessTokenMode;
    /**
     * Additional metadata to be included in the discovery document.
     */
    metadata?: CustomMetadata;
    /**
     * A Lexicon resolver instance to use for fetching lexicon schemas.
     */
    lexResolver?: LexResolver;
    /**
     * A custom fetch function that can be used to fetch the client metadata from
     * the internet. By default, the fetch function is a safeFetchWrap() function
     * that protects against SSRF attacks, large responses & known bad domains. If
     * you want to disable all protections, you can provide `globalThis.fetch` as
     * fetch function.
     */
    safeFetch?: typeof globalThis.fetch;
    /**
     * A redis instance to use for replay protection. If not provided, replay
     * protection will use memory storage.
     */
    redis?: Redis | RedisOptions | string;
    /**
     * This will be used as the default store for all the stores. If a store is
     * not provided, this store will be used instead. If the `store` does not
     * implement a specific store, a runtime error will be thrown. Make sure that
     * this store implements all the interfaces not provided in the other
     * `<name>Store` options.
     */
    store?: Partial<AccountStore & ClientStore & DeviceStore & LexiconStore & ReplayStore & RequestStore & TokenStore>;
    accountStore?: AccountStore;
    clientStore?: ClientStore;
    deviceStore?: DeviceStore;
    lexiconStore?: LexiconStore;
    replayStore?: ReplayStore;
    requestStore?: RequestStore;
    tokenStore?: TokenStore;
    /**
     * In order to speed up the client fetching process, you can provide a cache
     * to store HTTP responses.
     *
     * @note the cached entries should automatically expire after a certain time (typically 10 minutes)
     */
    clientJwksCache?: SimpleStore<string, Jwks>;
    /**
     * In order to speed up the client fetching process, you can provide a cache
     * to store HTTP responses.
     *
     * @note the cached entries should automatically expire after a certain time (typically 10 minutes)
     */
    clientMetadataCache?: SimpleStore<string, OAuthClientMetadata>;
    /**
     * In order to enable loopback clients, you can provide a function that
     * returns the client metadata for a given loopback URL. This is useful for
     * development and testing purposes. This function is not called for internet
     * clients.
     *
     * @default is as specified by ATPROTO
     */
    loopbackMetadata?: null | false | LoopbackMetadataGetter;
};
export type OAuthProviderOptions = OAuthProviderConfig & OAuthVerifierOptions & OAuthHooks & DeviceManagerOptions & CustomizationInput;
export declare class OAuthProvider extends OAuthVerifier {
    protected readonly accessTokenMode: AccessTokenMode;
    protected readonly hooks: OAuthHooks;
    readonly metadata: OAuthAuthorizationServerMetadata;
    readonly customization: Customization;
    readonly authenticationMaxAge: number;
    readonly accountManager: AccountManager;
    readonly deviceManager: DeviceManager;
    readonly clientManager: ClientManager;
    readonly lexiconManager: LexiconManager;
    readonly requestManager: RequestManager;
    readonly tokenManager: TokenManager;
    constructor({ authenticationMaxAge, tokenMaxAge, accessTokenMode, metadata, safeFetch, store, // compound store implementation
    lexResolver, accountStore, deviceStore, lexiconStore, tokenStore, requestStore, clientStore, replayStore, clientJwksCache, clientMetadataCache, loopbackMetadata, ...rest }: OAuthProviderOptions);
    get jwks(): Readonly<{
        keys: readonly (Readonly<{
            kty: "RSA";
            n: string;
            e: string;
            alg?: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
            p?: string | undefined;
            q?: string | undefined;
            dp?: string | undefined;
            dq?: string | undefined;
            qi?: string | undefined;
            oth?: {
                d?: string | undefined;
                r?: string | undefined;
                t?: string | undefined;
            }[] | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }> | Readonly<{
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
            alg?: "ES256" | "ES384" | "ES512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }> | Readonly<{
            kty: "EC";
            crv: "secp256k1";
            x: string;
            y: string;
            alg?: "ES256K" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }> | Readonly<{
            kty: "OKP";
            crv: "Ed25519" | "Ed448";
            x: string;
            alg?: "EdDSA" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }>)[];
    }>;
    /**
     * @returns true if the user's consent is required for the requested scopes
     */
    checkConsentRequired(parameters: OAuthAuthorizationRequestParameters, clientData?: AuthorizedClientData): boolean;
    checkLoginRequired(deviceAccount: DeviceAccount): boolean;
    protected authenticateClient(clientCredentials: OAuthClientCredentials, dpopProof: null | DpopProof, options?: {
        allowMissingDpopProof?: boolean;
    }): Promise<{
        client: Client;
        clientAuth: ClientAuth;
    }>;
    decodeJAR(client: Client, input: OAuthAuthorizationRequestJar): Promise<OAuthAuthorizationRequestParameters>;
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc9126}
     */
    pushedAuthorizationRequest(credentials: OAuthClientCredentials, authorizationRequest: OAuthAuthorizationRequestPar, dpopProof: null | DpopProof): Promise<OAuthParResponse>;
    private processAuthorizationRequest;
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-4.1.1}
     */
    authorize(query: OAuthAuthorizationRequestQuery, { deviceId, deviceMetadata }: DeviceInfo): Promise<AuthorizationResultRedirect | AuthorizationResultAuthorizePage>;
    token(clientCredentials: OAuthClientCredentials, clientMetadata: RequestMetadata, request: OAuthTokenRequest, dpopProof: null | DpopProof): Promise<OAuthTokenResponse>;
    protected compareClientAuth(client: Client, clientAuth: ClientAuth, dpopProof: null | DpopProof, initial: {
        parameters: OAuthAuthorizationRequestParameters;
        clientId: ClientId;
        clientAuth: null | ClientAuth | ClientAuthLegacy;
    }): Promise<void>;
    protected authorizationCodeGrant(client: Client, clientAuth: ClientAuth, clientMetadata: RequestMetadata, input: OAuthAuthorizationCodeGrantTokenRequest, dpopProof: null | DpopProof): Promise<OAuthTokenResponse>;
    protected validateCodeGrant(parameters: OAuthAuthorizationRequestParameters, input: OAuthAuthorizationCodeGrantTokenRequest): Promise<void>;
    protected refreshTokenGrant(client: Client, clientAuth: ClientAuth, clientMetadata: RequestMetadata, input: OAuthRefreshTokenGrantTokenRequest, dpopProof: null | DpopProof): Promise<OAuthTokenResponse>;
    protected validateRefreshGrant(client: Client, clientAuth: ClientAuth, data: TokenData): Promise<void>;
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7009#section-2.1 rfc7009}
     */
    revoke(clientCredentials: OAuthClientCredentials, { token }: OAuthTokenIdentification, dpopProof: null | DpopProof): Promise<void>;
    protected decodeToken(tokenType: OAuthTokenType, token: OAuthAccessToken, dpopProof: null | DpopProof): Promise<AccessTokenPayload>;
}
//# sourceMappingURL=oauth-provider.d.ts.map
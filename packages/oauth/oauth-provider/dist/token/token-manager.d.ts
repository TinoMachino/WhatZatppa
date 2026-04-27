import { SignedJwt } from '@atproto/jwk';
import type { Account } from '@atproto/oauth-provider-api';
import { OAuthAccessToken, OAuthAuthorizationRequestParameters, OAuthScope, OAuthTokenResponse, OAuthTokenType } from '@atproto/oauth-types';
import { AccessTokenMode } from '../access-token/access-token-mode.js';
import { ClientAuth } from '../client/client-auth.js';
import { Client } from '../client/client.js';
import { DeviceId } from '../device/device-id.js';
import { LexiconManager } from '../lexicon/lexicon-manager.js';
import { RequestMetadata } from '../lib/http/request.js';
import { OAuthHooks } from '../oauth-hooks.js';
import { Sub } from '../oidc/sub.js';
import { Code } from '../request/code.js';
import { AccessTokenPayload } from '../signer/access-token-payload.js';
import { Signer } from '../signer/signer.js';
import { RefreshToken } from './refresh-token.js';
import { TokenClaims } from './token-claims.js';
import { TokenId } from './token-id.js';
import { TokenInfo, TokenStore } from './token-store.js';
export { AccessTokenMode, Signer };
export type { OAuthHooks, TokenStore };
export declare class TokenManager {
    protected readonly store: TokenStore;
    protected readonly lexiconManager: LexiconManager;
    protected readonly signer: Signer;
    protected readonly hooks: OAuthHooks;
    protected readonly accessTokenMode: AccessTokenMode;
    protected readonly tokenMaxAge: number;
    constructor(store: TokenStore, lexiconManager: LexiconManager, signer: Signer, hooks: OAuthHooks, accessTokenMode: AccessTokenMode, tokenMaxAge?: number);
    protected createTokenExpiry(now?: Date): Date;
    protected createAccessToken(tokenId: TokenId, client: Client, account: Account, parameters: OAuthAuthorizationRequestParameters, issuedAt: Date, expiresAt: Date, scope: OAuthScope): Promise<OAuthAccessToken>;
    createToken(client: Client, clientAuth: ClientAuth, clientMetadata: RequestMetadata, account: Account, deviceId: null | DeviceId, parameters: OAuthAuthorizationRequestParameters, code: Code): Promise<OAuthTokenResponse>;
    protected validateTokenParams(client: Client, clientAuth: ClientAuth, parameters: OAuthAuthorizationRequestParameters): Promise<void>;
    protected buildTokenResponse(tokenType: OAuthTokenType, accessToken: OAuthAccessToken, refreshToken: string | undefined, expiresAt: Date, sub: Sub, scope: string): OAuthTokenResponse;
    rotateToken(client: Client, clientAuth: ClientAuth, clientMetadata: RequestMetadata, tokenInfo: TokenInfo): Promise<OAuthTokenResponse>;
    /**
     * @note The token validity is not guaranteed. The caller must ensure that the
     * token is valid before using the returned token info.
     */
    findToken(token: string): Promise<null | TokenInfo>;
    findByAccessToken(token: SignedJwt): Promise<null | TokenInfo>;
    protected findByRefreshToken(token: RefreshToken): Promise<null | TokenInfo>;
    consumeRefreshToken(token: RefreshToken): Promise<TokenInfo>;
    findByCode(code: Code): Promise<null | TokenInfo>;
    deleteToken(tokenId: TokenId): Promise<void>;
    getTokenInfo(tokenId: TokenId): Promise<null | TokenInfo>;
    /**
     * This method is called to when decoding a token that was encoded in
     * {@link AccessTokenMode.light} mode, using data from the store to fill the
     * data that was omitted in the token itself.
     */
    loadTokenClaims(tokenType: OAuthTokenType, tokenPayload: AccessTokenPayload): Promise<TokenClaims>;
    listAccountTokens(sub: Sub): Promise<TokenInfo[]>;
}
//# sourceMappingURL=token-manager.d.ts.map
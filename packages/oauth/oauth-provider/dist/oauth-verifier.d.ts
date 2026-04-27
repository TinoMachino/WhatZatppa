import type { Redis, RedisOptions } from 'ioredis';
import { Key, Keyset } from '@atproto/jwk';
import { OAuthAccessToken, OAuthIssuerIdentifier, OAuthTokenType } from '@atproto/oauth-types';
import { DpopManager, DpopManagerOptions } from './dpop/dpop-manager.js';
import { DpopNonce } from './dpop/dpop-nonce.js';
import { DpopProof } from './dpop/dpop-proof.js';
import { OAuthHooks } from './oauth-hooks.js';
import { ReplayManager } from './replay/replay-manager.js';
import { ReplayStore } from './replay/replay-store.js';
import { AccessTokenPayload } from './signer/access-token-payload.js';
import { Signer } from './signer/signer.js';
export type DecodeTokenHook = OAuthHooks['onDecodeToken'];
export type OAuthVerifierOptions = DpopManagerOptions & {
    /**
     * The "issuer" identifier of the OAuth provider, this is the base URL of the
     * OAuth provider.
     */
    issuer: URL | string;
    /**
     * The keyset used to sign access tokens.
     */
    keyset: Keyset | Iterable<Key | undefined | null | false>;
    /**
     * A redis instance to use for replay protection. If not provided, replay
     * protection will use memory storage.
     */
    redis?: Redis | RedisOptions | string;
    replayStore?: ReplayStore;
    onDecodeToken?: DecodeTokenHook;
};
export type VerifyTokenPayloadOptions = {
    /** One of these audience must be included in the token audience(s) */
    audience?: [string, ...string[]];
    /** One of these scope must be included in the token scope(s) */
    scope?: [string, ...string[]];
};
export { DpopNonce, Key, Keyset };
export type { AccessTokenPayload, DpopProof, OAuthTokenType, RedisOptions, ReplayStore, };
export declare class OAuthVerifier {
    private readonly onDecodeToken?;
    readonly issuer: OAuthIssuerIdentifier;
    readonly keyset: Keyset;
    readonly dpopManager: DpopManager;
    readonly replayManager: ReplayManager;
    readonly signer: Signer;
    constructor({ redis, issuer, keyset, replayStore, onDecodeToken, ...rest }: OAuthVerifierOptions);
    nextDpopNonce(): string | undefined;
    checkDpopProof(httpMethod: string, httpUrl: Readonly<URL>, httpHeaders: Record<string, undefined | string | string[]>, accessToken?: string): Promise<null | DpopProof>;
    protected decodeToken(tokenType: OAuthTokenType, token: OAuthAccessToken, dpopProof: null | DpopProof): Promise<AccessTokenPayload>;
    /**
     * @throws {WWWAuthenticateError}
     * @throws {InvalidTokenError}
     */
    authenticateRequest(httpMethod: string, httpUrl: Readonly<URL>, httpHeaders: Record<string, undefined | string | string[]>, verifyOptions?: VerifyTokenPayloadOptions): Promise<AccessTokenPayload>;
    protected verifyTokenPayload(tokenType: OAuthTokenType, tokenPayload: AccessTokenPayload, options?: VerifyTokenPayloadOptions): void;
}
//# sourceMappingURL=oauth-verifier.d.ts.map
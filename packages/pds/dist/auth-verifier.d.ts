import { KeyObject } from 'node:crypto';
import { IncomingMessage } from 'node:http';
import * as jose from 'jose';
import { IdResolver } from '@atproto/identity';
import { AtIdentifierString, DidString } from '@atproto/lex';
import { OAuthVerifier } from '@atproto/oauth-provider';
import { ScopePermissions } from '@atproto/oauth-scopes';
import { Awaitable, MethodAuthContext, MethodAuthVerifier, Params } from '@atproto/xrpc-server';
import { AccountManager } from './account-manager/account-manager';
import { ActorAccount } from './account-manager/helpers/account';
import { AccessOutput, AdminTokenOutput, ModServiceOutput, OAuthOutput, RefreshOutput, UnauthenticatedOutput, UserServiceAuthOutput } from './auth-output';
import { AuthScope } from './auth-scope';
import { WithRequired } from './util/types';
export type VerifiedOptions = {
    checkTakedown?: boolean;
    checkDeactivated?: boolean;
};
export type ScopedOptions<S extends AuthScope = AuthScope> = {
    scopes?: readonly S[];
};
export type ExtraScopedOptions<S extends AuthScope = AuthScope> = {
    additional?: readonly S[];
};
export type AuthorizedOptions<P extends Params = Params> = {
    authorize: (permissions: ScopePermissions, ctx: MethodAuthContext<P>) => Awaitable<void>;
};
export type AuthVerifierOpts = {
    publicUrl: string;
    jwtKey: KeyObject;
    adminPass: string;
    dids: {
        pds: string;
        entryway?: string;
        modService?: string;
    };
};
export type VerifyBearerJwtOptions<S extends AuthScope = AuthScope> = WithRequired<Omit<jose.JWTVerifyOptions, 'scopes'> & {
    scopes: readonly S[];
}, 'audience' | 'typ'>;
export type VerifyBearerJwtResult<S extends AuthScope = AuthScope> = {
    sub: DidString;
    aud: string;
    jti: string | undefined;
    scope: S;
};
export declare class AuthVerifier {
    accountManager: AccountManager;
    idResolver: IdResolver;
    oauthVerifier: OAuthVerifier;
    private _publicUrl;
    private _jwtKey;
    private _adminPass;
    dids: AuthVerifierOpts['dids'];
    constructor(accountManager: AccountManager, idResolver: IdResolver, oauthVerifier: OAuthVerifier, opts: AuthVerifierOpts);
    unauthenticated: MethodAuthVerifier<UnauthenticatedOutput>;
    adminToken: MethodAuthVerifier<AdminTokenOutput>;
    modService: MethodAuthVerifier<ModServiceOutput>;
    moderator: MethodAuthVerifier<AdminTokenOutput | ModServiceOutput>;
    protected access<S extends AuthScope>(options: VerifiedOptions & Required<ScopedOptions<S>>): MethodAuthVerifier<AccessOutput<S>>;
    refresh(options?: {
        allowExpired?: boolean;
    }): MethodAuthVerifier<RefreshOutput>;
    authorization<P extends Params>({ scopes, additional, ...options }: VerifiedOptions & ScopedOptions & ExtraScopedOptions & AuthorizedOptions<P>): MethodAuthVerifier<AccessOutput | OAuthOutput, P>;
    authorizationOrAdminTokenOptional<P extends Params>(opts: VerifiedOptions & ExtraScopedOptions & AuthorizedOptions<P>): MethodAuthVerifier<OAuthOutput | AccessOutput | AdminTokenOutput | UnauthenticatedOutput, P>;
    userServiceAuth: MethodAuthVerifier<UserServiceAuthOutput>;
    userServiceAuthOptional: MethodAuthVerifier<UserServiceAuthOutput | UnauthenticatedOutput>;
    authorizationOrUserServiceAuth<P extends Params>(options: VerifiedOptions & ScopedOptions & ExtraScopedOptions & AuthorizedOptions<P>): MethodAuthVerifier<UserServiceAuthOutput | OAuthOutput | AccessOutput, P>;
    protected oauth<P extends Params>({ authorize, ...verifyStatusOptions }: VerifiedOptions & AuthorizedOptions<P>): MethodAuthVerifier<OAuthOutput, P>;
    protected verifyStatus(did: DidString, options: VerifiedOptions): Promise<void>;
    /**
     * Finds an account by its handle or DID, returning possibly deactivated or
     * taken down accounts (unless `options.checkDeactivated` or
     * `options.checkTakedown` are set to true, respectively).
     */
    findAccount(handleOrDid: AtIdentifierString, options: VerifiedOptions): Promise<ActorAccount>;
    /**
     * Wraps {@link jose.jwtVerify} into a function that also validates the token
     * payload's type and wraps errors into {@link InvalidRequestError}.
     */
    protected verifyBearerJwt<S extends AuthScope = AuthScope>(req: IncomingMessage, { scopes, ...options }: VerifyBearerJwtOptions<S>): Promise<VerifyBearerJwtResult<S>>;
    protected verifyServiceJwt(req: IncomingMessage, opts?: {
        iss?: string[];
    }): Promise<{
        iss: DidString | `${DidString}#${string}`;
        aud: string;
        exp: number;
        lxm?: string;
        jti?: string;
    }>;
}
export declare function isUserOrAdmin(auth: AccessOutput | OAuthOutput | AdminTokenOutput | UnauthenticatedOutput, did: string): boolean;
export declare const createSecretKeyObject: (secret: string) => KeyObject;
export declare const createPublicKeyObject: (publicKeyHex: string) => KeyObject;
//# sourceMappingURL=auth-verifier.d.ts.map
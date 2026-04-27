import type { ServerResponse } from 'node:http';
import { OAuthAuthorizationRequestParameters, OAuthResponseMode } from '@atproto/oauth-types';
import { WriteFormRedirectOptions } from '../../lib/write-form-redirect.js';
import { AuthorizationRedirectParameters } from '../../result/authorization-redirect-parameters.js';
import { AuthorizationResultRedirect } from '../../result/authorization-result-redirect.js';
export declare const SUCCESS_REDIRECT_KEYS: readonly ["code", "id_token", "access_token", "expires_in", "token_type"];
export declare const ERROR_REDIRECT_KEYS: readonly ["error", "error_description", "error_uri"];
export type OAuthRedirectQueryParameter = 'iss' | 'state' | (typeof SUCCESS_REDIRECT_KEYS)[number] | (typeof ERROR_REDIRECT_KEYS)[number];
export declare function buildRedirectUri(parameters: OAuthAuthorizationRequestParameters): string;
export declare function buildRedirectMode(parameters: OAuthAuthorizationRequestParameters): OAuthResponseMode;
export declare function buildRedirectParams(issuer: string, parameters: OAuthAuthorizationRequestParameters, redirect: AuthorizationRedirectParameters): [OAuthRedirectQueryParameter, string][];
export declare function sendAuthorizationResultRedirect(res: ServerResponse, result: AuthorizationResultRedirect, options?: WriteFormRedirectOptions): void;
export type OAuthRedirectOptions = {
    mode: OAuthResponseMode;
    redirectUri: string;
    params: Iterable<[string, string]>;
};
export declare function sendRedirect(res: ServerResponse, redirect: OAuthRedirectOptions, options?: WriteFormRedirectOptions): void;
//# sourceMappingURL=send-redirect.d.ts.map
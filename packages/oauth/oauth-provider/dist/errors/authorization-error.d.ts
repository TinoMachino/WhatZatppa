import { OAuthAuthorizationRequestParameters } from '@atproto/oauth-types';
import { AuthorizationResponseError } from '../types/authorization-response-error.js';
import { OAuthError } from './oauth-error.js';
export type { AuthorizationResponseError, OAuthAuthorizationRequestParameters };
export declare class AuthorizationError extends OAuthError {
    readonly parameters: OAuthAuthorizationRequestParameters;
    constructor(parameters: OAuthAuthorizationRequestParameters, error_description: string, error?: AuthorizationResponseError, cause?: unknown);
    static from(parameters: OAuthAuthorizationRequestParameters, cause: unknown): AuthorizationError;
}
//# sourceMappingURL=authorization-error.d.ts.map
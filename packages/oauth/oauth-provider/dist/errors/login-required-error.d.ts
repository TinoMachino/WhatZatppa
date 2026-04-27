import { OAuthAuthorizationRequestParameters } from '@atproto/oauth-types';
import { AuthorizationError } from './authorization-error.js';
export declare class LoginRequiredError extends AuthorizationError {
    constructor(parameters: OAuthAuthorizationRequestParameters, error_description?: string, cause?: unknown);
}
//# sourceMappingURL=login-required-error.d.ts.map
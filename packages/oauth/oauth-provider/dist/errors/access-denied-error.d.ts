import { OAuthAuthorizationRequestParameters } from '@atproto/oauth-types';
import { AuthorizationError } from './authorization-error.js';
export declare class AccessDeniedError extends AuthorizationError {
    constructor(parameters: OAuthAuthorizationRequestParameters, error_description?: string, cause?: unknown);
}
//# sourceMappingURL=access-denied-error.d.ts.map
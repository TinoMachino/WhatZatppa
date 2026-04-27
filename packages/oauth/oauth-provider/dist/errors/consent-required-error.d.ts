import { OAuthAuthorizationRequestParameters } from '@atproto/oauth-types';
import { AuthorizationError } from './authorization-error.js';
export declare class ConsentRequiredError extends AuthorizationError {
    constructor(parameters: OAuthAuthorizationRequestParameters, error_description?: string, cause?: unknown);
}
//# sourceMappingURL=consent-required-error.d.ts.map
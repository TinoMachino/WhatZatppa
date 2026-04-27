"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationResponseErrorSchema = void 0;
exports.isAuthorizationResponseError = isAuthorizationResponseError;
const zod_1 = require("zod");
const oauth_types_1 = require("@atproto/oauth-types");
exports.authorizationResponseErrorSchema = zod_1.z.union([
    oauth_types_1.oauthAuthorizationResponseErrorSchema,
    // OIDC authentication error response are not part of the ATproto flavoured
    // OAuth but we allow them because they provide better feedback to the client
    // (in particular when SSO is used).
    oauth_types_1.oidcAuthorizationResponseErrorSchema,
    // This error is defined by rfc9396 (not part of the OAuth 2.1 or OIDC). But
    // since, in ATproto flavoured OAuth, client registration is a dynamic part of
    // the authorization process, we allow it.
    zod_1.z.literal('invalid_authorization_details'),
]);
function isAuthorizationResponseError(value) {
    return exports.authorizationResponseErrorSchema.safeParse(value).success;
}
//# sourceMappingURL=authorization-response-error.js.map
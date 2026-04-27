"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthError = exports.InvalidRequestError = exports.InvalidCredentialsError = exports.Client = exports.AuthorizationError = exports.AccessDeniedError = void 0;
const client_js_1 = require("./client/client.js");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_js_1.Client; } });
const access_denied_error_js_1 = require("./errors/access-denied-error.js");
Object.defineProperty(exports, "AccessDeniedError", { enumerable: true, get: function () { return access_denied_error_js_1.AccessDeniedError; } });
const authorization_error_js_1 = require("./errors/authorization-error.js");
Object.defineProperty(exports, "AuthorizationError", { enumerable: true, get: function () { return authorization_error_js_1.AuthorizationError; } });
const invalid_credentials_error_js_1 = require("./errors/invalid-credentials-error.js");
Object.defineProperty(exports, "InvalidCredentialsError", { enumerable: true, get: function () { return invalid_credentials_error_js_1.InvalidCredentialsError; } });
const invalid_request_error_js_1 = require("./errors/invalid-request-error.js");
Object.defineProperty(exports, "InvalidRequestError", { enumerable: true, get: function () { return invalid_request_error_js_1.InvalidRequestError; } });
const oauth_error_js_1 = require("./errors/oauth-error.js");
Object.defineProperty(exports, "OAuthError", { enumerable: true, get: function () { return oauth_error_js_1.OAuthError; } });
//# sourceMappingURL=oauth-hooks.js.map
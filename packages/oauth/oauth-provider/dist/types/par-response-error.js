"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parResponseErrorSchema = void 0;
exports.isPARResponseError = isPARResponseError;
const zod_1 = require("zod");
const authorization_response_error_js_1 = require("./authorization-response-error.js");
// https://datatracker.ietf.org/doc/html/rfc9126#section-2.3-1
// > Since initial processing of the pushed authorization request does not
// > involve resource owner interaction, error codes related to user
// > interaction, such as "access_denied", are never returned.
exports.parResponseErrorSchema = zod_1.z.intersection(authorization_response_error_js_1.authorizationResponseErrorSchema, zod_1.z.enum([
    'invalid_request',
    'unauthorized_client',
    'unsupported_response_type',
    'invalid_scope',
    'server_error',
    'temporarily_unavailable',
]));
function isPARResponseError(value) {
    return exports.parResponseErrorSchema.safeParse(value).success;
}
//# sourceMappingURL=par-response-error.js.map
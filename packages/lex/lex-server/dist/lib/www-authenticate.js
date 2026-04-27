"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWWWAuthenticateHeader = formatWWWAuthenticateHeader;
/**
 * Formats a WWWAuthenticate object into an HTTP header string.
 *
 * Converts the structured authentication scheme and parameter data into
 * the proper WWW-Authenticate header format per RFC 7235.
 *
 * @param wwwAuthenticate - The authentication schemes and parameters
 * @returns Formatted header string ready for use in HTTP responses
 *
 * @example
 * ```typescript
 * const header = formatWWWAuthenticateHeader({
 *   Bearer: {
 *     realm: 'api.example.com',
 *     error: 'MissingToken'
 *   }
 * })
 * // Returns: 'Bearer realm="api.example.com", error="MissingToken"'
 * ```
 *
 * @example Empty or undefined values
 * ```typescript
 * const header = formatWWWAuthenticateHeader({
 *   Bearer: { realm: 'api', error: undefined }
 * })
 * // Returns: 'Bearer realm="api"' (undefined values are omitted)
 * ```
 */
function formatWWWAuthenticateHeader(wwwAuthenticate) {
    const challenges = [];
    for (const [scheme, params] of Object.entries(wwwAuthenticate)) {
        if (params == null)
            continue;
        if (typeof params === 'string') {
            challenges.push(formatWWWAuthenticateChallenge(scheme, params));
        }
        else if (Array.isArray(params)) {
            for (const p of params) {
                challenges.push(formatWWWAuthenticateChallenge(scheme, p));
            }
        }
        else {
            challenges.push(formatWWWAuthenticateChallenge(scheme, params));
        }
    }
    return challenges.join(', ');
}
function formatWWWAuthenticateChallenge(scheme, params) {
    const paramsStr = typeof params === 'string' ? params : formatWWWAuthenticateParams(params);
    return paramsStr?.length ? `${scheme} ${paramsStr}` : scheme;
}
function formatWWWAuthenticateParams(params) {
    const parts = [];
    for (const [name, val] of Object.entries(params)) {
        if (val != null)
            parts.push(`${name}=${JSON.stringify(val)}`);
    }
    return parts.join(', ');
}
//# sourceMappingURL=www-authenticate.js.map
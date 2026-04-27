"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendVary = appendVary;
/**
 * Set or appends a value to the `Vary` header in the response, only if the
 * value is not already present.
 */
function appendVary(res, value) {
    if (!varyContains(res, value.toLowerCase())) {
        res.appendHeader('Vary', value);
    }
}
function varyContains(res, searchValue) {
    const headerValue = res.getHeader('Vary');
    switch (typeof headerValue) {
        case 'string':
            return varyStringContains(headerValue, searchValue);
        case 'object':
            // headerValue is a string[] here
            return headerValue.some((h) => varyStringContains(h, searchValue));
        default:
            return false;
    }
}
function varyStringContains(headerValue, searchValue) {
    return headerValue
        .split(',')
        .map((v) => v.trim().toLowerCase())
        .some((v) => v === searchValue || v === `*`);
}
//# sourceMappingURL=http.js.map
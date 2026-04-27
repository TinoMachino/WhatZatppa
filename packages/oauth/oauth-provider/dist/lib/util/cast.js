"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asArray = asArray;
exports.asURL = asURL;
exports.ifURL = ifURL;
function asArray(value) {
    if (value == null)
        return [];
    return Array.isArray(value) ? value : [value];
}
function asURL(value) {
    return new URL(value);
}
function ifURL(value) {
    try {
        return asURL(value);
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=cast.js.map
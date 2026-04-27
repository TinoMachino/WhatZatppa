"use strict";
// @TODO Refactor in shared location for use with other @atproto packages
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMime = isMime;
exports.isAccept = isAccept;
exports.matchesAccept = matchesAccept;
exports.matchesAnyAccept = matchesAnyAccept;
function isStringSlashString(value) {
    const slashIndex = value.indexOf('/');
    if (slashIndex === -1)
        return false; // Missing slash
    if (slashIndex === 0)
        return false; // No leading part before the slash
    if (slashIndex === value.length - 1)
        return false; // No trailing part after the slash
    if (value.includes('/', slashIndex + 1))
        return false; // More than one slash
    if (value.includes(' '))
        return false; // Spaces are not allowed
    return true;
}
function isMime(value) {
    return isStringSlashString(value) && !value.includes('*');
}
function isAccept(value) {
    if (typeof value !== 'string')
        return false;
    if (value === '*/*')
        return true; // Fast path for the most common case
    if (!isStringSlashString(value))
        return false;
    return !value.includes('*') || value.endsWith('/*');
}
/**
 * @note "unsafe" in that it does not check if either {@link accept} or
 * {@link mime} are actually valid values (and could, therefore, lead to false
 * positives if forged values are used).
 */
function matchesAcceptUnsafe(accept, mime) {
    if (accept === '*/*') {
        return true;
    }
    if (accept.endsWith('/*')) {
        return mime.startsWith(accept.slice(0, -1));
    }
    return accept === mime;
}
function matchesAccept(accept, mime) {
    return isMime(mime) && matchesAcceptUnsafe(accept, mime);
}
/**
 * @note "unsafe" in that it does not check if either {@link accept} or
 * {@link mime} are actually valid values (and could, therefore, lead to false
 * positives if forged values are used).
 */
function matchesAnyAcceptUnsafe(acceptable, mime) {
    for (const accept of acceptable) {
        if (matchesAcceptUnsafe(accept, mime)) {
            return true;
        }
    }
    return false;
}
function matchesAnyAccept(acceptable, mime) {
    return isMime(mime) && matchesAnyAcceptUnsafe(acceptable, mime);
}
//# sourceMappingURL=mime.js.map
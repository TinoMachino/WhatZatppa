"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assureAdminAuth = exports.parseAdminAuthHeader = exports.formatAdminAuthHeader = void 0;
exports.isCausedBySignal = isCausedBySignal;
const formatAdminAuthHeader = (password) => {
    return 'Basic ' + Buffer.from(`admin:${password}`).toString('base64');
};
exports.formatAdminAuthHeader = formatAdminAuthHeader;
const parseAdminAuthHeader = (header) => {
    const noPrefix = header.startsWith('Basic ') ? header.slice(6) : header;
    const [username, password] = Buffer.from(noPrefix, 'base64')
        .toString()
        .split(':');
    if (username !== 'admin') {
        throw new Error("Unexpected username in admin headers. Expected 'admin'");
    }
    return password;
};
exports.parseAdminAuthHeader = parseAdminAuthHeader;
const assureAdminAuth = (expectedPassword, header) => {
    const headerPassword = (0, exports.parseAdminAuthHeader)(header);
    const passEqual = timingSafeEqual(headerPassword, expectedPassword);
    if (!passEqual) {
        throw new Error('Invalid admin password');
    }
};
exports.assureAdminAuth = assureAdminAuth;
const timingSafeEqual = (a, b) => {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
        // Compare against self to maintain constant time even with length mismatch
        Buffer.from(a).compare(Buffer.from(a));
        return false;
    }
    return bufA.compare(bufB) === 0;
};
function isCausedBySignal(err, signal) {
    if (!signal.aborted)
        return false;
    if (signal.reason == null)
        return false; // Ignore nullish reasons
    return (err === signal.reason ||
        (err instanceof Error && err.cause === signal.reason));
}
//# sourceMappingURL=util.js.map
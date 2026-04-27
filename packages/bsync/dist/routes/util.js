"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNamespace = exports.isValidAtUri = exports.isValidDid = exports.combineSignals = exports.validCursor = void 0;
const connect_1 = require("@connectrpc/connect");
const syntax_1 = require("@atproto/syntax");
const validCursor = (cursor) => {
    if (cursor === '')
        return null;
    const int = parseInt(cursor, 10);
    if (isNaN(int) || int < 0) {
        throw new connect_1.ConnectError('invalid cursor', connect_1.Code.InvalidArgument);
    }
    return int;
};
exports.validCursor = validCursor;
const combineSignals = (a, b) => {
    const controller = new AbortController();
    for (const signal of [a, b]) {
        if (signal.aborted) {
            controller.abort();
            return signal;
        }
        signal.addEventListener('abort', () => controller.abort(signal.reason), {
            // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68625
            signal: controller.signal,
        });
    }
    return controller.signal;
};
exports.combineSignals = combineSignals;
const isValidDid = (did) => {
    try {
        (0, syntax_1.ensureValidDid)(did);
        return true;
    }
    catch (err) {
        if (err instanceof syntax_1.InvalidDidError) {
            return false;
        }
        throw err;
    }
};
exports.isValidDid = isValidDid;
const isValidAtUri = (uri) => {
    try {
        (0, syntax_1.ensureValidAtUri)(uri);
        return true;
    }
    catch {
        return false;
    }
};
exports.isValidAtUri = isValidAtUri;
const validateNamespace = (namespace) => {
    const parts = namespace.split('#');
    if (parts.length !== 1 && parts.length !== 2) {
        throw new Error('namespace must be in the format "nsid[#fragment]"');
    }
    const [nsid, fragment] = parts;
    (0, syntax_1.ensureValidNsid)(nsid);
    if (fragment && !/^[a-zA-Z][a-zA-Z0-9]*$/.test(fragment)) {
        throw new Error('namespace fragment must be a valid identifier');
    }
};
exports.validateNamespace = validateNamespace;
//# sourceMappingURL=util.js.map
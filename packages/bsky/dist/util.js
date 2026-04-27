"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLabelerHeader = exports.defaultLabelerHeader = exports.parseLabelerHeader = void 0;
const structured_headers_1 = require("structured-headers");
const syntax_1 = require("@atproto/syntax");
const parseLabelerHeader = (header) => {
    // An empty header is valid, so we shouldn't return null
    // https://datatracker.ietf.org/doc/html/rfc7230#section-3.2
    if (header === undefined)
        return null;
    const labelerDids = new Set();
    const redactDids = new Set();
    const parsed = (0, structured_headers_1.parseList)(header);
    for (const item of parsed) {
        const did = item[0].toString();
        if (!(0, syntax_1.isValidDid)(did)) {
            return null;
        }
        labelerDids.add(did);
        const redact = item[1].get('redact')?.valueOf();
        if (redact === true) {
            redactDids.add(did);
        }
    }
    return {
        dids: [...labelerDids],
        redact: redactDids,
    };
};
exports.parseLabelerHeader = parseLabelerHeader;
const defaultLabelerHeader = (dids) => {
    return {
        dids,
        redact: new Set(dids),
    };
};
exports.defaultLabelerHeader = defaultLabelerHeader;
const formatLabelerHeader = (parsed) => {
    const parts = parsed.dids.map((did) => parsed.redact.has(did) ? `${did};redact` : did);
    return parts.join(',');
};
exports.formatLabelerHeader = formatLabelerHeader;
//# sourceMappingURL=util.js.map
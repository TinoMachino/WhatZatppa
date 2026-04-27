"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMaxUtf8Length = validateMaxUtf8Length;
const lex_data_1 = require("@atproto/lex-data");
function validateMaxUtf8Length(str, maxBytes) {
    if (maxBytes === undefined)
        return true;
    if (maxBytes === Infinity)
        return true;
    if (maxBytes === 0)
        return str.length === 0;
    // Optimization: avoid computing UTF-8 length when string is definitely
    // smaller or larger than maxBytes
    if (str.length * 3 <= maxBytes)
        return true;
    if (str.length > maxBytes * 3)
        return false;
    return (0, lex_data_1.utf8Len)(str) <= maxBytes;
}
//# sourceMappingURL=validate-max-utf8-length.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cborDecodeMulti = cborDecodeMulti;
const lex_cbor_1 = require("@atproto/lex-cbor");
/**
 * @deprecated Use {@link decodeAll} from `@atproto/lex-cbor` instead.
 */
function cborDecodeMulti(encoded) {
    return Array.from((0, lex_cbor_1.decodeAll)(encoded));
}
//# sourceMappingURL=ipld-multi.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonStringToLex = exports.jsonToLex = exports.stringifyLex = exports.lexToJson = exports.ipldToLex = exports.lexToIpld = void 0;
const cid_1 = require("multiformats/cid");
const common_web_1 = require("@atproto/common-web");
const lex_data_1 = require("@atproto/lex-data");
const lex_json_1 = require("@atproto/lex-json");
const blob_refs_1 = require("./blob-refs");
/**
 * Lenient conversion defaults for {@link jsonToLex} and {@link lexToJson}.
 *
 * @internal
 */
const IPLD_TRANSFORM_OPTS = Object.freeze({
    allowNonSafeIntegers: true,
    maxContainerLength: Infinity,
    maxNestedLevels: lex_data_1.MAX_PAYLOAD_NESTED_LEVELS,
    maxObjectKeyLen: Infinity,
});
/**
 * @deprecated Use `LexValue` from `@atproto/lex-data` instead (which doesn't need conversion to IPLD).
 */
const lexToIpld = (input) => {
    return (0, lex_json_1.iterativeTransform)(input, lexObjectToIpld, IPLD_TRANSFORM_OPTS);
};
exports.lexToIpld = lexToIpld;
/**
 * @internal
 */
function lexObjectToIpld(value) {
    if (value instanceof blob_refs_1.BlobRef) {
        // convert blobs, leaving the original encoding so that we don't change CIDs on re-encode
        return value.original;
    }
    if (cid_1.CID.asCID(value) || value instanceof Uint8Array) {
        return value;
    }
}
/**
 * @deprecated Use `LexValue` from `@atproto/lex-data` instead instead (which doesn't need conversion to IPLD).
 */
const ipldToLex = (input) => {
    return (0, lex_json_1.iterativeTransform)(input, ipldObjectToLex, IPLD_TRANSFORM_OPTS);
};
exports.ipldToLex = ipldToLex;
/** @internal */
function ipldObjectToLex(value) {
    // convert blobs, using hints to avoid expensive is() check
    if ('$type' in value && value.$type !== undefined) {
        if (common_web_1.check.is(value, blob_refs_1.typedJsonBlobRef)) {
            return new blob_refs_1.BlobRef(value.ref, value.mimeType, value.size, value);
        }
    }
    else if ('cid' in value && 'mimeType' in value) {
        if (common_web_1.check.is(value, blob_refs_1.untypedJsonBlobRef)) {
            return new blob_refs_1.BlobRef(cid_1.CID.parse(value.cid), value.mimeType, -1, value);
        }
    }
    if (cid_1.CID.asCID(value) || value instanceof Uint8Array) {
        return value;
    }
}
/**
 * @deprecated use {@link lexToJson} from `@atproto/lex-json` instead
 */
const lexToJson = (val) => {
    return (0, common_web_1.ipldToJson)((0, exports.lexToIpld)(val));
};
exports.lexToJson = lexToJson;
/**
 * @deprecated use {@link lexStringify} from `@atproto/lex-json` instead
 */
const stringifyLex = (val) => {
    return (0, lex_json_1.lexStringify)((0, exports.lexToIpld)(val), { strict: false });
};
exports.stringifyLex = stringifyLex;
/**
 * @deprecated use {@link jsonToLex} from `@atproto/lex-json` instead
 */
const jsonToLexLegacy = (val) => {
    return (0, exports.ipldToLex)((0, common_web_1.jsonToIpld)(val));
};
exports.jsonToLex = jsonToLexLegacy;
/**
 * @deprecated use {@link lexParse} from `@atproto/lex-json` instead
 */
const jsonStringToLex = (val) => {
    return (0, exports.ipldToLex)((0, lex_json_1.lexParse)(val, { strict: false }));
};
exports.jsonStringToLex = jsonStringToLex;
//# sourceMappingURL=serialize.js.map
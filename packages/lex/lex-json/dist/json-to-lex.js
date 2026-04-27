"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToLex = jsonToLex;
const lex_data_1 = require("@atproto/lex-data");
const iterative_transform_js_1 = require("./iterative-transform.js");
const special_objects_js_1 = require("./special-objects.js");
/**
 * Converts a parsed JSON representation of Lexicon value ({@link JsonValue})
 * into a {@link LexValue}. This is done by decoding AT Protocol special
 * objects, and enforcing AT protocol data model constraints:
 *
 * - `{$link: string}` objects are converted to `Cid` objects
 * - `{$bytes: string}` objects are converted to `Uint8Array` instances
 * - number should be safe integers (unless `allowNonSafeIntegers` option is
 *   enabled)
 * - nesting levels, container lengths, and object key lengths are limited to
 *   prevent excessively large structures (limits can be configured with
 *   options)
 *
 * @throws {TypeError} If the input contains invalid Lex values, or contains too
 * deeply nested structures
 *
 * @note For parsing JSON strings directly, or JSON string in buffer form, use
 * {@link lexParse} or {@link lexParseJsonBytes} instead.
 *
 * @note This function is typically used at the boundary of JSON parsing, where
 * we need to convert user data (e.g `com.atproto.repo.createRecord` API calls)
 * into {@link LexValue} for processing. Because "write paths" are a common
 * entry point for untrusted data, these should explicitly enforce strict
 * validation. Because "read" path are most common,
 * {@link JsonToLexOptions.strict strict-mode} is disabled (`false`) by default.
 *
 * @note `JSON.parse` will typically allow deep nesting levels. This can be
 * problematic when the parsed structures is re-serialized with
 * `JSON.stringify`, which has a call stack limit that can be exceeded with
 * deeply nested structures. To mitigate this, `jsonToLex` enforces a default
 * maximum nesting level (5,000) and will throw if this is exceeded. This,
 * combined with the custom {@link lexStringify} implementation that handles
 * deep nesting, allows to:
 *
 * 1) Throw an error during parsing of excessively nested structures, which can
 *    be a sign of malformed input or potential attack.
 * 2) Ensure that any data that did not cause an error during parsing can be
 *    safely re-serialized without hitting call stack limits (see
 *    {@link lexToJson}).
 *
 * @example
 * ```typescript
 * import { jsonToLex } from '@atproto/lex'
 *
 * // Convert parsed JSON to Lex values
 * const lex = jsonToLex({
 *   ref: { $link: 'bafyrei...' },  // Converted to Cid
 *   data: { $bytes: 'SGVsbG8sIHdvcmxkIQ==' }  // Converted to Uint8Array
 * })
 * ```
 */
function jsonToLex(input, { strict = false, allowNonSafeIntegers = !strict, maxNestedLevels = strict
    ? lex_data_1.MAX_CBOR_NESTED_LEVELS
    : lex_data_1.MAX_PAYLOAD_NESTED_LEVELS, maxContainerLength = strict ? lex_data_1.MAX_CBOR_CONTAINER_LEN : Infinity, maxObjectKeyLen = strict ? lex_data_1.MAX_CBOR_OBJECT_KEY_LEN : Infinity, } = {}) {
    const options = {
        strict,
        allowNonSafeIntegers,
        maxNestedLevels,
        maxContainerLength,
        maxObjectKeyLen,
    };
    // See ./json-to-lex.bench.ts for performance comparison between recursive and
    // iterative implementations of this function. The performance difference is
    // minimal, so we won't use a hybrid approach here.
    return (0, iterative_transform_js_1.iterativeTransform)(input, special_objects_js_1.parseSpecialJsonObject, options);
}
//# sourceMappingURL=json-to-lex.js.map
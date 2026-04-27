"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownObject = exports.lexMap = exports.LexMapSchema = void 0;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
const lex_value_js_1 = require("./lex-value.js");
const propertyValueSchema = /*#__PURE__*/ (0, lex_value_js_1.lexValue)();
/**
 * AT Protocol lexicon schema definitions with "type": "unknown" are represented
 * as plain objects with string keys and values that are valid AT Protocol data
 * types (string, integer, boolean, null, bytes, cid, array, or object). This
 * type alias corresponds to the expected structure of such "unknown" schema
 * values.
 */
class LexMapSchema extends core_js_1.Schema {
    type = 'lexMap';
    validateInContext(input, ctx) {
        if (!(0, lex_data_1.isPlainObject)(input)) {
            return ctx.issueUnexpectedType(input, 'object');
        }
        for (const key of Object.keys(input)) {
            // @NOTE We use a lexValue() schema here to recursively validate all
            // nested values, which ensures that the error reporting includes the
            // correct path and type information for any invalid nested values. This
            // allows for more informative error descriptions than a simple "isLexMap"
            // check.
            const r = ctx.validateChild(input, key, propertyValueSchema); // recursively validate all properties
            if (!r.success)
                return r;
        }
        return ctx.success(input);
    }
}
exports.LexMapSchema = LexMapSchema;
/**
 * Creates a schema that accepts any plain object with string keys and values
 * that are valid AT Protocol data types (string, integer, boolean, null, bytes,
 * cid, array, or object).
 *
 * @see {@link LexMap} from `@atproto/lex-data` for the type definition of valid AT Protocol data types
 * @returns A new {@link LexMapSchema} instance
 *
 * @example
 * ```ts
 * // Accept any object shape
 * const schema = l.lexMap()
 *
 * schema.validate({ any: 'props' })    // success
 * schema.validate([1, 2, 3])           // fails - only plain objects are accepted
 * schema.validate({ foo: new Date() }) // fails - Date is not a valid LexValue
 * schema.validate({ foo: 1.2 })        // fails - 1.2 is not a valid LexValue (not an integer)
 * ```
 */
exports.lexMap = (0, memoize_js_1.memoizedOptions)(function () {
    return new LexMapSchema();
});
/** @deprecated Use {@link lexMap} instead */
exports.unknownObject = exports.lexMap;
//# sourceMappingURL=lex-map.js.map
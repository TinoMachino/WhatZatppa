"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.null = exports.nullSchema = exports.NullSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema for validating null values.
 *
 * Only accepts the JavaScript `null` value. Rejects `undefined` and all
 * other values.
 *
 * @example
 * ```ts
 * const schema = new NullSchema()
 * schema.validate(null)      // success
 * schema.validate(undefined) // fails
 * ```
 */
class NullSchema extends core_js_1.Schema {
    type = 'null';
    validateInContext(input, ctx) {
        if (input !== null) {
            return ctx.issueUnexpectedType(input, 'null');
        }
        return ctx.success(null);
    }
}
exports.NullSchema = NullSchema;
/**
 * Creates a null schema that only accepts the null value.
 *
 * Useful for explicitly representing null in union types or optional fields.
 *
 * @returns A new {@link NullSchema} instance
 *
 * @example
 * ```ts
 * // Explicit null
 * const nullOnlySchema = l.null()
 *
 * // Nullable string (string or null)
 * const nullableStringSchema = l.union([l.string(), l.null()])
 * ```
 */
exports.nullSchema = (0, memoize_js_1.memoizedOptions)(function () {
    return new NullSchema();
});
exports.null = exports.nullSchema;
//# sourceMappingURL=null.js.map
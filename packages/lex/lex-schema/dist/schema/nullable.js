"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullable = exports.NullableSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema wrapper that allows null values in addition to the wrapped schema.
 *
 * When the input is `null`, validation succeeds immediately. Otherwise,
 * the input is validated against the wrapped schema.
 *
 * @template TValidator - The wrapped validator type
 *
 * @example
 * ```ts
 * const schema = new NullableSchema(l.string())
 * schema.validate(null)    // success
 * schema.validate('hello') // success
 * ```
 */
class NullableSchema extends core_js_1.Schema {
    validator;
    type = 'nullable';
    constructor(validator) {
        super();
        this.validator = validator;
    }
    validateInContext(input, ctx) {
        if (input === null) {
            return ctx.success(null);
        }
        return ctx.validate(input, this.validator);
    }
}
exports.NullableSchema = NullableSchema;
/**
 * Creates a nullable schema that accepts null in addition to the wrapped type.
 *
 * Wraps another schema to allow null values. Different from `optional()` which
 * allows undefined.
 *
 * @param validator - The validator to make nullable
 * @returns A new {@link NullableSchema} instance
 *
 * @example
 * ```ts
 * // Nullable string
 * const nullableString = l.nullable(l.string())
 * nullableString.parse(null)    // null
 * nullableString.parse('hello') // 'hello'
 *
 * // In an object
 * const userSchema = l.object({
 *   name: l.string(),
 *   deletedAt: l.nullable(l.string({ format: 'datetime' })),
 * })
 *
 * // Combine with optional for null or undefined
 * const maybeString = l.optional(l.nullable(l.string()))
 * ```
 */
exports.nullable = (0, memoize_js_1.memoizedTransformer)(function (validator) {
    return new NullableSchema(validator);
});
//# sourceMappingURL=nullable.js.map
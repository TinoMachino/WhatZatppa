"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = exports.OptionalSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema wrapper that makes a value optional (allows undefined).
 *
 * When the input is `undefined`, validation succeeds without running the
 * inner validator. If the inner validator has a default value (via `withDefault`),
 * that default will be applied in parse mode.
 *
 * @template TValidator - The wrapped validator type
 *
 * @example
 * ```ts
 * const schema = new OptionalSchema(l.string())
 * schema.validate(undefined) // success
 * schema.validate('hello')   // success
 * ```
 */
class OptionalSchema extends core_js_1.Schema {
    validator;
    type = 'optional';
    constructor(validator) {
        super();
        this.validator = validator;
    }
    validateInContext(input, ctx) {
        // Optimization: No need to apply child schema defaults in validation mode
        if (input === undefined && ctx.options.mode === 'validate') {
            return ctx.success(input);
        }
        // @NOTE The inner schema might apply a default value so we need to run it
        // even if input is undefined.
        const result = ctx.validate(input, this.validator);
        if (result.success) {
            return result;
        }
        if (input === undefined) {
            return ctx.success(input);
        }
        return result;
    }
}
exports.OptionalSchema = OptionalSchema;
/**
 * Creates an optional schema that allows undefined values.
 *
 * Wraps another schema to make it optional. When used in an object schema,
 * properties with optional schemas are not required.
 *
 * @param validator - The validator to make optional
 * @returns A new {@link OptionalSchema} instance
 *
 * @example
 * ```ts
 * // Optional string
 * const optionalBio = l.optional(l.string())
 *
 * // In an object - property is not required
 * const userSchema = l.object({
 *   name: l.string(),
 *   bio: l.optional(l.string()),
 * })
 * userSchema.parse({ name: 'Alice' }) // Valid, bio is undefined
 *
 * // With default value
 * const countSchema = l.optional(l.withDefault(l.integer(), 0))
 * countSchema.parse(undefined) // Returns 0
 * ```
 */
exports.optional = (0, memoize_js_1.memoizedTransformer)(function (validator) {
    return new OptionalSchema(validator);
});
//# sourceMappingURL=optional.js.map
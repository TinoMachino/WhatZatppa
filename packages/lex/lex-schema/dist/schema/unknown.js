"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknown = exports.UnknownSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema that accepts any value without validation.
 *
 * Passes through any input unchanged. Use sparingly as it bypasses
 * type safety. Useful for dynamic data or when the schema is not
 * known at compile time.
 *
 * @example
 * ```ts
 * const schema = new UnknownSchema()
 * schema.validate(anything) // always succeeds
 * ```
 */
class UnknownSchema extends core_js_1.Schema {
    type = 'unknown';
    validateInContext(input, ctx) {
        return ctx.success(input);
    }
}
exports.UnknownSchema = UnknownSchema;
/**
 * Creates an unknown schema that accepts any value.
 *
 * The value passes through without any validation or transformation.
 * Use this when you need to accept arbitrary data.
 *
 * @returns A new {@link UnknownSchema} instance
 *
 * @example
 * ```ts
 * // Accept any value
 * const anyDataSchema = l.unknown()
 *
 * // In an object with a dynamic field
 * const flexibleSchema = l.object({
 *   type: l.string(),
 *   data: l.unknown(),
 * })
 * ```
 */
exports.unknown = (0, memoize_js_1.memoizedOptions)(function () {
    return new UnknownSchema();
});
//# sourceMappingURL=unknown.js.map
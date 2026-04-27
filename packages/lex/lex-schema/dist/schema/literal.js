"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralSchema = void 0;
exports.literal = literal;
const core_js_1 = require("../core.js");
/**
 * Schema that only accepts a specific literal value.
 *
 * Validates that the input is exactly equal to the specified value using
 * strict equality (===).
 *
 * @template TValue - The literal type (null, string, number, or boolean)
 *
 * @example
 * ```ts
 * const schema = new LiteralSchema('admin')
 * schema.validate('admin') // success
 * schema.validate('user')  // fails
 * ```
 */
class LiteralSchema extends core_js_1.Schema {
    value;
    type = 'literal';
    constructor(value) {
        super();
        this.value = value;
    }
    validateInContext(input, ctx) {
        if (input !== this.value) {
            return ctx.issueInvalidValue(input, [this.value]);
        }
        return ctx.success(this.value);
    }
}
exports.LiteralSchema = LiteralSchema;
/**
 * Creates a literal schema that only accepts the exact specified value.
 *
 * Useful for discriminator fields in unions, constant values, or type narrowing.
 *
 * @param value - The exact value that must be matched
 * @returns A new {@link LiteralSchema} instance
 *
 * @example
 * ```ts
 * // String literal
 * const roleSchema = l.literal('admin')
 *
 * // Number literal
 * const versionSchema = l.literal(1)
 *
 * // Boolean literal
 * const enabledSchema = l.literal(true)
 *
 * // Null literal
 * const nullSchema = l.literal(null)
 *
 * // In discriminated unions
 * const actionSchema = l.discriminatedUnion('type', [
 *   l.object({ type: l.literal('create'), data: l.unknown() }),
 *   l.object({ type: l.literal('delete'), id: l.string() }),
 * ])
 * ```
 */
/*@__NO_SIDE_EFFECTS__*/
function literal(value) {
    return new LiteralSchema(value);
}
//# sourceMappingURL=literal.js.map
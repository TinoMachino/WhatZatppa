"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionSchema = void 0;
exports.union = union;
const core_js_1 = require("../core.js");
/**
 * Schema for validating values that match one of several possible schemas.
 *
 * Tries each validator in order until one succeeds. If all validators fail,
 * returns a combined error from all attempts.
 *
 * @template TValidators - Tuple type of the validators in the union
 *
 * @example
 * ```ts
 * const schema = new UnionSchema([l.string(), l.integer()])
 * schema.validate('hello') // success
 * schema.validate(42)      // success
 * schema.validate(true)    // fails
 * ```
 */
class UnionSchema extends core_js_1.Schema {
    validators;
    type = 'union';
    constructor(validators) {
        super();
        this.validators = validators;
    }
    validateInContext(input, ctx) {
        const failures = [];
        for (const validator of this.validators) {
            const result = ctx.validate(input, validator);
            if (result.success)
                return result;
            failures.push(result);
        }
        return ctx.failure(core_js_1.LexValidationError.fromFailures(failures));
    }
}
exports.UnionSchema = UnionSchema;
/**
 * Creates a union schema that accepts values matching any of the provided schemas.
 *
 * Validators are tried in order. Use `discriminatedUnion()` for better
 * performance when discriminating on a known property.
 *
 * @param validators - Non-empty array of validators to try
 * @returns A new {@link UnionSchema} instance
 *
 * @example
 * ```ts
 * // String or number
 * const stringOrNumber = l.union([l.string(), l.integer()])
 *
 * // Nullable value
 * const nullableString = l.union([l.string(), l.null()])
 *
 * // Multiple object types
 * const mediaSchema = l.union([
 *   l.object({ type: l.literal('image'), url: l.string() }),
 *   l.object({ type: l.literal('video'), url: l.string(), duration: l.integer() }),
 * ])
 * ```
 */
/*@__NO_SIDE_EFFECTS__*/
function union(validators) {
    return new UnionSchema(validators);
}
//# sourceMappingURL=union.js.map
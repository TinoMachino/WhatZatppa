"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = exports.BooleanSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema for validating boolean values.
 *
 * Only accepts JavaScript `true` or `false` values. Does not perform
 * any coercion from strings or numbers.
 *
 * @example
 * ```ts
 * const schema = new BooleanSchema()
 * schema.validate(true)  // success
 * schema.validate(false) // success
 * schema.validate('true') // fails - no string coercion
 * ```
 */
class BooleanSchema extends core_js_1.Schema {
    type = 'boolean';
    validateInContext(input, ctx) {
        if (typeof input === 'boolean') {
            return ctx.success(input);
        }
        return ctx.issueUnexpectedType(input, 'boolean');
    }
}
exports.BooleanSchema = BooleanSchema;
/**
 * Creates a boolean schema that validates true/false values.
 *
 * @returns A new {@link BooleanSchema} instance
 *
 * @example
 * ```ts
 * const enabledSchema = l.boolean()
 *
 * enabledSchema.parse(true)   // true
 * enabledSchema.parse(false)  // false
 * enabledSchema.parse('true') // throws - strings not accepted
 * ```
 */
exports.boolean = (0, memoize_js_1.memoizedOptions)(function () {
    return new BooleanSchema();
});
//# sourceMappingURL=boolean.js.map
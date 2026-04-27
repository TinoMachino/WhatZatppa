"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.never = exports.NeverSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema that always fails validation.
 *
 * Represents an impossible type - no value can satisfy this schema.
 * Useful for exhaustiveness checking or marking impossible branches.
 *
 * @example
 * ```ts
 * const schema = new NeverSchema()
 * schema.validate(anything) // always fails
 * ```
 */
class NeverSchema extends core_js_1.Schema {
    type = 'never';
    validateInContext(input, ctx) {
        return ctx.issueUnexpectedType(input, 'never');
    }
}
exports.NeverSchema = NeverSchema;
/**
 * Creates a never schema that always fails validation.
 *
 * Useful for exhaustiveness checking in TypeScript or marking impossible
 * code paths.
 *
 * @returns A new {@link NeverSchema} instance
 *
 * @example
 * ```ts
 * // Exhaustiveness checking
 * type Status = 'active' | 'inactive'
 *
 * function handleStatus(status: Status) {
 *   switch (status) {
 *     case 'active': return 'Active'
 *     case 'inactive': return 'Inactive'
 *     default:
 *       // TypeScript will error if we miss a case
 *       l.never().parse(status)
 *   }
 * }
 *
 * // In impossible union branches
 * const schema = l.object({
 *   type: l.literal('fixed'),
 *   dynamic: l.never(), // This property can never exist
 * })
 * ```
 */
exports.never = (0, memoize_js_1.memoizedOptions)(function () {
    return new NeverSchema();
});
//# sourceMappingURL=never.js.map
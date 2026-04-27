"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integer = exports.IntegerSchema = void 0;
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema for validating integer values with optional range constraints.
 *
 * Only accepts safe integers (values that can be exactly represented in JavaScript).
 * Use {@link IntegerSchemaOptions} to constrain the allowed range.
 *
 * @example
 * ```ts
 * const schema = new IntegerSchema({ minimum: 0, maximum: 100 })
 * const result = schema.validate(42)
 * ```
 */
class IntegerSchema extends core_js_1.Schema {
    options;
    type = 'integer';
    constructor(options) {
        super();
        this.options = options;
    }
    validateInContext(input, ctx) {
        if (!isInteger(input)) {
            return ctx.issueUnexpectedType(input, 'integer');
        }
        if (this.options?.minimum != null && input < this.options.minimum) {
            return ctx.issueTooSmall(input, 'integer', this.options.minimum, input);
        }
        if (this.options?.maximum != null && input > this.options.maximum) {
            return ctx.issueTooBig(input, 'integer', this.options.maximum, input);
        }
        return ctx.success(input);
    }
}
exports.IntegerSchema = IntegerSchema;
/**
 * Simple wrapper around {@link Number.isSafeInteger} that acts as a type guard.
 */
function isInteger(input) {
    return Number.isSafeInteger(input);
}
/**
 * Creates an integer schema with optional minimum and maximum constraints.
 *
 * Validates that the input is a safe integer (can be exactly represented in JavaScript)
 * and optionally falls within a specified range.
 *
 * @param options - Optional configuration for minimum and maximum values
 * @returns A new {@link IntegerSchema} instance
 *
 * @example
 * ```ts
 * // Basic integer
 * const countSchema = l.integer()
 *
 * // With minimum value
 * const positiveSchema = l.integer({ minimum: 1 })
 *
 * // With range constraints
 * const percentSchema = l.integer({ minimum: 0, maximum: 100 })
 *
 * // Age validation
 * const ageSchema = l.integer({ minimum: 0, maximum: 150 })
 * ```
 */
exports.integer = (0, memoize_js_1.memoizedOptions)(function (options) {
    return new IntegerSchema(options);
});
//# sourceMappingURL=integer.js.map
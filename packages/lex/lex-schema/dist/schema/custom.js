"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSchema = void 0;
exports.custom = custom;
const core_js_1 = require("../core.js");
/**
 * Schema with a custom validation function.
 *
 * Allows defining completely custom validation logic using a type guard
 * assertion function. The function receives the input and validation context,
 * and must return whether the input is valid.
 *
 * @template TValue - The validated output type
 *
 * @example
 * ```ts
 * const schema = new CustomSchema(
 *   (input): input is Date => input instanceof Date,
 *   'Expected a Date instance'
 * )
 * ```
 */
class CustomSchema extends core_js_1.Schema {
    assertion;
    message;
    path;
    type = 'custom';
    constructor(assertion, message, path) {
        super();
        this.assertion = assertion;
        this.message = message;
        this.path = path;
    }
    validateInContext(input, ctx) {
        if (!this.assertion.call(null, input, ctx)) {
            const path = ctx.concatPath(this.path);
            return ctx.issue(new core_js_1.IssueCustom(path, input, this.message));
        }
        return ctx.success(input);
    }
}
exports.CustomSchema = CustomSchema;
/**
 * Creates a custom schema with a user-defined validation function.
 *
 * Use this when the built-in schemas don't cover your validation needs.
 * The assertion function must be a type guard that narrows the input type.
 *
 * @param assertion - Type guard function that validates the input
 * @param message - Error message when validation fails
 * @param path - Optional path to associate with validation errors
 * @returns A new {@link CustomSchema} instance
 *
 * @example
 * ```ts
 * // Validate Date instances
 * const dateSchema = l.custom(
 *   (input): input is Date => input instanceof Date && !isNaN(input.getTime()),
 *   'Expected a valid Date'
 * )
 *
 * // Validate specific object shape
 * const pointSchema = l.custom(
 *   (input): input is { x: number; y: number } =>
 *     typeof input === 'object' &&
 *     input !== null &&
 *     typeof (input as any).x === 'number' &&
 *     typeof (input as any).y === 'number',
 *   'Expected a point with x and y coordinates'
 * )
 *
 * // With custom path
 * const validConfig = l.custom(
 *   (input): input is Config => validateConfig(input),
 *   'Invalid configuration',
 *   ['config']
 * )
 * ```
 */
/*@__NO_SIDE_EFFECTS__*/
function custom(assertion, message, path) {
    return new CustomSchema(assertion, message, path);
}
//# sourceMappingURL=custom.js.map
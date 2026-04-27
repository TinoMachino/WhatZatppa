"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytes = exports.BytesSchema = void 0;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema for validating binary data as Uint8Array with optional length constraints.
 *
 * In "parse" mode, coerces various binary formats (Buffer, ArrayBuffer, etc.)
 * into Uint8Array. In "validate" mode, only accepts Uint8Array directly.
 *
 * @example
 * ```ts
 * const schema = new BytesSchema({ maxLength: 1024 })
 * const result = schema.validate(new Uint8Array([1, 2, 3]))
 * ```
 */
class BytesSchema extends core_js_1.Schema {
    options;
    type = 'bytes';
    constructor(options = {}) {
        super();
        this.options = options;
    }
    validateInContext(input, ctx) {
        // In "parse" mode, coerce different binary formats into Uint8Array
        const bytes = ctx.options.mode === 'parse' ? (0, lex_data_1.asUint8Array)(input) : (0, lex_data_1.ifUint8Array)(input);
        if (!bytes) {
            return ctx.issueUnexpectedType(input, 'bytes');
        }
        const { minLength } = this.options;
        if (minLength != null && bytes.length < minLength) {
            return ctx.issueTooSmall(bytes, 'bytes', minLength, bytes.length);
        }
        const { maxLength } = this.options;
        if (maxLength != null && bytes.length > maxLength) {
            return ctx.issueTooBig(bytes, 'bytes', maxLength, bytes.length);
        }
        return ctx.success(bytes);
    }
}
exports.BytesSchema = BytesSchema;
/**
 * Creates a bytes schema for validating binary data with optional length constraints.
 *
 * Validates Uint8Array values and can coerce other binary formats in parse mode.
 *
 * @param options - Optional configuration for minimum and maximum byte length
 * @returns A new {@link BytesSchema} instance
 *
 * @example
 * ```ts
 * // Basic bytes schema
 * const dataSchema = l.bytes()
 *
 * // With size constraints
 * const avatarSchema = l.bytes({ maxLength: 1000000 }) // 1MB max
 *
 * // With minimum size
 * const hashSchema = l.bytes({ minLength: 32, maxLength: 32 }) // Exactly 32 bytes
 * ```
 */
exports.bytes = (0, memoize_js_1.memoizedOptions)(function (options) {
    return new BytesSchema(options);
});
//# sourceMappingURL=bytes.js.map
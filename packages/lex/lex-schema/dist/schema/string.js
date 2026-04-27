"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.StringSchema = void 0;
exports.coerceToString = coerceToString;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
const token_js_1 = require("./token.js");
/**
 * Schema for validating string values with optional format and length constraints.
 *
 * Supports various string formats defined in the Lexicon specification, as well as
 * length constraints measured in UTF-8 bytes or grapheme clusters.
 *
 * @template TOptions - The configuration options type
 *
 * @example
 * ```ts
 * const schema = new StringSchema({ format: 'datetime', maxLength: 64 })
 * const result = schema.validate('2024-01-15T10:30:00Z')
 * ```
 */
class StringSchema extends core_js_1.Schema {
    type = 'string';
    // @NOTE since the _string utility allows omitting knownValues when TOptions
    // *does* include it (since it's only used for typing), we cannot type options
    // as TOptions directly since it may not actually include knownValues at
    // runtime, making schema.options.knownValues potentially undefined even when
    // TOptions includes it.
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    validateInContext(input, ctx) {
        const str = coerceToString(input);
        if (str == null) {
            return ctx.issueUnexpectedType(input, 'string');
        }
        let lazyUtf8Len;
        const minLength = this.options.minLength;
        if (minLength != null) {
            if ((lazyUtf8Len ??= (0, lex_data_1.utf8Len)(str)) < minLength) {
                return ctx.issueTooSmall(str, 'string', minLength, lazyUtf8Len);
            }
        }
        const maxLength = this.options.maxLength;
        if (maxLength != null) {
            // Optimization: we can avoid computing the UTF-8 length if the maximum
            // possible length, in bytes, of the input JS string is smaller than the
            // maxLength (in UTF-8 string bytes).
            if (str.length * 3 <= maxLength) {
                // Input string so small it can't possibly exceed maxLength
            }
            else if ((lazyUtf8Len ??= (0, lex_data_1.utf8Len)(str)) > maxLength) {
                return ctx.issueTooBig(str, 'string', maxLength, lazyUtf8Len);
            }
        }
        // Optimization: count graphemes once
        let lazyGraphLen;
        const minGraphemes = this.options.minGraphemes;
        if (minGraphemes != null) {
            if (str.length < minGraphemes) {
                // If the JavaScript string length (UTF-16) is below the minimal limit,
                // its grapheme length (which <= .length) will also be below.
                // Fail early.
                return ctx.issueTooSmall(str, 'grapheme', minGraphemes, str.length);
            }
            else if ((lazyGraphLen ??= (0, lex_data_1.graphemeLen)(str)) < minGraphemes) {
                return ctx.issueTooSmall(str, 'grapheme', minGraphemes, lazyGraphLen);
            }
        }
        const maxGraphemes = this.options.maxGraphemes;
        if (maxGraphemes != null) {
            if (str.length <= maxGraphemes) {
                // If the JavaScript string length (UTF-16) is within the maximum limit,
                // its grapheme length (which <= .length) will also be within.
            }
            else if ((lazyGraphLen ??= (0, lex_data_1.graphemeLen)(str)) > maxGraphemes) {
                return ctx.issueTooBig(str, 'grapheme', maxGraphemes, lazyGraphLen);
            }
        }
        const format = this.options.format;
        if (format != null && !(0, core_js_1.isStringFormat)(str, format, ctx.options)) {
            return ctx.issueInvalidFormat(str, format);
        }
        return ctx.success(str);
    }
}
exports.StringSchema = StringSchema;
function coerceToString(input) {
    switch (typeof input) {
        // @NOTE We do *not* coerce numbers/booleans to strings because that can
        // lead to them being accepted as string instead of being coerced to
        // number/boolean when the input is a string and the expected result is
        // number/boolean (e.g. in params).
        case 'string':
            return input;
        case 'object': {
            if (input == null)
                return null;
            // @NOTE Allow using TokenSchema instances in places expecting strings,
            // converting them to their string value.
            if (input instanceof token_js_1.TokenSchema) {
                return input.toString();
            }
            if (input instanceof Date) {
                if (Number.isNaN(input.getTime()))
                    return null;
                return input.toISOString();
            }
            if (input instanceof URL) {
                return input.toString();
            }
            const cid = (0, lex_data_1.ifCid)(input);
            if (cid)
                return cid.toString();
            if (input instanceof String) {
                return input.valueOf();
            }
        }
        // falls through
        default:
            return null;
    }
}
function _string(options = {}) {
    return new StringSchema(options);
}
/**
 * Creates a string schema with optional format and length constraints.
 *
 * Strings can be validated against various formats (datetime, uri, did, handle, etc.)
 * and constrained by length in UTF-8 bytes or grapheme clusters.
 *
 * @param options - Optional configuration for format and length constraints
 * @returns A new {@link StringSchema} instance
 *
 * @example
 * ```ts
 * // Basic string
 * const nameSchema = l.string()
 *
 * // With format validation
 * const dateSchema = l.string({ format: 'datetime' })
 *
 * // With length constraints (UTF-8 bytes)
 * const bioSchema = l.string({ maxLength: 256 })
 *
 * // With grapheme constraints (user-perceived characters)
 * const displayNameSchema = l.string({ maxGraphemes: 64 })
 *
 * // Combining constraints
 * const handleSchema = l.string({ format: 'handle', minLength: 3, maxLength: 253 })
 * ```
 */
exports.string = (0, memoize_js_1.memoizedOptions)(_string);
//# sourceMappingURL=string.js.map
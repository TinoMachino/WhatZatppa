"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
exports.token = token;
const core_js_1 = require("../core.js");
/**
 * Schema for Lexicon token values.
 *
 * Tokens are named constants in Lexicon, identified by their NSID and hash.
 * They validate to their string value (e.g., 'app.bsky.feed.defs#requestLess').
 * TokenSchema instances can also be used as values themselves.
 *
 * @template TValue - The token string literal type
 *
 * @example
 * ```ts
 * const schema = new TokenSchema('app.bsky.feed.defs#requestLess')
 * schema.validate('app.bsky.feed.defs#requestLess') // success
 * ```
 */
class TokenSchema extends core_js_1.Schema {
    value;
    type = 'token';
    constructor(value) {
        super();
        this.value = value;
    }
    validateInContext(input, ctx) {
        if (input === this.value) {
            return ctx.success(this.value);
        }
        // @NOTE: allow using the token instance itself (but convert to the actual
        // token value)
        if (input instanceof TokenSchema && input.value === this.value) {
            return ctx.success(this.value);
        }
        if (typeof input !== 'string') {
            return ctx.issueUnexpectedType(input, 'token');
        }
        return ctx.issueInvalidValue(input, [this.value]);
    }
    // When using the TokenSchema instance as data, let's serialize it to the
    // token value
    toJSON() {
        return this.value;
    }
    toString() {
        return this.value;
    }
}
exports.TokenSchema = TokenSchema;
/**
 * Creates a token schema for Lexicon named constants.
 *
 * Tokens are used in Lexicon as named constants or enum-like values.
 * The token instance can be used both as a schema validator and as
 * the token value itself (it serializes to its string value).
 *
 * @param nsid - The NSID part of the token
 * @param hash - The hash part of the token (defaults to 'main')
 * @returns A new {@link TokenSchema} instance
 *
 * @example
 * ```ts
 * // Define tokens
 * const requestLess = l.token('app.bsky.feed.defs', 'requestLess')
 * const requestMore = l.token('app.bsky.feed.defs', 'requestMore')
 *
 * // Use as a value
 * console.log(requestLess.toString()) // 'app.bsky.feed.defs#requestLess'
 *
 * // Use in union for validation
 * const feedbackSchema = l.union([requestLess, requestMore])
 *
 * // Validate
 * feedbackSchema.parse('app.bsky.feed.defs#requestLess') // success
 *
 * // Token instances can be used as values in other schemas
 * const feedbackRequest = l.object({
 *   feedback: requestLess, // Accepts the token value
 * })
 * ```
 */
/*@__NO_SIDE_EFFECTS__*/
function token(nsid, hash = 'main') {
    return new TokenSchema((0, core_js_1.$type)(nsid, hash));
}
//# sourceMappingURL=token.js.map
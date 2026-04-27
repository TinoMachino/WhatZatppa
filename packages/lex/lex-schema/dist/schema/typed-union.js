"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedUnionSchema = void 0;
exports.typedUnion = typedUnion;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const lazy_property_js_1 = require("../util/lazy-property.js");
/**
 * Schema for Lexicon typed unions (unions discriminated by $type).
 *
 * Typed unions are collections of typed objects identified by their `$type`
 * field. Can be "open" (accept unknown types) or "closed" (only accept
 * known types).
 *
 * @template TValidators - Tuple of {@link TypedRefSchema} or {@link TypedObjectSchema} instances
 * @template TClosed - Whether the union is closed (rejects unknown $types)
 *
 * @example
 * ```ts
 * const embedUnion = new TypedUnionSchema([
 *   l.typedRef(() => imageSchema),
 *   l.typedRef(() => videoSchema),
 * ], true) // closed - only accepts images and videos
 * ```
 */
class TypedUnionSchema extends core_js_1.Schema {
    validators;
    closed;
    type = 'typedUnion';
    constructor(validators, closed) {
        // @NOTE In order to avoid circular dependency issues, we don't access the
        // refs's schema (or $type) here. Instead, we access them lazily when first
        // needed. The biggest issue with this strategy is that we can't throw
        // early if the refs contain multiple refs with the same $type.
        super();
        this.validators = validators;
        this.closed = closed;
    }
    get validatorsMap() {
        const map = new Map();
        for (const ref of this.validators)
            map.set(ref.$type, ref);
        return (0, lazy_property_js_1.lazyProperty)(this, 'validatorsMap', map);
    }
    get $types() {
        return Array.from(this.validatorsMap.keys());
    }
    validateInContext(input, ctx) {
        if (!(0, lex_data_1.isPlainObject)(input) || !('$type' in input)) {
            return ctx.issueUnexpectedType(input, '$typed');
        }
        const { $type } = input;
        const validator = this.validatorsMap.get($type);
        if (validator) {
            return ctx.validate(input, validator);
        }
        if (this.closed) {
            return ctx.issueInvalidPropertyValue(input, '$type', this.$types);
        }
        if (typeof $type !== 'string') {
            return ctx.issueInvalidPropertyType(input, '$type', 'string');
        }
        return ctx.success(input);
    }
}
exports.TypedUnionSchema = TypedUnionSchema;
/**
 * Creates a typed union schema for Lexicon unions.
 *
 * Typed unions discriminate variants by their `$type` field. Can be open
 * (accepts unknown types, useful for extensibility) or closed (strict).
 *
 * @param refs - Array of typed refs for the union variants
 * @param closed - Whether to reject unknown $type values
 * @returns A new {@link TypedUnionSchema} instance
 *
 * @example
 * ```ts
 * // Closed union - only accepts known types
 * const embedSchema = l.typedUnion([
 *   l.typedRef(() => imageViewSchema),
 *   l.typedRef(() => videoViewSchema),
 *   l.typedRef(() => externalViewSchema),
 * ], true)
 *
 * // Open union - accepts unknown types for forward compatibility
 * const feedItemSchema = l.typedUnion([
 *   l.typedRef(() => postSchema),
 *   l.typedRef(() => repostSchema),
 * ], false) // unknown types pass through
 *
 * // Get all known $types
 * console.log(embedSchema.$types)
 * // ['app.bsky.embed.images#view', 'app.bsky.embed.video#view', ...]
 * ```
 */
/*@__NO_SIDE_EFFECTS__*/
function typedUnion(refs, closed) {
    return new TypedUnionSchema(refs, closed);
}
//# sourceMappingURL=typed-union.js.map
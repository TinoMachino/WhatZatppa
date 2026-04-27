"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedObjectSchema = void 0;
exports.typedObject = typedObject;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const lazy_property_js_1 = require("../util/lazy-property.js");
/**
 * Schema for typed objects in Lexicon unions.
 *
 * Typed objects have a `$type` field that identifies which variant they are
 * in a union. The `$type` can be omitted in input (it's implicit), but if
 * present, it must match the expected value.
 *
 * @template TType - The $type string literal type
 * @template TShape - The validator type for the object's shape
 *
 * @example
 * ```ts
 * const schema = new TypedObjectSchema(
 *   'app.bsky.embed.images#view',
 *   l.object({ images: l.array(imageSchema) })
 * )
 * ```
 */
class TypedObjectSchema extends core_js_1.Schema {
    $type;
    schema;
    type = 'typedObject';
    constructor($type, schema) {
        super();
        this.$type = $type;
        this.schema = schema;
    }
    validateInContext(input, ctx) {
        if (!(0, lex_data_1.isPlainObject)(input)) {
            return ctx.issueUnexpectedType(input, 'object');
        }
        if ('$type' in input &&
            input.$type !== undefined &&
            input.$type !== this.$type) {
            return ctx.issueInvalidPropertyValue(input, '$type', [this.$type]);
        }
        return ctx.validate(input, this.schema);
    }
    build(input) {
        return (0, core_js_1.$typed)(input, this.$type);
    }
    isTypeOf(value) {
        return value.$type === undefined || value.$type === this.$type;
    }
    /**
     * Bound alias for {@link build} for compatibility with generated utilities.
     * @see {@link build}
     */
    get $build() {
        return (0, lazy_property_js_1.lazyProperty)(this, '$build', this.build.bind(this));
    }
    /**
     * Bound alias for {@link isTypeOf} for compatibility with generated utilities.
     * @see {@link isTypeOf}
     */
    get $isTypeOf() {
        return (0, lazy_property_js_1.lazyProperty)(this, '$isTypeOf', this.isTypeOf.bind(this));
    }
}
exports.TypedObjectSchema = TypedObjectSchema;
/*@__NO_SIDE_EFFECTS__*/
function typedObject(nsid, hash, validator) {
    return new TypedObjectSchema((0, core_js_1.$type)(nsid, hash), validator);
}
//# sourceMappingURL=typed-object.js.map
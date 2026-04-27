"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordSchema = void 0;
exports.record = record;
const core_js_1 = require("../core.js");
const lazy_property_js_1 = require("../util/lazy-property.js");
const literal_js_1 = require("./literal.js");
const string_js_1 = require("./string.js");
/**
 * Schema for AT Protocol records with a type identifier and key constraints.
 *
 * Records are the primary data unit in AT Protocol. Each record has a `$type`
 * field identifying its Lexicon schema, and is stored at a specific key
 * (TID, NSID, or other format) in a repository.
 *
 * @template TKey - The record key type ('tid', 'nsid', 'any', or 'literal:...')
 * @template TType - The NSID string identifying this record type
 * @template TShape - The validator type for the record's data shape
 *
 * @example
 * ```ts
 * const postSchema = new RecordSchema(
 *   'tid',
 *   'app.bsky.feed.post',
 *   l.object({ text: l.string(), createdAt: l.string() })
 * )
 * ```
 */
class RecordSchema extends core_js_1.Schema {
    key;
    $type;
    schema;
    type = 'record';
    keySchema;
    constructor(key, $type, schema) {
        super();
        this.key = key;
        this.$type = $type;
        this.schema = schema;
        this.keySchema = recordKey(key);
    }
    validateInContext(input, ctx) {
        const result = ctx.validate(input, this.schema);
        if (!result.success) {
            return result;
        }
        if (result.value.$type !== this.$type) {
            return ctx.issueInvalidPropertyValue(result.value, '$type', [this.$type]);
        }
        return result;
    }
    build(input) {
        return (0, core_js_1.$typed)(input, this.$type);
    }
    isTypeOf(value) {
        return value.$type === this.$type;
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
exports.RecordSchema = RecordSchema;
const keySchema = (0, string_js_1.string)({ minLength: 1 });
const tidSchema = (0, string_js_1.string)({ format: 'tid' });
const nsidSchema = (0, string_js_1.string)({ format: 'nsid' });
const selfLiteralSchema = (0, literal_js_1.literal)('self');
function recordKey(key) {
    // @NOTE Use cached instances for common schemas
    if (key === 'any')
        return keySchema;
    if (key === 'tid')
        return tidSchema;
    if (key === 'nsid')
        return nsidSchema;
    if (key.startsWith('literal:')) {
        const value = key.slice(8);
        if (value === 'self')
            return selfLiteralSchema;
        return (0, literal_js_1.literal)(value);
    }
    throw new Error(`Unsupported record key type: ${key}`);
}
/*@__NO_SIDE_EFFECTS__*/
function record(key, type, validator) {
    return new RecordSchema(key, type, validator);
}
//# sourceMappingURL=record.js.map
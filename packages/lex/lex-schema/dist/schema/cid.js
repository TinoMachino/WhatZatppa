"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cid = exports.CidSchema = void 0;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema for validating Content Identifiers (CIDs).
 *
 * CIDs are self-describing content-addressed identifiers used in AT Protocol
 * to reference data by its cryptographic hash. This schema validates that
 * the input is a valid CID object.
 *
 * @template TOptions - The configuration options type
 *
 * @example
 * ```ts
 * const schema = new CidSchema()
 * const result = schema.validate(someCid)
 * ```
 */
class CidSchema extends core_js_1.Schema {
    options;
    type = 'cid';
    constructor(options) {
        super();
        this.options = options;
    }
    validateInContext(input, ctx) {
        if (!(0, lex_data_1.isCid)(input, this.options)) {
            return ctx.issueUnexpectedType(input, 'cid');
        }
        return ctx.success(input);
    }
}
exports.CidSchema = CidSchema;
/**
 * Creates a CID schema for validating Content Identifiers.
 *
 * CIDs are used throughout AT Protocol to reference content by its hash.
 * This is commonly used for referencing blobs, commits, and other data.
 *
 * @param options - Optional configuration for CID validation
 * @returns A new {@link CidSchema} instance
 *
 * @example
 * ```ts
 * // Basic CID validation
 * const cidSchema = l.cid()
 *
 * // Validate a CID from a blob reference
 * const result = cidSchema.validate(blobRef.ref)
 * ```
 */
exports.cid = (0, memoize_js_1.memoizedOptions)(function (options) {
    return new CidSchema(options);
});
//# sourceMappingURL=cid.js.map
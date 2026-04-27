"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blob = exports.BlobSchema = exports.isTypedBlobRef = exports.isLegacyBlobRef = exports.isBlobRef = void 0;
const lex_data_1 = require("@atproto/lex-data");
Object.defineProperty(exports, "isBlobRef", { enumerable: true, get: function () { return lex_data_1.isBlobRef; } });
Object.defineProperty(exports, "isLegacyBlobRef", { enumerable: true, get: function () { return lex_data_1.isLegacyBlobRef; } });
Object.defineProperty(exports, "isTypedBlobRef", { enumerable: true, get: function () { return lex_data_1.isTypedBlobRef; } });
const core_js_1 = require("../core.js");
const memoize_js_1 = require("../util/memoize.js");
/**
 * Schema for validating blob references in AT Protocol.
 *
 * Validates BlobRef objects which contain a CID reference to binary data,
 * along with metadata like MIME type and size. Can optionally accept
 * legacy blob reference format.
 *
 * @template TOptions - The configuration options type
 *
 * @example
 * ```ts
 * const schema = new BlobSchema({ accept: ['image/*'], maxSize: 1000000 })
 * const result = schema.validate(blobRef)
 * ```
 */
class BlobSchema extends core_js_1.Schema {
    options;
    type = 'blob';
    constructor(options) {
        super();
        this.options = options;
    }
    validateInContext(input, ctx) {
        const blob = parseValue.call(ctx, input);
        if (!blob) {
            return ctx.issueUnexpectedType(input, 'blob');
        }
        // In non-strict mode, we allow blob refs to pass through without MIME
        // type or size checks.
        if (ctx.options.strict && this.options != null) {
            const { accept } = this.options;
            if (accept && !matchesMime(blob.mimeType, accept)) {
                return ctx.issueInvalidPropertyValue(blob, 'mimeType', accept);
            }
            const { maxSize } = this.options;
            if (maxSize != null) {
                const size = (0, lex_data_1.getBlobSize)(blob);
                if (size === undefined) {
                    // Unable to enforce size constraint if size is not available (legacy
                    // blob ref), so we treat it as a validation failure in strict mode.
                    return ctx.issueInvalidPropertyType(blob, 'size', 'integer');
                }
                else if (size > maxSize) {
                    return ctx.issueTooBig(blob, 'blob', maxSize, size);
                }
            }
        }
        return ctx.success(blob);
    }
    matchesMime(mime) {
        const accept = this.options?.accept;
        if (!accept)
            return true;
        return matchesMime(mime, accept);
    }
}
exports.BlobSchema = BlobSchema;
function parseValue(input) {
    // If there is a $type property, we treat if as a potential TypedBlobRef and
    // validate accordingly.
    if (input?.$type !== undefined) {
        // Use the context's option for the "strict" check
        return (0, lex_data_1.isTypedBlobRef)(input, this.options) ? input : null;
    }
    // If there is no $type property, we may be dealing with a legacy blob ref. If
    // legacy refs are allowed (non-strict mode), we check if the input matches
    // the legacy format.
    if (!this.options.strict) {
        if ((0, lex_data_1.isLegacyBlobRef)(input, this.options))
            return input;
    }
    return null;
}
function matchesMime(mime, accepted) {
    if (accepted.includes('*/*'))
        return true;
    if (accepted.includes(mime))
        return true;
    for (const value of accepted) {
        if (value.endsWith('/*') && mime.startsWith(value.slice(0, -1))) {
            return true;
        }
    }
    return false;
}
/**
 * Creates a blob schema for validating blob references with optional constraints.
 *
 * Blob references are used in AT Protocol to reference binary data stored
 * separately from records. They contain a CID, MIME type, and size information.
 *
 * @param options - Optional configuration for MIME type filtering and size limits
 * @returns A new {@link BlobSchema} instance
 *
 * @example
 * ```ts
 * // Basic blob reference
 * const fileSchema = l.blob()
 *
 * // Image files only
 * const imageSchema = l.blob({ accept: ['image/png', 'image/jpeg', 'image/gif'] })
 *
 * // Any image type with size limit
 * const avatarSchema = l.blob({ accept: ['image/*'], maxSize: 1000000 })
 * ```
 */
exports.blob = (0, memoize_js_1.memoizedOptions)(function (options) {
    return new BlobSchema(options);
});
//# sourceMappingURL=blob.js.map
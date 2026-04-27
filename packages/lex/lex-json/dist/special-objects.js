"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSpecialJsonObject = encodeSpecialJsonObject;
exports.parseSpecialJsonObject = parseSpecialJsonObject;
const lex_data_1 = require("@atproto/lex-data");
const blob_js_1 = require("./blob.js");
const bytes_js_1 = require("./bytes.js");
const link_js_1 = require("./link.js");
/**
 * @internal
 */
function encodeSpecialJsonObject(input) {
    if ((0, lex_data_1.isCid)(input)) {
        return (0, link_js_1.encodeLexLink)(input);
    }
    else if (ArrayBuffer.isView(input)) {
        return (0, bytes_js_1.encodeLexBytes)(input);
    }
}
/**
 * @internal
 */
function parseSpecialJsonObject(input, options) {
    // Hot path: use hints to avoid parsing when possible
    if (input.$link !== undefined) {
        const cid = (0, link_js_1.parseLexLink)(input);
        if (cid)
            return cid;
        if (options?.strict)
            throw new TypeError(`Invalid $link object`);
    }
    else if (input.$bytes !== undefined) {
        const bytes = (0, bytes_js_1.parseLexBytes)(input);
        if (bytes)
            return bytes;
        if (options?.strict)
            throw new TypeError(`Invalid $bytes object`);
    }
    else if (input.$type !== undefined) {
        // @NOTE Since blobs are "just" regular lex objects with a special shape,
        // and because an object that does not conform to the blob shape would still
        // result in undefined being returned, we only attempt to parse blobs when
        // the strict option is enabled.
        if (options?.strict) {
            if (input.$type === 'blob') {
                const blob = (0, blob_js_1.parseTypedBlobRef)(input, options);
                if (blob)
                    return blob;
                throw new TypeError(`Invalid blob object`);
            }
            else if (typeof input.$type !== 'string') {
                throw new TypeError(`Invalid $type property (${typeof input.$type})`);
            }
            else if (input.$type.length === 0) {
                throw new TypeError(`Empty $type property`);
            }
        }
    }
    // @NOTE We ignore legacy blob representation here. They can be handled at the
    // application level if needed.
    return undefined;
}
//# sourceMappingURL=special-objects.js.map
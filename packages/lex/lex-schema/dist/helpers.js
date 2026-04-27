"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexErrorDataSchema = void 0;
exports.getMain = getMain;
const schema_js_1 = require("./schema.js");
function getMain(ns) {
    return 'main' in ns ? ns.main : ns;
}
/**
 * @see {@link https://atproto.com/specs/xrpc#error-responses}
 */
exports.lexErrorDataSchema = (0, schema_js_1.object)({
    // type name of the error (generic ASCII constant, no whitespace)
    error: (0, schema_js_1.regexp)(/^[\w_-]+$/, 'Expected ASCII constant with no whitespace'),
    // description of the error, appropriate for display to humans
    message: (0, schema_js_1.optional)((0, schema_js_1.string)()),
});
//# sourceMappingURL=helpers.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = formatError;
const zod_1 = require("zod");
const zod_error_js_1 = require("./zod-error.js");
function formatError(err, prefix) {
    if (err instanceof zod_1.ZodError)
        return (0, zod_error_js_1.formatZodError)(err, prefix);
    return prefix;
}
//# sourceMappingURL=error.js.map
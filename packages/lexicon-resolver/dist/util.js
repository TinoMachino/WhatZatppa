"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDid = isValidDid;
const syntax_1 = require("@atproto/syntax");
function isValidDid(did) {
    try {
        (0, syntax_1.ensureValidDid)(did);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=util.js.map
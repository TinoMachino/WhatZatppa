"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSID = void 0;
exports.parseNSID = parseNSID;
const syntax_1 = require("@atproto/syntax");
Object.defineProperty(exports, "NSID", { enumerable: true, get: function () { return syntax_1.NSID; } });
function parseNSID(value) {
    try {
        return syntax_1.NSID.parse(value);
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=nsid.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNsid = void 0;
const syntax_1 = require("@atproto/syntax");
const isNsid = (v) => typeof v === 'string' && (0, syntax_1.isValidNsid)(v);
exports.isNsid = isNsid;
//# sourceMappingURL=nsid.js.map
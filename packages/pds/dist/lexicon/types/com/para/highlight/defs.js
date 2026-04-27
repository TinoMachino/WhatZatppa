"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHighlightView = isHighlightView;
exports.validateHighlightView = validateHighlightView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.highlight.defs';
const hashHighlightView = 'highlightView';
function isHighlightView(v) {
    return is$typed(v, id, hashHighlightView);
}
function validateHighlightView(v) {
    return validate(v, id, hashHighlightView);
}
//# sourceMappingURL=defs.js.map
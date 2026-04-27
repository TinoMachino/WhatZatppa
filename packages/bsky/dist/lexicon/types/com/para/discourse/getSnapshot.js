"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSnapshot = isSnapshot;
exports.validateSnapshot = validateSnapshot;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.discourse.getSnapshot';
const hashSnapshot = 'snapshot';
function isSnapshot(v) {
    return is$typed(v, id, hashSnapshot);
}
function validateSnapshot(v) {
    return validate(v, id, hashSnapshot);
}
//# sourceMappingURL=getSnapshot.js.map
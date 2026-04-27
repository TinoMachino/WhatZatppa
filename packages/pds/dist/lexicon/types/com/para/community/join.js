"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOutput = isOutput;
exports.validateOutput = validateOutput;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.community.join';
const hashOutput = 'output';
function isOutput(v) {
    return is$typed(v, id, hashOutput);
}
function validateOutput(v) {
    return validate(v, id, hashOutput);
}
//# sourceMappingURL=join.js.map
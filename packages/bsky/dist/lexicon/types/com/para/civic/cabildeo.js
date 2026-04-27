"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.isRecord = isMain;
exports.validateMain = validateMain;
exports.validateRecord = validateMain;
exports.isCabildeoOption = isCabildeoOption;
exports.validateCabildeoOption = validateCabildeoOption;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.civic.cabildeo';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain, true);
}
const hashCabildeoOption = 'cabildeoOption';
function isCabildeoOption(v) {
    return is$typed(v, id, hashCabildeoOption);
}
function validateCabildeoOption(v) {
    return validate(v, id, hashCabildeoOption);
}
//# sourceMappingURL=cabildeo.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isBoardView = isBoardView;
exports.validateBoardView = validateBoardView;
exports.isOutput = isOutput;
exports.validateOutput = validateOutput;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.community.listBoards';
function toKnownErr(e) {
    return e;
}
const hashBoardView = 'boardView';
function isBoardView(v) {
    return is$typed(v, id, hashBoardView);
}
function validateBoardView(v) {
    return validate(v, id, hashBoardView);
}
const hashOutput = 'output';
function isOutput(v) {
    return is$typed(v, id, hashOutput);
}
function validateOutput(v) {
    return validate(v, id, hashOutput);
}
//# sourceMappingURL=listBoards.js.map
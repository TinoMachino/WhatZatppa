"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isGovernanceSummary = isGovernanceSummary;
exports.validateGovernanceSummary = validateGovernanceSummary;
exports.isBoardView = isBoardView;
exports.validateBoardView = validateBoardView;
exports.isOutput = isOutput;
exports.validateOutput = validateOutput;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.community.getBoard';
function toKnownErr(e) {
    return e;
}
const hashGovernanceSummary = 'governanceSummary';
function isGovernanceSummary(v) {
    return is$typed(v, id, hashGovernanceSummary);
}
function validateGovernanceSummary(v) {
    return validate(v, id, hashGovernanceSummary);
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
//# sourceMappingURL=getBoard.js.map
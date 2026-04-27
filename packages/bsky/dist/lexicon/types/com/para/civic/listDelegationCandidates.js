"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCandidateView = isCandidateView;
exports.validateCandidateView = validateCandidateView;
exports.isOutput = isOutput;
exports.validateOutput = validateOutput;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.civic.listDelegationCandidates';
const hashCandidateView = 'candidateView';
function isCandidateView(v) {
    return is$typed(v, id, hashCandidateView);
}
function validateCandidateView(v) {
    return validate(v, id, hashCandidateView);
}
const hashOutput = 'output';
function isOutput(v) {
    return is$typed(v, id, hashOutput);
}
function validateOutput(v) {
    return validate(v, id, hashOutput);
}
//# sourceMappingURL=listDelegationCandidates.js.map
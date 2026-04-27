"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSummary = isSummary;
exports.validateSummary = validateSummary;
exports.isPerson = isPerson;
exports.validatePerson = validatePerson;
exports.isModeratorView = isModeratorView;
exports.validateModeratorView = validateModeratorView;
exports.isOfficialView = isOfficialView;
exports.validateOfficialView = validateOfficialView;
exports.isApplicant = isApplicant;
exports.validateApplicant = validateApplicant;
exports.isDeputyRoleView = isDeputyRoleView;
exports.validateDeputyRoleView = validateDeputyRoleView;
exports.isMetadata = isMetadata;
exports.validateMetadata = validateMetadata;
exports.isHistoryEntry = isHistoryEntry;
exports.validateHistoryEntry = validateHistoryEntry;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.community.defs';
const hashSummary = 'summary';
function isSummary(v) {
    return is$typed(v, id, hashSummary);
}
function validateSummary(v) {
    return validate(v, id, hashSummary);
}
const hashPerson = 'person';
function isPerson(v) {
    return is$typed(v, id, hashPerson);
}
function validatePerson(v) {
    return validate(v, id, hashPerson);
}
const hashModeratorView = 'moderatorView';
function isModeratorView(v) {
    return is$typed(v, id, hashModeratorView);
}
function validateModeratorView(v) {
    return validate(v, id, hashModeratorView);
}
const hashOfficialView = 'officialView';
function isOfficialView(v) {
    return is$typed(v, id, hashOfficialView);
}
function validateOfficialView(v) {
    return validate(v, id, hashOfficialView);
}
const hashApplicant = 'applicant';
function isApplicant(v) {
    return is$typed(v, id, hashApplicant);
}
function validateApplicant(v) {
    return validate(v, id, hashApplicant);
}
const hashDeputyRoleView = 'deputyRoleView';
function isDeputyRoleView(v) {
    return is$typed(v, id, hashDeputyRoleView);
}
function validateDeputyRoleView(v) {
    return validate(v, id, hashDeputyRoleView);
}
const hashMetadata = 'metadata';
function isMetadata(v) {
    return is$typed(v, id, hashMetadata);
}
function validateMetadata(v) {
    return validate(v, id, hashMetadata);
}
const hashHistoryEntry = 'historyEntry';
function isHistoryEntry(v) {
    return is$typed(v, id, hashHistoryEntry);
}
function validateHistoryEntry(v) {
    return validate(v, id, hashHistoryEntry);
}
//# sourceMappingURL=defs.js.map
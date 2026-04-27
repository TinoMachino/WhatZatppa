"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResultAvailable = isResultAvailable;
exports.validateResultAvailable = validateResultAvailable;
exports.isResultUnavailable = isResultUnavailable;
exports.validateResultUnavailable = validateResultUnavailable;
exports.isSuggestion = isSuggestion;
exports.validateSuggestion = validateSuggestion;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.temp.checkHandleAvailability';
const hashResultAvailable = 'resultAvailable';
function isResultAvailable(v) {
    return is$typed(v, id, hashResultAvailable);
}
function validateResultAvailable(v) {
    return validate(v, id, hashResultAvailable);
}
const hashResultUnavailable = 'resultUnavailable';
function isResultUnavailable(v) {
    return is$typed(v, id, hashResultUnavailable);
}
function validateResultUnavailable(v) {
    return validate(v, id, hashResultUnavailable);
}
const hashSuggestion = 'suggestion';
function isSuggestion(v) {
    return is$typed(v, id, hashSuggestion);
}
function validateSuggestion(v) {
    return validate(v, id, hashSuggestion);
}
//# sourceMappingURL=checkHandleAvailability.js.map
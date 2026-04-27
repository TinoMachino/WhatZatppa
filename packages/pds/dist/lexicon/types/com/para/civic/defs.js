"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCabildeoOption = isCabildeoOption;
exports.validateCabildeoOption = validateCabildeoOption;
exports.isOptionSummary = isOptionSummary;
exports.validateOptionSummary = validateOptionSummary;
exports.isPositionCounts = isPositionCounts;
exports.validatePositionCounts = validatePositionCounts;
exports.isVoteTotals = isVoteTotals;
exports.validateVoteTotals = validateVoteTotals;
exports.isOutcomeSummary = isOutcomeSummary;
exports.validateOutcomeSummary = validateOutcomeSummary;
exports.isViewerContext = isViewerContext;
exports.validateViewerContext = validateViewerContext;
exports.isLiveSessionView = isLiveSessionView;
exports.validateLiveSessionView = validateLiveSessionView;
exports.isCabildeoLive = isCabildeoLive;
exports.validateCabildeoLive = validateCabildeoLive;
exports.isCabildeoView = isCabildeoView;
exports.validateCabildeoView = validateCabildeoView;
exports.isPositionView = isPositionView;
exports.validatePositionView = validatePositionView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.civic.defs';
const hashCabildeoOption = 'cabildeoOption';
function isCabildeoOption(v) {
    return is$typed(v, id, hashCabildeoOption);
}
function validateCabildeoOption(v) {
    return validate(v, id, hashCabildeoOption);
}
const hashOptionSummary = 'optionSummary';
function isOptionSummary(v) {
    return is$typed(v, id, hashOptionSummary);
}
function validateOptionSummary(v) {
    return validate(v, id, hashOptionSummary);
}
const hashPositionCounts = 'positionCounts';
function isPositionCounts(v) {
    return is$typed(v, id, hashPositionCounts);
}
function validatePositionCounts(v) {
    return validate(v, id, hashPositionCounts);
}
const hashVoteTotals = 'voteTotals';
function isVoteTotals(v) {
    return is$typed(v, id, hashVoteTotals);
}
function validateVoteTotals(v) {
    return validate(v, id, hashVoteTotals);
}
const hashOutcomeSummary = 'outcomeSummary';
function isOutcomeSummary(v) {
    return is$typed(v, id, hashOutcomeSummary);
}
function validateOutcomeSummary(v) {
    return validate(v, id, hashOutcomeSummary);
}
const hashViewerContext = 'viewerContext';
function isViewerContext(v) {
    return is$typed(v, id, hashViewerContext);
}
function validateViewerContext(v) {
    return validate(v, id, hashViewerContext);
}
const hashLiveSessionView = 'liveSessionView';
function isLiveSessionView(v) {
    return is$typed(v, id, hashLiveSessionView);
}
function validateLiveSessionView(v) {
    return validate(v, id, hashLiveSessionView);
}
const hashCabildeoLive = 'cabildeoLive';
function isCabildeoLive(v) {
    return is$typed(v, id, hashCabildeoLive);
}
function validateCabildeoLive(v) {
    return validate(v, id, hashCabildeoLive);
}
const hashCabildeoView = 'cabildeoView';
function isCabildeoView(v) {
    return is$typed(v, id, hashCabildeoView);
}
function validateCabildeoView(v) {
    return validate(v, id, hashCabildeoView);
}
const hashPositionView = 'positionView';
function isPositionView(v) {
    return is$typed(v, id, hashPositionView);
}
function validatePositionView(v) {
    return validate(v, id, hashPositionView);
}
//# sourceMappingURL=defs.js.map
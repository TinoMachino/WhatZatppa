"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfileStats = isProfileStats;
exports.validateProfileStats = validateProfileStats;
exports.isContributions = isContributions;
exports.validateContributions = validateContributions;
exports.isStatusView = isStatusView;
exports.validateStatusView = validateStatusView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.actor.defs';
const hashProfileStats = 'profileStats';
function isProfileStats(v) {
    return is$typed(v, id, hashProfileStats);
}
function validateProfileStats(v) {
    return validate(v, id, hashProfileStats);
}
const hashContributions = 'contributions';
function isContributions(v) {
    return is$typed(v, id, hashContributions);
}
function validateContributions(v) {
    return validate(v, id, hashContributions);
}
const hashStatusView = 'statusView';
function isStatusView(v) {
    return is$typed(v, id, hashStatusView);
}
function validateStatusView(v) {
    return validate(v, id, hashStatusView);
}
//# sourceMappingURL=defs.js.map
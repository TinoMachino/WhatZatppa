"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isSentimentDistribution = isSentimentDistribution;
exports.validateSentimentDistribution = validateSentimentDistribution;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.discourse.getSentiment';
function toKnownErr(e) {
    return e;
}
const hashSentimentDistribution = 'sentimentDistribution';
function isSentimentDistribution(v) {
    return is$typed(v, id, hashSentimentDistribution);
}
function validateSentimentDistribution(v) {
    return validate(v, id, hashSentimentDistribution);
}
//# sourceMappingURL=getSentiment.js.map
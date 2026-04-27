"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTopic = isTopic;
exports.validateTopic = validateTopic;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.discourse.getTopics';
const hashTopic = 'topic';
function isTopic(v) {
    return is$typed(v, id, hashTopic);
}
function validateTopic(v) {
    return validate(v, id, hashTopic);
}
//# sourceMappingURL=getTopics.js.map
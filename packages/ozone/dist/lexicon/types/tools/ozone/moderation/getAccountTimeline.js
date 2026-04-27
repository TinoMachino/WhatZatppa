"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimelineItem = isTimelineItem;
exports.validateTimelineItem = validateTimelineItem;
exports.isTimelineItemSummary = isTimelineItemSummary;
exports.validateTimelineItemSummary = validateTimelineItemSummary;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.moderation.getAccountTimeline';
const hashTimelineItem = 'timelineItem';
function isTimelineItem(v) {
    return is$typed(v, id, hashTimelineItem);
}
function validateTimelineItem(v) {
    return validate(v, id, hashTimelineItem);
}
const hashTimelineItemSummary = 'timelineItemSummary';
function isTimelineItemSummary(v) {
    return is$typed(v, id, hashTimelineItemSummary);
}
function validateTimelineItemSummary(v) {
    return validate(v, id, hashTimelineItemSummary);
}
//# sourceMappingURL=getAccountTimeline.js.map
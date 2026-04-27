"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPostView = isPostView;
exports.validatePostView = validatePostView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.feed.getAuthorFeed';
const hashPostView = 'postView';
function isPostView(v) {
    return is$typed(v, id, hashPostView);
}
function validatePostView(v) {
    return validate(v, id, hashPostView);
}
//# sourceMappingURL=getAuthorFeed.js.map
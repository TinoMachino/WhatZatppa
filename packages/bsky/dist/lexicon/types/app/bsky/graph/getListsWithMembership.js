"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isListWithMembership = isListWithMembership;
exports.validateListWithMembership = validateListWithMembership;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.graph.getListsWithMembership';
const hashListWithMembership = 'listWithMembership';
function isListWithMembership(v) {
    return is$typed(v, id, hashListWithMembership);
}
function validateListWithMembership(v) {
    return validate(v, id, hashListWithMembership);
}
//# sourceMappingURL=getListsWithMembership.js.map
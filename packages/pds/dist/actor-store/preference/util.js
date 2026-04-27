"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefAllowed = prefAllowed;
exports.isFullAccessOnlyPref = isFullAccessOnlyPref;
exports.isReadOnlyPref = isReadOnlyPref;
exports.getAgeFromDatestring = getAgeFromDatestring;
const index_js_1 = require("../../lexicons/index.js");
function prefAllowed(prefType, options) {
    if (options?.hasAccessFull === true) {
        return true;
    }
    return !isFullAccessOnlyPref(prefType);
}
function isFullAccessOnlyPref(type) {
    return type === index_js_1.app.bsky.actor.defs.personalDetailsPref.$type;
}
function isReadOnlyPref(type) {
    return type === index_js_1.app.bsky.actor.defs.declaredAgePref.$type;
}
function getAgeFromDatestring(birthDate) {
    const bday = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - bday.getFullYear();
    const m = today.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
        age--;
    }
    return age;
}
//# sourceMappingURL=util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minIdx = minIdx;
exports.knownValuesValidator = knownValuesValidator;
exports.isNonNullable = isNonNullable;
function minIdx(a, b) {
    if (a === -1)
        return b;
    if (b === -1)
        return a;
    return Math.min(a, b);
}
function knownValuesValidator(values) {
    const set = new Set(values);
    return (value) => set.has(value);
}
function isNonNullable(value) {
    return value != null;
}
//# sourceMappingURL=util.js.map
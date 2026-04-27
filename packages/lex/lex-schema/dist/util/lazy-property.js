"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyProperty = lazyProperty;
/*@__NO_SIDE_EFFECTS__*/
function lazyProperty(obj, key, value) {
    Object.defineProperty(obj, key, {
        value,
        writable: false,
        enumerable: false,
        configurable: true,
    });
    return value;
}
//# sourceMappingURL=lazy-property.js.map
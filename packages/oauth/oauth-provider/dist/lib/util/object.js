"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDefaults = mergeDefaults;
function mergeDefaults(defaults, ...overrides) {
    // @NOTE Not using the spread operator here because TS allows "undefined"
    // values to be spread, which can lead to defaults being overwritten with
    // "undefined". This function ensures that only defined values in "options"
    // will overwrite the corresponding values in "defaults".
    if (!overrides.length)
        return defaults;
    if (!overrides.some(Boolean))
        return defaults;
    const result = { ...defaults };
    for (const options of overrides) {
        if (options) {
            for (const key in options) {
                const value = options[key];
                if (value !== undefined) {
                    result[key] = value;
                }
            }
        }
    }
    return result;
}
//# sourceMappingURL=object.js.map
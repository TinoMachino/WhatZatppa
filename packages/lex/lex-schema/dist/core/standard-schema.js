"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardSchemaAdapter = void 0;
const validator_js_1 = require("./validator.js");
/**
 * The Standard Schema adapter for {@link Validator} instances.
 */
class StandardSchemaAdapter {
    validator;
    version = 1;
    vendor = '@atproto/lex-schema';
    constructor(validator) {
        this.validator = validator;
    }
    validate(value, options) {
        // Perform validation in "parse" mode to ensure transformations (defaults,
        // coercions, etc.) are applied. Also ensures that the output type is
        // returned. Note that ValidationResult is compatible with
        // StandardSchemaV1.Result :-)
        return validator_js_1.ValidationContext.validate(value, this.validator, {
            ...options?.libraryOptions,
            mode: 'parse',
        });
    }
}
exports.StandardSchemaAdapter = StandardSchemaAdapter;
//# sourceMappingURL=standard-schema.js.map
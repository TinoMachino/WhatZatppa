"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const syntax_string_js_1 = require("./syntax-string.js");
class Parser {
    constructor(prefix, schema, positionalName) {
        Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: prefix
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: schema
        });
        Object.defineProperty(this, "positionalName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: positionalName
        });
        Object.defineProperty(this, "schemaKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.schemaKeys = new Set(Object.keys(schema));
    }
    format(values) {
        const params = new URLSearchParams();
        let positional = undefined;
        for (const key of this.schemaKeys) {
            const value = values[key];
            // Ignore undefined values
            if (value === undefined)
                continue;
            const schema = this.schema[key];
            // Normalize the value if a normalization function is provided
            const normalized = schema.normalize
                ? schema.normalize(value)
                : value;
            // Ignore values that are equal to the default value
            if (!schema.required) {
                if (schema.default === normalized)
                    continue;
                if (schema.multiple &&
                    schema.default &&
                    arrayParamEquals(schema.default, normalized)) {
                    continue;
                }
            }
            if (Array.isArray(normalized)) {
                if (key === this.positionalName && normalized.length === 1) {
                    positional = String(normalized[0]);
                }
                else {
                    // remove duplicates
                    const unique = new Set(normalized.map(String));
                    for (const v of unique)
                        params.append(key, v);
                }
            }
            else {
                if (key === this.positionalName) {
                    positional = String(normalized);
                }
                else {
                    params.set(key, String(normalized));
                }
            }
        }
        return new syntax_string_js_1.ScopeStringSyntax(this.prefix, positional, params).toString();
    }
    // @NOTE If we needed to ever have more detailed reason as to why parsing
    // fails, this function could easily be updated to return a
    // ValidationResult<T> type that explains the reason for failure.
    parse(syntax) {
        // @NOTE no need to check prefix, since the typing (P generic) already
        // ensures it matches
        for (const key of syntax.keys()) {
            if (!this.schemaKeys.has(key))
                return null;
        }
        const result = Object.create(null);
        for (const key of this.schemaKeys) {
            const definition = this.schema[key];
            const param = definition.multiple
                ? syntax.getMulti(key)
                : syntax.getSingle(key);
            if (param === null) {
                return null; // Value is not valid
            }
            else if (param !== undefined) {
                if (key === this.positionalName && syntax.positional !== undefined) {
                    // Positional parameter cannot be used with named parameters
                    return null;
                }
                if (definition.multiple) {
                    // Empty array is not valid
                    if (!param.length)
                        return null;
                    if (!param.every(definition.validate)) {
                        return null;
                    }
                }
                else {
                    if (!definition.validate(param)) {
                        return null;
                    }
                }
                result[key] = param;
            }
            else if (key === this.positionalName &&
                syntax.positional !== undefined) {
                // No named parameters found, but there is a positional parameter
                const { positional } = syntax;
                if (!definition.validate(positional)) {
                    return null;
                }
                result[key] = definition.multiple ? [positional] : positional;
            }
            else if (definition.required) {
                return null;
            }
            else {
                result[key] = definition.default;
            }
        }
        return result;
    }
}
exports.Parser = Parser;
/**
 * Two param arrays are considered equal if they contain the same values,
 * regardless of the order and duplicates.
 * @param a - The first array to compare.
 * @param b - The second array to compare.
 */
function arrayParamEquals(a, b) {
    for (const item of a)
        if (!b.includes(item))
            return false;
    for (const item of b)
        if (!a.includes(item))
            return false;
    return true;
}
//# sourceMappingURL=parser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.params = exports.ParamsSchema = exports.paramsSchema = exports.paramSchema = void 0;
const lex_data_1 = require("@atproto/lex-data");
const core_js_1 = require("../core.js");
const lazy_property_js_1 = require("../util/lazy-property.js");
const memoize_js_1 = require("../util/memoize.js");
const array_js_1 = require("./array.js");
const boolean_js_1 = require("./boolean.js");
const dict_js_1 = require("./dict.js");
const enum_js_1 = require("./enum.js");
const integer_js_1 = require("./integer.js");
const literal_js_1 = require("./literal.js");
const optional_js_1 = require("./optional.js");
const string_js_1 = require("./string.js");
const union_js_1 = require("./union.js");
const with_default_js_1 = require("./with-default.js");
const paramScalarSchema = (0, union_js_1.union)([(0, boolean_js_1.boolean)(), (0, integer_js_1.integer)(), (0, string_js_1.string)()]);
/**
 * Schema for validating individual parameter values.
 */
exports.paramSchema = (0, union_js_1.union)([
    paramScalarSchema,
    (0, array_js_1.array)((0, boolean_js_1.boolean)()),
    (0, array_js_1.array)((0, integer_js_1.integer)()),
    (0, array_js_1.array)((0, string_js_1.string)()),
]);
/**
 * Schema for validating arbitrary params objects.
 */
exports.paramsSchema = (0, dict_js_1.dict)((0, string_js_1.string)(), (0, optional_js_1.optional)(exports.paramSchema));
/**
 * Schema for validating URL query parameters in Lexicon endpoints.
 *
 * Params are the query string parameters passed to queries, procedures,
 * and subscriptions. Values must be scalars (boolean, integer, string)
 * or arrays of scalars, as they need to be serializable to URL format.
 *
 * Provides methods for converting to/from URLSearchParams.
 *
 * @template TShape - The params shape type mapping names to validators
 *
 * @example
 * ```ts
 * const schema = new ParamsSchema({
 *   limit: l.optional(l.integer({ minimum: 1, maximum: 100 })),
 *   cursor: l.optional(l.string()),
 * })
 * ```
 */
class ParamsSchema extends core_js_1.Schema {
    shape;
    type = 'params';
    constructor(shape) {
        super();
        this.shape = shape;
    }
    get shapeValidators() {
        const map = new Map(Object.entries(this.shape));
        return (0, lazy_property_js_1.lazyProperty)(this, 'shapeValidators', map);
    }
    validateInContext(input, ctx) {
        if (!(0, lex_data_1.isPlainObject)(input)) {
            return ctx.issueUnexpectedType(input, 'object');
        }
        // Lazily copy value
        let copy;
        // Ensure that non-specified params conform to param schema
        for (const key in input) {
            if (this.shapeValidators.has(key))
                continue;
            const result = ctx.validateChild(input, key, exports.paramSchema);
            if (!result.success)
                return result;
            if (result.value !== input[key]) {
                if (ctx.options.mode === 'validate') {
                    // In "validate" mode, we can't modify the input, so we issue an error
                    return ctx.issueInvalidPropertyValue(input, key, [result.value]);
                }
                copy ??= { ...input };
                copy[key] = result.value;
            }
        }
        for (const [key, propDef] of this.shapeValidators) {
            const result = ctx.validateChild(input, key, propDef);
            if (!result.success) {
                if (!(key in input)) {
                    // Transform into "required key" issue
                    return ctx.issueRequiredKey(input, key);
                }
                return result;
            }
            // Skip copying if key is not present in input (and value is undefined)
            if (result.value === undefined && !(key in input)) {
                continue;
            }
            if (!Object.is(result.value, input[key])) {
                if (ctx.options.mode === 'validate') {
                    // In "validate" mode, we can't modify the input, so we issue an error
                    return ctx.issueInvalidPropertyValue(input, key, [result.value]);
                }
                // Copy on write
                copy ??= { ...input };
                copy[key] = result.value;
            }
        }
        return ctx.success(copy ?? input);
    }
    fromURLSearchParams(input, options) {
        const params = {};
        const iterable = typeof input === 'string' ? new URLSearchParams(input) : input;
        const entries = iterable instanceof URLSearchParams ? iterable.entries() : iterable;
        for (const [name, value] of entries) {
            // Ignore empty strings
            if (!value)
                continue;
            const validator = this.shapeValidators.get(name);
            const innerValidator = validator ? unwrapSchema(validator) : undefined;
            const expectsArray = innerValidator instanceof array_js_1.ArraySchema;
            const scalarValidator = expectsArray
                ? unwrapSchema(innerValidator.validator)
                : innerValidator;
            const coerced = coerceParam(name, value, scalarValidator, options);
            const currentParam = params[name];
            if (currentParam === undefined) {
                params[name] = expectsArray ? [coerced] : coerced;
            }
            else if (Array.isArray(currentParam)) {
                currentParam.push(coerced);
            }
            else {
                params[name] = [currentParam, coerced];
            }
        }
        return this.parse(params, options);
    }
    toURLSearchParams(input) {
        const urlSearchParams = new URLSearchParams();
        // @NOTE We apply defaults here to ensure that server with different
        // defaults still receive all expected parameters.
        const params = this.parse(input);
        for (const [key, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                for (const v of value) {
                    urlSearchParams.append(key, String(v));
                }
            }
            else if (value !== undefined) {
                urlSearchParams.append(key, String(value));
            }
        }
        return urlSearchParams;
    }
}
exports.ParamsSchema = ParamsSchema;
function coerceParam(name, param, schema, options) {
    let issue;
    if (!schema) {
        // The param is unknown (not defined in schema), so we don't apply any
        // coercion and just return the string value.
        return param;
    }
    else if (schema instanceof string_js_1.StringSchema) {
        return param;
    }
    else if (schema instanceof integer_js_1.IntegerSchema) {
        if (/^-?\d+$/.test(param))
            return Number(param);
        issue = new core_js_1.IssueInvalidType(paramPath(name, options), param, ['integer']);
    }
    else if (schema instanceof boolean_js_1.BooleanSchema) {
        if (param === 'true')
            return true;
        if (param === 'false')
            return false;
        issue = new core_js_1.IssueInvalidType(paramPath(name, options), param, ['boolean']);
    }
    else if (schema instanceof literal_js_1.LiteralSchema) {
        const { value } = schema;
        if (String(value) === param)
            return value;
        issue = new core_js_1.IssueInvalidValue(paramPath(name, options), param, [value]);
    }
    else if (schema instanceof enum_js_1.EnumSchema) {
        const { values } = schema;
        for (const value of values) {
            if (String(value) === param)
                return value;
        }
        issue = new core_js_1.IssueInvalidValue(paramPath(name, options), param, values);
    }
    else {
        // This should never happen. If it *does*, it means that the user of
        // lex-schema is mixing different versions of the lib, which is not
        // supported. Throwing an error here is better than silently accepting
        // invalid params and causing unexpected behavior down the line (ie. error
        // message returning the string value instead of the expected
        // boolean/number/string value).
        throw new Error(`Unsupported schema type for param coercion: ${schema}`);
    }
    // We were not able to coerce the param to the expected type. There is no
    // point in returning the original string value since it doesn't conform to
    // the expected schema, so we throw a validation error instead. We could
    // return the "param" here, which would cause the validation to fail later on
    // (see fromURLSearchParams()'s return statement). The main benefit of
    // returning the original "param" value is that the error path would include
    // the index of the param in case of array params (e.g. "tags[1]"), which
    // could be helpful for debugging. The cost overhead is not worth it though
    // (IMO).
    throw new core_js_1.LexValidationError([issue]);
}
function paramPath(key, options) {
    return options?.path ? [...options.path, key] : [key];
}
/**
 * Creates a params schema for URL query parameters.
 *
 * Params schemas validate query string parameters for Lexicon endpoints.
 * Values must be boolean, integer, string, or arrays of those types.
 *
 * @param properties - Object mapping parameter names to their validators
 * @returns A new {@link ParamsSchema} instance
 *
 * @example
 * ```ts
 * // Simple pagination params
 * const paginationParams = l.params({
 *   limit: l.optional(l.withDefault(l.integer({ minimum: 1, maximum: 100 }), 50)),
 *   cursor: l.optional(l.string()),
 * })
 *
 * // Required parameter
 * const actorParams = l.params({
 *   actor: l.string({ format: 'at-identifier' }),
 * })
 *
 * // Array parameter (multiple values)
 * const filterParams = l.params({
 *   tags: l.optional(l.array(l.string())),
 * })
 *
 * // Convert from URL
 * const urlParams = new URLSearchParams('limit=25&cursor=abc')
 * const validated = paginationParams.fromURLSearchParams(urlParams)
 *
 * // Convert to URL
 * const searchParams = paginationParams.toURLSearchParams({ limit: 25 })
 * ```
 */
exports.params = (0, memoize_js_1.memoizedOptions)(function params(properties = {}) {
    return new ParamsSchema(properties);
});
function unwrapSchema(schema) {
    while (schema instanceof optional_js_1.OptionalSchema ||
        schema instanceof with_default_js_1.WithDefaultSchema) {
        return unwrapSchema(schema.validator);
    }
    return schema;
}
//# sourceMappingURL=params.js.map
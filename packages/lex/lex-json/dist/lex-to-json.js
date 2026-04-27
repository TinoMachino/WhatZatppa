"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_RECURSION_DEPTH_DEFAULT = void 0;
exports.lexToJson = lexToJson;
const lex_data_1 = require("@atproto/lex-data");
const iterative_transform_js_1 = require("./iterative-transform.js");
const validate_max_utf8_length_js_1 = require("./lib/validate-max-utf8-length.js");
const special_objects_js_1 = require("./special-objects.js");
/**
 * Using a too low threshold (e.g. 10) can cause performance degradation due to
 * switching to iterative implementation too early, while using a too high
 * threshold (e.g. 10_000) can cause call stack overflow errors with deeply
 * nested structures. Empirical tests have shown that a threshold of around
 * 1,000 provides a good balance.
 *
 * @see lexToJson
 */
exports.MAX_RECURSION_DEPTH_DEFAULT = 1000;
/**
 * Converts a Lexicon value ({@link LexValue}) to a JSON-compatible value
 * ({@link JsonValue}) by transforming the input value and its nested
 * structures to their JSON equivalents:
 *
 * - `Cid` instances are converted to `{$link: string}` objects
 * - `Uint8Array` instances are converted to `{$bytes: string}` objects (base64)
 *
 * Use this when you need to convert Lex values to plain objects (e.g., for
 * custom serialization or inspection). For direct serialization into JSON, use
 * {@link lexStringify} instead.
 *
 * @throws {TypeError} If the value contains unsupported types
 *
 * @note
 * Since lexToJson is often used as a step to re-serialize internal Lexicon data
 * to JSON/CBOR, we use "non-strict" defaults here. Strictness is expected to be
 * enforced at when the data is first parsed from JSON/CBOR (e.g. with
 * {@link lexParse}), so we can be more lenient in this transformation step.
 *
 * @example
 * ```typescript
 * import { lexToJson } from '@atproto/lex'
 *
 * // Convert Lex values to JSON-compatible objects
 * const obj = lexToJson({
 *   ref: someCid,      // Converted to { $link: string }
 *   data: someBytes    // Converted to { $bytes: string }
 * })
 * ```
 */
function lexToJson(input, { strict = false, allowNonSafeIntegers = !strict, maxNestedLevels = strict
    ? lex_data_1.MAX_CBOR_NESTED_LEVELS
    : lex_data_1.MAX_PAYLOAD_NESTED_LEVELS, maxContainerLength = strict ? lex_data_1.MAX_CBOR_CONTAINER_LEN : Infinity, maxObjectKeyLen = strict ? lex_data_1.MAX_CBOR_OBJECT_KEY_LEN : Infinity, maxRecursionDepth = exports.MAX_RECURSION_DEPTH_DEFAULT, } = {}) {
    // See ./lex-to-json.bench.ts for performance comparison of recursive vs.
    // iterative implementations of this function. The recursive implementation is
    // more performant but fails at deep nesting levels (e.g. > 1,000). We use a
    // hybrid approach where we start with the recursive implementation, but if we
    // detect that the nesting level is too deep, we switch to the iterative
    // implementation using iterativeTransform, which can handle arbitrary nesting
    // levels.
    if (maxRecursionDepth <= 0) {
        return (0, iterative_transform_js_1.iterativeTransform)(input, special_objects_js_1.encodeSpecialJsonObject, {
            strict,
            allowNonSafeIntegers,
            maxNestedLevels,
            maxContainerLength,
            maxObjectKeyLen,
        });
    }
    return lexToJsonHybrid(input, {
        currentDepth: 1,
        maxRecursionDepth: 
        // Optimization: we use Math.min when creating the context so that the
        // most common case (currentDepth < maxRecursionDepth && currentDepth <
        // maxNestedLevels) can be checked with a single condition when processing
        // nested structures (type "object")
        Math.min(maxRecursionDepth, maxNestedLevels),
        strict,
        allowNonSafeIntegers,
        maxNestedLevels,
        maxContainerLength,
        maxObjectKeyLen,
    });
}
function lexToJsonHybrid(input, context) {
    switch (typeof input) {
        case 'object': {
            if (input === null) {
                return input;
            }
            if (context.currentDepth >= context.maxRecursionDepth) {
                if (context.currentDepth >= context.maxNestedLevels) {
                    throw new TypeError(`Input is too deeply nested`);
                }
                // Switch to iterative implementation to handle deeper nesting levels
                // without hitting recursive call stack limits.
                return (0, iterative_transform_js_1.iterativeTransform)(input, special_objects_js_1.encodeSpecialJsonObject, {
                    ...context,
                    // We need to adjust maxNestedLevels to account for the current depth,
                    // so that the iterative implementation can enforce the correct
                    // nesting limit.
                    maxNestedLevels: context.maxNestedLevels - context.currentDepth,
                });
            }
            if (Array.isArray(input)) {
                return lexArrayToJsonHybrid(input, context);
            }
            else {
                return ((0, special_objects_js_1.encodeSpecialJsonObject)(input) ??
                    lexMapToJsonHybrid(input, context));
            }
        }
        case 'string':
        case 'boolean':
            return input;
        case 'number':
            if (context.allowNonSafeIntegers)
                return input;
            if (Number.isSafeInteger(input))
                return input;
            throw new TypeError(`Invalid non-safe integer: ${input}`);
        default:
            throw new TypeError(`Invalid Lex value: ${typeof input}`);
    }
}
function lexArrayToJsonHybrid(input, context) {
    if (input.length > context.maxContainerLength) {
        throw new TypeError(`Array is too long (length ${input.length})`);
    }
    if (!input.length) {
        return input;
    }
    context.currentDepth++;
    // Lazily copy value
    let copy;
    for (let index = 0; index < input.length; index++) {
        const inputItem = input[index];
        const item = lexToJsonHybrid(inputItem, context);
        if (item !== inputItem) {
            copy ?? (copy = [...input]);
            copy[index] = item;
        }
    }
    context.currentDepth--;
    return (copy ?? input);
}
function lexMapToJsonHybrid(input, context) {
    const entries = Object.entries(input);
    if (entries.length > context.maxContainerLength) {
        throw new TypeError(`Object has too many entries (length ${entries.length})`);
    }
    if (!entries.length) {
        return input;
    }
    context.currentDepth++;
    // Lazily copy value
    let copy = undefined;
    for (const [key, lexValue] of entries) {
        // Prevent prototype pollution
        if (key === '__proto__') {
            throw new TypeError(`Forbidden "__proto__" key`);
        }
        if (!(0, validate_max_utf8_length_js_1.validateMaxUtf8Length)(key, context.maxObjectKeyLen)) {
            const keyStr = `${JSON.stringify(key.slice(0, 10)).slice(0, -1)}\u2026"`;
            throw new TypeError(`Object key is too long (${keyStr})`);
        }
        // Ignore (strip) undefined values
        if (lexValue === undefined) {
            copy ?? (copy = { ...input });
            delete copy[key];
        }
        else {
            const jsonValue = lexToJsonHybrid(lexValue, context);
            if (jsonValue !== lexValue) {
                copy ?? (copy = { ...input });
                copy[key] = jsonValue;
            }
        }
    }
    context.currentDepth--;
    return (copy ?? input);
}
//# sourceMappingURL=lex-to-json.js.map
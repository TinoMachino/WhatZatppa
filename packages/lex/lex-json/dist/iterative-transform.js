"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterativeTransform = iterativeTransform;
const stack_js_1 = require("./lib/stack.js");
const OMIT = Symbol('OMIT');
const OBJECT = Symbol('object');
/**
 * Recursively transforms a value by applying a replacer function to all nested
 * *objects*. If the replacer function returns a non-undefined value, that value
 * is used in place of the original (without further transformation of its
 * children). If the replacer function returns undefined, the original value is
 * used (after transforming its children).
 *
 * If any transformation was applied to a branch of the nested input structure,
 * the function returns a new object/array with the transformations applied
 * (i.e. it does not mutate the original input). If no transformations were
 * applied, the original input is returned.
 *
 * This function supports deeply nested structures that exceed the maximum call
 * stack size, by using an iterative approach with an explicit stack instead of
 * recursion. It also handles cyclic references by keeping track of visited
 * parent objects.
 *
 * The main purpose of this function if to transform data structures, without
 * hitting call stack limits, and without mutating the original input.
 *
 * **IMPORTANT NOTE** the replacer should ALWAYS return a custom value for
 * non-plain objects (e.g. Cids, Blobs, etc.) to avoid traversing into them,
 * which can cause issues (cyclic references, copy of custom classes into plain
 * objects, etc.).
 *
 * @internal
 */
function iterativeTransform(input, replacer, options = {}) {
    const inputValue = transformValue(input, replacer, options);
    if (inputValue !== OBJECT) {
        if (inputValue === OMIT) {
            throw new TypeError('Invalid undefined value');
        }
        return inputValue;
    }
    const stack = new stack_js_1.Stack(input, options);
    for (let frame = stack.pop(); frame !== undefined; frame = stack.pop()) {
        if ((0, stack_js_1.isArrayFrame)(frame)) {
            const { input } = frame; // ArrayFrame
            for (let index = 0; index < input.length; index++) {
                const value = input[index];
                const result = transformValue(value, replacer, options);
                if (result === OBJECT) {
                    stack.pushNested(value, { frame, index });
                }
                else if (result === OMIT) {
                    // Undefined values in arrays are not allowed by lex-data.
                    throw new TypeError(`Invalid undefined value`);
                }
                else {
                    // Leaf value. If the replacer returned a different value, we need to
                    // create a copy. Otherwise we can keep the original input value since
                    // it is unchanged.
                    if (result !== value) {
                        const copy = (0, stack_js_1.getCopy)(frame);
                        copy[index] = result;
                    }
                }
            }
        }
        else {
            const { entries } = frame; // ObjectFrame
            for (let index = 0; index < entries.length; index++) {
                const value = entries[index][1];
                const result = transformValue(value, replacer, options);
                if (result === OBJECT) {
                    stack.pushNested(value, { frame, index });
                }
                else if (result === OMIT) {
                    // Omit this property (undefined values should be removed)
                    const copy = (0, stack_js_1.getCopy)(frame);
                    delete copy[entries[index][0]];
                }
                else {
                    // Leaf value. If the replacer returned a different value, we need to
                    // create a copy. Otherwise we can keep the original input value since
                    // it is unchanged.
                    if (result !== value) {
                        const copy = (0, stack_js_1.getCopy)(frame);
                        copy[entries[index][0]] = result;
                    }
                }
            }
        }
    }
    return stack.root.copy ?? stack.root.input;
}
function transformValue(value, replacer, options) {
    switch (typeof value) {
        case 'object': {
            if (value === null)
                return value;
            if (Array.isArray(value))
                return OBJECT;
            const transformed = replacer(value, options);
            if (transformed !== undefined)
                return transformed;
            return OBJECT;
        }
        case 'number': {
            if (options.allowNonSafeIntegers ?? true)
                return value;
            if (Number.isSafeInteger(value))
                return value;
            throw new TypeError(`Invalid number (got ${value})`);
        }
        case 'boolean':
        case 'string':
            return value;
        case 'undefined':
            // Return sentinel to indicate this property should be omitted
            // (matching JSON.stringify behavior for object properties)
            return OMIT;
        default:
            throw new TypeError(`Invalid ${typeof value} value`);
    }
}
//# sourceMappingURL=iterative-transform.js.map
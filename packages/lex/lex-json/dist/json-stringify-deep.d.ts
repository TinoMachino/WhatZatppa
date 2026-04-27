import { JsonValue } from './json.js';
import { StackOptions } from './lib/stack.js';
export type JsonStringifyDeepOptions = StackOptions & EncodePrimitiveOptions;
/**
 * A custom JSON stringifier that can handle deeply nested structures without
 * hitting call stack limits. It uses an iterative approach with an explicit
 * stack to traverse the input structure.
 *
 * This function is designed to handle JSON values that may be deeply nested,
 * which can cause `JSON.stringify` to throw a `RangeError` due to exceeding the
 * maximum call stack size. By using an iterative approach, this function can
 * serialize structures with much greater depth without crashing.
 */
export declare function jsonStringifyDeep(input: JsonValue, options?: JsonStringifyDeepOptions): string;
type EncodePrimitiveOptions = {
    /**
     * AT Protocol spec does not allow numbers outside of the safe integer range
     * (-(2^53 - 1) to 2^53 - 1)). This options allows to disable the check for
     * safe integers, which can be useful for processing data in "non-strict"
     * mode.
     *
     * @default true
     */
    allowNonSafeIntegers?: boolean;
};
export {};
//# sourceMappingURL=json-stringify-deep.d.ts.map
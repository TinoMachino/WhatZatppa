import { StackOptions } from './lib/stack.js';
export type IterativeTransformOptions = StackOptions & TransformValueOptions;
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
export declare function iterativeTransform<O extends IterativeTransformOptions = IterativeTransformOptions>(input: unknown, replacer: (child: object, options: O) => unknown, options?: O): unknown;
type TransformValueOptions = {
    /** @default true */
    allowNonSafeIntegers?: boolean;
};
export {};
//# sourceMappingURL=iterative-transform.d.ts.map
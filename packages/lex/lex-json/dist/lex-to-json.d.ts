import { LexValue } from '@atproto/lex-data';
import { IterativeTransformOptions } from './iterative-transform.js';
import { JsonValue } from './json.js';
import { SpecialJsonObjectOptions } from './special-objects.js';
/**
 * Using a too low threshold (e.g. 10) can cause performance degradation due to
 * switching to iterative implementation too early, while using a too high
 * threshold (e.g. 10_000) can cause call stack overflow errors with deeply
 * nested structures. Empirical tests have shown that a threshold of around
 * 1,000 provides a good balance.
 *
 * @see lexToJson
 */
export declare const MAX_RECURSION_DEPTH_DEFAULT = 1000;
/**
 * Options for {@link lexToJson} function.
 *
 * @see {@link IterativeTransformOptions}
 * @see {@link SpecialJsonObjectOptions}
 */
export type LexToJsonOptions = IterativeTransformOptions & SpecialJsonObjectOptions & {
    /**
     * Maximum recursion depth before switching to iterative implementation. Set
     * this only if you have either performances issues with the default value,
     * or your environment has a low call stack limit and you need to support
     * deeper nesting levels.
     *
     * Set to `0` or a negative value to disable recursion and use iterative
     * implementation for all levels of nesting. Set to `Infinity` to enable
     * recursion for all levels of nesting (might cause `RangeError: Maximum
     * call stack size exceeded` for deeply nested structures).
     *
     * This options is exposed so that servers can be tuned to allow deeper
     * nesting levels with better performances. For example, a Node.js server
     * could be started with `--stack-size=65500` to allow deeper recursion, and
     * then set `maxRecursionDepth` to a higher value (e.g. 10,000) to take
     * advantage of the better performance of the recursive implementation for
     * deeper nesting levels.
     *
     * @default MAX_RECURSION_DEPTH_DEFAULT
     */
    maxRecursionDepth?: number;
};
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
export declare function lexToJson(input: LexValue, { strict, allowNonSafeIntegers, maxNestedLevels, maxContainerLength, maxObjectKeyLen, maxRecursionDepth, }?: LexToJsonOptions): JsonValue;
//# sourceMappingURL=lex-to-json.d.ts.map
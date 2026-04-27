import { LexValue } from '@atproto/lex-data';
import { JsonToLexOptions } from './json-to-lex.js';
export type LexParseOptions = JsonToLexOptions;
/**
 * Parses a JSON string into Lex values.
 *
 * This function parses JSON and automatically decodes AT Protocol special types:
 * - `{$link: string}` objects are decoded to `Cid` instances
 * - `{$bytes: string}` objects are decoded to `Uint8Array` instances
 * - `{$type: 'blob'}` objects are validated
 * - Objects with `$type` properties are validated for known types (e.g., 'blob') and rejected if invalid
 * - Non-integer numbers are rejected as invalid Lex values
 * - Deeply nested structures, excessively long arrays/objects, and excessively long object keys are rejected based on the provided options (or defaults in strict mode).
 *
 * @see {@link jsonToLex} for details and options
 * @typeParam T - Type cast for the resulting Lex value. Use when you want to specify the expected structure of the parsed data.
 * @param input - The JSON string to parse
 * @param options - Parsing options (e.g., strict mode)
 * @returns The parsed Lex value
 * @throws {SyntaxError} If the input is not valid JSON
 * @throws {TypeError} If strict mode is enabled and invalid Lex values are found
 *
 * @example
 * ```typescript
 * import { lexParse } from '@atproto/lex'
 *
 * // Parse JSON with $link and $bytes decoding
 * const parsed = lexParse<{
 *   ref: Cid
 *   data: Uint8Array
 * }>(`{
 *   "ref": { "$link": "bafyrei..." },
 *   "data": { "$bytes": "SGVsbG8sIHdvcmxkIQ==" }
 * }`)
 *
 * // Parse a single CID
 * const someCid = lexParse<Cid>('{"$link": "bafyrei..."}')
 *
 * // Parse binary data
 * const someBytes = lexParse<Uint8Array>('{"$bytes": "SGVsbG8sIHdvcmxkIQ=="}')
 * ```
 */
export declare function lexParse<T extends LexValue = LexValue>(input: string, options?: LexParseOptions): T;
/**
 * A safe version of {@link lexParse} that returns `undefined` instead of
 * throwing on invalid input.
 *
 * @see {@link jsonToLex} for details and options.
 */
export declare function lexParseSafe<T extends LexValue = LexValue>(input: string, options?: LexParseOptions): T | undefined;
/**
 * Parses a JSON string from a byte array into Lex values.
 *
 * @see {@link jsonToLex} for details and options.
 */
export declare function lexParseJsonBytes<T extends LexValue = LexValue>(bytes: Uint8Array, options?: LexParseOptions): T;
//# sourceMappingURL=lex-parse.d.ts.map
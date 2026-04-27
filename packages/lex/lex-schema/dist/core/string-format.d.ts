import { AtIdentifierString, AtUriString, DatetimeString, DidString, HandleString, NsidString, RecordKeyString, TidString, UriString } from '@atproto/syntax';
import { CheckFn } from '../util/assertion-util.js';
export { type AtIdentifierString, asAtIdentifierString, assertAtIdentifierString, ifAtIdentifierString, isAtIdentifierString, } from '@atproto/syntax';
export { isDidIdentifier, isHandleIdentifier } from '@atproto/syntax';
export { type DatetimeString, asDatetimeString, assertDatetimeString, ifDatetimeString, isDatetimeString, } from '@atproto/syntax';
/**
 * Matches any ISO-ish datetime string. This is a more lenient check than
 * the strict {@link isDatetimeString} guard, which only allows datetimes that
 * fully conform to the AT Protocol specification (e.g. must include timezone).
 */
export declare function isDatetimeStringLenient<I>(input: I): input is I & DatetimeString;
export { currentDatetimeString, toDatetimeString } from '@atproto/syntax';
export { type AtUriString, asAtUriString, assertAtUriString, ifAtUriString, isAtUriString, } from '@atproto/syntax';
/**
 * Lenient version of {@link isAtUriString} that does not enforce the validity
 * of the record key (rkey) path component (if present).
 *
 * @see {@link isAtUriString}
 */
export declare function isAtUriStringLenient<I>(input: I): input is I & AtUriString;
/**
 * Type guard that checks if a value is a valid CID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid CID string
 */
export declare const isCidString: CheckFn<CidString>;
/**
 * A Content Identifier (CID) string.
 *
 * CIDs are self-describing content addresses used to identify data by its hash.
 *
 * @example `"bafyreig..."`
 */
export type CidString = string;
/**
 * Type guard that checks if a value is a valid DID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid DID string
 */
export declare const isDidString: CheckFn<DidString>;
export type { 
/**
 * A Decentralized Identifier (DID) string.
 *
 * DIDs are globally unique identifiers that don't require a central authority.
 *
 * @example `"did:plc:1234abcd..."` or `"did:web:example.com"`
 */
DidString, };
/**
 * Type guard that checks if a value is a valid handle string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid handle string
 */
export declare const isHandleString: CheckFn<HandleString>;
export type { 
/**
 * A handle string - a human-readable identifier for users.
 *
 * @example `"alice.bsky.social"` or `"bob.example.com"`
 */
HandleString, };
/**
 * Type guard that checks if a value is a valid BCP-47 language tag.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid language string
 */
export declare const isLanguageString: CheckFn<LanguageString>;
/**
 * A BCP-47 language tag string.
 *
 * @example `"en"`, `"en-US"`, `"zh-Hans"`
 */
export type LanguageString = string;
/**
 * Type guard that checks if a value is a valid NSID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid NSID string
 */
export declare const isNsidString: CheckFn<NsidString>;
export type { 
/**
 * A Namespaced Identifier (NSID) string identifying a lexicon.
 *
 * NSIDs use reverse-domain notation to identify schemas.
 *
 * @example `"app.bsky.feed.post"`, `"com.atproto.repo.createRecord"`
 */
NsidString, };
/**
 * Type guard that checks if a value is a valid record key string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid record key string
 */
export declare const isRecordKeyString: CheckFn<RecordKeyString>;
export type { 
/**
 * A record key string identifying a record within a collection.
 *
 * @example `"3k2..."` (TID format) or `"self"` (literal key)
 */
RecordKeyString, };
/**
 * Type guard that checks if a value is a valid TID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid TID string
 */
export declare const isTidString: CheckFn<TidString>;
export type { 
/**
 * A Timestamp Identifier (TID) string.
 *
 * TIDs are time-based identifiers used for record keys.
 *
 * @example `"3k2..."`
 */
TidString, };
/**
 * Type guard that checks if a value is a valid URI string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid URI string
 */
export declare const isUriString: CheckFn<UriString>;
export type { 
/**
 * A standard URI string.
 *
 * @example `"https://example.com/path"`
 */
UriString, };
type StringFormats = {
    'at-identifier': AtIdentifierString;
    'at-uri': AtUriString;
    cid: CidString;
    datetime: DatetimeString;
    did: DidString;
    handle: HandleString;
    language: LanguageString;
    nsid: NsidString;
    'record-key': RecordKeyString;
    tid: TidString;
    uri: UriString;
};
/**
 * Union type of all valid string format names.
 */
export type StringFormat = Extract<keyof StringFormats, string>;
export type StringFormatValidationOptions = {
    /**
     * Allows to be more lenient in validation by using a "lenient" verification
     * function, if available. The behavior of the lenient verifier depends on the
     * specific format, but generally it may allow for a wider range of valid
     * inputs, including values that are not compliant with the AT Protocol
     * specification.
     *
     * @default true
     */
    strict?: boolean;
};
/**
 * Infers the string type for a given format name.
 *
 * @typeParam F - The format name
 *
 * @example
 * ```typescript
 * type Did = InferStringFormat<'did'>
 * // Result: DidString
 * ```
 */
export type InferStringFormat<F extends StringFormat> = F extends StringFormat ? StringFormats[F] : never;
/**
 * Type guard that checks if a string matches a specific format.
 *
 * @typeParam I - The input string type
 * @typeParam F - The format to check
 * @param input - The string to validate
 * @param format - The format name to validate against
 * @returns `true` if the string matches the format
 *
 * @example
 * ```typescript
 * const value: string = 'did:plc:1234...'
 * if (isStringFormat(value, 'did')) {
 *   // value is typed as DidString
 *   console.log('Valid DID:', value)
 * }
 * ```
 */
export declare function isStringFormat<I extends string, F extends StringFormat>(input: I, format: F, options?: StringFormatValidationOptions): input is I & StringFormats[F];
/**
 * Asserts that a string matches a specific format, throwing if invalid.
 *
 * @typeParam I - The input string type
 * @typeParam F - The format to check
 * @param input - The string to validate
 * @param format - The format name to validate against
 * @throws {TypeError} If the string doesn't match the format
 *
 * @example
 * ```typescript
 * assertStringFormat(value, 'handle')
 * // value is now typed as HandleString
 * ```
 */
export declare function assertStringFormat<I extends string, F extends StringFormat>(input: I, format: F, options?: StringFormatValidationOptions): asserts input is I & StringFormats[F];
/**
 * Validates and returns a string as the specified format type, throwing if invalid.
 *
 * This is useful when you need to convert a string to a format type in an expression.
 *
 * @typeParam I - The input string type
 * @typeParam F - The format to validate against
 * @param input - The string to validate
 * @param format - The format name to validate against
 * @returns The input typed as the format type
 * @throws {TypeError} If the string doesn't match the format
 *
 * @example
 * ```typescript
 * const did = asStringFormat(userInput, 'did')
 * // did is typed as DidString
 * ```
 */
export declare function asStringFormat<I extends string, F extends StringFormat>(input: I, format: F, options?: StringFormatValidationOptions): I & StringFormats[F];
/**
 * Returns the string as the format type if valid, otherwise returns `undefined`.
 *
 * This is useful for optional validation where you want to handle invalid values
 * without throwing.
 *
 * @typeParam I - The input string type
 * @typeParam F - The format to validate against
 * @param input - The string to validate
 * @param format - The format name to validate against
 * @returns The typed string if valid, otherwise `undefined`
 *
 * @example
 * ```typescript
 * const did = ifStringFormat(maybeInvalid, 'did')
 * if (did) {
 *   // did is typed as DidString
 * }
 * ```
 */
export declare function ifStringFormat<I extends string, F extends StringFormat>(input: I, format: F, options?: StringFormatValidationOptions): undefined | (I & StringFormats[F]);
/**
 * Array of all valid string format names.
 *
 * @example
 * ```typescript
 * for (const format of STRING_FORMATS) {
 *   console.log(format) // 'at-identifier', 'at-uri', 'cid', ...
 * }
 * ```
 */
export declare const STRING_FORMATS: readonly StringFormat[];
//# sourceMappingURL=string-format.d.ts.map
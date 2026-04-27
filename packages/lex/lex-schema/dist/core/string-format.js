"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRING_FORMATS = exports.isUriString = exports.isTidString = exports.isRecordKeyString = exports.isNsidString = exports.isLanguageString = exports.isHandleString = exports.isDidString = exports.isCidString = exports.isAtUriString = exports.ifAtUriString = exports.assertAtUriString = exports.asAtUriString = exports.toDatetimeString = exports.currentDatetimeString = exports.isDatetimeString = exports.ifDatetimeString = exports.assertDatetimeString = exports.asDatetimeString = exports.isHandleIdentifier = exports.isDidIdentifier = exports.isAtIdentifierString = exports.ifAtIdentifierString = exports.assertAtIdentifierString = exports.asAtIdentifierString = void 0;
exports.isDatetimeStringLenient = isDatetimeStringLenient;
exports.isAtUriStringLenient = isAtUriStringLenient;
exports.isStringFormat = isStringFormat;
exports.assertStringFormat = assertStringFormat;
exports.asStringFormat = asStringFormat;
exports.ifStringFormat = ifStringFormat;
const iso_datestring_validator_1 = require("iso-datestring-validator");
const lex_data_1 = require("@atproto/lex-data");
const syntax_1 = require("@atproto/syntax");
// -----------------------------------------------------------------------------
// Individual string format types and type guards
// -----------------------------------------------------------------------------
// Re-exporting from @atproto/syntax without modification to preserve types and
// documentation for types and utilities that are already well-defined there.
// @TODO rework other string formats in @atproto/syntax to follow this pattern
// and re-export here, e.g. language tags, NSIDs, record keys, etc.
var syntax_2 = require("@atproto/syntax");
Object.defineProperty(exports, "asAtIdentifierString", { enumerable: true, get: function () { return syntax_2.asAtIdentifierString; } });
Object.defineProperty(exports, "assertAtIdentifierString", { enumerable: true, get: function () { return syntax_2.assertAtIdentifierString; } });
Object.defineProperty(exports, "ifAtIdentifierString", { enumerable: true, get: function () { return syntax_2.ifAtIdentifierString; } });
Object.defineProperty(exports, "isAtIdentifierString", { enumerable: true, get: function () { return syntax_2.isAtIdentifierString; } });
// AtIdentifierString utilities
var syntax_3 = require("@atproto/syntax");
Object.defineProperty(exports, "isDidIdentifier", { enumerable: true, get: function () { return syntax_3.isDidIdentifier; } });
Object.defineProperty(exports, "isHandleIdentifier", { enumerable: true, get: function () { return syntax_3.isHandleIdentifier; } });
var syntax_4 = require("@atproto/syntax");
Object.defineProperty(exports, "asDatetimeString", { enumerable: true, get: function () { return syntax_4.asDatetimeString; } });
Object.defineProperty(exports, "assertDatetimeString", { enumerable: true, get: function () { return syntax_4.assertDatetimeString; } });
Object.defineProperty(exports, "ifDatetimeString", { enumerable: true, get: function () { return syntax_4.ifDatetimeString; } });
Object.defineProperty(exports, "isDatetimeString", { enumerable: true, get: function () { return syntax_4.isDatetimeString; } });
/**
 * Matches any ISO-ish datetime string. This is a more lenient check than
 * the strict {@link isDatetimeString} guard, which only allows datetimes that
 * fully conform to the AT Protocol specification (e.g. must include timezone).
 */
function isDatetimeStringLenient(input) {
    // @NOTE the returned type assertion is inaccurate wrt. the DatetimeString
    // type definition. A more accurate solution would be to use a branded type
    // instead of a template literal for the "datetime" format
    if (typeof input !== 'string')
        return false;
    try {
        return (0, iso_datestring_validator_1.isValidISODateString)(input);
    }
    catch {
        // @NOTE isValidISODateString throws on some inputs
        return false;
    }
}
// DatetimeString utilities
var syntax_5 = require("@atproto/syntax");
Object.defineProperty(exports, "currentDatetimeString", { enumerable: true, get: function () { return syntax_5.currentDatetimeString; } });
Object.defineProperty(exports, "toDatetimeString", { enumerable: true, get: function () { return syntax_5.toDatetimeString; } });
var syntax_6 = require("@atproto/syntax");
Object.defineProperty(exports, "asAtUriString", { enumerable: true, get: function () { return syntax_6.asAtUriString; } });
Object.defineProperty(exports, "assertAtUriString", { enumerable: true, get: function () { return syntax_6.assertAtUriString; } });
Object.defineProperty(exports, "ifAtUriString", { enumerable: true, get: function () { return syntax_6.ifAtUriString; } });
Object.defineProperty(exports, "isAtUriString", { enumerable: true, get: function () { return syntax_6.isAtUriString; } });
/**
 * Lenient version of {@link isAtUriString} that does not enforce the validity
 * of the record key (rkey) path component (if present).
 *
 * @see {@link isAtUriString}
 */
function isAtUriStringLenient(input) {
    return (0, syntax_1.isAtUriString)(input, { strict: false });
}
/**
 * Type guard that checks if a value is a valid CID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid CID string
 */
exports.isCidString = ((v) => (0, lex_data_1.validateCidString)(v));
/**
 * Type guard that checks if a value is a valid DID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid DID string
 */
exports.isDidString = syntax_1.isValidDid;
/**
 * Type guard that checks if a value is a valid handle string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid handle string
 */
exports.isHandleString = syntax_1.isValidHandle;
/**
 * Type guard that checks if a value is a valid BCP-47 language tag.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid language string
 */
exports.isLanguageString = syntax_1.isValidLanguage;
/**
 * Type guard that checks if a value is a valid NSID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid NSID string
 */
exports.isNsidString = syntax_1.isValidNsid;
/**
 * Type guard that checks if a value is a valid record key string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid record key string
 */
exports.isRecordKeyString = syntax_1.isValidRecordKey;
/**
 * Type guard that checks if a value is a valid TID string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid TID string
 */
exports.isTidString = syntax_1.isValidTid;
/**
 * Type guard that checks if a value is a valid URI string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid URI string
 */
exports.isUriString = syntax_1.isValidUri;
const stringFormatVerifiers = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    'at-identifier': [syntax_1.isAtIdentifierString],
    'at-uri': [syntax_1.isAtUriString, isAtUriStringLenient],
    cid: [exports.isCidString],
    datetime: [syntax_1.isDatetimeString, isDatetimeStringLenient],
    did: [exports.isDidString],
    handle: [exports.isHandleString],
    language: [exports.isLanguageString],
    nsid: [exports.isNsidString],
    'record-key': [exports.isRecordKeyString],
    tid: [exports.isTidString],
    uri: [exports.isUriString],
});
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
/*@__NO_SIDE_EFFECTS__*/
function isStringFormat(input, format, options) {
    const formatVerifier = stringFormatVerifiers[format];
    // Fool-proof
    if (!formatVerifier)
        throw new TypeError(`Unknown string format: ${format}`);
    const check = options?.strict === false && formatVerifier.length > 1
        ? formatVerifier[1]
        : formatVerifier[0];
    return check(input);
}
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
/*@__NO_SIDE_EFFECTS__*/
function assertStringFormat(input, format, options) {
    if (!isStringFormat(input, format, options)) {
        throw new TypeError(`Invalid string format (${format}): ${input}`);
    }
}
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
/*@__NO_SIDE_EFFECTS__*/
function asStringFormat(input, format, options) {
    assertStringFormat(input, format, options);
    return input;
}
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
/*@__NO_SIDE_EFFECTS__*/
function ifStringFormat(input, format, options) {
    return isStringFormat(input, format, options) ? input : undefined;
}
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
exports.STRING_FORMATS = Object.freeze(
/*#__PURE__*/ Object.keys(stringFormatVerifiers));
//# sourceMappingURL=string-format.js.map
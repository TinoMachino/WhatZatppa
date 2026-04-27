import { IpldValue, LegacyJsonValue } from '@atproto/common-web';
import { BlobRef } from './blob-refs';
/**
 * @note this is equivalent to `unknown` because of {@link IpldValue}
 * historically being `unknown`.
 *
 * @deprecated Use {@link LexValue} from `@atproto/lex-data` instead.
 */
export type LegacyLexValue = IpldValue | BlobRef;
export type { LegacyLexValue as LexValue };
/**
 * @deprecated Use {@link TypedLexMap} from `@atproto/lex-data` instead.
 */
export type RepoRecord = Record<string, LegacyLexValue>;
/**
 * @deprecated Use `LexValue` from `@atproto/lex-data` instead (which doesn't need conversion to IPLD).
 */
export declare const lexToIpld: (input: LegacyLexValue) => IpldValue;
/**
 * @deprecated Use `LexValue` from `@atproto/lex-data` instead instead (which doesn't need conversion to IPLD).
 */
export declare const ipldToLex: (input: IpldValue) => LegacyLexValue;
/**
 * @deprecated use {@link lexToJson} from `@atproto/lex-json` instead
 */
export declare const lexToJson: (val: LegacyLexValue) => LegacyJsonValue;
/**
 * @deprecated use {@link lexStringify} from `@atproto/lex-json` instead
 */
export declare const stringifyLex: (val: LegacyLexValue) => string;
/**
 * @deprecated use {@link jsonToLex} from `@atproto/lex-json` instead
 */
declare const jsonToLexLegacy: (val: LegacyJsonValue) => LegacyLexValue;
export { jsonToLexLegacy as jsonToLex };
/**
 * @deprecated use {@link lexParse} from `@atproto/lex-json` instead
 */
export declare const jsonStringToLex: (val: string) => LegacyLexValue;
//# sourceMappingURL=serialize.d.ts.map
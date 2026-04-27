/**
 * @deprecated Use {@link JsonValue} from `@atproto/lex-json` instead.
 */
export type LegacyJsonValue = unknown;
export type { LegacyJsonValue as JsonValue };
/**
 * @deprecated Use {@link LexValue} from `@atproto/lex-data` instead.
 */
export type IpldValue = unknown;
/**
 * Converts a JSON-compatible value to an IPLD-compatible value.
 * @deprecated Use {@link jsonToLex} from `@atproto/lex-json` instead.
 */
export declare const jsonToIpld: (val: LegacyJsonValue) => IpldValue;
/**
 * Converts an IPLD-compatible value to a JSON-compatible value.
 * @deprecated Use {@link lexToJson} from `@atproto/lex-json` instead.
 */
export declare const ipldToJson: (val: IpldValue) => LegacyJsonValue;
/**
 * Compares two IPLD-compatible values for deep equality.
 * @deprecated Use {@link lexEquals} from `@atproto/lex-data` instead.
 */
export declare const ipldEquals: (a: IpldValue, b: IpldValue) => boolean;
//# sourceMappingURL=ipld.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.lexicon.schema";
export { $nsid };
/** Representation of Lexicon schemas themselves, when published as atproto records. Note that the schema language is not defined in Lexicon; this meta schema currently only includes a single version field ('lexicon'). See the atproto specifications for description of the other expected top-level fields ('id', 'defs', etc). */
type Main = {
    $type: 'com.atproto.lexicon.schema';
    /**
     * Indicates the 'version' of the Lexicon language. Must be '1' for the current atproto/Lexicon schema system.
     */
    lexicon: number;
};
export type { Main };
/** Representation of Lexicon schemas themselves, when published as atproto records. Note that the schema language is not defined in Lexicon; this meta schema currently only includes a single version field ('lexicon'). See the atproto specifications for description of the other expected top-level fields ('id', 'defs', etc). */
declare const main: l.RecordSchema<"nsid", "com.atproto.lexicon.schema", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.atproto.lexicon.schema", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        lexicon: number;
        $type: "com.atproto.lexicon.schema";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        lexicon: number;
        $type: "com.atproto.lexicon.schema";
    };
}, $type: "com.atproto.lexicon.schema";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    lexicon: number;
    $type: "com.atproto.lexicon.schema";
}>;
//# sourceMappingURL=schema.defs.d.ts.map
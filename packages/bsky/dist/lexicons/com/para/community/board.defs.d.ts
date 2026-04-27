import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.board";
export { $nsid };
/** A repository record acting as the anchor for a PARA community, linking the spatial map quadrant to the underlying ATProto group chats. */
type Main = {
    $type: 'com.para.community.board';
    name: string;
    description?: string;
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
    quadrant: string;
    /**
     * Reference to the 270-member bounded bsky group chat.
     */
    delegatesChatId: string;
    /**
     * Reference to the 30-member bounded public-view bsky group chat.
     */
    subdelegatesChatId: string;
    /**
     * The lifecycle status of the community.
     */
    status: 'draft' | 'active' | l.UnknownString;
    /**
     * Reference to the starter pack used to track the founding member quorum.
     */
    founderStarterPackUri?: l.AtUriString;
    createdAt: l.DatetimeString;
};
export type { Main };
/** A repository record acting as the anchor for a PARA community, linking the spatial map quadrant to the underlying ATProto group chats. */
declare const main: l.RecordSchema<"tid", "com.para.community.board", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.community.board", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        description?: string
        /**
         * Spatial mapping token indicating the nonant or 25th block.
         */
         | undefined;
        createdAt: l.DatetimeString;
        name: string;
        status: "draft" | "active" | l.UnknownString;
        quadrant: string;
        delegatesChatId: string;
        subdelegatesChatId: string;
        founderStarterPackUri?: l.AtUriString | undefined;
        $type: "com.para.community.board";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        description?: string
        /**
         * Spatial mapping token indicating the nonant or 25th block.
         */
         | undefined;
        createdAt: l.DatetimeString;
        name: string;
        status: "draft" | "active" | l.UnknownString;
        quadrant: string;
        delegatesChatId: string;
        subdelegatesChatId: string;
        founderStarterPackUri?: l.AtUriString | undefined;
        $type: "com.para.community.board";
    };
}, $type: "com.para.community.board";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    description?: string
    /**
     * Spatial mapping token indicating the nonant or 25th block.
     */
     | undefined;
    createdAt: l.DatetimeString;
    name: string;
    status: "draft" | "active" | l.UnknownString;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    founderStarterPackUri?: l.AtUriString | undefined;
    $type: "com.para.community.board";
}>;
//# sourceMappingURL=board.defs.d.ts.map
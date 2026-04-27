import { l } from '@atproto/lex';
declare const $nsid = "com.para.feed.getAuthorFeed";
export { $nsid };
/** Get a paginated feed of Para posts authored by the given actor. */
declare const main: l.Query<"com.para.feed.getAuthorFeed", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<PostView, PostView>>>;
}>>, readonly ["BlockedActor", "BlockedByActor"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.feed.getAuthorFeed", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<PostView, PostView>>>;
}>>;
type PostView = {
    $type?: 'com.para.feed.getAuthorFeed#postView';
    uri: l.AtUriString;
    cid: l.CidString;
    author: l.DidString;
    text: string;
    createdAt: l.DatetimeString;
    replyRoot?: l.AtUriString;
    replyParent?: l.AtUriString;
    langs?: l.LanguageString[];
    tags?: string[];
    flairs?: string[];
    postType?: string;
};
export type { PostView };
declare const postView: l.TypedObjectSchema<"com.para.feed.getAuthorFeed#postView", l.Validator<PostView, PostView>>;
export { postView };
//# sourceMappingURL=getAuthorFeed.defs.d.ts.map
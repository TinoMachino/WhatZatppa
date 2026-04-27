import { l } from '@atproto/lex';
declare const $nsid = "com.para.social.getPostMeta";
export { $nsid };
/** Get Para social metadata for a post. */
declare const main: l.Query<"com.para.social.getPostMeta", l.ParamsSchema<{
    readonly post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    postType: l.OptionalSchema<l.EnumSchema<"policy" | "matter" | "meme">>;
    official: l.OptionalSchema<l.BooleanSchema>;
    party: l.OptionalSchema<l.StringSchema<{}>>;
    community: l.OptionalSchema<l.StringSchema<{}>>;
    category: l.OptionalSchema<l.StringSchema<{}>>;
    tags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    flairs: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    voteScore: l.IntegerSchema;
    interactionMode: l.EnumSchema<"policy_ballot" | "reddit_votes">;
    createdAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>, readonly ["NotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.social.getPostMeta", $params: l.ParamsSchema<{
    readonly post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    postType: l.OptionalSchema<l.EnumSchema<"policy" | "matter" | "meme">>;
    official: l.OptionalSchema<l.BooleanSchema>;
    party: l.OptionalSchema<l.StringSchema<{}>>;
    community: l.OptionalSchema<l.StringSchema<{}>>;
    category: l.OptionalSchema<l.StringSchema<{}>>;
    tags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    flairs: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    voteScore: l.IntegerSchema;
    interactionMode: l.EnumSchema<"policy_ballot" | "reddit_votes">;
    createdAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>;
//# sourceMappingURL=getPostMeta.defs.d.ts.map
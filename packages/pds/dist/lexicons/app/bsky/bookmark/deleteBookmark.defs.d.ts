import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.bookmark.deleteBookmark";
export { $nsid };
/** Deletes a private bookmark for the specified record. Currently, only `app.bsky.feed.post` records are supported. Requires authentication. */
declare const main: l.Procedure<"app.bsky.bookmark.deleteBookmark", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, l.Payload<undefined, undefined>, readonly ["UnsupportedCollection"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.bookmark.deleteBookmark", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteBookmark.defs.d.ts.map
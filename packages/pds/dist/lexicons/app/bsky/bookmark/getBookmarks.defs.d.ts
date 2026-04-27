import { l } from '@atproto/lex';
import * as BookmarkDefs from './defs.defs.js';
declare const $nsid = "app.bsky.bookmark.getBookmarks";
export { $nsid };
/** Gets views of records bookmarked by the authenticated user. Requires authentication. */
declare const main: l.Query<"app.bsky.bookmark.getBookmarks", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    bookmarks: l.ArraySchema<l.RefSchema<l.Validator<BookmarkDefs.BookmarkView, BookmarkDefs.BookmarkView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.bookmark.getBookmarks", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    bookmarks: l.ArraySchema<l.RefSchema<l.Validator<BookmarkDefs.BookmarkView, BookmarkDefs.BookmarkView>>>;
}>>;
//# sourceMappingURL=getBookmarks.defs.d.ts.map
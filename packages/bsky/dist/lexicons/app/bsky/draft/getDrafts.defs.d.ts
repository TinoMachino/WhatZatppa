import { l } from '@atproto/lex';
import * as DraftDefs from './defs.defs.js';
declare const $nsid = "app.bsky.draft.getDrafts";
export { $nsid };
/** Gets views of user drafts. Requires authentication. */
declare const main: l.Query<"app.bsky.draft.getDrafts", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    drafts: l.ArraySchema<l.RefSchema<l.Validator<DraftDefs.DraftView, DraftDefs.DraftView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.draft.getDrafts", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    drafts: l.ArraySchema<l.RefSchema<l.Validator<DraftDefs.DraftView, DraftDefs.DraftView>>>;
}>>;
//# sourceMappingURL=getDrafts.defs.d.ts.map
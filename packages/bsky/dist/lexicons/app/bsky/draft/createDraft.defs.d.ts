import { l } from '@atproto/lex';
import * as DraftDefs from './defs.defs.js';
declare const $nsid = "app.bsky.draft.createDraft";
export { $nsid };
/** Inserts a draft using private storage (stash). An upper limit of drafts might be enforced. Requires authentication. */
declare const main: l.Procedure<"app.bsky.draft.createDraft", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    draft: l.RefSchema<l.Validator<DraftDefs.Draft, DraftDefs.Draft>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{}>;
}>>, readonly ["DraftLimitReached"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.draft.createDraft", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    draft: l.RefSchema<l.Validator<DraftDefs.Draft, DraftDefs.Draft>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=createDraft.defs.d.ts.map
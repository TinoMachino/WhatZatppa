import { l } from '@atproto/lex';
import * as DraftDefs from './defs.defs.js';
declare const $nsid = "app.bsky.draft.updateDraft";
export { $nsid };
/** Updates a draft using private storage (stash). If the draft ID points to a non-existing ID, the update will be silently ignored. This is done because updates don't enforce draft limit, so it accepts all writes, but will ignore invalid ones. Requires authentication. */
declare const main: l.Procedure<"app.bsky.draft.updateDraft", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    draft: l.RefSchema<l.Validator<DraftDefs.DraftWithId, DraftDefs.DraftWithId>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.draft.updateDraft", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    draft: l.RefSchema<l.Validator<DraftDefs.DraftWithId, DraftDefs.DraftWithId>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateDraft.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.draft.deleteDraft";
export { $nsid };
/** Deletes a draft by ID. Requires authentication. */
declare const main: l.Procedure<"app.bsky.draft.deleteDraft", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{
        readonly format: "tid";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.draft.deleteDraft", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{
        readonly format: "tid";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteDraft.defs.d.ts.map
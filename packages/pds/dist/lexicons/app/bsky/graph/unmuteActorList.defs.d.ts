import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.unmuteActorList";
export { $nsid };
/** Unmutes the specified list of accounts. Requires auth. */
declare const main: l.Procedure<"app.bsky.graph.unmuteActorList", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    list: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.unmuteActorList", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    list: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=unmuteActorList.defs.d.ts.map
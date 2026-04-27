import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.unmuteActor";
export { $nsid };
/** Unmutes the specified account. Requires auth. */
declare const main: l.Procedure<"app.bsky.graph.unmuteActor", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.unmuteActor", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=unmuteActor.defs.d.ts.map
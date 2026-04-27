import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.muteThread";
export { $nsid };
/** Mutes a thread preventing notifications from the thread and any of its children. Mutes are private in Bluesky. Requires auth. */
declare const main: l.Procedure<"app.bsky.graph.muteThread", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    root: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.muteThread", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    root: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=muteThread.defs.d.ts.map
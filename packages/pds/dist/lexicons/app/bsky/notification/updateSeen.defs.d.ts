import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.notification.updateSeen";
export { $nsid };
/** Notify server that the requesting account has seen notifications. Requires auth. */
declare const main: l.Procedure<"app.bsky.notification.updateSeen", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    seenAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.updateSeen", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    seenAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateSeen.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.contact.sendNotification";
export { $nsid };
/** System endpoint to send notifications related to contact imports. Requires role authentication. */
declare const main: l.Procedure<"app.bsky.contact.sendNotification", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    from: l.StringSchema<{
        readonly format: "did";
    }>;
    to: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.sendNotification", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    from: l.StringSchema<{
        readonly format: "did";
    }>;
    to: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=sendNotification.defs.d.ts.map
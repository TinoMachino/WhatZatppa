import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.contact.dismissMatch";
export { $nsid };
/** Removes a match that was found via contact import. It shouldn't appear again if the same contact is re-imported. Requires authentication. */
declare const main: l.Procedure<"app.bsky.contact.dismissMatch", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    subject: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, readonly ["InvalidDid", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.dismissMatch", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    subject: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=dismissMatch.defs.d.ts.map
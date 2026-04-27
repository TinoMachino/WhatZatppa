import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.admin.sendEmail";
export { $nsid };
/** Send email to a user's account email address. */
declare const main: l.Procedure<"com.atproto.admin.sendEmail", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    recipientDid: l.StringSchema<{
        readonly format: "did";
    }>;
    content: l.StringSchema<{}>;
    subject: l.OptionalSchema<l.StringSchema<{}>>;
    senderDid: l.StringSchema<{
        readonly format: "did";
    }>;
    comment: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    sent: l.BooleanSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.sendEmail", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    recipientDid: l.StringSchema<{
        readonly format: "did";
    }>;
    content: l.StringSchema<{}>;
    subject: l.OptionalSchema<l.StringSchema<{}>>;
    senderDid: l.StringSchema<{
        readonly format: "did";
    }>;
    comment: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    sent: l.BooleanSchema;
}>>;
//# sourceMappingURL=sendEmail.defs.d.ts.map
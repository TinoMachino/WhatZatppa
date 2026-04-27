import { l } from '@atproto/lex';
declare const $nsid = "com.para.notification.putPostSubscription";
export { $nsid };
/** Enable or disable notification subscriptions for a post. Requires auth. */
declare const main: l.Procedure<"com.para.notification.putPostSubscription", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    reply: l.BooleanSchema;
    quote: l.BooleanSchema;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    reply: l.BooleanSchema;
    quote: l.BooleanSchema;
    indexedAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.notification.putPostSubscription", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    reply: l.BooleanSchema;
    quote: l.BooleanSchema;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    reply: l.BooleanSchema;
    quote: l.BooleanSchema;
    indexedAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>;
//# sourceMappingURL=putPostSubscription.defs.d.ts.map
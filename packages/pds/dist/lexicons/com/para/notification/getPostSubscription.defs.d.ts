import { l } from '@atproto/lex';
declare const $nsid = "com.para.notification.getPostSubscription";
export { $nsid };
/** Get the requesting viewer's notification subscription for a post. */
declare const main: l.Query<"com.para.notification.getPostSubscription", l.ParamsSchema<{
    readonly post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
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
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.notification.getPostSubscription", $params: l.ParamsSchema<{
    readonly post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    reply: l.BooleanSchema;
    quote: l.BooleanSchema;
    indexedAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>;
//# sourceMappingURL=getPostSubscription.defs.d.ts.map
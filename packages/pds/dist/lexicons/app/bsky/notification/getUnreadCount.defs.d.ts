import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.notification.getUnreadCount";
export { $nsid };
/** Count the number of unread notifications for the requesting account. Requires auth. */
declare const main: l.Query<"app.bsky.notification.getUnreadCount", l.ParamsSchema<{
    readonly priority: l.OptionalSchema<l.BooleanSchema>;
    readonly seenAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    count: l.IntegerSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.getUnreadCount", $params: l.ParamsSchema<{
    readonly priority: l.OptionalSchema<l.BooleanSchema>;
    readonly seenAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    count: l.IntegerSchema;
}>>;
//# sourceMappingURL=getUnreadCount.defs.d.ts.map
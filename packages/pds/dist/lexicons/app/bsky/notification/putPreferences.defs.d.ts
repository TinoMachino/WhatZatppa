import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.notification.putPreferences";
export { $nsid };
/** Set notification-related preferences for an account. Requires auth. */
declare const main: l.Procedure<"app.bsky.notification.putPreferences", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    priority: l.BooleanSchema;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.putPreferences", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    priority: l.BooleanSchema;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=putPreferences.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.video.getUploadLimits";
export { $nsid };
/** Get video upload limits for the authenticated user. */
declare const main: l.Query<"app.bsky.video.getUploadLimits", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    canUpload: l.BooleanSchema;
    remainingDailyVideos: l.OptionalSchema<l.IntegerSchema>;
    remainingDailyBytes: l.OptionalSchema<l.IntegerSchema>;
    message: l.OptionalSchema<l.StringSchema<{}>>;
    error: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.video.getUploadLimits", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    canUpload: l.BooleanSchema;
    remainingDailyVideos: l.OptionalSchema<l.IntegerSchema>;
    remainingDailyBytes: l.OptionalSchema<l.IntegerSchema>;
    message: l.OptionalSchema<l.StringSchema<{}>>;
    error: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getUploadLimits.defs.d.ts.map
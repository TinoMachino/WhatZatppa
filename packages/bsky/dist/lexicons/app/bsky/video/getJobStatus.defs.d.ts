import { l } from '@atproto/lex';
import * as VideoDefs from './defs.defs.js';
declare const $nsid = "app.bsky.video.getJobStatus";
export { $nsid };
/** Get status details for a video processing job. */
declare const main: l.Query<"app.bsky.video.getJobStatus", l.ParamsSchema<{
    readonly jobId: l.StringSchema<{}>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    jobStatus: l.RefSchema<l.Validator<VideoDefs.JobStatus, VideoDefs.JobStatus>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.video.getJobStatus", $params: l.ParamsSchema<{
    readonly jobId: l.StringSchema<{}>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    jobStatus: l.RefSchema<l.Validator<VideoDefs.JobStatus, VideoDefs.JobStatus>>;
}>>;
//# sourceMappingURL=getJobStatus.defs.d.ts.map
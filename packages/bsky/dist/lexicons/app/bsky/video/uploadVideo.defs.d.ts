import { l } from '@atproto/lex';
import * as VideoDefs from './defs.defs.js';
declare const $nsid = "app.bsky.video.uploadVideo";
export { $nsid };
/** Upload a video to be processed then stored on the PDS. */
declare const main: l.Procedure<"app.bsky.video.uploadVideo", l.ParamsSchema<{}>, l.Payload<"video/mp4", undefined>, l.Payload<"application/json", l.ObjectSchema<{
    jobStatus: l.RefSchema<l.Validator<VideoDefs.JobStatus, VideoDefs.JobStatus>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.video.uploadVideo", $params: l.ParamsSchema<{}>, $input: l.Payload<"video/mp4", undefined>, $output: l.Payload<"application/json", l.ObjectSchema<{
    jobStatus: l.RefSchema<l.Validator<VideoDefs.JobStatus, VideoDefs.JobStatus>>;
}>>;
//# sourceMappingURL=uploadVideo.defs.d.ts.map
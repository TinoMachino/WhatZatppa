import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.video.defs";
export { $nsid };
type JobStatus = {
    $type?: 'app.bsky.video.defs#jobStatus';
    jobId: string;
    did: l.DidString;
    /**
     * The state of the video processing job. All values not listed as a known value indicate that the job is in process.
     */
    state: 'JOB_STATE_COMPLETED' | 'JOB_STATE_FAILED' | l.UnknownString;
    /**
     * Progress within the current processing state.
     */
    progress?: number;
    blob?: l.BlobRef;
    error?: string;
    message?: string;
};
export type { JobStatus };
declare const jobStatus: l.TypedObjectSchema<"app.bsky.video.defs#jobStatus", l.Validator<JobStatus, JobStatus>>;
export { jobStatus };
//# sourceMappingURL=defs.defs.d.ts.map
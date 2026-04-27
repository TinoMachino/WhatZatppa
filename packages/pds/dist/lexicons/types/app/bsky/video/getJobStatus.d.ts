import type * as AppBskyVideoDefs from './defs.js';
export type QueryParams = {
    jobId: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    jobStatus: AppBskyVideoDefs.JobStatus;
}
export type HandlerInput = void;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getJobStatus.d.ts.map
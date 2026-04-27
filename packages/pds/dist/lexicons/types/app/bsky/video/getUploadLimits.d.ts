export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    canUpload: boolean;
    remainingDailyVideos?: number;
    remainingDailyBytes?: number;
    message?: string;
    error?: string;
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
//# sourceMappingURL=getUploadLimits.d.ts.map
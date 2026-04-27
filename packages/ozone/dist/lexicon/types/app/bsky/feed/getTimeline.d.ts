import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {
    /** Variant 'algorithm' for timeline. Implementation-specific. NOTE: most feed flexibility has been moved to feed generator mechanism. */
    algorithm?: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    feed: AppBskyFeedDefs.FeedViewPost[];
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
//# sourceMappingURL=getTimeline.d.ts.map
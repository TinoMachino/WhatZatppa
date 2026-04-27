import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {
    feed: string;
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
    error?: 'UnknownFeed';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getFeed.d.ts.map
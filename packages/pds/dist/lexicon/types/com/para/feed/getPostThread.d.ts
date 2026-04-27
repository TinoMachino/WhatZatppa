import type * as ComParaFeedGetAuthorFeed from './getAuthorFeed.js';
export type QueryParams = {
    /** Reference (AT-URI) to the post record. */
    uri: string;
    /** How many levels of reply depth to include. */
    depth: number;
    /** How many levels of parent posts to include. */
    parentHeight: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    post: ComParaFeedGetAuthorFeed.PostView;
    parents: ComParaFeedGetAuthorFeed.PostView[];
    replies: ComParaFeedGetAuthorFeed.PostView[];
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
    error?: 'NotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getPostThread.d.ts.map
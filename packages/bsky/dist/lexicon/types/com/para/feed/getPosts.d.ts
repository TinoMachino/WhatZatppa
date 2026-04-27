import type * as ComParaFeedGetAuthorFeed from './getAuthorFeed.js';
export type QueryParams = {
    /** List of Para post AT-URIs to return. */
    uris: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    posts: ComParaFeedGetAuthorFeed.PostView[];
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
//# sourceMappingURL=getPosts.d.ts.map
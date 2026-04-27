import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {
    /** List of post AT-URIs to return hydrated views for. */
    uris: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    posts: AppBskyFeedDefs.PostView[];
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
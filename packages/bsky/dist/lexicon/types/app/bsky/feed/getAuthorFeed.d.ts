import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {
    actor: string;
    limit: number;
    cursor?: string;
    /** Combinations of post/repost types to include in response. */
    filter: 'posts_with_replies' | 'posts_no_replies' | 'posts_with_media' | 'posts_and_author_threads' | 'posts_with_video' | (string & {});
    includePins: boolean;
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
    error?: 'BlockedActor' | 'BlockedByActor';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getAuthorFeed.d.ts.map
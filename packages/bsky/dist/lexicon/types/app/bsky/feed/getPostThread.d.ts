import { type $Typed } from '../../../../util';
import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {
    /** Reference (AT-URI) to post record. */
    uri: string;
    /** How many levels of reply depth should be included in response. */
    depth: number;
    /** How many levels of parent (and grandparent, etc) post to include. */
    parentHeight: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    thread: $Typed<AppBskyFeedDefs.ThreadViewPost> | $Typed<AppBskyFeedDefs.NotFoundPost> | $Typed<AppBskyFeedDefs.BlockedPost> | {
        $type: string;
    };
    threadgate?: AppBskyFeedDefs.ThreadgateView;
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
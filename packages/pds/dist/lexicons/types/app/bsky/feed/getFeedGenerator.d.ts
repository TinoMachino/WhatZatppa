import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {
    /** AT-URI of the feed generator record. */
    feed: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    view: AppBskyFeedDefs.GeneratorView;
    /** Indicates whether the feed generator service has been online recently, or else seems to be inactive. */
    isOnline: boolean;
    /** Indicates whether the feed generator service is compatible with the record declaration. */
    isValid: boolean;
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
//# sourceMappingURL=getFeedGenerator.d.ts.map
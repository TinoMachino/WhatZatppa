/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyUnspeccedDefs from './defs.js';
export type QueryParams = {
    /** Reference (AT-URI) to post record. This is the anchor post. */
    anchor: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    /** A flat list of other thread items. The depth of each item is indicated by the depth property inside the item. */
    thread: ThreadItem[];
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
export interface ThreadItem {
    $type?: 'app.bsky.unspecced.getPostThreadOtherV2#threadItem';
    uri: string;
    /** The nesting level of this item in the thread. Depth 0 means the anchor item. Items above have negative depths, items below have positive depths. */
    depth: number;
    value: $Typed<AppBskyUnspeccedDefs.ThreadItemPost> | {
        $type: string;
    };
}
export declare function isThreadItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.getPostThreadOtherV2", "threadItem">;
export declare function validateThreadItem<V>(v: V): ValidationResult<ThreadItem & V>;
//# sourceMappingURL=getPostThreadOtherV2.d.ts.map
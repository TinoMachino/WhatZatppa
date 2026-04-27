/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    /** Handle or DID of the actor. */
    actor: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    feed: PostView[];
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
export interface PostView {
    $type?: 'com.para.feed.getAuthorFeed#postView';
    uri: string;
    cid: string;
    author: string;
    text: string;
    createdAt: string;
    replyRoot?: string;
    replyParent?: string;
    langs?: string[];
    tags?: string[];
    flairs?: string[];
    postType?: string;
}
export declare function isPostView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.feed.getAuthorFeed", "postView">;
export declare function validatePostView<V>(v: V): ValidationResult<PostView & V>;
//# sourceMappingURL=getAuthorFeed.d.ts.map
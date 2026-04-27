/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    items: BatchItem[];
}
export interface OutputSchema {
    items: ChatBskyConvoDefs.MessageView[];
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
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
    error?: 'ConvoLocked' | 'InvalidConvo';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
export interface BatchItem {
    $type?: 'chat.bsky.convo.sendMessageBatch#batchItem';
    convoId: string;
    message: ChatBskyConvoDefs.MessageInput;
}
export declare function isBatchItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.sendMessageBatch", "batchItem">;
export declare function validateBatchItem<V>(v: V): ValidationResult<BatchItem & V>;
//# sourceMappingURL=sendMessageBatch.d.ts.map
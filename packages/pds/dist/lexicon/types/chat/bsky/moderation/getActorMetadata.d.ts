/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    actor: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    day: Metadata;
    month: Metadata;
    all: Metadata;
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
export interface Metadata {
    $type?: 'chat.bsky.moderation.getActorMetadata#metadata';
    messagesSent: number;
    messagesReceived: number;
    convos: number;
    convosStarted: number;
}
export declare function isMetadata<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.moderation.getActorMetadata", "metadata">;
export declare function validateMetadata<V>(v: V): ValidationResult<Metadata & V>;
//# sourceMappingURL=getActorMetadata.d.ts.map
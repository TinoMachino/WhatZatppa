/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    suggestions: Suggestion[];
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
export interface Suggestion {
    $type?: 'app.bsky.unspecced.getTaggedSuggestions#suggestion';
    tag: string;
    subjectType: 'actor' | 'feed' | (string & {});
    subject: string;
}
export declare function isSuggestion<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.getTaggedSuggestions", "suggestion">;
export declare function validateSuggestion<V>(v: V): ValidationResult<Suggestion & V>;
//# sourceMappingURL=getTaggedSuggestions.d.ts.map
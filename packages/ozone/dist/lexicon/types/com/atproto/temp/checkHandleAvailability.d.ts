/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
export type QueryParams = {
    /** Tentative handle. Will be checked for availability or used to build handle suggestions. */
    handle: string;
    /** User-provided email. Might be used to build handle suggestions. */
    email?: string;
    /** User-provided birth date. Might be used to build handle suggestions. */
    birthDate?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    /** Echo of the input handle. */
    handle: string;
    result: $Typed<ResultAvailable> | $Typed<ResultUnavailable> | {
        $type: string;
    };
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
    error?: 'InvalidEmail';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
/** Indicates the provided handle is available. */
export interface ResultAvailable {
    $type?: 'com.atproto.temp.checkHandleAvailability#resultAvailable';
}
export declare function isResultAvailable<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.temp.checkHandleAvailability", "resultAvailable">;
export declare function validateResultAvailable<V>(v: V): ValidationResult<ResultAvailable & V>;
/** Indicates the provided handle is unavailable and gives suggestions of available handles. */
export interface ResultUnavailable {
    $type?: 'com.atproto.temp.checkHandleAvailability#resultUnavailable';
    /** List of suggested handles based on the provided inputs. */
    suggestions: Suggestion[];
}
export declare function isResultUnavailable<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.temp.checkHandleAvailability", "resultUnavailable">;
export declare function validateResultUnavailable<V>(v: V): ValidationResult<ResultUnavailable & V>;
export interface Suggestion {
    $type?: 'com.atproto.temp.checkHandleAvailability#suggestion';
    handle: string;
    /** Method used to build this suggestion. Should be considered opaque to clients. Can be used for metrics. */
    method: string;
}
export declare function isSuggestion<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.temp.checkHandleAvailability", "suggestion">;
export declare function validateSuggestion<V>(v: V): ValidationResult<Suggestion & V>;
//# sourceMappingURL=checkHandleAvailability.d.ts.map
/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {};
export interface InputSchema {
    /** Array of DID subjects to cancel scheduled actions for */
    subjects: string[];
    /** Optional comment describing the reason for cancellation */
    comment?: string;
}
export type OutputSchema = CancellationResults;
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
export interface CancellationResults {
    $type?: 'tools.ozone.moderation.cancelScheduledActions#cancellationResults';
    /** DIDs for which all pending scheduled actions were successfully cancelled */
    succeeded: string[];
    /** DIDs for which cancellation failed with error details */
    failed: FailedCancellation[];
}
export declare function isCancellationResults<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.cancelScheduledActions", "cancellationResults">;
export declare function validateCancellationResults<V>(v: V): ValidationResult<CancellationResults & V>;
export interface FailedCancellation {
    $type?: 'tools.ozone.moderation.cancelScheduledActions#failedCancellation';
    did: string;
    error: string;
    errorCode?: string;
}
export declare function isFailedCancellation<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.cancelScheduledActions", "failedCancellation">;
export declare function validateFailedCancellation<V>(v: V): ValidationResult<FailedCancellation & V>;
//# sourceMappingURL=cancelScheduledActions.d.ts.map
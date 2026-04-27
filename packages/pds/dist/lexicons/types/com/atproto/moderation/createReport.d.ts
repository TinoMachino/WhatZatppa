/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoModerationDefs from './defs.js';
import type * as ComAtprotoAdminDefs from '../admin/defs.js';
import type * as ComAtprotoRepoStrongRef from '../repo/strongRef.js';
export type QueryParams = {};
export interface InputSchema {
    reasonType: ComAtprotoModerationDefs.ReasonType;
    /** Additional context about the content and violation. */
    reason?: string;
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | {
        $type: string;
    };
    modTool?: ModTool;
}
export interface OutputSchema {
    id: number;
    reasonType: ComAtprotoModerationDefs.ReasonType;
    reason?: string;
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | {
        $type: string;
    };
    reportedBy: string;
    createdAt: string;
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
/** Moderation tool information for tracing the source of the action */
export interface ModTool {
    $type?: 'com.atproto.moderation.createReport#modTool';
    /** Name/identifier of the source (e.g., 'bsky-app/android', 'bsky-web/chrome') */
    name: string;
    /** Additional arbitrary metadata about the source */
    meta?: {
        [_ in string]: unknown;
    };
}
export declare function isModTool<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.moderation.createReport", "modTool">;
export declare function validateModTool<V>(v: V): ValidationResult<ModTool & V>;
//# sourceMappingURL=createReport.d.ts.map
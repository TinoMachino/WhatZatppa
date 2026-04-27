/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComAtprotoAdminDefs from '../../../com/atproto/admin/defs.js';
import type * as ToolsOzoneSignatureDefs from './defs.js';
export type QueryParams = {
    did: string;
    cursor?: string;
    limit: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    accounts: RelatedAccount[];
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
export interface RelatedAccount {
    $type?: 'tools.ozone.signature.findRelatedAccounts#relatedAccount';
    account: ComAtprotoAdminDefs.AccountView;
    similarities?: ToolsOzoneSignatureDefs.SigDetail[];
}
export declare function isRelatedAccount<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.signature.findRelatedAccounts", "relatedAccount">;
export declare function validateRelatedAccount<V>(v: V): ValidationResult<RelatedAccount & V>;
//# sourceMappingURL=findRelatedAccounts.d.ts.map
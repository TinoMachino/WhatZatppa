/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {};
export interface InputSchema {
    /** URI of the com.para.community.board record to leave. */
    communityUri: string;
}
export type OutputSchema = Output;
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
export interface Output {
    $type?: 'com.para.community.leave#output';
    uri: string;
    cid: string;
    communityUri: string;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | (string & {});
    viewerCapabilities: string[];
}
export declare function isOutput<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.leave", "output">;
export declare function validateOutput<V>(v: V): ValidationResult<Output & V>;
//# sourceMappingURL=leave.d.ts.map
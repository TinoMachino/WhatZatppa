/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    blobs: RecordBlob[];
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
export interface RecordBlob {
    $type?: 'com.atproto.repo.listMissingBlobs#recordBlob';
    cid: string;
    recordUri: string;
}
export declare function isRecordBlob<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.listMissingBlobs", "recordBlob">;
export declare function validateRecordBlob<V>(v: V): ValidationResult<RecordBlob & V>;
//# sourceMappingURL=listMissingBlobs.d.ts.map
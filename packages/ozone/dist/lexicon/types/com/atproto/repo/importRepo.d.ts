/**
 * GENERATED CODE - DO NOT MODIFY
 */
import stream from 'node:stream';
export type QueryParams = {};
export type InputSchema = string | Uint8Array | Blob;
export interface HandlerInput {
    encoding: 'application/vnd.ipld.car';
    body: stream.Readable;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=importRepo.d.ts.map
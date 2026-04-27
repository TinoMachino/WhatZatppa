import { Cid, LexMap, TypedBlobRef } from '@atproto/lex-data';
import { BlockMap, CommitData, WriteOpAction } from '@atproto/repo';
import { AtUri } from '@atproto/syntax';
export type ValidationStatus = 'valid' | 'unknown';
export type PreparedCreate = {
    action: WriteOpAction.Create;
    uri: AtUri;
    cid: Cid;
    swapCid?: Cid | null;
    record: LexMap;
    blobs: TypedBlobRef[];
    validationStatus?: ValidationStatus;
};
export type PreparedUpdate = {
    action: WriteOpAction.Update;
    uri: AtUri;
    cid: Cid;
    swapCid?: Cid | null;
    record: LexMap;
    blobs: TypedBlobRef[];
    validationStatus?: ValidationStatus;
};
export type PreparedDelete = {
    action: WriteOpAction.Delete;
    uri: AtUri;
    swapCid?: Cid | null;
};
export type CommitOp = {
    action: 'create' | 'update' | 'delete';
    path: string;
    cid: Cid | null;
    prev?: Cid;
};
export type CommitDataWithOps = CommitData & {
    ops: CommitOp[];
    prevData: Cid | null;
};
export type PreparedWrite = PreparedCreate | PreparedUpdate | PreparedDelete;
export type SyncEvtData = {
    cid: Cid;
    rev: string;
    blocks: BlockMap;
};
export declare class InvalidRecordError extends Error {
}
export declare class BadCommitSwapError extends Error {
    cid: Cid;
    constructor(cid: Cid);
}
export declare class BadRecordSwapError extends Error {
    cid: Cid | null;
    constructor(cid: Cid | null);
}
//# sourceMappingURL=types.d.ts.map
import { z } from 'zod';
import { DatetimeString, DidString, HandleString } from '@atproto/lex';
import { AccountStatus } from '../account-manager/account-manager';
import { CommitDataWithOps, SyncEvtData } from '../repo';
import { RepoSeqInsert } from './db';
export declare const formatSeqCommit: (did: string, commitData: CommitDataWithOps) => Promise<RepoSeqInsert>;
export declare const formatSeqSyncEvt: (did: DidString, data: SyncEvtData) => Promise<RepoSeqInsert>;
export declare const syncEvtDataFromCommit: (commitData: CommitDataWithOps) => SyncEvtData;
export declare const formatSeqIdentityEvt: (did: DidString, handle?: HandleString) => Promise<RepoSeqInsert>;
export declare const formatSeqAccountEvt: (did: DidString, status: AccountStatus) => Promise<RepoSeqInsert>;
export declare const commitEvtOp: z.ZodObject<{
    action: z.ZodUnion<[z.ZodLiteral<"create">, z.ZodLiteral<"update">, z.ZodLiteral<"delete">]>;
    path: z.ZodString;
    cid: z.ZodNullable<z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>>;
    prev: z.ZodOptional<z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>>;
}, "strip", z.ZodTypeAny, {
    cid: import("multiformats/cid").CID | null;
    path: string;
    action: "create" | "delete" | "update";
    prev?: import("multiformats/cid").CID | undefined;
}, {
    path: string;
    action: "create" | "delete" | "update";
    cid?: unknown;
    prev?: unknown;
}>;
export type CommitEvtOp = z.infer<typeof commitEvtOp>;
export declare const commitEvt: z.ZodObject<{
    rebase: z.ZodBoolean;
    tooBig: z.ZodBoolean;
    repo: z.ZodEffects<z.ZodString, `did:${string}:${string}`, string>;
    commit: z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>;
    rev: z.ZodString;
    since: z.ZodNullable<z.ZodString>;
    blocks: z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>;
    ops: z.ZodArray<z.ZodObject<{
        action: z.ZodUnion<[z.ZodLiteral<"create">, z.ZodLiteral<"update">, z.ZodLiteral<"delete">]>;
        path: z.ZodString;
        cid: z.ZodNullable<z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>>;
        prev: z.ZodOptional<z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>>;
    }, "strip", z.ZodTypeAny, {
        cid: import("multiformats/cid").CID | null;
        path: string;
        action: "create" | "delete" | "update";
        prev?: import("multiformats/cid").CID | undefined;
    }, {
        path: string;
        action: "create" | "delete" | "update";
        cid?: unknown;
        prev?: unknown;
    }>, "many">;
    blobs: z.ZodArray<z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>, "many">;
    prevData: z.ZodOptional<z.ZodEffects<z.ZodUnknown, import("multiformats/cid").CID, unknown>>;
}, "strip", z.ZodTypeAny, {
    repo: `did:${string}:${string}`;
    since: string | null;
    blocks: Uint8Array<ArrayBuffer>;
    commit: import("multiformats/cid").CID;
    rev: string;
    blobs: import("multiformats/cid").CID[];
    rebase: boolean;
    tooBig: boolean;
    ops: {
        cid: import("multiformats/cid").CID | null;
        path: string;
        action: "create" | "delete" | "update";
        prev?: import("multiformats/cid").CID | undefined;
    }[];
    prevData?: import("multiformats/cid").CID | undefined;
}, {
    repo: string;
    since: string | null;
    blocks: Uint8Array<ArrayBuffer>;
    rev: string;
    blobs: unknown[];
    rebase: boolean;
    tooBig: boolean;
    ops: {
        path: string;
        action: "create" | "delete" | "update";
        cid?: unknown;
        prev?: unknown;
    }[];
    commit?: unknown;
    prevData?: unknown;
}>;
export type CommitEvt = z.infer<typeof commitEvt>;
export declare const syncEvt: z.ZodObject<{
    did: z.ZodEffects<z.ZodString, `did:${string}:${string}`, string>;
    blocks: z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>;
    rev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    did: `did:${string}:${string}`;
    blocks: Uint8Array<ArrayBuffer>;
    rev: string;
}, {
    did: string;
    blocks: Uint8Array<ArrayBuffer>;
    rev: string;
}>;
export type SyncEvt = z.infer<typeof syncEvt>;
export declare const identityEvt: z.ZodObject<{
    did: z.ZodEffects<z.ZodString, `did:${string}:${string}`, string>;
    handle: z.ZodOptional<z.ZodEffects<z.ZodString, `${string}.${string}`, string>>;
}, "strip", z.ZodTypeAny, {
    did: `did:${string}:${string}`;
    handle?: `${string}.${string}` | undefined;
}, {
    did: string;
    handle?: string | undefined;
}>;
export type IdentityEvt = z.infer<typeof identityEvt>;
export declare const accountEvt: z.ZodObject<{
    did: z.ZodEffects<z.ZodString, `did:${string}:${string}`, string>;
    active: z.ZodBoolean;
    status: z.ZodOptional<z.ZodEnum<[AccountStatus.Takendown, AccountStatus.Suspended, AccountStatus.Deleted, AccountStatus.Deactivated]>>;
}, "strip", z.ZodTypeAny, {
    did: `did:${string}:${string}`;
    active: boolean;
    status?: AccountStatus.Takendown | AccountStatus.Suspended | AccountStatus.Deleted | AccountStatus.Deactivated | undefined;
}, {
    did: string;
    active: boolean;
    status?: AccountStatus.Takendown | AccountStatus.Suspended | AccountStatus.Deleted | AccountStatus.Deactivated | undefined;
}>;
export type AccountEvt = z.infer<typeof accountEvt>;
type TypedCommitEvt = {
    type: 'commit';
    seq: number;
    time: DatetimeString;
    evt: CommitEvt;
};
type TypedSyncEvt = {
    type: 'sync';
    seq: number;
    time: DatetimeString;
    evt: SyncEvt;
};
type TypedIdentityEvt = {
    type: 'identity';
    seq: number;
    time: DatetimeString;
    evt: IdentityEvt;
};
type TypedAccountEvt = {
    type: 'account';
    seq: number;
    time: DatetimeString;
    evt: AccountEvt;
};
export type SeqEvt = TypedCommitEvt | TypedSyncEvt | TypedIdentityEvt | TypedAccountEvt;
export {};
//# sourceMappingURL=events.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.subscribeRepos";
export { $nsid };
/** Repository event stream, aka Firehose endpoint. Outputs repo commits with diff data, and identity update events, for all repositories on the current server. See the atproto specifications for details around stream sequencing, repo versioning, CAR diff format, and more. Public and does not require auth; implemented by PDS and Relay. */
declare const main: l.Subscription<"com.atproto.sync.subscribeRepos", l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.IntegerSchema>;
}>, l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<Commit, Commit>>, l.TypedRefSchema<l.TypedObjectValidator<Sync, Sync>>, l.TypedRefSchema<l.TypedObjectValidator<Identity, Identity>>, l.TypedRefSchema<l.TypedObjectValidator<Account, Account>>, l.TypedRefSchema<l.TypedObjectValidator<Info, Info>>], false>, readonly ["FutureCursor", "ConsumerTooSlow"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Message = l.InferSubscriptionMessage<typeof main>;
export declare const $lxm: "com.atproto.sync.subscribeRepos", $params: l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.IntegerSchema>;
}>, $message: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<Commit, Commit>>, l.TypedRefSchema<l.TypedObjectValidator<Sync, Sync>>, l.TypedRefSchema<l.TypedObjectValidator<Identity, Identity>>, l.TypedRefSchema<l.TypedObjectValidator<Account, Account>>, l.TypedRefSchema<l.TypedObjectValidator<Info, Info>>], false>;
/** Represents an update of repository state. Note that empty commits are allowed, which include no repo data changes, but an update to rev and signature. */
type Commit = {
    $type?: 'com.atproto.sync.subscribeRepos#commit';
    /**
     * The stream sequence number of this message.
     */
    seq: number;
    /**
     * @deprecated unused
     */
    rebase: boolean;
    /**
     * @deprecated replaced by #sync event and data limits. Indicates that this commit contained too many ops, or data size was too large. Consumers will need to make a separate request to get missing data.
     */
    tooBig: boolean;
    /**
     * The repo this event comes from. Note that all other message types name this field 'did'.
     */
    repo: l.DidString;
    /**
     * Repo commit object CID.
     */
    commit: l.Cid;
    /**
     * The rev of the emitted commit. Note that this information is also in the commit object included in blocks, unless this is a tooBig event.
     */
    rev: l.TidString;
    /**
     * The rev of the last emitted commit from this repo (if any).
     */
    since: l.TidString | null;
    /**
     * CAR file containing relevant blocks, as a diff since the previous repo state. The commit must be included as a block, and the commit block CID must be the first entry in the CAR header 'roots' list.
     */
    blocks: Uint8Array;
    ops: RepoOp[];
    blobs: l.Cid[];
    /**
     * The root CID of the MST tree for the previous commit from this repo (indicated by the 'since' revision field in this message). Corresponds to the 'data' field in the repo commit object. NOTE: this field is effectively required for the 'inductive' version of firehose.
     */
    prevData?: l.Cid;
    /**
     * Timestamp of when this message was originally broadcast.
     */
    time: l.DatetimeString;
};
export type { Commit };
/** Represents an update of repository state. Note that empty commits are allowed, which include no repo data changes, but an update to rev and signature. */
declare const commit: l.TypedObjectSchema<"com.atproto.sync.subscribeRepos#commit", l.Validator<Commit, Commit>>;
export { commit };
/** Updates the repo to a new state, without necessarily including that state on the firehose. Used to recover from broken commit streams, data loss incidents, or in situations where upstream host does not know recent state of the repository. */
type Sync = {
    $type?: 'com.atproto.sync.subscribeRepos#sync';
    /**
     * The stream sequence number of this message.
     */
    seq: number;
    /**
     * The account this repo event corresponds to. Must match that in the commit object.
     */
    did: l.DidString;
    /**
     * CAR file containing the commit, as a block. The CAR header must include the commit block CID as the first 'root'.
     */
    blocks: Uint8Array;
    /**
     * The rev of the commit. This value must match that in the commit object.
     */
    rev: string;
    /**
     * Timestamp of when this message was originally broadcast.
     */
    time: l.DatetimeString;
};
export type { Sync };
/** Updates the repo to a new state, without necessarily including that state on the firehose. Used to recover from broken commit streams, data loss incidents, or in situations where upstream host does not know recent state of the repository. */
declare const sync: l.TypedObjectSchema<"com.atproto.sync.subscribeRepos#sync", l.Validator<Sync, Sync>>;
export { sync };
/** Represents a change to an account's identity. Could be an updated handle, signing key, or pds hosting endpoint. Serves as a prod to all downstream services to refresh their identity cache. */
type Identity = {
    $type?: 'com.atproto.sync.subscribeRepos#identity';
    seq: number;
    did: l.DidString;
    time: l.DatetimeString;
    /**
     * The current handle for the account, or 'handle.invalid' if validation fails. This field is optional, might have been validated or passed-through from an upstream source. Semantics and behaviors for PDS vs Relay may evolve in the future; see atproto specs for more details.
     */
    handle?: l.HandleString;
};
export type { Identity };
/** Represents a change to an account's identity. Could be an updated handle, signing key, or pds hosting endpoint. Serves as a prod to all downstream services to refresh their identity cache. */
declare const identity: l.TypedObjectSchema<"com.atproto.sync.subscribeRepos#identity", l.Validator<Identity, Identity>>;
export { identity };
/** Represents a change to an account's status on a host (eg, PDS or Relay). The semantics of this event are that the status is at the host which emitted the event, not necessarily that at the currently active PDS. Eg, a Relay takedown would emit a takedown with active=false, even if the PDS is still active. */
type Account = {
    $type?: 'com.atproto.sync.subscribeRepos#account';
    seq: number;
    did: l.DidString;
    time: l.DatetimeString;
    /**
     * Indicates that the account has a repository which can be fetched from the host that emitted this event.
     */
    active: boolean;
    /**
     * If active=false, this optional field indicates a reason for why the account is not active.
     */
    status?: 'takendown' | 'suspended' | 'deleted' | 'deactivated' | 'desynchronized' | 'throttled' | l.UnknownString;
};
export type { Account };
/** Represents a change to an account's status on a host (eg, PDS or Relay). The semantics of this event are that the status is at the host which emitted the event, not necessarily that at the currently active PDS. Eg, a Relay takedown would emit a takedown with active=false, even if the PDS is still active. */
declare const account: l.TypedObjectSchema<"com.atproto.sync.subscribeRepos#account", l.Validator<Account, Account>>;
export { account };
type Info = {
    $type?: 'com.atproto.sync.subscribeRepos#info';
    name: 'OutdatedCursor' | l.UnknownString;
    message?: string;
};
export type { Info };
declare const info: l.TypedObjectSchema<"com.atproto.sync.subscribeRepos#info", l.Validator<Info, Info>>;
export { info };
/** A repo operation, ie a mutation of a single record. */
type RepoOp = {
    $type?: 'com.atproto.sync.subscribeRepos#repoOp';
    action: 'create' | 'update' | 'delete' | l.UnknownString;
    path: string;
    /**
     * For creates and updates, the new record CID. For deletions, null.
     */
    cid: l.Cid | null;
    /**
     * For updates and deletes, the previous record CID (required for inductive firehose). For creations, field should not be defined.
     */
    prev?: l.Cid;
};
export type { RepoOp };
/** A repo operation, ie a mutation of a single record. */
declare const repoOp: l.TypedObjectSchema<"com.atproto.sync.subscribeRepos#repoOp", l.Validator<RepoOp, RepoOp>>;
export { repoOp };
//# sourceMappingURL=subscribeRepos.defs.d.ts.map
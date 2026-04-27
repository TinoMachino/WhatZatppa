import { l } from '@atproto/lex';
import * as ServerDefs from '../server/defs.defs.js';
declare const $nsid = "com.atproto.admin.defs";
export { $nsid };
type StatusAttr = {
    $type?: 'com.atproto.admin.defs#statusAttr';
    applied: boolean;
    ref?: string;
};
export type { StatusAttr };
declare const statusAttr: l.TypedObjectSchema<"com.atproto.admin.defs#statusAttr", l.Validator<StatusAttr, StatusAttr>>;
export { statusAttr };
type AccountView = {
    $type?: 'com.atproto.admin.defs#accountView';
    did: l.DidString;
    handle: l.HandleString;
    email?: string;
    relatedRecords?: l.LexMap[];
    indexedAt: l.DatetimeString;
    invitedBy?: ServerDefs.InviteCode;
    invites?: ServerDefs.InviteCode[];
    invitesDisabled?: boolean;
    emailConfirmedAt?: l.DatetimeString;
    inviteNote?: string;
    deactivatedAt?: l.DatetimeString;
    threatSignatures?: ThreatSignature[];
};
export type { AccountView };
declare const accountView: l.TypedObjectSchema<"com.atproto.admin.defs#accountView", l.Validator<AccountView, AccountView>>;
export { accountView };
type RepoRef = {
    $type?: 'com.atproto.admin.defs#repoRef';
    did: l.DidString;
};
export type { RepoRef };
declare const repoRef: l.TypedObjectSchema<"com.atproto.admin.defs#repoRef", l.Validator<RepoRef, RepoRef>>;
export { repoRef };
type RepoBlobRef = {
    $type?: 'com.atproto.admin.defs#repoBlobRef';
    did: l.DidString;
    cid: l.CidString;
    recordUri?: l.AtUriString;
};
export type { RepoBlobRef };
declare const repoBlobRef: l.TypedObjectSchema<"com.atproto.admin.defs#repoBlobRef", l.Validator<RepoBlobRef, RepoBlobRef>>;
export { repoBlobRef };
type ThreatSignature = {
    $type?: 'com.atproto.admin.defs#threatSignature';
    property: string;
    value: string;
};
export type { ThreatSignature };
declare const threatSignature: l.TypedObjectSchema<"com.atproto.admin.defs#threatSignature", l.Validator<ThreatSignature, ThreatSignature>>;
export { threatSignature };
//# sourceMappingURL=defs.defs.d.ts.map
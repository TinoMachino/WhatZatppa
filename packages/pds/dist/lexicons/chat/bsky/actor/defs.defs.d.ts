import { l } from '@atproto/lex';
import * as ActorDefs from '../../../app/bsky/actor/defs.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
declare const $nsid = "chat.bsky.actor.defs";
export { $nsid };
type MemberRole = 'owner' | 'standard' | l.UnknownString;
export type { MemberRole };
declare const memberRole: l.StringSchema<{
    knownValues: ["owner", "standard"];
}>;
export { memberRole };
type ProfileViewBasic = {
    $type?: 'chat.bsky.actor.defs#profileViewBasic';
    did: l.DidString;
    handle: l.HandleString;
    displayName?: string;
    avatar?: l.UriString;
    associated?: ActorDefs.ProfileAssociated;
    viewer?: ActorDefs.ViewerState;
    labels?: LabelDefs.Label[];
    createdAt?: l.DatetimeString;
    /**
     * Set to true when the actor cannot actively participate in conversations
     */
    chatDisabled?: boolean;
    verification?: ActorDefs.VerificationState;
    /**
     * Union field that has data specific to different kinds of convos.
     */
    kind?: l.$Typed<DirectConvoMember> | l.$Typed<GroupConvoMember> | l.$Typed<PastGroupConvoMember> | l.Unknown$TypedObject;
};
export type { ProfileViewBasic };
declare const profileViewBasic: l.TypedObjectSchema<"chat.bsky.actor.defs#profileViewBasic", l.Validator<ProfileViewBasic, ProfileViewBasic>>;
export { profileViewBasic };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
type DirectConvoMember = {
    $type?: 'chat.bsky.actor.defs#directConvoMember';
};
export type { DirectConvoMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
declare const directConvoMember: l.TypedObjectSchema<"chat.bsky.actor.defs#directConvoMember", l.Validator<DirectConvoMember, DirectConvoMember>>;
export { directConvoMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. A current group convo member. */
type GroupConvoMember = {
    $type?: 'chat.bsky.actor.defs#groupConvoMember';
    /**
     * Who added this member. Only present if the member was added (instead of joining via link).
     */
    addedBy?: ProfileViewBasic;
    /**
     * The member's role within this conversation. Only present in group conversation member lists.
     */
    role: MemberRole;
};
export type { GroupConvoMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. A current group convo member. */
declare const groupConvoMember: l.TypedObjectSchema<"chat.bsky.actor.defs#groupConvoMember", l.Validator<GroupConvoMember, GroupConvoMember>>;
export { groupConvoMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. A past group convo member. */
type PastGroupConvoMember = {
    $type?: 'chat.bsky.actor.defs#pastGroupConvoMember';
};
export type { PastGroupConvoMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. A past group convo member. */
declare const pastGroupConvoMember: l.TypedObjectSchema<"chat.bsky.actor.defs#pastGroupConvoMember", l.Validator<PastGroupConvoMember, PastGroupConvoMember>>;
export { pastGroupConvoMember };
//# sourceMappingURL=defs.defs.d.ts.map
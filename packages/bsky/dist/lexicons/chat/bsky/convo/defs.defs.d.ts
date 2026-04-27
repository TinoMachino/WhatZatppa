import { l } from '@atproto/lex';
import * as RichtextFacet from '../../../app/bsky/richtext/facet.defs.js';
import * as EmbedRecord from '../../../app/bsky/embed/record.defs.js';
import * as ActorDefs from '../actor/defs.defs.js';
import * as GroupDefs from '../group/defs.defs.js';
declare const $nsid = "chat.bsky.convo.defs";
export { $nsid };
type ConvoKind = 'direct' | 'group' | l.UnknownString;
export type { ConvoKind };
declare const convoKind: l.StringSchema<{
    knownValues: ["direct", "group"];
}>;
export { convoKind };
type ConvoLockStatus = 'unlocked' | 'locked' | 'locked-permanently' | l.UnknownString;
export type { ConvoLockStatus };
declare const convoLockStatus: l.StringSchema<{
    knownValues: ["unlocked", "locked", "locked-permanently"];
}>;
export { convoLockStatus };
type ConvoStatus = 'request' | 'accepted' | l.UnknownString;
export type { ConvoStatus };
declare const convoStatus: l.StringSchema<{
    knownValues: ["request", "accepted"];
}>;
export { convoStatus };
type MessageRef = {
    $type?: 'chat.bsky.convo.defs#messageRef';
    did: l.DidString;
    convoId: string;
    messageId: string;
};
export type { MessageRef };
declare const messageRef: l.TypedObjectSchema<"chat.bsky.convo.defs#messageRef", l.Validator<MessageRef, MessageRef>>;
export { messageRef };
type MessageInput = {
    $type?: 'chat.bsky.convo.defs#messageInput';
    text: string;
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
    facets?: RichtextFacet.Main[];
    embed?: l.$Typed<EmbedRecord.Main> | l.Unknown$TypedObject;
};
export type { MessageInput };
declare const messageInput: l.TypedObjectSchema<"chat.bsky.convo.defs#messageInput", l.Validator<MessageInput, MessageInput>>;
export { messageInput };
type MessageView = {
    $type?: 'chat.bsky.convo.defs#messageView';
    id: string;
    rev: string;
    text: string;
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
    facets?: RichtextFacet.Main[];
    embed?: l.$Typed<EmbedRecord.View> | l.Unknown$TypedObject;
    /**
     * Reactions to this message, in ascending order of creation time.
     */
    reactions?: ReactionView[];
    sender: MessageViewSender;
    sentAt: l.DatetimeString;
};
export type { MessageView };
declare const messageView: l.TypedObjectSchema<"chat.bsky.convo.defs#messageView", l.Validator<MessageView, MessageView>>;
export { messageView };
type SystemMessageReferredUser = {
    $type?: 'chat.bsky.convo.defs#systemMessageReferredUser';
    did: l.DidString;
};
export type { SystemMessageReferredUser };
declare const systemMessageReferredUser: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageReferredUser", l.Validator<SystemMessageReferredUser, SystemMessageReferredUser>>;
export { systemMessageReferredUser };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
type SystemMessageView = {
    $type?: 'chat.bsky.convo.defs#systemMessageView';
    id: string;
    rev: string;
    sentAt: l.DatetimeString;
    data: l.$Typed<SystemMessageDataAddMember> | l.$Typed<SystemMessageDataRemoveMember> | l.$Typed<SystemMessageDataMemberJoin> | l.$Typed<SystemMessageDataMemberLeave> | l.$Typed<SystemMessageDataLockConvo> | l.$Typed<SystemMessageDataUnlockConvo> | l.$Typed<SystemMessageDataLockConvoPermanently> | l.$Typed<SystemMessageDataEditGroup> | l.$Typed<SystemMessageDataCreateJoinLink> | l.$Typed<SystemMessageDataEditJoinLink> | l.$Typed<SystemMessageDataEnableJoinLink> | l.$Typed<SystemMessageDataDisableJoinLink> | l.Unknown$TypedObject;
};
export type { SystemMessageView };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
declare const systemMessageView: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageView", l.Validator<SystemMessageView, SystemMessageView>>;
export { systemMessageView };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user was added to the group convo. */
type SystemMessageDataAddMember = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataAddMember';
    /**
     * Current view of the member who was added.
     */
    member: SystemMessageReferredUser;
    /**
     * Role the user was added to the group with. The role from 'member' will reflect the current data, not historical.
     */
    role: ActorDefs.MemberRole;
    addedBy: SystemMessageReferredUser;
};
export type { SystemMessageDataAddMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user was added to the group convo. */
declare const systemMessageDataAddMember: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataAddMember", l.Validator<SystemMessageDataAddMember, SystemMessageDataAddMember>>;
export { systemMessageDataAddMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user was removed from the group convo. */
type SystemMessageDataRemoveMember = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataRemoveMember';
    /**
     * Current view of the member who was removed.
     */
    member: SystemMessageReferredUser;
    removedBy: SystemMessageReferredUser;
};
export type { SystemMessageDataRemoveMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user was removed from the group convo. */
declare const systemMessageDataRemoveMember: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataRemoveMember", l.Validator<SystemMessageDataRemoveMember, SystemMessageDataRemoveMember>>;
export { systemMessageDataRemoveMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user joined the group convo via join link. */
type SystemMessageDataMemberJoin = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataMemberJoin';
    /**
     * Current view of the member who joined.
     */
    member: SystemMessageReferredUser;
    /**
     * Role the user was added to the group with. The role from 'member' will reflect the current data, not historical.
     */
    role: ActorDefs.MemberRole;
    /**
     * If join link was configured to require approval, this will be set to who approved the request. Undefined if approval was not required.
     */
    approvedBy?: SystemMessageReferredUser;
};
export type { SystemMessageDataMemberJoin };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user joined the group convo via join link. */
declare const systemMessageDataMemberJoin: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataMemberJoin", l.Validator<SystemMessageDataMemberJoin, SystemMessageDataMemberJoin>>;
export { systemMessageDataMemberJoin };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user voluntarily left the group convo. */
type SystemMessageDataMemberLeave = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataMemberLeave';
    /**
     * Current view of the member who left the group.
     */
    member: SystemMessageReferredUser;
};
export type { SystemMessageDataMemberLeave };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating a user voluntarily left the group convo. */
declare const systemMessageDataMemberLeave: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataMemberLeave", l.Validator<SystemMessageDataMemberLeave, SystemMessageDataMemberLeave>>;
export { systemMessageDataMemberLeave };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group convo was locked. */
type SystemMessageDataLockConvo = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataLockConvo';
    /**
     * Current view of the member who locked the group.
     */
    lockedBy: SystemMessageReferredUser;
};
export type { SystemMessageDataLockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group convo was locked. */
declare const systemMessageDataLockConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataLockConvo", l.Validator<SystemMessageDataLockConvo, SystemMessageDataLockConvo>>;
export { systemMessageDataLockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group convo was unlocked. */
type SystemMessageDataUnlockConvo = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataUnlockConvo';
    /**
     * Current view of the member who unlocked the group.
     */
    unlockedBy: SystemMessageReferredUser;
};
export type { SystemMessageDataUnlockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group convo was unlocked. */
declare const systemMessageDataUnlockConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataUnlockConvo", l.Validator<SystemMessageDataUnlockConvo, SystemMessageDataUnlockConvo>>;
export { systemMessageDataUnlockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group convo was locked permanently. */
type SystemMessageDataLockConvoPermanently = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataLockConvoPermanently';
    /**
     * Current view of the member who locked the group.
     */
    lockedBy: SystemMessageReferredUser;
};
export type { SystemMessageDataLockConvoPermanently };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group convo was locked permanently. */
declare const systemMessageDataLockConvoPermanently: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataLockConvoPermanently", l.Validator<SystemMessageDataLockConvoPermanently, SystemMessageDataLockConvoPermanently>>;
export { systemMessageDataLockConvoPermanently };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group info was edited. */
type SystemMessageDataEditGroup = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataEditGroup';
    /**
     * Group name that was replaced.
     */
    oldName?: string;
    /**
     * Group name that replaced the old.
     */
    newName?: string;
};
export type { SystemMessageDataEditGroup };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group info was edited. */
declare const systemMessageDataEditGroup: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataEditGroup", l.Validator<SystemMessageDataEditGroup, SystemMessageDataEditGroup>>;
export { systemMessageDataEditGroup };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was created. */
type SystemMessageDataCreateJoinLink = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataCreateJoinLink';
};
export type { SystemMessageDataCreateJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was created. */
declare const systemMessageDataCreateJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataCreateJoinLink", l.Validator<SystemMessageDataCreateJoinLink, SystemMessageDataCreateJoinLink>>;
export { systemMessageDataCreateJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was edited. */
type SystemMessageDataEditJoinLink = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataEditJoinLink';
};
export type { SystemMessageDataEditJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was edited. */
declare const systemMessageDataEditJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataEditJoinLink", l.Validator<SystemMessageDataEditJoinLink, SystemMessageDataEditJoinLink>>;
export { systemMessageDataEditJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was enabled. */
type SystemMessageDataEnableJoinLink = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataEnableJoinLink';
};
export type { SystemMessageDataEnableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was enabled. */
declare const systemMessageDataEnableJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataEnableJoinLink", l.Validator<SystemMessageDataEnableJoinLink, SystemMessageDataEnableJoinLink>>;
export { systemMessageDataEnableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was disabled. */
type SystemMessageDataDisableJoinLink = {
    $type?: 'chat.bsky.convo.defs#systemMessageDataDisableJoinLink';
};
export type { SystemMessageDataDisableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. System message indicating the group join link was disabled. */
declare const systemMessageDataDisableJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#systemMessageDataDisableJoinLink", l.Validator<SystemMessageDataDisableJoinLink, SystemMessageDataDisableJoinLink>>;
export { systemMessageDataDisableJoinLink };
type DeletedMessageView = {
    $type?: 'chat.bsky.convo.defs#deletedMessageView';
    id: string;
    rev: string;
    sender: MessageViewSender;
    sentAt: l.DatetimeString;
};
export type { DeletedMessageView };
declare const deletedMessageView: l.TypedObjectSchema<"chat.bsky.convo.defs#deletedMessageView", l.Validator<DeletedMessageView, DeletedMessageView>>;
export { deletedMessageView };
type MessageViewSender = {
    $type?: 'chat.bsky.convo.defs#messageViewSender';
    did: l.DidString;
};
export type { MessageViewSender };
declare const messageViewSender: l.TypedObjectSchema<"chat.bsky.convo.defs#messageViewSender", l.Validator<MessageViewSender, MessageViewSender>>;
export { messageViewSender };
type ReactionView = {
    $type?: 'chat.bsky.convo.defs#reactionView';
    value: string;
    sender: ReactionViewSender;
    createdAt: l.DatetimeString;
};
export type { ReactionView };
declare const reactionView: l.TypedObjectSchema<"chat.bsky.convo.defs#reactionView", l.Validator<ReactionView, ReactionView>>;
export { reactionView };
type ReactionViewSender = {
    $type?: 'chat.bsky.convo.defs#reactionViewSender';
    did: l.DidString;
};
export type { ReactionViewSender };
declare const reactionViewSender: l.TypedObjectSchema<"chat.bsky.convo.defs#reactionViewSender", l.Validator<ReactionViewSender, ReactionViewSender>>;
export { reactionViewSender };
type MessageAndReactionView = {
    $type?: 'chat.bsky.convo.defs#messageAndReactionView';
    message: MessageView;
    reaction: ReactionView;
};
export type { MessageAndReactionView };
declare const messageAndReactionView: l.TypedObjectSchema<"chat.bsky.convo.defs#messageAndReactionView", l.Validator<MessageAndReactionView, MessageAndReactionView>>;
export { messageAndReactionView };
type ConvoView = {
    $type?: 'chat.bsky.convo.defs#convoView';
    id: string;
    rev: string;
    /**
     * Members of this conversation. For direct convos, it will be an immutable list of the 2 members. For group convos, it will a list of important members (the first few members, the viewer, the member who invited the viewer, the member who sent the last message, the member who sent the last reaction), but will not contain the full list of members. Use chat.bsky.convo.getConvoMembers to list all members.
     */
    members: ActorDefs.ProfileViewBasic[];
    lastMessage?: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.$Typed<SystemMessageView> | l.Unknown$TypedObject;
    lastReaction?: l.$Typed<MessageAndReactionView> | l.Unknown$TypedObject;
    muted: boolean;
    /**
     * Convo status for the viewer member (not the convo itself).
     */
    status?: ConvoStatus;
    unreadCount: number;
    /**
     * Union field that has data specific to different kinds of convos.
     */
    kind?: l.$Typed<DirectConvo> | l.$Typed<GroupConvo> | l.Unknown$TypedObject;
};
export type { ConvoView };
declare const convoView: l.TypedObjectSchema<"chat.bsky.convo.defs#convoView", l.Validator<ConvoView, ConvoView>>;
export { convoView };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
type DirectConvo = {
    $type?: 'chat.bsky.convo.defs#directConvo';
};
export type { DirectConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
declare const directConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#directConvo", l.Validator<DirectConvo, DirectConvo>>;
export { directConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
type GroupConvo = {
    $type?: 'chat.bsky.convo.defs#groupConvo';
    /**
     * The display name of the group conversation.
     */
    name: string;
    /**
     * The total number of members in the group conversation.
     */
    memberCount: number;
    joinLink?: GroupDefs.JoinLinkView;
    /**
     * The lock status of the conversation.
     */
    lockStatus: ConvoLockStatus;
};
export type { GroupConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. */
declare const groupConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#groupConvo", l.Validator<GroupConvo, GroupConvo>>;
export { groupConvo };
/** Event indicating a convo containing the viewer was started. Can be direct or group. When a member is added to a group convo, they also get this event. */
type LogBeginConvo = {
    $type?: 'chat.bsky.convo.defs#logBeginConvo';
    rev: string;
    convoId: string;
};
export type { LogBeginConvo };
/** Event indicating a convo containing the viewer was started. Can be direct or group. When a member is added to a group convo, they also get this event. */
declare const logBeginConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logBeginConvo", l.Validator<LogBeginConvo, LogBeginConvo>>;
export { logBeginConvo };
/** Event indicating the viewer accepted a convo, and it can be moved out of the request inbox. Can be direct or group. */
type LogAcceptConvo = {
    $type?: 'chat.bsky.convo.defs#logAcceptConvo';
    rev: string;
    convoId: string;
};
export type { LogAcceptConvo };
/** Event indicating the viewer accepted a convo, and it can be moved out of the request inbox. Can be direct or group. */
declare const logAcceptConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logAcceptConvo", l.Validator<LogAcceptConvo, LogAcceptConvo>>;
export { logAcceptConvo };
/** Event indicating the viewer left a convo. Can be direct or group. */
type LogLeaveConvo = {
    $type?: 'chat.bsky.convo.defs#logLeaveConvo';
    rev: string;
    convoId: string;
};
export type { LogLeaveConvo };
/** Event indicating the viewer left a convo. Can be direct or group. */
declare const logLeaveConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logLeaveConvo", l.Validator<LogLeaveConvo, LogLeaveConvo>>;
export { logLeaveConvo };
/** Event indicating the viewer muted a convo. Can be direct or group. */
type LogMuteConvo = {
    $type?: 'chat.bsky.convo.defs#logMuteConvo';
    rev: string;
    convoId: string;
};
export type { LogMuteConvo };
/** Event indicating the viewer muted a convo. Can be direct or group. */
declare const logMuteConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logMuteConvo", l.Validator<LogMuteConvo, LogMuteConvo>>;
export { logMuteConvo };
/** Event indicating the viewer unmuted a convo. Can be direct or group. */
type LogUnmuteConvo = {
    $type?: 'chat.bsky.convo.defs#logUnmuteConvo';
    rev: string;
    convoId: string;
};
export type { LogUnmuteConvo };
/** Event indicating the viewer unmuted a convo. Can be direct or group. */
declare const logUnmuteConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logUnmuteConvo", l.Validator<LogUnmuteConvo, LogUnmuteConvo>>;
export { logUnmuteConvo };
/** Event indicating a user-originated message was created. Is not emitted for system messages. */
type LogCreateMessage = {
    $type?: 'chat.bsky.convo.defs#logCreateMessage';
    rev: string;
    convoId: string;
    message: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.Unknown$TypedObject;
};
export type { LogCreateMessage };
/** Event indicating a user-originated message was created. Is not emitted for system messages. */
declare const logCreateMessage: l.TypedObjectSchema<"chat.bsky.convo.defs#logCreateMessage", l.Validator<LogCreateMessage, LogCreateMessage>>;
export { logCreateMessage };
/** Event indicating a user-originated message was deleted. Is not emitted for system messages. */
type LogDeleteMessage = {
    $type?: 'chat.bsky.convo.defs#logDeleteMessage';
    rev: string;
    convoId: string;
    message: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.Unknown$TypedObject;
};
export type { LogDeleteMessage };
/** Event indicating a user-originated message was deleted. Is not emitted for system messages. */
declare const logDeleteMessage: l.TypedObjectSchema<"chat.bsky.convo.defs#logDeleteMessage", l.Validator<LogDeleteMessage, LogDeleteMessage>>;
export { logDeleteMessage };
/** @deprecated use logReadConvo instead. Event indicating a convo was read up to a certain message. */
type LogReadMessage = {
    $type?: 'chat.bsky.convo.defs#logReadMessage';
    rev: string;
    convoId: string;
    message: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.$Typed<SystemMessageView> | l.Unknown$TypedObject;
};
export type { LogReadMessage };
/** @deprecated use logReadConvo instead. Event indicating a convo was read up to a certain message. */
declare const logReadMessage: l.TypedObjectSchema<"chat.bsky.convo.defs#logReadMessage", l.Validator<LogReadMessage, LogReadMessage>>;
export { logReadMessage };
/** Event indicating a reaction was added to a message. */
type LogAddReaction = {
    $type?: 'chat.bsky.convo.defs#logAddReaction';
    rev: string;
    convoId: string;
    message: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.Unknown$TypedObject;
    reaction: ReactionView;
};
export type { LogAddReaction };
/** Event indicating a reaction was added to a message. */
declare const logAddReaction: l.TypedObjectSchema<"chat.bsky.convo.defs#logAddReaction", l.Validator<LogAddReaction, LogAddReaction>>;
export { logAddReaction };
/** Event indicating a reaction was removed from a message. */
type LogRemoveReaction = {
    $type?: 'chat.bsky.convo.defs#logRemoveReaction';
    rev: string;
    convoId: string;
    message: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.Unknown$TypedObject;
    reaction: ReactionView;
};
export type { LogRemoveReaction };
/** Event indicating a reaction was removed from a message. */
declare const logRemoveReaction: l.TypedObjectSchema<"chat.bsky.convo.defs#logRemoveReaction", l.Validator<LogRemoveReaction, LogRemoveReaction>>;
export { logRemoveReaction };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a convo was read up to a certain message. */
type LogReadConvo = {
    $type?: 'chat.bsky.convo.defs#logReadConvo';
    rev: string;
    convoId: string;
    message: l.$Typed<MessageView> | l.$Typed<DeletedMessageView> | l.$Typed<SystemMessageView> | l.Unknown$TypedObject;
};
export type { LogReadConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a convo was read up to a certain message. */
declare const logReadConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logReadConvo", l.Validator<LogReadConvo, LogReadConvo>>;
export { logReadConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member was added to a group convo. The member who was added gets a logBeginConvo (to create the convo) but also a logAddMember (to show the system message as the first message the user sees). */
type LogAddMember = {
    $type?: 'chat.bsky.convo.defs#logAddMember';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataAddMember
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogAddMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member was added to a group convo. The member who was added gets a logBeginConvo (to create the convo) but also a logAddMember (to show the system message as the first message the user sees). */
declare const logAddMember: l.TypedObjectSchema<"chat.bsky.convo.defs#logAddMember", l.Validator<LogAddMember, LogAddMember>>;
export { logAddMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member was removed from a group convo. The member who was removed gets a logLeaveConvo (to leave the convo) but not a logRemoveMember (because they already left, so can't see the system message). */
type LogRemoveMember = {
    $type?: 'chat.bsky.convo.defs#logRemoveMember';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataRemoveMember
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogRemoveMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member was removed from a group convo. The member who was removed gets a logLeaveConvo (to leave the convo) but not a logRemoveMember (because they already left, so can't see the system message). */
declare const logRemoveMember: l.TypedObjectSchema<"chat.bsky.convo.defs#logRemoveMember", l.Validator<LogRemoveMember, LogRemoveMember>>;
export { logRemoveMember };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member joined a group convo via join link. The member who was added gets a logBeginConvo (to create the convo) but also a logMemberJoin (to show the system message as the first message the user sees). */
type LogMemberJoin = {
    $type?: 'chat.bsky.convo.defs#logMemberJoin';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataMemberJoin
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogMemberJoin };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member joined a group convo via join link. The member who was added gets a logBeginConvo (to create the convo) but also a logMemberJoin (to show the system message as the first message the user sees). */
declare const logMemberJoin: l.TypedObjectSchema<"chat.bsky.convo.defs#logMemberJoin", l.Validator<LogMemberJoin, LogMemberJoin>>;
export { logMemberJoin };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member voluntarily left a group convo. The member who was removed gets a logLeaveConvo (to leave the convo) but not a logMemberLeave (because they already left, so can't see the system message). */
type LogMemberLeave = {
    $type?: 'chat.bsky.convo.defs#logMemberLeave';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataMemberLeave
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogMemberLeave };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a member voluntarily left a group convo. The member who was removed gets a logLeaveConvo (to leave the convo) but not a logMemberLeave (because they already left, so can't see the system message). */
declare const logMemberLeave: l.TypedObjectSchema<"chat.bsky.convo.defs#logMemberLeave", l.Validator<LogMemberLeave, LogMemberLeave>>;
export { logMemberLeave };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a group convo was locked. */
type LogLockConvo = {
    $type?: 'chat.bsky.convo.defs#logLockConvo';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataLockConvo
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogLockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a group convo was locked. */
declare const logLockConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logLockConvo", l.Validator<LogLockConvo, LogLockConvo>>;
export { logLockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a group convo was unlocked. */
type LogUnlockConvo = {
    $type?: 'chat.bsky.convo.defs#logUnlockConvo';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataUnlockConvo
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogUnlockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a group convo was unlocked. */
declare const logUnlockConvo: l.TypedObjectSchema<"chat.bsky.convo.defs#logUnlockConvo", l.Validator<LogUnlockConvo, LogUnlockConvo>>;
export { logUnlockConvo };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a group convo was locked permanently. */
type LogLockConvoPermanently = {
    $type?: 'chat.bsky.convo.defs#logLockConvoPermanently';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataLockConvoPermanently
     */
    message: SystemMessageView;
    /**
     * Profiles referred in the system message.
     */
    relatedProfiles: ActorDefs.ProfileViewBasic[];
};
export type { LogLockConvoPermanently };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a group convo was locked permanently. */
declare const logLockConvoPermanently: l.TypedObjectSchema<"chat.bsky.convo.defs#logLockConvoPermanently", l.Validator<LogLockConvoPermanently, LogLockConvoPermanently>>;
export { logLockConvoPermanently };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating info about group convo was edited. */
type LogEditGroup = {
    $type?: 'chat.bsky.convo.defs#logEditGroup';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataEditGroup
     */
    message: SystemMessageView;
};
export type { LogEditGroup };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating info about group convo was edited. */
declare const logEditGroup: l.TypedObjectSchema<"chat.bsky.convo.defs#logEditGroup", l.Validator<LogEditGroup, LogEditGroup>>;
export { logEditGroup };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join link was created for a group convo. */
type LogCreateJoinLink = {
    $type?: 'chat.bsky.convo.defs#logCreateJoinLink';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataCreateJoinLink
     */
    message: SystemMessageView;
};
export type { LogCreateJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join link was created for a group convo. */
declare const logCreateJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#logCreateJoinLink", l.Validator<LogCreateJoinLink, LogCreateJoinLink>>;
export { logCreateJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a settings about a join link for a group convo were edited. */
type LogEditJoinLink = {
    $type?: 'chat.bsky.convo.defs#logEditJoinLink';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataEditJoinLink
     */
    message: SystemMessageView;
};
export type { LogEditJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a settings about a join link for a group convo were edited. */
declare const logEditJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#logEditJoinLink", l.Validator<LogEditJoinLink, LogEditJoinLink>>;
export { logEditJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join link was enabled for a group convo. */
type LogEnableJoinLink = {
    $type?: 'chat.bsky.convo.defs#logEnableJoinLink';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataEnableJoinLink
     */
    message: SystemMessageView;
};
export type { LogEnableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join link was enabled for a group convo. */
declare const logEnableJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#logEnableJoinLink", l.Validator<LogEnableJoinLink, LogEnableJoinLink>>;
export { logEnableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join link was disabled for a group convo. */
type LogDisableJoinLink = {
    $type?: 'chat.bsky.convo.defs#logDisableJoinLink';
    rev: string;
    convoId: string;
    /**
     * A system message with data of type #systemMessageDataDisableJoinLink
     */
    message: SystemMessageView;
};
export type { LogDisableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join link was disabled for a group convo. */
declare const logDisableJoinLink: l.TypedObjectSchema<"chat.bsky.convo.defs#logDisableJoinLink", l.Validator<LogDisableJoinLink, LogDisableJoinLink>>;
export { logDisableJoinLink };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was made to a group the viewer owns. Only the owner gets this. */
type LogIncomingJoinRequest = {
    $type?: 'chat.bsky.convo.defs#logIncomingJoinRequest';
    rev: string;
    convoId: string;
    /**
     * Prospective member who requested to join.
     */
    member: ActorDefs.ProfileViewBasic;
};
export type { LogIncomingJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was made to a group the viewer owns. Only the owner gets this. */
declare const logIncomingJoinRequest: l.TypedObjectSchema<"chat.bsky.convo.defs#logIncomingJoinRequest", l.Validator<LogIncomingJoinRequest, LogIncomingJoinRequest>>;
export { logIncomingJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was approved by the viewer. Only the owner gets this. The approved member gets a logBeginConvo. */
type LogApproveJoinRequest = {
    $type?: 'chat.bsky.convo.defs#logApproveJoinRequest';
    rev: string;
    convoId: string;
    /**
     * Prospective member who requested to join.
     */
    member: ActorDefs.ProfileViewBasic;
};
export type { LogApproveJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was approved by the viewer. Only the owner gets this. The approved member gets a logBeginConvo. */
declare const logApproveJoinRequest: l.TypedObjectSchema<"chat.bsky.convo.defs#logApproveJoinRequest", l.Validator<LogApproveJoinRequest, LogApproveJoinRequest>>;
export { logApproveJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was rejected by the viewer. Only the owner gets this. */
type LogRejectJoinRequest = {
    $type?: 'chat.bsky.convo.defs#logRejectJoinRequest';
    rev: string;
    convoId: string;
    /**
     * Prospective member who requested to join.
     */
    member: ActorDefs.ProfileViewBasic;
};
export type { LogRejectJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was rejected by the viewer. Only the owner gets this. */
declare const logRejectJoinRequest: l.TypedObjectSchema<"chat.bsky.convo.defs#logRejectJoinRequest", l.Validator<LogRejectJoinRequest, LogRejectJoinRequest>>;
export { logRejectJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was made by the viewer. */
type LogOutgoingJoinRequest = {
    $type?: 'chat.bsky.convo.defs#logOutgoingJoinRequest';
    rev: string;
    convoId: string;
};
export type { LogOutgoingJoinRequest };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Event indicating a join request was made by the viewer. */
declare const logOutgoingJoinRequest: l.TypedObjectSchema<"chat.bsky.convo.defs#logOutgoingJoinRequest", l.Validator<LogOutgoingJoinRequest, LogOutgoingJoinRequest>>;
export { logOutgoingJoinRequest };
//# sourceMappingURL=defs.defs.d.ts.map
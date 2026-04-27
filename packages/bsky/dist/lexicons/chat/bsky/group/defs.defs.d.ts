import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "chat.bsky.group.defs";
export { $nsid };
type LinkEnabledStatus = 'enabled' | 'disabled' | l.UnknownString;
export type { LinkEnabledStatus };
declare const linkEnabledStatus: l.StringSchema<{
    knownValues: ["enabled", "disabled"];
}>;
export { linkEnabledStatus };
type JoinRule = 'anyone' | 'followedByOwner' | l.UnknownString;
export type { JoinRule };
declare const joinRule: l.StringSchema<{
    knownValues: ["anyone", "followedByOwner"];
}>;
export { joinRule };
type JoinLinkView = {
    $type?: 'chat.bsky.group.defs#joinLinkView';
    code: string;
    enabledStatus: LinkEnabledStatus;
    requireApproval: boolean;
    joinRule: JoinRule;
    createdAt: l.DatetimeString;
};
export type { JoinLinkView };
declare const joinLinkView: l.TypedObjectSchema<"chat.bsky.group.defs#joinLinkView", l.Validator<JoinLinkView, JoinLinkView>>;
export { joinLinkView };
type GroupPublicView = {
    $type?: 'chat.bsky.group.defs#groupPublicView';
    name: string;
    owner: ActorDefs.ProfileViewBasic;
    memberCount: number;
    requireApproval: boolean;
};
export type { GroupPublicView };
declare const groupPublicView: l.TypedObjectSchema<"chat.bsky.group.defs#groupPublicView", l.Validator<GroupPublicView, GroupPublicView>>;
export { groupPublicView };
type JoinRequestView = {
    $type?: 'chat.bsky.group.defs#joinRequestView';
    convoId: string;
    requestedBy: ActorDefs.ProfileViewBasic;
    requestedAt: l.DatetimeString;
};
export type { JoinRequestView };
declare const joinRequestView: l.TypedObjectSchema<"chat.bsky.group.defs#joinRequestView", l.Validator<JoinRequestView, JoinRequestView>>;
export { joinRequestView };
//# sourceMappingURL=defs.defs.d.ts.map
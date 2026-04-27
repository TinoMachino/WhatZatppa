import { l } from '@atproto/lex';
import * as ConvoDefs from '../convo/defs.defs.js';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "chat.bsky.group.addMembers";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Adds members to a group. The members are added in 'request' status, so they have to accept it. This creates convo memberships. */
declare const main: l.Procedure<"chat.bsky.group.addMembers", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
    addedMembers: l.OptionalSchema<l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>>;
}>>, readonly ["AccountSuspended", "BlockedActor", "GroupInvitesDisabled", "ConvoLocked", "InsufficientRole", "InvalidConvo", "MemberLimitReached", "NotFollowedBySender", "RecipientNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.addMembers", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
    addedMembers: l.OptionalSchema<l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>>;
}>>;
//# sourceMappingURL=addMembers.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ConvoDefs from '../convo/defs.defs.js';
declare const $nsid = "chat.bsky.group.createGroup";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Creates a group convo, specifying the members to be added to it. Unlike getConvoForMembers, this isn't idempotent. It will create new groups even if the membership is identical to pre-existing groups. Will create 'pending' membership for all members, except the owner who is 'accepted'. */
declare const main: l.Procedure<"chat.bsky.group.createGroup", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    name: l.StringSchema<{
        readonly minLength: 1;
        readonly maxGraphemes: 128;
        readonly maxLength: 1280;
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>, readonly ["AccountSuspended", "BlockedActor", "GroupInvitesDisabled", "NotFollowedBySender", "RecipientNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.createGroup", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    name: l.StringSchema<{
        readonly minLength: 1;
        readonly maxGraphemes: 128;
        readonly maxLength: 1280;
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>;
//# sourceMappingURL=createGroup.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.getConvoForMembers";
export { $nsid };
/** Get or create a 1-1 conversation for the given members. Always returns the same direct (non-group) conversation. To create a group conversation, use createGroup. */
declare const main: l.Query<"chat.bsky.convo.getConvoForMembers", l.ParamsSchema<{
    readonly members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>, readonly ["AccountSuspended", "BlockedActor", "MessagesDisabled", "NotFollowedBySender", "RecipientNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.getConvoForMembers", $params: l.ParamsSchema<{
    readonly members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>;
//# sourceMappingURL=getConvoForMembers.defs.d.ts.map
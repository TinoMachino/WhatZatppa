import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "chat.bsky.convo.getConvoMembers";
export { $nsid };
/** Returns a paginated list of members from a conversation. */
declare const main: l.Query<"chat.bsky.convo.getConvoMembers", l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    members: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>;
}>>, readonly ["InvalidConvo"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.getConvoMembers", $params: l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    members: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>;
}>>;
//# sourceMappingURL=getConvoMembers.defs.d.ts.map
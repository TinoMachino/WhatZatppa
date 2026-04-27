import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "chat.bsky.convo.getMessages";
export { $nsid };
/** Returns a page of messages from a conversation. */
declare const main: l.Query<"chat.bsky.convo.getMessages", l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    messages: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.MessageView, ConvoDefs.MessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.DeletedMessageView, ConvoDefs.DeletedMessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.SystemMessageView, ConvoDefs.SystemMessageView>>], false>>;
    relatedProfiles: l.OptionalSchema<l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>>;
}>>, readonly ["InvalidConvo"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.getMessages", $params: l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    messages: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.MessageView, ConvoDefs.MessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.DeletedMessageView, ConvoDefs.DeletedMessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.SystemMessageView, ConvoDefs.SystemMessageView>>], false>>;
    relatedProfiles: l.OptionalSchema<l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>>;
}>>;
//# sourceMappingURL=getMessages.defs.d.ts.map
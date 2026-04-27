import { l } from '@atproto/lex';
import * as ConvoDefs from '../convo/defs.defs.js';
declare const $nsid = "chat.bsky.moderation.getMessageContext";
export { $nsid };
declare const main: l.Query<"chat.bsky.moderation.getMessageContext", l.ParamsSchema<{
    readonly convoId: l.OptionalSchema<l.StringSchema<{}>>;
    readonly messageId: l.StringSchema<{}>;
    readonly before: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly after: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    messages: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.MessageView, ConvoDefs.MessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.DeletedMessageView, ConvoDefs.DeletedMessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.SystemMessageView, ConvoDefs.SystemMessageView>>], false>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.moderation.getMessageContext", $params: l.ParamsSchema<{
    readonly convoId: l.OptionalSchema<l.StringSchema<{}>>;
    readonly messageId: l.StringSchema<{}>;
    readonly before: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly after: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    messages: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.MessageView, ConvoDefs.MessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.DeletedMessageView, ConvoDefs.DeletedMessageView>>, l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.SystemMessageView, ConvoDefs.SystemMessageView>>], false>>;
}>>;
//# sourceMappingURL=getMessageContext.defs.d.ts.map
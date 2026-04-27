import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.deleteMessageForSelf";
export { $nsid };
/** Marks a message as deleted for the viewer, so they won't see that message in future enumerations. */
declare const main: l.Procedure<"chat.bsky.convo.deleteMessageForSelf", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    messageId: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<ConvoDefs.DeletedMessageView, ConvoDefs.DeletedMessageView>>>, readonly ["InvalidConvo", "MessageDeleteNotAllowed"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.deleteMessageForSelf", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    messageId: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ConvoDefs.DeletedMessageView, ConvoDefs.DeletedMessageView>>>;
//# sourceMappingURL=deleteMessageForSelf.defs.d.ts.map
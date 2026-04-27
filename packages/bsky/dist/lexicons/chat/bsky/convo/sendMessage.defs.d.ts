import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.sendMessage";
export { $nsid };
/** Sends a message to a conversation. */
declare const main: l.Procedure<"chat.bsky.convo.sendMessage", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    message: l.RefSchema<l.Validator<ConvoDefs.MessageInput, ConvoDefs.MessageInput>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<ConvoDefs.MessageView, ConvoDefs.MessageView>>>, readonly ["ConvoLocked", "InvalidConvo"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.sendMessage", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    message: l.RefSchema<l.Validator<ConvoDefs.MessageInput, ConvoDefs.MessageInput>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ConvoDefs.MessageView, ConvoDefs.MessageView>>>;
//# sourceMappingURL=sendMessage.defs.d.ts.map
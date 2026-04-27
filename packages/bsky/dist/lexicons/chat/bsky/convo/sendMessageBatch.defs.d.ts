import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.sendMessageBatch";
export { $nsid };
/** Sends a batch of messages to a conversation. */
declare const main: l.Procedure<"chat.bsky.convo.sendMessageBatch", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    items: l.ArraySchema<l.RefSchema<l.Validator<BatchItem, BatchItem>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    items: l.ArraySchema<l.RefSchema<l.Validator<ConvoDefs.MessageView, ConvoDefs.MessageView>>>;
}>>, readonly ["ConvoLocked", "InvalidConvo"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.sendMessageBatch", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    items: l.ArraySchema<l.RefSchema<l.Validator<BatchItem, BatchItem>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    items: l.ArraySchema<l.RefSchema<l.Validator<ConvoDefs.MessageView, ConvoDefs.MessageView>>>;
}>>;
type BatchItem = {
    $type?: 'chat.bsky.convo.sendMessageBatch#batchItem';
    convoId: string;
    message: ConvoDefs.MessageInput;
};
export type { BatchItem };
declare const batchItem: l.TypedObjectSchema<"chat.bsky.convo.sendMessageBatch#batchItem", l.Validator<BatchItem, BatchItem>>;
export { batchItem };
//# sourceMappingURL=sendMessageBatch.defs.d.ts.map
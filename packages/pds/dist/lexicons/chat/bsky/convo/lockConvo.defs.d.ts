import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.lockConvo";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Locks a group convo so no more content (messages, reactions) can be added to it. */
declare const main: l.Procedure<"chat.bsky.convo.lockConvo", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>, readonly ["ConvoLocked", "InvalidConvo", "InsufficientRole"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.lockConvo", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>;
//# sourceMappingURL=lockConvo.defs.d.ts.map
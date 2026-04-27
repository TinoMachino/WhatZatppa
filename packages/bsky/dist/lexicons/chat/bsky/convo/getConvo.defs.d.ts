import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.getConvo";
export { $nsid };
/** Gets an existing conversation by its ID. */
declare const main: l.Query<"chat.bsky.convo.getConvo", l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>, readonly ["InvalidConvo"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.getConvo", $params: l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>;
//# sourceMappingURL=getConvo.defs.d.ts.map
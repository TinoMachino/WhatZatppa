import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.getConvoAvailability";
export { $nsid };
/** Check whether the requester and the other members can start a 1-1 chat. Only applicable to direct (non-group) conversations. If an existing convo is found for these members, it is returned. Does not create a new convo if it doesn't exist. */
declare const main: l.Query<"chat.bsky.convo.getConvoAvailability", l.ParamsSchema<{
    readonly members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    canChat: l.BooleanSchema;
    convo: l.OptionalSchema<l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.getConvoAvailability", $params: l.ParamsSchema<{
    readonly members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    canChat: l.BooleanSchema;
    convo: l.OptionalSchema<l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>>;
}>>;
//# sourceMappingURL=getConvoAvailability.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ConvoDefs from '../convo/defs.defs.js';
declare const $nsid = "chat.bsky.group.removeMembers";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Removes members from a group. This deletes convo memberships, doesn't just set a status. */
declare const main: l.Procedure<"chat.bsky.group.removeMembers", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>, readonly ["InvalidConvo", "InsufficientRole"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.removeMembers", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    members: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>;
//# sourceMappingURL=removeMembers.defs.d.ts.map
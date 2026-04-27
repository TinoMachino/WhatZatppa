import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.removeReaction";
export { $nsid };
/** Removes an emoji reaction from a message. Requires authentication. It is idempotent, so multiple calls from the same user with the same emoji result in that reaction not being present, even if it already wasn't. */
declare const main: l.Procedure<"chat.bsky.convo.removeReaction", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    messageId: l.StringSchema<{}>;
    value: l.StringSchema<{
        readonly minLength: 1;
        readonly maxLength: 64;
        readonly minGraphemes: 1;
        readonly maxGraphemes: 1;
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    message: l.RefSchema<l.Validator<ConvoDefs.MessageView, ConvoDefs.MessageView>>;
}>>, readonly ["InvalidConvo", "ReactionNotAllowed", "ReactionMessageDeleted", "ReactionInvalidValue"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.removeReaction", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    messageId: l.StringSchema<{}>;
    value: l.StringSchema<{
        readonly minLength: 1;
        readonly maxLength: 64;
        readonly minGraphemes: 1;
        readonly maxGraphemes: 1;
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    message: l.RefSchema<l.Validator<ConvoDefs.MessageView, ConvoDefs.MessageView>>;
}>>;
//# sourceMappingURL=removeReaction.defs.d.ts.map
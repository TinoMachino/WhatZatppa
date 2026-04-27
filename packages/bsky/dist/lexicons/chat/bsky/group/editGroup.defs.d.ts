import { l } from '@atproto/lex';
import * as ConvoDefs from '../convo/defs.defs.js';
declare const $nsid = "chat.bsky.group.editGroup";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Edits group settings. */
declare const main: l.Procedure<"chat.bsky.group.editGroup", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    name: l.StringSchema<{
        readonly minLength: 1;
        readonly maxGraphemes: 128;
        readonly maxLength: 1280;
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>, readonly ["ConvoLocked", "InvalidConvo", "InsufficientRole"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.editGroup", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    name: l.StringSchema<{
        readonly minLength: 1;
        readonly maxGraphemes: 128;
        readonly maxLength: 1280;
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convo: l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>;
}>>;
//# sourceMappingURL=editGroup.defs.d.ts.map
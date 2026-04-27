import { l } from '@atproto/lex';
import * as ConvoDefs from '../convo/defs.defs.js';
declare const $nsid = "chat.bsky.group.requestJoin";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Sends a request to join a group (via join link) to the group owner. Action taken by the prospective group member. */
declare const main: l.Procedure<"chat.bsky.group.requestJoin", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    code: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    status: l.StringSchema<{
        knownValues: ["joined", "pending"];
    }>;
    convo: l.OptionalSchema<l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>>;
}>>, readonly ["ConvoLocked", "FollowRequired", "InvalidCode", "LinkDisabled", "MemberLimitReached", "UserKicked"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.requestJoin", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    code: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    status: l.StringSchema<{
        knownValues: ["joined", "pending"];
    }>;
    convo: l.OptionalSchema<l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>>;
}>>;
//# sourceMappingURL=requestJoin.defs.d.ts.map
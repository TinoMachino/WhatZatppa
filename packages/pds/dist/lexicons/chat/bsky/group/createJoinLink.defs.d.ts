import { l } from '@atproto/lex';
import * as GroupDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.group.createJoinLink";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Creates a join link for the group convo. */
declare const main: l.Procedure<"chat.bsky.group.createJoinLink", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    requireApproval: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    joinRule: l.RefSchema<l.Validator<GroupDefs.JoinRule, GroupDefs.JoinRule>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    joinLink: l.RefSchema<l.Validator<GroupDefs.JoinLinkView, GroupDefs.JoinLinkView>>;
}>>, readonly ["EnabledJoinLinkAlreadyExists", "InvalidConvo", "InsufficientRole"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.createJoinLink", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    requireApproval: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    joinRule: l.RefSchema<l.Validator<GroupDefs.JoinRule, GroupDefs.JoinRule>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    joinLink: l.RefSchema<l.Validator<GroupDefs.JoinLinkView, GroupDefs.JoinLinkView>>;
}>>;
//# sourceMappingURL=createJoinLink.defs.d.ts.map
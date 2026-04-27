import { l } from '@atproto/lex';
import * as GroupDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.group.listJoinRequests";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Lists a page of request to join a group (via join link) the user owns. Shows the data from the owner's point of view. */
declare const main: l.Query<"chat.bsky.group.listJoinRequests", l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    requests: l.ArraySchema<l.RefSchema<l.Validator<GroupDefs.JoinRequestView, GroupDefs.JoinRequestView>>>;
}>>, readonly ["InvalidConvo", "InsufficientRole"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.listJoinRequests", $params: l.ParamsSchema<{
    readonly convoId: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    requests: l.ArraySchema<l.RefSchema<l.Validator<GroupDefs.JoinRequestView, GroupDefs.JoinRequestView>>>;
}>>;
//# sourceMappingURL=listJoinRequests.defs.d.ts.map
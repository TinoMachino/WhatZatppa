import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
import * as GroupDefs from '../group/defs.defs.js';
declare const $nsid = "chat.bsky.convo.listConvoRequests";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Returns a page of incoming conversation requests for the user. Direct convo requests are returned as convoView; group join requests are returned as joinRequestView. */
declare const main: l.Query<"chat.bsky.convo.listConvoRequests", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    requests: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>, l.TypedRefSchema<l.TypedObjectValidator<GroupDefs.JoinRequestView, GroupDefs.JoinRequestView>>], false>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.listConvoRequests", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    requests: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>, l.TypedRefSchema<l.TypedObjectValidator<GroupDefs.JoinRequestView, GroupDefs.JoinRequestView>>], false>>;
}>>;
//# sourceMappingURL=listConvoRequests.defs.d.ts.map
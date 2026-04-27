import { l } from '@atproto/lex';
import * as ConvoDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.convo.listConvos";
export { $nsid };
/** Returns a page of conversations (direct or group) for the user. */
declare const main: l.Query<"chat.bsky.convo.listConvos", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly readState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["unread"];
    }>>;
    readonly status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["request", "accepted"];
    }>>;
    readonly kind: l.OptionalSchema<l.StringSchema<{
        knownValues: ["direct", "group"];
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    convos: l.ArraySchema<l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.listConvos", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly readState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["unread"];
    }>>;
    readonly status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["request", "accepted"];
    }>>;
    readonly kind: l.OptionalSchema<l.StringSchema<{
        knownValues: ["direct", "group"];
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    convos: l.ArraySchema<l.RefSchema<l.Validator<ConvoDefs.ConvoView, ConvoDefs.ConvoView>>>;
}>>;
//# sourceMappingURL=listConvos.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.convo.updateAllRead";
export { $nsid };
/** Sets conversations from a user as read to the latest message, with filters. */
declare const main: l.Procedure<"chat.bsky.convo.updateAllRead", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["request", "accepted"];
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    updatedCount: l.IntegerSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.updateAllRead", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["request", "accepted"];
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    updatedCount: l.IntegerSchema;
}>>;
//# sourceMappingURL=updateAllRead.defs.d.ts.map
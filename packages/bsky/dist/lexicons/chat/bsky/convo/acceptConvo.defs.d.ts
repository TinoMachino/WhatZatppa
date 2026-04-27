import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.convo.acceptConvo";
export { $nsid };
/** Marks a conversation as accepted, so it is shown in the list of accepted convos instead on the request convos. */
declare const main: l.Procedure<"chat.bsky.convo.acceptConvo", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    rev: l.OptionalSchema<l.StringSchema<{}>>;
}>>, readonly ["InvalidConvo"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.acceptConvo", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    rev: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=acceptConvo.defs.d.ts.map
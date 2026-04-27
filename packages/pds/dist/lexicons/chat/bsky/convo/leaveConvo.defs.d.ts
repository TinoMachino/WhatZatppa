import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.convo.leaveConvo";
export { $nsid };
/** Leaves a conversation (direct or group). For group, this effectively removes membership. For direct, membership is never removed, only changed to remove from enumerations by the user who left. */
declare const main: l.Procedure<"chat.bsky.convo.leaveConvo", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    rev: l.StringSchema<{}>;
}>>, readonly ["InvalidConvo", "OwnerCannotLeave"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.convo.leaveConvo", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    rev: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=leaveConvo.defs.d.ts.map
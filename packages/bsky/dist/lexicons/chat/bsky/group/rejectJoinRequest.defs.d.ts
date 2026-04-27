import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.group.rejectJoinRequest";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Rejects a request to join a group (via join link) the user owns. Action taken by the group owner. */
declare const main: l.Procedure<"chat.bsky.group.rejectJoinRequest", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    member: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, readonly ["InvalidConvo", "InsufficientRole"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.rejectJoinRequest", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    convoId: l.StringSchema<{}>;
    member: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=rejectJoinRequest.defs.d.ts.map
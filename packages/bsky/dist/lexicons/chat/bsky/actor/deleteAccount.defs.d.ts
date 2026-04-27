import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.actor.deleteAccount";
export { $nsid };
declare const main: l.Procedure<"chat.bsky.actor.deleteAccount", l.ParamsSchema<{}>, l.Payload<undefined, undefined>, l.Payload<"application/json", l.ObjectSchema<{}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.actor.deleteAccount", $params: l.ParamsSchema<{}>, $input: l.Payload<undefined, undefined>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=deleteAccount.defs.d.ts.map
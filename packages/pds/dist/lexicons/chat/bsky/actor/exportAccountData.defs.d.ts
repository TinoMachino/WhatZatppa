import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.actor.exportAccountData";
export { $nsid };
declare const main: l.Query<"chat.bsky.actor.exportAccountData", l.ParamsSchema<{}>, l.Payload<"application/jsonl", undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.actor.exportAccountData", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/jsonl", undefined>;
//# sourceMappingURL=exportAccountData.defs.d.ts.map
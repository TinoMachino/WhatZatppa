import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.requestAccountDelete";
export { $nsid };
/** Initiate a user account deletion via email. */
declare const main: l.Procedure<"com.atproto.server.requestAccountDelete", l.ParamsSchema<{}>, l.Payload<undefined, undefined>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.requestAccountDelete", $params: l.ParamsSchema<{}>, $input: l.Payload<undefined, undefined>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=requestAccountDelete.defs.d.ts.map
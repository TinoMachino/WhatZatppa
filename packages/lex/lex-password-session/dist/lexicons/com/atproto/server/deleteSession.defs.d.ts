import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.server.deleteSession";
export { $nsid };
/** Delete the current session. Requires auth using the 'refreshJwt' (not the 'accessJwt'). */
declare const main: l.Procedure<"com.atproto.server.deleteSession", l.ParamsSchema<{}>, l.Payload<undefined, undefined>, l.Payload<undefined, undefined>, readonly ["InvalidToken", "ExpiredToken"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.deleteSession", $params: l.ParamsSchema<{}>, $input: l.Payload<undefined, undefined>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteSession.defs.d.ts.map
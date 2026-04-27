import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.requestPlcOperationSignature";
export { $nsid };
/** Request an email with a code to in order to request a signed PLC operation. Requires Auth. */
declare const main: l.Procedure<"com.atproto.identity.requestPlcOperationSignature", l.ParamsSchema<{}>, l.Payload<undefined, undefined>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.requestPlcOperationSignature", $params: l.ParamsSchema<{}>, $input: l.Payload<undefined, undefined>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=requestPlcOperationSignature.defs.d.ts.map
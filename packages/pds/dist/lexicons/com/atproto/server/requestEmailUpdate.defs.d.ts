import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.requestEmailUpdate";
export { $nsid };
/** Request a token in order to update email. */
declare const main: l.Procedure<"com.atproto.server.requestEmailUpdate", l.ParamsSchema<{}>, l.Payload<undefined, undefined>, l.Payload<"application/json", l.ObjectSchema<{
    tokenRequired: l.BooleanSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.requestEmailUpdate", $params: l.ParamsSchema<{}>, $input: l.Payload<undefined, undefined>, $output: l.Payload<"application/json", l.ObjectSchema<{
    tokenRequired: l.BooleanSchema;
}>>;
//# sourceMappingURL=requestEmailUpdate.defs.d.ts.map
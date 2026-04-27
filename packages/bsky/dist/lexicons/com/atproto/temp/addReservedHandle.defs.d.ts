import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.temp.addReservedHandle";
export { $nsid };
/** Add a handle to the set of reserved handles. */
declare const main: l.Procedure<"com.atproto.temp.addReservedHandle", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.addReservedHandle", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=addReservedHandle.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.set.deleteSet";
export { $nsid };
/** Delete an entire set. Attempting to delete a set that does not exist will result in an error. */
declare const main: l.Procedure<"tools.ozone.set.deleteSet", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, readonly ["SetNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.set.deleteSet", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=deleteSet.defs.d.ts.map
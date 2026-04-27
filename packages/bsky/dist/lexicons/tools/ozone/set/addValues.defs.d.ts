import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.set.addValues";
export { $nsid };
/** Add values to a specific set. Attempting to add values to a set that does not exist will result in an error. */
declare const main: l.Procedure<"tools.ozone.set.addValues", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    values: l.ArraySchema<l.StringSchema<{}>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.set.addValues", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    values: l.ArraySchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=addValues.defs.d.ts.map
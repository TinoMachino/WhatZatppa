import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.set.deleteValues";
export { $nsid };
/** Delete values from a specific set. Attempting to delete values that are not in the set will not result in an error */
declare const main: l.Procedure<"tools.ozone.set.deleteValues", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    values: l.ArraySchema<l.StringSchema<{}>>;
}>>, l.Payload<undefined, undefined>, readonly ["SetNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.set.deleteValues", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    values: l.ArraySchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteValues.defs.d.ts.map
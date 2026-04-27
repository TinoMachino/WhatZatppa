import { l } from '@atproto/lex';
import * as SetDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.set.getValues";
export { $nsid };
/** Get a specific set and its values */
declare const main: l.Query<"tools.ozone.set.getValues", l.ParamsSchema<{
    readonly name: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    set: l.RefSchema<l.Validator<SetDefs.SetView, SetDefs.SetView>>;
    values: l.ArraySchema<l.StringSchema<{}>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>, readonly ["SetNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.set.getValues", $params: l.ParamsSchema<{
    readonly name: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    set: l.RefSchema<l.Validator<SetDefs.SetView, SetDefs.SetView>>;
    values: l.ArraySchema<l.StringSchema<{}>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getValues.defs.d.ts.map
import { l } from '@atproto/lex';
import * as SetDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.set.querySets";
export { $nsid };
/** Query available sets */
declare const main: l.Query<"tools.ozone.set.querySets", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly namePrefix: l.OptionalSchema<l.StringSchema<{}>>;
    readonly sortBy: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"name" | "createdAt" | "updatedAt">>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    sets: l.ArraySchema<l.RefSchema<l.Validator<SetDefs.SetView, SetDefs.SetView>>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.set.querySets", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly namePrefix: l.OptionalSchema<l.StringSchema<{}>>;
    readonly sortBy: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"name" | "createdAt" | "updatedAt">>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    sets: l.ArraySchema<l.RefSchema<l.Validator<SetDefs.SetView, SetDefs.SetView>>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=querySets.defs.d.ts.map
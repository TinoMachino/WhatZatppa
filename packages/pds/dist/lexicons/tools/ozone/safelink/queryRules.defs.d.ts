import { l } from '@atproto/lex';
import * as SafelinkDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.safelink.queryRules";
export { $nsid };
/** Query URL safety rules */
declare const main: l.Procedure<"tools.ozone.safelink.queryRules", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    urls: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    patternType: l.OptionalSchema<l.StringSchema<{}>>;
    actions: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    reason: l.OptionalSchema<l.StringSchema<{}>>;
    createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["asc", "desc"];
    }>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    rules: l.ArraySchema<l.RefSchema<l.Validator<SafelinkDefs.UrlRule, SafelinkDefs.UrlRule>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.safelink.queryRules", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    urls: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    patternType: l.OptionalSchema<l.StringSchema<{}>>;
    actions: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    reason: l.OptionalSchema<l.StringSchema<{}>>;
    createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["asc", "desc"];
    }>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    rules: l.ArraySchema<l.RefSchema<l.Validator<SafelinkDefs.UrlRule, SafelinkDefs.UrlRule>>>;
}>>;
//# sourceMappingURL=queryRules.defs.d.ts.map
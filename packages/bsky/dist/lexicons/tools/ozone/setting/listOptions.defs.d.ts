import { l } from '@atproto/lex';
import * as SettingDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.setting.listOptions";
export { $nsid };
/** List settings with optional filtering */
declare const main: l.Query<"tools.ozone.setting.listOptions", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly scope: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["instance", "personal"];
    }>>>;
    readonly prefix: l.OptionalSchema<l.StringSchema<{}>>;
    readonly keys: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    options: l.ArraySchema<l.RefSchema<l.Validator<SettingDefs.Option, SettingDefs.Option>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.setting.listOptions", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly scope: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["instance", "personal"];
    }>>>;
    readonly prefix: l.OptionalSchema<l.StringSchema<{}>>;
    readonly keys: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    options: l.ArraySchema<l.RefSchema<l.Validator<SettingDefs.Option, SettingDefs.Option>>>;
}>>;
//# sourceMappingURL=listOptions.defs.d.ts.map
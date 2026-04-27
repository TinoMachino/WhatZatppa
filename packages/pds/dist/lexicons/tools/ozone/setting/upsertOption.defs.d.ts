import { l } from '@atproto/lex';
import * as SettingDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.setting.upsertOption";
export { $nsid };
/** Create or update setting option */
declare const main: l.Procedure<"tools.ozone.setting.upsertOption", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    key: l.StringSchema<{
        readonly format: "nsid";
    }>;
    scope: l.StringSchema<{
        knownValues: ["instance", "personal"];
    }>;
    value: l.LexMapSchema;
    description: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 2000;
    }>>;
    managerRole: l.OptionalSchema<l.StringSchema<{
        knownValues: ["tools.ozone.team.defs#roleModerator", "tools.ozone.team.defs#roleTriage", "tools.ozone.team.defs#roleVerifier", "tools.ozone.team.defs#roleAdmin"];
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    option: l.RefSchema<l.Validator<SettingDefs.Option, SettingDefs.Option>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.setting.upsertOption", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    key: l.StringSchema<{
        readonly format: "nsid";
    }>;
    scope: l.StringSchema<{
        knownValues: ["instance", "personal"];
    }>;
    value: l.LexMapSchema;
    description: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 2000;
    }>>;
    managerRole: l.OptionalSchema<l.StringSchema<{
        knownValues: ["tools.ozone.team.defs#roleModerator", "tools.ozone.team.defs#roleTriage", "tools.ozone.team.defs#roleVerifier", "tools.ozone.team.defs#roleAdmin"];
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    option: l.RefSchema<l.Validator<SettingDefs.Option, SettingDefs.Option>>;
}>>;
//# sourceMappingURL=upsertOption.defs.d.ts.map
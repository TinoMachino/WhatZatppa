import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.setting.removeOptions";
export { $nsid };
/** Delete settings by key */
declare const main: l.Procedure<"tools.ozone.setting.removeOptions", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    keys: l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>;
    scope: l.StringSchema<{
        knownValues: ["instance", "personal"];
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.setting.removeOptions", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    keys: l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>;
    scope: l.StringSchema<{
        knownValues: ["instance", "personal"];
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=removeOptions.defs.d.ts.map
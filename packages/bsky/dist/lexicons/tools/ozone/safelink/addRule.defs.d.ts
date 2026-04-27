import { l } from '@atproto/lex';
import * as SafelinkDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.safelink.addRule";
export { $nsid };
/** Add a new URL safety rule */
declare const main: l.Procedure<"tools.ozone.safelink.addRule", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    url: l.StringSchema<{}>;
    pattern: l.RefSchema<l.Validator<SafelinkDefs.PatternType, SafelinkDefs.PatternType>>;
    action: l.RefSchema<l.Validator<SafelinkDefs.ActionType, SafelinkDefs.ActionType>>;
    reason: l.RefSchema<l.Validator<SafelinkDefs.ReasonType, SafelinkDefs.ReasonType>>;
    comment: l.OptionalSchema<l.StringSchema<{}>>;
    createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<SafelinkDefs.Event, SafelinkDefs.Event>>>, readonly ["InvalidUrl", "RuleAlreadyExists"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.safelink.addRule", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    url: l.StringSchema<{}>;
    pattern: l.RefSchema<l.Validator<SafelinkDefs.PatternType, SafelinkDefs.PatternType>>;
    action: l.RefSchema<l.Validator<SafelinkDefs.ActionType, SafelinkDefs.ActionType>>;
    reason: l.RefSchema<l.Validator<SafelinkDefs.ReasonType, SafelinkDefs.ReasonType>>;
    comment: l.OptionalSchema<l.StringSchema<{}>>;
    createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<SafelinkDefs.Event, SafelinkDefs.Event>>>;
//# sourceMappingURL=addRule.defs.d.ts.map
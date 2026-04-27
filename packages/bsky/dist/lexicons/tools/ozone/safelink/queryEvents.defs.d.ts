import { l } from '@atproto/lex';
import * as SafelinkDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.safelink.queryEvents";
export { $nsid };
/** Query URL safety audit events */
declare const main: l.Procedure<"tools.ozone.safelink.queryEvents", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    urls: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    patternType: l.OptionalSchema<l.StringSchema<{}>>;
    sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["asc", "desc"];
    }>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    events: l.ArraySchema<l.RefSchema<l.Validator<SafelinkDefs.Event, SafelinkDefs.Event>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.safelink.queryEvents", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    urls: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    patternType: l.OptionalSchema<l.StringSchema<{}>>;
    sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["asc", "desc"];
    }>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    events: l.ArraySchema<l.RefSchema<l.Validator<SafelinkDefs.Event, SafelinkDefs.Event>>>;
}>>;
//# sourceMappingURL=queryEvents.defs.d.ts.map
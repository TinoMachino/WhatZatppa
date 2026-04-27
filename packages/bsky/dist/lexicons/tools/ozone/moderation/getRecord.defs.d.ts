import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getRecord";
export { $nsid };
/** Get details about a record. */
declare const main: l.Query<"tools.ozone.moderation.getRecord", l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<ModerationDefs.RecordViewDetail, ModerationDefs.RecordViewDetail>>>, readonly ["RecordNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getRecord", $params: l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ModerationDefs.RecordViewDetail, ModerationDefs.RecordViewDetail>>>;
//# sourceMappingURL=getRecord.defs.d.ts.map
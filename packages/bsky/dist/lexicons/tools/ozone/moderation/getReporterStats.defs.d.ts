import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getReporterStats";
export { $nsid };
/** Get reporter stats for a list of users. */
declare const main: l.Query<"tools.ozone.moderation.getReporterStats", l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    stats: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.ReporterStats, ModerationDefs.ReporterStats>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getReporterStats", $params: l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    stats: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.ReporterStats, ModerationDefs.ReporterStats>>>;
}>>;
//# sourceMappingURL=getReporterStats.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getEvent";
export { $nsid };
/** Get details about a moderation event. */
declare const main: l.Query<"tools.ozone.moderation.getEvent", l.ParamsSchema<{
    readonly id: l.IntegerSchema;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<ModerationDefs.ModEventViewDetail, ModerationDefs.ModEventViewDetail>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getEvent", $params: l.ParamsSchema<{
    readonly id: l.IntegerSchema;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ModerationDefs.ModEventViewDetail, ModerationDefs.ModEventViewDetail>>>;
//# sourceMappingURL=getEvent.defs.d.ts.map
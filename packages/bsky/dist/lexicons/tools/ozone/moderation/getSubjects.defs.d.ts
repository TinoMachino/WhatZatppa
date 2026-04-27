import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getSubjects";
export { $nsid };
/** Get details about subjects. */
declare const main: l.Query<"tools.ozone.moderation.getSubjects", l.ParamsSchema<{
    readonly subjects: l.ArraySchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    subjects: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.SubjectView, ModerationDefs.SubjectView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getSubjects", $params: l.ParamsSchema<{
    readonly subjects: l.ArraySchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    subjects: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.SubjectView, ModerationDefs.SubjectView>>>;
}>>;
//# sourceMappingURL=getSubjects.defs.d.ts.map
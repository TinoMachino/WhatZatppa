import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getRecords";
export { $nsid };
/** Get details about some records. */
declare const main: l.Query<"tools.ozone.moderation.getRecords", l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    records: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RecordViewDetail, ModerationDefs.RecordViewDetail>>, l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RecordViewNotFound, ModerationDefs.RecordViewNotFound>>], false>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getRecords", $params: l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    records: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RecordViewDetail, ModerationDefs.RecordViewDetail>>, l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RecordViewNotFound, ModerationDefs.RecordViewNotFound>>], false>>;
}>>;
//# sourceMappingURL=getRecords.defs.d.ts.map
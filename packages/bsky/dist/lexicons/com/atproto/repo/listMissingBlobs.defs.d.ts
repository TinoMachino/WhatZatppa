import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.listMissingBlobs";
export { $nsid };
/** Returns a list of missing blobs for the requesting account. Intended to be used in the account migration flow. */
declare const main: l.Query<"com.atproto.repo.listMissingBlobs", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    blobs: l.ArraySchema<l.RefSchema<l.Validator<RecordBlob, RecordBlob>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.listMissingBlobs", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    blobs: l.ArraySchema<l.RefSchema<l.Validator<RecordBlob, RecordBlob>>>;
}>>;
type RecordBlob = {
    $type?: 'com.atproto.repo.listMissingBlobs#recordBlob';
    cid: l.CidString;
    recordUri: l.AtUriString;
};
export type { RecordBlob };
declare const recordBlob: l.TypedObjectSchema<"com.atproto.repo.listMissingBlobs#recordBlob", l.Validator<RecordBlob, RecordBlob>>;
export { recordBlob };
//# sourceMappingURL=listMissingBlobs.defs.d.ts.map
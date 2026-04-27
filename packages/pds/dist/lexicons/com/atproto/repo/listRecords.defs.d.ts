import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.listRecords";
export { $nsid };
/** List a range of records in a repository, matching a specific collection. Does not require auth. */
declare const main: l.Query<"com.atproto.repo.listRecords", l.ParamsSchema<{
    readonly repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly reverse: l.OptionalSchema<l.BooleanSchema>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    records: l.ArraySchema<l.RefSchema<l.Validator<Record$0, Record$0>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.listRecords", $params: l.ParamsSchema<{
    readonly repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly reverse: l.OptionalSchema<l.BooleanSchema>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    records: l.ArraySchema<l.RefSchema<l.Validator<Record$0, Record$0>>>;
}>>;
type Record$0 = {
    $type?: 'com.atproto.repo.listRecords#record';
    uri: l.AtUriString;
    cid: l.CidString;
    value: l.LexMap;
};
export type { Record$0 as Record };
declare const record$0: l.TypedObjectSchema<"com.atproto.repo.listRecords#record", l.Validator<Record$0, Record$0>>;
export { record$0 as record };
//# sourceMappingURL=listRecords.defs.d.ts.map
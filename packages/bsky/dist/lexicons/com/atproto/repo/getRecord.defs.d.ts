import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.getRecord";
export { $nsid };
/** Get a single record from a repository. Does not require auth. */
declare const main: l.Query<"com.atproto.repo.getRecord", l.ParamsSchema<{
    readonly repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    value: l.LexMapSchema;
}>>, readonly ["RecordNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.getRecord", $params: l.ParamsSchema<{
    readonly repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    value: l.LexMapSchema;
}>>;
//# sourceMappingURL=getRecord.defs.d.ts.map
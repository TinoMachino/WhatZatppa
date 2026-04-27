import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.describeRepo";
export { $nsid };
/** Get information about an account and repository, including the list of collections. Does not require auth. */
declare const main: l.Query<"com.atproto.repo.describeRepo", l.ParamsSchema<{
    readonly repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    didDoc: l.LexMapSchema;
    collections: l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>;
    handleIsCorrect: l.BooleanSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.describeRepo", $params: l.ParamsSchema<{
    readonly repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    didDoc: l.LexMapSchema;
    collections: l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>;
    handleIsCorrect: l.BooleanSchema;
}>>;
//# sourceMappingURL=describeRepo.defs.d.ts.map
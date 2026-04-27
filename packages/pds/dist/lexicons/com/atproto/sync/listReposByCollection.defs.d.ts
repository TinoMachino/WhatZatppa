import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.listReposByCollection";
export { $nsid };
/** Enumerates all the DIDs which have records with the given collection NSID. */
declare const main: l.Query<"com.atproto.sync.listReposByCollection", l.ParamsSchema<{
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    repos: l.ArraySchema<l.RefSchema<l.Validator<Repo, Repo>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.listReposByCollection", $params: l.ParamsSchema<{
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    repos: l.ArraySchema<l.RefSchema<l.Validator<Repo, Repo>>>;
}>>;
type Repo = {
    $type?: 'com.atproto.sync.listReposByCollection#repo';
    did: l.DidString;
};
export type { Repo };
declare const repo: l.TypedObjectSchema<"com.atproto.sync.listReposByCollection#repo", l.Validator<Repo, Repo>>;
export { repo };
//# sourceMappingURL=listReposByCollection.defs.d.ts.map
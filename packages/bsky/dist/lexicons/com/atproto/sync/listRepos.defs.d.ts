import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.listRepos";
export { $nsid };
/** Enumerates all the DID, rev, and commit CID for all repos hosted by this service. Does not require auth; implemented by PDS and Relay. */
declare const main: l.Query<"com.atproto.sync.listRepos", l.ParamsSchema<{
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
export declare const $lxm: "com.atproto.sync.listRepos", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    repos: l.ArraySchema<l.RefSchema<l.Validator<Repo, Repo>>>;
}>>;
type Repo = {
    $type?: 'com.atproto.sync.listRepos#repo';
    did: l.DidString;
    /**
     * Current repo commit CID
     */
    head: l.CidString;
    rev: l.TidString;
    active?: boolean;
    /**
     * If active=false, this optional field indicates a possible reason for why the account is not active. If active=false and no status is supplied, then the host makes no claim for why the repository is no longer being hosted.
     */
    status?: 'takendown' | 'suspended' | 'deleted' | 'deactivated' | 'desynchronized' | 'throttled' | l.UnknownString;
};
export type { Repo };
declare const repo: l.TypedObjectSchema<"com.atproto.sync.listRepos#repo", l.Validator<Repo, Repo>>;
export { repo };
//# sourceMappingURL=listRepos.defs.d.ts.map
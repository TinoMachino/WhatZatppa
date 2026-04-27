import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.listBlobs";
export { $nsid };
/** List blob CIDs for an account, since some repo revision. Does not require auth; implemented by PDS. */
declare const main: l.Query<"com.atproto.sync.listBlobs", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly since: l.OptionalSchema<l.StringSchema<{
        readonly format: "tid";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    cids: l.ArraySchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>>, readonly ["RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.listBlobs", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly since: l.OptionalSchema<l.StringSchema<{
        readonly format: "tid";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    cids: l.ArraySchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>>;
//# sourceMappingURL=listBlobs.defs.d.ts.map
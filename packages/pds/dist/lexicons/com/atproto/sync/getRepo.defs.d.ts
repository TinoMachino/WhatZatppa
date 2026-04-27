import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.getRepo";
export { $nsid };
/** Download a repository export as CAR file. Optionally only a 'diff' since a previous revision. Does not require auth; implemented by PDS. */
declare const main: l.Query<"com.atproto.sync.getRepo", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly since: l.OptionalSchema<l.StringSchema<{
        readonly format: "tid";
    }>>;
}>, l.Payload<"application/vnd.ipld.car", undefined>, readonly ["RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getRepo", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly since: l.OptionalSchema<l.StringSchema<{
        readonly format: "tid";
    }>>;
}>, $output: l.Payload<"application/vnd.ipld.car", undefined>;
//# sourceMappingURL=getRepo.defs.d.ts.map
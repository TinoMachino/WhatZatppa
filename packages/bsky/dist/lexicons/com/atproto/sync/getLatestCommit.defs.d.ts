import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.getLatestCommit";
export { $nsid };
/** Get the current commit CID & revision of the specified repo. Does not require auth. */
declare const main: l.Query<"com.atproto.sync.getLatestCommit", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    rev: l.StringSchema<{
        readonly format: "tid";
    }>;
}>>, readonly ["RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getLatestCommit", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    rev: l.StringSchema<{
        readonly format: "tid";
    }>;
}>>;
//# sourceMappingURL=getLatestCommit.defs.d.ts.map
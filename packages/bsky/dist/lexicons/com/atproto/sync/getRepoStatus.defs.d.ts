import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.getRepoStatus";
export { $nsid };
/** Get the hosting status for a repository, on this server. Expected to be implemented by PDS and Relay. */
declare const main: l.Query<"com.atproto.sync.getRepoStatus", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    active: l.BooleanSchema;
    status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["takendown", "suspended", "deleted", "deactivated", "desynchronized", "throttled"];
    }>>;
    rev: l.OptionalSchema<l.StringSchema<{
        readonly format: "tid";
    }>>;
}>>, readonly ["RepoNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getRepoStatus", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    active: l.BooleanSchema;
    status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["takendown", "suspended", "deleted", "deactivated", "desynchronized", "throttled"];
    }>>;
    rev: l.OptionalSchema<l.StringSchema<{
        readonly format: "tid";
    }>>;
}>>;
//# sourceMappingURL=getRepoStatus.defs.d.ts.map
import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.sync.getRecord";
export { $nsid };
/** Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth. */
declare const main: l.Query<"com.atproto.sync.getRecord", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
}>, l.Payload<"application/vnd.ipld.car", undefined>, readonly ["RecordNotFound", "RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getRecord", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
}>, $output: l.Payload<"application/vnd.ipld.car", undefined>;
//# sourceMappingURL=getRecord.defs.d.ts.map
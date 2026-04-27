import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.sync.getBlob";
export { $nsid };
/** Get a blob associated with a given account. Returns the full blob as originally uploaded. Does not require auth; implemented by PDS. */
declare const main: l.Query<"com.atproto.sync.getBlob", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly cid: l.StringSchema<{
        readonly format: "cid";
    }>;
}>, l.Payload<"*/*", undefined>, readonly ["BlobNotFound", "RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getBlob", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly cid: l.StringSchema<{
        readonly format: "cid";
    }>;
}>, $output: l.Payload<"*/*", undefined>;
//# sourceMappingURL=getBlob.defs.d.ts.map
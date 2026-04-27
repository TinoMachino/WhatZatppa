import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.getBlocks";
export { $nsid };
/** Get data blocks from a given repo, by CID. For example, intermediate MST nodes, or records. Does not require auth; implemented by PDS. */
declare const main: l.Query<"com.atproto.sync.getBlocks", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly cids: l.ArraySchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, l.Payload<"application/vnd.ipld.car", undefined>, readonly ["BlockNotFound", "RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getBlocks", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly cids: l.ArraySchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, $output: l.Payload<"application/vnd.ipld.car", undefined>;
//# sourceMappingURL=getBlocks.defs.d.ts.map
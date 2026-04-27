import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.getHead";
export { $nsid };
/** @deprecated please use com.atproto.sync.getLatestCommit instead */
declare const main: l.Query<"com.atproto.sync.getHead", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    root: l.StringSchema<{
        readonly format: "cid";
    }>;
}>>, readonly ["HeadNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getHead", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    root: l.StringSchema<{
        readonly format: "cid";
    }>;
}>>;
//# sourceMappingURL=getHead.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.getCheckout";
export { $nsid };
/** @deprecated please use com.atproto.sync.getRepo instead */
declare const main: l.Query<"com.atproto.sync.getCheckout", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/vnd.ipld.car", undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getCheckout", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/vnd.ipld.car", undefined>;
//# sourceMappingURL=getCheckout.defs.d.ts.map
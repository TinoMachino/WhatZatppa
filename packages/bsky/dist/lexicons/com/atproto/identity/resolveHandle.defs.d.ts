import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.resolveHandle";
export { $nsid };
/** Resolves an atproto handle (hostname) to a DID. Does not necessarily bi-directionally verify against the the DID document. */
declare const main: l.Query<"com.atproto.identity.resolveHandle", l.ParamsSchema<{
    readonly handle: l.StringSchema<{
        readonly format: "handle";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, readonly ["HandleNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.resolveHandle", $params: l.ParamsSchema<{
    readonly handle: l.StringSchema<{
        readonly format: "handle";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
}>>;
//# sourceMappingURL=resolveHandle.defs.d.ts.map
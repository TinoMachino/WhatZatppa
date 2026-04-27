import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.resolveDid";
export { $nsid };
/** Resolves DID to DID document. Does not bi-directionally verify handle. */
declare const main: l.Query<"com.atproto.identity.resolveDid", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    didDoc: l.LexMapSchema;
}>>, readonly ["DidNotFound", "DidDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.resolveDid", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    didDoc: l.LexMapSchema;
}>>;
//# sourceMappingURL=resolveDid.defs.d.ts.map
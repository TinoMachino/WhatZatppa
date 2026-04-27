import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.getServiceAuth";
export { $nsid };
/** Get a signed token on behalf of the requesting DID for the requested service. */
declare const main: l.Query<"com.atproto.server.getServiceAuth", l.ParamsSchema<{
    readonly aud: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly exp: l.OptionalSchema<l.IntegerSchema>;
    readonly lxm: l.OptionalSchema<l.StringSchema<{
        readonly format: "nsid";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
}>>, readonly ["BadExpiration"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.getServiceAuth", $params: l.ParamsSchema<{
    readonly aud: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly exp: l.OptionalSchema<l.IntegerSchema>;
    readonly lxm: l.OptionalSchema<l.StringSchema<{
        readonly format: "nsid";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=getServiceAuth.defs.d.ts.map
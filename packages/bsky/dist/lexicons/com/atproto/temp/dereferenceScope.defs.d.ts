import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.temp.dereferenceScope";
export { $nsid };
/** Allows finding the oauth permission scope from a reference */
declare const main: l.Query<"com.atproto.temp.dereferenceScope", l.ParamsSchema<{
    readonly scope: l.StringSchema<{}>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    scope: l.StringSchema<{}>;
}>>, readonly ["InvalidScopeReference"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.dereferenceScope", $params: l.ParamsSchema<{
    readonly scope: l.StringSchema<{}>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    scope: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=dereferenceScope.defs.d.ts.map
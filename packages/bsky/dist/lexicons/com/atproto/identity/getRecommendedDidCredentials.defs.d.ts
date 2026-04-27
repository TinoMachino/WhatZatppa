import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.getRecommendedDidCredentials";
export { $nsid };
/** Describe the credentials that should be included in the DID doc of an account that is migrating to this service. */
declare const main: l.Query<"com.atproto.identity.getRecommendedDidCredentials", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    rotationKeys: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    alsoKnownAs: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    verificationMethods: l.OptionalSchema<l.LexMapSchema>;
    services: l.OptionalSchema<l.LexMapSchema>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.getRecommendedDidCredentials", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    rotationKeys: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    alsoKnownAs: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    verificationMethods: l.OptionalSchema<l.LexMapSchema>;
    services: l.OptionalSchema<l.LexMapSchema>;
}>>;
//# sourceMappingURL=getRecommendedDidCredentials.defs.d.ts.map
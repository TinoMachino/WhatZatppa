import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.signPlcOperation";
export { $nsid };
/** Signs a PLC operation to update some value(s) in the requesting DID's document. */
declare const main: l.Procedure<"com.atproto.identity.signPlcOperation", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    token: l.OptionalSchema<l.StringSchema<{}>>;
    rotationKeys: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    alsoKnownAs: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    verificationMethods: l.OptionalSchema<l.LexMapSchema>;
    services: l.OptionalSchema<l.LexMapSchema>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    operation: l.LexMapSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.signPlcOperation", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    token: l.OptionalSchema<l.StringSchema<{}>>;
    rotationKeys: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    alsoKnownAs: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    verificationMethods: l.OptionalSchema<l.LexMapSchema>;
    services: l.OptionalSchema<l.LexMapSchema>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    operation: l.LexMapSchema;
}>>;
//# sourceMappingURL=signPlcOperation.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.reserveSigningKey";
export { $nsid };
/** Reserve a repo signing key, for use with account creation. Necessary so that a DID PLC update operation can be constructed during an account migraiton. Public and does not require auth; implemented by PDS. NOTE: this endpoint may change when full account migration is implemented. */
declare const main: l.Procedure<"com.atproto.server.reserveSigningKey", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    signingKey: l.StringSchema<{}>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.reserveSigningKey", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    did: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    signingKey: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=reserveSigningKey.defs.d.ts.map
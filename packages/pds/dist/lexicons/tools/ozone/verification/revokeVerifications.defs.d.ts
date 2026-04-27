import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.verification.revokeVerifications";
export { $nsid };
/** Revoke previously granted verifications in batches of up to 100. */
declare const main: l.Procedure<"tools.ozone.verification.revokeVerifications", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    revokeReason: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 1000;
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    revokedVerifications: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    failedRevocations: l.ArraySchema<l.RefSchema<l.Validator<RevokeError, RevokeError>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.verification.revokeVerifications", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    revokeReason: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 1000;
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    revokedVerifications: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    failedRevocations: l.ArraySchema<l.RefSchema<l.Validator<RevokeError, RevokeError>>>;
}>>;
/** Error object for failed revocations */
type RevokeError = {
    $type?: 'tools.ozone.verification.revokeVerifications#revokeError';
    /**
     * The AT-URI of the verification record that failed to revoke.
     */
    uri: l.AtUriString;
    /**
     * Description of the error that occurred during revocation.
     */
    error: string;
};
export type { RevokeError };
/** Error object for failed revocations */
declare const revokeError: l.TypedObjectSchema<"tools.ozone.verification.revokeVerifications#revokeError", l.Validator<RevokeError, RevokeError>>;
export { revokeError };
//# sourceMappingURL=revokeVerifications.defs.d.ts.map
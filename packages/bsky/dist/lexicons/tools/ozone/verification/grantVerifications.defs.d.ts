import { l } from '@atproto/lex';
import * as VerificationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.verification.grantVerifications";
export { $nsid };
/** Grant verifications to multiple subjects. Allows batch processing of up to 100 verifications at once. */
declare const main: l.Procedure<"tools.ozone.verification.grantVerifications", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    verifications: l.ArraySchema<l.RefSchema<l.Validator<VerificationInput, VerificationInput>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    verifications: l.ArraySchema<l.RefSchema<l.Validator<VerificationDefs.VerificationView, VerificationDefs.VerificationView>>>;
    failedVerifications: l.ArraySchema<l.RefSchema<l.Validator<GrantError, GrantError>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.verification.grantVerifications", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    verifications: l.ArraySchema<l.RefSchema<l.Validator<VerificationInput, VerificationInput>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    verifications: l.ArraySchema<l.RefSchema<l.Validator<VerificationDefs.VerificationView, VerificationDefs.VerificationView>>>;
    failedVerifications: l.ArraySchema<l.RefSchema<l.Validator<GrantError, GrantError>>>;
}>>;
type VerificationInput = {
    $type?: 'tools.ozone.verification.grantVerifications#verificationInput';
    /**
     * The did of the subject being verified
     */
    subject: l.DidString;
    /**
     * Handle of the subject the verification applies to at the moment of verifying.
     */
    handle: l.HandleString;
    /**
     * Display name of the subject the verification applies to at the moment of verifying.
     */
    displayName: string;
    /**
     * Timestamp for verification record. Defaults to current time when not specified.
     */
    createdAt?: l.DatetimeString;
};
export type { VerificationInput };
declare const verificationInput: l.TypedObjectSchema<"tools.ozone.verification.grantVerifications#verificationInput", l.Validator<VerificationInput, VerificationInput>>;
export { verificationInput };
/** Error object for failed verifications. */
type GrantError = {
    $type?: 'tools.ozone.verification.grantVerifications#grantError';
    /**
     * Error message describing the reason for failure.
     */
    error: string;
    /**
     * The did of the subject being verified
     */
    subject: l.DidString;
};
export type { GrantError };
/** Error object for failed verifications. */
declare const grantError: l.TypedObjectSchema<"tools.ozone.verification.grantVerifications#grantError", l.Validator<GrantError, GrantError>>;
export { grantError };
//# sourceMappingURL=grantVerifications.defs.d.ts.map
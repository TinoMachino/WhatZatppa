import { l } from '@atproto/lex';
import * as VerificationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.verification.listVerifications";
export { $nsid };
/** List verifications */
declare const main: l.Query<"tools.ozone.verification.listVerifications", l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly createdAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly createdBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly issuers: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    readonly subjects: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
    readonly isRevoked: l.OptionalSchema<l.BooleanSchema>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    verifications: l.ArraySchema<l.RefSchema<l.Validator<VerificationDefs.VerificationView, VerificationDefs.VerificationView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.verification.listVerifications", $params: l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly createdAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly createdBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly issuers: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    readonly subjects: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
    readonly isRevoked: l.OptionalSchema<l.BooleanSchema>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    verifications: l.ArraySchema<l.RefSchema<l.Validator<VerificationDefs.VerificationView, VerificationDefs.VerificationView>>>;
}>>;
//# sourceMappingURL=listVerifications.defs.d.ts.map
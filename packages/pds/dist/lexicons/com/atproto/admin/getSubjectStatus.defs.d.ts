import { l } from '@atproto/lex';
import * as AdminDefs from './defs.defs.js';
import * as RepoStrongRef from '../repo/strongRef.defs.js';
declare const $nsid = "com.atproto.admin.getSubjectStatus";
export { $nsid };
/** Get the service-specific admin status of a subject (account, record, or blob). */
declare const main: l.Query<"com.atproto.admin.getSubjectStatus", l.ParamsSchema<{
    readonly did: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly uri: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    readonly blob: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>, l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoBlobRef, AdminDefs.RepoBlobRef>>], false>;
    takedown: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
    deactivated: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.getSubjectStatus", $params: l.ParamsSchema<{
    readonly did: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly uri: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    readonly blob: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>, l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoBlobRef, AdminDefs.RepoBlobRef>>], false>;
    takedown: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
    deactivated: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
}>>;
//# sourceMappingURL=getSubjectStatus.defs.d.ts.map
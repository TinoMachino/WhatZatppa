import { l } from '@atproto/lex';
import * as AdminDefs from './defs.defs.js';
import * as RepoStrongRef from '../repo/strongRef.defs.js';
declare const $nsid = "com.atproto.admin.updateSubjectStatus";
export { $nsid };
/** Update the service-specific admin status of a subject (account, record, or blob). */
declare const main: l.Procedure<"com.atproto.admin.updateSubjectStatus", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>, l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoBlobRef, AdminDefs.RepoBlobRef>>], false>;
    takedown: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
    deactivated: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>, l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoBlobRef, AdminDefs.RepoBlobRef>>], false>;
    takedown: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.updateSubjectStatus", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>, l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoBlobRef, AdminDefs.RepoBlobRef>>], false>;
    takedown: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
    deactivated: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>, l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoBlobRef, AdminDefs.RepoBlobRef>>], false>;
    takedown: l.OptionalSchema<l.RefSchema<l.Validator<AdminDefs.StatusAttr, AdminDefs.StatusAttr>>>;
}>>;
//# sourceMappingURL=updateSubjectStatus.defs.d.ts.map
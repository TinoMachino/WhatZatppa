import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
import * as AdminDefs from '../admin/defs.defs.js';
import * as RepoStrongRef from '../repo/strongRef.defs.js';
declare const $nsid = "com.atproto.moderation.createReport";
export { $nsid };
/** Submit a moderation report regarding an atproto account or record. Implemented by moderation services (with PDS proxying), and requires auth. */
declare const main: l.Procedure<"com.atproto.moderation.createReport", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    reasonType: l.RefSchema<l.Validator<ModerationDefs.ReasonType, ModerationDefs.ReasonType>>;
    reason: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 2000;
        readonly maxLength: 20000;
    }>>;
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>], false>;
    modTool: l.OptionalSchema<l.RefSchema<l.Validator<ModTool, ModTool>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    id: l.IntegerSchema;
    reasonType: l.RefSchema<l.Validator<ModerationDefs.ReasonType, ModerationDefs.ReasonType>>;
    reason: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 2000;
        readonly maxLength: 20000;
    }>>;
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>], false>;
    reportedBy: l.StringSchema<{
        readonly format: "did";
    }>;
    createdAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.moderation.createReport", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    reasonType: l.RefSchema<l.Validator<ModerationDefs.ReasonType, ModerationDefs.ReasonType>>;
    reason: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 2000;
        readonly maxLength: 20000;
    }>>;
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>], false>;
    modTool: l.OptionalSchema<l.RefSchema<l.Validator<ModTool, ModTool>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    id: l.IntegerSchema;
    reasonType: l.RefSchema<l.Validator<ModerationDefs.ReasonType, ModerationDefs.ReasonType>>;
    reason: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 2000;
        readonly maxLength: 20000;
    }>>;
    subject: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<AdminDefs.RepoRef, AdminDefs.RepoRef>>, l.TypedRefSchema<l.TypedObjectValidator<RepoStrongRef.Main, RepoStrongRef.Main>>], false>;
    reportedBy: l.StringSchema<{
        readonly format: "did";
    }>;
    createdAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
}>>;
/** Moderation tool information for tracing the source of the action */
type ModTool = {
    $type?: 'com.atproto.moderation.createReport#modTool';
    /**
     * Name/identifier of the source (e.g., 'bsky-app/android', 'bsky-web/chrome')
     */
    name: string;
    /**
     * Additional arbitrary metadata about the source
     */
    meta?: l.LexMap;
};
export type { ModTool };
/** Moderation tool information for tracing the source of the action */
declare const modTool: l.TypedObjectSchema<"com.atproto.moderation.createReport#modTool", l.Validator<ModTool, ModTool>>;
export { modTool };
//# sourceMappingURL=createReport.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getRepos";
export { $nsid };
/** Get details about some repositories. */
declare const main: l.Query<"tools.ozone.moderation.getRepos", l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    repos: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RepoViewDetail, ModerationDefs.RepoViewDetail>>, l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RepoViewNotFound, ModerationDefs.RepoViewNotFound>>], false>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getRepos", $params: l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    repos: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RepoViewDetail, ModerationDefs.RepoViewDetail>>, l.TypedRefSchema<l.TypedObjectValidator<ModerationDefs.RepoViewNotFound, ModerationDefs.RepoViewNotFound>>], false>>;
}>>;
//# sourceMappingURL=getRepos.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.searchRepos";
export { $nsid };
/** Find repositories based on a search term. */
declare const main: l.Query<"tools.ozone.moderation.searchRepos", l.ParamsSchema<{
    readonly term: l.OptionalSchema<l.StringSchema<{}>>;
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    repos: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.RepoView, ModerationDefs.RepoView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.searchRepos", $params: l.ParamsSchema<{
    readonly term: l.OptionalSchema<l.StringSchema<{}>>;
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    repos: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.RepoView, ModerationDefs.RepoView>>>;
}>>;
//# sourceMappingURL=searchRepos.defs.d.ts.map
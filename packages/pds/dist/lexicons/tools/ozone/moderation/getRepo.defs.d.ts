import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.getRepo";
export { $nsid };
/** Get details about a repository. */
declare const main: l.Query<"tools.ozone.moderation.getRepo", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<ModerationDefs.RepoViewDetail, ModerationDefs.RepoViewDetail>>>, readonly ["RepoNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getRepo", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ModerationDefs.RepoViewDetail, ModerationDefs.RepoViewDetail>>>;
//# sourceMappingURL=getRepo.defs.d.ts.map
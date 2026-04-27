import { l } from '@atproto/lex';
import * as CommunityDefs from './defs.defs.js';
declare const $nsid = "com.para.community.getGovernance";
export { $nsid };
/** Get governance roster and role hierarchy for a Para community. */
declare const main: l.Query<"com.para.community.getGovernance", l.ParamsSchema<{
    readonly community: l.StringSchema<{
        readonly maxLength: 64;
        readonly maxGraphemes: 64;
    }>;
    readonly communityId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 128;
        readonly maxGraphemes: 128;
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    source: l.StringSchema<{
        knownValues: ["network", "repo", "mock"];
    }>;
    community: l.StringSchema<{}>;
    communityId: l.OptionalSchema<l.StringSchema<{}>>;
    slug: l.StringSchema<{}>;
    createdAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
    updatedAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
    moderators: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.ModeratorView, CommunityDefs.ModeratorView>>>;
    officials: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.OfficialView, CommunityDefs.OfficialView>>>;
    deputies: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.DeputyRoleView, CommunityDefs.DeputyRoleView>>>;
    metadata: l.OptionalSchema<l.RefSchema<l.Validator<CommunityDefs.Metadata, CommunityDefs.Metadata>>>;
    editHistory: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.HistoryEntry, CommunityDefs.HistoryEntry>>>;
    counters: l.RefSchema<l.Validator<CommunityDefs.Summary, CommunityDefs.Summary>>;
    summary: l.RefSchema<l.Validator<CommunityDefs.Summary, CommunityDefs.Summary>>;
    computedAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.getGovernance", $params: l.ParamsSchema<{
    readonly community: l.StringSchema<{
        readonly maxLength: 64;
        readonly maxGraphemes: 64;
    }>;
    readonly communityId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 128;
        readonly maxGraphemes: 128;
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    source: l.StringSchema<{
        knownValues: ["network", "repo", "mock"];
    }>;
    community: l.StringSchema<{}>;
    communityId: l.OptionalSchema<l.StringSchema<{}>>;
    slug: l.StringSchema<{}>;
    createdAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
    updatedAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
    moderators: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.ModeratorView, CommunityDefs.ModeratorView>>>;
    officials: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.OfficialView, CommunityDefs.OfficialView>>>;
    deputies: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.DeputyRoleView, CommunityDefs.DeputyRoleView>>>;
    metadata: l.OptionalSchema<l.RefSchema<l.Validator<CommunityDefs.Metadata, CommunityDefs.Metadata>>>;
    editHistory: l.ArraySchema<l.RefSchema<l.Validator<CommunityDefs.HistoryEntry, CommunityDefs.HistoryEntry>>>;
    counters: l.RefSchema<l.Validator<CommunityDefs.Summary, CommunityDefs.Summary>>;
    summary: l.RefSchema<l.Validator<CommunityDefs.Summary, CommunityDefs.Summary>>;
    computedAt: l.StringSchema<{
        readonly format: "datetime";
    }>;
}>>;
//# sourceMappingURL=getGovernance.defs.d.ts.map